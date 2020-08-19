
module.exports = app => {
    
    var router = require("express").Router();
  
    const dailystocktransactions = require("../controllers/dailystockController.js");
    const { authJwt } = require("../middleware");
    // const utils = require('../utils');

      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    // Create a new BULK Tutorial - ok
    router.post("/bulkdailystocks", dailystocktransactions.bulkCreate);
    // Create a new Tutorial - ok
    router.post("/dailystock", dailystocktransactions.create);

    // Retrieve all daily stock - khong xai ma kem theo searchKeyword phia duoi
    // router.get("/dailystocks", dailystocktransactions.findAll);

    // Retrieve all  daily stock paginition
    router.get("/dailystocks/:currentPage", dailystocktransactions.findAndCountAll);
    // router.get("/dailystocks/:currentPage", [authJwt.verifyToken], dailystocktransactions.findAndCountAll);
  
    // Retrieve a symbolcode
    router.get("/symbolcodelist", dailystocktransactions.findAllSymbol);

    // Retrieve a single  daily stock with id
    router.get("/dailystock/:id", dailystocktransactions.findOne);

    // Update a Tutorial with id
    router.put("/dailystock/:id", dailystocktransactions.update);
    // router.put("/dailystock/:id", [authJwt.verifyToken], dailystocktransactions.update);

    // Delete a Tutorial with id
    router.delete("/dailystock/:id", dailystocktransactions.delete);
    // router.delete("/dailystock/:id", [authJwt.verifyToken], dailystocktransactions.delete);  // tam khoa de delete cho le

    // Delete all
    // router.delete("/", dailystocktransactions.deleteAll);
    

    app.use('/api', router);

  };
  
