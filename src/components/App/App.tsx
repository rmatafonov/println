import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'pages/Login'
import SignUp from 'pages/SignUp'
import Menu from 'pages/Menu'
import Leaderboard from 'pages/Leaderboard'
import Profile from 'pages/Profile'
import Forum from 'pages/Forum'
import ForumTheme from '@/pages/Forum/ForumTheme'
import ForumAdd from '@/pages/Forum/ForumAdd'

import './App.css'
import withAuthorizedOrLogin from '../hoc/withAuthorizedOrLogin'
import { Game } from '@/pages/Game'
import { ThemeContext } from '../context'
import { AppTheme } from '../context/types'
import { useAppSelector } from '@/redux/store/hooks'
import { userSelector } from '@/redux/userSlice'

export default function App() {
  const user = useAppSelector(userSelector)
  const theme = user.data?.theme ? user.data.theme : AppTheme.dark
  console.log('App - user', user)

  const AuthorizedMenu = withAuthorizedOrLogin(Menu, user)
  const AuthorizedLeaderboard = withAuthorizedOrLogin(Leaderboard, user)
  const AuthorizedProfile = withAuthorizedOrLogin(Profile, user)
  const AuthorizedForum = withAuthorizedOrLogin(Forum, user)
  const AuthorizedForumTheme = withAuthorizedOrLogin(ForumTheme, user)
  const AuthorizedForumAdd = withAuthorizedOrLogin(ForumAdd, user)
  const AuthorizedGameContainer = withAuthorizedOrLogin(Game, user)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const handleThemeChange = (newTheme: AppTheme) => {}

  return (
    <div className={`app theme_${theme}`}>
      <div className="background"></div>
      <ThemeContext.Provider value={{ theme, changeTheme: handleThemeChange }}>
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
      </ThemeContext.Provider>
    </div>
  )
}
