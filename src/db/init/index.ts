import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { leaderboardModel } from '../models/Leaderboard'
import { userModel } from '../models/User'
import { userThemeModel } from '../models/UserTheme'

const sequelizeOptions: SequelizeOptions = {
  host: process.env.PSQL_HOST,
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB!,
  dialect: 'postgres',
}

export const sequelize = new Sequelize(sequelizeOptions)

export const User = sequelize.define('User', userModel)

export const Leaderboard = sequelize.define('Leaderboard', leaderboardModel)

User.hasMany(Leaderboard)

export const UserTheme = sequelize.define('UserTheme', userThemeModel);

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
