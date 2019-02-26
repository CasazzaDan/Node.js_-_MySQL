DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
    item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    products_name VARCHAR(100),
    department_name VARCHAR(75),
    price DECIMAL(10,2),
    stock_quantity INTEGER(1000)
);

INSERT INTO products (products_name, department_name, price, stock_quantity)
VALUES 
("iPhone", "Mobile", 699.99, 500), ("Pixel", "Mobile", 499.99, 300), ("Galaxy S7", "Mobile", 599.99, 450), 
("iMac", "Computers", 1799.99, 200), ("MacBook Pro", "Computers", 1299.99, 250), ("Microsoft WorkPad", "Computers", 899.99, 100), 
("Gaming Desk", "Desks", 299.99, 100), ("Office Desk", "Desks", 599.99, 100), ("Artist Desk", "Desks", 599.99, 100);