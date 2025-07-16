import addMovieUseCase from '../use-cases/add-movie.use-case.js'
import getMovieByIdUseCase from '../use-cases/get-movie-by-id.use-case.js'
import updateMovieUseCase from '../use-cases/update-movie.use-case.js'
import getMoviesUseCase from '../use-cases/get-movies.use-case.js'
import importMoviesUseCase from '../use-cases/import-movies.use-case.js'
import deleteMovieUseCase from '../use-cases/delete-movie.use-case.js'

const movieController = {
  async addMovie(req, res) {
    const {
      title,
      year,
      format,
      actors,
    } = req.body

    const useCaseOutput = await addMovieUseCase.execute({
      title,
      year,
      format,
      actors,
    })

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },

  async getMovies(req, res) {
    const useCaseOutput = await getMoviesUseCase.execute(req.query)

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },

  async getMovieById(req, res) {
    const {
      id,
    } = req.params

    const useCaseOutput = await getMovieByIdUseCase.execute({
      id,
    })

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },

  async updateMovie(req, res) {
    const {
      id,
    } = req.params

    const {
      title,
      year,
      format,
      actors,
    } = req.body

    const useCaseOutput = await updateMovieUseCase.execute({
      id,
      title,
      year,
      format,
      actors,
    })

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },

  async importMovies(req, res) {
    const useCaseOutput = await importMoviesUseCase.execute({
      moviesFile: req.file,
    })

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },

  async deleteMovie(req, res) {
    const useCaseOutput = await deleteMovieUseCase.execute({
      id: req.params.id,
    })

    res
      .status(useCaseOutput.metadata.statusCode)
      .json(useCaseOutput.data)
  },
}

export default movieController
