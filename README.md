# bamazon
An Amazon-like storefront Node Application. This app has 3 different views which perform different tasks - Customer, Manager and Supervisor.

### Customer View
#### *Background*
In this view the user gets two prompts 
* To provide the id of the product they wish to purchase
* Provide how many units of the product they wish to buy

After providing the input, the app checks against the inventory to determine if there is enough to fulfill the order. If inventory isn't sufficient, the order gets canceled. Otherwise, the oreder gets processed.

#### *Instructions*
Using the terminal(Mac) or command line(PC), navigate to the bamazon local repo directory and run this command - `node bamazonCustomer.js`. Respond to the series of prompts as per the demo below.

#### *Demo*
![Customer View](assets/gifs/bamazon_customer.gif)

### Manager View
#### *Background*
In this view a manager is provided with these menu options 
* View Products for Sale - lists all available products for sale
* View Low Inventory - lists all products which are low in inventory. The low inventory treshold is currently set to quantity of 5.
* Add to Inventory - allows the manager to replenish inventory level(s) by adding stock quantity to specific product. The manager responds to a series of prompts 
  * Provide product ID to be replenished
  * Provide quantity to add to product chosen
* Add New Product - adds new product into current inventory. The manager responds to a series of prompts
  * Provide product name
  * Provide department name
  * Provide product price
  * Provide stock quantity

#### *Instructions*
Using the terminal (Mac) or command line (PC),  navigate to the bamazon local repo directory and run this command - `node bamazonManager.js`. Respond to the series of prompts as per the demo below.

#### *Demo*
The below gif demos these features of the Manager View
* View Products for Sale 
* View Low Inventory
* Add to Inventory

![Customer View](assets/gifs/manager_view_part1.gif)

The below gif demos the Add New Product feature of the Manager View

![Customer View](assets/gifs/manager_view_part2.gif)

### Supervisor View
#### *Background*
In this view a supervisor is provided with these menu options
* View Product Sales by Department - shows a report of total product sales by department along with these relavant information
  * Overhead Cost
  * Product Sales
  * Total Profit
* Create New Department - a supervisor can add a new department by responsing to a series of prompts pertaining to 
  * Department Id
  * Department Name
  * Overhead Cost

#### *Instructions*
Using the terminal (Mac) or command line (PC),  navigate to the bamazon local repo directory and run this command - `node bamazonSupervisor.js`.  Respond to the series of prompts as per the demo below.

#### *Demo*





