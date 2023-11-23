import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import './styles/main.scss'
import Home from './pages/Home'
import './styles/responsive.scss'
import './styles/scroller.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/work' element={<>Work page</>} />
        <Route path='/course' element={<>Course page</>} />
        <Route path='/blogs' element={<>Blogs page</>} />
        <Route path='/contact' element={<>contact page</>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App