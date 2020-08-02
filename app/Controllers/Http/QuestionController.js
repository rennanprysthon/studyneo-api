'use strict';
const Question = use('App/Models/Question');
const Alternative = use('App/Models/Alternative');
const Text = use('App/Models/Text');
const Database = use('Database');
const crypto = use('crypto');

class QuestionController {
  async create({ request }) {
    const {
      enunciado,
      question,
      subject_id,
      texts = [],
      alternatives,
    } = request.post();
    const key = crypto.randomBytes(3).toString('HEX').toUpperCase();

    const createdQuestion = await Question.create({
      question,
      enunciado,
      subject_id,
      key,
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
    await question.loadMany(['alternatives', 'texts']);
    return question;
  }
  async listBySubject({ request }) {
    const { subject_id } = request.params;
    const { page = 1, perPage = 10 } = request.get();

    const questions = await await Database.from('questions')
      .where({ subject_id })
      .paginate(page, perPage);
    return questions;
  }
  async update({ request, response }) {
    const { id } = request.params;
    const { texts = [], alternatives, ...questionData } = request.post();
    const question = await Question.find(id);
    if (!question)
      return response
        .status(400)
        .json({ message: 'Could not update such question' });

    question.merge(questionData);
    await question.save();

    const updatedAlternatives = [];
    for (let alternative of alternatives) {
      const auxAlternative = await Alternative.find(alternative.id);
      auxAlternative.merge(alternative);
      await auxAlternative.save();
      updatedAlternatives.push(auxAlternative);
    }
    question.alternatives = updatedAlternatives;

    if (texts.length > 0) {
      const updatedTexts = [];
      for (let text of texts) {
        let auxText;
        if (text.id) {
          auxText = await Text.find(text.id);
          auxText.merge(text);
          await auxText.save();
        } else {
          auxText = await question.texts().create(text);
        }

        updatedTexts.push(auxText);
      }
      question.texts = updatedTexts;
    } else {
      await question.texts().where('question_id', id).delete();
    }

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
