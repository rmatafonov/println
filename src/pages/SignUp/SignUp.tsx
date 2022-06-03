import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from 'api/AuthApi'

import Button from 'components/Button'
import Input from 'components/Input'
import Validation from 'utils/validate'
import { InputType } from './types'
import 'styles/auth.css'
import 'styles/widget.css'

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
  const [isFailValidate, setIsFailValidate] = useState<boolean>(true);
  const [responseError, setResponseError] = useState<null | string>(null);

  useEffect(() => {
    const isEmptySomeInput = inputs.some((input) => Boolean(input.value) === false);
    const hasSomeError = inputs.some((input) => input.error !== null);
    setIsFailValidate(isEmptySomeInput || hasSomeError);
  }, [inputs]);

  const navigate = useNavigate();

  const changeInput = useCallback((fieldType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const validate = new Validation()
    const inputError = validate.by(fieldType, e.target.value)
    setInputs(inputs.map((input) => {
      if (input.fieldType === fieldType) {
        input.value = e.target.value;
        input.error = inputError;
      }
      return input;
    }))
  }, [inputs])

  const submit = useCallback(async () => {
    // eslint-disable-next-line camelcase
    const first_name = inputs.find((item) => item.fieldType === 'name')?.value ?? '';
    // eslint-disable-next-line camelcase
    const second_name = inputs.find((item) => item.fieldType === 'lastName')?.value ?? '';
    const email = inputs.find((item) => item.fieldType === 'email')?.value ?? '';
    const phone = inputs.find((item) => item.fieldType === 'phone')?.value ?? '';
    const login = inputs.find((item) => item.fieldType === 'login')?.value ?? '';
    const password = inputs.find((item) => item.fieldType === 'password')?.value ?? '';
    const response = await authApi.signUp({
      // eslint-disable-next-line camelcase
      login, password, first_name, second_name, email, phone
    });
    setInputs(inputs.map((input) => {
      input.value = '';
      return input;
    }))
    if (response.error) {
      setResponseError(response.error)
    }
  }, [inputs])

  const goToLogin = () => {
    navigate('/')
  }
  return (
    <div className="auth widget">
      <div className="widget__container container">
        <div className="widget__content">
          <h1 className="auth__title">Регистрация</h1>
          <div className="auth__body">
            <ul className="auth__inputs">
              {inputs
                .map(({
                  name, error, id, fieldType, type, value
                }) => (
                  <li key={id} className="auth__input">
                    <Input
                      placeholder={name}
                      type={type}
                      value={value}
                      error={error ?? ''}
                      className={error ? 'field__input_error' : ''}
                      onChange={(e) => changeInput(fieldType, e)}
                    />
                  </li>
                ))
              }
            </ul>
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
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp
