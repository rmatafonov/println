import { DataType } from 'sequelize-typescript'
import sequelize from '../init'

const User = sequelize.define('user', {
  id: {
    type: DataType.STRING,
    primaryKey: true,
  },
  name: DataType.STRING,
})

const Leaderboard = sequelize.define('leaderboard', {
  id: { type: DataType.STRING, primaryKey: true },
  date: DataType.DATE,
  accuracy: DataType.STRING,
  destroyed: DataType.STRING || DataType.NUMBER,
})

User.hasMany(Leaderboard)

export { User, Leaderboard }
