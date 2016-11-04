var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
var mail = require('../nodemailer/sender.js');

var controller = {
  register: function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
      if(err) {
        res.json({success: false, message: err});
      } else if (user) {
        res.json({success: false, message: 'Username already taken. Please choose a new one.'});
      } else {
        var newUser = new User();
        newUser.username = req.body.username;
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = newUser.generateHash(req.body.password);
        newUser.role = req.body.role;
        newUser.image_url = 'http://s3.amazonaws.com/37assets/svn/765-default-avatar.png';

        newUser.save(function(err, createdUser){
          if(err) {
            res.json({success: false, message: err});
          } else{
            mail('welcome', createdUser.email, 'Welcome to SPOT');
            res.json({success: true, data: createdUser});
          }
        })
      }
    })
  },

  authenticate: function(req, res){
    User.findOne({username: req.body.username}, function(err, user){
      if(err) {
        res.json(err);
      } else if (!user) {
        res.json({success: false, message: 'Authentication failed. User not found.'});
      } else {
        if(!user.validatePassword(req.body.password)){
          res.json({success: false, message: 'Authentication failed. Incorrect password.'})
        } else {
          var userToken = {
            _id: user._id,
            username: user.username
          };
          var secret = 'helloworld';
          var config = {
            expiresIn: 60*60
          }

          var token = jwt.sign(userToken, secret, config);

          res.json({success: true, data: token});
        }
      }
    })
  }
}

module.exports = controller;
