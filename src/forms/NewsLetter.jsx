import '../styles/feedback.scss'
import React, { useContext, useState } from 'react'
import { FirstLetterEffectText, FirstLetterEffectText2 } from '../components/Utility'
import DataContext from '../context/data/DataContext';
import { IoSend } from "react-icons/io5";
import FunctionContext from '../context/function/FunctionContext';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ProjectFeedback = () => {

    const { setResponseStatus, setResponseData, backendHost, } = useContext(DataContext)
    const { handleOnChange } = useContext(FunctionContext)

    const [formData, setFormData] = useState({})
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setResponseStatus(true)
        setResponseData({
            isLoading: true,
            heading: "Submitting Form"
        })

        try {
            
            const fetching = await axios.post(`${backendHost}/api/client/news`, formData)
            if (fetching.status === 201) {
                setResponseData({
                    isLoading: false,
                    heading: "Form Submit Success",
                    message: fetching?.data
                })
            }

        } catch (error) {
            if (error?.status === 400) {
                setResponseData({
                    isLoading: false,
                    heading: 'Validataion Failed',
                    message: error?.response?.data
                })
            } else {
                setResponseData({
                    isLoading: false,
                    heading: 'Error',
                    message: 'Server Error! Please try again later.'
                })
            }
            console.error(error)
        } finally {
            setTimeout(() => {
                setResponseStatus(false)
                e.target.reset()
                setFormData({})
            }, 5000);
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Newsletter Subscription | Shivam Kashyap</title>
                </Helmet>
            </HelmetProvider>

            <main style={{ background: 'url(abstract-colorful-sky.jpg)', minHeight: '100vh', backgroundPosition: 'center' }} className='w-100'>
                <section className='my-4'>
                    <div className="container">
                        <div className="p-3 blur-white rounded shadow-sm px-4">
                            <div className='mb-md-3 mb-1'>
                                <div className="d-inline-flex align-items-center border-bottom border-2 border-theam">
                                    <span className='d-md-block d-none'>
                                        <FirstLetterEffectText text={`Stay Updated with Our Latest Projects & Content!`} className={"mt-0 mb-0 lh-1 user-select-none"} />
                                    </span>
                                    <span className='d-md-none d-block fw-medium'>
                                        <FirstLetterEffectText2 text={`Stay Updated with Our Latest Projects & Content!`} className={"mt-0 mb-0 lh-1 user-select-none"} />
                                    </span>
                                </div>
                            </div>
                            <div className='pe-md-5 user-select-none'>
                                <p className="fs-md-4 fs-6 fw-medium">Subscribe to our newsletter and never miss an update!</p>
                                <ul className='list-style-disk mb-3'>
                                    <li>Be the first to know when we complete a new project and discover exclusive insights.</li>
                                    <li>Get notified whenever we post new content in our online courses, Keep learning with ease.</li>
                                </ul>
                                <p><strong>Coming soon:</strong> We're excited to announce that we'll be adding a blog to our website! Stay tuned for insightful articles and updates, straight to your inbox.</p>
                                <blockquote>Join our community and stay informed!</blockquote>
                            </div>
                        </div>
                    </div>
                </section>

                <section className='my-4'>
                    <div className="container">
                        <div className="blur-white p-4 rounded shadow-sm">
                            <form className='d-flex flex-column gap-4' onSubmit={handleSubmitForm}>
                                <div className='form-card p-3 rounded'>
                                    <div className='card-label ps-1'>
                                        <span className="required">Email</span>
                                    </div>
                                    <div className="card-input">
                                        <input type="email" name="email" id="" placeholder='Your Email' onChange={(e) => handleOnChange(e, formData, setFormData)} />
                                    </div>
                                    <div className="info"><span className='text'>We'll never share you email address</span></div>
                                </div>

                                <div className='form-card p-3 rounded'>
                                    <div className='card-label ps-1'>
                                        <span className="required">Name</span>
                                    </div>
                                    <div className="card-input">
                                        <input type="text" name="name" id="" placeholder='Your Name' onChange={(e) => handleOnChange(e, formData, setFormData)} />
                                    </div>
                                </div>

                                <div className='form-card p-3 rounded'>
                                    <div className='card-label ps-1'>
                                        <span className="required">Subscription Type</span>
                                    </div>
                                    <div className="card-input">
                                        <div className="d-flex flex-wrap gap-3">
                                            <div className="col-12">
                                                <input type="radio" name="type" id="subs-all" onChange={(e) => setFormData({ ...formData, type: 'all' })} />
                                                <label htmlFor="subs-all" className="m-0 form-lebel">All</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="radio" name="type" id="subs-project" onChange={(e) => setFormData({ ...formData, type: 'project' })} />
                                                <label htmlFor="subs-project" className="m-0 form-lebel">Work/Projects</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="radio" name="type" id="subs-course" onChange={(e) => setFormData({ ...formData, type: 'course' })} />
                                                <label htmlFor="subs-course" className="m-0 form-lebel">Course</label>
                                            </div>
                                            <div className="col-12">
                                                <input type="radio" name="type" id="subs-blogs" onChange={(e) => setFormData({ ...formData, type: 'blogs' })} />
                                                <label htmlFor="subs-blogs" className="m-0 form-lebel">Blogs</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <button type={'submit'} className={`btn-reset user-select-none theam-btn-big`}>
                                        <span className='text'>Subscribe Now</span>
                                        <span className='icon'><IoSend /></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className='mt-2 mb-4'>
                    <div className="container">
                        <div className="p-3 blur-white rounded shadow-sm px-4">
                            <p className='m-0 fw-medium text-justify'><strong>Note:</strong> This form is designed to collect your information solely for subscribing to our newsletter. We will keep you informed about new projects, course updates, and blog posts. Please do not include sensitive information such as your personal phone number or additional email addresses.</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProjectFeedback