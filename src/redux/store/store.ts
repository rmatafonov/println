import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/redux/userSlice'
import forumSlice from '@/redux/forumSlice'
import enemiesSlice from '@/redux/enemiesSlice'

function configureAppStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      user: userSlice,
      forum: forumSlice,
      enemiesSlice,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

export default configureAppStore
