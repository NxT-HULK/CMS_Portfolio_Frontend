import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../../context/data/DataContext'
import { FirstLetterEffectText, LoadingDataSpinner } from '../../components/Utility';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { FeedbackCard } from '../../components/FeedbackComponents';


const RenderComponent = ({ name, setRenderData }) => {

    const [accordianStatus, setAccordianStatus] = useState(false)

    return (
        <div className='col-12'>
            <div
                className={`
                    d-flex align-items-center justify-content-between cursor-pointer bg-body-tertiary border px-3 rounded user-select-none
                    ${accordianStatus === true && 'rounded-bottom-0'}
                `}
                onClick={() => { setAccordianStatus(!accordianStatus) }}
            >
                <FirstLetterEffectText text={Object.keys(name)[0]} />
                <button
                    type="button"
                    className={`text-white btn-reset bg-theam rounded-circle d-flex align-items-center justify-content-center lh-1`}
                    style={{ height: '35px', width: '35px' }}
                >
                    {accordianStatus === true ?
                        <FaAngleUp />
                        :
                        <FaAngleDown className='mt-1' />
                    }
                </button>
            </div>

            <div className={`${accordianStatus === true ? 'd-flex' : 'd-none'} flex-wrap gap-3 p-3 bg-body-tertiary border border-top-0`}>
                {name[Object.keys(name)]?.feedback?.map((ele, idx) => {
                    return <FeedbackCard
                        key={ele._id}
                        index={idx}
                        name={ele?.name}
                        desig={ele?.designation}
                        date={ele?.updatedAt}
                        para={ele?.remark}
                        adminMode={true}
                        setRenderData={setRenderData}
                        feedbackId={ele?._id}
                        statusFlag={ele?.status}
                        projectId={name[Object.keys(name)]?._id}
                    />
                })}
            </div>
        </div>
    )
}

const FeedbackManagement = () => {

    const { backendHost } = useContext(DataContext)
    const [isLoading, setIsLoading] = useState(null)
    const [allData, setAllData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const fetching = await axios.get(`${backendHost}/api/admin/feedback`, { withCredentials: true })
                setAllData(fetching?.data)
            } catch (error) {
                if (error?.response?.status === 404) {
                    setIsLoading(false)
                    setRenderData([])
                }
                console.error(error);
            }
        })();
    }, [backendHost, setIsLoading])

    const [renderData, setRenderData] = useState([])
    useEffect(() => {
        setRenderData(() => {
            const obj = allData?.project?.map(ele => {
                return {
                    [ele?.name]: {
                        ...ele, feedback: allData?.feedback.filter((inner) => {
                            return ele?.feedback.includes(inner?._id)
                        })
                    }
                }
            })

            setIsLoading(false)
            return obj
        })
    }, [allData])

    return (
        isLoading === true ?
            <LoadingDataSpinner className={'text-theam'} />
            :
            renderData?.length === 0 ?
                <>No Feedback Found</>
                :
                <div className='d-flex flex-wrap gap-3'>
                    {renderData?.map((ele) => {
                        return <RenderComponent key={Object.keys(ele)[0]?._id} name={ele} setRenderData={setRenderData} />
                    })}
                </div>
    )
}

export default FeedbackManagement