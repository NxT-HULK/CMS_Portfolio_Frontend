import React, { useEffect, useContext, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import LearningSidebar from '../components/LearningSidebar'
import { FirstLetterEffectText, LoadingDataSpinner } from '../components/Utility'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify';
import DataContext from '../context/data/DataContext';

const CourseLearning = () => {

    const [params, setParams] = useSearchParams()
    const { course_id } = useParams();
    const navigate = useNavigate()

    const { backendHost } = useContext(DataContext)

    const [pageData, setPageData] = useState("")
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [modules, setModules] = useState([])
    const [pages, setPages] = useState([])


    // fetching data from backend
    useEffect(() => {
        (async () => {
            try {
                let response = await fetch(`${backendHost}/course/learning-matarial/${course_id}`, {
                    method: 'GET',
                    headers: {
                        'content-Type': 'application/json'
                    }
                })

                let data = await response.json()
                if (response.status === 200) {
                    setModules(data.modules)
                    setPages(data.pages)
                    if (!params.get('module') * 1 > 1 && !params.get('page') * 1 > 1) {
                        setParams({
                            module: data.modules[0]._id,
                            page: data.pages[0]._id
                        })
                    }

                } else {
                    return;
                }
            } catch (error) {
                navigate('/course')
                console.error(error)
            } finally {
                setIsLoadingData(false)
            }
        })();
    }, [course_id, backendHost, navigate, setParams, params])

    // setting page data to dom purify
    useEffect(() => {
        (() => {

            let pageParam = params.get('page')
            let data = pages.find((ele) => ele._id === pageParam)
            setPageData(data?.html)

        })();
    }, [params, pages])

    // securing url for threaten free
    const [urlThreaten, setUrlThreaten] = useState(false)
    useEffect(() => {
        setUrlThreaten(() => {
            let moduleId = modules.find((mod) => mod._id === params.get('module'))
            let pageId = pages.find((mod) => mod._id === params.get('page'))

            if (!moduleId || !pageId) {
                return true
            }

            return false
        })
    }, [params, setUrlThreaten, modules, pages])

    return (
        <>
            <div id="learning-mai-wrapper" className='px-md-0 px-2 py-3'>
                <div className='d-lg-block d-none align-self-start position-sticky py-2' style={{ top: '57px' }} id='learning-sidebar'>
                    <div className='border-bottom px-3 py-2'>
                        <FirstLetterEffectText text={"Chapters / Module"} />
                    </div>
                    <div className='px-3 mb-5'>
                        <LearningSidebar modules={modules} pages={pages} urlThreaten={urlThreaten} />
                    </div>
                </div>

                <div id='learning-main-body' className='border-start px-md-3 px-2 py-3'>
                    {isLoadingData ?
                        <div className={'w-100 d-flex align-items-center justify-content-center'} style={{ height: '60vh' }} >
                            <LoadingDataSpinner className={'text-theam'} />
                        </div>
                        :
                        <>
                            {urlThreaten ?
                                <div className={'w-100 d-flex flex-column align-items-center justify-content-center'} style={{ height: '60vh' }} >
                                    <p>
                                        URL threatening Not Allowed!
                                    </p>

                                    <div>
                                        <Link to={`/course/learning/${course_id}?module=${modules[0]?._id}&page=${pages[0]?._id}`} className='bg-theam px-3 py-2 rounded-1 text-white text-decoration-none'>
                                            Goto - Module: 1, Page: 1
                                        </Link>
                                    </div>
                                </div>
                                :
                                <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageData || '') }} ></div>
                            }
                        </>
                    }
                </div>
            </div>

            {/* offcanvas of subMenu */}
            <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidenav-menu" aria-labelledby="sidenav-menuLabel">
                <div className="offcanvas-header border-bottom">
                    <h5 className="offcanvas-title" id="sidenav-menuLabel">
                        <FirstLetterEffectText text={"Chapters / Module"} />
                    </h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body py-1">
                    <LearningSidebar modules={modules} pages={pages} urlThreaten={urlThreaten} />
                </div>
            </div>
        </>
    )
}

export default CourseLearning