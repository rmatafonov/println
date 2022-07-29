import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/redux/userSlice'
import forumSlice from '@/redux/forumSlice'
import enemiesSlice from '@/redux/enemiesSlice'
import leaderboardSlice from '@/redux/leaderboardSlice'

function configureAppStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      user: userSlice,
      forum: forumSlice,
      enemiesSlice,
      leaderboard: leaderboardSlice,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export default configureAppStore
