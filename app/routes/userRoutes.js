
module.exports = app => {
    
    var router = require("express").Router();
  
    const users = require("../controllers/userController.js");
    const { authJwt } = require("../middleware");
    const utils = require('../utils');

      app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    // Signin a Tutorial with id
    router.post("/signin", users.signin);

    // Create a new Tutorial
    router.post("/users", users.create);

    // Retrieve all users
    router.get("/users", users.findAll);

    // Retrieve all users paginition
    router.get("/users/:currentPage", [authJwt.verifyToken], users.findAndCountAll);

    // Retrieve all users paginition
    // router.get("/users/:currentPage", users.findAndCountAll);
    
    // Retrieve a single Tutorial with id to VERIFY
    router.get("/userverify/:id", users.verify);

    // Retrieve a single user with id
    router.get("/user/:id", users.findOne);

    // Update a Tutorial with id
    router.put("/users/:id", [authJwt.verifyToken], users.update);

    // Delete a Tutorial with id
    router.delete("/users/:id", [authJwt.verifyToken], users.delete);

    // Delete all
    // router.delete("/", users.deleteAll);
    
    // Retrieve all published users
    // router.get("/published", users.findAllPublished);
  
    app.use('/api', router);
    // app.use('/api/users', router);
  };
  

// module.exports = function(app) {
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers",
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

//   app.get("/api/test/all", controller.allAccess);

//   app.get(
//     "/api/test/user",
//     [authJwt.verifyToken],
//     controller.userBoard
//   );

//   app.get(
//     "/api/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );

//   app.get(
//     "/api/test/admin",
//     [authJwt.verifyToken, authJwt.isAdmin],
//     controller.adminBoard
//   );
// };
