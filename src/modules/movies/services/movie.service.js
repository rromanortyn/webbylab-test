import MovieModel from '../../../data/models/movie.model.js'
import ActorModel from '../../../data/models/actor.model.js'

const movieService = {
  async addMovie(input) {
    const {
      title,
      year,
      format,
      actors,
    } = input

    const actorsModels = await Promise.all(
      actors.map(async (actorName) => {
        const actor = await ActorModel.findOne({
          where: {
            name: actorName,
          },
        })

        if (!actor) {
          const newActor = await ActorModel.create({
            name: actorName,
          })

          return newActor
        }

        return actor
      }),
    )

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

  async getMovies() {
    const movies = await MovieModel.findAll({
      include: {
        model: ActorModel,
      },
    })

    return movies
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

    const movie = await MovieModel.findByPk(
      id,
      {
        include: {
          model: ActorModel,
          as: 'actors',
          through: {
            attributes: [],
          },
        },
      },
    )

    if (!movie) {
      throw new Error('Movie not found')
    }

    const updatedMovie = await movie.update({
      title,
      year,
      format,
    })

    let actorsModels

    if (actors) {
      actorsModels = await Promise.all(
        actors.map(async (actorName) => {
          const actor = await ActorModel.findOne({
            where: {
              name: actorName,
            },
          })
  
          if (!actor) {
            const newActor = await ActorModel.create({
              name: actorName,
            })
  
            return newActor
          }
  
          return actor
        }),
      )
    }

    if (actorsModels) {
      const actorsIds = actorsModels.map((actor) => actor.id)

      await updatedMovie.setActors(actorsIds)
    }

    return {
      ...updatedMovie.dataValues,
      actors: actorsModels ?? movie.actors,
    }
  },
}

export default movieService
