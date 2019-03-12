// Setup to connect to MySQL

// Dependencies //
var Sequelize = require("sequelize");

// Set up and configure //
    var sequelize = new Sequelize("burgersDB", "root", "easyPass", {
        host: "localhost",
        port: 3306,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 10000 
        }
    });

    module.exports = sequelize;
