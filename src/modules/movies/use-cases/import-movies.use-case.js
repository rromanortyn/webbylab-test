import movieService from '../services/movie.service.js'

const importMoviesUseCase = {
  async execute(input) {
    const {
      moviesFile,
    } = input

    const {
      imported,
      total,
      movies,
    } = await movieService.importMovies(moviesFile)

    return {
      data: {
        data: movies,
        status: 1,
        meta: {
          imported,
          total,
        },
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default importMoviesUseCase
