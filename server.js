var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/dott');

var User = require('./models/user');
var Activity = require('./models/activity');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var router = express.Router();


//Activities
router.get('/activities', function(req, res) {
  Activity.find(function(err, activities){
    if(!err){
      res.json(activities);
    }else{
      res.send(500, err.message);
    }
  });
}).post('/activities', function(req, res) {
  var activity = new Activity({
    //set activity fields
  });
  activity.save(function(err, activity){
    if(!err){
      res.json(activity);
    }else{
      res.send(500, err.message);
    }
  });
}).get('/activities/:activity_id', function(req, res) {
  Activity.findById(req.params.id, function(err, activity){
    if(!err){
      res.json(activity);
    }else{
      res.send(500, err.message);
    }
  });
}).put('/activities/:activity_id', function(req, res) {
  Activity.findById(req.params.id, function(err, activity){
    if(!err){
      activity.name = req.body.name;
      //set activity fields

      activity.save(function(err, activity){
        if(!err){
          res.json(activity);
        }else{
          res.send(500, err.message);
        }
      });
    }else{
      res.send(500, err.message);
    }
  });
}).delete('/activities/:activity_id', function(req, res) {
  Activity.findById(req.params.id, function(err, activity){
    if(!err){
      activity.remove(function(err){
        if(!err){
          res.status(200).send();
        }else{
          res.send(500, err.message);
        }
      });
    }else{
      res.send(500, err.message);
    }
  });
});

app.use('/',express.static(__dirname + '/public/'));//point to public folder to serve static content
app.use('/api', router);

var server = app.listen(port, function () {
      console.log('Server listening at http://localhost:'+ port);
});
