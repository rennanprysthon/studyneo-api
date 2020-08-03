'use strict';
const Subject = use('App/Models/Subject');
const Question = use('App/Models/Question');

const Database = use('Database');
class SubjectController {
  async create({ request }) {
    const { title, matter_id } = request.only(['title', 'matter_id']);
    const subject = await Subject.create({ title, matter_id });

    return subject;
  }

  async index({ request }) {
    const { matter_id, page = 1, perPage = 10 } = request.get();

    if (matter_id === undefined) {
      return await Database.from('subjects')
        .paginate(page, perPage);
    };

    return await Database.from('subjects')
      .where({ matter_id })
      .paginate(page, perPage);
  }

  async show({ request, response }) {
    const { id } = request.params;
    const subject = await Subject.find(id)

    if (!subject)
      return response
        .status(400)
        .json({ message: 'Could not find such subject' });

    const questions_counts = await Database
      .from('questions')
      .where('subject_id', id)
      .count('* as total');

    const overview_counts = await Database
      .from('overviews')
      .where('subject_id', id)
      .count('* as total');

    subject.questions_counts = questions_counts[0].total
    subject.overview_counts = overview_counts[0].total

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
