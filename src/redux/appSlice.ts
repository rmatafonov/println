import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store/store'

interface AppState {
  loading: boolean
  alert: null | string
}

const initialState: AppState = {
  loading: false,
  alert: null,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoader(state) {
      state.loading = true
    },
    hideLoader(state) {
      state.loading = false
    },
    showAlert(state, action: PayloadAction<string>) {
      state.alert = action.payload
    },
    hideAlert(state) {
      state.alert = null
    },
  },
})

export const appSelector = (state: RootState) => ({
  loading: state.app.loading,
  alert: state.app.alert,
})

export const {
  showLoader, hideLoader, showAlert, hideAlert
} = appSlice.actions

export default appSlice.reducer
