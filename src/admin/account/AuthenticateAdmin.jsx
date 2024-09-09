import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FirstLetterEffectText } from '../../components/Utility'
import DataContext from '../../context/data/DataContext'
import FunctionContext from '../../context/function/FunctionContext'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AuthenticateAdmin = () => {
  const { setResponseStatus, setResponseData, backendHost } = useContext(DataContext)
  const { handleOnChange } = useContext(FunctionContext)

  const [eyemode, setEyemode] = useState(false)
  const [formdata, setFormdata] = useState({})

  const navigate = useNavigate()

  useEffect(() => {
    (async () => {
      try {
        let fetch = await axios.post(`${backendHost}/api/admin/login`, {}, { withCredentials: true })
        if (fetch.status === 200) {
          navigate("/admin")
        }
      } catch (error) {
        console.error(error)
      }
    })();
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault();
    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: "Admin Login",
      message: ""
    })

    try {
      let fetch = await axios.post(`${backendHost}/api/admin/login`, formdata, {
        withCredentials: true
      })

      if (fetch.status === 200) {
        setResponseData({
          isLoading: false,
          heading: "Login Status",
          message: fetch?.data
        })

        navigate("/admin")

        setFormdata({})
        e.target.reset()

      } else {
        setResponseData({
          isLoading: false,
          heading: "Error",
          message: fetch?.data
        })
      }
    } catch (error) {
      setResponseData({
        isLoading: false,
        heading: "Validation Failed",
        message: error?.response?.data ?? "Server Error"
      })
      console.error(error);
    } finally {
      setTimeout(() => {
        setResponseStatus(false)
        setResponseData({})
      }, 4000);
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
                  <input type="email" className="bg-white rounded-1 custom-input-style" placeholder="Admin ID ?" name="email" onChange={(e) => { handleOnChange(e, formdata, setFormdata) }} />
                </div>
                <div className="position-relative d-flex align-items-center justify-content-end mb-2">
                  <input type={eyemode === true ? 'text' : 'password'} className="bg-white rounded-1 custom-input-style" placeholder="Your Password" name="password" onChange={(e) => { handleOnChange(e, formdata, setFormdata) }} />
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
                  <span className="text-white fw-light" style={{ fontSize: '14px' }}> Forgot Password ? </span>
                </div>
                <button type="submit" className='simleButton-with-shaded'> Login </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuthenticateAdmin