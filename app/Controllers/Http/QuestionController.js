'use strict';
const Question = use('App/Models/Question');
const Database = use('Database');
const Alternative = use('App/Models/Alternative');
class QuestionController {
  async create({ request }) {
    const { enunciado, texto_apoio, subject_id, alternatives } = request.post();
    const { id } = await Question.create({ texto_apoio, enunciado, subject_id });
    alternatives.forEach((alternativa) => (alternativa.question_id = id));
    await Alternative.createMany(alternatives);
    const question_alternatives = await Question.query()
      .with('alternatives')
      .where({ id })
      .fetch();
    return question_alternatives;
  }

  async index({ request }) {
    const { page = 1 } = request.get();
    const questions = await Database.from('questions').paginate(page, 10);
    questions.total = Number(questions.total);
    return questions;
  }

  async show({ request, response }) {
    const { id } = request.params;
    const question = await Question.find(Number(id));
    if (!question)
      return response
        .status(400)
        .json({ message: 'Could not find such question' });
    await question.load('alternatives');
    return question;
  }

  // async update({ request }) {
  //   const { id } = request.params;
  //   const data = request.post();

  //   const question = await Question.find(Number(id));
  //   question.merge(data);
  //   await question.save();

  //   return question;
  // }

  async destroy({ request }) {
    const { id } = request.params;
    const question = await Question.find(Number(id));
    await question.delete();

    return;
  }
}

module.exports = QuestionController;
