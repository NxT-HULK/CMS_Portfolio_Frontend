import React, { useEffect, useState } from 'react'
import DataContext from './DataContext'
import axios from 'axios'

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
    // const backendHost = "http://192.168.43.41:5000"

    const [responseStatus, setResponseStatus] = useState(false)
    const [responseData, setResponseData] = useState({
        isLoading: false,
        heading: "Sending Testimonial Message",
        message: ""
    })

    const [isLoadingCourse, setIsLoadingCourse] = useState(false);
    const [courses, setCourses] = useState([])
    useEffect(() => {
        (async () => {
            try {
                setIsLoadingCourse(true)
                let fetching = await axios.get(`${backendHost}/api/client/course`)
                if (fetching.status === 200) {
                    setCourses(fetching?.data)
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
        let fetching = await axios.post(`${backendHost}/api/client/course/modules`, {
            module_arr: moduleArr
        })

        if (fetching?.status === 200) {
            return fetching?.data
        } else {
            return null
        }
    }

    // getting site notification from backend
    const [notify, setNotify] = useState({})
    useEffect(() => {
        (async () => {
            try {
                let raw = await axios.get(`${backendHost}/api/client/notification`)

                if (raw.status === 200) {
                    let data = raw?.data
                    if (raw?.status === 200) {
                        setNotify(data)
                    }
                } else {
                    setNotify(null)
                }
            } catch (error) {
                setNotify(null)
            }
        })();
    }, [backendHost, setNotify])

    const [courseLearning_offCanvasFlag, setCourseLearning_offCanvasFlag] = useState(false)

    const noNav = ["", "work", "course", "coursedetails", "courselearning", "blogs", "contact", "editor", "unsubscribe", "accountcreate", "accountverify"]

    const handleSubmitSubscriptionForm = async (e, data) => {
        e.preventDefault();
        try {

            setResponseStatus(true)
            setResponseData({
                heading: 'Submitting Form',
                isLoading: true,
            })

            let raw = await axios.post(`${backendHost}/api/client/news`, {
                "name": data?.name ?? 'No Name',
                "email": data?.email,
                "type": data?.subs_type ?? 'all',
            })

            if (raw?.status === 201) {
                setResponseData({
                    heading: 'Submitting Form',
                    isLoading: false,
                    message: raw?.data
                })

                e.target.reset();
            }

        } catch (error) {
            console.error(error);
            setResponseStatus(true)
            setResponseData({
                heading: 'Error',
                isLoading: false,
                message: error?.response?.data ?? 'Error on submiting form'
            })
        } finally {
            setTimeout(() => {
                setResponseData({})
            }, 4000);
        }
    }

    const [feedbackModal, setFeedbackModal] = useState({
        show: false,
        title: ""
    })

    const [feedbackAdminMode, setFeedbackAdminMode] = useState(false)
    const [currFeedbackProjectId, setcurrFeedbackProjectId] = useState(null)

    return (
        <DataContext.Provider value={{
            socialLinks, informationModalData, setInformationModalData, ToastModalData, setToastModalData,
            responseStatus, setResponseStatus, responseData, setResponseData, backendHost,
            isLoadingCourse, setIsLoadingCourse, courses, setCourses, getCourseModule, notify, setNotify,
            courseLearning_offCanvasFlag, setCourseLearning_offCanvasFlag, noNav, handleSubmitSubscriptionForm,
            feedbackModal, setFeedbackModal, feedbackAdminMode, setFeedbackAdminMode, currFeedbackProjectId,
            setcurrFeedbackProjectId
        }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState