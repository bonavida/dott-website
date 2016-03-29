var Activity  = require('../models/activity');


module.exports = function(router){

  //var router = express.Router();

  //Activities
  router.get('/activities', function(req, res, next) {
      Activity.find(function(err, activities){
        if(!err){
          if(!activities){
             next();
          }else{
             res.json(activities);
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).post('/activities', function(req, res, next) {
      var activity = new Activity({
        //set activity fields
      });
      activity.save(function(err, activity){
        if(!err){
          if(!activity) next();
          res.json(activity);
        }else{
          res.send(500, err.message);
        }
      });
    }).get('/activities/:activity_id', function(req, res, next) {
      Activity.findById(req.params.id, function(err, activity){
        if(!err){
          if(!activity){
             next();
          }else{
             res.json(activity);
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).put('/activities/:activity_id', function(req, res, next) {
      Activity.findById(req.params.id, function(err, activity){
        if(!err){
          if(!activity){
             next();
          }else{

            activity.name = req.body.name;
            //set activity fields

            activity.save(function(err, activity){
              if(!err){
                res.json(activity);
              }else{
                res.send(500, err.message);
              }
            });
          }
        }else{
          res.send(500, err.message);
        }
      });
    }).delete('/activities/:activity_id', function(req, res, next) {
      Activity.findById(req.params.id, function(err, activity){
        if(!err){
          if(!activity){
             next();
          }else{

            activity.remove(function(err){
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
