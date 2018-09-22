DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(50) NOT NULL,
    description VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(4, 2) NOT NULL,
    stock_quantity INT NOT NULL
);