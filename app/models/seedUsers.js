// const User = require('./userModel');
const db = require("../models");
const User_data = db.user_data;


User_data.bulkCreate([
    {user: 'h', password: 'h', isadmin: 1},
    {user: 'hhh', password: 'hhh', isadmin: 1},
    {user: 'aaa', password: 'a', isadmin: 0}
]);

