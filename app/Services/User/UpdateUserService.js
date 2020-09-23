const UserException = use('App/Exceptions/UserException');
const STATUS = use('App/Util/status');
const User = use('App/Models/User');

class UpdateUserService {
  async exec({ id, name, email, password }) {
    if (!id) {
      throw new UserException(
        'O ID não deve estar vazio',
        STATUS.BAD_REQUEST,
        'E_USER_ID_EMPTY',
      );
    }
    const user = await User.find(id);

    const data = { name, email, password };

    if (!data) {
      throw new UserException(
        'Nenhum dado para ser alterado',
        STATUS.BAD_REQUEST,
        'E_USER_ALL_EMPTY',
      );
    }

    const usersByEmail = await User.query().where({ email }).fetch();
    const [userByEmail] = usersByEmail.toJSON();
    if (userByEmail) {
      if (userByEmail.id !== id) {
        throw new UserException(
          'O Email já está em uso',
          STATUS.BAD_REQUEST,
          'E_USER_EMAIL_USED',
        );
      } else {
        delete data.email;
      }
    }

    user.merge(data);
    await user.save();

    return user;
  }
}

module.exports = UpdateUserService;
