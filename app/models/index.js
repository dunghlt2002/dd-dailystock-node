// const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const Pool = require("pg").Pool;

var sequelize = new Sequelize('ddfirstdb', 'postgres', '8_Xaloxalac', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }

});

// Or you can simply use a connection uri
// var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_data = require("./userModel.js")(sequelize, Sequelize);
db.dailystock_data = require("./dailystockModel.js")(sequelize, Sequelize);

module.exports = db;
