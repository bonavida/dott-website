var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/dott');

var Activity  = require('./models/activity');
var User  = require('./models/user');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var port = process.env.PORT || 3000;

var router = express.Router();
require('./routers/activities')(router);
require('./routers/users')(router);


app.use('/',express.static(__dirname + '/public/'));//point to public folder to serve static content
app.use('/api', router);
app.use(function(req, res, next){
  res.sendStatus(404);
});
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.sendStatus(500);
});



var server = app.listen(port, function () {
      console.log('Server listening at http://localhost:'+ port);
});
