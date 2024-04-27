import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DataContext from '../context/data/DataContext';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { BtnBig, FirstLetterEffectText } from '../components/Utility';
import dateFormat from 'dateformat'
import { FaBookReader } from 'react-icons/fa';
import { Helmet, HelmetProvider } from 'react-helmet-async';

const CourseDetails = () => {
    const { course_id } = useParams();
    const { courses, backendHost } = useContext(DataContext);
    const navigate = useNavigate();

    const [sanitizedHtml, setSanitizedHtml] = useState('');
    const [selectedCourse, setSelectedCourse] = useState({})
    useEffect(() => {
        const course = courses.find(ele => ele._id === course_id);
        if (!course) {
            navigate('/course');
        } else {
            setSelectedCourse(course)
            let content = DOMPurify.sanitize(course?.information)
            setSanitizedHtml(content);
        }
    }, [course_id, courses, navigate]);

    // get last updated on api call
    const [date, setDate] = useState({})
    useEffect(() => {
        (async () => {
            let raw = await fetch(`${backendHost}/course/last-updated/`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    course_id: course_id
                })
            })

            let jsonData = await raw.json()
            setDate(jsonData)
        })();
    }, [backendHost, course_id, setDate])

    return (
        <div className='py-4 px-md-4 px-2 mb-5 container-fluid'>
            <HelmetProvider>
                <Helmet>
                    <title>{selectedCourse?.name ?? ''} | Shivam Kashyap</title>
                    <meta name="description" content={selectedCourse?.welcome_screen ?? ''} />
                </Helmet>
            </HelmetProvider>
            <div className='mb-4'>
                <div className='mb-3 border-bottom d-flex flex-wrap justify-content-between align-items-center'>
                    <div className='d-flex flex-column'>
                        <FirstLetterEffectText text={selectedCourse?.name || ''} className={'lh-1'} />
                        <span className='lh-1 mb-1 fst-italic' style={{ fontSize: '14px' }}> Last Update on {dateFormat(date?.last || new Date(), "dS, mmmm yyyy")} </span>
                    </div>

                    <div className='d-flex flex-column gap-1'>
                        <span className='fst-italic' style={{ fontSize: '14px' }}>
                            Stared on: {dateFormat(date?.start || new Date(), "dS, mmmm yyyy")}
                        </span>
                    </div>
                </div>

                <div>
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedCourse?.welcome_screen || '') }}></div>
                    <div className='mt-3'>
                        <BtnBig text={'Start Learning'} icon={<FaBookReader />} link={`/course/learning/${selectedCourse?._id}?module=${selectedCourse?.first_module}&page=${selectedCourse?.first_page}`} target={false} />
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
                <BtnBig text={'Start Learning'} icon={<FaBookReader />} link={`/course/learning/${selectedCourse?._id}?module=${selectedCourse?.first_module}&page=${selectedCourse?.first_page}`} target={false} />
            </div>
        </div>
    );
};

export default CourseDetails;
