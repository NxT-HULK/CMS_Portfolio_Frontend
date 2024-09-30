import React from 'react';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toast } from './components/Utility';
import './styles/main.scss';
import './styles/responsive.scss';
import './styles/scroller.scss';
import './styles/blog-main.scss';
import './styles/learning.scss';

import FunctionState from './context/function/FunctionState';
import DataState from './context/data/DataState';
import AdminState from './context/admin/AdminState';

import BootstrapModal from './components/BootstrapModal';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CommingSoon from './components/CommingSoon';
import Editor from './admin/Editor';

import Home from './pages/Home';
import Work from './pages/Work';
import Course from './pages/Course';
import CourseDetails from './pages/CourseDetails';
import CourseLearning from './pages/CourseLearning';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Unsubscribe from './pages/Unsubscribe.jsx'

import ProjectFeedback from './forms/ProjectFeedback.jsx';
import NewsLetterForm from './forms/NewsLetter.jsx'

import AuthenticateSupperAdmin from './admin/account/AuthenticateSupperAdmin.jsx';
import AccountCreate from './admin/account/AccountCreate.jsx'
import AuthenticateAdmin from './admin/account/AuthenticateAdmin.jsx';
import AdminRoute from './admin/WithAuthAdmin.jsx';
import AdminCourse from './admin/course/Course.jsx'
import AdminNewCourse from './admin/course/CreateCourse.jsx'
import AdminNewModule from './admin/course/CourseModule.jsx'
import AdminNewPages from './admin/course/AddCoursePages.jsx'
import AdminModifyCourse from './admin/course/EditCoursePage.jsx'

import AdminWork from './admin/work/Work.jsx'
import AdminFeedbackManager from './admin/work/FeedbackManagement.jsx'
import AdminNewWork from './admin/work/AddWork.jsx'
import AdminNewsLetter from './admin/newsletter/NewsLetter.jsx'
import AdminMailNews from './admin/newsletter/MailNewsletter.jsx'
import AdminTestimonial from './admin/testimonial/Testimonial.jsx'
import AdminContacts from './admin/contact/Contact.jsx'
import AdminNotify from './admin/notification/Notification.jsx'
import AccountVerify from './pages/AccountVerify.jsx';

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
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Home />} />
              <Route path="/work" element={<Work />} />
              <Route path="/course" element={<Course />} />
              <Route path="/course/details" element={<CourseDetails />} />
              <Route path="/course/learning" element={<CourseLearning />} />
              <Route path="/blogs" element={<CommingSoon />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/unsubscribe" element={<Unsubscribe />} />
              <Route path="/feedback" element={<ProjectFeedback />} />
              <Route path="/subscribe-newsletter" element={<NewsLetterForm />} />
              <Route path="/account">
                <Route index element={<AuthenticateSupperAdmin />} />
                <Route path="create" element={<AccountCreate />} />
                <Route path="verify" element={<AccountVerify />} />
              </Route>
              <Route path="/auth" element={<AuthenticateAdmin />} />
              <Route path='/admin'>
                <Route index element={<Navigate to="/admin/course" />} />
                <Route path='course'>
                  <Route index element={<AdminRoute element={AdminCourse} />} />
                  <Route path='new-course' element={<AdminRoute element={AdminNewCourse} />} />
                  <Route path='new-module' element={<AdminRoute element={AdminNewModule} />} />
                  <Route path='new-pages' element={<AdminRoute element={AdminNewPages} />} />
                  <Route path="edit-details" element={<AdminRoute element={AdminNewCourse} />} />
                  <Route path="edit-content" element={<AdminRoute element={AdminModifyCourse} />} />
                  <Route path='edit-module' element={<AdminRoute element={AdminNewModule} />} />
                  <Route path='edit-page' element={<AdminRoute element={AdminNewPages} />} />
                </Route>
                <Route path="work">
                  <Route index element={<AdminRoute element={AdminWork} />} />
                  <Route path='new-work' element={<AdminRoute element={AdminNewWork} />} />
                  <Route path="feedback" element={<AdminRoute element={AdminFeedbackManager} />} />
                </Route>
                <Route path="news-letter">
                  <Route index element={<AdminRoute element={AdminNewsLetter} />} />
                  <Route path="mail-news" element={<AdminRoute element={AdminMailNews} />} />
                </Route>
                <Route path='testimonial'>
                  <Route index element={<AdminRoute element={AdminTestimonial} />} />
                </Route>
                <Route path='contacts'>
                  <Route index element={<AdminRoute element={AdminContacts} />} />
                </Route>
                <Route path='notify'>
                  <Route index element={<AdminRoute element={AdminNotify} />} />
                </Route>
                <Route path="editor" element={<AdminRoute element={Editor} />} />
              </Route>
            </Routes>
          </AdminState>
          <Footer />
        </DataState>
      </FunctionState>
    </HashRouter>
  );
};

export default App;
