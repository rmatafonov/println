import React, { FC } from 'react'
import { Props } from './types';

import Button from '@/components/Button';
import TextEditor from '@/components/TextEditor';

import './forumAddCommentary.css'

const ForumAddCommentary: FC<Props> = ({ submit, setText, isEmptyTriggered }) => (
  <div className="add-comment">
    <form onSubmit={submit} className="forum-add-commentary">
      <h3 className="add-comment__title">Добавьте комментарий</h3>
      <div className="add-comment__editor">
        <TextEditor isEmptyTriggered={isEmptyTriggered} setEditorText={setText} />
      </div>
      <div className="add-comment__button">
        <Button>Отправить</Button>
      </div>
    </form>
  </div>
)

export default ForumAddCommentary;
