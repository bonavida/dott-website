var express    = require('express');
var app        = express();
var config     = require('./config/database');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var passport   = require('passport');
var cors       = require('cors');
var port = process.env.PORT || 3000;

var Activity  = require('./models/activity');
var User  = require('./models/user');
mongoose.connect(config.database);


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use(cors());


app.use(passport.initialize());
require('./config/passport')(passport);



app.use('/',express.static(__dirname + '/public/'));//point to public folder to serve static content

var router = express.Router();
require('./routers/auth')(router);
require('./routers/files')(router);
require('./routers/activities')(router);
require('./routers/categories')(router);
require('./routers/users')(router);
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
