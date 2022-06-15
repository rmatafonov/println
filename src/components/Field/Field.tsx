import React, { FC, InputHTMLAttributes } from 'react'
import './Field.css'

export type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

type Props = FC<FieldProps>

const Field: Props = ({
  readOnly, id, type, name, label, defaultValue, error
}) => (
  <div className="field">
    <label htmlFor={id} className="field__label">
      {label}
    </label>
    <input
      id={id}
      type={type}
      className="field__input"
      defaultValue={defaultValue}
      name={name}
      readOnly={readOnly}
    />
    {error &&
      <div className="field__error">{error}</div>
    }
  </div>
)

export default Field
