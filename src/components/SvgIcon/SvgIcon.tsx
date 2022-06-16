import React, { FC } from 'react'
import { Props } from './types'
import sprite from '../../../static/icons/sprite.svg'

const SvgIcon: FC<Props> = ({ name, color, size }) => (
  <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
    <use xlinkHref={`${sprite}#${name}`} />
  </svg>
);

export default SvgIcon;
