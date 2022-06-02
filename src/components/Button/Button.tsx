import React, { FC, ButtonHTMLAttributes } from 'react'
import './button.css'

type OwnProps = {
  isDisabled?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

type Props = FC<OwnProps>

const Button: Props = ({
  children, isDisabled, className, onClick, ...otherProps
}) => (
  <button className={`button ${className} ${isDisabled ? 'button_disabled' : ''}`} onClick={onClick} {...otherProps}>
    {children}
  </button>
)
export default Button
