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
    readProducts();
});

function readProducts() {
    let query = "SELECT item_id, products_name, department_name, price, stock_quantity FROM products";
    connection.query(query, function (err, results) {
        if (err) throw err;
        console.log("These are all the avaliable products we have!")
        for (i = 0; i < results.length; i++) {
            console.log(results[i].item_id, results[i].products_name, results[i].price);
        }
        selectProduct();
    })
}

function selectProduct() {
    inquirer.prompt(
        {
            type: "input",
            message: "What product ID would you like to buy?",
            name: "itemId"
        }
    )
        .then(function (response) {
            selectQty(response.itemId)
        })
}
function selectQty(itemId) {
    inquirer.prompt(
        {
            type: "input",
            message: "How many would you like to buy?",
            name: "qty"
        }
    )
        .then(function (qtySelection) {
            console.log("\nYou have selected Item ID: " + itemId);
            console.log("You have selected a quantity of: " + qtySelection.qty);
            let query = "SELECT * FROM products WHERE ?"
            connection.query(query, { item_id: itemId }, function (err, results) {
                if (err) throw err;
                let currentStock = results[0].stock_quantity;
                let newStock = results[0].stock_quantity - qtySelection.qty;
                if (currentStock < qtySelection.qty) {
                    console.log("\nInsufficient quantity!\nPlease select a quantity less then " + currentStock+"\n");
                    selectQty(itemId);
                }
                else {
                    let total = results[0].price * qtySelection.qty;
                    console.log("\nYour total for " + qtySelection.qty + " " + results[0].products_name + " is: " + total);
                    console.log("Thank you for your purchase!");
                    updateQty(newStock, itemId);
                }
            })
        })
}

function updateQty(newStock, itemId) {
    query = "UPDATE products SET stock_quantity = ? WHERE item_id = ?"
    connection.query(query, [newStock, itemId], function (err, results) {
        if (err) throw err;
        // console.log(results.affectedRows + " products updated!\n");
    })
    connection.end();
}