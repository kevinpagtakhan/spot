var User = require('../models/User.js');
var Space = require('../models/Space.js');
var Reservation = require('../models/Reservation.js');
var mail = require('../nodemailer/sender.js');

var controller = {
  index: function(req, res){
    Reservation.find({}).populate('messages._by').exec(function(err, reservations){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: reservations})
      }
    });
  },

  create: function(req, res){
    User.findById(req.user._id, function(err, user){
      if(err){
        res.json({success: false, message: 'Could not find user'});
      } else {
        Space.findById(req.body.space_id).populate('_by').exec(function(err, space){
          if(err){
            res.json({success: false, message: 'Could not find user'});
          } else {
            var reservation = new Reservation();
            reservation._by = req.user._id;
            reservation._space = req.body.space_id;
            reservation.date.from = req.body.date.from;
            reservation.date.to = req.body.date.to;
            reservation.confirmed = false;
            reservation.description = req.body.description;

            reservation.save(function(err, createdReservation){
              if(err) {
                res.json({success: false, message: 'Could not create reservation'});
              } else {
                user.reservations.push(createdReservation);
                user.save(function(err){
                  if(err) {
                    res.json({success: false, message: 'Could not update user'});
                  } else {
                    space.reservations.push(createdReservation);
                    space.save(function(err){
                      if(err) {
                        res.json({success: false, message: 'Could not update space'});
                      } else {
                        var subj = 'SPOT: You received a request for ' + space.title;
                        mail('newRequest', space._by.email, subj);
                        res.json({success: true, data: createdReservation});
                      }
                    })
                  }
                });
              }
            })
          }
        })
      }
    });
  },

  show: function(req, res){
    Reservation.findById(req.params.id).populate('_space messages._by').exec(function(err, reservations){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: reservations})
      }
    });
  },

  update: function(req, res){
    Reservation.findByIdAndUpdate(req.params.id, req.body, {new: true}).populate('_by').exec(function(err, reservations){
      if (err) {
        res.json({success: false, message: err})
      } else {
        if(req.body.confirmed) {
          var subj = 'SPOT: You request has been confirmed';
          mail('approvedRequest', reservations._by.email, subj);
        }
        res.json({success: true, data: reservations})
      }
    });
  },

  delete: function(req, res){
    Reservation.findByIdAndRemove(req.params.id, function(err, reservations){
      if (err) {
        res.json({success: false, message: err})
      } else {
        res.json({success: true, data: reservations})
      }
    });
  },
}

module.exports = controller;
