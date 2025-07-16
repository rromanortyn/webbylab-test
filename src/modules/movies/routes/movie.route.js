import express from 'express'
import multer, { memoryStorage } from 'multer'

import wrap from '../../../shared/middlewares/wrap.middleware.js'
import validateRequest from '../../../shared/middlewares/validate-request.middleware.js'
import movieController from '../controllers/movie.controller.js'
import moviePaths from '../consts/movie-paths.js'
import getMovieByIdParamValidationSchema from '../validation-schemas/get-movie-by-id.param-validation-schema.js'
import addMovieHeadersValidationSchema from '../validation-schemas/add-movie.headers-validation-schema.js'
import addMovieJsonValidationSchema from '../validation-schemas/add-movie.json-validation-schema.js'
import updateMovieParamValidationSchema from '../validation-schemas/update-movie.param-validation-schema.js'
import updateMovieJsonValidationSchema from '../validation-schemas/update-movie.json-validation-schema.js'
import getMoviesQueryValidationSchema from '../validation-schemas/get-movies.query-validation-schema.js'
import importMoviesHeadersValidationSchema from '../validation-schemas/import-movies.headers-validation-schema.js'
import importMoviesFileValidationSchema from '../validation-schemas/import-movies.file-validation-schema.js'
import deleteMovieParamValidationSchema from '../validation-schemas/delete-movie.param-validation-schema.js'

const movieRouter = express.Router()
const upload = multer({
  storage: memoryStorage(),
})

movieRouter.post(
  moviePaths.root,
  ...wrap([
    validateRequest({
      headerSchema: addMovieHeadersValidationSchema,
      jsonSchema: addMovieJsonValidationSchema,
    }),
    movieController.addMovie,
  ]),
)

movieRouter.get(
  moviePaths.root,
  ...wrap([
    validateRequest({
      querySchema: getMoviesQueryValidationSchema,
    }),
    movieController.getMovies,
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

movieRouter.patch(
  moviePaths.$id,
  ...wrap([
    validateRequest({
      paramSchema: updateMovieParamValidationSchema,
      jsonSchema: updateMovieJsonValidationSchema,
    }),
    movieController.updateMovie,
  ]),
)

movieRouter.post(
  moviePaths.import,
  ...wrap([
    upload.single('movies'),
    validateRequest({
      headerSchema: importMoviesHeadersValidationSchema,
      fileSchema: importMoviesFileValidationSchema,
    }),
    movieController.importMovies,
  ]),
)

movieRouter.delete(
  moviePaths.$id,
  ...wrap([
    validateRequest({
      paramSchema: deleteMovieParamValidationSchema,
    }),
    movieController.deleteMovie,
  ]),
)

export default movieRouter
