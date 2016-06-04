var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// 新增: 数据库及用户认证NPM库
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');

var routes = require('./routes/index');

var app = express();
// 新增: 用户认证中间件
var authenticateMiddleWare = function (req, res ,next) {

  if(req.isAuthenticated()) {
    next();
  } else {
    res.status(401);
    res.end(JSON.stringify({
      status: -1,
      message: 'not authenticated!',
      result: null
    }));
  }

};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// 新增: 用户信息会话中间件
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000
  }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
// 更改: 添加用户认证中间件
app.use('/', routes);

// passport config
// 新增: 用户认证
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// catch 404 and forward to error handler
// 更改: 返回JSON格式数据
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.end(JSON.stringify({
    status: -1,
    message: err.message,
    result: null
  }));
});

// error handlers

// development error handler
// will print stacktrace
// 更改: 返回JSON格式数据
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.end(JSON.stringify({
      status: -1,
      message: err.message,
      stack: err.stack
    }))
  });
}

// production error handler
// no stacktraces leaked to user
// 更改: 返回JSON格式数据
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end(JSON.stringify({
    status: -1,
    message: err.message,
    stack: err.stack
  }));
});


// 新增: 连接mongodb
var connect = function () {
  var url = 'mongodb://127.0.0.1:27017/myBlog';
  var options = {
    server: {
      socketOptions: {
        keepAlive: 1
      }
    }
  };

  mongoose.connect(url, options);
};

connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);

module.exports = app;
