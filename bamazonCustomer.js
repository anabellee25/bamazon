var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: 'root',

    password: "",
    database: 'bamazon'

});

connection.connect(function (err){
    if (err) throw err;
    displayItems();

});

function displayItems(){
    connection.query("SELECT * FROM products", function(err, res) {
        if(err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(
                "ITEM#: " + res[i].item_id + " |"+
                " Product: " + res[i].product_name + " |" +
                " Price: " + res[i].price)
        };
    promptUser();

    });
};

function promptUser() {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Please enter the Item# of the Product you would like to buy"
    }, {
        name: "quantity",
        type: "input",
        message: "How many would you like to buy?"
    }
  ]).then(function(answer) {
      connection.query("SELECT * FROM products", function(err, res) {
          if (err) throw err;
          for (var i = 0; i < res.length; i++) {
              if (res[i].item_id === parseInt(answer.item)) {
                  selectedItem = res[i];
              } 
          }

          if (selectedItem.stock_quantity > parseInt(answer.quantity)) {
              connection.query("UPDATE products SET ? WHERE ?",[
                  {stock_quantity: (selectedItem.stock_quantity - parseInt(answer.quantity))},
                  {item_id: selectedItem.item_id}
            ],
            function(err) {
                if (err) throw err;
                console.log("Your order is on it's way! Your total today is " + "$" + parseInt(answer.quantity) * selectedItem.price);
            }
            
              );
          } else {
              console.log("Sorry, we don't have enough in stock. We will be restocking soon!");
          }
        
      });
  });
};
  