import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './styles/main.scss'
import Home from './pages/Home'

const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<>About page</>} />
        <Route path='/contact' element={<>contact page</>} />
      </Routes>
    </HashRouter>
  )
}

export default App