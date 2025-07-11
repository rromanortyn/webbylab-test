import movieService from '../services/movie.service.js'

const updateMovieUseCase = {
  async execute(input) {
    const {
      id,
      title,
      year,
      format,
      actors,
    } = input

    const movie = await movieService.getMovieById(id)

    if (!movie) {
      throw new Error('Movie not found')
    }

    const updatedMovie = await movieService.updateMovie({
      id,
      title,
      year,
      format,
      actors,
    })

    return {
      data: {
        data: updatedMovie,
        status: 1,
      },
      metadata: {
        statusCode: 200,
      },
    }
  },
}

export default updateMovieUseCase
