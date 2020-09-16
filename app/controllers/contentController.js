const db = require("../models");
const Content_data = db.content_data;
const Op = db.Sequelize.Op;

//const utils = require('../utils');

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
  Content_data.bulkCreate(newTransaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating BULK Content_data."
      });
    });
};


// Create and Save a new content transaction
exports.create = (req, res) => {
  console.log('Body ne  ' + JSON.stringify(req.body.c_body));
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
    content_cat_id: req.body.content_cat_id,
    b_image: req.body.b_image,
    s_image: req.body.s_image,
    created_at: req.body.createdAt,
    updated_at: req.body.createdAt
  };

  // Save Content in the database
  Content_data.create(newTransaction)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Content_data."
      });
    });
};

exports.findByCat = (req, res) => {
  console.log('We are in ALL contents by CAT');

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  // const search_keyword = req.query.search_keyword;
  const search_keyword = req.params.id;

  // Content_data.destroy({
  //   where: { id: id }
  // })

  Content_data.findAll({ where: { content_cat_id: search_keyword } })
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

// Retrieve all transaction from the database - khong su dung vi can su dung paginition: findAllAndCount
exports.findAll = (req, res) => {
  console.log('We are in ALL contents');

  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;

  var condition = search_keyword ? 
  {
    [Op.or]: [
      {subject: { [Op.like]: `%${search_keyword}%`} }, 
      {id: { [Op.like]: `%${search_keyword}%`} }]
  } : null;

  Content_data.findAll({ where: condition })
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

// Retrieve all Contents from the database and count All
exports.findAndCountAll = (req, res) => {
  console.log('hihihi we are here CONTENT findandcount all');
  let limit = 15;   // number of records per page
  let offset = 0;
  
  // chuyen thanh keyword noi chung, khong con tim theo NAME ma thoi
  const search_keyword = req.query.search_keyword;
  console.log('keyword' + search_keyword);
  var condition = search_keyword ? 
  {
    [Op.or]: [
      {subject: { [Op.like]: `%${search_keyword}%`} }, 
      {content_cat_id: { [Op.eq]: search_keyword} }]
  } : null;

  Content_data.findAndCountAll({ where: condition, order: [['id', 'DESC']] })
    .then(data => {
      let page = req.params.currentPage;      // page number
      
      let pages = Math.ceil(data.count / limit);
      offset = limit * (page - 1);
      // res.send(data);
      Content_data.findAll({ where: condition ,limit: limit, offset: offset, order: [['id', 'DESC']]})
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




// Find a single transaction with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  console.log('tim theo ID ' + id);

  Content_data.findByPk(id)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving daily transaction with id=" + id
      });
    });
};


// Update a Content by the id in the request
exports.update = (req, res) => {
  
  const id = req.params.id;
  console.log('body ' + req.body.subject);
  
  // van de o cho, khi update Sequelize tu qui dinh co column updatedAt trong table
  
  Content_data.update(req.body, {
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

  Content_data.destroy({
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

