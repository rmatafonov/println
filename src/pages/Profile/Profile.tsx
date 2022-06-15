/* eslint-disable no-restricted-syntax */
import React, {
  useState, useEffect, SyntheticEvent, FormEvent
} from 'react'
import { useNavigate } from 'react-router-dom'

import Button from 'components/Button'
import Avatar from 'components/Avatar'
import Loader from 'components/Loader'
import Field from 'components/Field'
import { ChangeUserResponse } from '@/api/types'
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks'
import { userSelector, pushAvatar, updateUser } from '@/redux/userSlice'

import 'styles/widget.css'
import './profile.css'
import { FieldProps } from '@/components/Field/Field'

function Profile() {
  const dispatcher = useAppDispatch()
  const { data, loading } = useAppSelector(userSelector)
  const [fields, setFields] = useState<FieldProps[]>([])
  const [edit, setEdit] = useState(false)
  useEffect(() => {
    if (data) {
      setFields([
        {
          label: 'Имя',
          defaultValue: data.first_name,
          id: 'field__name',
          readOnly: true,
          name: 'first_name',
        },
        {
          label: 'Фамилия',
          defaultValue: data.second_name,
          id: 'field__lastname',
          readOnly: false,
          name: 'second_name',
        },
        {
          label: 'Логин',
          defaultValue: data.login,
          id: 'field__login',
          readOnly: false,
          name: 'login',
        },
        {
          label: 'Почта',
          defaultValue: data.email,
          id: 'field__email',
          readOnly: false,
          name: 'email',
        },
        {
          label: 'Телефон',
          defaultValue: data.phone,
          id: 'field__phone',
          readOnly: false,
          name: 'phone',
        },
      ])
    }
  }, [data])
  const navigate = useNavigate()

  const back = () => {
    navigate('/menu')
  }

  const editHandler = () => {
    const updatedFields = fields.map((field) => ({
      ...field,
      readOnly: !field.readOnly,
    }))
    setFields([...updatedFields])
    setEdit(!edit)
  }

  const saveHandler = (event: FormEvent) => {
    event.preventDefault()
    const target = event.target as HTMLFormElement
    const formData = new FormData(target)
    let newData = {
      display_name: data?.first_name,
    } as ChangeUserResponse

    for (const [key, value] of formData.entries()) {
      newData = {
        ...newData,
        [key]: value,
      }
    }
    dispatcher(updateUser(newData))
    editHandler()
  }

  const changeAvatarHandler = (event: SyntheticEvent) => {
    const { files }: { files: FileList | null } =
      event.target as HTMLInputElement
    if (!files?.length) {
      return
    }
    const file = files[0]
    const formData = new FormData()
    formData.append('avatar', file)
    dispatcher(pushAvatar(formData))
  }

  return (
    <div className="profile widget">
      <div className="widget__container container">
        <div className="profile__content widget__content">
          {loading ? (
            <Loader />
          ) : (
            <Avatar avatar={data?.avatar} onChange={changeAvatarHandler} />
          )}
          <form onSubmit={saveHandler} className="form">
            <ul className="profile__fields">
              {fields.map((field) => (
                <li className="profile__field profile-field" key={field.id}>
                  {/* <div className="profile-field__name">{field.name}</div>
                <div className="profile-field__value">{field.value}</div> */}
                  <Field {...field} />
                </li>
              ))}
            </ul>
            <div className="profile__button">
              {edit && <Button type="submit">Сохранить</Button>}
            </div>
          </form>
          <ul className="profile__buttons">
            <li className="profile__button">
              <Button
                className="button_simple"
                isHidden={edit}
                onClick={editHandler}
              >
                Редактировать
              </Button>
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
