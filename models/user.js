var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({
  name:  String,
//  username: String,
//  password: String,
  email: String,
  birthday: Date,
  location: String,
  image: String,
  notifications: [{message: String, readed: Boolean, date: Date, activityID: String, activityName: String}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);
