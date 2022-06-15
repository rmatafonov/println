import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userSlice from '@/redux/userSlice'
import leaderboardSlice from '@/redux/leaderboardSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    leaderboard: leaderboardSlice,
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
