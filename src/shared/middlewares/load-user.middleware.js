import jwtService from '../../modules/jwt/services/jwt.service.js'
import userService from '../../modules/user/services/user.service.js'

const loadUser = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    next()

    return
  }

  const token = authorizationHeader.split(' ')[1]

  const decodedToken = jwtService.decodeToken(token)

  const user = await userService.getUserById(decodedToken.id)

  if (!user) {
    next()

    return
  }

  req.user = user

  next()
}

export default loadUser
