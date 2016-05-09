var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var Activity = require('./activity');

var UserSchema = new Schema({
  name:  String,
  username: { type : String, unique: true },
  password: String,
  email: { type : String, unique: true },
  birthday: Date,
  location: String,
  image: String,
  isAdm: {type: Boolean, default: false},
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
            bcrypt.hash(user.password, salt, null, function (err, hash) {
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
  }).pre('remove', function(next){
    var user = this;
    Activity.find({"creator.userID": user._id},function(err, acts){
      for(var i=0; i<acts.length; i++){
	    acts[i].remove();
	  }
      next();
    });
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
