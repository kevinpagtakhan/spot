var Space = require('../models/Space.js');

var controller = {
  index: function(req, res){
    Space.findById(req.params.id, function(err, space){
      if(err) {
        res.json({success: false, message: err});
      } else {
        res.json({success: true, data: space.reviews});
      }
    })
  },

  create: function(req, res){
    Space.findById(req.params.id, function(err, space){
      if(err) {
        res.json({success: false, message: err});
      } else {
        var newReview = new Object();
        newReview._by = req.user._id;
        newReview.content = req.body.content;
        newReview.stars = req.body.stars;

        space.reviews.push(newReview);
        space.save(function(err, space){
          if(err){
            res.json({success: false, message: err});
          } else {
            res.json({success: true, data: space.reviews});
          }
        })
      }
    })
  }
};

module.exports = controller;
