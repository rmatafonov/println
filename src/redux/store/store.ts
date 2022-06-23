import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/redux/userSlice'
import forumSlice from '@/redux/forumSlice'
import enemiesSlice from '@/redux/enemiesSlice'
import leaderboardSlice from '@/redux/leaderboardSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    forum: forumSlice,
    enemiesSlice,
    leaderboard: leaderboardSlice,
  },
})

export default store
