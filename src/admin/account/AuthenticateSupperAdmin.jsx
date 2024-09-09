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
        const fetch = await axios.post(`${backendHost}/api/admin/`, {}, { withCredentials: true })
        if (fetch.status === 200) {
          navigate("/account/create")
        }
      } catch (error) {
        console.error(error);
      }
    })();
    // eslint-disable-next-line
  }, [backendHost, navigate])

  const handleLogin = async (e) => {
    e.preventDefault();
    setResponseStatus(true)
    setResponseData({
      isLoading: true,
      heading: "Admin Login",
      message: ""
    })

    try {
      const fetch = await axios.post(`${backendHost}/api/admin/`, {
        email: formdata?.email,
        password: formdata?.password
      }, { withCredentials: true })

      if (fetch.status === 200) {
        setFormdata({})
        setResponseStatus(false)
        setResponseData({})
        navigate("/account/create")
      }
    } catch (error) {
      if (error?.status === 400 || error?.status === 404) {
        setResponseData({
          isLoading: false,
          heading: "Error",
          message: error?.response?.data
        })
      } else {
        setResponseData({
          isLoading: false,
          heading: "Error",
          message: "Server Error"
        })
        console.error(error)
      }
    } finally {
      setTimeout(() => {
        setResponseStatus(false)
        setResponseData({})
      }, 3000);
    }
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Supper Admin Login</title>
        </Helmet>
      </HelmetProvider>
      <div id='auth-main-container'>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="col-md-6">
            <img src="/login_svg.svg" alt="" />
          </div>
          <div className="col-md-5 col-12">
            <div className="p-3 rounded-1 w-100" style={{ backgroundColor: '#ffffff10', backdropFilter: 'blur(10px)' }}>
              <FirstLetterEffectText text="Supper Admin" className2={'text-white'} />
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