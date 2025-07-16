import movieService from '../services/movie.service.js'
import AppException from '../../../shared/exceptions/app.exception.js'

const deleteMovieUseCase = {
  async execute(input) {
    const {
      id,
    } = input

    const movie = await movieService.getMovieById(id)

    if (!movie) {
      throw new AppException(404, 'Movie not found')
    }

    await movieService.deleteMovie(id)

    return {
      data: {
        status: 1,
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default deleteMovieUseCase
