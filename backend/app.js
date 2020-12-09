var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var showAllDataRouter = require('./routes/show-all-data');
var loginRouter = require('./routes/login');
var joinRouter = require('./routes/join');
var passwordChangeRouter = require('./routes/password-change');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/show-all-data', showAllDataRouter);
app.use('/login', loginRouter);
app.use('/join', joinRouter);
app.use('/password', passwordChangeRouter);

const mariaDB = require('./mysql-db');
mariaDB.connect();

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// app.get('/apis/Userinfo'), (req, res) => {
//   let ID = req.params.ID;
//   let mariaDB = require('./mysql-db');
//   mariaDB.excute( conn => {
//     conn.query("select ID from user", (err, ret) => {
//       res.json(ret);
//     });
//   });
// };

module.exports = app;

app.listen(3000,()=>{
  console.log('Serve is up and running at the port 3000')
})