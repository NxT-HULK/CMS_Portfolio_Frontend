import React, { useEffect, useState } from 'react'
import { AccordianCustom, LoadingDataSpinner, SidebarAccordianList } from '../../components/Utility'

const EditCoursePage = ({
  AdminContext, setWorkspace, DataContext
}) => {

  const { backendHost, setResponseStatus, setResponseData } = DataContext
  const { edditTargetedCourse, courses, isUpdating, handleChangeStatus, setEditData, setaddCourseresetForm, setEditModule, setEditPage } = AdminContext
  const [selectedCourse, setSelectedCourse] = useState(null)

  useEffect(() => {
    let data = courses.find((ele) => {
      return ele._id === edditTargetedCourse
    })

    setSelectedCourse(data)
  }, [courses, edditTargetedCourse])

  useEffect(() => {
    setaddCourseresetForm(true)
  }, [setaddCourseresetForm])

  const handleBasicDetails = () => {
    setEditData(courses.find((ele) => { return ele._id === edditTargetedCourse }))
    setWorkspace('create_course')
  }

  const [isLoadingCurrData, setIsLoadingCurrData] = useState(false)
  const [currData, setCurrData] = useState({
    modules: [],
    pages: []
  })
  useEffect(() => {
    (async () => {
      setIsLoadingCurrData(true)
      try {

        if (selectedCourse && selectedCourse._id) {
          let fetching = await fetch(`${backendHost}/course/learning-matarial/${selectedCourse?._id}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          })

          let data = await fetching.json()
          setCurrData({
            modules: data?.modules,
            pages: data?.pages
          })
        }

      } catch (error) {
        setResponseStatus(true)
        setResponseData({
          isLoading: false,
          heading: `Error on getting course data for editting`,
          message: error.message
        })
      } finally {
        setIsLoadingCurrData(false)
        setResponseStatus(false)
        setResponseData({})
      }
    })()
    // eslint-disable-next-line
  }, [selectedCourse?._id, setCurrData, backendHost, setResponseData, setResponseStatus])

  return (
    <>
      <div className='w-100 mb-auto my-4'>
        <div className="d-flex flex-wrap gap-md-0 gap-2 border-bottom px-2 py-1">
          <div className="col-md-10 col-12">
            <span className="d-block col-12 text-truncate fs-5 fw-semibold"> {selectedCourse?.name} </span>
          </div>

          <div className="col-md-2 col-12 d-flex align-items-center justify-content-md-end justify-content-start">
            {isUpdating ?
              <>
                <LoadingDataSpinner className={'text-theam'} />
              </>
              :
              <div className="form-check form-switch">
                <label className="form-check-label" htmlFor="course_update"> Status </label>
                <input
                  className="form-check-input shadow-none"
                  type="checkbox"
                  role="switch"
                  id='course_update'
                  checked={selectedCourse?.status || false}
                  onChange={(e) => {
                    handleChangeStatus(e, edditTargetedCourse)
                  }}
                />
              </div>
            }
          </div>
        </div>

        <div className='my-3'>
          <button
            className='btn-reset user-select-none theam-btn-big text-white'
            type="button"
            onClick={handleBasicDetails}
          >
            Edit Basic Details
          </button>
        </div>

        <div>
          {isLoadingCurrData === true ?
            <LoadingDataSpinner className={'text-theam'} />
            :
            <>
              <div className='d-flex flex-column gap-3 my-3'>
                {Array.isArray(currData.modules) && currData.modules.map((ele, index) => {
                  return (
                    <AccordianCustom
                      id={ele._id}
                      idx={index + 1}
                      name={ele.module_name}
                      subModuleLen={ele.pages.length}
                      key={ele._id + `${index}-module`}
                      lastUpdated={ele.updatedAt}
                      setEditModule={setEditModule}
                      
                      adminMode={true}
                      setWorkspace={setWorkspace}
                      adminCurrData={currData}
                      course_id={selectedCourse?._id}
                    >
                      {ele.pages.map((page, idx) => {
                        let data = currData.pages.find((val) => val._id === page)
                        return (
                          <SidebarAccordianList
                            ofModule={ele._id}
                            id={data._id}
                            name={data.name}
                            page={idx + 1}
                            lastUpdated={data.updatedAt}
                            key={page._id + `${idx}-page`}
                            setEditPage={setEditPage}
                            
                            adminMode={true}
                            setWorkspace={setWorkspace}
                            adminCurrData={currData}
                          />
                        )
                      })}
                    </AccordianCustom>
                  )
                })}

              </div>
            </>
          }
        </div>

      </div>
    </>
  )
}

export default EditCoursePage