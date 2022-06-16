import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError } from 'axios'
import { DataToLeaderboard, GetFromLeaderboardData } from '@/api/types'
import { RootState } from '@/redux/store/store'
import leaderboardApi from '@/api/LeaderboardApi'

type LeaderboardState = {
  loading: boolean
  items: null | DataToLeaderboard[]
  message?: string | unknown
}

const initialState: LeaderboardState = {
  loading: false,
  items: null,
}

export const pushToLeaderboard = createAsyncThunk(
  'leaderboard/pushToLeaderboard',
  async (reqData: DataToLeaderboard, { rejectWithValue }) => {
    try {
      const response = await leaderboardApi.add(reqData)
      return response
    } catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.message)
    }
  }
)

export const fetchLeaderboard = createAsyncThunk(
  'leaderboard/fetchLeaderboard',
  async (reqData: GetFromLeaderboardData, { rejectWithValue }) => {
    try {
      const { data } = await leaderboardApi.get(reqData)
      return data
    } catch (error) {
      const err = error as AxiosError
      return rejectWithValue(err.message)
    }
  }
)

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLeaderboard.pending, (state) => {
      state.loading = true
    })
    builder.addCase(fetchLeaderboard.fulfilled, (state, action) => {
      state.loading = false
      state.items = action.payload
    })
    builder.addCase(fetchLeaderboard.rejected, (state, action) => {
      state.loading = false
      state.message = action.payload
    })
    builder.addCase(pushToLeaderboard.pending, (state) => {
      state.loading = true
    })
    builder.addCase(pushToLeaderboard.fulfilled, (state) => {
      state.loading = false
    })
    builder.addCase(pushToLeaderboard.rejected, (state, action) => {
      state.loading = false
      state.message = action.payload
    })
  },
})

export const leaderboardSelector = (state: RootState) => state.leaderboard

export default leaderboardSlice.reducer
