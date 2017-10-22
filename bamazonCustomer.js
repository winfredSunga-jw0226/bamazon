//require inquirier
var inquirer = require("inquirer");

//require console.table package
require('console.table');

//require mysql
  var mysql = require("mysql");

  //set up the connection to the mysql database
  var connection = mysql.createConnection(
    {
      host : "localhost",
      user : "root",
      password : "password",
      database : "bamazon",
      multipleStatements: true
    }
  );

  connection.connect();

//function to display all items available in the store
function displayAllProducts() {
  //create the connection
  
  
  //sql query to display all available products in the store
  var query = "SELECT item_id, product_name, price FROM products;";
  
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
  setTimeout(promptToBuyProduct, 500);
}

function promptToBuyProduct() {

  inquirer.prompt([
  {
    name : "productId",
    type : "input",
    message : "Please enter the ID of the product you would like to purchase : ",
  },
  {
    name : "quantity",
    type : "input",
    message : "Please enter the quantity of your purchase : ",
  }
  ]).then(function(response) {
    console.log(response);
    console.log(parseInt(response.productId));
    console.log(parseInt(response.quantity));
    console.log("Thank you for your order. Now checking inventory......................");
    setTimeout( 
      function() { 
        checkInventory( parseInt(response.productId), parseInt(response.quantity) );
      }
      , 1000);
  });
}

function checkInventory(productId, quantity) {
  //sql query to check a product's quantity
  var query = "SELECT price, stock_quantity FROM products WHERE item_id = ?;";

  connection.query(query, productId, function(error, result) {
    if (error) {
      throw error;
    }

    if (result[0].stock_quantity >= quantity) {
      console.log("The total cost of your purchase is : " + result[0].price * quantity);
    } else {
      console.log("Insufficient quantity!!!");
    }
  });
}

//run the aop
displayAllProducts();
