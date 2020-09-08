'use strict';
const Overview = use('App/Models/Overview');
const Database = use('Database');

class OverviewController {
  async create({ request }) {
    const { title, content, subject_id } = request.post();
    const overview = await Overview.create({ title, content, subject_id });

    return overview;
  }

  async index({ request }) {
    const { page = 1 } = request.get();
    const overviews = await Database.from('overviews').paginate(page, 10);
    overviews.total = Number(overviews.total);
    return overviews;
  }

  async show({ request }) {
    const { overview_id } = request.params;
    const overview = await Overview.find(overview_id);
    return overview;
  }
  async listBySubject({ request }) {
    const { subject_id } = request.params;
    const { page = 1, perPage = 10 } = request.get();

    const overviews = await await Database.from('overviews')
      .where({ subject_id })
      .paginate(page, perPage);
    return overviews;
  }

  async update({ request, response }) {
    const { overview_id } = request.params;
    const data = request.post();
    const overview = await Overview.find(overview_id);
    if (!overview)
      return response.status(404).json({ message: 'Overview not found.' });
    overview.merge(data);
    await overview.save();
    return overview;
  }

  async destroy({ request }) {
    const { overview_id } = request.params;
    const overview = await Overview.find(Number(overview_id));
    await overview.delete();

    return;
  }
}

module.exports = OverviewController;
