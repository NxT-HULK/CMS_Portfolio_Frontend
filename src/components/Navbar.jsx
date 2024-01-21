import React, { useContext, useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IcoBtn } from './Utility'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaRegBell } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import FunctionContext from '../context/function/FunctionContext'
import DataContext from '../context/data/DataContext'
import { GoGear } from "react-icons/go";

const Navbar = () => {

    const { darkTheamFlag, navBackdropFlag } = useContext(FunctionContext)
    const { socialLinks, setToastModalData } = useContext(DataContext)

    const { facebook, insta, linkedin, mail } = socialLinks

    const navAddon = {
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
    }

    const [workPresentation, setWorkPresentation] = useState(false)
    useEffect(() => {
        if (navBackdropFlag === true) {
            if (workPresentation === true) {
                setToastModalData({
                    multipliedBy: 20,
                    time: 5,
                    message: 'Presenting learning projects compled by me'
                })
            } else {
                setToastModalData({
                    multipliedBy: 20,
                    time: 5,
                    message: 'Presenting professional projects compled by me'
                })
            }
        }
    }, [workPresentation, navBackdropFlag, setToastModalData])

    const router = useLocation()
    const noNav = ['/admin', '/auth']

    return (
        <>
            {noNav.indexOf(router.pathname) < 0 &&
                <>
                    {navBackdropFlag === false ?
                        <nav className={`navbar navbar-expand-lg ${darkTheamFlag === true ? 'position-fixed' : 'position-sticky'} top-0 w-100 z-3`} style={navAddon}>
                            <div className="container-fluid">
                                <Link className={`navbar-brand fw-bold ${darkTheamFlag === true ? 'text-white' : 'text-theam'}`} to="/">Shivam Kashyap</Link>

                                <button className={`btn-reset navbar-toggler ${darkTheamFlag === true ? 'text-white' : 'text-dark'} `} type="button" data-bs-toggle="offcanvas" data-bs-target="#mainNavOffCanvas" aria-controls="mainNavOffCanvas">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 ${darkTheamFlag === true ? 'text-white' : 'text-dark'}`}>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" aria-current="page" to="/">Portfolio</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/work">Work</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/course">Course</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </nav>
                        :
                        <nav className={`navbar navbar-expand-lg position-fixed top-0 w-100 z-3 bg-white`} style={navAddon}>
                            <div className="container-fluid">
                                <Link className={`navbar-brand fw-bold fs-4 text-theam`} to="/">Shivam Kashyap</Link>

                                <button className={`btn-reset navbar-toggler text-theam`} type="button" data-bs-toggle="offcanvas" data-bs-target="#mainNavOffCanvas" aria-controls="mainNavOffCanvas">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512" style={{ fill: '#6a59d1' }}>
                                        <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                                    </svg>
                                </button>

                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className={`navbar-nav mb-2 mb-lg-0 ms-auto me-5 text-theam`}>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/work">Work</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/course">Course</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/contact">Contact</NavLink>
                                        </li>
                                    </ul>

                                    <ul className={`navbar-nav ms-auto mb-2 mb-lg-0 gap-3 d-flex align-items-center`}>
                                        <li className="nav-item">
                                            <button type="button" className="btn-reset p-0 m-0 lh-1 text-theam" data-bs-toggle="modal" data-bs-target="#subscribeNewsLetter">
                                                <FaRegBell className='fs-4' />
                                            </button>
                                        </li>
                                        <li className="nav-item">
                                            <button className="btn-reset bg-theam p-1 rounded-1 d-flex align-items-center justify-content-center text-white" type="button" onClick={() => { setWorkPresentation(!workPresentation) }}>
                                                <GoGear className='fs-6 spinner-border border-0' style={{ '--bs-spinner-animation-speed': '3s' }} />
                                            </button>
                                        </li>
                                    </ul>
                                </div>

                            </div>
                        </nav>
                    }

                    <div className={`offcanvas offcanvas-start ${darkTheamFlag === true ? 'bg-dark' : 'bg-light'}`} data-bs-scroll="true" tabIndex="-1" id="mainNavOffCanvas" aria-labelledby="mainNavOffCanvasLabel" >
                        <div className="offcanvas-header border-bottom">
                            <Link to="/" className={`offcanvas-title text-decoration-none fs-4 fw-bold ${darkTheamFlag === true ? 'text-light' : 'text-dark'}`} id="mainNavOffCanvasLabel">
                                Shivam Kashyap
                            </Link>
                            <button type="button" className={`btn-reset ${darkTheamFlag === true ? 'text-white' : 'text-dark'}`} data-bs-dismiss="offcanvas" aria-label="Close">
                                <svg xmlns="http://www.w3.org/2000/svg" height="30" width="20" viewBox="0 0 384 512"><path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" /></svg>
                            </button>
                        </div>
                        <div className="offcanvas-body">
                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0" data-bs-dismiss="offcanvas">
                                <li className="nav-item border my-2 py-0 px-2 rounded bg-body-tertiary">
                                    <NavLink className="nav-link fw-medium " aria-current="page" to="/">Portfolio</NavLink>
                                </li>
                                <li className="nav-item border my-2 py-0 px-2 rounded bg-body-tertiary">
                                    <NavLink className="nav-link fw-medium " to="/work">Work</NavLink>
                                </li>
                                <li className="nav-item border my-2 py-0 px-2 rounded bg-body-tertiary">
                                    <NavLink className="nav-link fw-medium " to="/course">Courses</NavLink>
                                </li>
                                <li className="nav-item border my-2 py-0 px-2 rounded bg-body-tertiary">
                                    <NavLink className="nav-link fw-medium " to="/blogs">Blogs</NavLink>
                                </li>
                                <li className="nav-item border my-2 py-0 px-2 rounded bg-body-tertiary">
                                    <NavLink className="nav-link fw-medium " to="/contact">Contact</NavLink>
                                </li>
                            </ul>

                            {/* social iconaddon */}
                            <div className='mt-4'>
                                <span className={`fw-bold fs-5 d-block mb-2 ${darkTheamFlag === true ? 'text-white' : 'text-dark'}`}>Meet me on Social</span>
                                <ul className='p-0 m-0 d-flex gap-3'>
                                    <li><IcoBtn link={mail} icon={<SiGmail />} /></li>
                                    <li><IcoBtn link={linkedin} icon={<FaLinkedinIn />} /></li>
                                    <li><IcoBtn link={insta} icon={<FaInstagram />} /></li>
                                    <li><IcoBtn link={facebook} icon={<FaFacebookF />} /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default Navbar
