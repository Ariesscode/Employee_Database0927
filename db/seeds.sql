INSERT INTO department(department)
VALUES
 ('HR'),
 ('Finance'),
 ('Engineering'),
 ('Custodian'),
 ('Realtor');


INSERT INTO role(title, salary, department_id) 
VALUES
    ('HR manager', 80000.00, 1),
    ('Accountant', 50000.00, 2),
    ('Software Engineer', 85000.00, 3),
    ('Janitor', 24000.00, 4),
    ('Real Estate Agent', 90000.00, 5);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES 
('John', 'Linen', 1, NULL),
('Abby', 'Smith', 2, NULL),
('Bryan', 'Sanchez', 3, 1),
('Bob', 'Brown', 3, 1),
('Maxie', 'luiz', 5, 5),
('Chris', 'Jr', 1, NULL);
