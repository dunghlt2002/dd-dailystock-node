
module.exports = app => {
    
    var router = require("express").Router();
  
    const contents = require("../controllers/content_catController.js");
    const { authJwt } = require("../middleware");
    // const utils = require('../utils');

      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    // Retrieve all contents - khong xai ma kem theo searchKeyword phia duoi
    router.get("/content_cats", contents.findAll);

    // Retrieve a single  daily stock with id
    router.get("/content_cat/:id", contents.findOne);


// ---------------- Chua su dung cac route phia duoi day

    // Create a new BULK Tutorial - ok
    router.post("/bulkcontents", contents.bulkCreate);

    // Create a new Tutorial - ok
    router.post("/content", contents.create);

    // Retrieve all  contents paginition
    router.get("/contents/:currentPage", contents.findAndCountAll);
    // router.get("/dailystocks/:currentPage", [authJwt.verifyToken], contents.findAndCountAll);
  
    // Update a Tutorial with id
    router.put("/content/:id", contents.update);
    // router.put("/dailystock/:id", [authJwt.verifyToken], contents.update);

    // Delete a Tutorial with id
    router.delete("/content/:id", contents.delete);
    // router.delete("/dailystock/:id", [authJwt.verifyToken], contents.delete);  // tam khoa de delete cho le

    // Delete all
    // router.delete("/", contents.deleteAll);
    

    app.use('/api', router);

  };
  
