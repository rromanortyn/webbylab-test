import { DataTypes } from 'sequelize'

import sequelizeInstance from '../sequelize-instance.js'
import modelNames from '../../shared/consts/model-names.js'

const MovieModel = sequelizeInstance.define(
  modelNames.movie,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
)

export default MovieModel
