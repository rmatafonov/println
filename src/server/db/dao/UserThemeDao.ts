import { db } from '../db';
import { userThemeModel } from '../models';

export const UserTheme = db.sequelize.define('UserTheme', userThemeModel)
