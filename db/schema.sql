DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

use employees_db;

CREATE TABLE department (
    id INT NOT NULL,
    department VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL (10, 2),
    department_id INT,
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE SET NULL
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id)
        REFERENCES role(id),   
     FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL


);


