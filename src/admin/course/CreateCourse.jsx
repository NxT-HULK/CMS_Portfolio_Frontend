import React, { useEffect, useRef, useState } from 'react'
import { CustomBtn, CustomTags } from '../../components/Utility'
import { HiDocumentArrowUp } from "react-icons/hi2";
import { GrPowerReset } from "react-icons/gr";
import JoditEditor from 'jodit-react';

const CreateCourse = ({
  DataContext, FunctionContext, AdminContext, setWorkspace
}) => {

  const { handleOnChange } = FunctionContext
  const { backendHost, setResponseStatus, setResponseData } = DataContext
  const { courses, setCourses, editData, setEditData } = AdminContext

  const addWorkForm = useRef()
  const [addCourseFormData, setaddCourseFormData] = useState({
    name: editData?.name || '',
    html: editData?.information || "",
    usedTech: (editData && JSON.parse(JSON.stringify(editData?.usedTech || "")).toString()) || "",
    welcome_screen: editData?.welcome_screen || "",
    bgUrl: editData?.img || ''
  })

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: 'Processing: Course Creation',
    })

    try {
      let fetching = await fetch(`${backendHost}/course`, {
        method: 'POST',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          name: addCourseFormData?.name || '',
          img: addCourseFormData?.bgUrl || '',
          usedTech: usedTech || [],
          information: addCourseFormData?.html || '',
          welcome_screen: addCourseFormData?.welcome_screen || '',
          id: editData?._id || ""
        })
      })

      let response = await fetching.json()
      if (fetching.ok) {
        setResponseData({
          isLoading: false,
          heading: `Course ${editData ? 'updatation' : 'creation'} success`,
          message: response.message
        })

        let curr = courses.find((ele) => { return ele._id === editData?._id || "" })
        if (curr) {
          let prevArr = courses.filter((ele) => {
            return ele._id !== editData?._id
          })
          prevArr.push(response.data)
          setCourses(prevArr)
        } else {
          setCourses([...courses, response?.data])
        }
      }

    } catch (error) {
      console.error(error)
      setResponseData({
        isLoading: false,
        heading: 'Processing: Course Creation',
        message: error.message
      })
    } finally {
      setTimeout(() => {
        setResponseData({})
        setResponseStatus(false)
        setEditData({})
        setaddCourseFormData({})
        setWorkspace(4)
      }, 5000);
    }
  }

  const [usedTech, setUsedTech] = useState([])
  useEffect(() => {
    (() => {
      if (addCourseFormData?.usedTech.length === 0) {
        setUsedTech([])
        return;
      }

      let arr = addCourseFormData?.usedTech.split(",")
      let finalArr = []

      Array.isArray(arr) && arr.forEach((ele) => {
        finalArr.push(ele.trim())
      });

      setUsedTech(finalArr)
    })();

  }, [addCourseFormData?.usedTech])


  return (
    <div className='w-100 my-4'>

      <div className='d-flex flex-wrap gap-2 mb-3'>
        {usedTech?.map((ele, idx) => {
          return <CustomTags tag={ele} key={`used-tech-arr-${idx}`} />
        })}
        <CustomTags tag="." className={'opacity-0'} />
      </div>

      <form className='rounded-3 w-100 z-0 position-relative' onSubmit={handleSubmitForm} ref={addWorkForm}>
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

        <div className='d-flex gap-3 align-items-center mt-3'>
          {editData ?
            <CustomBtn text="Update" icon={<HiDocumentArrowUp />} type={'submit'} />
            :
            <CustomBtn text="Submit" icon={<HiDocumentArrowUp />} type={'submit'} />
          }

          <button type={'reset'} className={`btn-reset user-select-none theam-btn-big`} onClick={() => { setEditData(null); setaddCourseFormData(null) }}>
            <span><GrPowerReset /> </span>
            <span className='fs-6'>Reset Form</span>
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateCourse