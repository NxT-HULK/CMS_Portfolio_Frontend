import React, { useContext, useEffect, useState } from 'react'
import Testimonial from './testimonial/Testimonial'
import Contact from './contact/Contact'
import { useNavigate } from 'react-router-dom'
import { ImSpinner4 } from 'react-icons/im'
import DataContext from '../context/data/DataContext'
import { IoMdLogOut } from "react-icons/io";
import Work from './work/Work'
import FunctionContext from '../context/function/FunctionContext'
import { MdEditDocument, MdOutlineSettingsInputComponent } from "react-icons/md";
import { IoCloseOutline } from 'react-icons/io5'
import { FaBookmark, FaFolderPlus, FaRegNewspaper } from 'react-icons/fa'
import AddWork from './work/AddWork'
import NewsLetter from './newsletter/NewsLetter'
import MailNewsletter from './newsletter/MailNewsletter'
import { HiDocumentPlus } from "react-icons/hi2";
import Course from './course/Course'
import CreateCourse from './course/CreateCourse'
import EditCoursePage from './course/EditCoursePage'
import AddCoursePages from './course/AddCoursePages'
import CourseModule from './course/CourseModule'
import AdminContext from '../context/admin/AdminContext'

const CustomLi = ({ text, index, setWorkspace, className }) => {
    return (
        <li>
            <button type="button" className="text-truncate btn-reset" onClick={() => { setWorkspace(index) }}>
                <span className={`text-uppercase fw-semibold text-theam ${className}`}> {text} </span>
            </button>
        </li>
    )
}

const AdminMain = () => {

    const dataContext__variable = useContext(DataContext)
    const { backendHost, getToken } = dataContext__variable

    const functionContext__variable = useContext(FunctionContext)
    const adminContext__variable = useContext(AdminContext)
    let { setaddCourseresetForm } = adminContext__variable

    const [workspace, setWorkspace] = useState(0)
    const navigate = useNavigate("")
    const [tokenStatus, setTokenStatus] = useState(false)

    useEffect(() => {
        const gettingToken = async () => {
            try {
                let response = await getToken()
                if (response === "OK") {
                    navigate('/admin')
                    setTokenStatus(true)
                } else {
                    navigate('/auth')
                }
            } catch (error) {
                navigate('/auth')
                setTokenStatus(false)
            }
        }

        (async () => {
            await gettingToken()
        })()
    }, [getToken, navigate, backendHost, workspace])

    const handleLogoutAdmin = () => {
        localStorage.removeItem('auth-token')
        navigate('/auth')
    }

    const menu = ["Testimonial", "Contact", "Work", "News Letter", "Course"]
    const [menuModal, setmenuModal] = useState(false)

    return (
        <>
            {/* menu modal starts from here */}
            <div className={`${menuModal === true && tokenStatus === true ? 'd-block' : 'd-none'} position-fixed vh-100 w-100`} style={{ background: '#00000090', backdropFilter: 'blur(10px)', zIndex: '10' }}>
                <div className="container d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-7 col-12">
                        <div className="modal-content">
                            <div className="modal-header bg-theam py-1 rounded-top-1 ps-3 pe-2" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                                <span className="modal-title fs-6 text-white text-capitalize" id="informationModal">GENRAL SETTING</span>
                                <button type="button" className="btn-reset" onClick={() => { setmenuModal(false) }}>
                                    <IoCloseOutline className='fs-3 text-white' />
                                </button>
                            </div>
                            <div className="modal-body rounded-bottom-1 bg-white p-3 py-0">

                                <div className="mt-3">
                                    <button type="button" className='btn-reset d-flex align-items-center bg-danger px-2 py-1 rounded-1' onClick={handleLogoutAdmin}>
                                        <IoMdLogOut className='text-white fs-4' />
                                        <span className='text-white'>Logout</span>
                                    </button>
                                </div>

                                <div className='my-4 border-top pt-3'>
                                    <div className='mb-1'>
                                        <span className='fw-semibold'>Page Data</span>
                                    </div>
                                    <ul className='d-flex gap-3 flex-wrap'>
                                        {menu.map((ele, idx) => {
                                            return (
                                                <button key={`admin-popup-menu-${ele}`} className='text-truncate btn-reset bg-theam py-1 px-2 rounded-1' onClick={() => { setmenuModal(!menuModal); setWorkspace(idx) }}>
                                                    <span className={`text-uppercase fw-semibold text-white`}> {ele} </span>
                                                </button>
                                            )
                                        })}
                                    </ul>
                                </div>

                                <div className='my-4 pt-3 border-top'>
                                    <div className='mb-1'>
                                        <span className='fw-semibold'>Course Action</span>
                                    </div>
                                    <div className='d-flex flex-wrap gap-3'>
                                        <button type="button" className='btn-reset bg-theam px-2 py-1 text-white rounded-1' onClick={() => { setmenuModal('false'); setWorkspace('create_course'); setaddCourseresetForm(true) }}>
                                            <FaFolderPlus className='text-white me-1' />
                                            Create Course
                                        </button>
                                        <button type="button" className='btn-reset bg-theam px-2 py-1 text-white rounded-1' onClick={() => { setmenuModal('false'); setWorkspace('add_course_pages') }}>
                                            <HiDocumentPlus className='text-white me-1' />
                                            Add Pages
                                        </button>
                                        <button type="button" className='btn-reset bg-theam px-2 py-1 text-white rounded-1' onClick={() => { setmenuModal('false'); setWorkspace('edit_course_pages') }}>
                                            <MdEditDocument className='text-white me-1' />
                                            Edit Page
                                        </button>
                                    </div>
                                </div>

                                <div className='my-4 pt-3 border-top'>
                                    <div className='mb-1'>
                                        <span className='fw-semibold'>Page Action</span>
                                    </div>
                                    <div className='d-flex gap-3 flex-wrap'>
                                        <button type="button" className='btn-reset bg-theam px-2 py-1 text-white rounded-1' onClick={() => { setmenuModal('false'); setWorkspace('add_work') }}>
                                            <FaBookmark className='text-white me-1' />
                                            Add Work
                                        </button>
                                        <button type="button" className='btn-reset bg-theam px-2 py-1 text-white rounded-1' onClick={() => { setmenuModal('false'); setWorkspace('send_mail') }}>
                                            <FaRegNewspaper className='text-white me-1' />
                                            Send NEWS
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {tokenStatus === true ?
                <>
                    <nav className='w-100 px-3 border-bottom mb-2 position-sticky bg-white top-0 z-1'>
                        <div className="d-lg-flex d-none w-100 justify-content-between align-items-center">
                            <ul className='d-flex flex-wrap gap-3 py-3'>
                                {menu.map((ele, idx) => {
                                    return <CustomLi text={ele} index={idx} setWorkspace={setWorkspace} key={`admin-menu-${ele}`} />
                                })}
                            </ul>

                            <div className='d-flex gap-3'>
                                <button type="button" className='btn-reset d-flex align-items-center bg-danger px-2 py-1 rounded-1' onClick={handleLogoutAdmin}>
                                    <IoMdLogOut className='text-white fs-4' />
                                    <span className='text-white'>Logout</span>
                                </button>
                            </div>
                        </div>

                        <div className="d-lg-none d-block">
                            <div className="d-flex justify-content-between py-2">
                                <span className='text-uppercase fw-semibold text-theam fs-4'>Admin Panel</span>
                                <button type="button" className='simleButton-with-shaded btn-reset width-fit lh-1 px-2 py-1 fs-5' onClick={() => { setmenuModal(true) }} >
                                    <MdOutlineSettingsInputComponent />
                                </button>
                            </div>
                        </div>
                    </nav>

                    <div className="container d-flex align-items-center justify-content-center flex-column mb-5 position-relative overflow-auto px-2" style={{ minHeight: '50vh' }}>
                        {(() => {
                            switch (workspace) {
                                case 0:
                                    return <Testimonial setWorkspace={setWorkspace} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 1:
                                    return <Contact setWorkspace={setWorkspace} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 2:
                                    return <Work setWorkspace={setWorkspace} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 3:
                                    return <NewsLetter setWorkspace={setWorkspace} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 4:
                                    return <Course AdminContext={adminContext__variable} setWorkspace={setWorkspace} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 'send_mail':
                                    return <MailNewsletter DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 'add_work':
                                    return <AddWork DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 'create_course':
                                    return <CreateCourse workspace={workspace} setWorkspace={setWorkspace} AdminContext={adminContext__variable} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 'create_course_module':
                                    return <CourseModule setWorkspace={setWorkspace} AdminContext={adminContext__variable} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 'add_course_pages':
                                    return <AddCoursePages AdminContext={adminContext__variable} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 'edit_course_pages':
                                    return <EditCoursePage setWorkspace={setWorkspace} AdminContext={adminContext__variable} DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                default:
                                    return <span> Menu is not linked with switch statement </span>
                            }
                        })()}
                    </div>
                </>
                :
                <>
                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                        <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                            <ImSpinner4 className='text-theam fs-5' />
                        </div>
                        <span>Verifying Admin</span>
                    </div>
                </>
            }
        </>
    )
}

export default AdminMain