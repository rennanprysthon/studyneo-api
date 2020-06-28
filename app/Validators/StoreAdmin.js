'use strict';

class StoreAdmin {
  get rules() {
    return {
      email: 'required|email|unique:admins',
      password: 'required',
    };
  }

  get messages() {
    return {
      'email.required': 'Você precisa informar o email de acesso.',
      'email.email': 'Você precisa informar um email válido.',
      'email.unique': 'O email informado já se encontra cadastrado.',
      'password.required': 'Você precisa informar uma senha.',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.send(errorMessages);
  }
}

module.exports = StoreAdmin;
