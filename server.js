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

function allEmployees() {
  connection.query('SELECT * FROM employee', (err, results) => {
      if (err) {
          console.error('Error:', err);
      } else {
          console.table(results);
          toPromptManagerShow(); // Prompt user for displaying managers
      }
  });
}
function startApp() {
inquirer.prompt([
{   type: 'list',
    name: 'verb',
    message: 'What would you like to do?',
    choices: [
        'View all employees', 
        'Add employee',
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
           
           break;
        case 'Add employee' :
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
};

function toPromptManagerShow() {
  let showManagers = true;
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
            showManagers = false;
          }
        })
        startApp();
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
        'None',
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
            return 'If employee does not have a manger, choose none from lsit.'
        }
        return true;
    }
  }
  ])
  . then((answers) => {
    let role_id = null;
    let manager_id = null;
   

      switch (answers.role) {
          case 'None':
              role_id = Null; 
              break;
              case 'Accountant':
              role_id = 2; 
              break;
              case 'Software Engineer':
              role_id = 3; 
              break;
              case 'Janitor':
              role_id = 4; 
              break;
              case 'Real Estate Agent':
              role_id = 5; 
              break;
              
            default:
              break;
      }

              switch (answers.employee_manager) {
                case 'John Linen':
                    manager_id = 1; 
                    break;
                    case 'Abby Smith':
                      manager_id = 2; 
                      break;
                      case 'Bryan Sanchez':
                        manager_id = 3;
                        break;
                        case 'Bob Brown':
                          manager_id = 4; 
                          break;
                          case 'Maxie Luiz':
                            manager_id = 5; 
                            break;

                            case 'Chris Jr':
                              manager_id = 6; 
                              break;
          
    
                default:
                    break;
            }
      
              if (answers.employee_manager === 'None') {
                
                manager_id = answers.employee_manager;
              }
      
    connection.query(`INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)`, [answers.first_name, answers.last_name, role_id, manager_id],
     (err,results) => {
      if (err) {
        console.error('Error:', err);
    } else {
   
     console.log('Employee added successfully!')
      console.table(results)
      allEmployees();

    }
  
    startApp();
  })
})
}



function updateEmployeeRole() {

  inquirer.prompt
  ([
    {
      type: 'input',
      name: 'update_employee',
      message: 'Which employees role do you want to update?',
      choices: [
        'John Linen', 
        'Abby Smith',
        'Bryan Sanchez', 
        'Bob Brown', 
        'Maxie Luiz', 
        'Chris Jr'

      ]
    },
  ])
}


function addRole() {
  inquirer.prompt
  ([
    {
      type: 'input',
      name: 'add_role',
      message: 'What is the name of the role you want to add?',
      validate: (input) => {
        if(input === "") {
          return "role name is needed to add a role."
        }
        return true;
      }
    },
    {
      type: 'input',
      name: 'role_salary',
      message: 'What is the salary for this role?',
      validate: (input) => {
        if(input === "") {
          return 'Enter a salary to proceed to adding role.'
        }
        return true;
      }
    },
    {
      type: 'list',
      name: 'role_department',
      message: 'Which department does this role belong to?',
      choices: [
        'HR',
        'Finance',
        'Engineering',
        'Custodian',
        'Realtor'
      ]

    }
  ])
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


function addDepartment() {
  inquirer.prompt
  ([
    {
      type: 'input',
      name: 'add_department',
      message: 'What is the name of the department?',
      validate: (input) => {
        if(input === "") {
          return "department name is needed to add a department."
        }
        return true;
      }
    }
  ])
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


        
startApp();