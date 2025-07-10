import { z } from 'zod'

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

	res
    .status(500)
    .json({
      error: err.message || 'Internal Server Error',
    })
}

export default errorHandler
