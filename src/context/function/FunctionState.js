import React, { useEffect, useMemo, useState } from 'react'
import FunctionContext from './FunctionContext'
import { useLocation } from 'react-router-dom'

const FunctionState = (props) => {

    const [redTheamFlag, setRedTheamFlag] = useState(false)
    const pathname = useLocation().pathname

    const redPages = useMemo(() => ['/contact'], []);

    useEffect(() => {

        if (redPages.indexOf(pathname) >= 0) {
            setRedTheamFlag(true)
        } else {
            setRedTheamFlag(false)
        }

    }, [pathname, redPages])

    return (
        <FunctionContext.Provider value={{ redTheamFlag, redPages }}>
            {props.children}
        </FunctionContext.Provider>
    )
}

export default FunctionState