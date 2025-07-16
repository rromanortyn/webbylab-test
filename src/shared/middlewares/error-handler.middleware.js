import { z } from 'zod'
import AppException from '../exceptions/app.exception.js'

const errorHandler = (
  err,
  req,
  res,
  next,
) => {
	if (res.headersSent) {
		next(err)

    return
	}

	if (err instanceof z.ZodError) {
    const {
      message,
      path,
    } = err.issues[0]
    const formattedMessage = `${path.join('.')}: ${message}`

		res
      .status(400)
      .json({
        message: formattedMessage,
      })

    return
	}

  if (err instanceof AppException) {
    res
      .status(err.statusCode)
      .json({
        message: err.message,
      })

    return
  }

	res
    .status(500)
    .json({
      message: err.message || 'Internal Server Error',
    })
}

export default errorHandler
