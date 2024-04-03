import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import BootstrapModal from './components/BootstrapModal'
// import Footer from './components/Footer'
import './styles/main.scss'
import './styles/responsive.scss'
import './styles/scroller.scss'
import './styles/blog-main.scss'
import './styles/learning.scss'
// import Blogs from './pages/Blogs'
import Contact from './pages/Contact'
import FunctionState from './context/function/FunctionState'
import DataState from './context/data/DataState'
// import BlogDetails from './pages/BlogDetails'
import Work from './pages/Work'
import { Toast } from './components/Utility'
import Course from './pages/Course'

import AdminHome from './admin/AdminHome'
import AuthenticateAdmin from './pages/AuthenticateAdmin'
import Footer2 from './components/Footer2'
import NotFound from './pages/NotFound'
import CommingSoon from './components/CommingSoon'
import CourseDetails from './pages/CourseDetails'
import CourseLearning from './pages/CourseLearning'
import AdminState from './context/admin/AdminState'

const App = () => {
  return (
    <HashRouter>
      <FunctionState>
        <DataState>
          <Navbar />
          <BootstrapModal />
          <Toast />
          <AdminState>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/work' element={<Work />} />
              <Route path='/course' element={<Course />} />
              <Route path='/course/details/:course_id' element={<CourseDetails />} />
              <Route path='/course/learning/:course_id' element={<CourseLearning />} />
              <Route path='/blogs' element={<CommingSoon />} />
              {/* <Route path='/blogs/:id' element={<BlogDetails />} /> */}
              <Route path='/contact' element={<Contact />} />
              <Route path="/auth" element={<AuthenticateAdmin />} />
              <Route path="/admin" element={<AdminHome />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AdminState>
          <Footer2 />
        </DataState>
      </FunctionState>
    </HashRouter>
  )
}

export default App