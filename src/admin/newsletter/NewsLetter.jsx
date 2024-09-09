import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ImSpinner4 } from 'react-icons/im'

const NewsLetter = ({ DataContext, FunctionContext }) => {

    const { backendHost, setResponseStatus, setResponseData } = DataContext
    const { toSimpleDate } = FunctionContext

    const [isLoading, setIsLoading] = useState(true)
    const [emailData, setEmailData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const raw = await axios.get(`${backendHost}/api/admin/news`, { withCredentials: true })
                raw?.data.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })
                setEmailData(raw?.data)
                setIsLoading(false)
            } catch (error) {
                if (error.status === 400) {
                    setResponseStatus(true)
                    setResponseData({
                        isLoading: false,
                        heading: "Authority Error",
                        message: error?.response?.data ?? "Server Error"
                    })
                    setIsLoading(false)
                }
                console.error(error);
            }
        })()
    }, [backendHost, setResponseData, setResponseStatus])

    return (
        <>
            {isLoading ?
                <div className='d-flex align-items-center'>
                    <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                        <ImSpinner4 className='text-theam fs-5' />
                    </div>
                    <span>Loading Data</span>
                </div>
                :
                <>
                    {emailData.length !== 0 ?
                        <div className="w-100 d-block mb-auto">
                            <table className='w-100 border border-theam'>
                                <thead>
                                    <tr className='bg-theam'>
                                        <th className='py-2 text-white border-end text-center px-2'>Date</th>
                                        <th className='py-2 text-white border-end text-center px-2'>Type</th>
                                        <th className='py-2 text-white border-end text-center px-2'>Name</th>
                                        <th className='py-2 text-white border-end text-center px-2'>Email</th>
                                        <th className='py-2 text-white border-end text-center px-2'>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {emailData.map((ele, idx) => {
                                        return (
                                            <tr className='border-bottom last-child-no-border' key={`news_letter_email_${idx}`}>
                                                <td className='py-1 px-2 border-end text-center'> {toSimpleDate(ele.createdAt)} </td>
                                                <td className='py-1 px-2 border-end text-center text-capitalize'> {ele.type} </td>
                                                <td className='py-1 px-2 border-end text-center'> {ele.name} </td>
                                                <td className='py-1 px-2 border-end'> {ele.email} </td>
                                                <td className='py-1 px-2 border-end text-center text-capitalize'> {JSON.stringify(ele.status)} </td>
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
            }
        </>
    )
}

export default NewsLetter