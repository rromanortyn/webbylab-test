import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import userRouter from './modules/user/routes/user.route.js'
import appRoutes from './shared/consts/app-routes.js'
import sequelizeInstance from './data/sequelize-instance.js'
import errorHandler from './shared/middlewares/error-handler.middleware.js'
import sessionRouter from './modules/session/routes/session.route.js'
import loadUser from './shared/middlewares/load-user.middleware.js'
import movieRouter from './modules/movies/routes/movie.route.js'
import MovieModel from './data/models/movie.model.js'
import ActorModel from './data/models/actor.model.js'
import modelNames from './shared/consts/model-names.js'

(async () => {
  try {
    MovieModel.belongsToMany(ActorModel, {
      through: {
        model: modelNames.movieActor,
        as: 'movieActors',
      },
      as: 'actors',
      foreignKey: 'movieId',
      otherKey: 'actorId',
    })

    ActorModel.belongsToMany(MovieModel, {
      through: {
        model: modelNames.movieActor,
        as: 'actorMovies',
      },
      as: 'movies',
      foreignKey: 'actorId',
      otherKey: 'movieId',
    })

    await sequelizeInstance.authenticate()
    await sequelizeInstance.sync()

    const app = express()
  
    app.use(express.json())
    
    app.use(appRoutes.users, userRouter)
    app.use(appRoutes.sessions, sessionRouter)
    app.use(appRoutes.movies, movieRouter)
    
    app.use(loadUser)
    app.use(errorHandler)
    
    app.listen(3001, () => {
      console.log('Server is running on port 3001')
    })
  }

  catch (error) {
    console.error(error)

    process.exit(1)
  }
})()
