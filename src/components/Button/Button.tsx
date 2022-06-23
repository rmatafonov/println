import React, { FC, ButtonHTMLAttributes } from 'react'
import './button.css'

type OwnProps = {
  isDisabled?: boolean
  isHidden?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

type Props = FC<OwnProps>

const Button: Props = ({
  children,
  isDisabled,
  isHidden,
  className,
  onClick,
  ...otherProps
}) => (
  <button
    className={`button ${className} ${isDisabled ? 'button_disabled' : ''} ${
      isHidden ? 'button_hidden' : ''
    } `}
    onClick={onClick}
    {...otherProps}
  >
    {children}
  </button>
)
export default Button
