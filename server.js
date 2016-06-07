var express    = require('express');
var app        = express();
var config     = require('./config/database');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var morgan     = require('morgan');
var passport   = require('passport');
var cors       = require('cors');
var http       = require('http');
var server     = http.createServer(app);
var io         = require('socket.io').listen(server);
var port = process.env.PORT || 3000;

var Activity  = require('./models/activity');
var User  = require('./models/user');

mongoose.connect(config.database, function(err) {
    if (err) {
        console.log("Error al conectarse a la base de datos.");
    } else {
        var admin = new User({
            name:  "admin",
            username: "admin",
            password: "admin123",
            email: "admin@admin.com",
            birthday: "",
            location: "",
            image: "images/profile.png",
            isAdm: true
        });
        User.findOne({username : admin.username}, function(err, user) {
          if (err) {
            console.log(err);
          } else if (!user) {
            admin.save(function(err, created) {
              if (err) {
                console.log(err);
              } else if (created) {
                console.log("Admin successfully created.");
              }
            });
          }
        });
    }
});


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

io.sockets.on('connection', function(socket) {
  socket.on('send message', function(data) {
    io.sockets.emit('get message', data);
  });
});

server.listen(port, function () {
      console.log('Server listening at http://localhost:'+ port);
});
