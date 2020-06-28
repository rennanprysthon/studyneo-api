'use strict';
const Matter = use('App/Models/Matter');
class MatterController {
  async index() {
    const matters = await Matter.all();
    return matters;
  }
}

module.exports = MatterController;
