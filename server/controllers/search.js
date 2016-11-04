var request = require('request');
var Space = require('../models/Space.js');

var controller = {
  nearby: function(req, res){
    Space.find({}, function(err, spaces){
      if(err) {
        res.json({success: false, messager: err});
      } else {
        var destination = [];

        spaces.forEach(function(el){
          var address = [
            el.address.line_1,
            el.address.line_2,
            el.address.city,
            el.address.state,
            el.address.zip_code
          ];

          address = address.join('+');
          address = address.replace(/ /g, '+');

          destination.push(address);
        });

        var unit = 'imperial';
        var origin = req.body.origin.replace(/ /g, '+');
        var destinations = destination.join('|');
        var mode = 'walking';
        var key = process.env.SPOT_GOOGLE_DISTANCE_MATRIX_API;

        var url = 'https://maps.googleapis.com/maps/api/distancematrix/json?unit=' + unit + '&origins='+ origin + '&destinations=' + destinations + '&mode=' + mode + '&key=' + key;

        request(url, function (error, response, body) {
          if(err) {
            res.json({success: false, message: err});
          } else {
            var distanceData = JSON.parse(body).rows[0].elements;
            var results = [];

            distanceData.forEach(function(el, index){
              if(el.duration.value < 900){
                results.push({space: spaces[index], duration: el.duration.text, distance: el.distance.text});
              }
            });

            res.json(results);
          }
        })
      }
    })
  }
};

module.exports = controller;
