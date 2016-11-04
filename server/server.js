var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var dotenv = require('dotenv').load({silent: true});
var jwt = require('jsonwebtoken');
var PORT = process.env.PORT || 3000;
var aws = require('aws-sdk');
var nodemailer = require('nodemailer');
var fs = require('fs');

var accountRoutes = require('./routes/accounts.js');
var userRoutes = require('./routes/users.js');
var spacesRoutes = require('./routes/spaces.js');
var reservationsRoutes = require('./routes/reservations.js');
var searchRoutes = require('./routes/search.js');

mongoose.connect(process.env.SPOT_MONGO_URL, function(err, db){
  console.log(err || 'DATABASE: OK');
})

app.set('secret', 'helloworld');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.static(process.env.PWD + '/client'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function(req, res){
  res.sendFile(process.env.PWD + '/client/index.html');
})

app.use('/api/users', accountRoutes);

app.use(function(req, res, next){
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  if(token) {
    jwt.verify(token, 'helloworld', function(err, decoded) {
      if (err) {
        return res.status(403).send({
            success: false,
            message: 'Token Authentication failed.'
        });
      } else {
        req.user = decoded;
        console.log(req.user);
        next();
      }
    });
  } else {
    // res.json({success: false, message: 'No token provided'});
    return res.status(403).send({
        success: false,
        message: 'No token provided.'
    });
  }
})

app.use('/api/users', userRoutes);
app.use('/api/spaces', spacesRoutes);
app.use('/api/reservations', reservationsRoutes);
app.use('/api/search', searchRoutes);

app.get('/api/sign-s3', function(req, res) {
  var s3 = new aws.S3();
  var fileName = req.query['file-name'];
  var fileType = req.query['file-type'];
  var s3Params = {
    Bucket: process.env.SPOT_AWS_BUCKET_NAME,
    Key: fileName,
    Expires: 60,
    ContentType: fileType,
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, function(err, data) {
    if(err){
      console.log(err);
      return res.end();
    }
    var returnData = {
      signedRequest: data,
      url: `https://${process.env.SPOT_AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
    };
    res.write(JSON.stringify(returnData));
    res.end();
  });
});

app.get('/', function(req, res){
  console.log(req.user);
  res.json({success: true, message: 'OK'})
});

app.listen(PORT, function(err){
  console.log(err || 'SERVER: OK');
})
