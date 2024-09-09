import React, { useEffect, useState } from 'react'
import { CourseCard } from '../../components/Utility';
import axios from 'axios';
import { ImSpinner4 } from 'react-icons/im';

const Course = ({ DataContext, AdminContext }) => {

    let { courses, setCourses, isLoadingCourse, setIsLoadingCourse } = AdminContext
    let { backendHost, setResponseStatus, setResponseData } = DataContext

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingCourse(true)
                const fetch = await axios.get(`${backendHost}/api/admin/course`, { withCredentials: true })
                if (fetch.status === 200) {
                    setCourses(fetch?.data)
                }
            } catch (error) {
                console.log(error, 'COURSES_LOAD_ERROR');
            } finally {
                setIsLoadingCourse(false);
            }

        })();
        // eslint-disable-next-line
    }, [backendHost, setCourses])


    const [deleteInfo, setDeleteInfo] = useState({
        isDeleting: false,
        id: ''
    })

    const handleDeleteCourse = async (courseId) => {
        let confirmation = window.confirm('Are you sure want to delete page')
        if (confirmation === true) {
            setDeleteInfo({
                isDeleting: true,
                id: courseId
            })

            try {

                const fetch = await axios.post(`${backendHost}/api/admin/course/delete-course`, {
                    course_id: courseId
                }, { withCredentials: true })

                if (fetch.status === 200) {
                    setCourses(courses.filter(ele => ele._id !== courseId))
                }

            } catch (error) {
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: 'Error while deleting course',
                    message: error.response?.data
                })
            } finally {
                setDeleteInfo({})
                setTimeout(() => {
                    setResponseStatus(false)
                    setResponseData({})
                }, 10000);
            }
        }
    }

    return (
        <div className='w-100 mb-auto'>
            <div className='w-100 d-flex flex-wrap gap-4 justify-content-md-start justify-content-center'>
                {isLoadingCourse ?
                    <div className='d-flex align-items-center'>
                        <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                            <ImSpinner4 className='text-theam fs-5' />
                        </div>
                        <span>Loading Data</span>
                    </div>
                    :
                    courses.map((ele) => {
                        return (
                            <CourseCard
                                key={ele._id}
                                courseTitle={ele.name}
                                id={ele._id}
                                img={ele.img}
                                adminComponent={true}
                                deleteCourse={() => { handleDeleteCourse(ele._id) }}
                                deleteStatus={deleteInfo}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Course