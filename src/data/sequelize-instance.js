import { Sequelize } from 'sequelize'

const sequelizeInstance = new Sequelize({
  dialect: 'sqlite',
  storage: 'db.sqlite',
})

export default sequelizeInstance
