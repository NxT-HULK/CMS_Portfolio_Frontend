import React, { useContext, useEffect, useState } from 'react'
import Testimonial from './Testimonial'
import Contact from './Contact'
import { useNavigate } from 'react-router-dom'
import { ImSpinner4 } from 'react-icons/im'
import DataContext from '../context/data/DataContext'
import { IoMdLogOut } from "react-icons/io";

const AdminMain = () => {

    const { backendHost, getToken } = useContext(DataContext)
    const [workspace, setWorkspace] = useState(0)
    const navigate = useNavigate("")
    const [tokenStatus, setTokenStatus] = useState(false)

    useEffect(() => {
        const gettingToken = async () => {
            try {
                let response = await getToken()
                if (response === "OK") {
                    navigate('/admin')
                    setTokenStatus(true)
                } else {
                    navigate('/auth')
                }
            } catch (error) {
                navigate('/auth')
                setTokenStatus(false)
            }
        }

        (async () => {
            await gettingToken()
        })()
    }, [getToken, navigate, backendHost])

    const handleLogoutAdmin = () => { 
        localStorage.removeItem('auth-token')
        navigate('/auth')
    }

    return (
        <>
            {tokenStatus === true ?
                <>
                    <nav className='w-100 px-3 border-bottom mb-2 position-sticky bg-white top-0 d-flex justify-content-between align-items-center'>
                        <ul className='d-flex gap-3 py-3'>
                            <li>
                                <button type="button" className="btn-reset" onClick={() => { setWorkspace(0) }}>
                                    <span className="text-uppercase fw-semibold text-theam"> Testimonial </span>
                                </button>
                            </li>
                            <li>
                                <button type="button" className="btn-reset" onClick={() => { setWorkspace(1) }}>
                                    <span className="text-uppercase fw-semibold text-theam"> Contact </span>
                                </button>
                            </li>
                        </ul>

                        <button type="button" className='btn-reset d-flex align-items-center bg-danger px-2 py-1 rounded-1' onClick={handleLogoutAdmin}>
                            <IoMdLogOut className='text-white fs-4' />
                            <span className='text-white'>Logout</span>
                        </button>
                    </nav>

                    <div className="container d-flex align-items-center justify-content-center flex-column mb-5" style={{ minHeight: '50vh' }}>
                        {(() => {
                            switch (workspace) {
                                case 0:
                                    return <Testimonial />

                                case 1:
                                    return <Contact />

                                default:
                                    return <span> Undefined Input </span>
                            }
                        })()}
                    </div>
                </>
                :
                <>
                    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                        <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                            <ImSpinner4 className='text-theam fs-5' />
                        </div>
                        <span>Verifying Admin</span>
                    </div>
                </>
            }
        </>
    )
}

export default AdminMain