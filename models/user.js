var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

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

UserSchema.pre('save', function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            //console.log(salt);
            if (err) {
                //console.log("ERROR GEN SALT");
                return next(err);
            }
            //console.log(user.password, salt);
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

UserSchema.methods.comparePassword = function (passw, cb) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};


module.exports = mongoose.model('User', UserSchema);
