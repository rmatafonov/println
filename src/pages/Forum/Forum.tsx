import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Button from '@/components/Button'
import SvgIcon from '@/components/SvgIcon'

import './forum.css'
import { ForumTheme } from '@/redux/types/forumTypes'
import { forumApi } from '@/api'
import Loader from '@/components/Loader'

function Forum() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [forumThemes, setForumThemes] = useState<Array<ForumTheme>>([])

  useEffect(() => {
    forumApi.getAllThemes().then((resp) => {
      setForumThemes(resp)
      setLoading(false)
    })
  }, [])

  const goToTheme = (id: number) => {
    navigate(`/forum/${id}`)
  }

  const goBack = () => {
    navigate('/menu')
  }

  const goToAddPage = () => {
    navigate('/forum/add')
  }

  // TODO: new component
  const tableRender = (
    <>
      <table className="forum__table forum-table">
        <thead className="forum-table__header">
          <tr>
            <th>Тема</th>
            <th>Комментарии</th>
            <th>Дата создания</th>
          </tr>
        </thead>
        <tbody className="forum-table__body">
          {forumThemes &&
            forumThemes.map(({ title, commentsCount: comments, date, id }) => (
              <tr onClick={() => goToTheme(id)} key={id}>
                <td>{title}</td>
                <td>{comments}</td>
                <td>{date}</td>
              </tr>
            ))}
        </tbody>
      </table>
      {!forumThemes && (
        <div className="forum-table__empty">
          <p>Не найдено ни одной темы</p>
        </div>
      )}
    </>
  )

  return (
    <div className="forum widget">
      <div className="widget__container container">
        <div className="widget__content widget__content_full">
          <h1 className="forum__title text-center">Форум</h1>
          <div className="widget__back">
            <Button onClick={goBack} className="button_simple">
              <SvgIcon name="back-button" color="#fff" size="30px" />
            </Button>
          </div>
          <div className="forum__add">
            <Button onClick={goToAddPage}>Создать новую тему</Button>
          </div>
          {loading ? <Loader></Loader> : tableRender}
        </div>
      </div>
    </div>
  )
}

export default Forum
