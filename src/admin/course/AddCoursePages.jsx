import React, { useEffect, useRef, useState } from 'react'
import { CustomBtn, FirstLetterEffectText, LoadingDataSpinner } from '../../components/Utility'
import { HiDocumentPlus } from "react-icons/hi2";
import { GrPowerReset } from 'react-icons/gr';
import JoditEditor from 'jodit-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { FaAngleDown, FaAngleUp, FaEdit } from 'react-icons/fa';
import { ImSpinner4 } from 'react-icons/im';
import { MdDelete } from 'react-icons/md';
import axios from 'axios';

const AddCoursePages = ({ FunctionContext, DataContext, AdminContext }) => {
  const { removeSlash, handleOnChange } = FunctionContext
  const { courses, setCourses, isLoadingCourse, getCourseModule, allPages, setAllPages, isLoadingPages, handleDeletePage, deletePageStatus } = AdminContext
  const { backendHost, setResponseData, setResponseStatus } = DataContext

  const navigate = useNavigate()
  const [formData, setFormData] = useState({})
  const [params] = useSearchParams()
  const location = useLocation()

  useEffect(() => {
    (async () => {
      try {
        if (courses?.length === 0) {
          const fetch = await axios.get(`${backendHost}/api/admin/course`, { withCredentials: true })
          if (fetch.status === 200) {
            setCourses(fetch?.data)
          }
        }

        const fetchAllPages = await axios.post(`${backendHost}/api/admin/course/modules/pages`, {
          module_id: params.get("module")
        }, { withCredentials: true })

        fetchAllPages?.data.sort((a, b) => {
          return a?.page_number - b?.page_number
        })

        setAllPages(() => {
          let temp = fetchAllPages?.data
          temp.sort((a, b) => a?.page_number - b?.page_number)
          return temp
        })
      } catch (error) {
        console.error(error);
      }
    })();
  }, [courses, backendHost, params, setAllPages, setCourses])

  const [allModules, setAllModules] = useState([])
  const [isSelected, setIsSelected] = useState({
    course: false,
    module: false
  })

  // edit page logic start here
  const [editPage, setEditPage] = useState(false)
  const handleEditPage = async () => {
    const course = params.get("course")
    const module = params.get("module")
    const page = params.get("page")

    setFormData({ course, module })
    setEditPage({ course, module, page });

    const modules = await getCourseModule(course)
    setAllModules(modules)
    setIsSelected({ course: true, module: true })

    const curr = allPages?.find(ele => ele?._id === page)
    setFormData({ ...formData, ...curr, page_name: curr?.name })
  }

  useEffect(() => {
    if (removeSlash(location?.pathname).indexOf("edit-page") > 0) {
      (async () => {
        await handleEditPage()
      })();
    }
    // eslint-disable-next-line
  }, [location, allPages])
  // edit page logic ends here

  const handleLoadModules = async (id) => {
    if (id !== "null") {
      const modules = await getCourseModule(id)
      setAllModules(modules)
      setIsSelected({ course: true, module: false })
    } else {
      setIsSelected({ course: false, module: false })
    }
  }

  const handleIsSelectedForModule = (id) => {
    if (id !== "null")
      setIsSelected({ ...isSelected, module: true })
    else
      setIsSelected({ ...isSelected, module: false })
  }

  const debounce = useRef(null)
  const handleJoditChange = (value) => {
    clearTimeout(debounce.current);
    debounce.current = setTimeout(() => {
      setFormData({ ...formData, html: value })
    }, 1000)
  }

  useEffect(() => {
    (async () => {
      if (isSelected?.module === true && editPage === false) {
        const fetchAllPages = await axios.post(`${backendHost}/api/client/course/modules/pages`, {
          module_id: formData?.module
        }, { withCredentials: true })

        setAllPages(() => {
          let temp = fetchAllPages?.data
          temp.sort((a, b) => a?.page_number - b?.page_number)
          return temp
        })
      }
    })();
  }, [isSelected?.module, backendHost, formData?.module, setAllPages, editPage])


  const handleSubmitForm = async (e) => {
    e.preventDefault()
    try {
      setResponseStatus(true)
      setResponseData({
        isLoading: true,
        heading: 'Form Status: Processing'
      })

      const fetching = await axios.put(`${backendHost}/api/admin/course/modules/add_page`, {
        module_id: formData?.module ?? params.get("module"),
        page_name: formData?.page_name,
        page_number: formData?.page_number,
        html: formData?.html,
        updateFlag: editPage?.page ? true : false,
        pageId: params.get("page") ?? null
      }, { withCredentials: true })

      let response = await fetching?.data

      if (fetching.status === 201) {
        setResponseData({
          isLoading: false,
          heading: 'Form Status: Success',
          message: response?.message
        })

        setAllPages([...allPages, response.data])
        e.target.reset()
        setIsSelected({ course: false });
        setFormData({ html: '' })

      } else if (fetching.status === 200) {

        setResponseData({
          isLoading: false,
          heading: 'Update Status: Success',
          message: response?.message
        })
        
        // e.target.reset()
        // setIsSelected({ course: false });
        // setFormData({ html: '' })
        // setTimeout(() => {
        //   navigate(`/admin/course/edit-content?id=${params.get("course")}`)
        // }, 2000);
      }

    } catch (error) {
      console.log(error);
      setResponseData({
        isLoading: false,
        heading: 'Form Status: Error',
        message: error.response?.data ?? "Server Error"
      })
    } finally {
      setTimeout(() => {
        setResponseStatus(false)
      }, 5000);
    }
  }

  const handleResetForm = () => {
    setIsSelected({
      course: false,
      module: false
    })
    setFormData({ html: '' });
    setEditPage(null);
    setAllModules(null)
    setAllPages(null)
    navigate("/admin/course/new-pages")
  }

  const [tillNowWeHaveState, setTillNowWeHaveState] = useState(false)
  const [previewPageState, setPreviewPageState] = useState(false)

  return (
    <>
      {isLoadingCourse ?
        <LoadingDataSpinner className={'text-theam'} />
        :
        <div className={`pb-md-5 pb-3 d-flex flex-wrap`}>
          <div className='col-12 mb-4'>
            {editPage ?
              <div className='col-12'>
                <div className={`d-flex col-12 align-items-center justify-content-between cursor-pointer bg-body-tertiary border px-3 ${previewPageState === true ? 'rounded rounded-bottom-0' : 'rounded'}`} onClick={() => setPreviewPageState(!previewPageState)}>
                  <span className='d-block user-select-none'>
                    <FirstLetterEffectText text={"Preview Page"} className={'text-truncate col-12 d-block'} />
                  </span>

                  <button type='button'
                    className={`text-white btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center lh-1`}
                    style={{ height: '35px', width: '35px' }}
                  >
                    {previewPageState === true ?
                      <FaAngleUp />
                      :
                      <FaAngleDown className='mt-1' />
                    }
                  </button>
                </div>
                {previewPageState === true &&
                  <div className='p-3 border rounded rounded-top-0 border-top-0 shadow-sm col-12 mb-3' style={{ whiteSpace: 'break-space', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: formData?.html ?? '' }}></div>
                }
              </div>
              :
              <div className="bg-body-tertiary p-3 border rounded-1">
                <div className={isSelected?.course === true && isSelected?.module === true && 'mb-3'}>
                  <span className="d-block text-center fs-5 fw-bold text-capitalize mt-3">
                    {isSelected?.course === false && isSelected?.module === false ? 'Select course first' : isSelected?.module === false && 'Now, Select module'}
                  </span>
                </div>

                {isSelected?.course === true && isSelected?.module === true && isLoadingPages === false && allPages?.length > 0 &&
                  isLoadingPages === true ?
                  <>
                    <LoadingDataSpinner className={'text-theam'} />
                  </>
                  :
                  <>
                    <div className='d-flex align-items-center justify-content-between cursor-pointer' onClick={() => setTillNowWeHaveState(!tillNowWeHaveState)}>
                      <span className='d-block user-select-none'>
                        <FirstLetterEffectText text={"Till Now We've"} className={'text-truncate col-12 d-block'} />
                      </span>

                      <button type='button'
                        className={`text-white btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center lh-1`}
                        style={{ height: '35px', width: '35px' }}
                      >
                        {tillNowWeHaveState === true ?
                          <FaAngleUp />
                          :
                          <FaAngleDown className='mt-1' />
                        }
                      </button>
                    </div>

                    {tillNowWeHaveState === true &&
                      <div className='d-flex flex-column gap-2'>
                        {allPages?.map(page => {
                          return (
                            <div key={page._id} className='d-flex justify-content-between align-items-stretch bg-white border border-theam ps-2 rounded-1'>
                              <div className='col-md-10 col-8 d-flex fw-semibold'>
                                <span className='d-inline-flex text-theam py-2'>
                                  <span>{page?.page_number}</span>
                                  <span>.&nbsp;</span>
                                </span>
                                <span className='d-block text-truncate py-2'>{page?.name}</span>
                              </div>

                              <div className='d-flex col-auto'>
                                <button className='h-100 d-flex align-items-center justify-content-center px-2 bg-success border-0' onClick={() => { navigate(`/admin/course/edit-page?course=${formData?.course}&module=${formData?.module}&page=${page?._id}`) }}>
                                  <FaEdit size={16} className='text-white mx-1' />
                                </button>
                                <button className='h-100 d-flex align-items-center justify-content-center px-2 bg-danger border-0' onClick={() => { handleDeletePage(formData?.module, page?._id) }}>
                                  {deletePageStatus?.isDeleting === true && deletePageStatus?.id === page._id ?
                                    <div className="spinner-border border-0 d-flex align-items-center justify-content-center">
                                      <ImSpinner4 size={16} className={`text-white`} />
                                    </div>
                                    :
                                    <MdDelete size={16} className='text-white mx-1' />
                                  }
                                </button>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    }
                  </>
                }
              </div>
            }
          </div>

          <div className='col-12'>
            <form className='w-100 z-0 position-relative' onSubmit={handleSubmitForm}>
              <div className="d-flex flex-wrap gap-3">
                <div className="col-12 d-flex flex-wrap">
                  <div className="col-md-6 col-12 pe-md-1 pe-0 mb-md-0 mb-3">
                    <select name="course" id="course"
                      className='rounded-1 custom-input-style'
                      value={editPage?.course ?? formData?.course}
                      onChange={(e) => { handleOnChange(e, formData, setFormData); handleLoadModules(e.target.value) }}
                    >
                      <option value={"null"}>Select Course</option>
                      {courses?.map((course) => {
                        return (
                          <option key={course?._id} value={course?._id}>{course?.name}</option>
                        )
                      })}
                    </select>
                  </div>
                  <div className="col-md-6 col-12 ps-md-1 ps-0">
                    <select name="module" id="course"
                      className={`${isSelected?.course === false && 'opacity-50'} rounded-1 custom-input-style`}
                      value={editPage?.module ?? formData?.module}
                      onChange={(e) => { handleOnChange(e, formData, setFormData); handleIsSelectedForModule(e.target.value) }}
                      disabled={isSelected?.course === true ? false : true}
                    >
                      <option value="null">Select Module</option>
                      {allModules?.map((m) => {
                        return (
                          <option key={m?._id} value={m?._id}>{m?.module_name}</option>
                        )
                      })}
                    </select>
                  </div>
                </div>
                <div className='d-flex flex-wrap col-12 gap-md-0 gap-3'>
                  <div className="col-md-6 col-12 pe-md-1 px-0">
                    <input type="text" name="page_name"
                      className={`rounded-1 custom-input-style ${!(isSelected?.course === true && isSelected?.module === true) && 'opacity-50'}`}
                      disabled={!(isSelected?.course === true && isSelected?.module === true)}
                      placeholder="Page Name*" required={true}
                      onChange={(e) => handleOnChange(e, formData, setFormData)}
                      defaultValue={formData?.page_name}
                    />
                  </div>
                  <div className="col-md-6 col-12 ps-md-1 px-0">
                    <input type="text" name="page_number"
                      className={`rounded-1 custom-input-style ${!(isSelected?.course === true && isSelected?.module === true) && 'opacity-50'}`}
                      disabled={!(isSelected?.course === true && isSelected?.module === true)}
                      placeholder="Page Number*" required={true}
                      onChange={(e) => handleOnChange(e, formData, setFormData)}
                      defaultValue={formData?.page_number}
                    />
                  </div>
                </div>
                <div className='col-12'>
                  <div className="mb-2 position-relative">
                    <span className='opacity-75 d-block col-12 text-truncate' style={{ fontSize: '14px' }}>
                      Page Content - Raw html
                    </span>
                    <JoditEditor
                      value={formData?.html}
                      onChange={handleJoditChange}
                    />
                  </div>
                </div>
              </div>

              <div className='d-flex gap-3 mt-5 align-items-center justify-content-center'>
                <CustomBtn text={editPage ? 'Make Changes' : 'Add Page'} icon={<HiDocumentPlus />} type={'submit'} />
                <button type="reset" className={`btn-reset user-select-none theam-btn-big`} onClick={handleResetForm}>
                  <span className='icon'><GrPowerReset /> </span>
                  <span className='fs-6 text'>Reset Form</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  )
}

export default AddCoursePages
