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

};

function newProduct() {

};

connection.connect(function mainGame(err) {});