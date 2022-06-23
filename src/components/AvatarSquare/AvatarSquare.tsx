import React, { FC } from 'react'

import { enemySvg } from '@/static/images'
import { AvatarType } from './types'

import './avatar.css'

const AvatarSquare: FC<AvatarType> = ({ avatar }) => (
  <div className="avatar-square">
    {!avatar &&
      <img src={enemySvg} className="avatar-square__image avatar-square__default" />
    }
    {avatar &&
      <img src={`${process.env.RESOURCES}/${avatar}`} className="avatar-square__image" />
    }
  </div>
)

export default AvatarSquare
