import { useState, useEffect } from 'react'
import { useAppDispatch } from '@/redux/store/hooks'
import {
  showLoader, hideLoader, showAlert, hideAlert
} from '@/redux/appSlice'
import leaderboardApi from '@/api/LeaderboardApi'
import { DataToLeaderboard, GetFromLeaderboardData } from '@/api/types'

export const useAddToLeaderboard = (req: DataToLeaderboard) => {
  const dispatcher = useAppDispatch()
  const pushToLeaderboard = async (reqData: DataToLeaderboard) => {
    try {
      dispatcher(showLoader)
      await leaderboardApi.add(reqData)
      dispatcher(hideLoader)
    } catch (e: any) {
      dispatcher(showAlert(e.reason))
      setTimeout(() => {
        dispatcher(hideAlert)
      }, 3000)
    }
  }
  useEffect(() => {
    pushToLeaderboard(req)
  }, [])
}

export const useGetFromLeaderboard = (
  req: GetFromLeaderboardData
): DataToLeaderboard[] | null => {
  const dispatcher = useAppDispatch()
  const [leaderboards, setLeaderboards] = useState(null)
  const fetchLeaderboard = async (reqData: GetFromLeaderboardData) => {
    try {
      dispatcher(showLoader())
      const { data } = await leaderboardApi.get(reqData)
      setLeaderboards(data)
      dispatcher(hideLoader())
    } catch (e: any) {
      dispatcher(showAlert(e.reason))
      setTimeout(() => {
        dispatcher(hideAlert())
      }, 3000)
    }
  }
  useEffect(() => {
    fetchLeaderboard(req)
  }, [])

  return leaderboards
}
