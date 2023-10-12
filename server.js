const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const app = express();

const PORT = process.env.PORT || 4009;

app.use(express.urlencoded( {extended: false}));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});

const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'docker',
        database: 'employees_db'
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
])
.then((data) => {
    switch(data.verb) {
        case 'View all employees' :
           allEmployees(startApp);
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

function allEmployees() {
    connection.query('SELECT * FROM employee', (err, results) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.table(results);
  
        inquirer
          .prompt([
            {
              type: 'confirm',
              name: 'showManagers',
              message: 'Would you like to see the managers added to the table? Enter Yes(Y) or No(N).',
              default: false,
            },
          ])
          .then(function (answer) {
            if (answer.showManagers) {
                displayManagers();
          } else {
            console.log('Okay, not showing managers...');
            startApp();
          }
        });
    }
  });
}

function displayManagers() {
  connection.query(
    'SELECT e.first_name, e.last_name, e.role_id, e.manager_id, CONCAT(m.first_name, " ", m.last_name) AS manager_name FROM employee e LEFT JOIN employee m ON e.manager_id = m.id',
    (err, results) => {
      if (err) {
        console.error('Error:', err);
      } else {
        console.table(results);
        startApp();
      }
    }
  );
}

function viewAllRoles() {
    connection.query(
        'SELECT r.id, r.title, r.salary, d.department FROM role r JOIN department d ON r.department_id = d.id', (err, results) => {
          if (err) {
            console.error('Error:', err);
          } else {
            console.table(results);
            startApp();
          }
        }
      );

}

function allDepartments() {
    connection.query(
        'SELECT * FROM department', (err, results) => {
          if (err) {
            console.error('Error:', err);
          } else {
            console.table(results);
            startApp();
          }
        }
      );

}

function addEmployee() {
    inquirer.prompt([
        {   type: 'input',
            name: 'first_name',
            message: 'what is the first name of the employee?',
            validate: (input) => {
                if (input === "") {
                    return 'A first name is required to enter a new employee.'
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the last name of the employee?',
            validate: (input) => {
                if (input === "") {
                    return 'Enter the last name of employee.'
                }
                return true;
            }

        },
        {
          type: 'list',
          name: 'role',
          message: 'What is their role?',
          choices: [
            'HR manager', 
            'Accountant',
            'Software Engineer', 
            'Janitor', 
            'Add role', 
            'Real Estate Agent', 
            'Exit'
        ],
        validate: (choices) => {
            if(choices === "") {
                return 'Choose one of the options to add an employee.'
            }
            return true;
        }
    },
    {
      type: 'list',
      name: 'employee_manager',
      message: 'Who is the employees manager?',
      choices: [
        'John Linen', 
        'Abby Smith',
        'Bryan Sanchez', 
        'Bob Brown', 
        'Maxie Luiz', 
        'Chris Jr', 
        'Exit'
    ],
    validate: (choices) => {
        if(choices === "") {
            return 'Choose one of the options to add an employee.'
        }
        return true;
    }
    },
        




startApp();