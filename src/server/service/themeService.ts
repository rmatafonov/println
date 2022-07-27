import { AppTheme } from '@/components/context/types';
import { UserTheme } from '@/db/init';

export const themeService = {
  find: (userId: string) => UserTheme.findOne({ where: { userId } }),

  createOrUpdate: async (userId: string, theme: AppTheme): Promise<string> => {
    const foundTheme = await UserTheme.findOne({
      where: { userId }
    })

    if (foundTheme === null) {
      await UserTheme.create({ userId, theme })
      return 'created'
    }

    foundTheme.theme = theme
    await foundTheme.save()
    return 'updated'
  }
}
