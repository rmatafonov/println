import authApi from '@/api/AuthApi'

const authUtils = {
  fetchUserAndGoAhead: (dispatch: ()) => {
    authApi.getEnrichedUser().then((user) => {
      dispatch(setUser(user))
      navigate(nextPath)
    })
  }
}
