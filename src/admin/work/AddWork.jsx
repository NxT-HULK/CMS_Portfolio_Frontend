import React, { useEffect, useRef, useState } from 'react'
import { CustomBtn, CustomTags } from '../../components/Utility'
import { BsFillSendFill } from 'react-icons/bs'
import JoditEditor from 'jodit-react'
import axios from 'axios'

const AddWork = ({ DataContext, FunctionContext }) => {

    let { handleOnChange } = FunctionContext
    let { backendHost, setResponseStatus, setResponseData } = DataContext

    const [workFormData, setWorkFormData] = useState({
        usedTech: "",
        html: ""
    })
    const [usedTech, setUsedTech] = useState([])

    useEffect(() => {

        (() => {
            if (workFormData.usedTech.length === 0) {
                setUsedTech([])
                return;
            }

            let arr = workFormData?.usedTech.split(",")
            let finalArr = []

            Array.isArray(arr) && arr.forEach((ele) => {
                finalArr.push(ele.trim())
            });

            setUsedTech(finalArr)
        })();

    }, [workFormData])

    const addWorkForm = useRef("")
    const handleSubmitForm = async (e) => {
        e.preventDefault()
        setResponseStatus(true)
        setResponseData({ isLoading: true, heading: 'Adding up work data' })

        try {
            const raw = await axios.post(`${backendHost}/api/admin/work`, {
                "name": workFormData.name,
                "shortDesc": workFormData.description,
                "html": workFormData.html,
                "link": workFormData.link,
                "background": workFormData.bgUrl,
                "techUsed": usedTech,
                "type": workFormData.type,
                "mailFlag": workFormData?.mailFlag ?? false
            }, { withCredentials: true })

            setResponseData({ isLoading: false, heading: 'Adding up work data', message: raw?.data })

            if (raw?.data === "Work Post added") {
                addWorkForm.current.reset()
                setUsedTech([])
            }

        } catch (error) {
            console.log(error)
            setResponseData({ isLoading: false, heading: 'Error', message: error.message })
        }
    }

    return (
        <>
            <div className="w-100 my-2">
                <div className='d-flex flex-wrap gap-2 mb-3'>
                    {usedTech?.map((ele, idx) => {
                        return <CustomTags tag={ele} key={`used-tech-arr-${idx}`} />
                    })}
                    <CustomTags tag="." className={'opacity-0'} />
                </div>

                <form className='rounded-3' onSubmit={handleSubmitForm} ref={addWorkForm}>
                    <div className="mb-2 d-flex flex-wrap gap-md-0 gap-2">
                        <div className="col-md-6 col-12 pe-md-2 pe-0">
                            <input type="text" name="name" className="rounded-1 custom-input-style" placeholder="Project Name*" onChange={(e) => { handleOnChange(e, workFormData, setWorkFormData) }} />
                        </div>
                        <div className="col-md-6 col-12">
                            <input type="text" name="link" className="rounded-1 custom-input-style" placeholder="(project URL / Repository Link) https://www...*" onChange={(e) => { handleOnChange(e, workFormData, setWorkFormData) }} />
                        </div>
                    </div>

                    <div className="mb-2 d-flex flex-wrap gap-md-0 gap-2">
                        <div className="col-md-6 col-12 pe-md-2 pe-0">
                            <div className="d-flex flex-wrap gap-md-0 gap-2">
                                <div className="col-md-6 col-12 pe-md-2 pe-0">
                                    <select name="type" id="testimonial-rating" className='rounded-1 custom-input-style' onChange={(e) => { handleOnChange(e, workFormData, setWorkFormData) }}>
                                        <option value="" className='d-none'>Project Type*</option>
                                        <option value="hobby">Learning / Hobby</option>
                                        <option value="personal">Frelancing / Personal</option>
                                        <option value="professional">Work / Professional</option>
                                    </select>
                                </div>
                                <div className="col-md-6 col-12">
                                    <input type="text" name="bgUrl" className="rounded-1 custom-input-style" placeholder="(Background) https://www...*" onChange={(e) => { handleOnChange(e, workFormData, setWorkFormData) }} />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-12">
                            <input type="text" name="usedTech" className="rounded-1 custom-input-style" placeholder="Used Technology - React, Express, Node, MongoDB, MySQL ...*" onChange={(e) => { handleOnChange(e, workFormData, setWorkFormData) }} />
                        </div>
                    </div>

                    <div className="mb-2">
                        <textarea name="description" id="" cols="" rows="5" className='w-100 custom-input-style rounded-1' placeholder="Short description of project - isLength({min: 200 characters})*" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" onChange={(e) => { handleOnChange(e, workFormData, setWorkFormData) }} />
                    </div>

                    <div className="mb-2 position-relative">
                        <JoditEditor
                            value={workFormData?.html ?? ''}
                            onChange={(value) => setWorkFormData({ ...workFormData, html: value })}
                        />
                    </div>

                    <div className='my-3 d-flex gap-2 align-items-center'>
                        <input type="checkbox" name="mailFlag" id="mailFlag" onChange={(e) => setWorkFormData({ ...workFormData, mailFlag: e.target.checked})} />
                        <label htmlFor="mailFlag">Also send mail to subscriber</label>
                    </div>

                    <div className="mt-3 mb-5">
                        <CustomBtn text="Post Project" icon={<BsFillSendFill />} type={'submit'} />
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddWork