import asyncHandler from './async-handler.middleware.js'

const wrap = (middlewares) => middlewares.map(m => asyncHandler(m))

export default wrap
