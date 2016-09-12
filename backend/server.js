'use strict';

// Handles ports and environment variables
const DB_PORT  = process.env.MONGLAB_URI || 'mongodb://localhost/db';
const API_PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost8080';

// Loading NPM modules
const express = require('express');
const bodyParser = require('body-parser').json();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const morgan = require('morgan');
const debug = require('debug')();
const cors = require('cors');

// Custom Middlewares
/*
errMidware
basicAuthMidware
tokenAuthMidware
getListMidware
*/

// Load Routers
const newAccountRouter = require(`${__dirname}/routes/new-account`);
// const loginRouter = require(`${__dirname}/routes/login`);
// const listsRouter = require(`${__dirname}/routes/lists`);
// const itemsRouter = require(`${__dirname}/routes/items`);

// Handle Setup
const app = express();
Promise.promisifyAll(mongoose);

// Handle Database Setup
mongoose.connect(DB_PORT);

////////////////////////////////////////
// Configure express
// Attach shared Middlewares
app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser);

app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
  allowedHeaders: [
    'X-XSRF-TOKEN',
    'authorization',
    'content-type',
    'accept'
  ]
}));

//Listing all routers and middleware that's going to be used.

//Unauthenticated routes
app.use('/new-account', newAccountRouter);
// app.use('/login', basicAuthMidware, loginRouter);
//
// //Authenticated routes
// app.use(cookieParser());
// app.use(tokenAuthMidware);
// app.use('/lists', listsRouter);
// app.use('/lists/:listId/*', getListMidware);
// app.use('/lists/:listId/items', itemsRouter);

//Finish Setup
app.all('*', function return404NotFound(_, res) {
  debug('*:404');
  return res.status(404).send('Not Found');
});
// app.use(errMidware);
let server = app.listen(API_PORT, () => {
  console.log('SERVER STARTER ON ', API_PORT);
  debug(`Listening on ${API_PORT}`);
});

// Attach properites for testing
server.isRunning = true;
module.exports = server;
