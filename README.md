# QA-Assignement

Automation tool/framework used: **Mocha**    <br> 
Programming Language: **Javascript *(Assignment Choice of Programming language)***,</br>
Build Tool: **npm**,</br>
CI Implementation: **circleci** </br>
Library's used: </br>**- SuperTest (For Rest API's), </br>- Chai (Support Test Creation & Assertions), </br>- mochawsome(For Reporting)** </br>


#### A comprehesive test summary report including *test-cases, execution status, testing strategy, bug report, reccomendations* and more details can be found in the report linked below:

***[Test Harness Link](https://docs.google.com/spreadsheets/d/17x0u0n4WzNh5SJAwLcn2Tfm7rhG5ksqShoYABvgSkyw/edit?usp=sharing)***

## Required software
* Download and install node.js

## How to execute the tests

    1. Clone the project
    2. Open the cmd and change directory(cd) to the cloned project folder
    3. Execute command to run all tests: 'npm test' or 'npm test --dev' (if env is not given by default dev env will get select)  
    4. Execute command to run Smoke tests: 'npm run testsmoke' or 'npm run testsmoke --dev' (if env is not given by default dev env will get select)
    5. Execute command to run Regression tests: 'npm run testreg' or 'testreg --dev' (if env is not given by default dev env will get select)
    4. Wait for tests to be completed and results will be in the console (please refer below to get a comprehensive report)

## How to execute test with comprehensive reports

    1. A comprehensive test result report will get generated on end of each test execution
    2. Open the cmd and cd to the cloned project folder
    3. Execute command:  'npm test' (Report will genarate on each test run)
    3. Navigate to mochawesome-reports and double click and open the mochawesome.html test results file
 

## Things to highlight
    
    1. Enviormental data, such as url's are been maintained in a separate json to ease the maintainability.
    2. BDD approch has been followed throughout to increase readability and maintainability.
    3. Test data, such as values of triangles are been maintained in a separate json to ease the maintainability.
    4. Test types are tagged in test automation in order to execute in groups
    5. Reporting has been implement through mochawesome-reports
    6. CI implemented through circleci  


## CI implementation 
It has integrated with the app.circleci.com You can  find the CI details in ***[here](https://app.circleci.com/pipelines/github/chathuranga88/-QA-Programming-Assignment?filter=all)*** 
Currently automation tests getting faild due to few bugs in the service. 
    

## About the project structure 



|  File		 		|Description  							 |
| :------------ | :------------ |
|`config.json`  |  The project enviormental variables such as url's stored in `config.json` file which is located in root.  |
|`env.js`       |  Retrives the given enviorment selection in command line and switch according to input. if enviorment is not given in the command line by `default` it will switch to `dev enviorment`.     *Note : Only dev URL is configured in config.json***|
| `relativeUrl.js`  |   Keep track of all relative url's |
| Mochawesome Reports| Comprehensive test report will be genarated as form of `mochawesome.html` and `mochawesome.json` formats. |
| tests | Include all the test files     |
| `.circleci`| This include circleci implementation |
|`test-resource\testdata.json`| This include all the test data |


