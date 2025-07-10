import bcrypt from 'bcrypt'

const bcryptService = {
  async hashPassword(password) {
    const hashedPassword = await bcrypt.hash(password, 10)
    
    return hashedPassword
  },
}

export default bcryptService