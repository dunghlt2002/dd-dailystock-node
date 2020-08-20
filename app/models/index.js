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

// var sequelize = new Sequelize('d2vdr8rjjghnmh', 'ngetumvsyuzvwq', '167de969b402aadbfb8a54bf54a211576e8c05cb556b27e9f7ab352b48c9a693', {
//   host: 'ec2-54-197-254-117.compute-1.amazonaws.com',
//   dialect: 'postgres',
//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

// Or you can simply use a connection uri
// var sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user_data = require("./userModel.js")(sequelize, Sequelize);
db.dailystock_data = require("./dailystockModel.js")(sequelize, Sequelize);

module.exports = db;
