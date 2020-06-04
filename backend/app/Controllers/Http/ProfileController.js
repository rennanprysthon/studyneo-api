'use strict';
const Profile = use('App/Models/Profile');
class ProfileController {
  async create({ request, response }) {
    try {
      const { user_id } = request.params;
      const { escolaridade, is_from_public, area } = request.post();

      const profile = await Profile.create({
        escolaridade,
        is_from_public,
        area,
        user_id: Number(user_id),
      });
      return profile;
    } catch (err) {
      return response
        .status(409)
        .json({ message: "User's profile already exists" });
    }
  }
  async show({ request, response }) {
    const { user_id } = request.params;
    const profile = await Profile.findBy({ user_id });
    if (!profile)
      return response
        .status(404)
        .send({ message: "Could not find user's profile" });
    return profile;
  }

  async update({ request, response }) {
    const { user_id } = request.params;

    const data = request.only(['escolaridade', 'is_from_public', 'area']);

    const profile = await Profile.findBy({ user_id });
    if (!profile)
      return response
        .status(404)
        .send({ message: "Could not find user's profile" });
    profile.merge(data);
    await profile.save();

    return profile;
  }
  async destroy({ request, response }) {
    const { user_id } = request.params;
    const profile = await Profile.findBy({ user_id });
    if (!profile)
      return response
        .status(404)
        .send({ message: "Could not find user's profile" });
    profile.delete();
    await profile.save();
    return;
  }
}

module.exports = ProfileController;
