import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store/types'

import Input from '@/components/Input'
import Button from '@/components/Button'
import TextEditor from '@/components/TextEditor'
import SvgIcon from '@/components/SvgIcon'

import './forumAdd.css'
import { forumApi } from '@/api'

function ForumAdd() {
  const navigate = useNavigate()
  const [editorText, setEditorText] = useState('')
  const userInfo = useSelector((state: RootState) => state.user.data)
  const [themeName, setThemeName] = useState('')

  const goBack = () => {
    navigate('/forum')
  }

  const changeEditorText = useCallback((value: string) => {
    setEditorText(value)
  }, [editorText])

  const setName = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setThemeName(e.target.value)
  }, [themeName])

  const createTheme = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (userInfo) {
      forumApi.addTheme(userInfo.user.id, themeName, editorText)
      navigate('/forum')
    } else {
      throw new Error('Что то пошло не по плану')
    }
  }

  return (
    <div className="forum-add widget">
      <div className="widget__container container">
        <div className="widget__content widget__content_full">
          <h1 className="forum-add__title text-center">Добавить новую тему</h1>
          <div className="widget__back">
            <Button onClick={goBack} className="button_simple">
              <SvgIcon
                name="back-button"
                color="#fff"
                size="30px"
              />
            </Button>
          </div>
          <div className="forum-add__body">
            <form onSubmit={createTheme} className="forum-add__form">
              <div className="forum-add__input">
                <Input onChange={(e) => setName(e)} placeholder="Название темы" />
              </div>
              <div className="forum-add__editor">
                <TextEditor setEditorText={changeEditorText} />
              </div>
              <div className="forum-add__button">
                <Button isDisabled={!editorText && !themeName}>Создать</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForumAdd
