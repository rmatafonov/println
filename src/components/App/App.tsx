import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from 'pages/Login'
import SignUp from 'pages/SignUp'
import Menu from 'pages/Menu'
import Leaderboard from 'pages/Leaderboard'
import Profile from 'pages/Profile'
import Forum from 'pages/Forum'
import ForumTheme from '@/pages/Forum/ForumTheme'
import ForumAdd from '@/pages/Forum/ForumAdd'

import { GameContainer } from '../GameContainer'

import './App.css'
import withAuthorizedOrLogin from '../hoc/withAuthorizedOrLogin'

export default function App() {
  const AuthorizedMenu = withAuthorizedOrLogin(Menu)
  const AuthorizedLeaderboard = withAuthorizedOrLogin(Leaderboard)
  const AuthorizedProfile = withAuthorizedOrLogin(Profile)
  const AuthorizedForum = withAuthorizedOrLogin(Forum)
  const AuthorizedForumTheme = withAuthorizedOrLogin(ForumTheme)
  const AuthorizedForumAdd = withAuthorizedOrLogin(ForumAdd)
  const AuthorizedGameContainer = withAuthorizedOrLogin(GameContainer)

  return (
    <div className="app">
      <div className="background"></div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/menu" element={<AuthorizedMenu />} />
          <Route path="/leaderboard" element={<AuthorizedLeaderboard />} />
          <Route path="/profile" element={<AuthorizedProfile />} />
          <Route path="/forum" element={<AuthorizedForum />} />
          <Route path="/forum/:id" element={<AuthorizedForumTheme />} />
          <Route path="/forum/add" element={<AuthorizedForumAdd />} />
          <Route path="/game" element={<AuthorizedGameContainer />} />
        </Routes>
      </Router>
    </div>
  )
}
