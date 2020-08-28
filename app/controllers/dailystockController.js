const db = require("../models");
const DailyStock_data = db.dailystock_data;
const Op = db.Sequelize.Op;

// const jwt = require('jsonwebtoken');
const utils = require('../utils');


// BULK Create and Save a new DailyStock transaction
exports.bulkCreate = (req, res) => {
  console.log('BULK Body ne  ' + JSON.stringify(req.body));
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "dailystock transaction can not be empty!"
    });
    return;
  }

  const newTransaction = req.body

  // Save Transaction in the database
  DailyStock_data.bulkCreate(newTransaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating BULK DailyStock_data."
      });
    });
};


// Create and Save a new DailyStock transaction
exports.create = (req, res) => {
  console.log('Body ne  ' + JSON.stringify(req.body.updated_at));
  // Validate request
  if (!req.body.symbolcode) {
    res.status(400).send({
      message: "dailystock transaction can not be empty!"
    });
    return;
  }

  // Create a transaction
  const newTransaction = {
    createdby: req.body.createdby,
    title: req.body.title,
    timeframe: req.body.timeframe,
    symbolcode: req.body.symbolcode,
    buyshort: req.body.buyshort,
    entrypoint: req.body.entrypoint,
    exitpoint: req.body.exitpoint,
    qty: req.body.qty,
    rsicolor: req.body.rsicolor,
    stocolor: req.body.stocolor,
    macdcolor: req.body.macdcolor,
    macd_htf: req.body.macd_htf,
    b_image: req.body.b_image,
    s_image: req.body.s_image,
    created_at: req.body.createdAt,
    updated_at: req.body.createdAt
  };

  // Save User in the database
  DailyStock_data.create(newTransaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the DailyStock_data."
      });
    });
};

// Retrieve all transaction from the database - khong su dung vi can su dung paginition: findAllAndCount
exports.findAll = (req, res) => {
  console.log('hihihi we are here ALL daily stock');

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {title: { [Op.like]: `%${search_keyword}%`} }, 
      {id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  DailyStock_data.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving daily stock transaction."
      });
    });
};

// Retrieve all disctinct symbolcode from the database.
exports.findAllSymbol = (req, res) => {
  console.log('hihihi we are here ALL symbolcode');

  // order: [[ 'id', 'DESC']]
  DailyStock_data.findAll({
    attributes: ['symbolcode', [db.sequelize.fn('count', db.sequelize.col('symbolcode')), 'DemNguoc'] ],
    group: ['symbolcode'], order: [db.sequelize.col('DemNguoc')]
})
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving daily stock transaction."
      });
    });
};

// Retrieve all Users from the database and count All
exports.findAndCountAll = (req, res) => {
  console.log('hihihi we are here daily stock tranactioni count all');
  let limit = 15;   // number of records per page
  let offset = 0;
  
  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;
  console.log('keyword' + search_keyword);
  var condition = search_keyword ? 
  {
    [Op.or]: [
      {title: { [Op.like]: `%${search_keyword}%`} }, 
      {symbolcode: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  DailyStock_data.findAndCountAll({ where: condition, order: [['id', 'DESC']] })
    .then(data => {
      let page = req.params.currentPage;      // page number
      
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      // res.send(data);
      DailyStock_data.findAll({ where: condition ,limit: limit, offset: offset, order: [['id', 'DESC']]})
      .then(data => {
        // const response = getPagingData(data, page, limit);
        console.log('a: ' + data[0].id);
        console.log('a: ' + data[0].title);
        
        res.send({'data': data, 'pages': pages});
        
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving daily transaction."
        });
      });

    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while counting daily transaction."
      });
    });
};




// Find a single transaction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('tim theo ID ' + id);

  DailyStock_data.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving daily transaction with id=" + id
      });
    });
};


// Update a User by the id in the request
exports.update = (req, res) => {
  
  const id = req.params.id;
  console.log('body ' + req.body.title);
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  DailyStock_data.update(req.body, {
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
  console.log('delete 1 transaction : ' + id);

  DailyStock_data.destroy({
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

// Delete all from the database.
// exports.deleteAll = (req, res) => {
//   DailyStock_data.destroy({
//     where: {},
//     truncate: false
//   })
//     .then(nums => {
//       res.send({ message: `${nums} Users were deleted successfully!` });
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all Users."
//       });
//     });
// };

// find all Users_status User
// exports.findAllUsers_status = (req, res) => {
//   DailyStock_data.findAll({ where: { Users_status: true } })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving Users."
//       });
//     });
// };
