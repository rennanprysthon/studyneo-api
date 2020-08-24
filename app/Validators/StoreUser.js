'use strict';

class StoreUser {
  get rules() {
    return {
      name: 'required',
      email: 'required|email|unique:users',
      password: 'required',
    };
  }

  get messages() {
    return {
      'name.required': 'Vocês precisa informar o nome',
      'email.required': 'Você precisa informar o email de acesso.',
      'email.email': 'Você precisa informar um email válido.',
      'email.unique': 'O email informado já se encontra cadastrado.',
      'password.required': 'Você precisa informar uma senha.',
    };
  }

  async fails(errorMessages) {
    return this.ctx.response.status(401).send(errorMessages);
  }
}

module.exports = StoreUser;
