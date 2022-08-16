import { configureStore } from '@reduxjs/toolkit'
import userSlice from '@/redux/userSlice'
import enemiesSlice from '@/redux/enemiesSlice'

function configureAppStore(preloadedState?: any) {
  return configureStore({
    reducer: {
      user: userSlice,
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
