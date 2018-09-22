let inquirer = require("inquirer");
let request = require("request");
let mysql = require("mysql");

let connection = mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    showItems();
    var t = setTimeout(function(){ buyItem() }, 2000);
    // createProduct();
});

// function 

function buyItem() {
    inquirer
        .prompt({
            name: "main",
            type: "input",
            message: "\nWhich product would you like to buy (choose by number)?",
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products ORDER BY item_id", function (err, res) {
                if (err) throw err;

                console.log("-------------------------------------------------------------\n");
                
                for (let i = 0; i < res.length; i++) {
                    let x = res[i].item_id;
                    if (x === answer.main) {
                        console.log("balls");
                        // console.log(this.item_id + ". " + this.product_name + " - " + this.description + "  $" + this.price + "\n");
                        // console.log("There are " + this.stock_quantity + " in stock.");
                    }
                }
                console.log("\n-------------------------------------------------------------\n");
            });
        });
};

function showItems() {
    console.log("\nShowing all available products...");
    console.log("-------------------------------------------------------------\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            console.log(res[i].item_id + ". " + res[i].product_name + " - " + res[i].description + "  $" + res[i].price);
        }
        console.log("\n-------------------------------------------------------------\n");
    });
}