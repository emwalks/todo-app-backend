const serverless = require('serverless-http');
const express = require('express');
const app = express();

const databaseService = require('./databaseservice')

app.get('/tasks', function (request, response) {

  databaseService.getTasks()
    .then(function (results) {
      //We got the tasks OK
      response.json(results);
    })

    .catch(function (error) {
      //something went wrong when getting the tasks
      response.status(500);
      response.json(error);

    });

})

module.exports.handler = serverless(app);

//when someone calls URL/tasks path using a GET reponse a function called handler is run
//the handler function is defined here
//the handler function uses the serverless framework and express framework
//app is the express framework
//
//the .then is when the promise has passed 
//it triggers a .then and when it fails it triggers a .catch
//results and errors are the variable names the promise returns
// the .catch builds on the .then hence the ; at the end of catch
