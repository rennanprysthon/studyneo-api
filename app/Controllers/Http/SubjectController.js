'use strict';
const Subject = use('App/Models/Subject');
const Database = use('Database');
class SubjectController {
  async create({ request }) {
    const { title, matter_id } = request.only(['title', 'matter_id']);
    const subject = await Subject.create({ title, matter_id });

    return subject;
  }

  async index({ request }) {
    const { matter_id, page = 1, perPage = 10 } = request.get();

    const subjects = await Database.from('subjects')
      .where({ matter_id })
      .paginate(page, perPage);

    return subjects;
  }

  async show({ request, response }) {
    const { id } = request.params;
    const subject = Subject.query().where('matter_id', Number(id)).fetch();
    if (!subject)
      return response
        .status(400)
        .json({ message: 'Could not find such subject' });
    return subject;
  }

  async update({ request }) {
    const { id } = request.params;
    const data = request.post();

    const subject = await Subject.find(Number(id));
    subject.merge(data);
    await subject.save();

    return subject;
  }

  async destroy({ request }) {
    const { id } = request.params;
    const subject = await Subject.find(Number(id));
    await subject.delete();

    return;
  }
}

module.exports = SubjectController;
