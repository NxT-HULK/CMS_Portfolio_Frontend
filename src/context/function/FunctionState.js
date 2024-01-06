import React, { useEffect, useMemo, useState } from 'react'
import FunctionContext from './FunctionContext'
import { useLocation } from 'react-router-dom'

const FunctionState = (props) => {
    const [darkTheamFlag, setDarkTheamFlag] = useState(false)
    const [navBackdropFlag, setnavBackdropFlag] = useState(false)
    const pathname = useLocation().pathname

    const darkPages = useMemo(() => ['/blogs', '/work'], []);
    const navBackdropRemoved = useMemo(() => ['/work'], []);

    useEffect(() => {

        // Checking for dark theam pages
        if (darkPages.indexOf(pathname) >= 0) {
            setDarkTheamFlag(true)
        } else {
            setDarkTheamFlag(false)
        }

        // Checking for Navbar Backdrop Filter
        if (navBackdropRemoved.indexOf(pathname) >= 0) {
            setnavBackdropFlag(true)
        } else {
            setnavBackdropFlag(false)
        }

    }, [pathname, darkPages, navBackdropRemoved])

    return (
        <FunctionContext.Provider value={{ darkTheamFlag, darkPages, navBackdropFlag, navBackdropRemoved }}>
            {props.children}
        </FunctionContext.Provider>
    )
}

export default FunctionState