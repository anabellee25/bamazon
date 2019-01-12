# bamazon-node-mysql-app

## What is it?

This is bamazon, an app where you can "purchase" things that bamazon has to offer as a Customer, and manage, view, and change inventory as a Manager.

In this is app, you are utilizing MySQL in order to store and access data for products available for sale. 

## How to Use?

* Open mySQL and set up a localhost connection!
* Start out by opening up MySQL Workbench and hitting the (+) button next to the text which reads "MySQL Connections". Sequel Pro will also have a (+) on the bottom left for new connections.
* Enter the following credentials into the on-screen prompt...
  * Connection Name: Local Instance MySQL
  * Connection Method: Standard (TCP/IP)
  * Hostname: localhost
  * Port: 3306
  * Username: Suggested to default to "root", but you can add your own. 
  * Password: <Your MySQL Password> 
  * Keep the Default Schema field empty
  * Hit "Test Connection" and, if the connection is successful, hit okay and double-click on the newly created field under the "MySQL Connections" text on the home page

* Once your local host is all set up it's time to create a database with some mock products. 
  * Create a database named bamazon.
  * In that database, create a table named products with the following columns:
    * item_id INTEGER(10) NOT NULL AUTO_INCREMENT,
    * product_name VARCHAR(80),
    * department_name VARCHAR(80),
    * price DECIMAL(10,2),
    * PRIMARY KEY(item_id)
  * Add mock products to that table.
  * After adding mock products, use SELECT * FROM products to view your table!
  * Refer to image below for a visual guide!

![snippet of mySQL](/images/sql1.png)
![snippet of mySQL](/images/sql2.png)


* Once your SQL database is created, it's time to clone this repository onto your computer.
* In bamazonCustomer.js, add your mySQL username(line 8), password(line 10) and database name(line 11), in this case it's 'bamazon'. Do the same in bamazonManager.js.
* Now launch Terminal/GitBash/Command line and run 'npm install' within your directory in order to install your node-modules.

![snippet of npm installation](/images/npm.png)

* Once all is done you're ready to have fun with bamazon!

## bamazonCustomer.js

### What do the commands do?

When node bamazonCustomer.js is run in the command line it will list all products available for purchase. 
 * Enter the item number of the product you would like to purchase.
 * Enter how many you would like to purchase.
 * This will query the mySQL database for stock quantity of products and will sell them to you if there are enough in stock. If not... then you can order when they're restocked!

 ![snippet of customer prompts](/images/customer1.png)

 ## bamazonManager.js

 ### What do the commands do?

 When node bamazonManager.js is run, this will allow you to view, restock, and add new inventory to the products.
 ![snippet of manager prompts](/images/manager1.png)

  * The first choice shows all inventory
 ![snippet of manager prompts](/images/manager2.png)

  * The second choice shows any low inventory
 ![snippet of manager prompts](/images/manager3.png)

  * The third choice allows you to restock inventory. 
  * Answer the following prompts and the inventory will be replenished
 ![snippet of manager prompts](/images/manager4.png)

 ![snippet of manager prompts](/images/manager5.png)

  * The fourth choice allows you to add inventory.
  * Answer prompts and inventory will be added to the database.
 ![snippet of manager prompts](/images/manager6.png)

 ## Languages Used
  * JavaScript
  * npm
  * node.js
  * mySQL

## npm Packages Used
  * mysql
  * inquirer

## Author

### Ana Lee