import userService from '../../user/services/user.service.js'
import jwtService from '../../jwt/services/jwt.service.js'
import bcryptService from '../../bcrypt/services/bcrypt.service.js'

const startSessionUseCase = {
  async execute(input) {
    const {
      email,
      password,
    } = input

    const userByEmail = await userService.getUserByEmail(email)

    if (!userByEmail) {
      throw new Error('Email or password is incorrect')
    }

    const isPasswordValid = await bcryptService.comparePassword(
      password,
      userByEmail.password,
    )

    if (!isPasswordValid) {
      throw new Error('Email or password is incorrect')
    }

    const token = jwtService.generateToken({
      id: userByEmail.id,
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

export default startSessionUseCase