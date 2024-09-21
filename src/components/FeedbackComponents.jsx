import React, { useContext, useEffect, useMemo, useState } from 'react'
import Modal from 'react-bootstrap/Modal';
import DataContext from '../context/data/DataContext';
import dateFormat from 'dateformat'
import axios from 'axios';
import { LoadingDataSpinner } from './Utility';
import { MdDeleteForever } from 'react-icons/md';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import {Link} from 'react-router-dom'

export const FeedbackCard = ({ name, desig, date, para, index, adminMode, statusFlag, feedbackId, setRenderData, projectId }) => {

    const colors = useMemo(() => ["#4285f4", "#0f9d58", "#f4b400", "#DB4437"], [])
    
    const { backendHost, setResponseStatus, setResponseData } = useContext(DataContext)

    const handleUpdateStatus = async (feedbackId, updateFlag) => {
        try {
            setResponseStatus(true)
            setResponseData({
                isLoading: true,
                heading: "Updating status",
                message: ""
            })

            const fetching = await axios.put(`${backendHost}/api/admin/feedback`, { feedbackId, updateFlag }, { withCredentials: true })
            if (fetching?.status === 200) {
                setRenderData((prev) => {
                    prev?.map((ele) => {
                        if (ele[Object.keys(ele)]?.feedback?.find((inner) => inner?._id === feedbackId)) {
                            let obj = ele[Object.keys(ele)]?.feedback?.find((inner) => inner?._id === feedbackId)
                            obj.status = updateFlag
                            return obj
                        } else {
                            return ele
                        }
                    })

                    return prev
                })

                setResponseData({
                    isLoading: false,
                    heading: "Updating status",
                    message: "Feedback succefully updated"
                })
            }

        } catch (error) {

            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: "Error",
                message: error?.response?.data ?? error.message
            })

            console.log(error);
        }
    }

    const handleDelete = async (feedbackId, projectId) => {
        const cnf = window.confirm("Are you sure want to delete")
        if (cnf === true) {
            try {

                setResponseStatus(true)
                setResponseData({
                    isLoading: true,
                    heading: "Deleting Feedback"
                })

                const fetching = await axios.post(`${backendHost}/api/admin/feedback/delete`, { id: feedbackId, projectId: projectId }, { withCredentials: true })

                if (fetching?.status === 200) {
                    setRenderData((prev) => {
                        const obj = prev?.map((ele) => {
                            if (ele[Object.keys(ele)]?.feedback?.find((inner) => inner?._id === feedbackId)) {
                                let obj = ele[Object.keys(ele)]
                                obj.feedback = ele[Object.keys(ele)]?.feedback?.filter((inner) => inner?._id !== feedbackId)

                                return { [Object.keys(ele)]: obj }
                            } else {
                                return ele
                            }
                        })

                        return obj
                    })

                    setRenderData((prev) => {
                        return prev.filter((ele) => {
                            let key = Object.keys(ele)
                            if (ele[key]?.feedback?.length > 0)
                                return true
                            return false
                        })
                    })

                    setResponseData({
                        isLoading: false,
                        heading: "Delete Success",
                        message: fetching?.data
                    })
                }

            } catch (error) {
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: "Error",
                    message: error?.response?.data ?? error?.message
                })
            }
        }
    }

    return (
        <div className='py-2 px-3 rounded shadow-sm col-12 user-select-none d-flex flex-wrap-reverse' style={{ backgroundColor: colors[index % colors?.length] }}>
            <div className={`col-12`}>
                <div className="d-flex flex-wrap align-items-center justify-content-between gap-md-0 gap-1 border-bottom col-12">
                    <div className='d-flex gap-1 align-items-md-center col-md-8 col-12 flex-md-row flex-column'>
                        <p className="m-0 text-truncate fs-5 fw-semibold text-white text-capitalize">{name}</p>
                        <p className="m-0 fw-medium text-white text-capitalize d-inline-block mt-1 d-md-block d-none">({desig})</p>
                    </div>
                    <div className='col-md-4 d-flex justify-content-md-end'>
                        <span className='lh-1 mb-1 fst-italic text-white small fw-light d-md-block d-none'> Added on {dateFormat(date, "dS, mmmm yyyy")} </span>
                    </div>
                </div>
                <div className='mt-2'>
                    <p className="m-0 text-white fst-italic small">{para}</p>
                </div>
            </div>

            {adminMode === true &&
                <div className={`d-flex gap-3 col-md-12 col-2 align-items-start mb-2`}>
                    <button type="button" className='btn-reset lh-1 bg-danger text-white p-2 rounded-circle' onClick={() => handleDelete(feedbackId, projectId)}>
                        <MdDeleteForever />
                    </button>

                    <button type="button" className='btn-reset lh-1 bg-white text-primary p-2 rounded-circle' onClick={() => handleUpdateStatus(feedbackId, !statusFlag)}>
                        {statusFlag === true ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                </div>
            }
        </div>
    )
}

const FeedbackComponents = () => {

    const { feedbackModal, setFeedbackModal, backendHost, feedbackAdminMode, currFeedbackProjectId } = useContext(DataContext)
    const [isLoading, setIsLoading] = useState(null)
    const [allFeedback, setAllFeedback] = useState([])

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {

                if (currFeedbackProjectId === null) return;
                const fetching = await axios.get(`${backendHost}/api/${feedbackAdminMode === true ? 'admin' : 'client'}/feedback?projectId=${currFeedbackProjectId}`)
                if (fetching?.status === 200) {
                    setAllFeedback(fetching?.data)
                }

            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        })();
    }, [currFeedbackProjectId, backendHost, feedbackAdminMode])

    return (
        <Modal scrollable={true} size='xl' style={{ backdropFilter: 'blur(10px)' }} show={feedbackModal?.show} onHide={() => { setFeedbackModal((prev) => { return { ...prev, show: false } }) }}>
            <Modal.Header className="bg-theam py-1 rounded-top-1 ps-3 pe-2" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} closeButton>
                <Modal.Title className='modal-title fs-5 text-white text-capitalize'>{feedbackModal?.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="d-flex flex-wrap gap-3 w-100">
                    {isLoading === true ?
                        <LoadingDataSpinner className={'text-theam'} />
                        :
                        allFeedback.map((ele, idx) => {
                            return (
                                <FeedbackCard key={ele?._id} index={idx} name={ele?.name} desig={ele?.designation} date={ele?.updatedAt} para={ele?.remark} />
                            )
                        })
                    }
                </div>

                {isLoading === false && allFeedback?.length === 0 &&
                    <span className='fst-italic'>Apologies, there are currently no feedback entries to display.</span>
                }

                <div className="mt-4" onClick={() => {setFeedbackModal({})}}>
                    <p className="mb-0 small">If you'd like to share your review of this project, feel free to proceed by <Link to={`/feedback?projectId=${feedbackModal?.id}`}>clicking the here.</Link></p>
                </div>
            </Modal.Body>
        </Modal >
    )
}

export default FeedbackComponents