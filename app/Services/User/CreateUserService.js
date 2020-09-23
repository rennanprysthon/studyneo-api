const UserException = use('App/Exceptions/UserException');
const STATUS = use('App/Util/status');
const User = use('App/Models/User');

class CreateUserService {
  async exec({ name, email, password }) {
    if (!name) {
      throw new UserException(
        'O Nome não deve estar vazio',
        STATUS.BAD_REQUEST,
        'E_USER_NAME_EMPTY',
      );
    }

    if (!email) {
      throw new UserException(
        'O E-Mail não deve estar vazio',
        STATUS.BAD_REQUEST,
        'E_USER_EMAIL_EMPTY',
      );
    }

    if (!password) {
      throw new UserException(
        'A Senha não deve estar vazia',
        STATUS.BAD_REQUEST,
        'E_USER_PASSWORD_EMPTY',
      );
    }

    const userAlreadyExists = await User.findBy({ email });

    if (userAlreadyExists) {
      throw new UserException(
        'O E-Mail informado já está em uso',
        STATUS.BAD_UNAUTHORIZED,
        'E_USER_EMAIL_UNIQUE',
      );
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.trim().replace(/\s/g, ''),
      password: password.trim().replace(/\s/g, ''),
      is_activated: true,
    });
    return newUser;
  }
}
module.exports = CreateUserService;
