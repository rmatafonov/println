import React, { FormEvent, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { RootState } from '@/redux/store/types'

import Button from '@/components/Button'
import SvgIcon from '@/components/SvgIcon'
import ForumComment from '@/components/ForumComment'
// import TextEditor from '@/components/TextEditor'

import './forumTheme.css'
import ForumAddCommentary from '@/components/ForumAddCommentary'
import { isShowingReplyType } from './types'
import { ForumTheme } from '@/redux/types/forumTypes'
import { forumApi } from '@/api'
import Loader from '@/components/Loader'
import { dateUtils } from '@/utils'

function ForumThemeComponent() {
  const navigate = useNavigate()

  const user = useSelector((state: RootState) => state.user.data)

  const params = useParams()
  const id = parseInt(params.id as string, 10)

  const [currentForum, setCurrentForum] = useState<Nullable<ForumTheme>>(null)
  const [isLoading, setLoading] = useState(false)

  const [editorText, setEditorText] = useState('')
  const [editorTextReply, setEditorTextReply] = useState('')
  const [isShowingReply, setIsShowingReply] = useState<isShowingReplyType>({
    isShow: false,
    messageId: null,
  })
  const [isEmptyTriggered, setIsEmptyTriggered] = useState(false)
  const [isEmptyTriggeredReply, setIsEmptyTriggeredReply] = useState(false)

  useEffect(() => {
    setLoading(true)
    forumApi
      .getById(id)
      .then((forumDetails) => {
        setCurrentForum(forumDetails)
        setLoading(false)
      })
      .catch(() => {
        navigate('/page404')
        setLoading(false)
      })
  }, [])

  const setText = useCallback(
    (value: string) => {
      setEditorText(value)
    },
    [editorText]
  )

  const setReplyText = useCallback(
    (value: string) => {
      setEditorTextReply(value)
    },
    [editorTextReply]
  )

  const showReplyForm = useCallback(
    (messageId: number) => {
      setIsShowingReply({
        isShow: true,
        messageId,
      })
    },
    [isShowingReply]
  )

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (user) {
      // TODO: call forumApi.addComment

      // Пока не придумал как по другому
      setIsEmptyTriggered(true)
      setTimeout(() => {
        setIsEmptyTriggered(false)
      })
    } else {
      throw new Error('user не найден')
    }
  }

  const sendReplyMessage = (
    e: FormEvent<HTMLFormElement>,
    messageId: number
  ) => {
    e.preventDefault()
    if (user) {
      // TODO: call forumApi.addCommentAnswer

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
    })
  }

  const goBack = () => {
    navigate('/forum')
  }

  if (isLoading) {
    return <Loader></Loader>
  }

  return (
    <div className="forum-theme widget">
      <div className="widget__container container">
        <div className="widget__content widget__content_full">
          <div className="widget__back">
            <Button onClick={goBack} className="button_simple">
              <SvgIcon name="back-button" color="#fff" size="30px" />
            </Button>
          </div>
          {currentForum && (
            <>
              <h1 className="forum-theme__title text-center">
                {currentForum.title}
              </h1>
              <div className="forum-theme__body">
                <ul className="forum-theme__list">
                  {currentForum.comments?.map((comment, index) => (
                    <li key={comment.id} className="forum-theme__item">
                      <ForumComment
                        time={dateUtils.shortDate(comment.createdAt)}
                        username={`${comment.userId}`}
                        avatar={null}
                        message={comment.text}
                      />
                      {index !== 0 && !isShowingReply.isShow && (
                        <div className="forum-theme__reply">
                          <Button
                            onClick={() => showReplyForm(comment.id)}
                            className="button_simple button_highlight"
                          >
                            Ответить
                          </Button>
                        </div>
                      )}
                      {/* {comment.innerComments && (
                        <>
                          <div className="forum-theme__reply-icon">
                            <SvgIcon name="reply" size="20px" color="#8484f3" />
                          </div>
                          <ul className="forum-theme__inner-list">
                            {comment.innerComments.map((innerComment) => (
                              <li
                                key={innerComment.messageId}
                                className="forum-theme__inner-item"
                              >
                                <ForumComment
                                  time={innerComment.time}
                                  username={innerComment.name}
                                  avatar={innerComment.avatar}
                                  message={innerComment.message}
                                />
                              </li>
                            ))}
                          </ul>
                        </>
                      )} */}
                      {isShowingReply.isShow &&
                        isShowingReply.messageId === comment.id && (
                          <div className="forum-theme__add">
                            <ForumAddCommentary
                              isDisabledButton={!editorTextReply}
                              submit={(e) => sendReplyMessage(e, comment.id)}
                              isEmptyTriggered={isEmptyTriggeredReply}
                              setText={setReplyText}
                            />
                          </div>
                        )}
                    </li>
                  ))}
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
          )}
        </div>
      </div>
    </div>
  )
}

export { ForumThemeComponent }
