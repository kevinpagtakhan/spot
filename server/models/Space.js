var mongoose = require('mongoose');

var reviewSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  content: String,
  stars: Number
}, {timestamps: true});

var spaceSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  title: String,
  address: {
    line_1: String,
    line_2: String,
    city: String,
    state: String,
    zip_code: String
  },
  type: String,
  number: String,
  image_url: String,
  description: String,
  reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
  reviews: [reviewSchema]
}, {timestamps: true})

var Space = mongoose.model('Space', spaceSchema);

module.exports = Space;
