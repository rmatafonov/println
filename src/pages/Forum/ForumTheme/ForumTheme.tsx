import React, { FormEvent, useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '@/redux/store/store';
import { useAppDispatch } from '@/redux/store/hooks';

import Button from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';
import ForumComment from '@/components/ForumComment';
import TextEditor from '@/components/TextEditor';

import './forumTheme.css'
import { setThemeComment } from '@/redux/forumSlice';

function ForumTheme() {
  const params = useParams();
  const navigate = useNavigate();
  const id = parseFloat(params.id as string);
  const forums = useSelector((state: RootState) => state.forum.forumInnerThemes.data)
  const user = useSelector((state: RootState) => state.user.data)
  const currentForum = forums?.find((item) => item.id === id)
  const [editorText, setEditorText] = useState('')
  const dispatch = useAppDispatch()
  const [isEmptyTriggered, setIsEmptyTriggered] = useState(false)

  const setText = useCallback((value: string) => {
    setEditorText(value)
  }, [editorText])

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      dispatch(setThemeComment({
        id,
        userId: user.id,
        message: editorText,
        avatar: user.avatar,
        name: user.display_name || user.first_name,
      }))
      // Пока не придумал как по другому
      setIsEmptyTriggered(true)
      setTimeout(() => {
        setIsEmptyTriggered(false)
      });
    } else {
      throw new Error('user не найден')
    }
  }

  const goBack = () => {
    navigate('/forum')
  }
  return (
    <div className="forum-theme widget">
      <div className="widget__container container">
        <div className="widget__content widget__content_full">
          <div className="widget__back">
            <Button onClick={goBack} className="button_simple">
              <SvgIcon
                name="back-button"
                color="#fff"
                size="30px"
              />
            </Button>
          </div>
          {currentForum &&
            <>
              <h1 className="forum-theme__title text-center">{currentForum.name}</h1>
              <div className="forum-theme__body">
                <ul className="forum-theme__list">
                  {currentForum.content
                    .map((comment, ndx) => (
                      <li key={ndx} className="forum-theme__item">
                        <ForumComment
                          time={comment.time}
                          username={comment.name}
                          avatar={comment.avatar}
                          message={comment.message}
                        />
                      </li>
                    ))
                  }
                </ul>
                <div className="forum-theme__add add-comment">
                  <form onSubmit={sendMessage} className="add-comment__form">
                    <h3 className="add-comment__title">Добавьте комментарий</h3>
                    <div className="add-comment__editor">
                      <TextEditor isEmptyTriggered={isEmptyTriggered} setEditorText={setText} />
                    </div>
                    <div className="add-comment__button">
                      <Button>Отправить</Button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default ForumTheme;
