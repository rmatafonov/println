import React from 'react'
import Button from '@/components/Button'
import Input from '@/components/Input'
import TextEditor from '@/components/TextEditor'

function ForumAdd() {
  return (
    <div className="forum-add widget">
      <div className="widget__container container">
        <div className="widget__content">
          <h1 className="forum-add__title">Добавить новую тему</h1>
          <div className="forum-add__body">
            <form className="forum-add__form">
              <div className="forum-add__input">
                <Input placeholder="Название темы" />
              </div>
              <div className="forum-add__input">
                <TextEditor />
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
