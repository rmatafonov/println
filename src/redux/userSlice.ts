import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import authApi from '@/api/AuthApi'
import { ChangeUserResponse, UserEnrichedData } from '@/api/types'
import { RootState } from '@/redux/store/types'
import profileApi from '@/api/ProfileApi'
import { UserState } from './types/userTypes'

const initialState: UserState = {
  loading: true,
  data: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (): Promise<UserEnrichedData> => authApi.getEnrichedUser()
)

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
  reducers: {
    setUser: (state, action: PayloadAction<null | UserEnrichedData>) => {
      state.data = action.payload
      state.message = undefined
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      console.log('loaded user')
      state.data = action.payload
      state.loading = false
    })
    builder.addCase(fetchUser.rejected, (state, action) => {
      console.log('loading user failed', action)
      state.message = `${action.error.code}: ${action.error.message}`
      state.data = null
      state.loading = false
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

export const { setUser } = userSlice.actions

export const userSelector = (state: RootState) => state.user

export default userSlice.reducer
