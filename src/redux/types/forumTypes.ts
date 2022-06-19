export type ForumTheme = {
  title: string;
  comments?: number;
  date: string;
  id: number;
}

export type Comment = {
  messageId: string;
  userId: number;
  message: string;
  avatar: null | string;
  name: string;
  time: string;
  innerComments: null | Comment[];
}

export type ForumInnerTheme = {
  id: number;
  name: string;
  content: Comment[];
}

export type ForumState<T, V> = {
  forumThemes: {
    data: T[] | null;
  }
  forumInnerThemes: {
    data: V[] | null;
  }
}

export type AddForumPayload = {
  id: number;
  username: string;
  avatar: string | null;
  message: string;
  themeName: string;
}

export type AddCommentsPayload = {
  id: number;
  count: number;
}

export type SetThemeCommentPayload = {
  id: number;
  userId: number;
  message: string;
  avatar: string | null;
  name: string;
}
