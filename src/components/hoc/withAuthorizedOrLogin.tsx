import React, { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import authApi from '@/api/AuthApi'
import Loader from '../Loader'
import { gameApi } from '@/api'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { setUser, userSelector } from '@/redux/userSlice'

function withAuthorizedOrLogin(WrappedComponent: React.ComponentType) {
  return ({ ...props }) => {
    const location = useLocation()

    const user = useAppSelector(userSelector)
    console.log('withAuthorizedOrLogin', user)
    const dispatch = useAppDispatch()

    useEffect(() => {
      authApi.getUser().then((authenticatedUser) => {
        gameApi.getTheme(authenticatedUser.id).then((userTheme) => {
          console.log(authenticatedUser)
          console.log(userTheme)
          dispatch(setUser({ user, theme: userTheme }))
        })
      })
    }, [])

    if (user.loading) {
      console.log('rendering loader');
      return <Loader />
    }
    if (!user.loading && user.data) {
      console.log('rendering wrapped component');
      return <WrappedComponent {...props} />
    }

    console.log('navigating to /');
    return <Navigate to="/" state={{ from: location }} replace />
  }
}

export default withAuthorizedOrLogin
