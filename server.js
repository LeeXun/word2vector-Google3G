var express = require('express');// init express
var app = express();
var server = require('http').createServer(app); // use express in http server for socket.io
var port = process.env.PORT || 8888;// port apply
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var w2vRouter = require("./routers/w2v");

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});// start server

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/api/w2v', w2vRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err);
    res.status(err.status || 500).json({
      message: err.message,
      error: err.stack
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500).json({
    message: err.message,
    error: err
  });
});
