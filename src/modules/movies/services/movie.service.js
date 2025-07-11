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
}

export default movieService
