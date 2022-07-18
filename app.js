//git const config = require('./config');
require('dotenv').config();
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json({ limit: '50MB' }));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {});

module.exports = app;
