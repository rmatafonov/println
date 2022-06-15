import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store/store';
import { ForumState, ForumTheme } from './types/forumTypes';

const initialState: ForumState<ForumTheme> = {
  forumThemes: {
    data: [
      {
        title: 'Важное',
        comments: 1342,
        date: '16.06.2022',
        id: 1,
      },
      {
        title: 'Флуд',
        comments: 22,
        date: '20.06.2022',
        id: 2,
      }
    ]
  }
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {}
});

export const forumSelector = (state: RootState) => state.forum

export default forumSlice.reducer
