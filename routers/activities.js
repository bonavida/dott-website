var Activity  = require('../models/activity');


module.exports = function(router){

  //var router = express.Router();

  //Activities
  router.get('/activities', function(req, res, next) {
      Activity.find({}).sort('-creationDate').exec(function(err, activities){
        if(!err){
          if(!activities){
             next();
          }else{
             res.json(activities);
          }
        }else{
          res.status(500).send(err.message);
        }
      });
    }).post('/activities', function(req, res, next) {
      var activity = new Activity({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        location: req.body.location,
        creator: req.body.creator,
        executionDate: req.body.executionDate,
        creationDate: req.body.creationDate,
        minParticipants: req.body.minParticipants,
        maxParticipants: req.body.maxParticipants,
        closed: false,
        categories: req.body.categories,
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
      Activity.findById(req.params.activity_id, function(err, activity){
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
      Activity.findById(req.params.activity_id, function(err, activity){
        if(!err){
          if(!activity){
             next();
          }else{
            activity.name = req.body.name;
            activity.description= req.body.description;
            activity.image= req.body.image;
            activity.location= req.body.location;
            activity.creator= req.body.creator;
            activity.executionDate= req.body.executionDate;
            activity.minParticipants= req.body.minParticipants;
            activity.maxParticipants= req.body.maxParticipants;
            activity.categories= req.body.categories;

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
      Activity.findById(req.params.activity_id, function(err, activity){
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
