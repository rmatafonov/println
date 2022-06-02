import React, { FC, ButtonHTMLAttributes } from 'react'
import './button.css'

type OwnProps = {
  myCustomProp?: 'some' | 'other'
} & ButtonHTMLAttributes<HTMLButtonElement>

type Props = FC<OwnProps>

const Button: Props = ({ children, className, ...otherProps }) => (
    <button className={`button ${className}`} {...otherProps}>
      {children}
    </button>
)
export default Button
