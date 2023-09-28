const { default: inquirer } = require('inquirer');
const connection = require('../server');

function allEmployees() {
    app.get('/employees', (req, res) => {
    connection.query('SELECT * FROM role', (err,results) => {
       err? console.log(err) : console.table(results);
const questions =
       inquirer
       .prompt([
        {
            type: 'confirm',
            name: 'showManagers',
            message: 'Would you like to see the managers added to the table? Enter Yes(Y) or No(N).',
            default: false,
        },
       ])
       .then((answer) => {
        if (answer.showManagers) {
            displayManagers();
        } else {
            console.log('okay, not showing managers..');
            questions();
        }
    
       })
    });
}
)}

   

function displayManagers() {
    connection.query('SELECT e.first_name, e.last_name, e.role_id, e.manager_id, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id', (err, results) => {
        if (err) {
            results.status(500).send('Error fetching employees');
            return;
        }
        results.json(results);
    }
    );
};



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