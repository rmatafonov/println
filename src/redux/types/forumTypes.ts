export type ForumComment = {
  id: number
  userId: number
  text: string
  createdAt: Date
  updatedAt: Date
}

export type ForumTheme = {
  id: number
  title: string
  date: string
  commentsCount?: number
  comments?: Array<ForumComment>
}

export type InnerComment = {
  messageId: string,
  userId: number
  message: string
  avatar: null | string
  name: string
  time: string
}

export type ForumInnerTheme = {
  id: number
  name: string
  content: ForumComment[]
}

export type ForumState<T, V> = {
  forumThemes?: {
    data: T[] | null
  }
  forumInnerThemes?: {
    data: V[] | null
  }
}

export type AddForumPayload = {
  id: number
  username: string
  avatar: string | null
  message: string
  themeName: string
}

export type AddCommentsPayload = {
  id: number
  count: number
}

export type SetThemeCommentPayload = {
  id: number
  userId: number
  message: string
  avatar: string | null
  name: string
}
