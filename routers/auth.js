var User  = require('../models/user');
var jwt   = require('jwt-simple');
var passport = require('passport');

var config = require('../config/database');


module.exports = function(router){

  //var router = express.Router();

  //Users
  router.post('/register', function(req, res) {

    if (!req.body.username || !req.body.password) {//TODO CHECK ALL FIELDS BY A VALIDATOR
      res.json({success: false, msg: 'Please pass name and password.'});
    } else {
      var newUser = new User({
        username  : req.body.username,
        password  : req.body.password,
        name      : req.body.name,
        email     : req.body.email,
        birthday  : req.body.birthday,
        location  : req.body.location,
        image     : req.body.image,
      });
      newUser.save(function(err){
        if (err) {
          console.log(err);
          return res.json({success: false, msg: 'Username already exists.'});
        }
        res.json({success: true, msg: 'Successful created new user.'});
      });


    }
  }).post('/login', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.encode(user, config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
}).get('/profile', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      username: decoded.username
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, msg: user});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};
};
