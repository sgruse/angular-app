'use strict';

const debug = require('debug')('todo:newAccountRouter');
const AppError = require(`${__dirname}/../lib/app-error`);

const userCtrl = require(`${__dirname}/../resources/user/user-controller`);

const newAccountRouter = require('express').Router();
module.exports = newAccountRouter;

newAccountRouter.post('/', (req, res, next) => {
  console.log('NEW ACCOUNT POST HIT WITH : ', req.body);
  debug('Post made to /new-account', req.body);
  userCtrl.newUser(req.body)
    .then((user) => {
      let token = user.generateToken();
      return res.status(200)
        .cookie('XSRF-TOKEN', token)
        .json(user);
    })
    .catch(next);
});

newAccountRouter.all('*', (req, res, next) => {
  console.log('ERROR HIT IN ALL');
  return next(new AppError(404, 'request to /new-account with wrong http verb'));
});
