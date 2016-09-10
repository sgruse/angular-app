'use strict';

const debug = require('debug');
const jwt = require('jsonwebtoken');
const User = require(`${__dirname}/user-model`);
const AppError = require(`${__dirname}/../../lib/app-error`);

const userCtrl = module.exports = {};
userCtrl.newUser = newUser;
// userCtrl.findByUsername = findByUsername;
// userCtrl.findByAuthToken = findByAuthToken;
// userCtrl.manageUserLists = manageUserLists;

// Creates a new user in the database

function newUser(reqBody) {
  console.log('USER CONTROLLER HIT WITH : ', reqBody);
  debug('newUser');
  return new Promise((resolve, reject) => {
    if (!reqBody.username || !reqBody.password || !reqBody.email) {
      return reject(new AppError(400, `Either username : (${reqBody.username}) or password (${reqBody.password}) or email (${reqBody.email}) not provided`));
      // return reject('AWWW SNAP');

    }
    let userInfo = {
      username: reqBody.username,
      password: reqBody.password,
      email: reqBody.email
    };

    User.create(userInfo, (err, user) => {
      console.log('USER CREATE HIT');
      if (err) {
        return reject(new AppError(400, err));
      }
      return resolve(user);
    });
  });
}
