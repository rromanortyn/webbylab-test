import startSessionUseCase from '../use-cases/start-session.use-case.js'

const sessionController = {
  async startSession(req, res) {
    const {
      email,
      password,
    } = req.body
    
    const useCaseOutput = await startSessionUseCase.execute({
      email,
      password,
    })

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },
}

export default sessionController
