import React, { FC, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthApi from 'api/AuthApi'
import Validation from '@/util/validate'

import Input from 'components/Input'

import { Props } from 'components/Auth/types'

import 'styles/widget.css'

const Auth: FC<Props> = (({
  children, inputs, setInputs, setIsFailValidate, title
}) => {
  const authApi = new AuthApi();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const response = await authApi.getUser();
      return response
    }
    const checkAuthResponse = checkAuth();
    checkAuthResponse.then((res) => {
      if (res) {
        navigate('/menu')
      }
    })
  }, [])

  useEffect(() => {
    const isEmptySomeInput = inputs.some((input) => Boolean(input.value) === false);
    const hasSomeError = inputs.some((input) => input.error !== null);
    setIsFailValidate(isEmptySomeInput || hasSomeError);
  }, [inputs]);

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

  return (
    <div className="auth widget">
      <div className="widget__container container">
        <div className="widget__content">
          <h1 className="auth__title">{title}</h1>
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
            {children}
          </div>
        </div>
      </div>
    </div>
  )
})
export default Auth
