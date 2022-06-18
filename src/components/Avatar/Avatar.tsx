import React, { FC } from 'react'

import { enemySvg } from '@/static/images'
import { AvatarType } from './types'

import './avatar.css'

const Avatar: FC<AvatarType> = ({ avatar }) => (
  <div className="avatar">
    {!avatar &&
      <img src={enemySvg} className="avatar__image avatar__default" />
    }
    {avatar &&
      <img src={`${process.env.RESOURCES}/${avatar}`} className="avatar__image" />
    }
  </div>
)

export default Avatar
