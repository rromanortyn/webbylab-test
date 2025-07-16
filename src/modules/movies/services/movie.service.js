import { Op } from 'sequelize'

import MovieModel from '../../../data/models/movie.model.js'
import ActorModel from '../../../data/models/actor.model.js'
import getMoviesQueryOptions from '../utils/get-movies-query-options.js'
import getObjectWithoutKeys from '../../../shared/utils/get-object-without-keys.js'

const movieService = {
  async addMovie(input) {
    const {
      title,
      year,
      format,
      actors,
    } = input

    const existingActorsModels = await ActorModel.findAll({
      where: {
        name: {
          [Op.in]: actors,
        },
      },
    })

    const existingNames = existingActorsModels.map(a => a.name)
    const missingNames = actors.filter(name => !existingNames.includes(name))
    const newActorInputs = missingNames.map(name => ({ name }))
    
    const createdActorsModels = newActorInputs.length > 0
      ? await ActorModel.bulkCreate(newActorInputs)
      : []

    const actorsModels = [...existingActorsModels, ...createdActorsModels]

    const addedMovie = await MovieModel.create({
      title,
      year,
      format,
    })

    const actorsIds = actorsModels.map((actor) => actor.id)

    await addedMovie.addActors(actorsIds)

    return {
      ...addedMovie.dataValues,
      actors: actorsModels,
    }
  },

  async getMovies(input) {
    const { count: groupCounts, rows } = (
      await MovieModel.findAndCountAll(getMoviesQueryOptions(input))
    )

    const movies = rows.map((movie) => getObjectWithoutKeys(movie.dataValues, ['actors']))

    const count = Array.isArray(groupCounts)
      ? groupCounts.reduce((sum, g) => sum + g.count, 0)
      : groupCounts

    return {
      count,
      movies,
    }
  },

  async getMovieById(id) {
    const movie = await MovieModel.findByPk(id, {
      include: {
        model: ActorModel,
        as: 'actors',
        through: {
          attributes: [],
        },
      },
    })

    return movie
  },

  async updateMovie(input) {
    const {
      id,
      title,
      year,
      format,
      actors,
    } = input

    const movie = await MovieModel.findByPk(id, {
      include: {
        model: ActorModel,
        as: 'actors',
        through: {
          attributes: [],
        },
      },
    })

    if (!movie) {
      throw new AppException(404, 'Movie not found')
    }

    const updatedMovie = await movie.update({
      title,
      year,
      format,
    })

    let actorsModels = null

    if (actors) {
      const existingActorsModels = await ActorModel.findAll({
        where: {
          name: {
            [Op.in]: actors,
          },
        },
      })

      const existingNames = existingActorsModels.map((a) => a.name)
      const missingNames = actors.filter((name) => !existingNames.includes(name))
      const newActorInputs = missingNames.map((name) => ({ name }))

      const createdActorsModels = newActorInputs.length > 0
        ? await ActorModel.bulkCreate(newActorInputs)
        : []

      actorsModels = [...existingActorsModels, ...createdActorsModels]

      await updatedMovie.setActors(actorsModels.map((a) => a.id))
    }

    return {
      ...updatedMovie.dataValues,
      actors: actorsModels ?? movie.actors,
    }
  },

  async importMovies(moviesFile) {
    const fileContent = moviesFile.buffer.toString('utf-8')
    const movies = JSON.parse(fileContent)

    const actorNames = [...new Set(movies.flatMap(m => m.actors || []))]
    
    const existingActors = await ActorModel.findAll({
      where: { name: { [Op.in]: actorNames } }
    })
    
    const existingNames = existingActors.map(a => a.name)
    const missingNames = actorNames.filter(n => !existingNames.includes(n))
    const newActors = missingNames.map(name => ({ name }))
    
    const createdActors = newActors.length
      ? await ActorModel.bulkCreate(newActors)
    : []
    
    const allActors = [...existingActors, ...createdActors]
    const actorMap = Object.fromEntries(allActors.map(a => [a.name, a.id]))

    const createdMovies = await MovieModel.bulkCreate(
      movies.map(({ title, year, format }) => ({ title, year, format })),
      {
        returning: true,
      },
    )

    const joinRecords = []
    createdMovies.forEach((movie, idx) => {
      (movies[idx].actors || []).forEach(name => {
        joinRecords.push({
          movieId: movie.id,
          actorId: actorMap[name]
        })
      })
    })

    const { throughModel } = MovieModel.associations.actors
    
    await throughModel.bulkCreate(joinRecords)
    
    return {
      imported: createdMovies.length,
      total: movies.length,
      movies: createdMovies,
    }
  },

  async deleteMovie(id) {
    await MovieModel.destroy({
      where: {
        id,
      },
    })
  },
}

export default movieService
