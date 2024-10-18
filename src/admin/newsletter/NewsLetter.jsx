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
                                <tbody>
                                    <tr>
                                        <td>Date</td>
                                        <td>Type</td>
                                        <td>Name</td>
                                        <td>Email</td>
                                        <td>Status</td>
                                    </tr>
                                    {emailData.map((ele, idx) => {
                                        return (
                                            <tr key={`news_letter_email_${idx}`}>
                                                <td> {toSimpleDate(ele.createdAt)} </td>
                                                <td> {ele.type} </td>
                                                <td> {ele.name} </td>
                                                <td> {ele.email} </td>
                                                <td> {JSON.stringify(ele.status)} </td>
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