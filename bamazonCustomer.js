//require inquirier
var inquirer = require("inquirer");

//require console.table package
require('console.table');

//function to display all items available in the store
function displayAllProducts() {
  //require mysql
  var mysql = require("mysql");

  //set up the connection to the mysql database
  var connection = mysql.createConnection(
    {
      host : "localhost",
      user : "root",
      password : "password",
      database : "bamazon"
    }
  );

  //create the connection
  connection.connect();

  //sql query to display all available products in the store
  var query = "SELECT item_id, product_name, price FROM products";
  
  //execute the query
  connection.query(query, function(error, results) {
    if (error) {
      throw error;
    }

    var productsArray = results.map(function(results){
      return {
        "Item Id" : results.item_id,
        "Product Name" : results.product_name,
        "Price" : results.price
      }
    });

    //console.log(productsArray);
    console.table("Available Products" , productsArray);
   
  });  

  //then prompt the user if they wish to buy a product
  promptToBuyProduct();
}

function promptToBuyProduct() {

}

//run the aop
displayAllProducts();
