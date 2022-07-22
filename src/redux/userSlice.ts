import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import authApi from '@/api/AuthApi'
import { ChangeUserResponse, UserEnrichedData } from '@/api/types'
import { RootState } from '@/redux/store/types'
import profileApi from '@/api/ProfileApi'
import gameApi from '@/api/gameApi'

type UserState = {
  loading: boolean
  data: null | UserEnrichedData
  message?: unknown
}

const initialState: UserState = {
  loading: false,
  data: null,
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (): Promise<UserEnrichedData> => {
    const user = await authApi.getUser()
    const theme = await gameApi.getTheme()
    return { user, theme }
  }
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.loading = true
    })
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
