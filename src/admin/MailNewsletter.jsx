import React, { useRef, useState } from 'react'
import { FaEye } from 'react-icons/fa'
import { CustomBtn } from '../components/Utility'
import { BsFillSendFill } from 'react-icons/bs'

const MailNewsletter = ({ FunctionContext, DataContext }) => {

    const [htmlData, setHtmlData] = useState("")
    const { handleOnChange } = FunctionContext
    const { setResponseStatus, setResponseData, backendHost } = DataContext

    const handlePreviewData = () => {
        setResponseStatus(true)
        setResponseData({
            isLoading: false,
            heading: 'Live Preview',
            message: htmlData.html
        })
    }

    const [formData, setFormData] = useState({
        toSend: []
    })

    const handleOnTick = (e) => {
        setFormData({ ...formData, "toSend": e.target.checked === true ? [...formData.toSend, e.target.name] : [...formData.toSend.filter((ele) => ele !== e.target.name)] })
    }

    const form = useRef("")
    const handleSubmitForm = async (e) => {
        e.preventDefault();

        try {
            setResponseStatus(true)
            setResponseData({
                isLoading: true,
                heading: 'Sending Newsletter',
            })

            let raw = await fetch(`${backendHost}/mail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth_token': localStorage.getItem("auth-token")
                },
                body: JSON.stringify({
                    "service": "news",
                    "subject": formData.subject,
                    "body": formData.html,
                    "toSend": formData.toSend
                })
            })
            let res = await raw.json()

            setResponseData({
                isLoading: false,
                heading: 'Sending Newsletter',
                message: res
            })

            form.current.reset()

        } catch (error) {

            console.error(error)

            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: 'Error',
                message: error
            })
        }
    }

    return (
        <div className='my-4 w-100'>
            <form className='w-100' onSubmit={handleSubmitForm} ref={form}>
                <div className="w-100">
                    <div className="d-flex flex-wrap gap-3 w-100">
                        <div className="d-flex gap-1 align-items-center">
                            <input className='shadow-none form-check-input m-0' type="checkbox" name="all" id="news_all" onChange={handleOnTick} />
                            <label htmlFor="news_all">All <span className="font-monospace">(Type -&gt; All)</span></label>
                        </div>

                        <div className="d-flex gap-1 align-items-center">
                            <input className='shadow-none form-check-input m-0' type="checkbox" name="projects" id="news_projects" onChange={handleOnTick} />
                            <label htmlFor="news_projects">Projects</label>
                        </div>

                        <div className="d-flex gap-1 align-items-center">
                            <input className='shadow-none form-check-input m-0' type="checkbox" name="courses" id="news_courses" onChange={handleOnTick} />
                            <label htmlFor="news_courses">Courses</label>
                        </div>

                        <div className="d-flex gap-1 align-items-center">
                            <input className='shadow-none form-check-input m-0' type="checkbox" name="blogs" id="news_blogs" onChange={handleOnTick} />
                            <label htmlFor="news_blogs">Blogs</label>
                        </div>
                    </div>
                </div>

                <div className="w-100 mt-3">
                    <div className="w-100 mb-2">
                        <input type="text" name="subject" className="rounded-1 custom-input-style" placeholder="Subject*" onChange={(e) => { handleOnChange(e, formData, setFormData) }} />
                    </div>
                    <div className="mb-2 position-relative">
                        <textarea name="html" rows="10" className='w-100 custom-input-style rounded-1' placeholder="Body*" onChange={(e) => { handleOnChange(e, formData, setFormData); handleOnChange(e, htmlData, setHtmlData) }} />
                        <button type="button" className="lh-1 btn-reset position-absolute m-2" style={{ top: 0, right: 0 }} onClick={handlePreviewData}>
                            <FaEye className='fs-4 text-theam bg-white' />
                        </button>
                    </div>
                </div>

                <CustomBtn text="Send Newsletter" icon={<BsFillSendFill />} type={'submit'} />
            </form>
        </div>
    )
}

export default MailNewsletter