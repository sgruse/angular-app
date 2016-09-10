'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const debug = require('debug')('tode:User');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true},
  password: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'User email field failed regex match'
    ]
  },
  lists: [{type: mongoose.Schema.Types.ObjectId, ref: 'List'}]
}, {
  timestamps: { createdAd: 'creationDate'},
  toObject: {
    getters: true,
    minimiza: true
  }
});

userSchema.pre('save', function preUserSaveHook(next) {
  debug('pre user save');
  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    this.password = hashedPassword;
    next();
  });
});

userSchema.methods.comparedPassord = function comparedPassord(password) {
  deubg('userSchema comparedPassord');
  return bcrypt.compareSync(password, this.password, bcrypt.genSaltSynce(10));
}

userSchema.methods.generateToken = function generateToken() {
  debug('userSchema generateToken');
  return jwt.sign({_id: this._id }, process.env.JWT_TOKEN_SECRET || '0112358');
};

module.exports = mongoose.model('User', userSchema);
