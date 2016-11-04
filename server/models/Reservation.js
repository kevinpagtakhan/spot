var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  content: String
}, {timestamps: true});

var reservationSchema = mongoose.Schema({
  _by: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  _space: {type: mongoose.Schema.Types.ObjectId, ref: 'Space'},
  date: {
    from: Date,
    to: Date
  },
  confirmed: Boolean,
  description: String,
  messages: [messageSchema]
}, {timestamps: true});

var Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
