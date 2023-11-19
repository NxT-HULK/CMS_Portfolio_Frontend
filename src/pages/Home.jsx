import React from 'react'
import { BtnBig, IcoBtn } from '../components/Utility'
import { FaLinkedinIn, FaFacebookF, FaInstagram } from 'react-icons/fa'
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
                        <span className='fw-medium'>
                            Scroll
                        </span>
                        <BsMouseFill className='fs-3 text-theam' />
                        <span className='fw-medium'>
                            Down
                        </span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
