import React from 'react'
import { Link } from 'react-router-dom/dist'

export const IcoBtn = ({ link, icon }) => {
  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer" className='icon-btn-shaded'>
        <span>
          {icon}
        </span>
      </a>
    </>
  )
}

export const BtnBig = ({ text, icon, link }) => {
  return (
    <>
      <Link to={link} type="button" className='theam-btn-big'>
        <span>{icon}</span>
        <span>{text}</span>
      </Link>
    </>
  )
}
