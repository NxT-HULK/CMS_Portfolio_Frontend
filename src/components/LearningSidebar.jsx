import React, { useState } from 'react'
import { AccordianCustom, SidebarAccordianList } from '../components/Utility'

const Help = ({ allPages, pages, urlThreaten, course_id, ofModule }) => {

    const [data] = useState(() => {
        let temp = allPages?.filter((page) => pages?.includes(page?._id))
        temp.sort((a, b) => a?.page_number - b?.page_number)
        return temp
    })

    return (
        data?.map((page, idx) => {
            return (
                <SidebarAccordianList
                    key={page?._id + `${idx}-page`}
                    id={page?._id}
                    name={page?.name}
                    page={page?.page_number}
                    lastUpdated={page?.updatedAt}
                    ofModule={ofModule}
                    adminMode={false}
                    urlThreaten={urlThreaten}
                    course_id={course_id}
                />
            )
        })
    )
}

const LearningSidebar = ({ course_id, modules, pages, urlThreaten }) => {

    return (
        <div className='d-flex flex-column gap-3 my-3'>
            {Array.isArray(modules) && modules.map((ele, index) => {
                let lastUpdate = pages?.filter((page) => page?.of_module === ele?._id) || []
                if (lastUpdate.length > 0) {
                    lastUpdate.sort((a, b) => new Date(b?.updatedAt) - new Date(a?.updatedAt))
                }

                return (
                    <AccordianCustom
                        id={ele._id}
                        idx={index + 1}
                        name={ele.module_name}
                        subModuleLen={ele.pages.length}
                        key={ele._id + `${index}-module`}
                        urlThreaten={urlThreaten}
                        lastUpdated={lastUpdate?.[0]?.updatedAt}
                        adminMode={false}
                    >
                        <Help allPages={pages} pages={ele?.pages} urlThreaten={urlThreaten} course_id={course_id} ofModule={ele?._id} />
                    </AccordianCustom>
                )
            })}
        </div>
    )
}

export default LearningSidebar