import { DataTypes } from 'sequelize'

import sequelizeInstance from '../sequelize-instance.js'
import modelNames from '../../shared/consts/model-names.js'

const UserModel = sequelizeInstance.define(
  modelNames.user,
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
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

export default UserModel
