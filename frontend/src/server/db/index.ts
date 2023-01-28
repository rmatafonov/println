import { DataTypes, Sequelize } from 'sequelize'
import { ForumThemeModel } from './forum/ForumThemeModel'
import { ForumThemeCommentModel } from './forum/ForumThemeCommentModel'
import { ForumThemeCommentAnswerModel } from './forum/ForumThemeCommentAnswerModel'
import { LeaderboardModel } from './LeaderboardModel'
import { UserThemeModel } from './UserThemeModel'

const sequelize = new Sequelize({
  host: process.env.PSQL_HOST,
  port: +process.env.POSTGRES_PORT!,
  username: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB!,
  dialect: 'postgres',
})

const UserThemeDao = sequelize.define<UserThemeModel>('UserThemes', {
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
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

const LeaderBoardDao = sequelize.define<LeaderboardModel>('Leaderboard', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  accuracy: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  destroyed: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

const ForumThemeCommentAnswerDao = sequelize.define<ForumThemeCommentAnswerModel>('ForumThemeCommentAnswers', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

const ForumThemeCommentDao = sequelize.define<ForumThemeCommentModel>('ForumThemeComments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ownerId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

const ForumThemeDao = sequelize.define<ForumThemeModel>('ForumThemeModels', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  title: {
    type: new DataTypes.STRING(128),
    allowNull: false
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
})

ForumThemeCommentDao.hasMany(ForumThemeCommentAnswerDao, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'answers'
})
ForumThemeCommentAnswerDao.belongsTo(ForumThemeCommentDao)

ForumThemeDao.hasMany(ForumThemeCommentDao, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'comments'
})
ForumThemeCommentDao.belongsTo(ForumThemeDao)

export {
  sequelize,
  ForumThemeDao,
  ForumThemeModel,
  ForumThemeCommentDao,
  ForumThemeCommentModel,
  ForumThemeCommentAnswerDao,
  ForumThemeCommentAnswerModel,
  UserThemeDao,
  LeaderBoardDao
}
