'use strict';
const Profile = use('App/Models/Profile');
class ProfileController {
  async create({ request, auth, response }) {
    try {
      const { uid: user_id } = auth.jwtPayload;
      const { escolaridade, is_from_public, area } = request.post();

      const profile = await Profile.create({
        escolaridade,
        is_from_public,
        area,
        user_id: Number(user_id),
      });
      return profile;
    } catch (err) {
      return response.status(400).json({ message: 'Opreation not permited' });
    }
  }
  async show({ request, auth, response }) {
    try {
      const { uid: user_id } = auth.jwtPayload;
      const profile = await Profile.findBy({ user_id });
      if (!profile)
        return response
          .status(404)
          .send({ message: "Could not find user's profile" });
      return profile;
    } catch (err) {
      return response.status(400).json({ message: 'Opreation not permited' });
    }
  }

  async update({ request, auth, response }) {
    try {
      const { uid: user_id } = auth.jwtPayload;

      const data = request.only(['escolaridade', 'is_from_public', 'area']);

      const profile = await Profile.findBy({ user_id });
      if (!profile)
        return response
          .status(404)
          .send({ message: "Could not find user's profile" });
      profile.merge(data);
      await profile.save();

      return profile;
    } catch (err) {
      return response.status(400).json({ message: 'Opreation not permited' });
    }
  }
  async destroy({ request, auth, response }) {
    try {
      const { uid: user_id } = auth.jwtPayload;
      const profile = await Profile.findBy({ user_id });
      if (!profile)
        return response
          .status(404)
          .send({ message: "Could not find user's profile" });
      profile.delete();
      await profile.save();
      return;
    } catch (err) {
      return response.status(400).json({ message: 'Opreation not permited' });
    }
  }
}

module.exports = ProfileController;
