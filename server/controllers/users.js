var User = require('../models/User.js');
var jwt = require('jsonwebtoken');

var controller = {
  index: function(req, res){
    User.find({}, function(err, users){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: users})
      }
    })
  },

  loggedInUser: function(req, res){
    User.findById(req.user._id).populate({path: 'reservations spaces', populate: {path: '_space reservations'}}).exec(function(err, users){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: users})
      }
    })
  },

  show: function(req, res){
    User.findById(req.params.id, function(err, user){
      if (err) {
        res.json({success: false, message: err})
      } else{
        res.json({success: true, data: user});
      }
    })
  },

  update: function(req, res){
    User.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, user){
      if (err) {
        res.json({success: false, message: err})
      } else{
        res.json({success: true, data: user});
      }
    })
  },

  delete: function(req, res){
    User.findByIdAndRemove(req.params.id, function(err, user){
      if (err) {
        res.json({success: false, message: err})
      } else{
        res.json({success: true, data: user});
      }
    })
  }
}

module.exports = controller;
