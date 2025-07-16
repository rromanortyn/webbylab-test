import validateRequestPart from './validate-request-part.middleware.js'

const validateRequest = (validationsCollection) => async (
  req,
  res,
  next,
) => {
  const {
    jsonSchema,
    fileSchema,
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

  if (fileSchema) {
    await validateRequestPart(
      {
        req,
        part: 'file',
        schema: fileSchema,
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
