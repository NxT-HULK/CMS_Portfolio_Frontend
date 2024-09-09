import React, { useEffect, useState } from 'react'
import { CustomBtn, CustomTags } from '../../components/Utility'
import { HiDocumentArrowUp } from "react-icons/hi2";
import { GrPowerReset } from "react-icons/gr";
import JoditEditor from 'jodit-react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const CreateCourse = ({ DataContext, FunctionContext, AdminContext }) => {

  const { handleOnChange, removeSlash } = FunctionContext
  const { backendHost, setResponseStatus, setResponseData } = DataContext
  const { courses, setCourses } = AdminContext

  const [addCourseFormData, setaddCourseFormData] = useState({
    name: '',
    html: "",
    usedTech: "",
    welcome_screen: "",
    bgUrl: ''
  })

  const location = useLocation()
  const [params] = useSearchParams()
  const [updateFlag, setUpdateFlag] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    (async () => {
      if (removeSlash(location.pathname).indexOf("edit-details") > 0) {
        if (courses.length === 0) {
          try {
            const fetch = await axios.get(`${backendHost}/api/admin/course`, { withCredentials: true })
            if (fetch.status === 200) {
              setCourses(fetch?.data)
            }
          } catch (error) {
            console.log(error);
          }
        }

        setaddCourseFormData(() => {
          let curr = courses?.find(ele => ele._id === params.get('id'))

          if (!curr) {
            navigate("/admin/course/new-course")
          }

          setUpdateFlag(curr)

          return {
            name: curr?.name,
            html: curr?.information,
            usedTech: curr?.usedTech?.join(", "),
            welcome_screen: curr?.welcome_screen,
            bgUrl: curr?.img
          }
        })
      }
    })();
  }, [courses, params, setCourses, backendHost])

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: 'Processing: Course Creation',
    })

    try {
      const fetch = await axios.post(`${backendHost}/api/admin/course`, {
        name: addCourseFormData?.name || '',
        img: addCourseFormData?.bgUrl || '',
        usedTech: usedTech || [],
        information: addCourseFormData?.html || '',
        welcome_screen: addCourseFormData?.welcome_screen || '',
        id: updateFlag?._id ?? ""
      }, { withCredentials: true })

      if (fetch?.status === 201) {
        setResponseData({
          isLoading: false,
          heading: `Course creation success`,
          message: fetch?.data?.message
        })

        setCourses([...courses, fetch?.data?.data])
        setTimeout(() => {
          navigate("/admin/course")
        }, 2000);
      } else if (fetch?.status === 200) {
        setResponseData({
          isLoading: false,
          heading: `Course updatation success`,
          message: fetch?.data?.message
        })

        setCourses([...courses.filter(ele => ele?._id !== updateFlag?._id), fetch?.data?.data])
        setUpdateFlag({ welcome_screen: "", html: "" })
        setaddCourseFormData({ welcome_screen: "", html: "" })

        setTimeout(() => {
          navigate("/admin/course")
        }, 2500);
      }
    } catch (error) {
      console.error(error)
      setResponseData({
        isLoading: false,
        heading: 'Error',
        message: error.response?.data
      })
    }
  }

  const [usedTech, setUsedTech] = useState([])
  useEffect(() => {
    (() => {
      if (addCourseFormData?.usedTech?.length === 0) {
        setUsedTech([])
        return;
      }

      let arr = addCourseFormData?.usedTech?.split(",")
      let finalArr = []

      Array.isArray(arr) && arr?.forEach((ele) => {
        finalArr.push(ele?.trim())
      });

      setUsedTech(finalArr)
    })();

  }, [addCourseFormData?.usedTech])


  return (
    <div className='w-100 mb-4'>
      <div className='d-flex flex-wrap gap-2 mb-3'>
        {usedTech?.map((ele, idx) => {
          return <CustomTags tag={ele} key={`used-tech-arr-${idx}`} />
        })}
      </div>

      <form className='rounded-3 w-100 z-0 position-relative' onSubmit={handleSubmitForm}>
        <div className="mb-3 d-flex flex-wrap gap-md-0 gap-2">
          <input
            type="text"
            name="name"
            className="rounded-1 custom-input-style"
            placeholder="Course Name*"
            onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
            defaultValue={addCourseFormData?.name ?? ''}
          />
        </div>

        <div className="mb-3 d-flex flex-wrap gap-md-0 gap-2">
          <div className="col-md-6 col-12 pe-md-2 pe-0">
            <input
              type="text"
              name="bgUrl"
              className="rounded-1 custom-input-style"
              placeholder="(Background Image) https://www...*"
              onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
              defaultValue={addCourseFormData?.bgUrl ?? ''}
            />
          </div>
          <div className="col-md-6 col-12">
            <input
              type="text"
              name="usedTech"
              className="rounded-1 custom-input-style"
              placeholder="Used Technology - React, Express, Node, MongoDB, MySQL ...*"
              onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
              defaultValue={addCourseFormData?.usedTech ?? ''}
            />
          </div>
        </div>

        <div className="mb-2 position-relative mt-3">
          <span className='opacity-75 d-block col-12 text-truncate' style={{ fontSize: '14px' }}>
            Welcome screen raw html/First page(Prerequest, Module description, ...etc)
          </span>
          <JoditEditor
            value={addCourseFormData?.welcome_screen ?? ''}
            onChange={(value) => setaddCourseFormData({ ...addCourseFormData, welcome_screen: value })}
          />
        </div>

        <div className="mb-2 position-relative mt-3">
          <span className='opacity-75 d-block col-12 text-truncate' style={{ fontSize: '14px' }}>
            Course description raw html/Introduction and overview of course(Introduction, What we'll going to learn)
          </span>
          <JoditEditor
            value={addCourseFormData?.html ?? ''}
            onChange={(value) => setaddCourseFormData({ ...addCourseFormData, html: value })}
          />
        </div>

        <div className='d-flex gap-3 align-items-center justify-content-center mt-3'>
          {updateFlag ?
            <CustomBtn text="Update" icon={<HiDocumentArrowUp />} type={'submit'} />
            :
            <CustomBtn text="Submit" icon={<HiDocumentArrowUp />} type={'submit'} />
          }

          <button type={'reset'} className={`btn-reset user-select-none theam-btn-big`} onClick={() => { setaddCourseFormData(null) }}>
            <span><GrPowerReset /> </span>
            <span className='fs-6'>Reset Form</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCourse