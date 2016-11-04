var Reservation = require('../models/Reservation.js');

var controller = {
  index: function(req, res){
    Reservation.findById(req.params.id).populate('messages._by').exec(function(err, reservation){
      if(err) {
        res.json({success: false, message: err});
      } else {
        res.json({success: true, data: reservation.messages});
      }
    })
  },

  create: function(req, res){
    Reservation.findById(req.params.id).populate('messages._by').exec(function(err, reservation){
      if(err) {
        res.json({success: false, message: err});
      } else {
        var newMessage = new Object();
        newMessage._by = req.user._id;
        newMessage.content = req.body.content;

        reservation.messages.push(newMessage);
        reservation.save(function(err, reservation){
          if(err){
            res.json({success: false, message: err});
          } else {
            Reservation.findById(reservation._id).populate('messages._by').exec(function(err, populatedReservation){
              if(err){
                res.json({success: false, message: err});
              } else {
                res.json({success: true, data: populatedReservation.messages});
              }
            })
          }
        })
      }
    })
  }
};

module.exports = controller;
