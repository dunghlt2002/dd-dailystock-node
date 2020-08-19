// generate token using secret from process.env.JWT_SECRET
var jwt = require('jsonwebtoken');

// tam khong xai 0717
function tokenverify (user,checktoken ) {
  // const checktoken = req.headers.authorization;
  // const user = req.params.id
  console.log('user ' + user);
  console.log('token ' + checktoken);

  if (checktoken) {
    const onlyToken = checktoken.slice(7, checktoken.length);
    // console.log('only ' + onlyToken);

    // jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
    jwt.verify(onlyToken, '123dung', (err, decode) => {
      if (err) {
        // return res.status(401).send({ msg: 'Invalid Token' });
        return {msg: 'false'}
      }
      // req.user = decode;
      console.log('decode ' + JSON.stringify(decode));
      return {decode}
    });
  } else {
    // return res.status(401).send({ msg: "Token is not supplied." });
    return {msg: 'false'}
  }
}

//     var token = req.headers['authorization'];
//     console.log('token o backend ' + token);
//     if (!token) return next(); //if no token, continue
   
//     token = token.replace('Bearer ', '');
//     jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
//         console.log('verify ' + token);
//       if (err) {
//         return res.status(401).json({
//           error: true,
//           message: "Invalid user."
//         });
//       } else {
//           console.log('user verify : ' + user.name);
//         req.user = user; //set the user to req so other routes can use it
//         next();
//       }
//     });

// generate token and return it
function generateToken(user) {
  //1. Don't use password and other sensitive fields
  //2. Use the information that are useful in other parts
  //console.log('user khuc dau la  ' + user.user_name);
  if (!user) return null;

  var u = {
    id: user.id,
    user: user.user
    // isAdmin: user.isAdmin
  };

  console.log('u khuc giua la  ' + JSON.stringify(u));
  
//   return jwt.sign(u, process.env.JWT_SECRET, {
  return jwt.sign(u, '123dung', {
    // expiresIn: 60 * 60 * 12 // expires in 24 hours
    expiresIn: 60 * 60 * 1 // expires in 24 hours
  });
}

// return basic user details
function getCleanUser(user) {
  if (!user) return null;

  return {
    
    // userId: user.userId,
    name: user.user_name,
    username: user.user_name
    // isAdmin: user.isAdmin
  };
}

module.exports = {
  generateToken,
  tokenverify, 
  getCleanUser
}