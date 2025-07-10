import jwt from 'jsonwebtoken'

const jwtService = {
  generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    
    return token
  },
}

export default jwtService
