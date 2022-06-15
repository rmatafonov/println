import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

import './forum.css'

function Forum() {
  const userThemes = useSelector((state: RootState) => state.forum.forumThemes.data);
  console.log(userThemes)

  return (
    <div className="forum widget">
      <div className="widget__container container">
        <div className="widget__content forum__content">
          <h1 className="forum__title text-center">Форум</h1>
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
                  <tr key={id}>
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
