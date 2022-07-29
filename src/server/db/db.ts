import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

const sequelizeOptions: SequelizeOptions = {
  host: process.env.PSQL_HOST,
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB!,
  dialect: 'postgres',
}

export const db = {
  sequelize: new Sequelize(sequelizeOptions),
  dbConnect: async () => {
    await db.sequelize.authenticate()
    await db.sequelize.sync()
  }
}
