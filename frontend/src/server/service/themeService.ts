import { AppTheme } from '@/components/context/types';
import { UserThemeDao } from '../db';

export const themeService = {
  find: (userId: string) => UserThemeDao.findOne({ where: { userId } }),

  createOrUpdate: async (userId: number, theme: AppTheme): Promise<string> => {
    const foundTheme = await UserThemeDao.findOne({
      where: { userId }
    })

    if (foundTheme === null) {
      await UserThemeDao.create({ userId, theme })
      return 'created'
    }

    foundTheme.theme = theme
    await foundTheme.save()
    return 'updated'
  }
}
