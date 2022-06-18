import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { RootState } from './store/store'
import { ForumState, ForumTheme } from './types/forumTypes'

const initialState: ForumState<ForumTheme> = {
  forumThemes: {
    data: [
      {
        title: 'Важное',
        comments: 1,
        date: '16.06.2022',
        id: 1,
      },
      {
        title: 'Флуд',
        comments: 1,
        date: '20.06.2022',
        id: 2,
      }
    ]
  }
}

const forumSlice = createSlice({
  name: 'forum',
  initialState,
  reducers: {
    addNewTheme(state, action: PayloadAction<string>) {
      const title = action.payload;
      const id = state.forumThemes.data[state.forumThemes.data.length - 1].id + 1
      const date = moment(new Date()).format('DD.MM.YYYY');
      state.forumThemes.data.push({
        title,
        id,
        date,
        comments: 1
      })
    }
  }
});

export const forumSelector = (state: RootState) => state.forum

export default forumSlice.reducer

export const { addNewTheme } = forumSlice.actions
