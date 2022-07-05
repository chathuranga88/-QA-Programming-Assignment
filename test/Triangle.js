import supertest from "supertest";
import { expect } from "chai";
import { getBaseUrl } from '../helpers/env';
import { GET_VERSION, POST_TRIANGLE } from "../helpers/relativeUrl";

const request = supertest(getBaseUrl());

describe('Triangle Problem', () => {

    describe('GET /version', () => {
        describe('Validating GET End point', () => {

            it('Retrive app version with correct url', async () => {
                await request.get(GET_VERSION).then((ress) => {

                    expect(ress.text).to.equal("0.0.2");
                    expect(ress.statusCode).to.equal(200);

                });
            });


            it('Retrive app version with Incorrect url', async () => {
                await request.get(GET_VERSION).then((ress) => {

                    expect(ress.statusCode).to.equal(400);

                });
            });

        });

    });

    
    describe('Post / ', () => {
        describe('Validating sum of 2 sides are greater than 3rd', () => {

            it('Sending a Post request where a < b+c is False, TC_001 ', async () => {
                const data = { "a": 8, "b": 3, "c": 4 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where b < a+c is False, TC_002 ', async () => {
                const data = { "a": 3, "b": 8, "c": 4 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where c < a+b is False, TC_003 ', async () => {
                const data = { "a": 1, "b": 2, "c": 4 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where a < b+c is False with boundry values, TC_009 ', async () => {
                const data = { "a": 8, "b": 5, "c": 3 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where b < a+c is False with boundry values, TC_010', async () => {
                const data = { "a": 5, "b": 8, "c": 3 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request where c < a+b is False with boundry values, TC_011', async () => {
                const data = { "a": 5, "b": 3, "c": 8 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "Sum of any 2 sides should be greater than the 3rd");
                    expect(ress.statusCode).to.equal(422);
                });
            });
        });

        describe('Basic Positive Tests with valid inputs', () => {

            it('Sending a Post request for Equilateral Triangle, TC_004', async () => {
                const data = { "a": 5, "b": 5, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is equilateral triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Isosceles Triangle where C is Different, TC_005', async () => {
                const data = { "a": 5, "b": 5, "c": 3 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Isosceles Triangle where B is Different, TC_006', async () => {
                const data = { "a": 5, "b": 3, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Isosceles Triangle where A is Different, TC_007', async () => {
                const data = { "a": 3, "b": 5, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post request for Versatile Triangle, TC_008', async () => {
                const data = { "a": 3, "b": 5, "c": 7 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is versatile triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

        });

        describe('Validating Edge Cases', () => {


            it('Sending a Post Request with Zero values, TC_012', async () => {
                const data = { "a": 0, "b": 0, "c": 0 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be greater than 0");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request with null values, TC_013', async () => {
                const data = { "a": null, "b": 20, "c": 10 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be greater than 0");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post Request with Negative values, TC_014', async () => {
                const data = { "a": 10, "b": -5, "c": 10 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be greater than 0");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post Request with Non Numeric Values, TC_015', async () => {
                const data = { "a": "Z", "b": 10, "c": 20 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post Request with String Numeric Value, TC_016', async () => {
                const data = { "a": "4", "b": 5, "c": 8 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is versatile triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

        });

        describe('Destructive Testing', () => {
            it('Sending a Post Request with 2 values, TC_017', async () => {
                const data = { "a": 4, "b": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "Triangle should have 3 side");
                    expect(ress.statusCode).to.equal(422);
                });
            });


            it('Sending a Post request with additionla parameter, TC_018', async () => {
                const data = { "a": 3, "b": 5, "c": 5, "d": 7 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });


            it('Sending a Post request with invalid URL, TC_019', async () => {
                const data = { "a": 3, "b": 5, "c": 5 };
                await request.post('/sss').send(data).then((ress) => {
                    expect(ress.statusCode).to.equal(400);
                });
            });

            it('Sending a Post request with character, TC_029', async () => {
                const data = { "a": A, "b": 5, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {
                    expect(ress.body).to.not.be.null;
                    expect(ress.statusCode).to.equal(400);
                });
            });

        });

        describe('Testing With Decimal Values', () => {

            it('Sending a Post Request with 5 decimal values, TC_020', async () => {
                const data = { "a": 4.99999, "b": 5, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with 10 decimal values, TC_021', async () => {
                const data = { "a": 5, "b": 4.9999999999, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with 15 decimal values, TC_022', async () => {
                const data = { "a": 5, "b": 5, "c": 4.999999999999999 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with 16 decimal values, TC_023', async () => {
                const data = { "a": 5, "b": 5, "c": 4.9999999999999999 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is isosceles triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });

            it('Sending a Post Request with all decimal values, TC_024', async () => {
                const data = { "a": 4.99999, "b": 5.01567, "c": 5.01569 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("result", "This is versatile triangle");
                    expect(ress.statusCode).to.equal(200);
                });
            });


        });

        describe('Validatig with boolean values', () => {

            it('Sending a Post request with a boolean value of a, TC_025', async () => {
                const data = { "a": true, "b": 6, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });


            it('Sending a Post request with a boolean value of b, TC_026', async () => {
                const data = { "a": 5, "b": true, "c": 5 };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request with false boolean value, TC_027', async () => {
                const data = { "a": 5, "b": 5, "c": false };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });

            it('Sending a Post request with all boolean values, TC_028', async () => {
                const data = { "a": true, "b": true, "c": true };
                await request.post(POST_TRIANGLE).send(data).then((ress) => {

                    expect(ress.body).to.have.property("error", "All triangle sides should be numeric");
                    expect(ress.statusCode).to.equal(422);
                });
            });




        });

    });




});


