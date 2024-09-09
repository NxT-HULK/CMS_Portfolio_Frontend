import React, { useContext, useEffect, useState } from 'react'
import { CustomBtn, FirstLetterEffectText } from '../../components/Utility'
import FunctionContext from '../../context/function/FunctionContext'
import { BsFillSendFill } from 'react-icons/bs'
import axios from 'axios'
import DataContext from '../../context/data/DataContext'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const AccountCreate = () => {

    const { handleOnChange } = useContext(FunctionContext)
    const { setResponseStatus, setResponseData, backendHost } = useContext(DataContext)
    const [formData, setFormData] = useState({})
    const [eyemode, setEyemode] = useState(false)
    const [allAdmins, setAllAdmins] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        (async () => {
            try {
                const main = await axios.post(`${backendHost}/api/admin/`, {}, { withCredentials: true })
                if (main.status === 200) {
                    let fetch = await axios.get(`${backendHost}/api/admin/get-all`, {
                        withCredentials: true
                    })

                    if (fetch.status === 200) {
                        if (fetch.data === null) return null
                        setAllAdmins(() => {
                            return {
                                'Admin': fetch?.data.filter((data) => data?.authority === 'Admin'),
                                'Course Writter': fetch?.data.filter((data) => data?.authority === 'CourseWritter'),
                                'Blog Writter': fetch?.data.filter((data) => data?.authority === 'BlogWritter')
                            }
                        })
                    }
                }
            } catch (error) {
                if (error?.status === 400) {
                    navigate("/account")
                }
                console.error(error);
            }
        })();
    }, [backendHost, navigate])


    const handleSubmit = async (e) => {
        e.preventDefault()
        setResponseStatus(true)
        setResponseData({
            isLoading: true,
            heading: "Creating Account",
            message: ""
        })

        try {
            let fetch = await axios.post(`${backendHost}/api/admin/signup`, { ...formData }, { withCredentials: true })
            console.log(fetch);

            if (fetch.status === 201) {
                setAllAdmins(() => {
                    return {
                        'Admin': fetch?.data.filter((data) => data?.authority === 'Admin'),
                        'Course Writter': fetch?.data.filter((data) => data?.authority === 'CourseWritter'),
                        'Blog Writter': fetch?.data.filter((data) => data?.authority === 'BlogWritter')
                    }
                })

                setResponseData({
                    isLoading: false,
                    heading: 'Account Created',
                    message: "Registration Success"
                })

                setTimeout(() => {
                    setResponseStatus(false)
                    e.target.reset()
                    setFormData({})
                }, 2000);
            }
        } catch (error) {
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
        <div className="container-fluid px-md-5 px-3 py-5 my-3">
            <div className="d-flex flex-wrap-reverse">
                <div className="col-12 d-flex flex-wrap-reverse">
                    <div className="col-md-6 pe-md-3">
                        <div className='p-md-3 px-2 rounded-4 mb-3 pb-3' style={{ background: '#6a59d115', backdropFilter: 'blur(7px)' }}>
                            <FirstLetterEffectText text="Account Form" />
                            <form className='mt-3' onSubmit={handleSubmit}>
                                <div className="mb-2">
                                    <input type="text" name="name" className="rounded-1 custom-input-style" placeholder="Sample Name*" required onChange={(e) => { handleOnChange(e, formData, setFormData) }} />
                                </div>
                                <div className="mb-2">
                                    <input type="email" name="email" className="rounded-1 custom-input-style" placeholder="samplemail@domain.com*" required onChange={(e) => { handleOnChange(e, formData, setFormData) }} />
                                </div>
                                <div className="position-relative d-flex align-items-center justify-content-end mb-2">
                                    <input type={eyemode === true ? 'text' : 'password'} className="bg-white rounded-1 custom-input-style" placeholder="Your Password" name="password" onChange={(e) => { handleOnChange(e, formData, setFormData) }} />
                                    <div className='position-absolute me-3'>
                                        <button type="button" className='btn-reset' onClick={() => { setEyemode(!eyemode) }}>
                                            {eyemode === true ?
                                                <FaEye className='fs-5 text-theam' />
                                                :
                                                <FaEyeSlash className='fs-5 text-theam' />
                                            }
                                        </button>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <select name="authority" className="rounded-1 custom-input-style" onChange={(e) => { handleOnChange(e, formData, setFormData) }}>
                                        <option value="">- Select Authority -</option>
                                        <option value="Admin">Admin</option>
                                        <option value="CourseWritter">Course Writter</option>
                                        <option value="BlogWritter">Blog Writter</option>
                                    </select>
                                </div>
                                <div className="mt-4 mb-3 d-flex justify-content-center">
                                    <CustomBtn text="Create Account" icon={<BsFillSendFill />} type={'submit'} className={'mx-md-0 mx-auto'} />
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-6 ps-md-3 user-select-none">
                        {allAdmins === null ?
                            <>
                                No branch account found
                            </>
                            :
                            allAdmins && Object.keys(allAdmins).map((admin) => {
                                if (allAdmins[admin].length > 0) {
                                    return (
                                        <div className="mb-4" key={admin}>
                                            <FirstLetterEffectText text={admin} />
                                            <hr className="m-0" />
                                            <div className='py-2 d-flex gap-3'>
                                                {allAdmins[admin].map((child) => {
                                                    return (
                                                        <span key={child?._id} className="d-inline-block px-2 py-1 rounded-2 text-white" style={{ background: '#6a59d2' }}>{child?.name}</span>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                    )
                                } else {
                                    return null;
                                }
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountCreate