import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import authApi from '@/api/AuthApi'
import { GetUserResponse, ChangeUserResponse } from '@/api/types'
import { RootState } from '@/redux/store/types'
import profileApi from '@/api/ProfileApi'

type UserState = {
  loading: boolean
  data: null | GetUserResponse
  message?: unknown
}

const initialState: UserState = {
  loading: false,
  data: null,
}

// eslint-disable-next-line no-return-await
export const fetchUser = createAsyncThunk('user/fetchUser', async () => await authApi.getUser())

export const pushAvatar = createAsyncThunk(
  'user/pushAvatar',
  async (req: FormData, { rejectWithValue }) => {
    try {
      const response = await profileApi.changeUserAvatar(req)
      return response.data
    } catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.message)
    }
  }
)

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (req: ChangeUserResponse, { rejectWithValue }) => {
    try {
      const response = await profileApi.changeUserData(req)
      return response.data
    } catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.message)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
    builder.addCase(pushAvatar.pending, (state) => {
      state.loading = true
    })
    builder.addCase(pushAvatar.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(pushAvatar.rejected, (state, action) => {
      state.loading = false
      state.message = action.payload
    })
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true
    })
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false
      state.data = action.payload
    })
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false
      state.message = action.payload
    })
  },
})

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
