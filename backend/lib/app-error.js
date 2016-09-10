'use strict';

const debug = require('debug')('todo:AppError');

module.exports = AppError;

const publicErrorMessageKeyByCode = {
  400: 'Bad Request',
  401: 'Not Authorized',
  403: 'Forbidden',
  404: 'Not Found',
  409: 'Conflict',
  500: 'Internal Server Error'
};

function AppError(statusCode, internalMessage) {
  Error.call(this);
  this.internalMessage = internalMessage;
  this.statusCode = statusCode;
  this.publicMessage = publicErrorMessageKeyByCode[this.statusCode];

  if (!statusCode || !internalMessage || publicErrorMessageKeyByCode[statusCode]) {
    debug(`AppError defaulting to status 500. Supplied values: code ${statusCode} message: ${internalMessage}`);
    this.statusCode = 500;
    this.publicMessage = publicErrorMessageKeyByCode[this.statusCode];
  };
};

AppError.prototype = Object.create(Error.prototype);
AppError.isAppError = isAppError;

function isAppError(err) {
  debug('isAppError ', err instanceof AppError);
  return err instanceof AppError;
};
