'use strict';
const Matter = use('App/Models/Matter');
class MatterController {
  async index() {
    const matters = await Matter.all();
    return matters;
  }
  async create({ request }) {
    const { title, area_id } = request.post();
    const matter = await Matter.create({ title, area_id });
    return matter;
  }
}

module.exports = MatterController;
