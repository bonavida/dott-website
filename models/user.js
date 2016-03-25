var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name:  String,
  username: String,
  password: String,
  email: String,
  birthday: Date,
  location: String,
  image: String,
  notifications: [{message: String, readed: Boolean, date: Date, activityID: String, activityName: String}]
});

module.exports = mongoose.model('User', UserSchema);
