import React, { useState } from 'react'
import DataContext from './DataContext'

const DataState = (props) => {

    const socialLinks = {
        linkedin: "https://www.linkedin.com/in/shivam-kumar-kashyap-382794249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        insta: "https://www.instagram.com/nxt_hulk/",
        facebook: "https://www.facebook.com/shivam.shivam.75033",
        github: "https://github.com/MernWala",
        mail: "mailto:shivamkumarkashyap12@gmail.com",
        resume: "https://flowcv.com/resume/e1kgees3rk"
    }

    const [informationModalData, setInformationModalData] = useState({
        heading: "",
        message: ""
    })

    const [ToastModalData, setToastModalData] = useState({
        time: 5,
        multipliedBy: 20,
        message: ''
    })

    // const backendHost = "https://backend-portfolio-pous.onrender.com"
    const backendHost = "http://localhost:5000"

    const [responseStatus, setResponseStatus] = useState(false)
    const [responseData, setResponseData] = useState({
        isLoading: false,
        heading: "Sending Testimonial Message",
        message: ""
    })

    const getToken = async () => {
        try {
            const data = localStorage.getItem('auth-token');

            if (!data) {
                throw new Error('No Token Found');
            }

            const raw = await fetch(`${backendHost}/admin/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: data,
                }),
            });

            if (!raw.ok) {
                throw new Error(`Error verifying token: ${raw.statusText}`);
            }

            const response = await raw.json();

            if (response === 'Admin Verified') {
                return 'OK';
            } else {
                throw new Error('Invalid Token');
            }
        } catch (error) {
            throw error;
        }
    };

    return (
        <DataContext.Provider value={{
            socialLinks, informationModalData, setInformationModalData, ToastModalData, setToastModalData,
            responseStatus, setResponseStatus, responseData, setResponseData, backendHost, getToken,
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState