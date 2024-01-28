import React, { useContext, useEffect, useRef, useState } from 'react'
import { BtnBig, CustomBtn, DetailBox, ExperienceCard, FirstLetterEffectText, IcoBtn, ProvideCard, ShadowText, SkillBox, SkillBoxContainer, TestimonialCard } from '../components/Utility'
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaDownload, FaReact, FaNodeJs, FaSass, FaGitAlt, FaJava, FaPython, FaPencilRuler, FaPhotoVideo, FaFileCode, FaHashtag } from 'react-icons/fa'
import { FaBarsStaggered } from 'react-icons/fa6'
import { BsFillSendFill, BsMouseFill } from 'react-icons/bs'
import { SiExpress, SiMongodb } from 'react-icons/si'
import { GrCertificate, GrMysql } from 'react-icons/gr'
import Typewriter from 'typewriter-effect';
import DataContext from '../context/data/DataContext'
import FunctionContext from '../context/function/FunctionContext'

const Home = () => {

    const { socialLinks, setResponseStatus, setResponseData, responseData, backendHost } = useContext(DataContext)
    const { handleOnChange } = useContext(FunctionContext)
    const { linkedin, insta, facebook } = socialLinks

    const testimonialForm = useRef("")
    const [testimonialFormData, settestimonialFormData] = useState({})
    const handleSubmitTestimonial = async (e) => {
        e.preventDefault()
        try {

            setResponseStatus(true)
            setResponseData({ ...responseData, "isLoading": true, "heading": 'Sending Feedback' })

            let response = await fetch(`${backendHost}/testimonial/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": testimonialFormData.name,
                    "rating": testimonialFormData.rating,
                    "email": testimonialFormData.email,
                    "mess": testimonialFormData.message
                })
            })

            let data = await response.json()
            setResponseData({ ...responseData, "isLoading": false, "heading": 'Sending Feedback', "message": data })

            setTimeout(() => {
                setResponseStatus(false)
                setResponseData({})
            }, 4000);

            testimonialForm.current.reset()

        } catch (error) {

            setResponseData({ ...responseData, "isLoading": false, "heading": 'Sending Feedback', "message": "Oops! Something went wrong on our server. Please try again after some time. Thank you for your patience." })
            setTimeout(() => {
                setResponseStatus(false)
                setResponseData({})
            }, 4000);

            console.error(error.message)
        }
    }

    const testimonialCarousel_container = useRef("")
    const [testimonialData, setTestimonialData] = useState([])
    useEffect(() => {
        const fetchTestimonial = async () => {
            let raw = await fetch(`${backendHost}/testimonial`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            await raw.json().then((data) => {
                setTestimonialData(data)
                return data
            }).then((data) => {
                if (data.length >= 1) {
                    setTimeout(() => {
                        testimonialCarousel_container.current.firstElementChild.classList.add('active')
                    }, 100);
                }
            })
        }

        fetchTestimonial();
    }, [backendHost])

    return (
        <>
            <section className='d-flex align-items-center justify-content-center home-scren-1st-vh' id='intro'>
                <div className="d-flex flex-column justify-content-center">
                    <div className="container d-flex align-items-center flex-xxl-row flex-md-row flex-sm-column-reverse flex-column-reverse">
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
                                        strings: ['Website Developer', 'Software Developer', 'YouTuber', 'Bloger'],
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
                                I create stunning websites for your business,<br /> Highly experienced in web design and development.
                            </p>

                            <div>
                                <BtnBig text="Hire Me" icon={<FaHashtag />} link="/contact" />
                            </div>
                        </div>

                        <div className='col-xxl-4 col-md-4 col-sm-7 col-7 d-flex justify-content-center'>
                            <img src={require('../assets/profile_pic.png')} alt="" />
                        </div>
                    </div>

                    <div className='text-decoration-none text-dark'>
                        <div className='d-flex justify-content-center align-items-center d-xxl-flex d-md-flex d-sm-none d-none user-select-none'>
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
                </div>
            </section>

            <section id='about_me' className='my-5 min-vh-100'>
                <ShadowText text1="know More" text2="About Me" />

                <div className='container mt-3 d-flex gap-5 justify-content-center flex-wrap'>
                    <div className='rounded-4 overflow-hidden width-fit'>
                        <img src={require('../assets/profile.jpg')} alt="" style={{ maxWidth: '500px', maxHeight: '400px', objectPosition: 'top' }} className='object-fit-cover' />
                    </div>

                    <div className='col-xxl-6 col-lg-6 col-md-7 col-sm-12 col-12'>
                        <span className="d-block fw-bold fs-2">My Profile</span>
                        <p className='fs-4 fw-medium line-height-1-1'>
                            Lead <span className="text-theam fw-bold">MERN Stack Developer</span>
                            <br />
                            Based in India
                        </p>
                        <p className='mt-4'>
                            Design and develop services for customers specializing creating stylish, modern websites, web services and online stores. My passion is to design digital user experiences through meaningful interactions. Check out my Portfolio
                        </p>

                        <div className='w-100 border'></div>

                        <div className='mt-2'>
                            <ul className='w-100 d-flex flex-wrap justify-content-between pe-4'>
                                <li className='col-xxl-3 col-md-3 col-sm-12 col-12 d-flex align-items-center gap-2'>
                                    <div>
                                        <span className='fw-bold fs-2'>02</span>
                                    </div>
                                    <div>
                                        <span className='fw-medium'>Years of Experience</span>
                                    </div>
                                </li>
                                <li className='col-xxl-3 col-md-3 col-sm-12 col-12 d-flex align-items-center gap-2'>
                                    <div>
                                        <span className='fw-bold fs-2'>10+</span>
                                    </div>
                                    <div>
                                        <span className='fw-medium'>Industry Projects</span>
                                    </div>
                                </li>
                                <li className='col-xxl-3 col-md-3 col-sm-12 col-12 d-flex align-items-center gap-2'>
                                    <div>
                                        <span className='fw-bold fs-2'>03</span>
                                    </div>
                                    <div>
                                        <span className='fw-medium'>Framework Experience</span>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div className="my-3">
                            <BtnBig text="Download CV" icon={<FaDownload className='me-1' />} link={socialLinks.resume} />
                        </div>

                    </div>
                </div>
            </section>

            <section className='my-5 min-vh-100 d-flex align-items-center justify-content-center' id='skills'>
                <div className="container py-3 d-flex justify-content-center gap-5 align-items-stretch flex-wrap">

                    <div className="col-xl-5 col-lg-6 col-md-10 col-12">
                        <div className='mb-3 shaded-box p-4 rounded d-flex gap-3 align-items-center justify-content-center'>
                            <span><FaReact style={{ color: '#61dafb' }} className='fs-1 animate-spin' /></span>
                            <span className="fs-2 fw-bold text-capitalize">
                                Know What i can do
                            </span>
                        </div>

                        <SkillBoxContainer>
                            <SkillBox icon={<SiMongodb />} text="MonogoDB" svgColor="#116149" />
                            <SkillBox icon={<SiExpress />} text="Express" svgColor="#f1c617" />
                            <SkillBox icon={<FaReact />} text="React" svgColor="#61dafb" />
                            <SkillBox icon={<FaNodeJs />} text="Node" svgColor="#8fc708" />
                            <SkillBox icon={<FaGitAlt />} text="Git" svgColor="#f05539" />
                            <SkillBox icon={<FaSass />} text="SCSS" svgColor="#cf6c9c" />
                            <SkillBox icon={<FaJava />} text="Java" svgColor="#116149" />
                            <SkillBox icon={<GrMysql />} text="MySQL" svgColor="#116149" />
                            <SkillBox icon={<FaPython />} text="Python" svgColor="#113527" />
                        </SkillBoxContainer>
                    </div>

                    <div className='col-xl-6 col-lg-8 col-md-10 col-12 d-flex flex-column gap-3'>
                        <div className='shaded-box p-4 rounded d-flex gap-3 align-items-center justify-content-center'>
                            <span className="fs-2 fw-bold text-capitalize">
                                <GrCertificate className='fs-1 text-theam' /> Education / Proficiency
                            </span>
                        </div>

                        <div className='mb-3 shaded-box p-4 rounded'>
                            <ul className="nav nav-pills mb-3 align-items-center gap-2" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="btn-reset-0 active" id="pills-awards-tab" data-bs-toggle="pill" data-bs-target="#pills-awards" type="button" role="tab" aria-controls="pills-awards" aria-selected="false">COURSE COVERED</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="btn-reset-0" id="pills-education-tab" data-bs-toggle="pill" data-bs-target="#pills-education" type="button" role="tab" aria-controls="pills-education" aria-selected="true">UNIVERSITY EDUCATION</button>
                                </li>
                            </ul>
                            <div className="tab-content mt-4" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-awards" role="tabpanel" aria-labelledby="pills-awards-tab" tabIndex="0">

                                    <div className="d-flex flex-column gap-3">
                                        <DetailBox title={'React'} para={'Front-End Web Development with React'} link={'https://coursera.org/share/ef11a848540093bac99330b9217c99ad'} />
                                        <DetailBox title={'Java'} para={'Programming using Java'} link={'https://infyspringboard.onwingspan.com/public-assets/infosysheadstart/cert/lex_auth_012880464547618816347_shared/1-8590f483-13a7-4235-a4b5-f3d520c01d63.pdf'} />
                                        <DetailBox title={'MySQL'} para={'Database Structures and Management with MySQL'} link={'https://coursera.org/share/093d86f23e17ec8bea2889cb349c2353'} />
                                        <DetailBox title={'Python'} para={'Crash Course on Python'} link={'https://coursera.org/share/c8c7f01f1f6734fba44ba4752be1d345'} />
                                    </div>

                                </div>
                                <div className="tab-pane fade" id="pills-education" role="tabpanel" aria-labelledby="pills-education-tab" tabIndex="0">
                                    <div className="d-flex flex-column gap-3">
                                        <DetailBox year={'2018 - 2021'} title={'Diploma'} para={'Government Polytechnic, Ranchi - Jharkhand India'} />
                                        <DetailBox year={'2021 - 2024 (Current)'} title={'B.Tech'} para={'LNCT, Bhopal - Madhya Pradesh India'} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="min-vh-100 d-flex flex-column justify-content-center">
                <section className='my-5'>
                    <ShadowText text1="Feature" text2="Work Experience" />
                    <div className='container'>

                        <div id="workExpCarousel" className="carousel slide" data-bs-ride="carousel">
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <ExperienceCard img={'https://picsum.photos/seed/picsum/500/500'} para={'Here, I embarked on my professional journey as a frontend developer, delving into the realms of HTML, CSS, JavaScript, and MySQL, along with a myriad of other essential skills. This marked a pivotal phase as I secured my inaugural internship at <a href="https://shineskill.com/" target="_blank">Shine Skill Pvt</a>. Ltd. By the culmination of this internship, I successfully crafted an e-commerce website, representing a significant milestone in my career, albeit focused solely on the frontend aspect.'} role={'Frontend Developer'} />
                                </div>
                                <div className="carousel-item">
                                    <ExperienceCard img={'https://picsum.photos/seed/picsum/500/500'} para={'At my second professional stint as a full-stack developer, I spearheaded the creation of numerous website projects, showcasing my diverse skill set. Noteworthy among them are projects such as <a href="http://srconceptstudio.com/">Concept Studio</a>, <a href="http://flyaliipalau.pw/">Alii Palau</a>, <a href="https://www.khuttal.com/">Khuttal</a>, <a href="https://freakingminds.in/">Freaking Minds</a>, and <a href="https://therestronaut.com/">The Restronaut</a>. Throughout these endeavors, I adeptly tackled frontend bugs and translated conceptual ideas into tangible, functional solutions.'} role={'Full Stack Developer'} />
                                </div>
                            </div>

                            <div className="carousel-indicators position-relative z-0">
                                <button type="button" data-bs-target="#workExpCarousel" data-bs-slide-to="0" className="custom-indicators active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#workExpCarousel" data-bs-slide-to="1" className='custom-indicators' aria-label="Slide 2"></button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='my-5'>
                    <div className="container">
                        <FirstLetterEffectText text="What I Provide" />
                        <div className="d-flex gap-4 justify-content-center flex-wrap my-3">
                            <ProvideCard icon={<FaPencilRuler />} text={'UI/UX Consultency'} modalId="testing" />
                            <ProvideCard icon={<FaPhotoVideo />} text={'Branding & Design'} modalId={'testing'} />
                            <ProvideCard icon={<FaFileCode />} text={'Web Development'} modalId={'testing'} />
                            <ProvideCard icon={<FaBarsStaggered />} text={'Content Writing'} modalId={'testing'} />
                        </div>
                    </div>
                </section>
            </section>

            <section className="my-5">
                <ShadowText text1="Golden Feedback" text2="Testimonial" />

                <div className="container mb-3">
                    <FirstLetterEffectText text="Your Feedback Is My Gem" />
                </div>

                <div className="container-fluid d-flex flex-wrap justify-content-center">

                    {testimonialData && testimonialData &&
                        <div className="col-md-4 col-12 p-4 pt-0">
                            <div id="testimonialCarousel" className="carousel slide h-100" data-bs-ride="carousel">
                                <div className="carousel-inner h-100" ref={testimonialCarousel_container}>

                                    {testimonialData && testimonialData.map((ele) => {
                                        return (
                                            <div className="carousel-item h-100" key={`${ele._id}`}>
                                                <TestimonialCard message={ele.mess} signature={ele.name} rating={ele.rating} />
                                            </div>
                                        )
                                    })}

                                </div>
                            </div>
                        </div>
                    }

                    <div className="col-md-7 col-12 p-4 mt-3">
                        <div>
                            <form className='rounded-3' onSubmit={handleSubmitTestimonial} ref={testimonialForm}>
                                <div className="mb-2 d-flex flex-wrap gap-md-0 gap-2">
                                    <div className="col-md-6 col-12 pe-md-2 pe-0">
                                        <input type="text" name="name" className="rounded-1 custom-input-style" placeholder="Your Name*" required onChange={(e) => { handleOnChange(e, testimonialFormData, settestimonialFormData) }} />
                                    </div>
                                    <div className="col-md-6 col-12 ps-md-2 ps-0">
                                        <select name="rating" id="testimonial-rating" className='rounded-1 custom-input-style' onChange={(e) => { handleOnChange(e, testimonialFormData, settestimonialFormData) }}>
                                            <option value="" className='d-none'>Rate Me</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <input type="email" className="rounded-1 custom-input-style" placeholder="youremail@domain.com (Optional)" name="email" onChange={(e) => { handleOnChange(e, testimonialFormData, settestimonialFormData) }} />
                                </div>
                                <div className="mb-2">
                                    <textarea name="message" id="" cols="" rows="5" className='w-100 custom-input-style rounded-1' placeholder="I'll appreciate you thought, Feel free to say anything." data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" required onChange={(e) => { handleOnChange(e, testimonialFormData, settestimonialFormData) }} />
                                </div>
                                <CustomBtn text="Send Message" icon={<BsFillSendFill />} type={'submit'} />
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
