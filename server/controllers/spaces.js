var User = require('../models/User.js');
var Space = require('../models/Space.js');

var controller = {
  index: function(req, res){
    Space.find({}, function(err, spaces){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: spaces})
      }
    });
  },

  create: function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err) {
        res.json({success: false, message: 'Could not find user.'});
      } else {
        var space = new Space();
        space._by = req.user._id;
        space.title = req.body.title;
        space.address = req.body.address;
        space.type = req.body.type;
        space.description = req.body.description;
        space.image_url = req.body.image_url;
        space.save(function(err, createdSpace){
          if(err) {
            res.json({success: false, message: 'Could not save new space.'});
          } else {
            user.spaces.push(space._id);
            user.save(function(err){
              if(err){
                res.json({success: false, message: 'Could not save user.'});
              } else {
                res.json({success: true, data: createdSpace});
              }
            })
          }
        })
      }
    })
  },

  show: function(req, res){
    Space.findById(req.params.id).populate('_by').exec(function(err, space){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: space})
      }
    });
  },

  update: function(req, res){
    Space.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, space){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: space})
      }
    });
  },

  delete: function(req, res){
    Space.findById(req.params.id, function(err, space){
      if (err) {
        res.json({success: false, message: err})
      } else {

        User.findById(space._by, function(err, user){
          if(err){
            res.json({success: false, message: err})
          } else {
            user.update({$pull: {spaces: space._id}}, function(err){
              if(err){
                res.json({success: false, message: err})
              } else {
                space.remove(function(err){
                  if (err) {
                    res.json({success: false, message: err})
                  } else {
                    res.json({success: true, data: space})
                  }
                });
              }
            })
          }
        })
      }
    });
  },
}

module.exports = controller;
