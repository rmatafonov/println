import React, { FC } from 'react'

import './Alert.css'

type OwnProps = {
  text: string | null
}

type Props = FC<OwnProps>

const Alert: Props = ({ text }) => (
  <div className="alert alert_blue">
    {text}
  </div>
)

export default Alert
