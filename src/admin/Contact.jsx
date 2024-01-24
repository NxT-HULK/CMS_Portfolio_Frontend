import React, { useContext, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import FunctionContext from '../context/function/FunctionContext'
import DataContext from '../context/data/DataContext'
import { ImSpinner4 } from 'react-icons/im'

const Contact = () => {

  const { toSimpleDate } = useContext(FunctionContext)
  const { backendHost } = useContext(DataContext)

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
        let raw = await fetch(`${backendHost}/contact/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        let data = await raw.json()
        setContactData(data)
        setIsContactLoading(false)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [backendHost])

  const handleDeleteData = async (id) => {
    try {
      let raw = await fetch(`${backendHost}/contact/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json'
        }
      })
      let data = await raw.json()
      setContactData(contactData.filter((ele) => ele._id !== data))
      setIsFormProcess({ status: false, _id: "" })

    } catch (error) {
      console.error(error)
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
        <table className='w-100 mt-5 border border-theam mb-auto'>
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
                <tr key={ele._id}>
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
                        <button type="button" className='btn-reset lh-1 bg-danger p-2 rounded-circle' onClick={() => { setIsFormProcess({ status: true, _id: ele._id }); handleDeleteData(ele._id) }}>
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
      }
    </>
  )
}

export default Contact