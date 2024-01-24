import React, { useContext, useEffect, useState } from 'react'
import Testimonial from './Testimonial'
import Contact from './Contact'
import { useNavigate } from 'react-router-dom'
import { ImSpinner4 } from 'react-icons/im'
import DataContext from '../context/data/DataContext'
import { IoMdLogOut } from "react-icons/io";
import Work from './Work'
import FunctionContext from '../context/function/FunctionContext'

const CustomLi = ({ text, index, setWorkspace }) => {
    return (
        <li>
            <button type="button" className="btn-reset" onClick={() => { setWorkspace(index) }}>
                <span className="text-uppercase fw-semibold text-theam"> {text} </span>
            </button>
        </li>
    )
}

const AdminMain = () => {

    const dataContext__variable = useContext(DataContext)
    const { backendHost, getToken } = dataContext__variable

    const functionContext__variable = useContext(FunctionContext)

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

    const menu = ["Testimonial", "Contact", "Work"]

    return (
        <>
            {tokenStatus === true ?
                <>
                    <nav className='w-100 px-3 border-bottom mb-2 position-sticky bg-white top-0 d-flex justify-content-between align-items-center'>
                        <ul className='d-flex gap-3 py-3'>
                            {menu.map((ele, idx) => {
                                return <CustomLi text={ele} index={idx} setWorkspace={setWorkspace} key={`admin-menu-${ele}`} />
                            })}
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
                                    return <Testimonial DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 1:
                                    return <Contact DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                case 2:
                                    return <Work DataContext={dataContext__variable} FunctionContext={functionContext__variable} />

                                default:
                                    return <span> Menu is not linked with switch statement </span>
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