export type ForumTheme = {
  title: string;
  comments?: number;
  date: string;
  id: number;
}

export type Comment = {
  userId: number;
  message: string;
  avatar: null | string;
  name: string;
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
