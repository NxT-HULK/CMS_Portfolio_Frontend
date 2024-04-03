import React from 'react'
import { AccordianCustom, SidebarAccordianList } from '../components/Utility'

const LearningSidebar = ({ modules, pages, urlThreaten }) => {

    return (
        <div className='d-flex flex-column gap-3 my-3'>
            {Array.isArray(modules) && modules.map((ele, index) => {
                return (
                    <AccordianCustom
                        id={ele._id}
                        idx={index + 1}
                        name={ele.module_name}
                        subModuleLen={ele.pages.length}
                        key={ele._id + `${index}-module`}
                        urlThreaten={urlThreaten}
                        lastUpdated={ele.updatedAt}
                        adminMode={false}
                    >
                        {ele.pages.map((page, idx) => {
                            let data = pages.find((val) => val._id === page)
                            return (
                                <SidebarAccordianList
                                    ofModule={ele._id}
                                    id={data._id}
                                    name={data.name}
                                    page={idx + 1}
                                    lastUpdated={data.updatedAt}
                                    key={page._id + `${idx}-page`}
                                    urlThreaten={urlThreaten}
                                    adminMode={false}
                                />
                            )
                        })}
                    </AccordianCustom>
                )
            })}
        </div>
    )
}

export default LearningSidebar