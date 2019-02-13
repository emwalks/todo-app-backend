//purpose of this file is handling all your database functions

const mysql = require("mysql");

function getDatabaseConnection() {
    return mysql.createConnection({
        host: process.env.RDS_HOST,
        user: process.env.RDS_USER,
        password: process.env.RDS_PASSWORD,
        database: process.env.RDS_DATABASE
    });
}

//this is a json object that sets up the properties of the connection

function getTasks() {
    const connection = getDatabaseConnection();
    return new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM Tasks", function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });
    });
}

function saveTask(Description) {
    const connection = getDatabaseConnection();

    return new Promise(function (resolve, reject) {

        const postData = {
            Description: Description,
            Completed: false,
            UserId: 1
        };
        //takes a json object and passes json object to the query SET is the same as INSERT INTO
        connection.query('INSERT INTO Tasks SET ?', postData, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });

    });

}


function updateTask(Description) {
    const connection = getDatabaseConnection();

    return new Promise(function (resolve, reject) {


        connection.query('UPDATE Tasks SET Completed = True WHERE Description = ?', Description, function (error, results, fields) {
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });

    });

}

function deleteTask(taskIdToBeDeleted) {
    const connection = getDatabaseConnection();

    return new Promise(function (resolve, reject) {


        connection.query('DELETE FROM Tasks WHERE TaskId = ?', taskIdToBeDeleted, function (error, results, fields) {
          
            if (error) {
                connection.destroy();
                return reject(error);
            }
            else {
                connection.end();
                return resolve(results);
            }
        });

    });

}



//this is a function using a promise to query the mySQL RDS database. 
//the function(error, results, fields) is a callback
//if the connection query fails reject the results and destroy connection
//destroy is like force quit - in your logs you could see which connections failed vs successful
//you end the connection in lambda to free up number of connections
//if you were using a server you would keep the connection open so you dont have to repeat the TCP handshake for each connection
//result of this function is a json array of our mysql table as tasks

module.exports = {
    getTasks,
    saveTask,
    updateTask,
    deleteTask
}

//the getDatabaseConnection is not exported because we want our manager to handle connection