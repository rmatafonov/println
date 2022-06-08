/* eslint-disable camelcase */
import React, { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from 'api/AuthApi'

import Button from 'components/Button'
import Auth from 'components/Auth'

import { InputType } from 'components/Auth/types'
import { SubmitEventType } from 'pages/Login/types'

import 'styles/auth.css'
import './signUp.css'

function SignUp() {
  const authApi = new AuthApi();
  const [inputs, setInputs] = useState<InputType[]>([
    {
      fieldType: 'email',
      name: 'Почта',
      error: null,
      value: '',
      id: 0,
    },
    {
      fieldType: 'login',
      name: 'Логин',
      error: null,
      value: '',
      id: 1,
    },
    {
      fieldType: 'name',
      name: 'Имя',
      error: null,
      value: '',
      id: 2,
    },
    {
      fieldType: 'lastName',
      name: 'Фамилия',
      value: '',
      error: null,
      id: 3,
    },
    {
      fieldType: 'phone',
      name: 'Телефон',
      value: '',
      error: null,
      id: 4,
    },
    {
      fieldType: 'password',
      name: 'Пароль',
      value: '',
      error: null,
      type: 'password',
      id: 5,
    },
  ])
  const [isFailValidate, setIsFailValidate] = useState(true);
  const [responseError, setResponseError] = useState<null | string>(null);
  const navigate = useNavigate();

  const submit = useCallback(async (e: SubmitEventType) => {
    e.preventDefault();
    const first_name = inputs.find((item) => item.fieldType === 'name')?.value ?? '';
    const second_name = inputs.find((item) => item.fieldType === 'lastName')?.value ?? '';
    const email = inputs.find((item) => item.fieldType === 'email')?.value ?? '';
    const phone = inputs.find((item) => item.fieldType === 'phone')?.value ?? '';
    const login = inputs.find((item) => item.fieldType === 'login')?.value ?? '';
    const password = inputs.find((item) => item.fieldType === 'password')?.value ?? '';
    const response = await authApi.signUp({
      login, password, first_name, second_name, email, phone
    });
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

  const goToLogin = () => {
    navigate('/')
  }
  return (
    <div className="sign-up">
      <form className="sign-up__form" onSubmit={submit}>
        <Auth inputs={inputs} setInputs={setInputs} setIsFailValidate={setIsFailValidate} title="Регистрация">
          <ul className="auth__buttons">
            <li className="auth__button">
              <Button isDisabled={isFailValidate} onClick={submit}>
                Зарегистрироваться
              </Button>
            </li>
            <li className="auth__button">
              <Button onClick={goToLogin} className="button_simple">Войти</Button>
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

export default SignUp
