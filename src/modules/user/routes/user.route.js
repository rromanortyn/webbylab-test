import express from 'express'

import wrap from '../../../shared/middlewares/wrap.middleware.js'
import userController from '../controllers/user.controller.js'
import userPaths from '../consts/user-paths.js'
import validateRequest from '../../../shared/middlewares/validate-request.middleware.js'
import addUserJsonValidationSchema from '../validation-schemas/add-user.json-validation-schema.js'
import addUserHeaderValidationSchema from '../validation-schemas/add-user.header-validation-schema.js'

const userRouter = express.Router()

userRouter.post(
  userPaths.root,
  ...wrap([
    validateRequest({
      jsonSchema: addUserJsonValidationSchema,
      headerSchema: addUserHeaderValidationSchema,
    }),
    userController.addUser,
  ]),
)

export default userRouter
