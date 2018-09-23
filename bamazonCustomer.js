let inquirer = require("inquirer");
let request = require("request");
let mysql = require("mysql");
let chalk = require("chalk");

let connection = mysql.createConnection({
    host: "LocalHost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;

    inquirer
        .prompt({
            name: "main",
            type: "list",
            choices: ["View and Purchase Items", "Creator", "Quit"],
            message: chalk.cyan.bold("\nWelcome to the Film Prop Market (FPM)!\nMake a selection below....\n")
        }).then(function (response) {

            switch (response.main) {
                case "View and Purchase Items":
                    showItems();
                    var t = setTimeout(function () { selectItem() }, 2000);

                    break;
                case "Creator":


                    break;
                case "Quit":
                    connection.end();
                    break;
            }
        });



    // createProduct();
});

// function 

function selectItem() {
    inquirer
        .prompt({
            name: "main",
            type: "input",
            message: chalk.cyan.bold("\nWhich product would you like to buy (choose by number)?"),
        })
        .then(function (answer) {
            connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;

                console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
                for (let i = 0; i < res.length; i++) {
                    if (parseInt(res[i].item_id) === parseInt(answer.main)) {
                        console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price) + "\n");
                        console.log(chalk.inverse.bold.italic("There are currently " + res[i].stock_quantity + " in stock."));
                    }
                }
                console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));

                inquirer
                //     .prompt({
                //         name: "notMain",
                //         type: "input",
                //         message: chalk.cyan.bold("\nHow many would you like to purchase?"),
                //     })
                //     .then(function (other) {
                //         connection.query("UPDATE products SET ? WHERE ?", [
                //             {
                //                 stock_quantity: stock_quantity - other.notMain
                //             },
                //             {
                //                 item_id: answer.main
                //             }
                //         ], function (err, res) {
                //             if (err) throw err;

                //             console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
                //             for (let i = 0; i < res.length; i++) {
                //                 if (parseInt(res[i].item_id) === parseInt(answer.main)) {
                //                     console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price) + "\n");
                //                     console.log(chalk.inverse.bold.italic("There are currently " + res[i].stock_quantity + " in stock."));
                //                 }
                //             }
                //             console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));

                //             // buy function(update)

                //             // menu menu
                //         });
                //     });
            });
        });
};

function showItems() {
    console.log(chalk.cyan.bold("\nShowing all available products..."));
    console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        for (let i = 0; i < res.length; i++) {
            console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price));
        }
        console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));
    });
};