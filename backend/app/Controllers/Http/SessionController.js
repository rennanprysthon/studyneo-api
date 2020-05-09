
class SessionController{

  async create({request, auth}){
    const {email, password} = request.post()
    const token = await auth.attempt(email, password);

    return token;

  }

}

module.exports = SessionController
