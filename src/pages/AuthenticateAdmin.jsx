import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FirstLetterEffectText } from '../components/Utility'
import DataContext from '../context/data/DataContext'
import FunctionContext from '../context/function/FunctionContext'
import { useNavigate } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const AuthenticateAdmin = () => {
  const { setResponseStatus, setResponseData, backendHost, getToken } = useContext(DataContext)
  const { handleOnChange } = useContext(FunctionContext)

  const navigate = useNavigate("")

  const [eyemode, setEyemode] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
    const gettingToken = async () => {
      try {
        let response = await getToken()
        if (response === "OK") {
          navigate('/admin')
        } else {
          navigate('/auth')
        }
      } catch (error) {
        navigate('/auth')
      }
    }

    (async () => {
      await gettingToken()
    })()
  }, [getToken, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();

    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: "Admin Login",
      message: ""
    })

    try {

      let raw = await fetch(`${backendHost}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: data.adminID,
          key: data.adminPass
        })
      })
      let response = await raw.json()

      if (response.length > 100) {
        localStorage.setItem('auth-token', response)
        setResponseStatus(false)
        setResponseData({
          isLoading: false,
          heading: "",
          message: ""
        })
        navigate('/admin')
      } else {
        setResponseData({
          isLoading: false,
          heading: "Admin Login",
          message: response
        })
      }

    } catch (error) {
      console.error(error)
      setResponseData({
        isLoading: true,
        heading: "Error - Admin Login",
        message: error.message
      })

      setTimeout(() => {
        setResponseStatus(false)
        setResponseData({
          isLoading: false,
          heading: "",
          message: ""
        })
      }, 3000);
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Admin Login</title>
        </Helmet>
      </HelmetProvider>
      <div id='auth-main-container'>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <img src="/login_svg.svg" alt="" />
          </div>
          <div className="col-md-5 col-12">
            <div className="p-3 rounded-1 w-100" style={{ backgroundColor: '#ffffff10', backdropFilter: 'blur(10px)' }}>
              <FirstLetterEffectText text="Admin Login" className2={'text-white'} />
              <form className='rounded-3' onSubmit={handleLogin}>
                <div className="mb-2">
                  <input type="text" className="bg-white rounded-1 custom-input-style" placeholder="Admin ID ?" name="adminID" onChange={(e) => { handleOnChange(e, data, setData) }} />
                </div>
                <div className="position-relative d-flex align-items-center justify-content-end mb-2">
                  <input type={eyemode === true ? 'text' : 'password'} className="bg-white rounded-1 custom-input-style" placeholder="Your Password" name="adminPass" onChange={(e) => { handleOnChange(e, data, setData) }} />
                  <div className='position-absolute me-3'>
                    <button type="button" className='btn-reset' onClick={() => { setEyemode(!eyemode) }}>
                      {eyemode === true ?
                        <FaEye className='fs-5 text-theam' />
                        :
                        <FaEyeSlash className='fs-5 text-theam' />
                      }
                    </button>
                  </div>
                </div>
                <div className="position-relative ms-1 mb-2">
                  <span className="text-white fw-light" style={{ fontSize: '14px' }}>
                    Forgot Password ?
                  </span>
                </div>
                <button type="submit" className='simleButton-with-shaded'>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthenticateAdmin