import React from 'react'
import { Link } from 'react-router-dom/dist'

export const IcoBtn = ({ link, icon }) => {
  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer" className='icon-btn-shaded user-select-none'>
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
      <Link to={link} type="button" className='theam-btn-big user-select-none'>
        <span>{icon}</span>
        <span>{text}</span>
      </Link>
    </>
  )
}

export const ShadowText = ({ text1, text2 }) => {
  return (
    <>
      <div className="shadow-text user-select-none">
        <span>{text1}</span>
        <span>{text2}</span>
        <p></p>
      </div>
    </>
  )
}
