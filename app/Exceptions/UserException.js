'use strict';

const { LogicalException } = require('@adonisjs/generic-exceptions');

class UserException extends LogicalException {
  constructor() {
    super(message, status, code);
  }
}

module.exports = UserException;
