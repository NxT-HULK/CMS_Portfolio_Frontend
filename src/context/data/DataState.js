import React, { useState } from 'react'
import DataContext from './DataContext'

const DataState = (props) => {

    const socialLinks = {
        linkedin: "https://www.linkedin.com/in/shivam-kumar-kashyap-382794249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
        insta: "",
        facebook: "",
        github: "",
        mail: "mailto:shivamkumarkashyap12@gmail.com"
    }

    const [informationModalData, setInformationModalData] = useState({
        heading: "",
        message: ""
    })

    return (
        <DataContext.Provider value={{ socialLinks, informationModalData, setInformationModalData }}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataState