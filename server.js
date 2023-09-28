const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const app = express();
const queries = require('./db/queries')

const PORT = process.env.PORT || 4009;

app.use(express.urlencoded( {extended: false}));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'docker',
        database: 'employee_db'
    },
    console.log('You are connected to the employee-db database.')
)

inquirer.prompt([
{   type: 'list',
    name: 'verb',
    message: 'What would you like to do?',
    choices: [
        'View all employees', 
        'Add employee role',
        'Update employee role', 
        'View all roles', 
        'Add role', 
        'View all departments', 
        'Add department',
        'Exit'
    ],
    validate: (choices) => {
        if(choices === "") {
            return 'Choose one of the options to proceed with database.'
        }
        return true;
    }
}
]).then((data) => {
    switch(data.verb) {
        case 'View all employees' :
           allEmployees();
           break;
        case 'Add employee role' :
            addEmployee();
            break;
        case 'Update employee role' :
            updateEmployeeRole();
            break;
        case 'View all roles' :
            viewAllRoles();
            break;
        case 'Add role' :
            addRole();
            break;
        case 'View all departments' :
            allDepartments();
            break;
        case 'Add department' :
            addDepartment();
            break;
        case 'Exit' :
            exit();
            break;
            
    }

});


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});

module.exports = { db }