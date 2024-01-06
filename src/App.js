import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BootstrapModal from './components/BootstrapModal'
import Footer from './components/Footer'
import './styles/main.scss'
import './styles/responsive.scss'
import './styles/scroller.scss'
import './styles/blog-main.scss'
import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import FunctionState from './context/function/FunctionState'
import DataState from './context/data/DataState'
import BlogDetails from './pages/BlogDetails'
import Work from './pages/Work'

const App = () => {
  return (
    <HashRouter>
      <FunctionState>
        <DataState>
          <Navbar />
          <BootstrapModal />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/work' element={<Work />} />
            <Route path='/course' element={<>Course page</>} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/blogs/:id' element={<BlogDetails />} />
            <Route path='/contact' element={<Contact />} />
          </Routes>
          <Footer />
        </DataState>
      </FunctionState>
    </HashRouter>
  )
}

export default App