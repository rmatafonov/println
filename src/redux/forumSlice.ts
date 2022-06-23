import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { nanoid } from 'nanoid'
import { momentConvert } from '@/utils/momentConvert'
import { RootState } from './store/types'
import {
  AddCommentsPayload,
  AddForumPayload, ForumInnerTheme, ForumState, ForumTheme, SetThemeCommentPayload
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
            messageId: nanoid(),
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
            </ol>`,
            avatar: null,
            name: 'Никита',
            time: '20:26:15, 22 июня 2022',
            innerComments: null,
          },
          {
            messageId: nanoid(),
            userId: 14837,
            message: `<h2>Внимание! Здесь еще более важная информация</h2>
            <p>Очень сильно важная информация, прямо под этим текстом!</p>
            <ul>
            <li>какой то пункт</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            </ul>
            <ol>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
            <li><span style="color: rgb(26,26,26);background-color: rgb(236,236,236);font-size: medium;font-family: Roboto, Arial, sans-serif;">какой то пункт</span>&nbsp;</li>
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
            messageId: nanoid(),
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
      const date = momentConvert('forum', new Date());
      const commentTime = momentConvert('message', new Date());
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
            messageId: nanoid(),
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
            messageId: nanoid(),
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
    },
    setThemeComment(state, action: PayloadAction<SetThemeCommentPayload>) {
      if (state.forumInnerThemes.data) {
        const time = momentConvert('message', new Date())
        state.forumInnerThemes.data.map((theme) => {
          if (theme.id === action.payload.id) {
            theme.content.push({
              userId: action.payload.userId,
              message: action.payload.message,
              avatar: action.payload.avatar,
              name: action.payload.name,
              time,
              innerComments: null,
              messageId: nanoid(),
            })
          }
          return theme
        })
      } else {
        throw new Error('Что то пошло не так')
      }
    },
    setInnerComment(state, action: PayloadAction<any>) {
      const newMessageId = nanoid()
      const time = momentConvert('message', new Date())
      const {
        forumId, userId, message, avatar, name, messageId
      } = action.payload
      if (state.forumInnerThemes.data) {
        state.forumInnerThemes.data.map((innerTheme) => {
          if (innerTheme.id === forumId) {
            innerTheme.content.map((content) => {
              if (content.messageId === messageId) {
                const newMessage = {
                  userId,
                  message,
                  avatar,
                  name,
                  time,
                  messageId: newMessageId
                }
                if (!content.innerComments) {
                  content.innerComments = [newMessage]
                } else {
                  content.innerComments.push(newMessage)
                }
              }
              return content
            })
          }
          return innerTheme
        })
      } else {
        throw new Error('Что то пошло не так')
      }
    }
  }
});

export const forumSelector = (state: RootState) => state.forum

export default forumSlice.reducer

export const {
  addNewTheme, setCommentsCount, setThemeComment, setInnerComment
} = forumSlice.actions
