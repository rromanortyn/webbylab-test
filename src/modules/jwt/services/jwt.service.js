import jwt from 'jsonwebtoken'

const jwtService = {
  generateToken(payload) {
    const token = jwt.sign(payload, process.env.JWT_SECRET)
    
    return token
  },

  decodeToken(token) {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    
    return decodedToken
  },
}

export default jwtService
