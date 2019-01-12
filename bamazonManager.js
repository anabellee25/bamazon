var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: 'root',

    password: "Googleit1232",
    database: 'bamazon'
});

connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });
  
  function runSearch() {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View Products for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add New Product"
        ]
      }).then(function(answer) {
        switch (answer.action) {
        case "View Products for Sale":
          viewProducts();
          break;
  
        case "View Low Inventory":
          viewLowInv();
          break;
  
        case "Add to Inventory":
          addToInv();
          break;
  
        case "Add New Product":
          addNewProduct();
          break;
        }
      });
    };

function viewProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;

        for (var i = 0;i < res.length; i++) {
            console.log(
                " ITEM#: " + res[i].item_id + " |"+
                " Product: " + res[i].product_name + " |" +
                " Department: " + res[i].department_name + " |" +
                " Price: " + res[i].price + " |" +
                " Inventory: " + res[i].stock_quantity )  
        }
    })
};

function viewLowInv() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res) {
        if (err) throw err;
        if (res[0] == undefined){
            console.log("Looks like everything is well stocked boss!")
        }
              else {
                 console.table(res)
           }
     })
}

function addToInv() {
    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        console.table(res);
        addStock();
    });
}

function addStock() {

    inquirer.prompt([{
        name: "item",
        type: "input",
        message: "Please enter the Item# of the Product you would like to restock"
    }, {
        name: "quantity",
        type: "input",
        message: "How many would you like to add?"
    }
 ]).then(function(answer){
        connection.query("SELECT * FROM products", function(err, res) {
            if (err) throw err; 
            for (var i = 0; i < res.length; i++) {
                if (res[i].item_id === parseInt(answer.item)) {
                    selectedItem = res[i];
                };
            };

            connection.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: (selectedItem.stock_quantity + parseInt(answer.quantity))},
                {item_id: selectedItem.item_id}
            ],
            function (err) {
                if (err) throw err;
                console.log("Your products have been restocked!");
                viewProducts();
            });
        });
    });
};

function addNewProduct () {
    inquirer.prompt([{
        name: "item",
        type: "input",
        message:"What's the name of the item?"
    }, {
        name: "department",
        type: "input",
        message: "What department?"
    }, {
        name: "price",
        type: "input",
        message: "What's the price?",
    }, {
        name: "quantity",
        type: "input",
        message: "How many?"
    }
    ]).then(function(answer, err) {
        connection.query('INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("' +
         answer.item + '","' + answer.department + '","' + parseInt(answer.price) + '","' + parseInt(answer.quantity) + '")', function(err, res, fields) {
             if (err) throw err;
             console.log("Item Added!");
             viewProducts();
         })
    })
}