export type SignInData = {
  login: string
  password: string
}

export type AuthResponse = {
  error: null | string
}

export type SignUpData = {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export type AddToLeaderboardData = {
  ratingFieldName: string
  data: {
    date: string
    accuracy: string
    destroyed: string | number
  }
}

export type GetFromLeaderboardData = {
  ratingFieldName: string
  cursor: number
  limit: number
}
