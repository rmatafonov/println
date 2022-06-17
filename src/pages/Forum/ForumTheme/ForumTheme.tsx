import React from 'react'
import { useParams } from 'react-router-dom';

function ForumTheme() {
  const { id } = useParams();
  return (
    <div className="forum-theme">
      {id}
    </div>
  )
}

export default ForumTheme;
