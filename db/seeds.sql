INSERT INTO department(id, name)
VALUES
 (1,'HR'),
 (2, 'Finance'),
 (3, 'Engineering');

INSERT INTO role(title,salary, department_id) 
VALUES
    ('HR manager', 80000.00, 1),
    ('Accountant', 50000.00, 2),
    ('Software Engineer', 85000.00, 3);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES 
(1, 'John', 'Linen', 1, NULL),
(2, 'Abby', 'Smith', 2, NULL),
(3, 'Bryan', 'Sanchez', 3, 1),
(4, 'Bob', 'Brown', 3 , 1);
