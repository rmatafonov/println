import React, { FC, SyntheticEvent } from 'react'

import './Avatar.css'

type OwnProps = {
  avatar: string | undefined
  onChange: (event: SyntheticEvent) => void
}

type Props = FC<OwnProps>

const Avatar: Props = ({ avatar, onChange }) => (
    <div className="avatar">
      <label htmlFor="avatar__input" className="avatar__label">
        <img
          className="avatar__img"
          src={avatar && `${process.env.RESOURCES}/${avatar}`}
        />
      </label>
      <input
        onChange={onChange}
        type="file"
        accept="image/*"
        id="avatar__input"
        className="avatar__input"
      />
    </div>
)

export default Avatar
