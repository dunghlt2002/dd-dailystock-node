const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  // const token = tokenLong.slice(7, tokenLong.length);
  //console.log('hi vo verify token ' + token);

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  // jwt.verify(token, config.secret, (err, decoded) => {
  jwt.verify(token.slice(7, token.length), '123dung', (err, decoded) => {
    console.log('hi vo verify');
    
    if (err) {
      console.log('eee' + err);
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    console.log('id ' + decoded.id);
    next();
  });

  // jwt.verify(onlyToken, '123dung', (err, decode) => {
  //     if (err) {
  //       // return res.status(401).send({ msg: 'Invalid Token' });
  //       return {msg: 'false'}
  //     }
  //     // req.user = decode;
  //     console.log('decode ' + JSON.stringify(decode));
  //     return {decode}
  //   });
  // } else {
  //   // return res.status(401).send({ msg: "Token is not supplied." });
  //   return {msg: 'false'}
  // }


};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

isModerator = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator Role!"
      });
    });
  });
};

isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "moderator") {
          next();
          return;
        }

        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Moderator or Admin Role!"
      });
    });
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin
};
module.exports = authJwt;
