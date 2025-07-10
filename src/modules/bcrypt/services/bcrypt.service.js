import bcrypt from 'bcrypt'

const bcryptService = {
  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10)

    return hashedPassword
  },

  async comparePassword(password, hashedPassword) {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword)

    return isPasswordValid
  },
}

export default bcryptService