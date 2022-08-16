import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'pages/Login'
import SignUp from 'pages/SignUp'
import Menu from 'pages/Menu'
import Leaderboard from 'pages/Leaderboard'
import Profile from 'pages/Profile'
import Forum from 'pages/Forum'
import { ForumThemeComponent } from '@/pages/Forum/ForumTheme'
import ForumAdd from '@/pages/Forum/ForumAdd'

import './App.css'
import withAuthorizedOrLogin from '../hoc/withAuthorizedOrLogin'
import { Game } from '@/pages/Game'
import { ThemeContext } from '../context'
import { AppTheme } from '../context/types'
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks'
import { setUser, userSelector } from '@/redux/userSlice'
import themeApi from '@/api/themeApi'
import { Page404 } from '@/pages/Page404'

export default function App() {
  const enrichedUser = useAppSelector(userSelector)
  const theme = enrichedUser.data?.theme ? enrichedUser.data.theme : AppTheme.dark

  const AuthorizedMenu = withAuthorizedOrLogin(Menu, enrichedUser)
  const AuthorizedLeaderboard = withAuthorizedOrLogin(Leaderboard, enrichedUser)
  const AuthorizedProfile = withAuthorizedOrLogin(Profile, enrichedUser)
  const AuthorizedForum = withAuthorizedOrLogin(Forum, enrichedUser)
  const AuthorizedForumTheme = withAuthorizedOrLogin(ForumThemeComponent, enrichedUser)
  const AuthorizedForumAdd = withAuthorizedOrLogin(ForumAdd, enrichedUser)
  const AuthorizedGameContainer = withAuthorizedOrLogin(Game, enrichedUser)

  const dispatch = useAppDispatch()
  const handleThemeChange = (newTheme: AppTheme) => {
    dispatch(setUser({ user: enrichedUser.data.user, theme: newTheme }))
    themeApi.setTheme(enrichedUser.data.user.id, newTheme)
  }

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
          <Route path="/page404" element={<Page404 />} />
        </Routes>
      </ThemeContext.Provider>
    </div>
  )
}
