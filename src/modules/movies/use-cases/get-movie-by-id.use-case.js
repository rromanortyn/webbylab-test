import movieService from '../services/movie.service.js'

const getMovieByIdUseCase = {
  async execute(input) {
    const {
      id,
    } = input

    const movie = await movieService.getMovieById(id)

    if (!movie) {
      throw new Error('Movie not found')
    }

    return {
      data: {
        data: movie,
        status: 1,
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default getMovieByIdUseCase
