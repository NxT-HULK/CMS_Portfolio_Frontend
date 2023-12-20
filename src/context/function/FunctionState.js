import React, { useEffect, useMemo, useState } from 'react'
import FunctionContext from './FunctionContext'
import { useLocation } from 'react-router-dom'

const FunctionState = (props) => {

    const [redTheamFlag, setRedTheamFlag] = useState(false)
    const [darkTheamFlag, setDarkTheamFlag] = useState(false)
    const pathname = useLocation().pathname

    const redPages = useMemo(() => ['/contact'], []);
    const darkPages = useMemo(() => ['/contact', '/blogs'], []);

    useEffect(() => {
        
        // Checking for dark theam pages
        if (darkPages.indexOf(pathname) >= 0) {
            setDarkTheamFlag(true)
        } else {
            setDarkTheamFlag(false)
        }

        // Cheking for red theam pages
        if (redPages.indexOf(pathname) >= 0) {
            setRedTheamFlag(true)
        } else {
            setRedTheamFlag(false)
        }

    }, [pathname, redPages, darkPages])

    return (
        <FunctionContext.Provider value={{ redTheamFlag, redPages, darkTheamFlag, darkPages }}>
            {props.children}
        </FunctionContext.Provider>
    )
}

export default FunctionState