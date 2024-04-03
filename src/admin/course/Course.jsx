import React, { useState } from 'react'
import { FaFolderPlus } from 'react-icons/fa'
import { HiDocumentPlus } from "react-icons/hi2";
import { CourseCard, LoadingDataSpinner } from '../../components/Utility';
import { LuFolderCog } from "react-icons/lu";

const Course = ({
    setWorkspace, DataContext, AdminContext
}) => {

    let { courses, setCourses, isLoadingCourse, setEdditTargetedCourse } = AdminContext
    let { backendHost, setResponseStatus, setResponseData } = DataContext

    const [deleteInfo, setDeleteInfo] = useState({
        isDeleting: false,
        id: ''
    })

    const handleDeleteCourse = async (courseId) => {
        setDeleteInfo({
            isDeleting: true,
            id: courseId
        })

        try {

            let fetching = await fetch(`${backendHost}/course`, {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    course_id: courseId
                })
            })

            if (fetching.ok) {
                setCourses(courses.filter(ele => ele._id !== courseId))
            }

        } catch (error) {
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: 'Error while deleting course',
                message: error.message
            })
        } finally {
            setDeleteInfo({})
            setTimeout(() => {
                setResponseStatus(false)
                setResponseData({})
            }, 10000);
        }
    }

    return (
        <div className='w-100 mb-auto'>
            <div className='w-100 mb-4'>
                <div className='my-4'>
                    <div className='d-flex gap-3'>
                        <button type="button" className='simleButton-with-shaded width-fit px-2' onClick={() => { setWorkspace('create_course') }}>
                            <FaFolderPlus className='text-white me-1' />
                            Create Course
                        </button>
                        <button type="button" className='simleButton-with-shaded width-fit px-2' onClick={() => { setWorkspace('create_course_module') }}>
                            <LuFolderCog className='text-white me-1' />
                            Create new module
                        </button>
                        <button type="button" className='simleButton-with-shaded width-fit px-2' onClick={() => { setWorkspace('add_course_pages') }}>
                            <HiDocumentPlus className='text-white me-1' />
                            Add Pages
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-100 d-flex flex-wrap gap-4'>
                {isLoadingCourse ?
                    <LoadingDataSpinner />
                    :
                    courses.map((ele) => {
                        return (
                            <CourseCard
                                key={ele._id}
                                courseTitle={ele.name}
                                id={ele._id}
                                img={ele.img}
                                adminComponent={true}
                                onClick={() => { setWorkspace('edit_course_pages') }}
                                deleteCourse={() => { handleDeleteCourse(ele._id) }}
                                deleteStatus={deleteInfo}
                                editSetter={setEdditTargetedCourse}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Course