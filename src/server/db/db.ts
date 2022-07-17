import { DataTypes, Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  host: 'localhost',
  port: 5432,
  username: 'ztype',
  password: 'ZType#1',
  database: 'ztype_db',
  dialect: 'postgres'
});

export const UserTheme = sequelize.define('UserTheme', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  theme: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {});

console.log(UserTheme === sequelize.models.UserTheme);

export async function dbConnect() {
  try {
    await sequelize.authenticate(); // Проверка аутентификации в БД
    await sequelize.sync(); // Синхронизация базы данных
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
