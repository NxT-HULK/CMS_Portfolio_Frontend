import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { ImSpinner4 } from 'react-icons/im'

const Contact = ({ DataContext, FunctionContext }) => {

  const { toSimpleDate } = FunctionContext
  const { backendHost, setResponseStatus, setResponseData } = DataContext

  const [isContactLoading, setIsContactLoading] = useState(false)
  const [contactData, setContactData] = useState([])

  const [isFormProcess, setIsFormProcess] = useState({
    status: false,
    _id: ""
  })

  useEffect(() => {
    (async () => {
      setIsContactLoading(true)
      try {
        const raw = await axios.get(`${backendHost}/api/admin/contact`, { withCredentials: true })
        let data = raw?.data
        setContactData(data)
        setIsContactLoading(false)
      } catch (error) {
        if (error.status === 400) {
          setIsContactLoading(false)
          setResponseStatus(true)
          setResponseData({
            isLoading: false,
            heading: "Authority Error",
            message: error?.response?.data ?? "Server Error"
          })
        }
        console.error(error)
      }
    })()
  }, [backendHost])

  const handleDeleteData = async (id) => {
    let confirmation = window.confirm('Are you sure want to delete page')
    if (confirmation === true) {
      setIsFormProcess({ status: true, _id: id });
      try {
        const raw = await axios.delete(`${backendHost}/api/admin/contact/${id}`)
        let data = raw?.data
        setContactData(contactData.filter((ele) => ele._id !== data))
        setIsFormProcess({ status: false, _id: "" })

      } catch (error) {
        console.error(error)
      }
    }
  }

  return (
    <>
      {isContactLoading === true ?
        <div className="d-flex align-items-center">
          <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
            <ImSpinner4 className='text-theam fs-5' />
          </div>
          <span>Loading Data</span>
        </div>
        :
        contactData?.length !== 0 ?
          <div className="w-100 d-block mb-auto pb-md-5 pb-3">
            <table className='w-100 border border-theam'>
              <thead>
                <tr className='bg-theam'>
                  <th className='py-2 text-white border-end text-center px-2'>Date</th>
                  <th className='py-2 text-white border-end text-center px-2'>Name</th>
                  <th className='py-2 text-white border-end text-center px-2'>Email</th>
                  <th className='py-2 text-white border-end text-center px-2'>Query</th>
                  <th className='py-2 text-white border-end text-center px-2'>Message</th>
                  <th className='py-2 text-white text-center px-4'>Action</th>
                </tr>
              </thead>
              <tbody>
                {contactData.map((ele) => {
                  return (
                    <tr key={ele._id} className='border-bottom last-child-no-border'>
                      <td className='py-1 px-2 border-end text-center'> {toSimpleDate(ele.createdAt)} </td>
                      <td className='py-1 px-2 border-end text-center'> {ele.name} </td>
                      <td className='py-1 px-2 border-end'> {ele.email} </td>
                      <td className='py-1 px-2 border-end'> {ele.query} </td>
                      <td className='py-1 px-2 border-end'> {ele.mess} </td>
                      <td className='py-1 px-2 text-center'>
                        <div className="d-flex gap-3 w-100 justify-content-center align-items-center">
                          {(isFormProcess.status && isFormProcess._id === ele._id) === true ?
                            <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                              <ImSpinner4 className='text-theam fs-5' />
                            </div>
                            :
                            <button type="button" className='btn-reset lh-1 bg-danger p-2 rounded-circle' onClick={() => { handleDeleteData(ele._id) }}>
                              <FaTrash className='text-white' />
                            </button>
                          }
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          :
          <div className='d-block mb-auto'>
            <span className="fs-4 fw-bold">No Data Found</span>
          </div>
      }
    </>
  )
}

export default Contact