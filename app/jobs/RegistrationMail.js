const Mail = use('Mail');

module.exports = {
  key: 'Registration',
  async handle({ data }) {
    const { name } = data;
    await Mail.send(
      'emails.welcome',
      {
        name,
      },
      (message) => {
        message
          .from('no-reply <no-reply@studyneo.com>')
          .to(user.email)
          .subject('Confirmar email');
      }
    );
  },
};
