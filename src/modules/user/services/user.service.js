import bcryptService from '../../bcrypt/services/bcrypt.service.js'
import UserModel from '../../../data/models/user.model.js'
import getObjectWithoutKeys from '../../../shared/utils/get-object-without-keys.js'

const userService = {
  async addUser(input) {
    const {
      email,
      name,
      password,
    } = input

    const userByEmail = await UserModel.findOne({
      where: {
        email,
      },
    })

    if (userByEmail) {
      throw new Error('User with the specified email already exists')
    }

    const passwordHash = await bcryptService.hashPassword(password)

    const addedUser = await UserModel.create({
      email,
      name,
      password: passwordHash,
    })

    return getObjectWithoutKeys(
      addedUser.dataValues,
      ['password'],
    )
  },

  async getUserByEmail(email) {
    const userByEmail = await UserModel.findOne({
      where: {
        email,
      },
    })

    return userByEmail
  },
}

export default userService
