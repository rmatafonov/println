import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from '../../api/AuthApi'

import Button from '../../components/Button'
import Input from '../../components/Input'
import '../../styles/auth.css'
import '../../styles/widget.css'
import { InputType } from '../SignUp/types';
import Validation from '../../utils/validate'

function Login() {
  const authApi = new AuthApi();
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
  const [isFailValidate, setIsFailValidate] = useState<boolean>(true);
  const [responseError, setResponseError] = useState<null | string>(null);

  const goToSignUp = () => {
    navigate('/sign-up')
  }

  useEffect(() => {
    const isEmptySomeInput = inputs.some((input) => Boolean(input.value) === false);
    const hasSomeError = inputs.some((input) => input.error !== null);
    setIsFailValidate(isEmptySomeInput || hasSomeError);
  }, [inputs]);

  const changeInput = useCallback((fieldType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    setResponseError(null);
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
    const login = inputs.find((item) => item.fieldType === 'login')?.value ?? '';
    const password = inputs.find((item) => item.fieldType === 'password')?.value ?? '';
    const response = await authApi.signIn({ login, password });
    setInputs(inputs.map((input) => {
      input.value = '';
      return input;
    }))
    if (response.error) {
      setResponseError(response.error)
    }
  }, [inputs])

  return (
    <div className="auth widget">
      <div className="widget__container container">
        <div className="widget__content">
          <h1 className="auth__title">Логин</h1>
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
                      error={error ?? ''}
                      className={error ? 'field__input_error' : ''}
                      value={value}
                      onChange={(e) => changeInput(fieldType, e)}
                    />
                  </li>
                ))
              }
            </ul>
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
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;
