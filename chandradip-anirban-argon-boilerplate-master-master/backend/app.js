require('./models/db');
require('./config/passportConfig');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require("mongoose");
const Post = require("./models/campaign");

const rtsIndex = require('./routes/index.router');
// const rtsStock = require('./routes/stock.router');

var app = express();

mongoose
  .connect(
    "mongodb://apsolutio:apsolutiomongo2018@139.59.40.185:27017/finakya?authSource=finakya"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });


app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use('/', rtsIndex);
// app.use('/stock', rtsStock);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
// fetch data
app.get("/api/campaigns", (req, res, next) => {
    Post.find().then(documents => {
      res.status(200).json({
        message: "The Posts are fetched successfully!",
        posts: documents
      });
    });
  });
//update data(accept)
app.put("/api/campaigns/:_id", (req, res, next) => {
  const post = new Post({
      _id: req.body._id,
      cname: req.body.cname,
      cdescription: req.body.cdescription,
      ctgender: req.body.ctgender,
      ctlocation: req.body.ctlocation,
      ctagegroup: req.body.ctagegroup,
      ctfav: req.body.ctfav,
      ctcustier: req.body.ctcustier,
      ctincomegroup: req.body.ctincomegroup,
      cexpdate: req.body.cexpdate,
      coupon: req.body.coupon,
      cstatus: req.body.cstatus,
      bicon: req.body.bicon,
      editable: req.body.editable
  });
  console.log("in app.js" , this.post);
  Post.updateOne({ _id: req.params._id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Status Update successful!" });
  });
});
//error handler
app.use((err, req, res, next) => {
    if (err.name == 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors);
    }
});


app.listen(3000, ()=>console.log('Server started at port 3000'));