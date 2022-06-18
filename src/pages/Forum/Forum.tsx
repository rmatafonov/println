import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { RootState } from '@/redux/store/store';
import Button from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';

import './forum.css'

function Forum() {
  const userThemes = useSelector((state: RootState) => state.forum.forumThemes.data);
  const navigate = useNavigate();

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
          <div className="forum__back">
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
              {userThemes
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
        </div>
      </div>
    </div>
  )
}

export default Forum;
