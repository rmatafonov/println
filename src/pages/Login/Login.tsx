import React, { useState, useCallback, useEffect, FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import authApi from 'api/AuthApi'

import Button from 'components/Button'
import Auth from 'components/Auth'

import { InputType } from 'components/Auth/types'
import { SubmitEventType } from './types'

import 'styles/auth.css'
import './login.css'
import { oAuth, urlUtils } from '@/utils'
import { yandexOAuthSvg } from '@/static/images'
import { YandexOAuthSearchParamsState } from '@/api/types'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { setUser, userSelector } from '@/redux/userSlice'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()

  const [inputs, setInputs] = useState<InputType[]>([
    {
      fieldType: 'login',
      name: 'Логин',
      error: null,
      value: '',
      id: 0,
    },
    {
      fieldType: 'password',
      name: 'Пароль',
      error: null,
      value: '',
      type: 'password',
      id: 1,
    },
  ])
  const [responseError, setResponseError] = useState<null | string>(null)
  const [isFailValidate, setIsFailValidate] = useState(true)

  let nextPath = '/menu'
  if (location.state) {
    nextPath = (location.state as LocationState).from?.pathname
  }
  const fetchUserAndGoAhead = () => {
    authApi.getEnrichedUser().then((user) => {
      document.cookie = `user=${JSON.stringify(user)}; path=/`
      dispatch(setUser(user))
      navigate(nextPath)
    })
  }

  const dispatch = useAppDispatch()
  const userInfo = useAppSelector(userSelector)

  useEffect(() => {
    const searchParams = urlUtils.getUrlParams()
    if (searchParams.code) {
      oAuth.authServer(searchParams.code).then(() => {
        if (searchParams.state) {
          const state: YandexOAuthSearchParamsState = JSON.parse(
            searchParams.state
          )
          if (state.currentPath !== '/') {
            navigate(state.currentPath)
          } else {
            fetchUserAndGoAhead()
          }
        } else {
          fetchUserAndGoAhead()
        }
      })
    }
  }, [userInfo])

  const goToSignUp = () => {
    navigate('/sign-up')
  }

  const submit = useCallback(
    async (e: SubmitEventType) => {
      e.preventDefault()
      const login =
        inputs.find((item) => item.fieldType === 'login')?.value ?? ''
      const password =
        inputs.find((item) => item.fieldType === 'password')?.value ?? ''
      const response = await authApi.signIn({ login, password })
      setInputs(
        inputs.map((input) => {
          input.value = ''
          return input
        })
      )
      if (response.error) {
        setResponseError(response.error)
      } else {
        fetchUserAndGoAhead()
      }
    },
    [inputs]
  )

  const formSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="login">
      <form className="login__form" onSubmit={formSubmit}>
        {responseError && <div className="auth__error">{responseError}</div>}
        <Auth
          inputs={inputs}
          setInputs={setInputs}
          setIsFailValidate={setIsFailValidate}
          title="Логин"
        >
          <ul className="auth__buttons">
            <li className="auth__button">
              <Button isDisabled={isFailValidate} onClick={submit}>
                Войти
              </Button>
            </li>
            <li className="auth__button">
              <Button onClick={goToSignUp} className="button_simple">
                Нет аккаунта?
              </Button>
            </li>
            <li>
              <hr />
            </li>
            <li className="auth__button">
              <Button onClick={oAuth.yandex}>
                <img className="auth__button-icon" src={yandexOAuthSvg}></img>
                Войти с Яндекс ID
              </Button>
            </li>
          </ul>
        </Auth>
      </form>
    </div>
  )
}
export default Login
