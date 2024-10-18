import React, { useContext, useEffect, useState } from 'react'
import { CgSpinner } from "react-icons/cg";
import { FirstLetterEffectText2 } from '../../components/Utility';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import DataContext from '../../context/data/DataContext';
import FunctionContext from '../../context/function/FunctionContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, useSearchParams } from 'react-router-dom';

const AccountRecovery = () => {

    const { backendHost, setResponseStatus, setResponseData } = useContext(DataContext)
    const { handleOnChange } = useContext(FunctionContext)

    const [params] = useSearchParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!params.get("email") && !params.get("token")) {
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: "Error",
                message: "Invalid reset password URL! Try a request new one."
            })

            navigate("/auth/recover")
        }
    }, [params, navigate, setResponseData, setResponseStatus])

    const [isLoading, setIsLoading] = useState(null)
    const [eyemode, setEyemode] = useState(false)
    const [formData, setFormData] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            if (formData?.password !== formData?.password2) {
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: "Validation Failed",
                    message: "Password and re-enter password not matched"
                })

                return;
            }

            setIsLoading(true)
            const fetching = await axios.post(`${backendHost}/api/admin/reset-password`, {
                password: formData?.password,
                email: params.get("email"),
                token: params.get("token")
            })

            if (fetching?.status === 200) {
                setIsLoading(false)
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: `Success `,
                    message: "Password has been changed"
                })
            }

        } catch (error) {
            setIsLoading(false)
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: `Error - ${error?.response?.status}`,
                message: error?.response?.data
            })

            console.error(error);
        }
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Admin reset password</title>
                </Helmet>
            </HelmetProvider>

            <div className="container my-5 d-flex flex-column align-items-center">
                <FirstLetterEffectText2 text={"Reset Password"} className={"fs-3 fw-bold mb-3"} />
                <form className='col-md-6 col-12' onSubmit={handleSubmit}>
                    <div className="col-12 pe-md-2 pe-0 mb-3">
                        <label htmlFor="email" className="mb-0"><small>Admin Email</small></label>
                        <input
                            type="email"
                            name="email"
                            className="rounded-1 custom-input-style no-spinner"
                            placeholder="youradminemail@domain.com"
                            readOnly
                            value={params.get("email")}
                        />
                    </div>
                    <div className="col-12 pe-md-2 pe-0 mb-3">
                        <label htmlFor="password" className="mb-0"><small>New Password</small></label>
                        <div className="position-relative d-flex align-items-center justify-content-end mb-2">
                            <input
                                type={eyemode === true ? 'text' : 'password'}
                                className="bg-white rounded-1 custom-input-style"
                                placeholder="New Password"
                                name="password"
                                id="password"
                                onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                            />
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
                    </div>
                    <div className="col-12 pe-md-2 pe-0 mb-3">
                        <label htmlFor="password2" className="mb-0"><small>Re-enter Password</small></label>
                        <input
                            type='password'
                            className="bg-white rounded-1 custom-input-style"
                            placeholder="Re-enter Password"
                            name="password2"
                            id="password2"
                            onChange={(e) => { handleOnChange(e, formData, setFormData) }}
                        />
                    </div>
                    <div className="col-12 pe-md-2 pe-0">
                        <button id="submit_btn" type="submit" className="simleButton-with-shaded px-3 width-fit">
                            {isLoading === true &&
                                <CgSpinner size={20} className='me-1 animate-fast-spinner' />
                            }
                            Change Password
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AccountRecovery