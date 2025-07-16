import movieService from '../services/movie.service.js'

const getMoviesUseCase = {
  async execute(input) {
    const { count, movies } = await movieService.getMovies(input)

    return {
      data: {
        data: movies,
        status: 1,
        meta: {
          total: count,
        },
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default getMoviesUseCase
