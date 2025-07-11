import movieService from '../services/movie.service.js'

const addMovieUseCase = {
  async execute(input) {
    const {
      title,
      year,
      format,
      actors,
    } = input

    const addedMovie = await movieService.addMovie({
      title,
      year,
      format,
      actors,
    })

    return {
      data: {
        data: addedMovie,
        status: 1,
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default addMovieUseCase
