//require inquirer
var inquire = require("inquirer");

//require console.table package
require('console.table');

//require mysql
var mysql = require("mysql");

//set up database connection
var connection = mysql.createConnection(
  {
    host : "localhost",
    user : "root",
    password : "password",
    database : "bamazon"
    //multipleStatements: true
  }
);

//connect to the database
connection.connect();

function ManageInventory() {
  //prompt the user which actions he/she wants to take
  inquirer.prompt([
  {
    name : "action",
    type : "list",
    message : "What would you like to do?",
    choices : []
  }
  ]).then(function(response) {

  });
}

function displayProductsForSale() {
  //sql query to display all available products in the store
  var query = "SELECT item_id, product_name, price, stock_quantity FROM products;";
  
  //execute the query
  connection.query(query, function(error, results) {
    if (error) {
      throw error;
    }

    var productsArray = results.map(function(results){
      return {
        "Item Id" : results.item_id,
        "Product Name" : results.product_name,
        "Price" : results.price,
        "Quantity" : results.stock_quantity
      }
    });

    //console.log(productsArray);
    console.table("Report : Available Products" , productsArray);
  });  
}

function displayLowInventory() {
  //sql query to display low inventory products, < 5
  var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5;";
  
  //execute the query
  connection.query(query, function(error, results) {
    if (error) {
      throw error;
    }

    var productsArray = results.map(function(results){
      return {
        "Item Id" : results.item_id,
        "Product Name" : results.product_name,
        "Price" : results.price,
        "Quantity" : results.stock_quantity
      }
    });

    //console.log(productsArray);
    console.table("Report : Low Inventory Products" , productsArray);
  });  
}

//displayProductsForSale();
//displayLowInventory();
