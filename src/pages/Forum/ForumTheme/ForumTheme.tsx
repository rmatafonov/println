import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { RootState } from '@/redux/store/store';

import Button from '@/components/Button';
import SvgIcon from '@/components/SvgIcon';
import ForumComment from '@/components/ForumComment';

import './forumTheme.css'

function ForumTheme() {
  const params = useParams();
  const navigate = useNavigate();
  const id = parseFloat(params.id as string);
  const forums = useSelector((state: RootState) => state.forum.forumInnerThemes.data)
  const currentForum = forums?.find((item) => item.id === id)

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
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default ForumTheme;
