DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

DROP TABLE IF EXISTS products;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(1000) NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  price DECIMAL(8,2) NOT NULL,
  stock_quantity SMALLINT UNSIGNED,
  PRIMARY KEY (item_id)
);

-- inserting records to products
INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('Canon 5D Mark IV','Camera & Photo', 2499.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('Canon 70-200 F2.8 Lens','Camera & Photo', 2299.99, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('The Fate of the Furious Blu-Ray','Movies, Music & Games', 19.99, 250);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('John Wick : Chapter 2','Movies, Music & Games', 14.99, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('Samsung Electronics QN55Q7F 55-Inch 4K Ultra HD Smart QLED TV','TV & Video', 1797.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('LG Electronics OLED55B6P Flat 55-Inch 4K Ultra HD Smart OLED TV','TV & Video', 1699.99, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('Happy Belly Chocolate & Dried Fruit Trail Mix, 16 oz','Grocery', 4.85, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('Terrasoul Superfoods Raw Organic Criollo Cacao Nibs, 1 Pound','Grocery', 11.99, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('Superdry Men''s Fuji Bomber Jacket','Clothing, Shoes & Jewelry', 99.50, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES('Pendleton Women''s Zip Front Hooded Techrain Coat','Clothing, Shoes & Jewelry', 199.95, 100);

SELECT * FROM products;







