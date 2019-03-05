
# todo-app-backend

Back-end repository for node REST API connecting React 'Don't Worry Brie Happy' App front-end to AWS mySQL RDS by creating AWS Lambda function.

## Pre-requisites 

- node 
- Express
- Serverless
- CORS
- mySQL

Initialise with node: 

#### `npm init -f`

Install frameworks:

#### `npm install --save express serverless-http cors mysql`

## Deployment

`serverless deploy --RDS_HOST yourAWSdbInstanceHere -- RDS_USER yourUserNameHere --RDS_PASSWORD yourPasswordHere --RDS_DATABASE yourSQLdbHere`

## Testing 

Tested using Postman.
