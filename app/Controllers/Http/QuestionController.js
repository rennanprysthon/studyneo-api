'use strict';
const Question = use('App/Models/Question');
class QuestionController {
  async create({ request }) {
    const {
      subject_id,
      enunciado,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaE,
      correta,
    } = request.params;

    const subject = await Question.create({
      subject_id,
      enunciado,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaE,
      correta,
    });

    return subject;
  }

  async index() {
    const questions = await Question.all();
    return questions;
  }

  async show({ request, response }) {
    const { id } = request.params;
    const subject = Question.query().where('subject_id', Number(id)).fetch();
    if (!subject)
      return response
        .status(400)
        .json({ message: 'Could not find such question' });
    return subject;
  }

  async update({ request }) {
    const { id } = request.params;
    const data = request.post();

    const question = await Question.find(Number(id));
    question.merge(data);
    await question.save();

    return question;
  }

  async destroy({ request }) {
    const { id } = request.params;
    const question = await Question.find(Number(id));
    await question.delete();

    return;
  }
}

module.exports = QuestionController;
