import React, { FC } from 'react';

import './input.css'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
}

const Input: FC<Props> = ({
  placeholder, error, onChange, className, type, value
}) => (
  <div className="field">
    <input placeholder={placeholder} value={value} type={type ?? 'text'} className={`field__input ${className}`} onChange={onChange} />
    {error &&
      <div className="field__error">{error}</div>
    }
  </div>
)

export default Input;
