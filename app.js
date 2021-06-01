var express = require('express');
var cors = require('cors');
var app = require('express')();
var bodyParser = require('body-parser');
var logger = require('morgan');
const Sequelize = require('sequelize')
const validator = require('express-validator')
const socket = require('socket.io')
const port = process.env.PORT||3000;
const http = require('http').Server(app);
const Op = Sequelize.Op;
const io = socket(http);

var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
  res.render('index');
});
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

//socket
io.sockets.on('connection', function (socket) {
  console.log('client connect');
  socket.on('echo', function (data) {
    io.sockets.emit('message', data);
  });
});

app.use(express.static('public'));
app.use((req, res, next) => {
  req.Op = Op;
  req.io = io;
  res.io = io;
  next();
});
require('./routes')(app); //include routes
app.set('port', process.env.PORT || 3000);
http.listen(port||8000,() => {
  console.log('Listening on '+port)
})
/* app.listen(app.get('port'), function () {
  console.log("Magic happens on port", app.get('port'));
}); */
