import React, { FormEvent, useCallback, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '@/redux/store/store';
import { useAppDispatch } from '@/redux/store/hooks';

import Button from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';
import ForumComment from '@/components/ForumComment';
// import TextEditor from '@/components/TextEditor';

import './forumTheme.css'
import { setInnerComment, setThemeComment } from '@/redux/forumSlice';
import ForumAddCommentary from '@/components/ForumAddCommentary';
import { isShowingReplyType } from './types';

function ForumTheme() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch()
  const id = parseFloat(params.id as string);
  const forums = useSelector((state: RootState) => state.forum.forumInnerThemes.data)
  const user = useSelector((state: RootState) => state.user.data)
  const currentForum = forums?.find((item) => item.id === id)
  const [editorText, setEditorText] = useState('')
  const [editorTextReply, setEditorTextReply] = useState('')
  const [isShowingReply, setIsShowingReply] = useState<isShowingReplyType>({
    isShow: false,
    messageId: null
  })
  const [isEmptyTriggered, setIsEmptyTriggered] = useState(false)
  const [isEmptyTriggeredReply, setIsEmptyTriggeredReply] = useState(false)

  const setText = useCallback((value: string) => {
    setEditorText(value)
  }, [editorText])

  const setReplyText = useCallback((value: string) => {
    setEditorTextReply(value)
  }, [editorTextReply])

  const showReplyForm = useCallback((messageId: string) => {
    setIsShowingReply({
      isShow: true,
      messageId
    })
  }, [isShowingReply])

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

  const sendReplyMessage = (e: FormEvent<HTMLFormElement>, messageId: string) => {
    e.preventDefault();
    if (user) {
      dispatch(setInnerComment({
        forumId: id,
        userId: user.id,
        message: editorTextReply,
        avatar: user.avatar,
        name: user.display_name || user.first_name,
        messageId
      }))
      setIsShowingReply({
        isShow: false,
        messageId,
      })
    } else {
      throw new Error('user не найден')
    }
    setIsEmptyTriggeredReply(true)
    setTimeout(() => {
      setIsEmptyTriggeredReply(false)
    });
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
                      <li key={comment.messageId} className="forum-theme__item">
                        <ForumComment
                          time={comment.time}
                          username={comment.name}
                          avatar={comment.avatar}
                          message={comment.message}
                        />
                        {ndx !== 0 && !isShowingReply.isShow &&
                          <div className="forum-theme__reply">
                            <Button onClick={() => showReplyForm(comment.messageId)} className="button_simple button_highlight">Ответить</Button>
                          </div>
                        }
                        {comment.innerComments &&
                          <>
                            <div className="forum-theme__reply-icon">
                              <SvgIcon
                                name="reply"
                                size="20px"
                                color="#8484f3"
                              />
                            </div>
                            <ul className="forum-theme__inner-list">
                              {comment.innerComments
                                .map((innerComment) => (
                                  <li key={innerComment.messageId} className="forum-theme__inner-item">
                                    <ForumComment
                                      time={innerComment.time}
                                      username={innerComment.name}
                                      avatar={innerComment.avatar}
                                      message={innerComment.message}
                                    />
                                  </li>
                                ))
                              }
                            </ul>
                          </>
                        }
                        {isShowingReply.isShow && isShowingReply.messageId === comment.messageId &&
                          <div className="forum-theme__add">
                            <ForumAddCommentary
                              isDisabledButton={!editorTextReply}
                              submit={(e) => sendReplyMessage(e, comment.messageId)}
                              isEmptyTriggered={isEmptyTriggeredReply}
                              setText={setReplyText}
                            />
                          </div>
                        }
                      </li>
                    ))
                  }
                </ul>
                <div className="forum-theme__add">
                  <ForumAddCommentary
                    isDisabledButton={!editorText}
                    submit={sendMessage}
                    isEmptyTriggered={isEmptyTriggered}
                    setText={setText}
                  />
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
