const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const app = express();

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
    choices: ['view all employees', 'add employee role', 'update employee role', 'view all roles', 'add role', 'view all departments', 'add department'],
    validate: (choices) => {
        if(choices === "") {
            return 'Choose one of the options to proceed with database.'
        }
    }
}
])


app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
});