'use strict';
const Question = use('App/Models/Question');
const Database = use('Database');
const Alternative = use('App/Models/Alternative');
const Text = use('App/Models/Text');
class QuestionController {
  async create({ request }) {
    const {
      enunciado,
      question,
      subject_id,
      texts = [],
      alternatives,
    } = request.post();
    const createdQuestion = await Question.create({
      question,
      enunciado,
      subject_id,
    });

    const createdAlternatives = await createdQuestion
      .alternatives()
      .createMany(alternatives);
    createdQuestion.alternatives = createdAlternatives;

    if (texts.length > 0) {
      const createdTexts = await createdQuestion.texts().createMany(texts);
      createdQuestion.texts = createdTexts;
    }

    return createdQuestion;
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
