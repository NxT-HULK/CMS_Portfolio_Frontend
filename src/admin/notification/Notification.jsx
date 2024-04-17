import React, { useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { CustomBtn, FirstLetterEffectText } from '../../components/Utility'
import JoditEditor from 'jodit-react'
import { HiDocumentArrowUp } from 'react-icons/hi2'

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
            let raw = await fetch(`${backendHost}/notify`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify({
                    mess: editorValue
                })
            })

            let data = await raw.json()

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
            setResponseData({
                isLoading: false,
                heading: "Error",
                message: error
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
            await fetch(`${backendHost}/notify`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                }
            })

            setNotify({
                ...notify,
                mess: ""
            })
        }
    }

    useEffect(() => {

        if (notify?.mess?.length > 0) { 
            setEditorValue(notify?.mess)
        }

    }, [notify?.mess])


    return (
        <div className='container mb-auto mt-4'>
            <div className='mb-3'>
                <button type="button" className="btn btn-danger d-flex align-items-center gap-1 py-1" onClick={() => { handleDelete() }}>
                    <FaTrash />
                    Delete Notification
                </button>
            </div>

            <div className='d-flex flex-wrap gap-md-0 gap-3'>
                <div className="col-md-6 pe-md-2 pe-0">
                    <div className='bg-light p-3 rounded-2 border shadow-sm'>
                        <FirstLetterEffectText text={'Current Notification'} className={'mb-3'} />
                        <div className='bg-white p-2 border rounded-2' dangerouslySetInnerHTML={{ __html: notify?.mess }}></div>
                    </div>
                </div>

                <div className="col-md-6 ps-md-2 ps-0">
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
            </div>
        </div>
    )

}

export default Notification