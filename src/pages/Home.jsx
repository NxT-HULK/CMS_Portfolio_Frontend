import React from 'react'
import { BtnBig, IcoBtn, ShadowText } from '../components/Utility'
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaDownload } from 'react-icons/fa'
import { BsMouseFill } from 'react-icons/bs'
import { TbBrandMailgun } from 'react-icons/tb'
import { linkedin, insta, facebook } from '../enviroments'
import Typewriter from 'typewriter-effect';

const Home = () => {

    return (
        <>
            <section className='vh-100'>
                <div className="h-100 d-flex flex-column justify-content-center pt-xxl-0 pt-md-0 pt-sm-5 pt-5">
                    <div className="container d-flex align-items-center flex-xxl-row flex-md-row flex-sm-column-reverse flex-column-reverse gap-xxl-0 gap-md-0 gap-sm-5 gap-5">
                        <div className='mt-3 col-2 p-3 d-flex align-items-center justify-content-start d-xxl-block d-md-block d-sm-none d-none'>
                            <ul className='p-0 m-0 d-flex flex-column gap-3'>
                                <li><IcoBtn link={linkedin} icon={<FaLinkedinIn />} /></li>
                                <li><IcoBtn link={facebook} icon={<FaFacebookF />} /></li>
                                <li><IcoBtn link={insta} icon={<FaInstagram />} /></li>
                            </ul>
                        </div>

                        <div className='col-xxl-6 col-md-6 col-sm-12 col-12'>
                            <span className='fw-bold fs-1 line-height-1'>
                                Hi, I'm
                                <Typewriter
                                    options={{
                                        strings: ['Shivam Kashyap', 'Developer', 'YouTuber'],
                                        autoStart: true,
                                        loop: true,
                                        deleteSpeed: 50
                                    }}
                                />
                            </span>

                            <span className='mt-4 fw-bold fs-4 text-secondary line-height-1 d-block'>
                                MERN Stack Developer
                            </span>

                            <p className='fw-medium mt-3'>
                                I create stunning websites for your business, Highly experienced in web design and development.
                            </p>

                            <div>
                                <BtnBig text="Contact Me" icon={<TbBrandMailgun />} link="" />
                            </div>
                        </div>

                        <div className='col-xxl-4 col-md-4 col-sm-7 col-7'>
                            <img src={require('../assets/profile_pic.png')} alt="" className='h-100 w-100 position-relative' />
                        </div>
                    </div>

                    <div className='mt-5 d-flex justify-content-center align-items-center d-xxl-flex d-md-flex d-sm-none d-none'>
                        <span className='fw-medium border-bottom border-color-theam border-2'>
                            &nbsp;Scroll
                        </span>
                        <BsMouseFill className='fs-3 text-theam' />
                        <span className='fw-medium border-bottom border-color-theam border-2'>
                            Down
                            &nbsp;
                        </span>
                    </div>
                </div>
            </section>

            <section className='user-select-none'>
                <ShadowText text1="know More" text2="About Me" />

                <div className='container mt-3 d-flex gap-5 justify-content-center flex-wrap'>
                    <div className='rounded-4 overflow-hidden width-fit'>
                        <img src="https://picsum.photos/500/400/" alt="" />
                    </div>

                    <div className='col-xxl-6 col-lg-6 col-md-7 col-sm-12 col-12'>
                        <span className="d-block fw-bold fs-2">My Profile</span>
                        <p className='fs-4 fw-medium line-height-1-1'>
                            A Lead <span className="text-theam fw-bold">MERN Stack Developer</span>
                            <br />
                            based in India
                        </p>
                        <p className='mt-4'>
                            We design and develop services for customers specializing creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through meaningful interactions. Check out my Portfolio
                        </p>

                        <div className='w-100 border'></div>

                        <div className='mt-2'>
                            <ul className='w-100 d-flex flex-wrap justify-content-between pe-4'>
                                <li className='col-xxl-3 col-md-3 col-sm-12 col-12 d-flex align-items-center gap-2'>
                                    <div>
                                        <span className='fw-bold fs-2'>5+</span>
                                    </div>
                                    <div>
                                        <span className='fw-medium'>Years of Experience</span>
                                    </div>
                                </li>
                                <li className='col-xxl-3 col-md-3 col-sm-12 col-12 d-flex align-items-center gap-2'>
                                    <div>
                                        <span className='fw-bold fs-2'>5+</span>
                                    </div>
                                    <div>
                                        <span className='fw-medium'>Years of Experience</span>
                                    </div>
                                </li>
                                <li className='col-xxl-3 col-md-3 col-sm-12 col-12 d-flex align-items-center gap-2'>
                                    <div>
                                        <span className='fw-bold fs-2'>5+</span>
                                    </div>
                                    <div>
                                        <span className='fw-medium'>Years of Experience</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="my-3">
                            <BtnBig text="Download CV" icon={<FaDownload className='me-1' />} link="" />
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
