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
function startApp() {
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
           console.log("You chose to view all employees.");
           break;
        case 'Add employee role' :
            addEmployee();
            console.log("You added an employee.");
            break;
        case 'Update employee role' :
            updateEmployeeRole();
            console.log("You chose to update an employees role.");
            break;
        case 'View all roles' :
            viewAllRoles();
            console.log("You are viewing all roles.");
            break;
        case 'Add role' :
            addRole();
            console.log("You chose to add a role.");
            break;
        case 'View all departments' :
            allDepartments();
            console.log("You chose to view all departments.");
            break;
        case 'Add department' :
            addDepartment();
            console.log("You would like to add a department.");
            break;
        case 'Exit' :
            exit();
            console.log("Closing employee_database, Goodbye!");
            break;
            
    }

});
};

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});

startApp();
module.exports = {db, questions} 