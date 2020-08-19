const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to DD Project- Nodejs" });
});

app.use(function (req, res, next) {
  console.log('head '+ req.headers.authorization);
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

//  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Pass to next layer of middleware
  next();
});


// cho vu upload vo tu muc products vi ong T5ri ngay xua luu data nhu vay
app.use('/avatars', express.static('avatars'));
    // Set multer cho phan upload
    const storageAvatars = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, "avatars")
    },
    filename: function (req, file, cb) {
          cb(null, file.originalname)
    }
    })

    const uploadAvatars = multer({storage: storageAvatars});

    // upload file testing
    app.post("/api/upfileAvatars", uploadAvatars.single("upfileAvatars"), async (req,res) => {
      console.log('avatars neeeeeeee');
      return res.status(200).send(req.file)
    })


// cho vu upload vo tu muc uploads
app.use('/uploads', express.static('uploads'));
    // Set multer cho phan upload
    const storageUploads = multer.diskStorage({
      destination: function (req, file, cb) {
      cb(null, "uploads")
    },
    filename: function (req, file, cb) {
          //const parts = file.mimetype.split("/");
          //console.log(file.originalname+parts[1]);
          cb(null, file.originalname)
    }
    })

    const uploadUploads = multer({storage: storageUploads});

    // upload file testing
    app.post("/api/upfileUploads", uploadUploads.single("upfileUploads"), async (req,res) => {
      console.log('uploads neeeeeeee');
      return res.status(200).send(req.file)
    })




// Mailing using nodemailer (npm install nodemailer --save)
const nodemailer = require('nodemailer');
const creds = require('./app/config.js');

var transport = {
  host: 'smtp.gmail.com', // e.g. smtp.gmail.com
  auth: {
    user: creds.USER,
    pass: creds.PASS
  }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log('All works fine, congratz!');
  }
});

// xu ly phan mail function
app.use(express.json()); 
app.post('/send', (req, res, next) => {
  const name = req.body.name
  const email = req.body.email
  const message = req.body.messageHtml


  var mail = {
    from: name,
    to: email,  
    subject: 'New user has created in thekystore.com',

    html: message
  }

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        msg: 'fail'
      })
    } else {
      res.json({
        msg: 'success'
      })
    }
  })
})

require("./app/routes/userRoutes")(app);
require("./app/routes/dailystockRoutes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
