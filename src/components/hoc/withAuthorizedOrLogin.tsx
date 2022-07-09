import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import authApi from '@/api/AuthApi'
import Loader from '../Loader'

function withAuthorizedOrLogin(WrappedComponent: React.ComponentType) {
  return ({ ...props }) => {
    const location = useLocation()
    const [isLoading, setLoading] = useState(true)
    const [isAuthorized, setAuthorized] = useState(false)

    useEffect(() => {
      authApi.isAuthenticated().then((res) => {
        setAuthorized(res)
        setLoading(false)
      })
    }, [])

    if (isLoading) {
      return <Loader />
    }
    if (isAuthorized) {
      return <WrappedComponent {...props} />
    }

    return <Navigate to="/" state={{ from: location }} replace />
  }
}

export default withAuthorizedOrLogin
