import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import { useAppSelector } from '@/redux/store/hooks'
import { userSelector } from '@/redux/userSlice'

import { ProfileFields } from './types'

import 'styles/widget.css'
import './profile.css'

function Profile() {
  const user = useAppSelector(userSelector)
  const [fields, setFields] = useState<ProfileFields[]>([])
  useEffect(() => {
    if (user) {
      setFields([
        {
          name: 'Имя',
          value: user.first_name,
          id: 0,
        },
        {
          name: 'Фамилия',
          value: user.second_name,
          id: 1,
        },
        {
          name: 'Логин',
          value: user.login,
          id: 2,
        },
      ])
    }
  }, [user])
  const navigate = useNavigate()

  const back = () => {
    navigate('/menu')
  }

  return (
    <div className="profile widget">
      <div className="widget__container container">
        <div className="profile__content widget__content">
          <div className="profile__avatar">
            <img src={`${process.env.RESOURCES}/${user?.avatar}`} />
          </div>
          <ul className="profile__fields">
            {fields.map((field) => (
              <li className="profile__field profile-field" key={field.id}>
                <div className="profile-field__name">{field.name}</div>
                <div className="profile-field__value">{field.value}</div>
              </li>
            ))}
          </ul>
          <ul className="profile__buttons">
            <li className="profile__button">
              <Button className="button_simple">Редактировать</Button>
            </li>
            <li className="profile__button">
              <Button onClick={back} className="button_simple">
                Назад
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Profile
