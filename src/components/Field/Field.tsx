import React, { FC, InputHTMLAttributes } from 'react'
import './Field.css'

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

type Props = FC<FieldProps>

const Field: Props = ({
  readOnly,
  id,
  type,
  name,
  label,
  defaultValue,
  error,
  onFocus,
  onBlur,
}) => (
    <div className="field input">
      <div className="input__wrap">
        <label htmlFor={id} className="input__label">
          {label}
        </label>
        <input
          id={id}
          type={type}
          className="input__input"
          defaultValue={defaultValue}
          name={name}
          readOnly={readOnly}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>

      {error && <div className="input__error">{error}</div>}
    </div>
)

export default Field
