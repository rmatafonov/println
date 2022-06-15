export type ForumTheme = {
  title: string;
  comments: number;
  date: string;
  id: number;
}

export type ForumState<T> = {
  forumThemes: {
    data: T[]
  }
}
