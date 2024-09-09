import React from 'react'
import FunctionContext from './FunctionContext'
import { useNavigate } from 'react-router-dom'

const FunctionState = (props) => {

  const navigate = useNavigate()

  const handleOnChange = (e, state, func) => {
    func({ ...state, [e.target.name]: e.target.value })
  }

  const toSimpleDate = (date) => {
    let now = new Date(date)
    return `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`
  }

  const scrollTop = () => {
    window.scrollTo(0, 0)
  }

  const handleLogoutAdmin = () => {
    localStorage.removeItem('auth-token')
    navigate('/auth')
  }

  const removeSlash = (str) => {
    return str.replace(/\//g, "");
  }

  return (
    <FunctionContext.Provider
      value={{ handleOnChange, toSimpleDate, scrollTop, handleLogoutAdmin, removeSlash }}
    >
      {props.children}
    </FunctionContext.Provider>
  )
}

export default FunctionState