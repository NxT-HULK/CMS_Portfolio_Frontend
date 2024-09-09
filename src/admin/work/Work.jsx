import React, { useEffect, useState } from 'react'
import { ImSpinner4 } from 'react-icons/im'
import { FaExternalLinkAlt, FaTrash } from 'react-icons/fa'
import { ButtonShaded, FirstLetterEffectText } from '../../components/Utility'
import { IoOptions } from "react-icons/io5";
import { FaAngleDown, FaAngleUp } from 'react-icons/fa6';
import axios from 'axios';

const Work = ({ DataContext, FunctionContext }) => {

    const { backendHost, setResponseData, setResponseStatus } = DataContext
    const { toSimpleDate } = FunctionContext

    const [workRawData, setWorkRawData] = useState([])
    const [mainData, setMainData] = useState([])
    const [isLoadingData, setIsLoadingData] = useState(false)
    const [isFormProcess, setIsFormProcess] = useState({
        status: false,
        _id: ""
    })

    useEffect(() => {
        (async () => {
            try {
                setIsLoadingData(true)
                const raw = await axios.get(`${backendHost}/api/admin/work`, { withCredentials: true })
                let data = raw?.data
                setWorkRawData(data)

                // Categorize data based on 'type'
                const categorizedData = data.reduce((result, currentItem) => {
                    const type = currentItem.type;

                    // Create an array for the type if it doesn't exist
                    if (!result[type]) {
                        result[type] = [];
                    }

                    // Push the current item to the array of its type
                    result[type].push(currentItem);

                    return result;
                }, {});

                for (let cat in categorizedData) {
                    categorizedData[cat].sort((a, b) => {
                        return a.order - b.order
                    })
                }

                setMainData(categorizedData)
                setIsLoadingData(false)
            } catch (error) {
                if (error.status === 400) {
                    setResponseStatus(true)
                    setResponseData({
                        isLoadingData: false,
                        heading: "Authority Error",
                        message: error?.response?.data
                    })
                    setIsLoadingData(false)
                }
                console.error(error);
            }
        })()
    }, [backendHost, setResponseData, setResponseStatus])

    const handleSetData__modalData = (html) => {
        setResponseStatus(true)
        setResponseData({
            isLoadingData: false,
            heading: "Modal Data",
            message: html
        })
    }

    const handleDeleteData = async (id, category) => {
        let confirmation = window.confirm('Are you sure want to delete page')
        if (confirmation === true) {
            setIsFormProcess({
                status: true,
                _id: id
            })

            try {

                await axios.delete(`${backendHost}/api/admin/work/${id}`, { withCredentials: true })
                let temp = mainData[category].filter(ele => ele._id !== id)
                setMainData({ ...mainData, [category]: temp })

            } catch (error) {
                setResponseStatus(true)
                setResponseData({
                    isLoadingData: false,
                    heading: "Error",
                    message: error.message
                })
            }
        }
    }

    const handleWorkOrderChange = async (e, id, type) => {
        try {
            setResponseStatus(true);
            setResponseData({
                isLoadingData: true,
                heading: 'Form Processing - Changing order'
            })

            const raw = await axios.post(`${backendHost}/api/admin/work/change-order`, {
                order: e.target.value,
                _id: id
            })

            if (raw.status === 200) {
                let temp = mainData[type].filter(ele => ele._id !== id)
                temp.push(raw?.data)

                temp.sort((a, b) => {
                    return a.order - b.order
                })

                setMainData({ ...mainData, [type]: temp })
                setResponseData({
                    isLoadingData: false,
                    heading: "Status: OK",
                    message: "Data has been updated"
                })

            } else {
                setResponseData({
                    isLoadingData: false,
                    heading: "Somthing went wrong",
                    message: raw?.data
                })
            }

        } catch (error) {
            setResponseData({
                isLoadingData: false,
                heading: "Error",
                message: error?.message
            })
        } finally {
            setTimeout(() => {
                setResponseStatus(false);
                setResponseData({})
            }, 5000);
        }
    }

    const [accordianStatus, setAccordianStatus] = useState({
        professional: true,
        hobby: false,
        personal: false
    })

    return (
        <>
            {isLoadingData === true ?
                <div className='d-flex align-items-center'>
                    <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                        <ImSpinner4 className='text-theam fs-5' />
                    </div>
                    <span>Loading Data</span>
                </div>
                :
                <div className='col-12'>
                    {Object.keys(mainData).map((ele) => {
                        return (
                            <div className='w-100 mb-4 overflow-auto' key={`work-main-div-${ele}`}>
                                <div className={`user-select-none d-flex align-items-center justify-content-between ${accordianStatus[ele] === false && 'border-bottom'}`}>
                                    <FirstLetterEffectText text={ele} />
                                    <button
                                        type="button"
                                        className={`text-white btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center lh-1`}
                                        style={{ height: '35px', width: '35px' }}
                                        onClick={() => setAccordianStatus({ ...accordianStatus, [ele]: !accordianStatus[ele] })}
                                    >
                                        {accordianStatus[ele] === true ?
                                            <FaAngleUp />
                                            :
                                            <FaAngleDown className='mt-1' />
                                        }
                                    </button>
                                </div>

                                <table className={`w-100 border border-theam mb-auto ${accordianStatus[ele] === false && 'd-none'}`}>
                                    <thead>
                                        <tr className='bg-theam'>
                                            <th className='py-2 text-white border-end text-center px-2'>Date</th>
                                            <th className='py-2 text-white border-end text-center px-2'>Order</th>
                                            <th className='py-2 text-white border-end text-center px-2'>Name</th>
                                            <th className='py-2 text-white border-end text-center px-2'>Back Img</th>
                                            <th className='py-2 text-white border-end text-center px-2'>Modal Data</th>
                                            <th className='py-2 text-white border-end text-center px-2' style={{ minWidth: '400px' }}>Short Desc</th>
                                            <th className='py-2 text-white border-end text-center px-2'>Tags</th>
                                            <th className='py-2 text-white text-center px-4'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {mainData && mainData[ele].map((inner) => {
                                            return (
                                                <tr key={inner._id} className='border-bottom last-child-no-border'>
                                                    <td className='py-1 px-2 border-end text-center'> {toSimpleDate(inner.createdAt)} </td>
                                                    <td className='py-1 px-2 border-end text-center'>
                                                        <select name="order" style={{ minWidth: '75px' }} className='rounded-1 custom-input-style' onChange={(e) => { handleWorkOrderChange(e, inner._id, ele) }} defaultValue={inner?.order ?? ""}>
                                                            <option value="">0</option>
                                                            {workRawData.map((ele, idx) => {
                                                                return <option key={ele._id} value={idx + 1}>{idx + 1}</option>
                                                            })}
                                                        </select>
                                                    </td>
                                                    <td className='py-1 px-2 border-end text-center'>
                                                        <a href={inner.link} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>
                                                            <ButtonShaded type="button" text={inner.name} className={'width-fit lh-1 px-1 d-block mx-auto'} />
                                                        </a>
                                                    </td>
                                                    <td className='py-1 px-2 border-end text-center'>
                                                        <a href={inner.background} target="_blank" rel="noopener noreferrer">
                                                            <ButtonShaded type="button" text={<FaExternalLinkAlt />} className={'width-fit lh-1 p-2 d-block mx-auto'} />
                                                        </a>
                                                    </td>
                                                    <td className='py-1 px-2 border-end'>
                                                        <button type='button' onClick={() => { handleSetData__modalData(inner.html) }} className='simleButton-with-shaded width-fit lh-1 p-1 d-block mx-auto fs-4'>
                                                            <IoOptions />
                                                        </button>
                                                    </td>
                                                    <td className='py-1 px-2 border-end'> {inner.shortDesc} </td>
                                                    <td className='py-1 px-2 border-end'>
                                                        <div className="d-flex flex-wrap gap-1">
                                                            {inner.techUsed.map((tags, idx) => {
                                                                return <span className="bg-theam text-white px-1 rounded-1" style={{ fontSize: "14px", whiteSpace: 'nowrap' }} key={`table-${ele}-tech-index-${idx}-name-${tags}`}>#{tags}</span>
                                                            })}
                                                        </div>
                                                    </td>
                                                    <td className='py-1 px-2 text-center'>
                                                        <div className="d-flex gap-3 w-100 justify-content-center align-items-center">
                                                            {isFormProcess.status && isFormProcess._id === inner._id ?
                                                                <>
                                                                    <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                                                                        <ImSpinner4 className='text-theam fs-5' />
                                                                    </div>
                                                                </>
                                                                :
                                                                <button type="button" className='btn-reset lh-1 bg-danger p-2 rounded-circle' onClick={() => { handleDeleteData(inner._id, ele) }}>
                                                                    <FaTrash className='text-white' />
                                                                </button>
                                                            }
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )
                    })}

                    {Object.keys(mainData).length === 0 &&
                        <div className='d-block mb-auto'>
                            <span className="fs-4 fw-bold">No Data Found</span>
                        </div>
                    }
                </div>
            }
        </>
    )
}

export default Work