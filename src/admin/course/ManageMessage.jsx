import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { ImSpinner4, ImSpinner5 } from 'react-icons/im'
import { CustomBtn, FirstLetterEffectText2 } from '../../components/Utility'
import { formatDistance } from 'date-fns'
import { MdDelete, MdOutlineReply } from 'react-icons/md'
import Modal from 'react-bootstrap/Modal';
import JoditEditor from 'jodit-react'
import { IoIosSend } from 'react-icons/io'
import { FaCircleCheck } from 'react-icons/fa6'
import { IoCloseCircleSharp } from "react-icons/io5";

const MessageContainer = (props) => {

    const [openState, setOpenState] = useState(false)
    return (
        <div className='col-12'>
            <div
                className={`
                    p-3 border rounded bg-body-tertiary shadow-sm d-flex align-items-center 
                    justify-content-between user-select-none cursor-pointer col-12
                    ${openState === true && 'rounded-bottom-0'}
                `}
                onClick={() => setOpenState(!openState)}
            >
                <span className='d-block col-11 text-truncate fw-medium fs-5'>
                    <FirstLetterEffectText2 text={props?.pageName ?? ''} />
                </span>
                <button
                    type="button"
                    className={`text-white btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center lh-1`}
                    style={{ height: '35px', width: '35px' }}
                >
                    {openState === true ?
                        <FaAngleUp />
                        :
                        <FaAngleDown className='mt-1' />
                    }
                </button>
            </div>
            {openState === true &&
                <div className='p-3 bg-body-tertiary border rounded border-top-0 rounded-top-0'>
                    {props?.children}
                </div>
            }
        </div>
    )
}

const MessageBox = ({ createdAt, handleModalState, _id, isDeleting, handleDeleteMessage, mess, name, reply, email }) => {
    return (
        <div className='d-flex flex-nowrap col-12'>
            <div className='p-2 bg-white shadow-sm rounded border rounded-end-0 w-100'>
                <div className='mb-1 border-bottom border-opacity-100 pb-1 d-flex flex-wrap align-items-center justify-content-between col-12'>
                    <span className='d-block col-md-6 col-12 text-truncate'>
                        <FirstLetterEffectText2 text={name ?? ''} className={"fw-medium"} />
                    </span>
                    <span className='d-block col-md-6 col-12 text-truncate d-flex align-items-center justify-content-md-end justify-content-start'>
                        <span style={{ fontSize: '14px' }}>Posted at {formatDistance(createdAt || new Date(), new Date(), { addSuffix: true })}</span>
                    </span>
                </div>
                <div>
                    <div dangerouslySetInnerHTML={{ __html: mess }}></div>
                    {reply?.length > 0 &&
                        <>
                            <div className="my-2 border-top border-opacity-25"></div>
                            <div dangerouslySetInnerHTML={{ __html: reply }}></div>
                        </>
                    }
                </div>
            </div>
            <div className='p-2 bg-white border rounded rounded-start-0 border-start-0 d-flex align-items-center justify-content-center' style={{ minWidth: '60px' }}>
                <div>
                    {!reply &&
                        <button
                            type="button"
                            className={`text-white btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center lh-1 mb-4`}
                            style={{ height: '35px', width: '35px' }}
                            onClick={() => handleModalState(_id, email, name)}
                        >
                            <MdOutlineReply />
                        </button>
                    }
                    <button
                        type="button"
                        className={`text-white btn-reset bg-danger rounded-circle d-flex align-items-center justify-content-center lh-1`}
                        style={{ height: '35px', width: '35px' }}
                        onClick={() => handleDeleteMessage(_id)}
                    >
                        {isDeleting?.flag === true && isDeleting?.id === _id ?
                            <ImSpinner4 className='text-theam fs-5' />
                            :
                            <MdDelete />
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

const ManageMessage = ({ DataContext, FunctionContext }) => {

    const { backendHost, setResponseStatus, setResponseData } = DataContext
    const { handleOnChange } = FunctionContext

    const [isLoading, setIsLoading] = useState(null)
    const [messageData, setMessageData] = useState(null)
    useEffect(() => {
        (async () => {
            try {

                setIsLoading(true)
                const fetching = await axios.get(`${backendHost}/api/admin/course/ask`, {
                    withCredentials: true
                })

                if (fetching?.status === 200) {
                    setMessageData(fetching?.data)
                    setIsLoading(false)
                }

            } catch (error) {

                if (error?.response?.status !== 404) {
                    setResponseStatus(true)
                    setResponseData({
                        isLoading: false,
                        heading: `Error - ${error?.response?.status}`,
                        message: error?.response?.data
                    })
                } else {
                    setMessageData([])
                }

                console.error(error)
                setIsLoading(false)
            }
        })();
    }, [backendHost])

    const [replyFormData, setReplyFormData] = useState(null)
    const [modalState, setModalState] = useState({
        flag: false,
        id: null,
        email: null,
        receiverName: '',
        status: null
    })

    const handleModalState = (id, email, receiverName) => {
        setModalState({ flag: true, email, id, receiverName })
    }

    const [isDeleting, setIsDeleting] = useState({
        flag: false,
        id: null
    })

    const handleDeleteMessage = async (id) => {
        try {
            setIsDeleting({
                flag: true,
                id: id
            })

            const fetching = await axios.delete(`${backendHost}/api/admin/course/ask/${id}`, { withCredentials: true })
            if (fetching?.status === 200) {
                setMessageData(prev => {
                    return prev.map(page => {
                        if (page?._id === fetching?.data?.pageId)
                            return { ...page, message: page?.message?.filter(mess => mess?._id !== fetching?.data?.messageId) }
                        return page
                    }).filter(page => page?.message?.length > 0)
                })
            }

        } catch (error) {

            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: `Error - ${error?.response?.status}`,
                message: error?.response?.data ?? error?.message
            })

        } finally {
            setIsDeleting({ flag: false })
        }
    }

    const [isReplying, setIsReplying] = useState({
        flag: false,
        id: null
    })

    const handleReplyMessage = async (e, id, email) => {
        e.preventDefault()
        setIsReplying({
            flag: true,
            id: id
        })

        try {

            const fetching = await axios.post(`${backendHost}/api/admin/course/ask`, {
                messageId: id,
                mailFlag: replyFormData?.mailFlag ?? false,
                email: email,
                subject: replyFormData?.subject,
                mailData: replyFormData?.mailData,
                reply: replyFormData?.reply,
            }, { withCredentials: true })

            if (fetching?.status === 200) {
                setMessageData(prev => {
                    return prev?.map(page => {
                        return page?._id === fetching?.data?.pageId ? {
                            ...page,
                            message: page?.message?.map(mess =>
                                mess?._id === fetching?.data?.messageId ?
                                    { ...mess, reply: replyFormData?.reply }
                                    : mess
                            )
                        } : page
                    })
                })

                setModalState({ ...modalState, status: true })
            }

        } catch (error) {
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: `Error - ${error?.response?.status}`,
                message: error?.response?.data
            })
            console.error(error)
            setModalState({ ...modalState, status: false })
        } finally {
            setIsReplying({
                flag: false,
                id: null
            })
        }
    }

    return isLoading ?
        <div className='d-flex align-items-center'>
            <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                <ImSpinner4 className='text-theam fs-5' />
            </div>
            <span>Loading Data</span>
        </div>
        :
        <>
            <Modal show={modalState?.flag} onHide={() => setModalState({ ...modalState, flag: false })} size='xl' centered={true} scrollable={true}>
                <Modal.Header closeButton className='py-2 bg-theam border-0'>
                    <Modal.Title className='fs-5 fw-medium text-white'>Send Reply - {modalState?.receiverName} </Modal.Title>
                </Modal.Header>
                <Modal.Body className='border-0'>
                    {modalState?.status ?
                        modalState?.status === true ?
                            <span>
                                <FaCircleCheck size={40} className='text-theam' /> Form submitted success
                            </span>
                            :
                            <span>
                                <IoCloseCircleSharp size={40} className='text-theam' /> Failed! Please try after some time
                            </span>
                        :
                        <form onSubmit={(e) => handleReplyMessage(e, modalState?.id, modalState?.email)}>
                            <div className='d-flex gap-1 mb-2 '>
                                <input type="checkbox" name="mailFlag" id="mailFlag" onChange={(e) => setReplyFormData(prev => { return { ...prev, mailFlag: e.target.checked } })} />
                                <label htmlFor="mailFlag" className="m-0 form-label">Send Mail</label>
                            </div>

                            <div className='mb-4'>
                                <JoditEditor
                                    value={replyFormData?.reply ?? ''}
                                    onBlur={(value) => setReplyFormData({ ...replyFormData, reply: value })}
                                    config={{
                                        placeholder: "Put content for reply"
                                    }}
                                />
                            </div>

                            {replyFormData?.mailFlag === true &&
                                <div className="mb-4">
                                    <div className='mb-4'>
                                        <input type="text" name="subject" onChange={(e) => handleOnChange(e, replyFormData, setReplyFormData)} />
                                    </div>

                                    <JoditEditor
                                        value={replyFormData?.mailData ?? ''}
                                        onBlur={(value) => setReplyFormData({ ...replyFormData, mailData: value })}
                                        config={{
                                            placeholder: "Put content for email"
                                        }}
                                    />
                                </div>
                            }

                            <div className='d-flex align-items-center justify-content-center mb-3'>
                                <CustomBtn type="submit" text="Send Reply" disabled={isReplying?.flag} className={isReplying?.flag === true && 'opacity-50'} icon={<>
                                    {isReplying?.flag === true ?
                                        <div className={`spinner-border border-0 d-flex align-items-center justify-content-center`} style={{ height: 'unset', width: 'unset' }}>
                                            <ImSpinner5 />
                                        </div>
                                        :
                                        <IoIosSend />
                                    }
                                </>} />
                            </div>
                        </form>
                    }
                </Modal.Body>
            </Modal>

            <div className="d-flex flex-wrap gap-3">
                {messageData?.map(page => {
                    return (
                        <MessageContainer pageName={page?.name} pageId={page?._id} key={page?._id}>
                            <div className='d-flex flex-wrap gap-4'>
                                {page?.message?.map(mess => {
                                    return (
                                        <MessageBox key={mess?._id}
                                            createdAt={mess?.createdAt} handleModalState={handleModalState} _id={mess?._id} email={mess?.email} isDeleting={isDeleting} handleDeleteMessage={handleDeleteMessage} mess={mess?.mess} name={mess?.name} reply={mess?.reply}
                                        />
                                    )
                                })}
                            </div>
                        </MessageContainer>
                    )
                })}
            </div>

            {messageData?.length === 0 &&
                <span>No data to show</span>
            }
        </>
}

export default ManageMessage