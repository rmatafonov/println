import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Login from 'pages/Login';
import SignUp from 'pages/SignUp'
import Menu from 'pages/Menu'
import Leaderboard from 'pages/Leaderboard';
import Profile from 'pages/Profile';

export default function App() {
  return (
    <div className="app">
      <div className="background">
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}
