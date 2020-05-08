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
  async update({request, response}){

    const {name, email, password, cpf, } = request.post()
    const {id} = request.params
    const user = await User.find(id)
    if(!user)
      return response.status(404).send({message:"User not found"})
    user.name = name
    user.email = email
    user.password = password
    user.cpf = cpf

    await user.save()

    return {name, email, password, cpf}
  }
  async remove({request, response}){
    const {id} = request.params
    const user = await User.find(id)

    if(!user)
      return response.status(404).send({message:"User not found"})

    await user.delete()

    return
  }
}

module.exports = UserController
