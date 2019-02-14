const serverless = require('serverless-http');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
//this cors middleware adds a header to allow connections
//this registers the middleware we need as long as you have express 4.16

const databaseService = require('./databaseservice')

//app.get is our request type for GET
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



app.post('/tasks', function (request, response) {
  //note although the path is the same as the get 
  //we are defining how the backend (?API is this whole code the API?) deals with a post request

  const Description = request.body.Description;

  databaseService.saveTask(Description)
    .then(function (results) {

      response.json(results);
    })

    .catch(function (error) {

      response.status(500);
      response.json(error);

    });

});

app.put('/tasks/:taskId', function (request, response) {

  const taskIdToBeDeleted = request.params.taskId;

  databaseService.updateTask(taskIdToBeDeleted)
    .then(function (results) {

      response.json(results);
    })

    .catch(function (error) {

      response.status(500);
      response.json(error);

    });

});

app.delete('/tasks/:taskId', function (request, response) {

  
  const taskIdToBeDeleted = request.params.taskId;
//this maps the request path parameter to taskId - express framework

databaseService.deleteTask(taskIdToBeDeleted)
  .then(function (results) {

    response.json(results);
  })

  .catch(function (error) {

    response.status(500);
    response.json(error);

  });

});

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
