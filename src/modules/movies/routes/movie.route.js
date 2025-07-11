import express from 'express'

import wrap from '../../../shared/middlewares/wrap.middleware.js'
import validateRequest from '../../../shared/middlewares/validate-request.middleware.js'
import movieController from '../controllers/movie.controller.js'
import moviePaths from '../consts/movie-paths.js'
import getMovieByIdParamValidationSchema from '../validation-schemas/get-movie-by-id.param-validation-schema.js'
import addMovieHeaderValidationSchema from '../validation-schemas/add-movie.header-validation-schema.js'
import addMovieJsonValidationSchema from '../validation-schemas/add-movie.json-validation-schema.js'

const movieRouter = express.Router()

movieRouter.post(
  moviePaths.root,
  ...wrap([
    validateRequest({
      headerSchema: addMovieHeaderValidationSchema,
      jsonSchema: addMovieJsonValidationSchema,
    }),
    movieController.addMovie,
  ]),
)

movieRouter.get(
  moviePaths.$id,
  ...wrap([
    validateRequest({
      paramSchema: getMovieByIdParamValidationSchema,
    }),
    movieController.getMovieById,
  ]),
)

export default movieRouter
