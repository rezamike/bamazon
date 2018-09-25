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

connection.connect(function mainGame(err) {
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
                    var t = setTimeout(function () { selectItem() }, 1000);
                    break;
                case "Creator":
                    creator();

                    var z = setTimeout(function () { mainGame() }, 2000)

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

                var index;

                console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
                for (let i = 0; i < res.length; i++) {
                    if (parseInt(res[i].item_id) === parseInt(answer.main)) {
                        console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price) + "\n");
                        console.log(chalk.inverse.bold.italic("There are currently " + res[i].stock_quantity + " in stock."));
                        index = i;
                    };
                };
                console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));

                inquirer
                    .prompt({
                        name: "notMain",
                        type: "input",
                        message: chalk.cyan.bold("\nHow many would you like to purchase?"),
                        choices: ["Back"]
                    })
                    .then(function (other) {
                        if (parseInt(other.notMain) <= res[index].stock_quantity) {

                            connection.query("UPDATE products SET ? WHERE ?", [
                                {
                                    stock_quantity: res[index].stock_quantity - parseInt(other.notMain)
                                },
                                {
                                    item_id: res[index].item_id
                                }
                            ], function (err) {
                                if (err) throw err;

                            })

                            console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
                            console.log("Your order went through! Congratulations!\n" + "\nYou spent " + chalk.red("  $") + chalk.red(res[index].price * other.notMain));
                            console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));

                            var y = setTimeout(function () { connection.end() }, 3000);
                        }
                        else {
                            console.log("There is not enough for that!\nTry again ...");
                            var r = setTimeout(function () { showItems() }, 2000);
                            var s = setTimeout(function () { selectItem() }, 3000);
                        };
                    });
            });
        });
};

function showItems() {
    console.log(chalk.cyan.bold("\nShowing all available products..."));
    console.log(chalk.cyan.bold("-------------------------------------------------------------\n"));
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;

        console.log("\n");
        for (let i = 0; i < res.length; i++) {
            console.log(chalk.gray(res[i].item_id) + ". " + chalk.green(res[i].product_name) + " - " + chalk.italic(res[i].description) + chalk.red("  $") + chalk.red(res[i].price));
        }
        console.log(chalk.cyan.bold("\n-------------------------------------------------------------\n"));
    });
};

function creator() {
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((%@%&******************************///////////////////(((");
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@((@@%&*******************************/////////////////((((");
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@@&&&@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@(#@@%&********************************///*//////////////((");
                console.log("@@@@@@@@@@@@@@@@@@@@@@@@&&&&@@@@@@@@@@@@@@@@@@@@&&&&%%%&@@@@@(%@@%%**********************************/*//////////////((");
                console.log("@@@@@@@&@&@@@@@@@@@@@@@@&%&&@@@@@@@@@@@@@@@@%%%%%&&@&&&&&&&&&(@@@%%,********************************/*/*/////////////(/");
                console.log("@@@@&&&&&&&&&&&&&&@@@@@@&%%&@@@@@@@@@@@@@&%&&&&&@@@&@@&&&&&@&%&&%**,**********************************///////////////");
                console.log("@@@&%####%%%%&&&&&&&&&&&&%%&&@@@@@@@@@@@&&&&&&&&&&&&@@@@@@&@@@&&&%#,,,********************************/*///////////////");
                console.log("&&&%#(((((%%%%%%%%%%%%&&%%%%&@@@@@@@@@@&@@&@&&&&&@@&&&&@@@@@@@@&&@@#,,,**********************************//////////////");
                console.log("%%%%%(((((#########%%%&&%%%%&@@@@@@@@@&&@@&&&&&%&&&&&&%&&@@&@@&&@@@@*,,***********************************/////////////");
                console.log("#%%%%%############%%%%&&%%%&@@@@@@@@&&@&&&&@&&&&&&&&@@@@@&@@&&&&&@@@/,,,,***********************************///////////");
                console.log("####%%%%####%%%%%%%%%&&&%###%%&&&&&&%@@&@@@@@@@@&&&@@@@@@@@&@@@@@@@@@*,,,,*********************************//*/////////");
                console.log("%%%%%%%%%%%%%%%%%%&&&&&&%######%%%%%&@@@@@&@@&&%%%%%&&%%%%&&@@@@@@@@#,,,,,,*,***,****************************//////////");
                console.log("%%%%%%&&&&&&&&&&&&&&&&&####%%%%%%%@@@%((####((//////////(#&@@@@@@@(,,,,*****,*******************************/////////");
                console.log("&&&&&&&&&&&&&&&&&&&&&@&%#####%%%%%%%@@@(////**************/(#&@@@@@@(,***************************************//*///////");
                console.log("&&&&&&&&&&&&&&&&&&&&@@&%####%&&&&&(*@@%(//***,,,,,**********(%@@@@@@(*****************************************/*///////");
                console.log("&&&&&&&&&&&&&&&&&%#((#%%###%%&&&&(,,/@((///*,,,,,,,,,,,***///(&@@@@(*********************************************//////");
                console.log("%%#(//((#%%%%%&%/,...,/%&%%&&@@@@/   @/(%&@@**,,**(##%%%#((/(&@@##**********************************************/////");
                console.log("%*.     .*#&&&&&(***(#%#%%&&&&&*  *&//#&%%&%%(//#%%%#(((#((//&@@@***********************************************/*///");
                console.log("%/,,,,,,,*(%&&%%*,   .,(#####(((((//(%/**/(##(((**/###@@&(///&@@%*************************************************///");
                console.log("%*.       ,(####(/////*..,.       .. .//******//,**/*/////**//#@&@&**************************************************//");
                console.log("%(,....,,*/((####(,.           .      &/***,,//*,**/******///(@%#@************///***********************************//*");
                console.log(",,,..,*//((((/.               ..      %%/****/*,,**//****//(#&*#************//**************************************/");
                console.log("///*********   .    .         .    .  (@%****/#//(##****//(%@@*,,/***********/*//**************************************");
                console.log("***********                   ..      .@@#&@@@@@@@@&%##//#@@@...*..  .,*****////***************************************");
                console.log("**********              ..    ..   .   %%@%%(#####%%&@@&%@@#....(.  . ..**/*////***************************************");
                console.log("*********                .    .    .   .@&%(#(((####&@@%.,...(... ...   */////***************************************");
                console.log("********                 ..  ..    .    /&@&&@&&%&@@@(,...**,,...,..    .,////***************,,**********************");
                console.log("*******                  ..  ..          (%%%%@@@@@@@/,.%@@@,.....,..   ,   ...****************************************");
                console.log("******,        .       . ..  ....      *,,,*(/*/#(**,,.,&@@(.........  .        ...************************************");
                console.log("******                 . ..  ....     .*,,.../*,,*,,,...,,..............            . ..*******************************");
                console.log("**//*/                .....  .. .     ........(*,*,,.,,,.......,.........          .  ..  .....*,**********************");
                console.log("*////.              .......  .. .      .......,,,,,,,,... ....,...................... .. ....  .... ..........*********");
                console.log("//(/,                ......  .           . .,,...,.,...  ....,..... ...................... ........,........,....******");
                console.log("((/*                  .,...               ............   ...,........,.,,.,,,,,.......... .........................,***");
                console.log("(//                    ....  .           ..    ......   . .,..........,,.,,,,,....,,,...,.......,,....   .. ........,**");
                console.log("//.                     ,,. ...               .  ... .....,..........,*.,,,,,...,,,,,,.......,(####(((((,. . ........,*");
                console.log("/*                     .,,......       . ..  ...... .....,..........,,.*,,,,..,,,,,,,,*((#####((((((/((((((,...........");
                console.log("#                      .*,....       ..  .  ......    ..,.........,*,*,,,.,,,,**(######(/(((/((((((((((######/.......,,");
                console.log(",                    ..*,,..       .,.  .   ....     ..,,........****,,,.,,/#(//******//*///(((((((##((((((((###*,,,**/");
                console.log("                     ./,,*.      ..,..       ..    ..,,,,......,****,,,,*/////***,*((##(((((((((##((((((####%%%&&&%/*/#");
                console.log("                    ./*,*,,,,,*/*,,,...... ...   ...,,,,,,...,/***///**//*****//**/(##(((##%%%#%%%%#%%%%%%&@@@&&&&&&%&&");
                console.log("                   .(/,****///**,,,,....   ..  ,...****.....//*/*///*/////////**//(&&&&&&&&@@@@@@@@@@@@@@@@&&&&&&&%%%%%");
                console.log("                   ,(/*///////**,,,.......,..,*.. ...,.,,*///*****/**///*/(////#%%&&&&&&&&&&&&&&&@&&@@@@@&&&&&&&&&&%%%%");
                console.log("                    ##((((((/**,,,.........,**,......,*(//*///*,*//*,*//**////#&&&&&&&&&&&&&&&&@@@@&&&&&&&&&&&&&&&&&&&&");
                console.log("                   (&%#((((//**.........,*//,,.....*/((//(((/**(/#(/**((/**///%&&&&&&&&&&&&&&&&@&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("                  ,##((%((//////*,,,,,**//,...,,,,//////(#*,*((##%#//*(%///&&&&@@@@&@@@@@@&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("                  ////((*////*,,,******/*,,...,,**///*/(#(**(((/(%(//&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("                 //*,/*,,,***,*///////*,,,,..,,,*///((/((##(////#&&%(/*(&&&&&&&&&&&&&&&&&&&%&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                console.log("               .***/*,,,***//(*******,,..,,..,**//((/(((##&%##%%%%%%%(//(%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%&&&&");
                console.log("*             .,.*(****//////,,,.,..,,,,,*/((((#(((((/((#%%%%%%%#%%####((#%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log(".              .,(////***,,,......,,,,,**//(((////**(((######################################%%%%%%%%%%%%%%%%%%%%%%%%%%");
                console.log("                ,*,,,,,,,,.......,,,,*/((/////****((((#####((((((((((((#############################################%%%");
                console.log("...          . .,**,,,,,,,,,,,,,,,*/////******//(((((((((((((((((((((((((((((((((((####################################");
                console.log(",.............,,,,,,,,*********///*******/////(((((((((((((((((((((((((((((((((((((((((((((((##########################");
                console.log("/**/*,,,,.,,,,,,************//******////////((((((((((((((((((((//(/((((((((((((((((((((((((((((#((####################");
                console.log("//////****************////**///////////////((((((((((((((((((((/(////((((((((((((((((((((((((##########################");
                console.log("(//////**************//////////////////(((((((((((((((((((((((((((((((((((((((((((((((############################%%%%%");
                console.log("(((//////////////////////////////////((((((((((((((((((((((((((((((((((((((((######################%%#%%%%%%%%%%%%%%%%%");
                console.log("((((((//////////////////////(((((((((((((((((((((((((#(#######((#(((#########################%%%%%%%%%%%%%%%%%%%%%%%%%&");

                request("http://artii.herokuapp.com/make?text=Michael Sanaiha&font=trek", function (error, response, body) {

                    if (!error && response.statusCode === 200) {

                        console.log(body);
                    }
                });
}