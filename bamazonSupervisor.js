//require inquirer
var inquire = require("inquirer");

//require console.table
require ("console.table");

//require mysql
var mysql = require("mysql");

//set up mysql connection
var connection = mysql.createConnection(
  {
    host : "localhost",
    user : "root",
    password : "password",
    database : "bamazon"
  }
);

//make the connection
connection.connect();

function promptSupervisor() {
  //prompt the supervisor to ask what he/she wants to do
  inquire.prompt([
  {
    name : "options",
    type : "list",
    message : "Menu Options",
    choices : ["View Product Sales by Department","Create New Department", "Exit"]
  }
  ]).then(function(response) {
    //evaluate the response
    switch (response.options) {
      case "View Product Sales by Department":
        viewProductSalesByDepartment();
        break;
      case "Create New Department":
        createNewDepartment();
        break;
      case "Exit":
        process.exit();
        break;
    }
  }); 
}

function viewProductSalesByDepartment() {
  //query which will join the products and deparements tables
  var query = `SELECT b.department_id, b.department_name, b.over_head_costs, SUM(a.product_sales) AS product_sales , SUM(a.product_sales - b.over_head_costs) AS total_profit 
  FROM products a
  INNER JOIN departments b
  ON a.department_name = b.department_name
  GROUP BY b.department_id, b.department_name, b.over_head_costs`;

  //execute the query against the database
  connection.query(query, function(error, results) {

    //create an array of department sales objects
    var departmentSalesArray = results.map(function(element) {
      return {
        "Department ID" : element.department_id,
        "Deparement Name" : element.department_name,
        "Overhead Costs" : element.over_head_costs,
        "Product Sales" : element.product_sales,
        "Total Profit" : element.total_profit
      }
    });

    //print the report on the console
    console.table("Report : Product Sales by Deparement" , departmentSalesArray);

    //go back to the prompt screen
    setTimeout(promptSupervisor,500);
  });
}

function createNewDepartment() {
  //prompt supervisor to provide new department info
  inquire.prompt([
  {
    name : "departmentName",
    type : "input",
    message : "Please provide the new department name : "
  },
  {
    name : "overheadCost",
    type : "input",
    message : "Please provide the overhead cost : "
  }
  ]).then(function(response) {
    //query that inserts new department info
    var query = "INSERT INTO departments(department_name, over_head_costs) VALUES (?,?)";
   
    //execute the query against the database
    connection.query(query, [response.departmentName, response.overheadCost], function(error, results) {
      if (error) {
        throw error;
      }
      //confirm that the new department is being added
      console.log("New department is being added...");

      //go back to the prompt screen
      setTimeout(promptSupervisor,500);
    });

  });
}

promptSupervisor();