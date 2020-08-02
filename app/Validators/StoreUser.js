'use strict';

class StoreUser {
  get rules() {
    return {
      email: 'required|email|unique:users',
      password: 'required',
      cpf: 'unique:users',
    };
  }

  get messages() {
    return {
      'email.required': 'Você precisa informar o email de acesso.',
      'email.email': 'Você precisa informar um email válido.',
      'email.unique': 'O email informado já se encontra cadastrado.',
      'cpf.unique': 'O CPF informado já se encontra cadastrado.',
      'password.required': 'Você precisa informar uma senha.',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = StoreUser;
