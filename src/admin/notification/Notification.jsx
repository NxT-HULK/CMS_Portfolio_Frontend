import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { CustomBtn, FirstLetterEffectText } from '../../components/Utility'
import JoditEditor from 'jodit-react'
import { HiDocumentArrowUp } from 'react-icons/hi2'
import axios from 'axios'

const Notification = ({
    DataContext
}) => {

    const [editorValue, setEditorValue] = useState()
    const { notify, setResponseStatus, setResponseData, backendHost, setNotify } = DataContext

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setResponseStatus(true)
        setResponseData({
            isLoading: true,
            heading: "Setting up Notification"
        })

        try {
            const raw = await axios.post(`${backendHost}/api/admin/notification`, {
                mess: editorValue
            }, { withCredentials: true })

            let data = raw?.data

            if (raw.status === 201) {
                setResponseData({
                    isLoading: false,
                    heading: "Form Response",
                    message: data?.mess
                })

                setNotify(data)
                setEditorValue(data?.mess)
            } else {
                setResponseData({
                    isLoading: false,
                    heading: "Form Response",
                    message: data
                })
            }

        } catch (error) {
            console.error(error)
            setResponseData({
                isLoading: false,
                heading: "Error",
                message: error?.response?.data
            })
        } finally {
            setTimeout(() => {
                setResponseData({})
                setResponseStatus(false)
            }, 10000);
        }
    }

    const handleDelete = async () => {
        let cnf = window.confirm('Are you sure to remove notification')
        if (cnf === true) {
            const fetch = await axios.delete(`${backendHost}/api/admin/notification`, { withCredentials: true })
            if (fetch.status === 200) {
                setEditorValue("")
                setNotify({ ...notify, mess: "" })
            }
        }
    }

    useEffect(() => {
        if (notify?.mess?.length > 0) {
            setEditorValue(notify?.mess)
        }
    }, [notify?.mess])


    return (
        <div className='mb-auto w-100'>
            <div className='mb-3'>
                <button type="button" className="btn btn-danger d-flex align-items-center gap-1 py-1" onClick={handleDelete}>
                    <FaTrash />
                    Delete Notification
                </button>
            </div>

            <div className='d-flex flex-wrap gap-md-0 gap-3'>
                <div className="col-md-6 pe-md-2 pe-0">
                    <form onSubmit={(e) => { handleFormSubmit(e) }}>
                        <div className="d-flex flex-wrap gap-3">
                            <div className="col-12">
                                <JoditEditor value={editorValue} onChange={(value) => setEditorValue(value)} />
                            </div>
                        </div>

                        <div className='d-flex justify-content-md-center my-3'>
                            <CustomBtn text="Set Notification" icon={<HiDocumentArrowUp />} type={'submit'} />
                        </div>
                    </form>
                </div>
                <div className="col-md-6 ps-md-2 ps-0">
                    <div className='bg-light p-3 rounded-2 border shadow-sm'>
                        {notify?.mess ?
                            <>
                                <FirstLetterEffectText text={'Current Notification'} className={'mb-3'} />
                                <div className='bg-white p-2 border rounded-2' dangerouslySetInnerHTML={{ __html: notify?.mess }}></div>
                            </>
                            :
                            <FirstLetterEffectText text={'No Notification available'} className={'mb-3'} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notification