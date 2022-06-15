import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import appReducer from '@/redux/appSlice'
import userSlice from '@/redux/userSlice'
import forumSlice from '@/redux/forumSlice'

const store = configureStore({
  reducer: {
    app: appReducer,
    user: userSlice,
    forum: forumSlice
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
export default store
