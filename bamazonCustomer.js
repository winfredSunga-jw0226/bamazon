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
    console.log("Thank you. Your order is now being processed ...");
    setTimeout( 
      function() { 
        processOrder( parseInt(response.productId), parseInt(response.quantity) );
      }
      , 1000);
  });
}

function processOrder(productId, quantity) {
  //sql query to check a product's quantity
  var query = "SELECT price, stock_quantity FROM products WHERE item_id = ?;";

  //execute the query against the database
  connection.query(query, productId, function(error, result) {
    if (error) {
      throw error;
    }
    //if there is enough inventory to fulfill the order
    if (result[0].stock_quantity >= quantity) {
      //display the total purchase amount
      console.log("The total amount for your purchase is : " + (result[0].price * quantity).toFixed(2));

      //update the stock qty in the database
      updateStockQuantity(productId, quantity);
    } 
    //else display a message stating that there is insufficient quantity
    else {
      console.log("Insufficient quantity!!!");
    }
  });
}

function updateStockQuantity(productId, quantity) {
  //sql query that will update stock quantity for a specific product
  var query = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?;";

  connection.query(query, [quantity, productId], function(error, result) {
    if (error) {
      throw error;
    } 
    //console.log("product inventory updated!");
    process.exit();
  })
}


//run the aop
displayAllProducts();
