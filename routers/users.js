var User  = require('../models/user');


module.exports = function(router){

  //var router = express.Router();

  //Users
  router.get('/users', function(req, res, next) {
      User.find(function(err, users){
        if(!err){
          if(!users){
             next();
          }else{
             res.json(users);
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).post('/users', function(req, res, next) {
      var user = new User({
        //set user fields
      });
      user.save(function(err, user){
        if(!err){
          if(!user) next();
          res.json(user);
        }else{
          res.send(500, err.message);
        }
      });
    }).get('/users/:user_id', function(req, res, next) {
      User.findById(req.params.id, function(err, user){
        if(!err){
          if(!user){
             next();
          }else{
             res.json(user);
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).put('/users/:user_id', function(req, res, next) {
      User.findById(req.params.id, function(err, user){
        if(!err){
          if(!user){
             next();
          }else{

            user.name = req.body.name;
            //set user fields

            user.save(function(err, user){
              if(!err){
                res.json(user);
              }else{
                res.send(500, err.message);
              }
            });
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).delete('/users/:user_id', function(req, res, next) {
      User.findById(req.params.id, function(err, user){
        if(!err){
          if(!user){
             next();
          }else{

            user.remove(function(err){
              if(!err){
                res.status(200).send();
              }else{
                res.send(500, err.message);
              }
            });
          }
        }else{
          res.send(500, err.message);
        }
      });
    });
};
