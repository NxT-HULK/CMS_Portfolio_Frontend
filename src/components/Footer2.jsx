import React, { useContext } from 'react'
import { IcoBtn } from './Utility'
import { FaArrowRightLong, FaLinkedinIn } from 'react-icons/fa6'
import { FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'
import DataContext from '../context/data/DataContext'

const CustomList = ({ link, text }) => {
    return (
        <>
            <li className='custom-footer-links'>
                <Link to={link} className={`text-white d-flex align-items-center gap-2 text-decoration-none`}>
                    <FaArrowRightLong />
                    <span>{text}</span>
                </Link>
            </li>
        </>
    )
}

const Footer = () => {

    const { socialLinks } = useContext(DataContext)
    const { facebook, github, insta, linkedin } = socialLinks

    const router = useLocation()

    return (
        <>
            {
                router.pathname !== "/auth" &&
                <div className={`bg-dark w-100`}>
                    <div className="container pb-3 pt-5">
                        <div className='d-flex flex-wrap justify-content-md-between justify-content-center gap-md-0 gap-5'>
                            <div className='d-flex flex-column gap-2 col-md-4 col-12'>
                                <div className={`width-fit user-select-none`}>
                                    <span className="text-white d-block fw-medium fs-5 d-block">
                                        Quick Links
                                    </span>
                                </div>

                                <div className="mt-2">
                                    <ul className='p-0 m-0 d-flex flex-column gap-1'>
                                        <CustomList link={'/'} text={'Portfolio'} />
                                        <CustomList link={'/work'} text={'Work'} />
                                        <CustomList link={'/course'} text={'Course'} />
                                        <CustomList link={'/blogs'} text={'Blogs'} />
                                        <CustomList link={'/contact'} text={'Contact'} />
                                    </ul>
                                </div>
                            </div>

                            <div className='d-flex flex-column gap-2 col-md-4 col-12 align-items-center'>
                                

                                

                                <div className={`width-fit user-select-none`}>
                                    <span className="text-white d-block fw-medium fs-5 d-block">
                                        Meet me on Social
                                    </span>
                                </div>

                                <div className="mt-2">
                                    <ul className='p-0 m-0 d-flex gap-3'>
                                        <li><IcoBtn link={github} icon={<FaGithub />} /></li>
                                        <li><IcoBtn link={linkedin} icon={<FaLinkedinIn />} /></li>
                                        <li><IcoBtn link={facebook} icon={<FaFacebookF />} /></li>
                                        <li><IcoBtn link={insta} icon={<FaInstagram />} /></li>
                                    </ul>
                                </div>
                            </div>

                            <div className='d-flex flex-column gap-2 d-flex flex-column align-items-md-end col-md-4 col-12'>
                                <div className='text-center mb-1'>
                                    <span className="fs-2 fw-semibold lh-1 text-white d-block"> Subscribe Now</span>
                                    <span className='lh-1 text-white'>To Get Latest Updates</span>
                                </div>

                                <div>
                                    <form className={`d-flex align-items-center justify-content-center flex-column`}>
                                        <input type="email" className='custom-input-style bg-white rounded-pill px-4' name="newsletter_email" id="newsLetterEmail" placeholder='youremail@domain.com' />
                                        <button className='mt-2 bg-theam text-white border-0 text-uppercase px-3 py-1 rounded-pill' type="submit">Subscribe</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-theam py-3 px-md-4 px-3">
                        <p className="text-center fw-semibold text-white m-0">
                            © Copyright {new Date().getFullYear()} Shivam Kashyap. All Rights Reserved
                        </p>
                    </div>
                </div>
            }
        </>
    )
}

export default Footer