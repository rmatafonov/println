import { ForumComment, ForumTheme } from '@/redux/types/forumTypes'
import { dateUtils } from '@/utils'
import { ForumThemeCommentDao, ForumThemeDao } from '../db'

export const forumService = {
  createTheme: async (userId: number, title: string, comment?: string) => {
    const forumTheme = await ForumThemeDao.create({ title, userId })

    if (comment) {
      await forumTheme.createComment({ userId, text: comment })
    }
  },
  getForumsList: async (): Promise<ForumTheme[]> => {
    const forumThemes = await ForumThemeDao.findAll()
    const promises = forumThemes.map((theme): Promise<ForumTheme> => (
      theme.countComments().then((count) => ({
        id: theme.id!,
        title: theme.title,
        date: dateUtils.shortDate(theme.createdAt),
        commentsCount: count
      }))
    ))

    return Promise.all(promises)
  },
  getForumDetails: async (id: string): Promise<Nullable<ForumTheme>> => {
    const theme = await ForumThemeDao.findByPk(id, {
      include: [{
        model: ForumThemeCommentDao,
        as: 'comments'
      }],
      rejectOnEmpty: true
    })

    if (theme === null) {
      return null
    }

    return {
      id: theme.id!,
      title: theme.title,
      date: dateUtils.shortDate(theme.createdAt),
      commentsCount: theme.comments?.length,
      comments: theme.comments?.map((c): ForumComment => ({
        id: c.id,
        userId: c.userId,
        text: c.text,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      }))
    }
  }
}
