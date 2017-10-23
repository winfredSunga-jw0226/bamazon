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

function manageInventory() {
  //prompt the user which actions he/she wants to take
  inquire.prompt([
  {
    name : "action",
    type : "list",
    message : "Please choose an action from below choices?",
    choices : ["View products report", "View low inventory report", "Add to inventory", "Add new product", "Exit"]
  }
  ]).then(function(response) {
    switch (response.action) {
      case "View products report":
        displayProductsForSale();
        break;
      case "View low inventory report":
        displayLowInventory();
        break;
      case "Add to inventory":
        addToInventory();
        break;
      case "Add new product":
        addNewProduct();
        break;
      case "Exit":
        process.exit();
        break;  
    }
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

    //call the function again in case the manager wants to do something else
    setTimeout(manageInventory, 1000);
  });  
}

function displayLowInventory() {
  //sql query to display low inventory products, < 5
  var query = "SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5 ORDER BY stock_quantity;";
  
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

    //call the function again in case the manager wants to do something else
    setTimeout(manageInventory, 1000);
  });  
}

function addToInventory() {
  //prompt manager which product he/she wants to add inventory to
  inquire.prompt([
  {
    name : "productId",
    type : "input",
    message : "Please enter the product id you would like to add inventory to : "
  },
  {
    name : "quantity",
    type : "input",
    message : "How many quantities do you want to add to this product? "
  }
  ]).then(function(response) {
    //update query
    var query = "UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?;";
    //execute the query
    connection.query(query, [response.quantity, response.productId], function(error, response) {
      if (error) {
        throw error;
      }

      console.log("Updating product inventory...");

      //call the function again in case the manager wants to do something else
      setTimeout(manageInventory, 1000);
    });

  });


}

function addNewProduct() {
  //promot the manager to provide new product info
  inquire.prompt([
    {
      name : "product",
      type : "input",
      message : "Please enter product name : "
    },
    {
      name : "department",
      type : "input",
      message : "Please enter department name : "
    },
    {
      name : "price",
      type : "input",
      message : "Please enter price : "
    },
    {
      name : "quantity",
      type : "input",
      message : "Please enter stock quantity : "
    }
  ]).then(function(response) {
    //insert query 
    var query = "INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";
    
    //execute insert query against the database
    connection.query(query,[response.product, response.department, response.price, response.quantity], function(error, response) {
      if (error) {
      throw error;
      }

      console.log("Adding new product into inventory...");

      //call the function again in case the manager wants to do something else
      setTimeout(manageInventory, 1000);
    });
  });
}

manageInventory();
//displayLowInventory();
