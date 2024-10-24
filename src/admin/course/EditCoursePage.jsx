import React, { useContext, useEffect, useState } from 'react'
import { AccordianCustom, LoadingDataSpinner, SidebarAccordianList } from '../../components/Utility'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'
import DataContext from '../../context/data/DataContext'

const Help = ({ allPages, pages, course_id, ofModule, setCurrData }) => {

  const [data, setData] = useState(() => {
    let temp = allPages?.filter((page) => pages?.includes(page?._id))
    temp.sort((a, b) => a?.page_number - b?.page_number)
    return temp
  })

  const { backendHost, setResponseData, setResponseStatus } = useContext(DataContext)

  const handleTogglePageStatus = async (id, flag) => {
    try {
      setResponseStatus(true)
      setResponseData({
        isLoading: true,
        heading: "Updating Page Visibility",
        message: ""
      })

      const fetching = await axios.post(`${backendHost}/api/admin/course/toggle-page-status`, { id, flag }, {
        withCredentials: true
      })

      if (fetching?.status === 200) {
        setResponseData({
          isLoading: false,
          heading: "Updating Page Visibility",
          message: fetching?.data
        })

        setCurrData((prev) => {
          return {
            ...prev, pages: prev?.pages?.map(ele => {
              if (ele?._id === id) {
                return { ...ele, status: flag };  // Update status here
              }
              return ele;
            })
          };
        })

        setData((prev) => {
          return prev?.map(ele => {
            if (ele?._id === id)
              return { ...ele, status: flag }
            return ele
          })
        })
      }

    } catch (error) {

      setResponseData({
        isLoading: false,
        heading: error?.response?.status === 400 || error?.response?.status === 404
          ? "Validation Failed"
          : "Error",
        message: error?.response?.data || "Server Error"
      });

      console.error(error);

    } finally {
      setTimeout(() => {
        setResponseStatus(false)
      }, 5000);
    }
  }

  return (
    data?.map((page, idx) => {
      return (
        <SidebarAccordianList
          key={page?._id + `${idx}-page`}
          id={page?._id}
          name={page?.name}
          page={page?.page_number}
          lastUpdated={page?.updatedAt}
          ofModule={ofModule}
          adminMode={true}
          course_id={course_id}
          pageStatus={page?.status}
          handleTogglePageStatus={handleTogglePageStatus}
        />
      )
    })
  )
}

const EditCoursePage = ({ AdminContext, DataContext }) => {

  const { backendHost, setResponseStatus, setResponseData } = DataContext
  const { courses, setCourses, isUpdating, handleChangeStatus, currData, setCurrData, isLoadingCurrData, setIsLoadingCurrData, deletestatus, handleDeleteModule } = AdminContext
  const [selectedCourse, setSelectedCourse] = useState(null)

  const [params] = useSearchParams()
  useEffect(() => {
    (async () => {
      if (courses?.length === 0) {
        setIsLoadingCurrData(true)
        const fetch = await axios.get(`${backendHost}/api/admin/course`, { withCredentials: true })
        if (fetch.status === 200) {
          setCourses(fetch?.data)
        }
      }

      const curr = courses.find(ele => ele?._id === params.get("id"))
      if (curr) {
        setSelectedCourse(curr)
      }
    })();
    // eslint-disable-next-line
  }, [courses, params, backendHost])

  const [isLoadingModules, setIsLoadingModules] = useState(null)
  useEffect(() => {
    (async () => {
      try {
        if (selectedCourse && selectedCourse?._id) {
          setIsLoadingModules(true)
          const fetching = await axios.post(`${backendHost}/api/admin/course/learning-material/`, {
            course: selectedCourse?._id
          }, { withCredentials: true })

          let data = fetching?.data
          setCurrData({
            modules: data?.modules,
            pages: data?.pages
          })
          setIsLoadingModules(false)
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
    })();
    // eslint-disable-next-line
  }, [selectedCourse, setCurrData, backendHost])

  return (
    <>
      {isLoadingCurrData === true ?
        <div className='d-flex align-items-center justify-content-center my-5 py-5'>
          <LoadingDataSpinner className={'text-theam'} />
        </div>
        :
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
                <div className='d-flex gap-1 user-select-none'>
                  <span className='fw-medium'>Course Status</span>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input shadow-none order-2"
                      type="checkbox"
                      role="switch"
                      id='course_update'
                      checked={selectedCourse?.status || false}
                      onChange={() => {
                        handleChangeStatus(params.get("id"), !selectedCourse?.status)
                      }}
                    />
                  </div>
                </div>
              }
            </div>
          </div>

          {isLoadingModules === true ?
            <div className='d-flex align-items-center justify-content-center my-5 py-5'>
              <LoadingDataSpinner className={'text-theam'} />
            </div>
            :
            <div className='d-flex flex-column gap-3 my-3'>
              {currData?.modules?.map((ele, index) => {
                let lastUpdate = currData?.pages?.filter((page) => page?.of_module === ele?._id) || []
                if (lastUpdate.length > 0) {
                  lastUpdate.sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
                }

                return (
                  <AccordianCustom
                    id={ele?._id}
                    idx={index + 1}
                    name={ele?.module_name}
                    subModuleLen={ele?.pages?.length}
                    key={ele._id + `${index}-module`}
                    lastUpdated={lastUpdate?.[0]?.updatedAt}
                    adminMode={true}
                    adminCurrData={currData}
                    course_id={selectedCourse?._id}
                    setCurrModuleData={setCurrData}
                    deletestatus={deletestatus}
                    handleDeleteModule={handleDeleteModule}
                    setResponseStatus={setResponseStatus}
                    setResponseData={setResponseData}
                  >
                    <Help ofModule={ele?._id} allPages={currData?.pages} pages={ele?.pages} course_id={selectedCourse?._id} setCurrData={setCurrData} />
                  </AccordianCustom>
                )
              })}
            </div>
          }
        </div>
      }
    </>
  )
}

export default EditCoursePage