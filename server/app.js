var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var session = require('express-session');
var passport= require('passport');
var LocalStrategy = require('passport-local').strategy;
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods: POST, GET");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/category')
var commentRouter = require('./routes/comment')
var videoRouter = require('./routes/videos')
var SuperCatRouter = require('./routes/superCat')
var adminRouter = require('./routes/admin')
var reviewRouter= require('./routes/review')






// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(passport.initialize());
app.use(passport.session());

//var url="mongodb://school_fleep:school_fleep1@ds119422.mlab.com:19422/school-fleep";
var url='mongodb://localhost:27017/vd'
mongoose.Promise= global.Promise;
mongoose.connect(url, { useNewUrlParser: true });


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/category', categoryRouter);
app.use('/comment', commentRouter)
app.use('/video', videoRouter)
app.use('/supercat', SuperCatRouter)
app.use('/admin', adminRouter)
app.use('/review', reviewRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(session({
  secret: 'diversify me',
  resave: false,
  saveUninitialized: false
}))

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
