import React, { useEffect, useContext, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import LearningSidebar from '../components/LearningSidebar'
import { CustomBtn, FirstLetterEffectText, FirstLetterEffectText2, LoadingDataSpinner } from '../components/Utility'
import { useNavigate } from 'react-router-dom'
import DataContext from '../context/data/DataContext';
import { formatDistance } from 'date-fns';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Offcanvas from 'react-bootstrap/Offcanvas';
import FunctionContext from '../context/function/FunctionContext';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios'
import { BsFillSendFill } from 'react-icons/bs'
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from 'react-icons/io'
import JoditEditor from 'jodit-react'

const HelpComponent = ({ name, createdAt, message, replyData }) => {

    const [replyState, setReplyState] = useState(false)
    return (
        <div className="p-3 border rounded bg-body-tertiary col-12 shadow-sm">
            <div>
                <div className='d-flex flex-wrap align-items-center justify-content-between mb-2 pb-1 border-bottom'>
                    <span className="fw-medium fst-italic d-block">{name}</span>
                    <span style={{ fontSize: '14px' }}>Posted at {formatDistance(createdAt || new Date(), new Date(), { addSuffix: true })}</span>
                </div>
                <div dangerouslySetInnerHTML={{ __html: message }}></div>
            </div>
            {replyData?.length > 0 &&
                <div div className="pt-3 mt-3 border-top">
                    <button
                        type="button"
                        className="simleButton-with-shaded d-inline-flex width-fit align-items-center gap-1 text-decoration-none px-2 fw-medium px-3 mb-3"
                        onClick={() => setReplyState(!replyState)}
                    >
                        View Reply
                        {replyState === true ?
                            <IoIosArrowDropupCircle size={22} className='text-white' />
                            :
                            <IoIosArrowDropdownCircle size={22} className='text-white' />
                        }
                    </button>
                    {replyState === true &&
                        <div dangerouslySetInnerHTML={{ __html: replyData }}></div>
                    }
                </div>
            }
        </div>
    )
}

const CourseLearning = () => {

    const [params, setParams] = useSearchParams()
    const course_id = params.get('course');
    const navigate = useNavigate()

    const { backendHost, courseLearning_offCanvasFlag, setCourseLearning_offCanvasFlag, setResponseStatus, setResponseData } = useContext(DataContext)
    const { scrollTop, handleOnChange } = useContext(FunctionContext)

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
                let response = await axios.get(`${backendHost}/api/client/course/learning-material/${params.get("course")}`)
                if (response.status === 200) {
                    setModules(response?.data?.modules)
                    setPages(response?.data.pages)
                    if (!params.get('module') * 1 > 1 && !params.get('page') * 1 > 1) {
                        setParams({
                            module: response?.data.modules[0]._id,
                            page: response?.data.pages[0]._id
                        })
                    }
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

    const [commentFormData, setCommentFormData] = useState({})
    const [formState, setFormState] = useState(false)
    const handleSubmitMessageForm = async (e) => {
        e.preventDefault()

        try {
            setResponseStatus(true)
            setResponseData({
                isLoading: true,
                heading: 'Submitting Request',
            })

            const fetching = await axios.post(`${backendHost}/api/client/course/ask`, { ...commentFormData, ofPage: currentPage?._id })
            if (fetching?.status === 201) {
                setResponseData({
                    isLoading: false,
                    heading: "Request Submitted",
                    message: fetching?.data
                })

                setAllReplayData((prev) => {
                    return [...prev, { ...commentFormData, ofPage: currentPage?._id }]
                })
            }
        } catch (error) {
            setResponseData({
                isLoading: false,
                heading: `Error - ${error?.response?.status}`,
                message: error?.response?.data
            })
            console.error(error)
        }
    }

    const [allReplayData, setAllReplayData] = useState(null)
    useEffect(() => {
        (async () => {
            try {
                const fetching = await axios.get(`${backendHost}/api/client/course/ask/${currentPage?._id}`)
                if (fetching?.status === 200) {
                    setAllReplayData(fetching?.data)
                }
            } catch (error) {
                console.log(error);
            }
        })();
    }, [backendHost, currentPage])


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>{currentPage?.name ?? ''} | Shivam Kashyap</title>
                </Helmet>
            </HelmetProvider>
            {isLoadingData ?
                <div className={'w-100 d-flex align-items-center justify-content-center'} style={{ height: '60vh' }} >
                    <LoadingDataSpinner className={'text-theam'} />
                </div>
                :
                <>
                    <div id="learning-mai-wrapper" className='px-md-0 px-2 py-3 col-12'>
                        <div className='d-lg-block d-none align-self-start position-sticky pb-2 overflow-auto' style={{ top: '57px', height: 'calc(100vh - 100px)' }} id='learning-sidebar'>
                            <div className='border-bottom px-3 py-2'>
                                <FirstLetterEffectText text={"Chapters / Module"} />
                            </div>
                            <div className='px-3 mb-5'>
                                <LearningSidebar course_id={course_id} modules={modules} pages={pages} urlThreaten={urlThreaten} />
                            </div>
                        </div>

                        <div id='learning-main-body' className='border-start px-md-3 px-2 pb-3'>
                            {urlThreaten ?
                                <div className={'w-100 d-flex flex-column align-items-center justify-content-center'} style={{ height: '60vh' }} >
                                    <p>
                                        URL threatening Not Allowed!
                                    </p>

                                    <div>
                                        <Link to={`/course/learning?course=${course_id}&module=${modules[0]?._id}&page=${pages[0]?._id}`} className='bg-theam px-3 py-2 rounded-1 text-white text-decoration-none'>
                                            Goto - Module: 1, Page: 1
                                        </Link>
                                    </div>
                                </div>
                                :
                                <>
                                    <div className='py-2 mb-4 border-bottom d-flex flex-wrap justify-content-between align-items-center gap-2'>
                                        <div>
                                            <span className='lh-1 d-block mb-1'> <FirstLetterEffectText2 text={currentModule?.module_name ?? ''} /> </span>
                                            <span className='lh-1 fs-4 fw-semibold d-block'> <FirstLetterEffectText2 text={currentPage?.name ?? ''} /> </span>
                                        </div>
                                        <span style={{ fontSize: '14px' }}>Last updated {formatDistance(currentPage?.updatedAt || new Date(), new Date(), { addSuffix: true })}</span>
                                    </div>
                                    <div id='course-learning-main-container' className='col-12' dangerouslySetInnerHTML={{ __html: pageData ?? '' }} ></div>
                                    <hr />
                                    <div className='d-flex flex-column gap-3'>
                                        <div className="d-flex justify-content-between flex-wrap gap-md-0 gap-3">
                                            {prevPage &&
                                                <div className="d-inline-block" onClick={() => { scrollTop() }}>
                                                    <Link
                                                        to={`/course/learning?course=${course_id}&module=${currentModule?._id}&page=${prevPage?._id}`}
                                                        className="simleButton-with-shaded d-inline-flex align-items-center gap-1 text-decoration-none px-2 fw-medium"
                                                    >
                                                        <FaChevronLeft />
                                                        PREV PAGE
                                                    </Link>
                                                </div>
                                            }

                                            {nextPage &&
                                                <div className="d-inline-block" onClick={() => { scrollTop() }}>
                                                    <Link
                                                        to={`/course/learning?course=${course_id}&module=${currentModule?._id}&page=${nextPage?._id}`}
                                                        className="simleButton-with-shaded d-inline-flex align-items-center gap-1 text-decoration-none px-2 fw-medium"
                                                    >
                                                        NEXT PAGE
                                                        <FaChevronRight />
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                        <div className="d-flex justify-content-between flex-wrap gap-md-0 gap-3">
                                            {prevModule && pages.find((ele) => { return (ele.of_module === prevModule?._id) && (ele.page_number === 1) })?._id &&
                                                <div className="d-inline-block" onClick={() => { scrollTop() }}>
                                                    <Link
                                                        to={`/course/learning?course=${course_id}&module=${prevModule?._id}&page=${pages.find((ele) => { return (ele.of_module === prevModule?._id) && (ele.page_number === 1) })?._id}`}
                                                        className="simleButton-with-shaded d-inline-flex align-items-center gap-1 text-decoration-none px-2 fw-medium"
                                                    >
                                                        <FaChevronLeft />
                                                        PREV CHAPTER
                                                    </Link>
                                                </div>
                                            }

                                            {nextModule && pages.find((ele) => { return (ele.of_module === nextModule?._id) && (ele.page_number === 1) })?._id &&
                                                <div className="d-inline-block" onClick={() => { scrollTop() }}>
                                                    <Link
                                                        to={`/course/learning?course=${course_id}&module=${nextModule?._id}&page=${pages.find((ele) => { return (ele.of_module === nextModule?._id) && (ele.page_number === 1) })?._id}`}
                                                        className="simleButton-with-shaded d-inline-flex align-items-center gap-1 text-decoration-none px-2 fw-medium"
                                                    >
                                                        NEXT CHAPTER
                                                        <FaChevronRight />
                                                    </Link>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <hr className='mt-4' />
                                    {allReplayData?.length > 0 &&
                                        <div div className='d-flex flex-wrap mb-4'>
                                            {allReplayData?.map(reply => {
                                                return (
                                                    <HelpComponent name={reply?.name} createdAt={reply?.createdAt} message={reply?.mess} replyData={reply?.reply} key={reply?._id} />
                                                )
                                            })}
                                        </div>
                                    }
                                    <>
                                        <div
                                            className={`
                                                    mb-3 bg-body-tertiary shadow-sm border py-2 px-3 rounded d-flex
                                                    justify-content-between user-select-none cursor-pointer
                                                    position-relative overflow-hidden
                                                `}
                                            onClick={() => setFormState(!formState)}
                                        >
                                            {formState === true && <p className={`m-0 p-0 border border-2 border-theam position-absolute w-100 top-0 left-0`}></p>}
                                            <div>
                                                <FirstLetterEffectText2 className={'fs-5 fw-medium'} text="Want to say somthing?" />
                                                <span className="fs-6 d-sm-block d-none">Your doubts today are the foundation for your confidence tomorrow.</span>
                                            </div>
                                            <div className='d-flex align-items-center'>
                                                <button type="button" className="btn-reset">
                                                    {formState === true ?
                                                        <IoIosArrowDropupCircle size={40} className='text-theam' />
                                                        :
                                                        <IoIosArrowDropdownCircle size={40} className='text-theam' />
                                                    }
                                                </button>
                                            </div>
                                        </div>
                                        {formState === true &&
                                            <div className='col-12'>
                                                <form className='rounded-3' onSubmit={handleSubmitMessageForm}>
                                                    <div className="mb-2 d-flex flex-wrap gap-md-0 gap-2">
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            className="rounded-1 custom-input-style"
                                                            placeholder="Your Name*"
                                                            required
                                                            onChange={(e) => { handleOnChange(e, commentFormData, setCommentFormData) }}
                                                            autoComplete='name'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            type="email"
                                                            className="rounded-1 custom-input-style"
                                                            placeholder="youremail@domain.com*"
                                                            required
                                                            name="email"
                                                            onChange={(e) => { handleOnChange(e, commentFormData, setCommentFormData) }}
                                                            autoComplete='email'
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <input
                                                            type="text"
                                                            className="rounded-1 custom-input-style"
                                                            placeholder="Your git repository link (Optional)"
                                                            name="repository"
                                                            onChange={(e) => { handleOnChange(e, commentFormData, setCommentFormData) }}
                                                        />
                                                    </div>
                                                    <div className="mb-2">
                                                        <JoditEditor
                                                            value={commentFormData?.reply}
                                                            onBlur={(value) => setCommentFormData({ ...commentFormData, mess: value })}
                                                            config={{
                                                                buttons: [
                                                                    'bold',
                                                                    'italic',
                                                                    'ul',
                                                                    'ol',
                                                                    {
                                                                        name: '</>',
                                                                        tooltip: 'Insert Code',
                                                                        exec: function (editor) {
                                                                            editor.s.insertHTML('<pre></pre>');
                                                                        }
                                                                    }
                                                                ],
                                                                toolbarSticky: false,
                                                                readonly: false,
                                                                placeholder: "Please may write your concern here..."
                                                            }}
                                                        />
                                                    </div>
                                                    <CustomBtn text="Send Message" icon={<BsFillSendFill />} type={'submit'} />
                                                </form>
                                            </div>
                                        }
                                    </>
                                </>
                            }
                        </div>
                    </div >

                    <Offcanvas show={courseLearning_offCanvasFlag} onHide={() => { setCourseLearning_offCanvasFlag(false) }}>
                        <Offcanvas.Header closeButton={true} className='border-bottom'>
                            <Offcanvas.Title>
                                <FirstLetterEffectText text={"Chapters / Module"} />
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <LearningSidebar modules={modules} pages={pages} urlThreaten={urlThreaten} />
                        </Offcanvas.Body>
                    </Offcanvas>
                </>
            }
        </>
    )
}

export default CourseLearning