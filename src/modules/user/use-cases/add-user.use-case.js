import userService from '../services/user.service.js'
import jwtService from '../../jwt/services/jwt.service.js'

const addUserUseCase = {
  async execute(input) {
    const {
      email,
      name,
      password,
    } = input

    const addedUser = await userService.addUser({
      email,
      name,
      password,
    })

    const token = jwtService.generateToken({
      id: addedUser.id,
    })

    return {
      data: {
        token,
        status: 1,
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default addUserUseCase
