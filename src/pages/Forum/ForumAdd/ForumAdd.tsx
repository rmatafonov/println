import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { RootState } from '@/redux/store/store';
import { useAppDispatch } from '@/redux/store/hooks';
import { addNewTheme } from '@/redux/forumSlice';

import Input from '@/components/Input'
import Button from '@/components/Button'
import TextEditor from '@/components/TextEditor'
import SvgIcon from '@/components/SvgIcon'

import './forumAdd.css'

function ForumAdd() {
  const navigate = useNavigate()
  const [editorText, setEditorText] = useState('')
  const userId = useSelector((state: RootState) => state.user.data?.id);
  const [themeName, setThemeName] = useState('');
  const dispatch = useAppDispatch();

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
    e.preventDefault();
    console.log(userId)
    dispatch(addNewTheme(themeName))
  }

  return (
    <div className="forum-add widget">
      <div className="widget__container container">
        <div className="widget__content widget__content_full">
          <h1 className="forum-add__title text-center">Добавить новую тему</h1>
          <div className="forum-add__back">
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
                <Button>Создать</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForumAdd
