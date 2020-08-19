const db = require("../models");
const User_data = db.user_data;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');
const utils = require('../utils');

// verifying 07162020 - khong xai nua 0717
exports.verify = async (req, res) => {
  
  const checktoken = req.headers.authorization;
  const user = req.params.id

  console.log('hihihi we are here verifying ' + user);

  const isVerified = utils.tokenverify(user, checktoken);
  console.log('isverify: ' + isVerified);
  res.send(true);
     
};



// signin 07112020
exports.signin = async (req, res) => {
  
    //console.log('body ' + req.body);
    const user = req.body.user;
    const password = req.body.password;

    console.log('hihihi we are here signin ' + user);

    const userSelect = await User_data.findOne({ where: {user: user, password: password} });

    if (userSelect) {
            res.send({
                id: userSelect.id,
                user: userSelect.user,
                isadmin: userSelect.isadmin,
                token: utils.generateToken(userSelect)
            });
            console.log('data return trong backend ' + userSelect.user);
    } else {
      res.status(401).send({ error: 'Invalid Email or Password.' });
    }
       
  };



// Create and Save a new User
exports.create = (req, res) => {
  console.log('user in body ne eeeee  ' + req.body.user);
  // Validate request
  if (!req.body.user) {
    res.status(400).send({
      message: "User name can not be empty!"
    });
    return;
  }

  // Create a User
  const newUser = {
    user: req.body.user,
    avatar: req.body.avatar,
    email: req.body.email,
    isadmin: req.body.isadmin,
    password: req.body.password
  };

  // Save User in the database
  User_data.create(newUser)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User_data."
      });
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  console.log('hihihi we are here ALL users');

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {user: { [Op.like]: `%${search_keyword}%`} }, 
      {id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  User_data.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};

// Retrieve all Users from the database and count All
exports.findAndCountAll = (req, res) => {
  console.log('hihihi we are here users count all');
  let limit = 15;   // number of records per page
  let offset = 0;
  

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;
  console.log('keyword' + search_keyword);
  var group = ['id'];
  var condition = search_keyword ? 
  {
    [Op.or]: [
      {user: { [Op.like]: `%${search_keyword}%`} }, 
      {email: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  User_data.findAndCountAll({ where: condition })
    .then(data => {
      let page = req.params.currentPage;      // page number
      
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      // res.send(data);
      User_data.findAll({ where: condition ,limit: limit,offset: offset})
      .then(data => {
        // const response = getPagingData(data, page, limit);
        console.log('a: ' + data[0].id);
        console.log('a: ' + data[0].user);
        
        res.send({'data': data, 'pages': pages});
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving users."
        });
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting users."
      });
    });
};




// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('tim theo ID ' + id);

  User_data.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id
      });
    });
};


// Update a User by the id in the request
exports.update = (req, res) => {
  
  const id = req.params.id;
  console.log('body ' + req.body.isadmin);
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  User_data.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User_data.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User_data.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Users were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Users."
      });
    });
};

// find all Users_status User
exports.findAllUsers_status = (req, res) => {
  User_data.findAll({ where: { Users_status: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Users."
      });
    });
};
