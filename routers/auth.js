var User  = require('../models/user');
var jwt   = require('jwt-simple');
var passport = require('passport');
var config = require('../config/database');

module.exports = function(router){

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
          return res.json({success: false, msg: 'Username or e-mail already exists.'});
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
}).put('/profile', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    if(decoded.username == req.body.username){
    	
      User.findById(req.body._id, function(err, user){
	    user.name = req.body.name,
	    user.email = req.body.email,
		user.location = req.body.location,
		user.image = req.body.image,
		user.save(function(err){
		  if (err) {
		    console.log(err);
		    return res.json({success: false, msg: 'El usuario no se ha actualizado.'});
		  }else{
		    return res.json({success: true, msg: 'Usuario actualizado!'});
		  }
		});
      });
      
    }
  }else{
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
}).put('/profile/pwd', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    if(decoded.username == req.body.username){
      User.findById(req.body._id, function(err, user){
	    // check if password matches
	    user.comparePassword(req.body.oldPassword, function (err, isMatch) {
	      if (isMatch && !err) {
	    	user.password = req.body.newPassword;
	        user.save(function(err){
    	      if (err) {
    	        console.log(err);
    	        return res.json({success: false, msg: 'No se ha podido actualizar.'});
    	      }else{
    	        return res.json({success: true, msg: 'Se ha actualizado!'});
    	      }
	        });
	      } else {
	        res.send({success: false, msg: 'Authentication failed. Wrong password.'});
	      }
	    });
      });
    }
  }else{
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
}).delete('/users', passport.authenticate('jwt', { session: false}), function(req, res) {
	  
	  var token = getToken(req.headers);
	  if (token) {
	    var decoded = jwt.decode(token, config.secret);
	    console.log("AUTH DELETE", decoded);
//	    if(decoded.username == req.body.username){
	      User.findById(decoded._id, function(err, user){	//Sustituir decoded por req.body
		    // check if password matches
	    	console.log("usuario", user);
//		    user.comparePassword(decoded.password, function (err, isMatch) {
//		      console.log("COINCIDEN?", isMatch)
//		      if (isMatch && !err) {
		    	user.remove(function(err){
		    	  console.log("Algun error?", err);
	              if(!err){
	                res.status(200).send();
	              }else{
	                res.send(500, err.message);
	              }
	            });
//		      } else {
//		    	console.log("No, no???!! ELSE=ERROR");
//		        res.send({success: false, msg: 'Delete failed. Wrong password.'});
//		      }
//		    });
	      });
//	    }
	  }else{
	    return res.status(403).send({success: false, msg: 'No token provided.'});
	  }
	});
  
  
  
  
  
  
  
//  .delete('/users/:user_id', function(req, res, next) {
//      User.findById(req.params.id, function(err, user){
//        if(!err){
//          if(!user){
//             next();
//          }else{
//
//            user.remove(function(err){
//              if(!err){
//                res.status(200).send();
//              }else{
//                res.send(500, err.message);
//              }
//            });
//          }
//        }else{
//          res.send(500, err.message);
//        }
//      });

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
