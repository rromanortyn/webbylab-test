import addUserUseCase from '../use-cases/add-user.use-case.js'

const userController = {
  async addUser(req, res) {
    const {
      email,
      name,
      password,
    } = req.body
    
    const useCaseOutput = await addUserUseCase.execute({
      email,
      name,
      password,
    })

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },
}

export default userController
