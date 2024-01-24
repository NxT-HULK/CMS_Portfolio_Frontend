import React, { useContext } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import DataContext from '../context/data/DataContext'
import { ButtonShaded } from './Utility'
// import { ImSpinner4 } from "react-icons/im";

const WhatIProvideModal = ({ modalId, modalTitle }) => {
    return (
        <>
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true" style={{ backdropFilter: 'blur(5px)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-theam py-1 rounded-top-1" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                            <h1 className="modal-title fs-5 text-white text-capitalize" id={`${modalId}Label`}>{modalTitle}</h1>
                            <button type="button" className="btn-reset" data-bs-dismiss="modal">
                                <IoCloseOutline className='fs-3 text-white' />
                            </button>
                        </div>
                        <div className="modal-body rounded-bottom-1">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab cupiditate esse architecto sequi, reiciendis cumque incidunt. Distinctio assumenda perferendis magni quos consequuntur eos explicabo, ratione adipisci ab, enim quisquam aliquam?
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const InformationModal = () => {

    const { informationModalData } = useContext(DataContext)

    return (
        <>
            <div className="modal fade" id={"informationModal"} tabIndex="-1" aria-labelledby={`informationModalLabel`} aria-hidden="true" style={{ backdropFilter: 'blur(5px)' }}>
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header bg-theam py-1 rounded-top-1" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                            <h1 className="modal-title fs-5 text-white text-capitalize" id="informationModal">{informationModalData.heading}</h1>
                            <button type="button" className="btn-reset" data-bs-dismiss="modal">
                                <IoCloseOutline className='fs-3 text-white' />
                            </button>
                        </div>
                        <div className="modal-body rounded-bottom-1"> {informationModalData.message} </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const NewsLetterSubscribe = () => {
    return (
        <>
            <div className="modal fade" id="subscribeNewsLetter" tabIndex="-1" aria-labelledby={`subscribeNewsLetterLabel`} aria-hidden="true" style={{ backdropFilter: 'blur(5px)' }}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-header bg-theam py-1 rounded-top-1" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                            <h1 className="modal-title fs-5 text-white text-capitalize" id={`subscribeNewsLetterLabel`}>
                                Notification
                            </h1>
                            <button type="button" className="btn-reset" data-bs-dismiss="modal">
                                <IoCloseOutline className='fs-3 text-white' />
                            </button>
                        </div>
                        <div className="modal-body rounded-bottom-1">
                            <form className='rounded-3'>
                                <div className="mb-2 d-flex flex-wrap gap-md-0 gap-2">
                                    <div className="col-md-6 col-12 pe-md-2 pe-0">
                                        <input type="text" className="rounded-1 custom-input-style" placeholder="Your Name*" required />
                                    </div>
                                    <div className="col-md-6 col-12 ps-md-2 ps-0">
                                        <select name="rating" id="testimonial-rating" className='rounded-1 custom-input-style' required>
                                            <option value="" className='d-none'>Subscryption Type*</option>
                                            <option value="all">All</option>
                                            <option value="blogs">Blogs</option>
                                            <option value="Courses">Courses</option>
                                            <option value="projects">Projects</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-2">
                                    <input type="email" className="rounded-1 custom-input-style" placeholder="youremail@domain.com*" required />
                                </div>
                                <ButtonShaded text={`subscribe now`} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const ResponseBox = () => {

    const { responseStatus, responseData, setResponseStatus } = useContext(DataContext)

    return (
        <>
            <div className={`${responseStatus === true ? 'd-block' : 'd-none'} position-fixed vh-100 w-100`} style={{ background: '#00000090', backdropFilter: 'blur(10px)', zIndex: '10' }}>
                <div className="container d-flex align-items-center justify-content-center h-100">
                    <div className="col-md-7 col-12">
                        <div className="modal-content">
                            <div className="modal-header bg-theam py-1 rounded-top-1 ps-3 pe-2" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
                                <h1 className="modal-title fs-5 text-white text-capitalize" id="informationModal">{responseData.heading}</h1>
                                <button type="button" className="btn-reset" onClick={() => { setResponseStatus(false) }}>
                                    <IoCloseOutline className='fs-3 text-white' />
                                </button>
                            </div>
                            <div className="modal-body rounded-bottom-1 bg-white p-3">

                                <div className="d-flex justify-content-center align-items-center">
                                    {responseData.isLoading === true &&
                                        <>
                                            <div className="spinner-border text-secondary" role="status">
                                                <span className="visually-hidden">Loading...</span>
                                            </div>
                                            <span className='ms-2 fw-semibold fs-5 text-secondary'>Sending</span>
                                        </>
                                    }
                                </div>

                                {!responseData.isLoading && responseData.message &&
                                    <div dangerouslySetInnerHTML={{ __html: responseData.message }}></div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const BootstrapModal = () => {
    return (
        <>
            <WhatIProvideModal modalId={'testing'} modalTitle={'testing'} />
            <InformationModal />
            <NewsLetterSubscribe />
            <ResponseBox />
        </>
    )
}

export default BootstrapModal