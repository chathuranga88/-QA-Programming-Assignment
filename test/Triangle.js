import supertest from "supertest";
import { expect } from "chai";
import { getBaseUrl } from '../helpers/env';
import { GET_VERSION, POST_TRIANGLE } from "../helpers/relativeUrl";

const request = supertest(getBaseUrl());
const data = require('../test-resources/testdata.json');


describe('Triangle Problem', () => {

    describe('GET /version', () => {
        describe('Validating GET End point, TC_031', () => {

            it('Retrive app version with correct url, TC_031 , #Smoke ', async () => {
                await request.get(GET_VERSION).then((ress) => {

                    expect(ress.statusCode).to.equal(200);
                    expect(ress.text).to.equal("0.0.2");

                });
            });


            it('Retrive app version with Incorrect url, TC_032, #Reg', async () => {
                await request.get(GET_VERSION / ss).then((ress) => {

                    expect(ress.statusCode).to.equal(400);

                });
            });

        });

    });

    describe('Post / ', () => {
        describe('Validating sum of 2 sides are greater than 3rd', () => {

            it('Sending a Post request where a < b+c is False, TC_001, #Smoke ', async () => {
                await request.post(POST_TRIANGLE).send(data["where_a<b+c_is_false"]).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where b < a+c is False, TC_002, #Smoke ', async () => {
                await request.post(POST_TRIANGLE).send(data["where_b<a+c_is_false"]).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where c < a+b is False, TC_003, #Smoke ', async () => {
                await request.post(POST_TRIANGLE).send(data["where_c<a+b_is_false"]).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where a < b+c is False with boundry values, TC_009, #Reg ', async () => {
                await request.post(POST_TRIANGLE).send(data["where_a<b+c_is_false_with_boundry"]).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where b < a+c is False with boundry values, TC_010, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data["where_b<a+c_is_false_with_boundry"]).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where c < a+b is False with boundry values, TC_011, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data["where_c<a+b_is_false_with_boundry"]).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });
        });

        describe('Basic Positive Tests with valid inputs', () => {


            it('Sending a Post request for Equilateral Triangle, TC_004 , #Smoke', async () => {
                await request.post(POST_TRIANGLE).send(data.equilateral_triangle).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is equilateral triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Isosceles Triangle where C is Different, TC_005, #Smoke', async () => {

                await request.post(POST_TRIANGLE).send(data.isosceles_triangle_with_different_c).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Isosceles Triangle where B is Different, TC_006, #Smoke', async () => {
                await request.post(POST_TRIANGLE).send(data.isosceles_triangle_with_different_b).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Isosceles Triangle where A is Different, TC_007, #Smoke', async () => {
                await request.post(POST_TRIANGLE).send(data.isosceles_triangle_with_different_a).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Versatile Triangle, TC_008, #Smoke', async () => {
                await request.post(POST_TRIANGLE).send(data.versatile_triangle).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is versatile triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

        });

        describe('Validating Edge Cases & Non numeric values', () => {


            it('Sending a Post Request with Zero values, TC_012, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.all_values_are_zero).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be greater than 0");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request with null values, TC_013, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.where_a_is_null).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be greater than 0");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post Request with Negative values, TC_014, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.where_b_has_negative_value).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be greater than 0");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post Request with Non Numeric Values, TC_015, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.where_a_has_String_value).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post Request with String Numeric Value, TC_016, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.where_a_has_String_Numeric_value).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is versatile triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request with character, TC_029, #Reg', async () => {
                const data = { "a": A, "b": 5, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {
                   
                    expect(ress.statusCode).to.equal(400);
                });
            });

        });

        describe('Destructive Testing', () => {
            it('Sending a Post Request with 2 values, TC_017, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.Post_with_two_values).then((ress) => {

                    expect(ress.body).to.have.property("error", "Triangle should have 3 side");
                    expect(ress.statusCode).to.equal(422);
                });
            });


            it('Sending a Post request with additionla parameter, TC_018, #Reg', async () => {
               
                await request.post(POST_TRIANGLE).send(data.Post_with_additional_parameters).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });


            it('Sending a Post request with invalid URL, TC_019, #Reg', async () => {
                await request.post('/sss').send(data.isosceles_triangle_with_different_a).then((ress) => {
                    expect(ress.statusCode).to.equal(400);
                });
            });



        });

        describe('Testing With Decimal Values', () => {

            it('Sending a Post Request with 5 decimal values, TC_020, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_5_decimal_values_a).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with 10 decimal values, TC_021, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_10_decimal_values_b).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with 15 decimal values, TC_022, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_15_decimal_values_c).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with 16 decimal values, TC_023, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_16_decimal_values_c).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with all decimal values, TC_024, #Smoke', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_All_decimal_values).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is versatile triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });


        });

        describe('Validatig with boolean values', () => {

            it('Sending a Post request with a boolean value of a, TC_025, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_boolean_value_a).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });


            it('Sending a Post request with a boolean value of b, TC_026, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_boolean_value_b).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request with false boolean value, TC_027, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_boolean_false_value_c).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request with all boolean values, TC_028, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data.request_with_all_boolean_values).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where a < b+c is False ?, TC_030, #Reg', async () => {
                await request.post(POST_TRIANGLE).send(data["where_a<b+c_is_false_with_boolean_c"]).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });




        });

    });


});


