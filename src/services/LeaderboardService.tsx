import { useAppDispatch } from '@/store/hooks'
import {
  showLoader,
  hideLoader,
  showAlert,
  hideAlert,
} from '@/redux/appSlice'
import leaderboardApi from '@/api/LeaderboardApi'
import { AddToLeaderboardData, GetFromLeaderboardData } from '@/api/types'

export const addToLeaderboard = async (data: AddToLeaderboardData) => {
  const dispatcher = useAppDispatch()
  try {
    dispatcher(showLoader)
    await leaderboardApi.add(data)
    dispatcher(hideLoader)
  } catch (e: any) {
    dispatcher(showAlert(e.reason))
    setTimeout(() => {
      dispatcher(hideAlert)
    }, 3000)
  }
}

export const getFromLeaderboard = async (data: GetFromLeaderboardData) => {
  const dispatcher = useAppDispatch()
  try {
    dispatcher(showLoader)
    await leaderboardApi.get(data)
    dispatcher(hideLoader)
  } catch (e: any) {
    dispatcher(showAlert(e.reason))
    setTimeout(() => {
      dispatcher(hideAlert)
    }, 3000)
  }
}
