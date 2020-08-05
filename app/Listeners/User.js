'use strict'
const Mail = use('Mail');
const Env = use('Env');
const Redis = use('Redis');
const crypto = use('crypto');
const bcrypt = use('bcrypt');
const User = exports = module.exports = {}

User.registered = async (user) => {
  const { name, email } = user;
  const confirmEmailToken = await bcrypt.hashSync(email, 10);
  const key = crypto.randomBytes(3).toString('HEX').toUpperCase();
  await Redis.set(key, confirmEmailToken);

  try {
    await Mail.send(
      'emails.welcome',
      {
        name,
        urlConfirmacao: `${Env.get('APP_URL')}/auth/confirm/${confirmEmailToken}`,
      },
      (message) => {
        message
          .from(
            'Studyneo <postmaster@sandboxa5218ba10a414287bb43e8064c4bb3d4.mailgun.org>'
          )
          .to(email)
          .subject('Confirmar email');
      }
    );
  } catch (error) {
    console.log(`Erro ao enviar o email: ${error}`);
  }

}
