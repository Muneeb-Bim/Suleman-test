const Sequelize = require("sequelize");
module.exports = new Sequelize("yelpp" , "postgres" , "Suleman@123", {
    host: "localhost",
    dialect: "postgres",
    // operatorsAliases: false,
    pool: 5432,

}) 
