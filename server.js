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
        database: ''
    }
)