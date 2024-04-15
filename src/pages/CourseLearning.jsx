import React, { useEffect, useContext, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import LearningSidebar from '../components/LearningSidebar'
import { FirstLetterEffectText, FirstLetterEffectText2, LoadingDataSpinner } from '../components/Utility'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import DOMPurify from 'dompurify';
import DataContext from '../context/data/DataContext';
import { formatDistance } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CourseLearning = () => {

    const [params, setParams] = useSearchParams()
    const { course_id } = useParams();
    const navigate = useNavigate()

    const { backendHost } = useContext(DataContext)

    const [pageData, setPageData] = useState("")
    const [isLoadingData, setIsLoadingData] = useState(true)
    const [modules, setModules] = useState([])
    const [pages, setPages] = useState([])

    const [currentPage, setCurrentPage] = useState(null)
    const [currentModule, setCurrentModule] = useState(null)

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
                    navigate('/course')
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
            setCurrentPage(data)
            setCurrentModule(() => {
                let moduleParam = params.get('module')
                return modules.find((ele) => { return ele._id === moduleParam })
            })
            setPageData(data?.html)
        })();
    }, [params, pages, modules])

    // securing url for threaten free
    const [urlThreaten, setUrlThreaten] = useState(false)
    useEffect(() => {
        if (isLoadingData === false) {
            setUrlThreaten(() => {
                let moduleId = modules.find((mod) => mod._id === params.get('module'))
                let pageId = pages.find((mod) => mod._id === params.get('page'))

                if (!moduleId || !pageId) {
                    return true
                }

                return false
            })
        }
    }, [params, setUrlThreaten, modules, pages, isLoadingData])

    const [nextPage, setNextPage] = useState({})
    const [prevPage, setPrevPage] = useState({})

    const [nextModule, setNextModule] = useState({})
    const [prevModule, setPrevModule] = useState({})

    useEffect(() => {
        setNextPage(() => {
            return pages.find((ele) => {
                return (ele?.page_number === (currentPage?.page_number + 1)) && (ele?.of_module === currentModule?._id)
            })
        })

        setPrevPage(() => {
            return pages.find((ele) => {
                return (ele?.page_number === (currentPage?.page_number - 1)) && (ele?.of_module === currentModule?._id)
            })
        })

        setNextModule(() => {
            return modules.find((ele) => {
                return (ele?.of_course === course_id) && (ele?.module_number === (currentModule?.module_number + 1))
            })
        })

        setPrevModule(() => {
            return modules.find((ele) => {
                return (ele?.of_course === course_id) && (ele?.module_number === (currentModule?.module_number - 1))
            })
        })
    }, [currentPage, currentModule, modules, pages, course_id, params])

    return (
        <>
            {isLoadingData ?
                <div className={'w-100 d-flex align-items-center justify-content-center'} style={{ height: '60vh' }} >
                    <LoadingDataSpinner className={'text-theam'} />
                </div>
                :
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

                        <div id='learning-main-body' className='border-start px-md-3 px-2 pb-3'>
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
                                <>
                                    <div className='py-2 mb-4 border-bottom'>
                                        <span className='lh-1 fs-4 fw-semibold d-block'> <FirstLetterEffectText2 text={currentPage?.name ?? ''} /> </span>
                                        <span style={{ fontSize: '14px' }}>Last updated {formatDistance(currentPage?.updatedAt || new Date(), new Date(), { addSuffix: true })}</span>
                                    </div>
                                    <div id='course-learning-main-container' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(pageData || '') }} ></div>
                                    <hr />
                                    <div className='d-flex flex-column gap-3'>
                                        <div className="d-flex justify-content-between flex-wrap gap-md-0 gap-3">
                                            {nextPage &&
                                                <Link to={`/course/learning/${course_id}?module=${currentModule?._id}&page=${nextPage?._id}`} className="btn-reset text-white btn px-2 btn-primary bg-theam rounded-1 py-1 border-0 d-inline-flex align-items-center">
                                                    NEXT PAGE
                                                    <FaChevronRight />
                                                </Link>
                                            }

                                            {prevPage &&
                                                <Link to={`/course/learning/${course_id}?module=${currentModule?._id}&page=${prevPage?._id}`} className="btn-reset text-white btn px-2 btn-primary bg-theam rounded-1 py-1 border-0 d-inline-flex align-items-center">
                                                    <FaChevronLeft />
                                                    PREV PAGE
                                                </Link>
                                            }
                                        </div>

                                        <div className="d-flex justify-content-between flex-wrap gap-md-0 gap-3">
                                            {nextModule &&
                                                <Link to={`/course/learning/${course_id}?module=${nextModule?._id}&page=${pages.find((ele) => { return (ele.of_module === nextModule?._id) && (ele.page_number === 1) })._id}`} className="btn-reset text-white btn px-2 btn-primary bg-theam rounded-1 py-1 border-0 d-inline-flex align-items-center">
                                                    NEXT MODULE
                                                    <FaChevronRight />
                                                </Link>
                                            }

                                            {prevModule &&
                                                <Link to={`/course/learning/${course_id}?module=${prevModule?._id}&page=${pages.find((ele) => { return (ele.of_module === prevModule?._id) && (ele.page_number === 1) })._id}`} className="btn-reset text-white btn px-2 btn-primary bg-theam rounded-1 py-1 border-0 d-inline-flex align-items-center">
                                                    <FaChevronLeft />
                                                    PREV MODULE
                                                </Link>
                                            }
                                        </div>
                                    </div>
                                </>
                            }
                        </div>
                    </div >

                    {/* offcanvas of subMenu */}
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="sidenav-menu" aria-labelledby="sidenav-menuLabel" >
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
            }
        </>
    )
}

export default CourseLearning