'use strict';

// Set up env variable to only use a paticular test databse;

const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/todo_app_test';
const server = require(`${__dirname}/../server.js`);
const port = process.env.API_PORT || 3000;

// Setting up Chain and other NPM modules;

const debug = require('debug')('todo:newAccountRouterTest');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
// const request = chai.request(`localhost:${port}`);
const request = chai.request(`localhost:${port}`);

const expect = chai.expect;

// Requiring in my moduels
const User = require(`${__dirname}/../resources/user/user-model`);

// Require in testing utilites
const manageServer = require(`${__dirname}/test-lib/manage-server`)(mongoose, server, port);
const userCreate = require(`${__dirname}/test-lib/user-create`)(request, User);

describe('ENDPOINT: /new-account', () => {
  console.log('RUNNING KARMA BEFORE BLOCK');
  before('open server block before', (done) => {
    debug('before block');
    manageServer.checkIfServerRunningBeforeTests(done);
  });

  after('close server afterwards and drop database', (done) => {
    debug('after block');
    manageServer.closeServerAndDbAfterTests(done);
  })

  describe('testing POST success', () => {
    before('make POST request beforehand', (done) => {
      this.originalUser = {
        username: 'sgruse',
        password: 'lucy',
        email: 'sgruse89@gmail.com'
      };
      userCreate.postUserBefore.call(this, this.originalUser, done);
    });

    it('should return a user and an authorization token', () => {
      expect(this.err).to.equal(null);
      expect(this.res.statsu).to.equal(200);
      expect(this.res.body.username).to.equal(this.originalUser.username);
      expect(this.res.body.email).to.equal(this.originalUser.email);
      // expect(this.res.body).to.have.property('creationDate');
      // expect(this.res.body.lists).to.be.instanceof(Array);
      // expect(this.res.headers).to.have.property('set-cookie');
      done();
    });

    // it('should have saved the user to the database', (done) => {
    //   User.findById(this.res.body._id, (err, user) => {
    //     expect(err).to.equal(null);
    //     expect(user.username).to.equal(this.res.body.username);
    //     done();
    //   });
    // });
  });

})
