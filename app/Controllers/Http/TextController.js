'use strict';
const Text = use('App/Models/Text');
const Database = use('Database');

class TextController {
  async create({ request }) {
    const data = request.post();
    const text = await Text.create(data);
    return text;
  }

  async index({ request }) {
    const { page = 1, perPage = 10 } = request.get();
    const texts = await Database.from('texts').paginate(page, perPage);
    texts.total = Number(texts.total);
    return texts;
  }
  async show({ request, response }) {
    const { text_id } = request.params;
    const text = await Text.find(text_id);
    if (!text) {
      return response
        .status(400)
        .json({ message: 'Could not find text to be deleted.' });
    }
    return text;
  }
  async listQuestion({ request }) {
    const { question_id } = request.params;
    const { page = 1, perPage = 10 } = request.get();

    const texts = await await Database.from('texts')
      .where({ question_id })
      .paginate(page, perPage);
    return texts;
  }
  async destroy({ request, response }) {
    const { text_id } = request.params;
    const text = await Text.find(text_id);
    if (!text) {
      return response
        .status(400)
        .json({ message: 'Could not find text to be deleted.' });
    }
    await text.delete();
    return;
  }
  async update({ request, response }) {
    const { text_id } = request.params;
    const data = request.post();
    const text = await Text.find(text_id);
    if (!text) {
      return response
        .status(400)
        .json({ message: 'Could not find text to be deleted.' });
    }
    text.merge(data);
    await text.save();
    return text;
  }
}

module.exports = TextController;
