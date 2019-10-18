"use strict";

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const CORS = require('cors')

var svabout = require('./routes/svabout/svabout');
const svtech = require('./routes/svtech/svtech');
const svprofile = require('./routes/svprofile/svprofile');
const svProfileContact = require('./routes/svprofile/svProfileContact');
const svProfileSummary = require('./routes/svprofile/svProfileSummary');
const svProfileExperience = require('./routes/svprofile/svProfileExperience');
const svProfileWorkSkill = require('./routes/svprofile/svProfileWorkSkill');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(CORS());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', svabout)
app.use('/svtech', svtech);
app.use('/svprofile', svprofile);
app.use('/svprofile/contact', svProfileContact);
app.use('/svprofile/summary', svProfileSummary);
app.use('/svprofile/workexp', svProfileExperience);
app.use('/svprofile/workskill', svProfileWorkSkill)

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

module.exports = app;
