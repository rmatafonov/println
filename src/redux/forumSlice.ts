import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { RootState } from './store/store'
import { ForumInnerTheme, ForumState, ForumTheme } from './types/forumTypes'

const initialState: ForumState<ForumTheme, ForumInnerTheme> = {
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
  },
  forumInnerThemes: {
    data: [
      {
        id: 1,
        name: 'Важное',
        content: [
          {
            userId: 14837,
            message: 'Здесь хранится важная информация о будущих обновлениях',
            avatar: null,
            name: 'Никита',
            innerComments: null,
          }
        ]
      },
      {
        id: 2,
        name: 'Флуд',
        content: [
          {
            userId: 14837,
            message: 'Флудилка',
            avatar: null,
            name: 'Никита',
            innerComments: null,
          }
        ]
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
      const date = moment(new Date()).format('DD.MM.YYYY');
      let id = 1
      if (state.forumThemes.data) {
        id = state.forumThemes.data[state.forumThemes.data.length - 1].id + 1
        state.forumThemes.data.push({
          title,
          id,
          date,
          comments: 1
        })
        return
      }
      state.forumThemes.data = [{
        title, id, date, comments: 1
      }]
    }
  }
});

export const forumSelector = (state: RootState) => state.forum

export default forumSlice.reducer

export const { addNewTheme } = forumSlice.actions
