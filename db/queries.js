const { default: inquirer } = require('inquirer');
const connection = require('../server');

function allEmployees() {
    connection.query('SELECT * FROM role', (err,results) => {
       err? console.log(err) : console.error(results);

       inquirer
       .prompt([
        {
            type: 'confirm',
            name: 'showManagers',
            message: 'Would you like to see the managers added to the table?',
            default: false,
        },
       ]).

    });
    

}


function addEmployee() {

}

function updateEmployeeRole() {

}

function viewAllRoles() {

}

function addRole() {

}

function allDepartments() {

}

function addDepartment() {

}

function exit() {

}

module.exports = {
    allEmployees,
}