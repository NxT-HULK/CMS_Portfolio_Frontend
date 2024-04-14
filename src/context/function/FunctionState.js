import React, { useEffect, useMemo, useState } from 'react'
import FunctionContext from './FunctionContext'
import { useLocation } from 'react-router-dom'

const FunctionState = (props) => {
  const [darkTheamFlag, setDarkTheamFlag] = useState(false)
  const [navBackdropFlag, setnavBackdropFlag] = useState(false)
  const pathname = useLocation().pathname

  const darkPages = useMemo(() => [], []);
  // const darkPages = useMemo(() => ['/blogs', '/work'], []);
  // const navBackdropRemoved = useMemo(() => [], []);
  const navBackdropRemoved = useMemo(() => [], []);

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

  const handleOnChange = (e, state, func) => {
    func({ ...state, [e.target.name]: e.target.value })
  }

  const toSimpleDate = (date) => {
    let now = new Date(date)
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
  }

  return (
    <FunctionContext.Provider value={{ darkTheamFlag, darkPages, navBackdropFlag, navBackdropRemoved, handleOnChange, toSimpleDate }}>
      {props.children}
    </FunctionContext.Provider>
  )
}

export default FunctionState