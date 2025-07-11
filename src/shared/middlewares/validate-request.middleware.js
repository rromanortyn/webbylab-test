import validateRequestPart from './validate-request-part.middleware.js'

const validateRequest = (validationsCollection) => async (
  req,
  res,
  next,
) => {
  const {
    jsonSchema,
    filesSchema,
    headerSchema,
    querySchema,
    paramSchema,
  } = validationsCollection

  if (headerSchema) {
    await validateRequestPart(
      {
        req,
        part: 'headers',
        schema: headerSchema,
      },
    )
  }

  if (jsonSchema) {
    await validateRequestPart(
      {
        req,
        part: 'body',
        schema: jsonSchema,
      },
    )
  }

  if (filesSchema) {
    await validateRequestPart(
      {
        req,
        part: 'files',
        schema: filesSchema,
      },
    )
  }

  // if (querySchema) {
  //   await validateRequestPart(
  //     {
  //       c,
  //       part: 'query',
  //       schema: querySchema,
  //     },
  //   )
  // }

  if (paramSchema) {
    await validateRequestPart(
      {
        req,
        part: 'params',
        schema: paramSchema,
      },
    )
  }

  next()
}

export default validateRequest
