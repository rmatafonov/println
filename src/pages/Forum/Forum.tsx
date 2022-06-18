import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import { RootState } from '@/redux/store/store';
import { setCommentsCount } from '@/redux/forumSlice';
import { useAppDispatch } from '@/redux/store/hooks';

import Button from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';

import './forum.css'

function Forum() {
  const forumThemes = useSelector((state: RootState) => state.forum.forumThemes.data);
  const navigate = useNavigate();
  const forums = useSelector((state: RootState) => state.forum.forumInnerThemes.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (forumThemes && forums) {
      forumThemes.forEach((theme) => {
        const currentForum = forums.find((forum) => forum.id === theme.id);
        const commentsCount = currentForum!.content.reduce((acc, message) => {
          if (message.innerComments) {
            return acc + 1 + message.innerComments.length
          }
          return acc + 1
        }, 0)
        dispatch(setCommentsCount({ id: theme.id, count: commentsCount }))
      })
    }
  }, [forums])

  const goToTheme = (id: number) => {
    navigate(`/forum/${id}`)
  }

  const goBack = () => {
    navigate('/menu')
  }

  const goToAddPage = () => {
    navigate('/forum/add')
  }

  return (
    <div className="forum widget">
      <div className="widget__container container">
        <div className="widget__content widget__content_full">
          <h1 className="forum__title text-center">Форум</h1>
          <div className="widget__back">
            <Button onClick={goBack} className="button_simple">
              <SvgIcon
                name="back-button"
                color="#fff"
                size="30px"
              />
            </Button>
          </div>
          <div className="forum__add">
            <Button onClick={goToAddPage}>
              Создать новую тему
            </Button>
          </div>
          <table className="forum__table forum-table">
            <thead className="forum-table__header">
              <tr>
                <th>Тема</th>
                <th>Комментарии</th>
                <th>Дата создания</th>
              </tr>
            </thead>
            <tbody className="forum-table__body">
              {forumThemes && forumThemes
                .map(({
                  title, comments, date, id
                }) => (
                  <tr onClick={() => goToTheme(id)} key={id}>
                    <td>{title}</td>
                    <td>{comments}</td>
                    <td>{date}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          {!forumThemes &&
            <div className="forum-table__empty">
              <p>Не найдено ни одной темы</p>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Forum;
