import React, { useEffect, useState } from 'react'
import { CustomBtn, FirstLetterEffectText, LoadingDataSpinner } from '../../components/Utility'
import { HiDocumentPlus } from "react-icons/hi2";
import { MdDelete } from 'react-icons/md';
import { ImSpinner4 } from 'react-icons/im';
import { GrPowerReset } from 'react-icons/gr';
import JoditEditor from 'jodit-react';

const AddCoursePages = ({
  FunctionContext, DataContext, AdminContext, setWorkspace
}) => {

  const [data, setdata] = useState({})
  let { handleOnChange } = FunctionContext
  let { setResponseData, setResponseStatus, backendHost } = DataContext
  let { courses, getCourseModule, editPage, setEditPage, currData } = AdminContext

  const [selectInfo, setSelectInfo] = useState({
    course: false,
    module: false
  })

  const [isLoadingModule, setIsLoadingModule] = useState(false)
  const [courseModules, setCourseModules] = useState([])
  useEffect(() => {
    setSelectInfo({
      course: data?.course?.length > 0,
      module: data?.module?.length > 0,
    });

    (async () => {
      if (data?.course?.length > 0) {
        setIsLoadingModule(true)
        let fetching = await getCourseModule(data?.course)
        let res = await fetching.json()
        setCourseModules(res)
        setIsLoadingModule(false)
      }
    })();

  }, [data?.course?.length, data?.module?.length, data?.course, getCourseModule])

  const [selectedModule, setSelectedModule] = useState({
    pages: [],
    module_name: '',
  })
  const handleLoadSelectedModule = (courseId) => {
    setSelectedModule(() => {
      return courseModules.filter(ele => ele._id === courseId)[0] || {}
    })
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: 'Form Status: Processing'
    })

    try {

      let fetching = await fetch(`${backendHost}/course/modules/add_page`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          module_id: editPage?.flag === true ? data?.module : selectedModule._id,
          page_name: data?.page_name,
          page_number: data?.page_number,
          html: data?.html,
          updateFlag: editPage?.flag ?? false,
          pageId: editPage?.data
        })
      })

      let response = await fetching.json()

      if (fetching.status === 201) {
        setResponseData({
          isLoading: false,
          heading: 'Form Status: Success',
          message: response?.message
        })

        setSelectedModule({ ...selectedModule, pages: [...pages, response.data] })
        setPages([...pages, response.data])

      } else if (fetching.status === 200) {
        setResponseData({
          isLoading: false,
          heading: 'Update Status: Success',
          message: response?.message
        })

        setSelectedModule({ ...selectedModule, pages: [...pages, response.data] })
        setPages([...pages, response.data])
        setEditPage({ flag: false })
        setWorkspace('edit_course_pages')

      } else {

        setResponseData({
          isLoading: false,
          heading: 'Form Status: Validation failed',
          message: response
        })

      }

    } catch (error) {
      setResponseData({
        isLoading: false,
        heading: 'Form Status: Error',
        message: error.message
      })
    } finally {
      e.target.reset();
      setEditPage(null)
      setdata(null)
    }
  }

  const [pages, setPages] = useState([])
  useEffect(() => {
    if (data?.module?.length > 0) {

      (async () => {
        let fetching = await fetch(`${backendHost}/course/modules/pages`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            module_id: selectedModule._id
          })
        })

        let response = await fetching.json()
        if (fetching.status === 200) {
          setPages(response)
        } else {
          setPages([])
        }
      })()

    }
  }, [data?.module, backendHost, selectedModule._id])

  const [deletestatus, setDeletestatus] = useState({
    isDeleting: false,
    id: ''
  })
  const handleDeletePage = async (pageId) => {

    let confirmation = window.confirm('Are you sure want to delete page')

    if (confirmation === true) {
      setDeletestatus({
        isDeleting: true,
        id: pageId
      })

      try {

        let fetching = await fetch(`${backendHost}/course/modules/page`, {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            module_id: selectedModule._id,
            page_id: pageId
          })
        })

        if (fetching.status === 200) {
          setPages(pages.filter((ele) => { return ele._id !== pageId }))
        } else {
          console.log(fetching);
        }

      } catch (error) {
        setResponseStatus(true);
        setResponseData({
          isLoading: false,
          heading: 'Error occured while deleting page from module',
          message: error.message
        })
      }
    }
  }

  const setCurrentPageAsync = () => {
    return new Promise((resolve, reject) => {
      const foundPage = currData?.pages.find((ele) => ele._id === editPage?.data);
      if (foundPage) {
        resolve(foundPage);
      } else {
        reject(new Error("Page not found"));
      }
    });
  }

  const [currPage, setCurrPage] = useState({})
  const handleEditPage = async () => {
    const temp = await setCurrentPageAsync()
    setCurrPage(temp)

    setdata({
      module: editPage?.ofModule,
      page_name: currPage.name,
      page_number: currPage.page_number,
      html: currPage.html,
      course: editPage?.ofCourse
    })
  }

  useEffect(() => {
    if (editPage?.flag === true) {
      handleEditPage()
    }
    // eslint-disable-next-line
  }, [editPage, pages])

  return (
    <div className='d-flex py-md-5 py-3 flex-wrap-reverse gap-md-0 gap-4'>
      <div className='col-12'>
        <form className='w-100 z-0 position-relative' onSubmit={handleSubmitForm}>
          <div className="d-flex flex-wrap gap-3">
            <div className="d-flex flex-wrap w-100">
              <div className="col-md-6 col-12 pe-md-2 pe-0 mb-md-0 mb-3">
                <select
                  name="course"
                  id="course"
                  className='rounded-1 custom-input-style'
                  value={data?.course ?? ''}
                  onChange={(e) => { handleOnChange(e, data, setdata) }}
                >
                  <option value="">Select Course</option>
                  {courses.map((ele) => {
                    return (
                      <option key={ele._id} value={ele._id}>{ele.name}</option>
                    )
                  })}
                </select>
              </div>
              <div className="col-md-6 col-12">
                <select
                  name="module"
                  id="course"
                  value={data?.module ?? ''}
                  className={
                    `rounded-1 custom-input-style
                    ${(!(selectInfo?.course && courseModules.length > 0) && 'opacity-50') || ''}`
                  }
                  onChange={(e) => { handleOnChange(e, data, setdata); handleLoadSelectedModule(e.target.value) }}
                  disabled={!(selectInfo?.course && courseModules.length > 0)}
                >
                  <option value="">Select Module</option>
                  {Array.isArray(courseModules) && courseModules.map((ele) => {
                    return (
                      <option key={ele._id} value={ele._id}>{ele.module_name}</option>
                    )
                  })}
                </select>
              </div>
            </div>

            <div className="col-12">
              <input
                type="text"
                name="page_name"
                className="rounded-1 custom-input-style"
                placeholder="Page Name*"
                value={data?.page_name ?? ''}
                onChange={(e) => { handleOnChange(e, data, setdata) }}
              />
            </div>

            <div className="col-12">
              <input
                type="text"
                name="page_number"
                className="rounded-1 custom-input-style"
                placeholder="Page Number*"
                value={data?.page_number ?? ''}
                onChange={(e) => { handleOnChange(e, data, setdata) }}
              />
            </div>

            <div className='col-12'>
              <div className="mb-2 position-relative">
                <span className='opacity-75 d-block col-12 text-truncate' style={{ fontSize: '14px' }}>
                  Page Content - Raw html
                </span>
                <JoditEditor
                  value={data?.html ?? ''}
                  onChange={(value) => setdata({ ...data, html: value })}
                />
              </div>
            </div>
          </div>

          <div className='d-flex gap-3 mt-2'>
            {editPage?.flag === true ?
              <CustomBtn text={"Update Page"} icon={<HiDocumentPlus />} type={'submit'} />
              :
              <CustomBtn text={"Add Page"} icon={<HiDocumentPlus />} type={'submit'} />
            }

            <button type={'reset'} className={`btn-reset user-select-none theam-btn-big`} onClick={() => { setEditPage(null); setdata(null); }}>
              <span><GrPowerReset /> </span>
              <span className='fs-6'>Reset Form</span>
            </button>
          </div>
        </form>
      </div>

      {!editPage?.flag ?
        <div className='col-12 mb-3'>
          {selectInfo?.course === true && selectInfo?.module === true ?
            selectInfo?.module === true &&
            <div className="bg-body-tertiary p-3 border rounded-1">
              <div className='mb-3'>
                <FirstLetterEffectText text={'Till now we have'} />
              </div>

              <div className='d-flex flex-column gap-2'>
                {isLoadingModule ?
                  <LoadingDataSpinner className={'text-theam fw-bold'} />
                  :
                  <>
                    <div className='bg-theam px-3 py-2 rounded-1 fs-5 fw-bold word-wrap text-white'>
                      {selectedModule.module_name}
                    </div>

                    {selectedModule?.pages?.length > 0 && pages.map((ele) => {
                      return (
                        <div className='d-flex bg-white border ps-3 overflow-hidden rounded-1 fw-semibold' key={ele._id}>
                          <span className='d-inline-flex text-theam py-1'>
                            <span>{ele?.page_number}</span>
                            <span>.&nbsp;</span>
                          </span>
                          <span className='py-1'>{ele?.name}</span>

                          <button className='d-flex align-items-center justify-content-center px-2 ms-auto bg-danger border-0' onClick={() => { handleDeletePage(ele._id) }}>
                            {deletestatus?.isDeleting === true && deletestatus?.id === ele._id ?
                              <div className="spinner-border border-0 d-flex align-items-center justify-content-center">
                                <ImSpinner4 className={`fs-5 text-white`} />
                              </div>
                              :
                              <MdDelete size={20} className='text-white' />
                            }
                          </button>
                        </div>
                      )
                    })}
                    {selectedModule?.pages?.length === 0 &&
                      <div className='d-flex bg-white border px-3 py-1 rounded-1 fw-semibold'>
                        <span className='text-truncate'>No page found</span>
                      </div>
                    }
                  </>
                }
              </div>
            </div>
            :
            <div className="bg-body-tertiary p-3 border rounded-1">
              <div className='mb-3'>
                <span className="d-block text-center fs-5 fw-bold text-capitalize mt-3">
                  Please select course & module
                </span>
              </div>
            </div>
          }
        </div>
        :
        <>
          <div className='p-3 border rounded-2 shadow-sm col-md-6 col-12' style={{ whiteSpace: 'break-space', wordBreak: 'break-word' }} dangerouslySetInnerHTML={{ __html: currPage?.html ?? '' }}></div>
        </>
      }
    </div>
  )
}

export default AddCoursePages
