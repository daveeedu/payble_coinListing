import React from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom"
import LogIn from './pages/auth/logIn/Index'
import CoinList from './pages/coinList/Index'

function App() {

  return (
    <>
       <Routes>
        <Route path="/" element={ <LogIn/> } />
        <Route path="coinList" element={ <CoinList/> } />
      </Routes>
    </>
  )
}

export default App
