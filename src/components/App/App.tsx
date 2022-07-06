import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from 'pages/Login'
import SignUp from 'pages/SignUp'
import Menu from 'pages/Menu'
import Leaderboard from 'pages/Leaderboard'
import Profile from 'pages/Profile'
// import Forum from 'pages/Forum'
// import ForumTheme from '@/pages/Forum/ForumTheme'
// import ForumAdd from '@/pages/Forum/ForumAdd'
import { GameContainer } from '../GameContainer'
// import { isServer } from '@/utils/isServer'

import './App.css'

export default function App() {
  return (
    <div className="app">
      <div className="background"></div>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/forum" element={<Forum />} />
        <Route path="/forum/:id" element={<ForumTheme />} />
        <Route path="/forum/add" element={<ForumAdd />} /> */}
        <Route path="/game" element={<GameContainer />} />
      </Routes>
    </div>
  )
}
