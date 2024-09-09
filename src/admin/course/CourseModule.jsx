import React, { useEffect, useState } from 'react'
import { CustomBtn, FirstLetterEffectText, LoadingDataSpinner } from '../../components/Utility'
import { LuFolderCog } from 'react-icons/lu'
import { ImSpinner4 } from 'react-icons/im'
import { MdDelete } from 'react-icons/md'
import { GrPowerReset } from 'react-icons/gr'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa'
import axios from 'axios'

const CourseModule = ({ FunctionContext, DataContext, AdminContext }) => {

  const [data, setdata] = useState({})
  let { handleOnChange, removeSlash } = FunctionContext
  let { backendHost, setResponseStatus, setResponseData } = DataContext
  let { courses, setCourses, getCourseModule, isLoadingCourse, deletestatus, handleDeleteModule } = AdminContext

  const navigate = useNavigate()
  const [allModules, setAllModules] = useState(null)
  const location = useLocation()
  const [params] = useSearchParams()
  const [editData, setEditData] = useState(null)

  const [isSelected, setIsSelected] = useState(false)
  const [isLoadingModule, setIsLoadingModule] = useState(false)

  useEffect(() => {
    (async () => {
      if (courses?.length === 0) {
        const fetch = await axios.get(`${backendHost}/api/admin/course`, { withCredentials: true })
        if (fetch.status === 200) {
          setCourses(fetch?.data)
        }
      }

      if (removeSlash(location?.pathname).indexOf("edit-module") > 0) {
        const course = params.get("course")
        setIsLoadingModule(true)
        const modules = await getCourseModule(course)
        setIsLoadingModule(false)

        const curr = await modules?.find((ele) => { return ele._id === params.get("module") })
        setAllModules(modules)

        if (curr !== null) {
          setEditData(curr)
          setdata(() => {
            setIsSelected(true)
            return {
              course: curr?.of_course,
              name: curr?.module_name,
              module_number: curr?.module_number
            }
          })
        } else {
          // navigate("/admin/course")
        }
      }
    })();
    // eslint-disable-next-line
  }, [courses, params])

  const handleIsSelected = async () => {
    setIsLoadingModule(true)
    const modules = await getCourseModule(data?.course)
    setAllModules(modules)
    setIsLoadingModule(false)
  }

  useEffect(() => {
    if (isSelected === true && data?.course?.length > 0) {
      handleIsSelected()
    } else {
      setIsSelected(false)
    }
    // eslint-disable-next-line
  }, [isSelected, data?.course])


  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: 'Adding Module'
    })
    try {
      const fetching = await axios.put(`${backendHost}/api/admin/course/add_module`, {
        course_id: data?.course || '',
        module_name: data?.name || '',
        module_number: data?.module_number,
        update: editData ? true : false,
        module_id: editData ? editData?._id : null
      }, { withCredentials: true })

      const response = fetching?.data

      if (fetching.status === 201) {
        setResponseData({
          isLoading: false,
          heading: 'Adding Module: Success',
          message: response.message
        })

        setAllModules([...allModules, response.data])
        setCourses(() => {
          let resData = courses.filter(ele => ele._id !== data.course)
          let currObj = courses.filter(ele => ele._id === data.course)[0]
          currObj.modules.push(response.data)
          resData.push(currObj)
          resData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          return resData
        })

        setdata({})
        setTimeout(() => {
          navigate("/admin/course")
        }, 3000);

      } else if (fetching.status === 200) {

        setResponseData({
          isLoading: false,
          heading: 'Modifying Module: Success',
          message: 'Modification success'
        })

        let curr = allModules.find((ele) => {
          return ele._id === editData?._id
        })

        curr.module_name = data?.name
        curr.module_number = data?.module_number

        let restData = allModules?.filter((ele) => {
          return ele._id !== editData._id
        })

        restData.push(curr)
        setAllModules(restData)
        setTimeout(() => {
          navigate("/admin/course")
        }, 3000);
      }
    } catch (error) {
      console.log(error);
      setResponseData({
        isLoading: false,
        heading: 'Adding Module: Error',
        message: error?.response?.data ?? "Server Error"
      })
    } finally {
      setTimeout(() => {
        setResponseStatus(false)
        setResponseData({})
      }, 5000);
    }
  }

  const handleDelete = async (courseId, moduleId) => {
    let fetching = await handleDeleteModule(courseId, moduleId)
    if (fetching?.status === 200) {
      setAllModules(allModules.filter((ele) => { return ele._id !== moduleId }))
    } else {
      console.log(fetching)
      setResponseStatus(true);
      setResponseData({
        isLoading: false,
        heading: 'Error while deleting module',
        message: 'Check console for more information'
      })
    }
  }

  return (
    <div className='w-100'>
      {isLoadingCourse ?
        <LoadingDataSpinner className={'text-theam'} />
        :
        <div className="w-100 d-flex flex-md-row flex-column-reverse pb-md-5 pb-3 gap-md-0 gap-3">
          <div className='col-md-6 col-12 pe-md-2 pe-0'>
            <form className='w-100 z-0 position-relative' onSubmit={(e) => { handleSubmitForm(e) }}>
              <div className="d-flex flex-wrap gap-3">
                <div className="col-12">
                  <select
                    name="course"
                    id="course"
                    className='rounded-1 custom-input-style'
                    value={data?.course}
                    onChange={(e) => { handleOnChange(e, data, setdata); setIsSelected(true); }}
                  >
                    <option value="">Select Course</option>
                    {courses.map((ele) => {
                      return (
                        <option key={ele._id} value={ele._id}>{ele.name}</option>
                      )
                    })}
                  </select>
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="name"
                    className="rounded-1 custom-input-style"
                    placeholder="Module Name*"
                    defaultValue={data?.name}
                    onChange={(e) => { handleOnChange(e, data, setdata) }}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="module_number"
                    className="rounded-1 custom-input-style"
                    placeholder="Module Number*"
                    defaultValue={data?.module_number}
                    onChange={(e) => { handleOnChange(e, data, setdata) }}
                  />
                </div>
              </div>

              <div className={'mt-3 d-flex gap-3'}>
                {editData ?
                  <CustomBtn text={"Make Changes"} icon={<LuFolderCog />} type={'submit'} />
                  :
                  <CustomBtn text={"Add Module"} icon={<LuFolderCog />} type={'submit'} />
                }

                <button type={'reset'} className={`btn-reset user-select-none theam-btn-big`} onClick={() => { setEditData(null); setdata(null); setIsSelected(null); navigate("/admin/course/new-module") }}>
                  <span><GrPowerReset /> </span>
                  <span className='fs-6'>Reset Form</span>
                </button>
              </div>
            </form>
          </div>

          <div className='col-md-6 col-12 ps-md-2 ps-0'>
            {isSelected === true ?
              <div className="bg-body-tertiary p-3 border rounded-1">
                <div className='mb-3'>
                  {editData ?
                    <FirstLetterEffectText text={'You are going to edit following module'} className={'text-truncate col-12 d-block'} />
                    :
                    <FirstLetterEffectText text={'Till now we have'} />
                  }
                </div>

                <div className='d-flex flex-column gap-2'>
                  {isLoadingModule ?
                    <LoadingDataSpinner className={'text-theam fw-bold'} />
                    :
                    <>
                      {allModules?.map((ele) => {
                        return (
                          <div className='d-flex justify-content-between align-items-stretch bg-white border border-theam ps-2 rounded-1 fs-5 fw-bold' key={ele._id}>
                            <div className='col-10 d-flex'>
                              <span className='d-inline-flex text-theam py-2'>
                                <span>{ele?.module_number}</span>
                                <span>.&nbsp;</span>
                              </span>
                              <span className='d-block text-truncate py-2'>{ele?.module_name}</span>
                            </div>

                            <div className='d-flex col-auto'>
                              <button className='h-100 d-flex align-items-center justify-content-center px-2 ms-auto bg-success border-0' onClick={() => { navigate(`/admin/course/edit-module?course=${data?.course}&module=${ele?._id}`) }}>
                                <FaEdit size={20} className='text-white mx-1' />
                              </button>
                              <button className='h-100 d-flex align-items-center justify-content-center px-2 ms-auto bg-danger border-0' onClick={() => { handleDelete(ele?.of_course, ele?._id) }}>
                                {deletestatus?.isDeleting === true && deletestatus?.id === ele._id ?
                                  <div className="spinner-border border-0 d-flex align-items-center justify-content-center">
                                    <ImSpinner4 className={`fs-5 text-white`} />
                                  </div>
                                  :
                                  <MdDelete size={20} className='text-white mx-1' />
                                }
                              </button>
                            </div>
                          </div>
                        )
                      })}

                      {allModules?.length === 0 &&
                        <div className='d-flex bg-white border border-theam px-2 rounded-1 fw-semibold'>
                          <span className='text-truncate py-1'>No Module Found! You need to create some</span>
                        </div>
                      }
                    </>
                  }
                </div>
              </div>
              :
              <div className="bg-body-tertiary p-3 border rounded-1">
                <div className='mb-3'>
                  <span className="d-block text-center fs-5 fw-bold text-capitalize mt-3">You have to select course first</span>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default CourseModule