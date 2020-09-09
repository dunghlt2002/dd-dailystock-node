const db = require("../models");
const Content_cat_data = db.content_cat_data;
const Op = db.Sequelize.Op;

//const utils = require('../utils');


// Retrieve all transaction from the database - su dung vi KHONG can su dung paginition o table nay
exports.findAll = (req, res) => {
  console.log('We are in ALL content cat');

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {subject: { [Op.like]: `%${search_keyword}%`} }, 
      {id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  Content_cat_data.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving content cat."
      });
    });
};

// Find a single transaction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('content cat,  tim theo ID ' + id);

  Content_cat_data.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving content cat with id=" + id
      });
    });
};


// -------------- Chua su dung cac function o duoi day -------------------------------

// BULK Create and Save a new content transaction
exports.bulkCreate = (req, res) => {
  console.log('BULK Content - Body ne  ' + JSON.stringify(req.body));
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content all body can not be empty!"
    });
    return;
  }

  const newTransaction = req.body

  // Save Transaction in the database
  Content_cat_data.bulkCreate(newTransaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating BULK Content_cat_data."
      });
    });
};


// Create and Save a new content transaction
exports.create = (req, res) => {
  console.log('Body ne  ' + JSON.stringify(req.body.updated_at));
  // Validate request
  if (!req.body.c_body) {
    res.status(400).send({
      message: "content transaction can not be empty!"
    });
    return;
  }

  // Create a transaction
  const newTransaction = {
    createdby: req.body.createdby,
    subject: req.body.subject,
    c_body: req.body.c_body,
    c_view: req.body.c_view,
    category_id: req.body.category_id,
    b_image: req.body.b_image,
    s_image: req.body.s_image,
    created_at: req.body.createdAt,
    updated_at: req.body.createdAt
  };

  // Save Content in the database
  Content_cat_data.create(newTransaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Content_cat_data."
      });
    });
};


// Retrieve all Contents from the database and count All - khong su dung o table nay
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
      {subject: { [Op.like]: `%${search_keyword}%`} }, 
      {c_body: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  Content_cat_data.findAndCountAll({ where: condition, order: [['id', 'DESC']] })
    .then(data => {
      let page = req.params.currentPage;      // page number
      
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      // res.send(data);
      Content_cat_data.findAll({ where: condition ,limit: limit, offset: offset, order: [['id', 'DESC']]})
      .then(data => {
        // const response = getPagingData(data, page, limit);
        console.log('a: ' + data[0].id);
        console.log('a: ' + data[0].subject);
        
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


// Update a Content by the id in the request
exports.update = (req, res) => {
  
  const id = req.params.id;
  console.log('body ' + req.body.subject);
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Content_cat_data.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Content was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Content with id=${id}. Maybe Content was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Content with id=" + id
      });
    });
};

// Delete a Content with the specified id in the request
exports.delete = (req, res) => {

  const id = req.params.id;
  console.log('delete 1 transaction : ' + id);

  Content_cat_data.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Content was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Content with id=${id}. Maybe Content was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Content with id=" + id
      });
    });
};

