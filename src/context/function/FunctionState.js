import React, { useEffect, useMemo, useState } from 'react'
import FunctionContext from './FunctionContext'
import { useLocation } from 'react-router-dom'

const FunctionState = (props) => {
    const [darkTheamFlag, setDarkTheamFlag] = useState(false)
    const pathname = useLocation().pathname

    const darkPages = useMemo(() => ['/blogs'], []);

    useEffect(() => {

        // Checking for dark theam pages
        if (darkPages.indexOf(pathname) >= 0) {
            setDarkTheamFlag(true)
        } else {
            setDarkTheamFlag(false)
        }

    }, [pathname, darkPages])

    return (
        <FunctionContext.Provider value={{ darkTheamFlag, darkPages }}>
            {props.children}
        </FunctionContext.Provider>
    )
}

export default FunctionState