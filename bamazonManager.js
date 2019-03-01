var mysql = require("mysql")
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
});
//promt to list options --View Products for Sale --View Low Inventory --Add to Inventory --Add New Product
inquirer.prompt({
  type: "list",
  message: "What task would you like to do?",
  choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
  name: "task"
})
  .then(function (response) {
    if (response.task === "View Products for Sale") {
      viewProducts();
    }
    else if (response.task === "View Low Inventory") {
      lowQty();
    }
    else if (response.task === "Add to Inventory") {
      addQty();
    }
    else if (response.task === "Add New Product") {
      addProduct();
    }
  })
// "View Products for Sale"
function viewProducts() {
  // List: item-id, names, prices, quantites
  let query = "SELECT item_id, products_name, price, stock_quantity FROM products";
  connection.query(query, function (err, results) {
    if (err) throw err;
    for (i = 0; i < results.length; i++) {
      console.log(results[i].item_id, results[i].products_name, results[i].price, results[i].stock_quantity);
    }
  });
  connection.end();
}
// "View Low Inventory"
function lowQty() {
  // List items with stock_quantity < 50
  let query = "SELECT item_id, products_name, stock_quantity FROM products WHERE stock_quantity < 50";
  connection.query(query, function (err, results) {
    if (err) throw err;
    for (i = 0; i < results.length; i++) {
      console.log(results[i].item_id, results[i].products_name, results[i].stock_quantity);
    }
    if (results.length === 0) {
      console.log("\nAll inventory is above low quantity\n")
    }
  })
  connection.end();
}
// "Add to Inventory"
function addQty() {
  // Allows the manager to "add more" to any available items
  let query = "SELECT * FROM products";
  connection.query(query, function (err, res) {
    if (err) throw err;
    // console.log("Choices:\n", choices);
    // Prompt asking what item_id
    inquirer.prompt([
      {
        type: "rawlist",
        message: "Which product would you like to update\n",
        name: "item",
        choices: function () {
          let choiceArray = [];
          for (let i = 0; i < res.length; i++) {
            choiceArray.push(res[i].products_name);
          }
          return choiceArray;
        }
      },
      {
        type: "input",
        message: "How much qty do you want to add?",
        name: "qty"
      }
    ])
      //**************************************************************/ 
      //DOES NOT WORK FROM THIS POINT ON
      //***************************************************************/
      .then(function (answer) {
        // Take response and update MYSQL
        let chosenItem;
        let newQty
        for (let i = 0; i < res.length; i++) {
          if (res[i].products_name === answer.item) {
            chosenItem = res[i];
          }
          console.log(chosenItem);
        }
        // let query = "UPDATE products SET ? WHERE ?"
        // connection.query(query,
        //   [
        //     {
        //       stock_quantity: ""
        //     }
        //   ]
        // );
      })
  })
  connection.end();
}


// // "Add New Product"
// function addProduct() {
//     // Add a new product to the database
//     // INSERT * INTO **
// }
