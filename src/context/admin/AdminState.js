import React, { useState } from 'react'
import AdminContext from './AdminContext'
import { useContext } from 'react';
import DataContext from '../data/DataContext';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import FunctionContext from '../function/FunctionContext';

const AdminState = (props) => {

    const location = useLocation()
    const navigate = useNavigate()

    const { removeSlash } = useContext(FunctionContext)
    let { backendHost, setResponseStatus, setResponseData } = useContext(DataContext)

    const [isLoadingCourse, setIsLoadingCourse] = useState(false);
    const [courses, setCourses] = useState([])


    const [isLoadingModule, setIsLoadingModule] = useState(false)
    const getCourseModule = async (courseId) => {
        try {
            setIsLoadingModule(true)
            let moduleArr = courses.filter((ele) => ele?._id === courseId)[0].modules

            const fetching = await axios.post(`${backendHost}/api/client/course/modules`, {
                module_arr: moduleArr
            }, { withCredentials: true })

            setIsLoadingModule(false)
            return fetching?.data
        } catch (error) {
            return null
        }
    }


    const [deletestatus, setDeletestatus] = useState({
        isDeleting: false,
        id: ''
    })


    const handleDeleteModule = async (courseId, moduleId) => {
        setDeletestatus({
            isDeleting: true,
            id: moduleId
        })

        try {

            const fetching = await axios.post(`${backendHost}/api/admin/course/module`, {
                course_id: courseId,
                module_id: moduleId
            }, { withCredentials: true })

            return fetching

        } catch (error) {

            console.log(error)
            setResponseStatus(true)
            setResponseData({
                isLoading: false,
                heading: 'Module deletion failed!',
                message: error.message
            })

            return null

        } finally {
            setDeletestatus({})
            setTimeout(() => {
                setResponseStatus(false)
                setResponseData({})
            }, 10000);
        }
    }


    const [isUpdating, setIsUpdating] = useState(false)
    const handleChangeStatus = async (course_id, flag) => {
        try {
            setIsUpdating(true)

            const res = await axios.put(`${backendHost}/api/admin/course/update_status`, {
                course_id,
                update: flag
            }, { withCredentials: true })

            if (res.status === 200) {
                let curr = courses.find((ele) => ele._id === course_id)
                curr.status = flag

                let restArr = courses.filter((ele) => ele._id !== course_id)

                restArr.push(curr)
                restArr.sort((a, b) => Date(a.createdAt) - Date(b.createdAt))
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


    const [addCourseresetForm, setaddCourseresetForm] = useState(false)


    const [editModule, setEditModule] = useState({
        flag: false,
        data: null,
        course_id: null
    })


    const [isLoadingCurrData, setIsLoadingCurrData] = useState(false)
    const [currData, setCurrData] = useState({
        modules: [],
        pages: []
    })


    const [allPages, setAllPages] = useState([])
    const [isLoadingPages, setIsLoadingPages] = useState(false)
    const getAllPages = async (moduleId) => {
        setIsLoadingPages(true)

        if (!moduleId)
            return null
        try {
            const response = await axios.post(`${backendHost}/api/client/course/modules/pages`, {
                module_id: moduleId
            }, { withCredentials: true })

            response?.data.sort((a, b) => {
                return a?.page_number - b?.page_number
            })

            setAllPages(response?.data)
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoadingPages(false)
        }
    }

    const [deletePageStatus, setDeletePageStatus] = useState({ isDeleting: false, id: '' })
    const handleDeletePage = async (module, page) => {
        let confirmation = window.confirm('Are you sure want to delete page')
        if (confirmation === true) {
            setDeletePageStatus({ isDeleting: true, id: page })
            try {
                let fetching = await axios.post(`${backendHost}/api/admin/course/modules/page`, {
                    module_id: module,
                    page_id: page
                }, { withCredentials: true })

                if (fetching.status === 200) {
                    setResponseData({
                        isLoading: false,
                        heading: "Status",
                        message: fetching?.data
                    })

                    setAllPages(allPages.filter(ele => ele._id !== page))
                    if (removeSlash(location?.pathname).indexOf("edit-content") >= 0) {
                        navigate("admin/course")
                    }

                } else {
                    console.log(fetching);
                }

            } catch (error) {
                console.log(error);
                setResponseStatus(true);
                setResponseData({
                    isLoading: false,
                    heading: 'Error occured while deleting page from module',
                    message: error.message
                })
            }
        } else {
            return;
        }
    }

    const [authorityMode, setAuthorityMode] = useState(null)

    return (
        <AdminContext.Provider value={{
            isLoadingCourse, courses, setCourses, getCourseModule, handleChangeStatus, isUpdating,
            addCourseresetForm, setaddCourseresetForm, editModule, setEditModule, currData, setCurrData,
            isLoadingCurrData, setIsLoadingCurrData, deletestatus, setDeletestatus, handleDeleteModule,
            isLoadingModule, allPages, setAllPages, isLoadingPages, getAllPages, handleDeletePage,
            deletePageStatus, authorityMode, setAuthorityMode, setIsLoadingCourse
        }}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminState