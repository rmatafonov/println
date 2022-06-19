import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/redux/userSlice'
import enemiesSlice from '@/redux/enemiesSlice'
import leaderboardSlice from '@/redux/leaderboardSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    enemiesSlice,
    leaderboard: leaderboardSlice,
  },
})

export default store
