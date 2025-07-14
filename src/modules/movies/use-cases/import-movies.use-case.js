import movieService from '../services/movie.service.js'

const importMoviesUseCase = {
  async execute(input) {
    const {
      moviesFile,
    } = input

    const importedMovies = await movieService.importMovies(moviesFile)

    return {
      data: {
        data: importedMovies,
        status: 1,
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default importMoviesUseCase
