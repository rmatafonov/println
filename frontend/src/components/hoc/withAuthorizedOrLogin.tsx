import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { UserState } from '@/redux/types/userTypes'

function withAuthorizedOrLogin(WrappedComponent: React.ComponentType, user: UserState) {
  return ({ ...props }) => {
    const location = useLocation()

    if (!user.loading && user.data) {
      console.log('rendering wrapped component');
      return <WrappedComponent {...props} />
    }

    console.log('navigating to /');
    return <Navigate to="/" state={{ from: location }} replace />
  }
}

export default withAuthorizedOrLogin
