import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BootstrapModal from './components/BootstrapModal'
import Footer from './components/Footer'
import './styles/main.scss'
import './styles/responsive.scss'
import './styles/scroller.scss'
import './styles/blog-main.scss'
import Blogs from './pages/Blogs'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <BootstrapModal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/work' element={<>Work page</>} />
        <Route path='/course' element={<>Course page</>} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/contact' element={<>contact page</>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App