var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connection ID: "+ connection.threadId +"\n");
    readProducts();
});

function readProducts() {
    connection.query("SELECT * FROM products", function(err, results){
        if(err) throw err;
        console.log(results);
        connection.end();
    });
}