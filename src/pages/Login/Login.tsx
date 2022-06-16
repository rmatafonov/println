import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import authApi from 'api/AuthApi'

import Button from 'components/Button'
import Auth from 'components/Auth'

import { InputType } from 'components/Auth/types';
import { SubmitEventType } from './types'

import 'styles/auth.css'
import './login.css'

function Login() {
  const navigate = useNavigate();
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
  const [responseError, setResponseError] = useState<null | string>(null);
  const [isFailValidate, setIsFailValidate] = useState(true);

  const goToSignUp = () => {
    navigate('/sign-up')
  }

  const submit = useCallback(async (e: SubmitEventType) => {
    e.preventDefault();
    const login = inputs.find((item) => item.fieldType === 'login')?.value ?? '';
    const password = inputs.find((item) => item.fieldType === 'password')?.value ?? '';
    const response = await authApi.signIn({ login, password });
    setInputs(inputs.map((input) => {
      input.value = '';
      return input;
    }))
    if (response.error) {
      setResponseError(response.error)
    } else {
      navigate('/menu')
    }
  }, [inputs])

  return (
    <div className="login">
      <form className="login__form" onSubmit={submit}>
        <Auth inputs={inputs} setInputs={setInputs} setIsFailValidate={setIsFailValidate} title="Логин">
          <ul className="auth__buttons">
            <li className="auth__button">
              <Button isDisabled={isFailValidate} onClick={submit}>
                Войти
              </Button>
            </li>
            <li className="auth__button">
              <Button onClick={goToSignUp} className="button_simple">Нет аккаунта?</Button>
            </li>
          </ul>
          {responseError &&
            <div className="auth__error">
              {responseError}
            </div>
          }
        </Auth>
      </form>
    </div>
  );
}
export default Login;
