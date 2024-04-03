import React, { useEffect, useRef, useState } from 'react'
import { CustomBtn, CustomTags } from '../../components/Utility'
import { FaEye } from 'react-icons/fa'
import { HiDocumentArrowUp } from "react-icons/hi2";

const CreateCourse = ({
  DataContext, FunctionContext, AdminContext, setWorkspace, workspace
}) => {

  const { handleOnChange } = FunctionContext
  const { backendHost, setResponseStatus, setResponseData } = DataContext
  const { courses, setCourses, editData, setEditData, addCourseresetForm } = AdminContext

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
          console.log(prevArr);

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

  const handlePreviewData = (key) => {
    setResponseStatus(true)
    setResponseData({
      isLoading: false,
      heading: 'Live Preview',
      message: addCourseFormData[key] || ""
    })
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

  useEffect(() => {
    if (addCourseresetForm === true) {
      setEditData(null)
    }
  }, [addCourseresetForm, setEditData, setaddCourseFormData, workspace])


  return (
    <div className='w-100 my-4'>

      <div className='d-flex flex-wrap gap-2 mb-3'>
        {usedTech?.map((ele, idx) => {
          return <CustomTags tag={ele} key={`used-tech-arr-${idx}`} />
        })}
        <CustomTags tag="." className={'opacity-0'} />
      </div>

      <form className='rounded-3' onSubmit={handleSubmitForm} ref={addWorkForm}>
        <div className="mb-2 d-flex flex-wrap gap-md-0 gap-2">
          <input
            type="text"
            name="name"
            className="rounded-1 custom-input-style"
            placeholder="Course Name*"
            onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
            defaultValue={addCourseFormData?.name}
          />
        </div>

        <div className="mb-2 d-flex flex-wrap gap-md-0 gap-2">
          <div className="col-md-6 col-12 pe-md-2 pe-0">
            <input
              type="text"
              name="bgUrl"
              className="rounded-1 custom-input-style"
              placeholder="(Background Image) https://www...*"
              onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
              defaultValue={addCourseFormData?.bgUrl}
            />
          </div>
          <div className="col-md-6 col-12">
            <input
              type="text"
              name="usedTech"
              className="rounded-1 custom-input-style"
              placeholder="Used Technology - React, Express, Node, MongoDB, MySQL ...*"
              onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
              defaultValue={addCourseFormData?.usedTech}
            />
          </div>
        </div>

        <div className="mb-2 position-relative">
          <textarea
            name="welcome_screen"
            rows="5"
            className='w-100 custom-input-style rounded-1 font-monospace'
            placeholder="Welcome screen raw html/First page(Prerequest, Module description, ...etc)*"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
            defaultValue={addCourseFormData?.welcome_screen}
          />
          <button type="button" className="lh-1 btn-reset position-absolute m-2" style={{ top: 0, right: 0 }} onClick={() => { handlePreviewData('welcome_screen') }}>
            <FaEye className='fs-4 text-theam bg-white' />
          </button>
        </div>

        <div className="mb-2 position-relative">
          <textarea
            name="html"
            rows="5"
            className='w-100 custom-input-style rounded-1 font-monospace'
            placeholder="Course description raw html/Introduction and overview of course(Introduction, What we'll going to learn)*"
            data-gramm="false"
            data-gramm_editor="false"
            data-enable-grammarly="false"
            onChange={(e) => { handleOnChange(e, addCourseFormData, setaddCourseFormData) }}
            defaultValue={addCourseFormData?.html}
          />
          <button type="button" className="lh-1 btn-reset position-absolute m-2" style={{ top: 0, right: 0 }} onClick={() => { handlePreviewData('html') }}>
            <FaEye className='fs-4 text-theam bg-white' />
          </button>
        </div>

        <CustomBtn text="Submit" icon={<HiDocumentArrowUp />} type={'submit'} />
      </form>
    </div>
  )
}

export default CreateCourse