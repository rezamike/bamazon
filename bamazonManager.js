let inquirer = require("inquirer");
let request = require("request");
let mysql = require("mysql");
let chalk = require("chalk");

var index;

let connection = mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

function productList() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
        for (let i = 0; i < res.length; i++) {
            console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price));
            console.log(chalk.inverse.bold.italic("There are currently " + res[i].stock_quantity + " in stock.\n"));
        };
        console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));
    });
};

function lowInv() {
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
        for (let i = 0; i < res.length; i++) {
            if (res[i].stock_quantity <= 5) {
                console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price));
                console.log(chalk.inverse.bold.italic("There are currently " + res[i].stock_quantity + " in stock.\n"));
            }
        };
        console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));
    });
};

function addInv() {
    inquirer
        .prompt({
            name: "main",
            type: "input",
            message: chalk.cyan.bold("\nWhich product would you like to update (choose by number)?"),
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;

                console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
                for (let i = 0; i < res.length; i++) {
                    if (parseInt(res[i].item_id) === parseInt(answer.main)) {
                        console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price));
                        console.log(chalk.inverse.bold.italic("There are currently " + res[i].stock_quantity + " in stock.\n"));
                        index = i;
                    }
                };
                console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));

                inquirer
                    .prompt({
                        name: "notMain",
                        type: "input",
                        message: chalk.cyan.bold("\nWhat's the new quantity?"),
                        choices: ["Back"]
                    })
                    .then(function (other) {
                        connection.query("UPDATE products SET ? WHERE ?", [
                            {
                                stock_quantity: other.notMain
                            },
                            {
                                item_id: res[index].item_id
                            }
                        ], function (err) {
                            if (err) throw err;

                            var w = setTimeout(function () { connection.end() }, 4000);
                        })

                        console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
                        console.log(chalk.green.bold.italic("\nYour update went through!\n"));
                        console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));
                    });
            });
        });
};

function newProduct() {
    inquirer
        .prompt([
            {
                name: "main1",
                type: "input",
                message: chalk.cyan.bold("\nProduct name?")
            },
            {
                name: "main2",
                type: "input",
                message: chalk.cyan.bold("\nProduct description (short)?")
            },
            {
                name: "main3",
                type: "input",
                message: chalk.cyan.bold("\nProduct department?")
            },
            {
                name: "main4",
                type: "input",
                message: chalk.cyan.bold("\nProduct price?"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "main5",
                type: "input",
                message: chalk.cyan.bold("\nProduct quantity?"),
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            connection.query("INSERT INTO products SET ?", [
                {
                    product_name: answer.main1,
                    description: answer.main2,
                    department_name: answer.main3,
                    price: answer.main4,
                    stock_quantity: answer.main5
                }
            ], function (err, res) {
                if (err) throw err;

                console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
                console.log(chalk.green.bold.italic("\nYour new product has been added!\n"));
                console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));
                
                var q = setTimeout(function () { connection.end() }, 2000);
            });
        });
};

connection.connect(function mainGame(err) {
    if (err) throw err;

    inquirer
        .prompt({
            name: "main",
            type: "list",
            choices: ["View Inventory", "View Low Inventory", "Add Product Quantity", "Add New Product", "Quit"],
            message: chalk.cyan.bold("\nWelcome to the Film Prop Market (FPM) -- MANAGER PORTAL.\nMake a selection below....\n")
        }).then(function (response) {

            switch (response.main) {
                case "View Inventory":
                    productList();

                    var r = setTimeout(function () { mainGame() }, 4000);
                    break;
                case "View Low Inventory":
                    lowInv();

                    var y = setTimeout(function () { mainGame() }, 4000);
                    break;
                case "Add Product Quantity":
                    productList();

                    var q = setTimeout(function () { addInv() }, 2000);
                    break;
                case "Add New Product":
                    newProduct();

                    break;
                case "Quit":
                    connection.end();
                    break;
            }
        });
});