const { default: inquirer } = require('inquirer');
const connection = require('../server');

function allEmployees() {
    connection.query('SELECT * FROM role', (err,results) => {
       err? console.log(err) : console.table(results);

       inquirer
       .prompt([
        {
            type: 'confirm',
            name: 'showManagers',
            message: 'Would you like to see the managers added to the table? Enter Yes or No.',
            default: false,
        },
       ])
       .then((answer) => {
        if (answer.showManagers) {
            displayManagers();
        } else {
            console.log('okay, not showing managers..');
        }
    
       })
    
}
)}
   





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