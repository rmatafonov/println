import React, { FC } from 'react'
import sanitizeHtml from 'sanitize-html'
import AvatarSquare from '@/components/AvatarSquare'

import { Props } from './types'

import './forumComment.css'

const ForumComment: FC<Props> = ({
  username, avatar, message, time
}) => {
  const cleanMessage = { __html: sanitizeHtml(message) }
  return (
    <div className="forum-comment">
      <div className="forum-comment__user forum-user">
        <div className="forum-user__avatar">
          <AvatarSquare avatar={avatar} />
        </div>
        <div className="forum-user__info">
          <h3 className="forum-user__name">
            {username}
          </h3>
          <div className="forum-user__time">
            <time>{time}</time>
          </div>
        </div>
      </div>
      <div className="forum-comment__messages" dangerouslySetInnerHTML={cleanMessage}>
      </div>
    </div>
  )
}

export default ForumComment
