import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import userRouter from './modules/user/routes/user.route.js'
import appRoutes from './shared/consts/app-routes.js'
import sequelizeInstance from './data/sequelize-instance.js'
import errorHandler from './shared/middlewares/error-handler.middleware.js'

(async () => {
  try {
    await sequelizeInstance.authenticate()
    await sequelizeInstance.sync()

    const app = express()
  
    app.use(express.json())
    
    app.use(appRoutes.users, userRouter)
    
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
