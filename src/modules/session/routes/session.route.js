import express from 'express'

import wrap from '../../../shared/middlewares/wrap.middleware.js'
import validateRequest from '../../../shared/middlewares/validate-request.middleware.js'
import startSessionJsonValidationSchema from '../validation-schemas/start-session.json-validation-schema.js'
import sessionPaths from '../consts/session.paths.js'
import startSessionsHeaderValidationSchema from '../validation-schemas/start-session.header-validation-schema.js'
import sessionController from '../controllers/session.controller.js'

const sessionRouter = express.Router()

sessionRouter.post(
  sessionPaths.root,
  ...wrap([
    validateRequest({
      headerSchema: startSessionsHeaderValidationSchema,
      jsonSchema: startSessionJsonValidationSchema,
    }),
    sessionController.startSession,
  ]),
)

export default sessionRouter