import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa'
import { ImSpinner4 } from "react-icons/im";

const Testimonial = ({ DataContext, FunctionContext }) => {

    const { setResponseStatus, setResponseData, backendHost } = DataContext
    const { toSimpleDate } = FunctionContext

    const [isMainLoader, setIsMainLoader] = useState(false)
    const [isFormProcess, setIsFormProcess] = useState({
        status: true,
        _id: ""
    })

    const [testimonialData, setTestimonialData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                setIsMainLoader(true)
                const raw = await axios.get(`${backendHost}/api/admin/testimonial/get-all`, { withCredentials: true })
                const data = raw?.data
                setTestimonialData(data)
                setIsMainLoader(false)
            } catch (error) {
                console.error(error);
                if (error.status === 400) {
                    setResponseStatus(true)
                    setResponseData({
                        isLoading: false,
                        heading: "Error",
                        message: error.response?.data
                    })
                    setIsMainLoader(false)
                }
            }
        })();
    }, [backendHost, setResponseData, setResponseStatus])

    const handleChangeStatus = async (id) => {
        try {
            setIsFormProcess({ status: true, _id: id });
            const raw = await axios.get(`${backendHost}/api/admin/testimonial/update-status/${id}`, { withCredentials: true })
            let data = raw?.data

            setTestimonialData((old) => {
                return old.map((ele) => {
                    if (ele?._id === id)
                        return { ...ele, status: data }
                    return ele
                })
            })

            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: "Testimonial Updation",
                message: "Status has been updated"
            })

            setIsFormProcess({ _id: "", status: false })
            setTimeout(() => {
                setResponseStatus(false)
            }, 2000);

        } catch (error) {
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: `Server Error`,
                message: error.message
            })
        }

        setTimeout(() => {
            setResponseStatus(false)
            setResponseData({
                isLoading: false,
                heading: "",
                message: ""
            })
        }, 4000);
    }

    const handleDeleteTestimonial = async (id) => {

        let confirmation = window.confirm('Are you sure want to delete page')

        if (confirmation === true) {
            setIsFormProcess({ status: true, _id: id });
            try {

                const raw = await axios.delete(`${backendHost}/api/admin/testimonial/${id}`, { withCredentials: true })
                const data = raw?.data

                setTestimonialData(testimonialData.filter((ele) => ele._id !== id))
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: "Information",
                    message: data
                })

                setIsFormProcess({ _id: "", status: false })
                setTimeout(() => {
                    setResponseStatus(false)
                }, 2000);

            } catch (error) {
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: `Server Error`,
                    message: error.message
                })
            }

            setTimeout(() => {
                setResponseStatus(false)
                setResponseData({
                    isLoading: false,
                    heading: "",
                    message: ""
                })
            }, 4000);
        }
    }

    return (
        <>
            {isMainLoader ?
                <div className='d-flex align-items-center'>
                    <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                        <ImSpinner4 className='text-theam fs-5' />
                    </div>
                    <span>Loading Data</span>
                </div>
                :
                testimonialData.length !== 0 ?
                    <div className="w-100 pb-md-5 pb-3">
                        <table className='w-100 border border-theam mb-auto'>
                            <thead>
                                <tr className='bg-theam'>
                                    <th className='py-2 text-white border-end text-center px-2'>Date</th>
                                    <th className='py-2 text-white border-end text-center px-2'>Name</th>
                                    <th className='py-2 text-white border-end text-center px-2'>Rating</th>
                                    <th className='py-2 text-white border-end text-center px-2' style={{ minWidth: '400px' }}>Message</th>
                                    <th className='py-2 text-white text-center px-4'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {testimonialData.map((ele) => {
                                    return (
                                        <tr key={ele._id} className='border-bottom last-child-no-border'>
                                            <td className='py-1 px-2 border-end text-center'> {toSimpleDate(ele.createdAt)} </td>
                                            <td className='py-1 px-2 border-end text-center'> {ele.name} </td>
                                            <td className='py-1 px-2 border-end text-center'> {ele.rating} </td>
                                            <td className='py-1 px-2 border-end'> {ele.mess} </td>
                                            <td className='py-1 px-2 text-center'>
                                                <div className="d-flex gap-3 w-100 justify-content-center align-items-center">
                                                    {isFormProcess.status && isFormProcess._id === ele._id ?
                                                        <>
                                                            <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                                                                <ImSpinner4 className='text-theam fs-5' />
                                                            </div>
                                                        </>
                                                        :
                                                        <>
                                                            <button type="button" className='btn-reset lh-1 bg-theam p-2 rounded-circle' onClick={() => { handleChangeStatus(ele._id) }}>
                                                                {ele.status === true ?
                                                                    <FaEye className='text-white' />
                                                                    :
                                                                    <FaEyeSlash className='text-white' />
                                                                }
                                                            </button>

                                                            <button type="button" className='btn-reset lh-1 bg-danger p-2 rounded-circle' onClick={() => { handleDeleteTestimonial(ele._id) }}>
                                                                <FaTrash className='text-white' />
                                                            </button>
                                                        </>
                                                    }
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className='d-block mb-auto'>
                        <span className="fs-4 fw-bold">No Data Found</span>
                    </div>
            }
        </>
    )
}

export default Testimonial