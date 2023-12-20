import React, { useContext } from 'react'
import { IoCloseOutline } from 'react-icons/io5'
import DataContext from '../context/data/DataContext'

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

const BootstrapModal = () => {
    return (
        <>
            <WhatIProvideModal modalId={'testing'} modalTitle={'testing'} />
            <InformationModal />
        </>
    )
}

export default BootstrapModal