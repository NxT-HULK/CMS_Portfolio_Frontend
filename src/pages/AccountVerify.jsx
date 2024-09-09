import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DataContext from '../context/data/DataContext'

const AccountVerify = () => {

    const navigate = useNavigate()
    const [params] = useSearchParams()
    const { backendHost } = useContext(DataContext)
    const [isProcess, setIsProcess] = useState("unset")

    useEffect(() => {
        if (!params.get('email') && params.get('authority')) {
            navigate("/")
        } else {
            (async () => {
                try {
                    setIsProcess(true)
                    const fetching = await axios.post(`${backendHost}/api/admin/verify`, {
                        email: params.get("email")
                    }, { withCredentials: true })

                    if (fetching.status === 200) {
                        setIsProcess("Account Verified")
                        setTimeout(() => {
                            setIsProcess("Redirect")
                        }, 2000);
                    }
                } catch (error) {
                    console.error(error);
                }
            })();
        }

    }, [params, backendHost, navigate])


    useEffect(() => {
        if (isProcess === "Redirect") {
            navigate("/admin")
        }
    }, [isProcess, navigate])


    return (
        <section className='my-5 py-5'>
            <div className="container d-flex justify-content-center align-items-center">

                {isProcess === "unset" &&
                    <span>Form Initiating...</span>
                }

                {isProcess === true &&
                    <span>Form Initiated...</span>
                }

                {isProcess === "Account Verified" &&
                    <span>Accout Verified...</span>
                }

                {isProcess === "Redirect" &&
                    <span>Redirecting to Admin Panel...</span>
                }
            </div>
        </section>
    )
}

export default AccountVerify