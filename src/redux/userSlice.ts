import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authApi from '@/api/AuthApi'
import { GetUserResponse } from '@/api/types'
import { RootState } from '@/redux/store/store'

type UserState = {
  data: null | GetUserResponse
}

const initialState: UserState = {
  data: null
}

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await authApi.getUser()
  return response.data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export const userSelector = (state: RootState) => state.user.data

export default userSlice.reducer
