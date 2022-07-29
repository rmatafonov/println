import { db } from '../db';
import { leaderboardModel } from '../models';

export const Leaderboard = db.sequelize.define('Leaderboard', leaderboardModel)
