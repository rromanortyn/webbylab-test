const validateRequestPart = async (options) => {
  let data

  const {
    req,
    part,
    schema,
  } = options

  switch (part) {
    case 'headers':
      data = req.headers

      break
    
    case 'body':
      data = req.body

      break

    case 'params':
      data = req.params

      break
  
    case 'file':
      data = req.file

      break
  
    default:
      break
  }

  schema.parse(data)
}

export default validateRequestPart
