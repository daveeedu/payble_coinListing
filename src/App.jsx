import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import LogIn from './pages/auth/logIn/Index'
import ResetPassword from './pages/auth/resetPassword/Index'
import CoinList from './pages/coinList/Index'
import { Provider } from 'react-redux';

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={ <LogIn/> } />
        <Route path="about" element={ <ResetPassword/> } />
        <Route path="coinList" element={ <CoinList/> } />
      </Routes>
    </>
  )
}

export default App
