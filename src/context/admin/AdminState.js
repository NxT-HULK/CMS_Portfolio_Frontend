import React, { useEffect, useState } from 'react'
import AdminContext from './AdminContext'
import { useContext } from 'react';
import DataContext from '../data/DataContext';

const AdminState = (props) => {

    let { backendHost, setResponseStatus, setResponseData } = useContext(DataContext)

    const [isLoadingCourse, setIsLoadingCourse] = useState(false);
    const [courses, setCourses] = useState([])
    useEffect(() => {
        (async () => {
            try {
                setIsLoadingCourse(true)
                const fetching = await fetch(`${backendHost}/course/admin`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await fetching.json();
                if (fetching.status === 200) {
                    setCourses(data?.courses)
                }
            } catch (error) {
                console.log(error, 'COURSES_LOAD_ERROR');
            } finally {
                setIsLoadingCourse(false);
            }
        })()

    }, [backendHost]);

    const getCourseModule = async (courseId) => {
        let moduleArr = courses.filter((ele) => { return ele._id === courseId })[0].modules
        let fetching = await fetch(`${backendHost}/course/modules`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                module_arr: moduleArr
            })
        })

        return fetching
    }

    const [edditTargetedCourse, setEdditTargetedCourse] = useState(null)

    const [isUpdating, setIsUpdating] = useState(false)
    const handleChangeStatus = async (e, id) => {
        try {
            setIsUpdating(true)
            let res = await fetch(`${backendHost}/course/update_status/`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({
                    course_id: id,
                    update: e.target.checked
                })
            })

            if (res.ok) {
                let curr = courses.find((ele) => { return ele._id === id })
                curr.status = e.target.checked

                let restArr = courses.filter((ele) => {
                    return ele._id !== id
                })

                restArr.push(curr)
                restArr.sort((a, b) => { return Date(a.createdAt) - Date(b.createdAt) })
                setCourses(restArr)

            } else {
                setResponseStatus(true)
                setResponseData({
                    isLoading: false,
                    heading: 'Unathorized',
                    message: 'Unathorize access not allowed'
                })
            }

        } catch (error) {

            console.error(error, 'ERROR_WHILE_COURSE_UPDATE')
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: 'ERROR_WHILE_COURSE_UPDATE',
                message: error.message
            })

        } finally {
            setIsUpdating(false)
            setResponseStatus(false)
            setResponseData({})
        }
    }

    const [editData, setEditData] = useState(null)
    const [addCourseresetForm, setaddCourseresetForm] = useState(false)

    const [editModule, setEditModule] = useState({
        flag: false,
        data: null,
        course_id: null
    })

    const [editPage, setEditPage] = useState({
        flag: false,
        data: null
    })

    useEffect(() => {
        console.log(editModule, editPage);
    }, [editModule, editPage])
    

    return (
        <AdminContext.Provider value={{
            isLoadingCourse, courses, setCourses, getCourseModule, edditTargetedCourse, setEdditTargetedCourse,
            handleChangeStatus, isUpdating, editData, setEditData, addCourseresetForm, setaddCourseresetForm,
            editModule, setEditModule, editPage, setEditPage
        }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState