import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { IcoBtn } from './Utility'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import { SiGmail } from 'react-icons/si'
import { facebook, insta, linkedin } from '../enviroments'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg mainNav position-sticky top-0 w-100 z-1">
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/">Shivam Kashyap</Link>

                    <button className="btn-reset navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#mainNavOffCanvas" aria-controls="mainNavOffCanvas">
                        <svg xmlns="http://www.w3.org/2000/svg" height="1.4em" viewBox="0 0 512 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM64 256c0-17.7 14.3-32 32-32H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" /></svg>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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

            <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex="-1" id="mainNavOffCanvas" aria-labelledby="mainNavOffCanvasLabel" >
                <div className="offcanvas-header border-bottom ">
                    <Link to="/" className="offcanvas-title text-decoration-none fs-4 fw-bold text-dark" id="mainNavOffCanvasLabel">
                        Shivam Kashyap
                    </Link>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
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
                        <span className='fw-bold fs-5 d-block mb-2'>Meet me on Social</span>
                        <ul className='p-0 m-0 d-flex gap-3'>
                            <li><IcoBtn link={'mailto:shivamkumarkashyap12@gmail.com'} icon={<SiGmail />} /></li>
                            <li><IcoBtn link={linkedin} icon={<FaLinkedinIn />} /></li>
                            <li><IcoBtn link={insta} icon={<FaInstagram />} /></li>
                            <li><IcoBtn link={facebook} icon={<FaFacebookF />} /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar