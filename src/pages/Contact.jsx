import React, { useContext, useRef, useState } from 'react'
import { CustomBtn, FirstLetterEffectText } from '../components/Utility'
import { BsFillSendFill } from 'react-icons/bs'
import DataContext from '../context/data/DataContext'
import FunctionContext from '../context/function/FunctionContext'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios'

const Contact = () => {

    const { setResponseStatus, setResponseData, responseData, backendHost } = useContext(DataContext)
    const { handleOnChange } = useContext(FunctionContext)

    const contactForm = useRef("")
    const [contactFormData, setContactFormData] = useState({})
    const handleSubmitContact = async (e) => {
        e.preventDefault()
        try {
            setResponseStatus(true)
            setResponseData({ ...responseData, "isLoading": true, "heading": 'Sending Contact' })
            let raw = await axios.post(`${backendHost}/api/client/contact`, {
                "name": contactFormData.name,
                "query": contactFormData.query,
                "email": contactFormData.email,
                "mess": contactFormData.mess
            })

            if (raw?.status === 201) {
                setResponseData({ ...responseData, "isLoading": false, "heading": 'Sending Contact', "message": raw.data })
                contactForm({})
                contactForm.current.reset()
            }

        } catch (error) {
            if (error?.status === 400) {
                setResponseData({ ...responseData, "isLoading": false, "heading": 'Error', "message": error?.response.data })
            } else {
                setResponseData({ ...responseData, "isLoading": false, "heading": 'Error', "message": error?.message })
            }

            console.error(error)
        } finally {
            setTimeout(() => {
                setResponseStatus(false)
                setResponseData({})
            }, 4000);
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Connect to Me || Shivam Kashyap</title>
                </Helmet>
            </HelmetProvider>
            <section className="random-background py-md-5 py-0">
                <div className="container-fluid px-md-2 px-0">
                    <div className="d-flex flex-wrap justify-content-center align-items-center gap-md-5 gap-0 mx-md-3 mx-0">
                        <div className="col-md-5 col-11">
                            <img src="/contact-illus.svg" alt="" />
                        </div>

                        <div className="col-md-6 col-12 p-md-3 px-2 rounded-4 mb-3 pb-3" style={{ background: '#6a59d115', backdropFilter: 'blur(7px)', boxShadow: '5px 5px 0 #6a59d130' }}>
                            <div className='d-flex justify-content-md-start justify-content-center'>
                                <FirstLetterEffectText text={"Get In Touch"} className={'text-center'} />
                            </div>
                            <form className='mt-3' onSubmit={handleSubmitContact} ref={contactForm}>
                                <div className="mb-2">
                                    <input type="text" name="name" className="rounded-1 custom-input-style" placeholder="Your Name*" required onChange={(e) => { handleOnChange(e, contactFormData, setContactFormData) }} />
                                </div>
                                <div className="mb-2">
                                    <input type="text" name="query" className="rounded-1 custom-input-style" placeholder="Your Query*" required onChange={(e) => { handleOnChange(e, contactFormData, setContactFormData) }} />
                                </div>
                                <div className="mb-2">
                                    <input type="email" name="email" className="rounded-1 custom-input-style" placeholder="youremail@domain.com*" onChange={(e) => { handleOnChange(e, contactFormData, setContactFormData) }} />
                                </div>
                                <div className="mb-2">
                                    <textarea name="mess" id="" rows="5" className='w-100 custom-input-style rounded-1' placeholder="Your Message*" required onChange={(e) => { handleOnChange(e, contactFormData, setContactFormData) }} />
                                </div>
                                <CustomBtn text="Send Message" icon={<BsFillSendFill />} type={'submit'} className={'mx-md-0 mx-auto'} />
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Contact