import { UserEnrichedData } from '@/api/types'

export type UserState = {
  loading: boolean
  data: null | UserEnrichedData
  message?: unknown
}
