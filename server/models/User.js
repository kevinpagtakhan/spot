var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
  username: String,
  name: String,
  email: String,
  password: String,
  role: Number,
  image_url: String,
  reservations: [{type: mongoose.Schema.Types.ObjectId, ref: 'Reservation'}],
  spaces: [{type: mongoose.Schema.Types.ObjectId, ref: 'Space'}]
}, {timestamps: true})

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

userSchema.methods.validatePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

userSchema.pre('remove', function(next) {
    // Remove all the assignment docs that reference the removed person.
    this.model('Space').remove({ _by: this._id }, next);
});

var User = mongoose.model('User', userSchema);

module.exports = User;
