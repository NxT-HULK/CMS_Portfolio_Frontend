import React, { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataContext from '../context/data/DataContext';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { BtnBig, FirstLetterEffectText, LoadingDataSpinner } from '../components/Utility';
import dateFormat from 'dateformat'
import { FaBookReader } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios';
import { GoAlertFill } from "react-icons/go";

const CourseDetails = () => {
    const [params] = useSearchParams()
    const course_id = params.get('course')
    const { courses, setCourses, isLoadingCourse, setIsLoadingCourse, backendHost } = useContext(DataContext);
    const navigate = useNavigate();

    const [sanitizedHtml, setSanitizedHtml] = useState('');
    const [selectedCourse, setSelectedCourse] = useState({})
    const [flag, setFlag] = useState(false)
    const [notFound, setNotFound] = useState(false)
    useEffect(() => {
        const course = courses.find(ele => ele._id === course_id);
        if (!course && flag === true) {
            setNotFound(true)
        }

        if (course) {
            setSelectedCourse(course)
            let content = DOMPurify.sanitize(course?.information)
            setSanitizedHtml(content);
        } else {
            (async () => {
                try {
                    if (flag === false) {
                        setIsLoadingCourse(true)
                        let fetching = await axios.get(`${backendHost}/api/client/course`)
                        if (fetching.status === 200) {
                            setCourses(fetching?.data)
                            setFlag(true)
                        }
                    }
                } catch (error) {
                    window.alert("Somthing went wrong with servers")
                    console.error(error)
                }
            })();
        }
    }, [backendHost, course_id, courses, setCourses, navigate, flag, setFlag, setNotFound, setIsLoadingCourse]);

    // get last updated on api call
    const [date, setDate] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                let fetching = await axios.post(`${backendHost}/api/client/course/last-updated`, { course_id })
                if (fetching.status === 200) {
                    setDate(fetching?.data?.start ? fetching?.data : null)
                }
            } catch (error) {
                console.error(error);
                if (error?.response?.data === "Course ID not valid!") {
                    window.alert("URL is not valid! Redirecting to all courses.")
                    navigate("/course")
                }
            }
        })();
    }, [backendHost, course_id, setDate, navigate])

    return (
        <>
            {isLoadingCourse ?
                <div className={'w-100 d-flex align-items-center justify-content-center'} style={{ height: '60vh' }} >
                    <LoadingDataSpinner className={'text-theam'} />
                </div>
                :
                notFound === true ?
                    <div className='py-5 my-5'>
                        <BtnBig text={'URL is invalid! Click here to explore all courses'} icon={<GoAlertFill />} link={`/course`} target={false} />
                    </div>
                    :
                    <div className='py-4 px-md-4 px-2 mb-5 container-fluid'>
                        <HelmetProvider>
                            <Helmet>
                                <title>{selectedCourse?.name ?? ''} | Shivam Kashyap</title>
                                <meta name="description" content={selectedCourse?.welcome_screen ?? ''} />
                            </Helmet>
                        </HelmetProvider>
                        <div className='mb-4'>
                            {date !== null &&
                                <div className='mb-3 border-bottom d-flex flex-wrap justify-content-between align-items-center'>
                                    <div className='d-flex flex-column'>
                                        <FirstLetterEffectText text={selectedCourse?.name || ''} className={'lh-1'} />
                                        <span className='lh-1 mb-1 fst-italic' style={{ fontSize: '14px' }}> Last Update on {dateFormat(date?.last, "dS, mmmm yyyy")} </span>
                                    </div>

                                    <div className='d-flex flex-column gap-1'>
                                        <span className='fst-italic' style={{ fontSize: '14px' }}>
                                            Stared on: {dateFormat(date?.start, "dS, mmmm yyyy")}
                                        </span>
                                    </div>
                                </div>
                            }
                            <div>
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedCourse?.welcome_screen || '') }}></div>
                                <div className='mt-3'>
                                    <BtnBig text={'Start Learning'} icon={<FaBookReader />} link={`/course/learning?course=${selectedCourse?._id}&module=${selectedCourse?.first_module}&page=${selectedCourse?.first_page}`} target={false} />
                                </div>
                            </div>
                        </div>

                        <div className="d-flex flex-wrap-reverse">
                            <div className='col-md-8 col-12 pe-md-2 pe-0'>
                                <div className={'bg-body-tertiary p-4 border rounded-3'} dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
                            </div>

                            <div className='col-md-4 col-12 ps-md-2 ps-0 mb-md-0 mb-3'>
                                <div className="bg-body-tertiary p-3 border rounded-3">
                                    <FirstLetterEffectText text={'Topics to be covered'} />
                                    <hr className='mt-0' />
                                    <ul className='d-flex flex-wrap gap-2'>
                                        {Array.isArray(selectedCourse?.usedTech) && selectedCourse?.usedTech.map((ele) => {
                                            return (
                                                <li key={`hashtag-${ele}`}>
                                                    <span className="bg-white text-uppercase border px-2 rounded-1"> {ele} </span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className='mt-4 d-flex justify-content-center'>
                            <BtnBig text={'Start Learning'} icon={<FaBookReader />} link={`/course/learning?course=${selectedCourse?._id}&module=${selectedCourse?.first_module}&page=${selectedCourse?.first_page}`} target={false} />
                        </div>
                    </div>
            }
        </>
    );
};

export default CourseDetails;
