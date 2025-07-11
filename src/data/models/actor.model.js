import { DataTypes } from 'sequelize'

import sequelizeInstance from '../sequelize-instance.js'
import modelNames from '../../shared/consts/model-names.js'

const ActorModel = sequelizeInstance.define(
  modelNames.actor,
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
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

export default ActorModel