import React, { useEffect, useState } from 'react'
import authApi from '@/api/AuthApi'
import Loader from '../Loader'
import Login from '@/pages/Login'

function withAuthorizedOrLogin(WrappedComponent: React.ComponentType) {
  return ({ ...props }) => {
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
    return <Login></Login>
  }
}

export default withAuthorizedOrLogin
