import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import moment from 'moment'
import { RootState } from './store/store'
import {
  AddCommentsPayload,
  AddForumPayload, ForumInnerTheme, ForumState, ForumTheme
} from './types/forumTypes'

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
            message: `<h2>Внимание!</h2>
            <p>Здесь будет храниться информация обо всех нововведениях и обновлениях</p>
            <ul>
            <li>какой то пункт</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            </ul>
            <ol>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <ol>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то подпункт</span></li>
            <li>&nbsp;&nbsp;еще один</li>
            </ol>
            </ol>`,
            avatar: null,
            name: 'Никита',
            time: '20:26:15, 22 июня 2022',
            innerComments: null,
          },
          {
            userId: 14837,
            message: `<h2>Внимание!</h2>
            <p>Здесь будет храниться информация обо всех нововведениях и обновлениях</p>
            <ul>
            <li>какой то пункт</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            </ul>
            <ol>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <ol>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то подпункт</span></li>
            <li>&nbsp;&nbsp;еще один</li>
            </ol>
            </ol>`,
            avatar: null,
            name: 'Никита',
            time: '20:26:15, 22 июня 2022',
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
            time: '20:26:15, 22 июня 2022',
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
    addNewTheme(state, action: PayloadAction<AddForumPayload>) {
      const title = action.payload.themeName;
      const date = moment(new Date()).format('DD.MM.YYYY');
      const commentTime = moment(new Date()).format('HH:mm:ss, DD MMM YYYY')
      let id = 1

      if (state.forumThemes.data) {
        id = state.forumThemes.data[state.forumThemes.data.length - 1].id + 1
        state.forumThemes.data.push({
          title,
          id,
          date,
          comments: 1
        })
      } else {
        state.forumThemes.data = [{
          title, id, date, comments: 1
        }]
      }

      if (state.forumInnerThemes.data) {
        state.forumInnerThemes.data.push({
          id,
          name: title,
          content: [{
            userId: action.payload.id,
            name: action.payload.username,
            message: action.payload.message,
            avatar: action.payload.avatar,
            innerComments: null,
            time: commentTime,
          }]
        })
      } else {
        state.forumInnerThemes.data = [{
          id,
          name: title,
          content: [{
            userId: action.payload.id,
            name: action.payload.username,
            message: action.payload.message,
            avatar: action.payload.avatar,
            innerComments: null,
            time: commentTime,
          }]
        }]
      }
    },
    setCommentsCount(state, action: PayloadAction<AddCommentsPayload>) {
      const { id, count } = action.payload;
      state.forumThemes.data?.map((item) => {
        if (item.id === id) {
          item.comments = count
        }
        return item
      })
    }

  }
});

export const forumSelector = (state: RootState) => state.forum

export default forumSlice.reducer

export const { addNewTheme, setCommentsCount } = forumSlice.actions
