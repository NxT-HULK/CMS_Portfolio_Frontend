import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import DataContext from '../context/data/DataContext'
import axios from 'axios'

const Unsubscribe = () => {

    const { setResponseStatus, setResponseData, backendHost } = useContext(DataContext)
    const [params] = useSearchParams()
    const email = params.get('email')

    const navigate = useNavigate()
    useEffect(() => {
        if (!email) {
            navigate("/")
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                navigate("/")
            }
        }
    }, [email, navigate])


    const [confirm, setConfirm] = useState()
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        if (confirm.toLowerCase() !== "unsubscribe now") {
            setResponseStatus(true);
            setResponseData({
                isLoading: false,
                heading: "Error",
                message: "Type 'Unsubscribe Now' to confirm"
            })

            return;
        }

        setResponseStatus(true);
        setResponseData({
            isLoading: true,
            heading: "Unsubscribing From Newsletter",
            message: ""
        })

        try {
            let fetch = await axios.post(`${backendHost}/api/client/news/unsubscribe`, { email })
            if (fetch.status === 200) {
                setResponseData({
                    isLoading: false,
                    heading: "Unsubscribing From Newsletter",
                    message: fetch?.data
                })

                e.target.reset()

                setTimeout(() => {
                    navigate("/")
                }, 3000);
            }
        } catch (error) {
            if (error.status === 404) {                
                setResponseData({
                    isLoading: false,
                    heading: "Error",
                    message: error?.response?.data
                })
            } else { 
                setResponseData({
                    isLoading: false,
                    heading: "Error",
                    message: "Server error! Please try after some time"
                })
            }
        } finally {
            setTimeout(() => {
                setResponseStatus(false);
                setResponseData({})
            }, 3000);
        }
    }

    return (
        <section className='w-100 my-5 pt-3 pb-5'>
            <div class="container">
                <span class="fs-3 text-theam fw-semibold d-block mb-2 border-bottom">Are you sure ?</span>
                <p class="lh-sm">After <span class="fw-semibold">unsubscribing,</span> you won't receive the latest<br />Information from <span class="fw-semibold">Shivam Kashyap</span>.</p>
            </div>

            <div class="container mt-4">
                <div class="col-md-6 col-12">
                    <form onSubmit={handleSubmitForm}>
                        <div class="col-12 pe-md-2 pe-0 mb-3">
                            <input
                                type="text"
                                name="text"
                                class="rounded-1 custom-input-style"
                                placeholder="Type 'Unsubscribe Now' to confirm*"
                                required
                                onChange={(e) => setConfirm(e.target.value)}
                            />
                        </div>
                        <div class="col-12 pe-md-2 pe-0 mt-2">
                            <button id="submit_btn" type="submit" class="simleButton-with-shaded px-3 width-fit">Unsubscribe Now</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Unsubscribe