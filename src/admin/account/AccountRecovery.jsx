import React, { useContext, useState } from 'react'
import { CgSpinner } from "react-icons/cg";
import { FirstLetterEffectText2 } from '../../components/Utility';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import DataContext from '../../context/data/DataContext';
import FunctionContext from '../../context/function/FunctionContext';

const AccountRecovery = () => {

    const { backendHost, setResponseStatus, setResponseData } = useContext(DataContext)
    const { handleOnChange } = useContext(FunctionContext)

    const [isLoading, setIsLoading] = useState(null)

    const [formData, setFormData] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            setIsLoading(true)
            const fetching = await axios.post(`${backendHost}/api/admin/request-recover-link`, formData)

            if (fetching?.status === 200) {
                setIsLoading(false)
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: `Success `,
                    message: fetching?.data
                })
            }

        } catch (error) {
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
                    <title>Admin account recovery</title>
                </Helmet>
            </HelmetProvider>

            <div className="container py-5 my-5 d-flex flex-column align-items-center">
                <FirstLetterEffectText2 text={"Account Recovery"} className={"fs-3 fw-bold mb-3"} />
                <form className='col-md-6 col-12' onSubmit={handleSubmit}>
                    <div className="col-12 pe-md-2 pe-0 mb-3">
                        <label htmlFor="email" className="mb-0"><small>Admin Email</small></label>
                        <input
                            type="email"
                            name="email"
                            className="rounded-1 custom-input-style no-spinner"
                            placeholder="youradminemail@domain.com"
                            required
                            onChange={(e) => handleOnChange(e, formData, setFormData)}
                        />
                    </div>
                    <div className="col-12 pe-md-2 pe-0">
                        <button id="submit_btn" type="submit" className="simleButton-with-shaded px-3 width-fit">
                            {isLoading === true &&
                                <CgSpinner size={20} className='me-1 animate-fast-spinner' />
                            }
                            Send Reset Link
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AccountRecovery