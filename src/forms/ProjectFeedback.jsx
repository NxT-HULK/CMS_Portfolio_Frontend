import '../styles/feedback.scss'
import React, { useContext, useEffect, useState } from 'react'
import { FirstLetterEffectText, FirstLetterEffectText2 } from '../components/Utility'
import { Link, useSearchParams } from 'react-router-dom';
import { FaInfo, FaLink } from 'react-icons/fa';
import { FaMessage } from "react-icons/fa6";
import DataContext from '../context/data/DataContext';
import { IoSend } from "react-icons/io5";
import FunctionContext from '../context/function/FunctionContext';
import axios from 'axios';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const ProjectFeedback = () => {

    const { setResponseStatus, setResponseData, backendHost, setFeedbackModal, setcurrFeedbackProjectId } = useContext(DataContext)
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
            const fetching = await axios.post(`${backendHost}/api/client/feedback`, { ...formData, ofWork: params.get("projectId") })
            if (fetching.status === 201) {
                setResponseData({
                    isLoading: false,
                    heading: "Submitting Form",
                    message: fetching?.data
                })

                e.target.reset()
                setFormData({})
            }

        } catch (error) {

            if (error.status === 400) {
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: error?.response?.data ? "Validation Error" : "Error",
                    message: error?.response?.data ?? "Server Error"
                })
            }

            console.error(error)

        } finally {
            setTimeout(() => {
                setResponseStatus(false)
            }, 3000);
        }
    }

    const [params] = useSearchParams()
    const [projectData, setProjectData] = useState(null)
    useEffect(() => {
        if (!params.get("projectId")) {
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: "URL error",
                message: "The URL you entered is not valid."
            })
        } else {
            (async () => {
                try {
                    const fetching = await axios.get(`${backendHost}/api/client/work?projectId=${params.get("projectId")}`)
                    if (fetching?.status === 200) {
                        setProjectData(fetching?.data)
                        setcurrFeedbackProjectId(fetching?.data?._id)
                    }
                } catch (error) {
                    if (error?.response?.status === 404) {
                        setResponseStatus(true)
                        setResponseData({
                            isLoading: false,
                            heading: "URL error",
                            message: "The URL you entered is not valid."
                        })
                    }
                }
            })();
        }
    }, [params, backendHost, setResponseData, setResponseStatus, setcurrFeedbackProjectId])

    const handleShowAllFeedback = () => {
        setFeedbackModal({
            show: true,
            title: `All previous feedback of - ${projectData?.name}`
        })
    }

    const handleInformationClick = () => {
        setResponseStatus(true)
        setResponseData({
            isLoading: false,
            heading: "project Information",
            message: projectData?.html ?? 'No Information found'
        })
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Feedback - {projectData?.name ?? ''} | Shivam Kashyap</title>
                </Helmet>
            </HelmetProvider>

            <main style={{ background: 'url(abstract-colorful-sky.jpg)', minHeight: '100vh' }} className='w-100'>
                <section className='my-4'>
                    <div className="container">
                        <div className="p-3 blur-white rounded shadow-sm px-4">
                            <div className='mb-3 d-flex flex-wrap align-items-center justify-content-between gap-md-0 gap-3'>
                                <div className="col-auto">
                                    <div className="d-inline-flex align-items-center border-bottom border-2 border-theam">
                                        <FirstLetterEffectText text={`Feedback Form: `} className={"mt-0 mb-0 lh-1 user-select-none"} />
                                        <span className='fs-5 d-inline-block mt-2 fw-bold user-select-none'><FirstLetterEffectText2 text={projectData?.name ?? ''} /></span>
                                    </div>
                                </div>
                                <div className="d-inline-flex col-md-4 col-12 justify-content-lg-end justify-content-start gap-2">
                                    <Link to={projectData?.link} className='btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center' style={{ height: '35px', width: '35px' }}>
                                        <FaLink className='text-white' />
                                    </Link>
                                    <button type="button" className='btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center' style={{ height: '35px', width: '35px' }} onClick={handleInformationClick}>
                                        <FaInfo className='text-white' />
                                    </button>
                                    <button type="button" className='btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center' style={{ height: '35px', width: '35px' }} onClick={handleShowAllFeedback}>
                                        <FaMessage className='text-white' />
                                    </button>
                                </div>
                            </div>
                            <div className='pe-md-5 user-select-none'>
                                <p className='fw-medium text-justify'>We sincerely hope that the project has met your expectations and delivered the results you were looking for. Your satisfaction is our top priority, and we always strive to improve. To help us serve you and others better in the future, we would greatly appreciate it if you could take a few moments to share your honest feedback on your experience working with us.</p>
                                <p className='fw-medium text-justify'>Your insights will not only help us grow as a team but also ensure that we can continue to provide the highest level of service to clients like yourself.</p>
                                <p className='fw-medium text-justify'>Thank you in advance for your time and valuable input. We truly appreciate your support and look forward to hearing from you.</p>
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
                                    <div className="info"><span className='text'>We'll never share your email address with someone else</span></div>
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
                                        <span className="required">Designation</span>
                                    </div>
                                    <div className="card-input">
                                        <input type="text" name="designation" id="" placeholder="Your Designation" onChange={(e) => handleOnChange(e, formData, setFormData)} />
                                    </div>
                                    <div className="info"><span className="text">If you are affiliated with an organization, please enter your designation; otherwise, write C.E.O</span></div>
                                </div>

                                <div className='form-card p-3 rounded'>
                                    <div className='card-label ps-1'>
                                        <span className="required">Remark</span>
                                    </div>
                                    <div className="card-input">
                                        <textarea name="remark" id="" placeholder='Your Remark' spellCheck="true" onChange={(e) => handleOnChange(e, formData, setFormData)} />
                                    </div>
                                    <div className="info"><span className="text">Please share your valuable thoughts</span></div>
                                </div>

                                <div>
                                    <button type={'submit'} className={`btn-reset user-select-none theam-btn-big`}>
                                        <span className='text'>Submit Feedback</span>
                                        <span className='icon'><IoSend /></span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>

                <section className='mb-2 mt-4'>
                    <div className="container">
                        <div className="p-3 blur-white rounded shadow-sm px-4">
                            <p className='m-0 fw-medium text-justify'>To provide additional feedback, please visit our <Link to="/work">project page</Link> and click the message button on the relevant card.</p>
                        </div>
                    </div>
                </section>

                <section className='mt-2 mb-4'>
                    <div className="container">
                        <div className="p-3 blur-white rounded shadow-sm px-4">
                            <p className='m-0 fw-medium text-justify'><strong>Note:</strong> This form is designed to collect feedback on the completed project by <Link to="/">Shivam Kashyap</Link>, including testimonials and detailed project information. Please refrain from including any sensitive information such as your personal phone number or email address.</p>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default ProjectFeedback