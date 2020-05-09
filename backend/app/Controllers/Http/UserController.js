const User = use('App/Models/User');

class UserController{
  async create({request}){
    const {name, email, password, cpf } = request.post()
    const user = await User.create({
      name, email, password, cpf
    });
    return user;
  }
  async show({request, response}){
    const {id} = request.params
    const user = await User.find(id)
    if(!user)
      return response.status(404).send({message:"User not found"})
    user.password= undefined
    return user
  }
  async update({request, auth, response}){


    try{
      const loggedUser = await auth.getUser()
      const {id}= loggedUser['$attributes']
      const {name, email, password, cpf, } = request.post()
      const user = await User.find(id)

      user.name = name
      user.email = email
      user.password = password
      user.cpf = cpf

      await user.save()

      return {name, email, password, cpf}
    }catch(err){
      return response.status(400).send({message: "operation not permited"})
    }

  }
  async remove({auth, response}){
    try{
      const logedUser = await auth.getUser()
      const {id} = logedUser['$attributes']
      const user = await User.find(id)
      await user.delete()
    }catch(err){
      return response.status(400).send({message: "operation not permited"})
    }

    return
  }
}

module.exports = UserController
