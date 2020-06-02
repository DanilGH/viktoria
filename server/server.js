const express = require('express');
const logger = require('morgan');

const usersRouter = require('./components/users/usersAPI');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Api
app.use('/api', usersRouter);

// Middleware
app.use(require('./middleware/errorMiddleware').all)

module.exports = app;
