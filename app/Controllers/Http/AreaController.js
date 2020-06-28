'use strict';
const Area = use('App/Models/Area');
class AreaController {
  async index() {
    const areas = await Area.query().with('matters').fetch();
    return areas;
  }
}

module.exports = AreaController;
