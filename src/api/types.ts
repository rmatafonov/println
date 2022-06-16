export type SignInData = {
  login: string
  password: string
}

export type AuthResponse = {
  error: null | string
}

export type GetUserResponse = {
  id: number
  first_name: string
  second_name: string
  display_name: string
  login: string
  email: string
  phone: string
  avatar: string
}

export type ChangeUserResponse = Omit<GetUserResponse, 'id' | 'avatar'>

export type SignUpData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type DataToLeaderboard = {
  ratingFieldName: string
  data: {
    id: string
    date: string
    accuracy: string
    destroyed: string | number
  }
}

export type GetFromLeaderboardData = {
  ratingFieldName: string
  cursor: number | string
  limit: number
}
