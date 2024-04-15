import React, { useEffect, useState } from 'react'
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

    const backendHost = "https://backend-portfolio-pous.onrender.com"
    // const backendHost = "http://localhost:5000"

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

    const [isLoadingCourse, setIsLoadingCourse] = useState(false);
    const [courses, setCourses] = useState([])
    useEffect(() => {
        (async () => {
            try {
                setIsLoadingCourse(true)
                const fetching = await fetch(`${backendHost}/course/`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await fetching.json();
                if (fetching.status === 200) {
                    setCourses(data?.courses)
                }
            } catch (error) {
                console.log(error, 'COURSES_LOAD_ERROR');
            } finally {
                setIsLoadingCourse(false);
            }
        })()

    }, []);

    const getCourseModule = async (courseId) => {
        let moduleArr = courses.filter((ele) => { return ele._id === courseId })[0].modules
        let fetching = await fetch(`${backendHost}/course/modules`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                module_arr: moduleArr
            })
        })

        return fetching
    }

    // getting site notification from backend
    const [notify, setNotify] = useState({})
    useEffect(() => {
        (async () => {
            let raw = await fetch(`${backendHost}/notify`, {
                method: 'GET',
                headers: {
                    'content-type': 'application/json'
                }
            })

            let data = await raw.json()
            setNotify(data)
        })();
    }, [backendHost, setNotify])

    return (
        <DataContext.Provider value={{
            socialLinks, informationModalData, setInformationModalData, ToastModalData, setToastModalData,
            responseStatus, setResponseStatus, responseData, setResponseData, backendHost, getToken,
            isLoadingCourse, courses, setCourses, getCourseModule, notify, setNotify
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState