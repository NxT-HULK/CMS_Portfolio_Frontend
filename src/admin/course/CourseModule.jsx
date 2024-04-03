import React, { useEffect, useState } from 'react'
import { CustomBtn, FirstLetterEffectText, LoadingDataSpinner } from '../../components/Utility'
import { LuFolderCog } from 'react-icons/lu'
import { ImSpinner4 } from 'react-icons/im'
import { MdDelete } from 'react-icons/md'

const CourseModule = ({
  FunctionContext, DataContext, AdminContext, setWorkspace
}) => {

  const [data, setdata] = useState({})
  let { handleOnChange } = FunctionContext
  let { backendHost, setResponseStatus, setResponseData } = DataContext
  let { isLoadingCourse, courses, setCourses, getCourseModule, editModule, setEditModule } = AdminContext

  const [isSelected, setIsSelected] = useState(false)
  const [isLoadingModule, setIsLoadingModule] = useState(false)
  const [moduleArray, setModuleArray] = useState([])
  const handleLoadRestData = async (courseId) => {
    if (courseId.length > 0) {
      setIsSelected(true)
      setIsLoadingModule(true)

      try {

        let fetching = await getCourseModule(courseId)
        let response = await fetching.json()
        if (fetching.status === 200) {
          setModuleArray(response)
        } else {
          setModuleArray([])
        }

      } catch (error) {
        setResponseStatus(true)
        setResponseData({
          isLoading: false,
          heading: 'Error',
          message: error.message
        })
      } finally {
        setResponseStatus(false)
        setResponseData({})
        setIsLoadingModule(false)
      }
    } else {
      setIsSelected(false)
    }
  }

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: 'Adding Module'
    })
    try {
      let fetching = await fetch(`${backendHost}/course/add_module`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          course_id: data?.course || '',
          module_name: data?.name || '',
          module_number: data?.module_number,
          update: editModule?.flag,
          module_id: editModule?.flag ? editModule?.data?._id : null
        })
      })

      let response = await fetching.json()

      if (fetching.status === 201) {
        setResponseData({
          isLoading: false,
          heading: 'Adding Module: Success',
          message: response.message
        })

        setModuleArray([...moduleArray, response.data])
        setCourses(() => {
          let resData = courses.filter(ele => ele._id !== data.course)
          let currObj = courses.filter(ele => ele._id === data.course)[0]
          currObj.modules.push(response.data)
          resData.push(currObj)
          resData.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
          return resData
        })

        e.target.reset()

      } else if (fetching.status === 200) {

        setResponseData({
          isLoading: false,
          heading: 'Modifying Module: Success',
          message: 'Modification success'
        })

        let curr = moduleArray.find((ele) => {
          return ele._id === editModule.data._id
        })

        curr.module_name = data.name
        curr.module_number = data.module_number

        let restData = moduleArray.filter((ele) => {
          return ele._id !== editModule.data._id
        })

        restData.push(curr)
        setModuleArray(restData)
        setEditModule(null)
        setdata(null)
        setWorkspace(4)

      } else {
        setResponseData({
          isLoading: false,
          heading: 'Adding Module',
          message: response
        })
      }
    } catch (error) {
      console.log(error);
      setResponseData({
        isLoading: false,
        heading: 'Adding Module: Error',
        message: error.message
      })
    } finally {
      setTimeout(() => {
        setResponseStatus(false)
        setResponseData({})
      }, 10000);
    }
  }

  const [deletestatus, setDeletestatus] = useState({
    isDeleting: false,
    id: ''
  })

  const handleDeletePage = async (moduleId) => {
    setDeletestatus({
      isDeleting: true,
      id: moduleId
    })

    try {

      let fetching = await fetch(`${backendHost}/course/module`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          course_id: data?.course,
          module_id: moduleId
        })
      })

      if (fetching.status === 200) {
        setModuleArray(moduleArray.filter((ele) => { return ele._id !== moduleId }))
      } else {
        console.log(fetching)
        setResponseStatus(true);
        setResponseData({
          isLoading: false,
          heading: 'Error while deleting module',
          message: 'Check console for more information'
        })
      }

    } catch (error) {

      console.log(error)
      setResponseStatus(true)
      setResponseData({
        isLoading: false,
        heading: 'Module deletion failed!',
        message: error.message
      })

    } finally {
      setDeletestatus({})
      setTimeout(() => {
        setResponseStatus(false)
        setResponseData({})
      }, 10000);
    }

  }

  const handleEditModule = () => {
    setIsSelected(true)
    setModuleArray([editModule.data])
    setdata({
      ...data,
      course: editModule.course_id,
      module_name: editModule.data.module_name,
      module_number: editModule.data.module_number,
    })
  }

  useEffect(() => {
    if (editModule?.flag === true) {
      handleEditModule()
    }
  }, [editModule?.flag])


  return (
    <div className='w-100'>
      {isLoadingCourse ?
        <LoadingDataSpinner className={'text-theam'} />
        :
        <div className="w-100 d-flex flex-md-row flex-column-reverse py-5">
          <div className='col-md-6 col-12 pe-md-2 pe-0'>
            <form onSubmit={handleSubmitForm}>
              <div className="d-flex flex-wrap gap-3">
                <div className="col-12">
                  <select
                    name="course"
                    id="course"
                    className='rounded-1 custom-input-style'
                    defaultValue={editModule?.course_id || ''}
                    onChange={(e) => { handleOnChange(e, data, setdata); handleLoadRestData(e.target.value) }}
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
                    defaultValue={editModule?.data?.module_name || ''}
                    onChange={(e) => { handleOnChange(e, data, setdata) }}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    name="module_number"
                    className="rounded-1 custom-input-style"
                    placeholder="Module Number*"
                    defaultValue={editModule?.data?.module_number || ''}
                    onChange={(e) => { handleOnChange(e, data, setdata) }}
                  />
                </div>
              </div>

              <div className={'mt-3'}>
                {editModule?.flag ?
                  <CustomBtn text={"Make Changes"} icon={<LuFolderCog />} type={'submit'} />
                  :
                  <CustomBtn text={"Add Module"} icon={<LuFolderCog />} type={'submit'} />
                }
              </div>
            </form>
          </div>

          <div className='col-md-6 col-12 ps-md-2 ps-0'>
            {isSelected === true ?
              <div className="bg-body-tertiary p-3 border rounded-1">
                <div className='mb-3'>
                  {editModule?.flag === true ?
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
                      {moduleArray.length > 0 && moduleArray.map((ele) => {
                        return (
                          <div className='d-flex bg-white border border-theam px-3 pe-0 rounded-1 fs-5 fw-bold' key={ele._id}>
                            <span className='d-inline-flex text-theam py-2'>
                              <span>{ele?.module_number}</span>
                              <span>.&nbsp;</span>
                            </span>
                            <span className='text-truncate py-2'>{ele?.module_name}</span>

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

                      {moduleArray.length === 0 &&
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