var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connection ID: " + connection.threadId + "\n");
    readProducts();
});

function readProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log("These are all the avaliable products we have!")
        for (i = 0; i < results.length; i++) {
            console.log(results[i].item_id, results[i].products_name, results[i].price);
        }
    })
    userInput();
};
function userInput() {
    inquirer.prompt([
        {
            type: "input",
            message: "What product ID would you like to buy?",
            name: "buyID"
        },
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "quantity"
        }
    ])
        // Once the customer has placed the order, your application should check if your store has 
        //enough of the product to meet the customer's request.
        .then(function (inquirerResponse) {
            if (inquirerResponse.quantity <= results[i].stock_quantity) {
                console.log("We're Good!");
            }
            // If not, the app should log a phrase like `Insufficient quantity!`, 
            //and then prevent the order from going through.
            else {
                console.log("Insufficient quantity!")
            }

            updateQuantity();
        })
};

//if your store _does_ have enough of the product, you should fulfill the customer's order.
//  * This means updating the SQL database to reflect the remaining quantity.
//  * Once the update goes through, show the customer the total cost of their purchase.


function updateQuantity (){
 var newQuantity = parseInt(results[i].stock_quantity - inquirerResponse.quantity)
connection.query("UPDATE products SET ? WHERE ?")
[
      {
        stock_quantity: newQuantity
      },
      {
        item_id: inquirerResponse.buyID
      }
    ],
checkout();
};

function checkout (){
var total = parseInt(results[i].price * inquirerResponse.quantity)
console.log("Your Total Is: " + total);
connection.end();
    };




