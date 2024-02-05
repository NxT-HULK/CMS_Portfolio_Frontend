import React, { useEffect, useState } from 'react'
import { FaRegNewspaper } from 'react-icons/fa'
import { ImSpinner4 } from 'react-icons/im'

const NewsLetter = ({ DataContext, FunctionContext, setWorkspace }) => {

    const { backendHost } = DataContext
    const { toSimpleDate } = FunctionContext

    const [isLoading, setIsLoading] = useState(true)
    const [emailData, setEmailData] = useState([])
    useEffect(() => {
        (async () => {
            let raw = await fetch(`${backendHost}/news`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'Application/json'
                }
            })

            let data = await raw.json()
            data.sort((a, b) => { return new Date(b.createdAt) - new Date(a.createdAt) })

            setEmailData(data)
            setIsLoading(false)
        })()
    }, [backendHost])

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
                    <div className="w-100 my-4 d-block">
                        <button type="button" className='simleButton-with-shaded width-fit px-2' onClick={() => { setWorkspace('send_mail') }}>
                            <FaRegNewspaper className='text-white me-1' />
                            Mail Newsletter
                        </button>
                    </div>

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
                </>
            }
        </>
    )
}

export default NewsLetter