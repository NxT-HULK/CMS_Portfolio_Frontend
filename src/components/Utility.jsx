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

export const SkillBoxContainer = ({ children }) => {
  return (
    <div className="skill-box-container">{children}</div>
  )
}

export const SkillBox = ({ icon, text, svgColor, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className='text-decoration-none text-dark'>
      <div className="skill-box" style={{ '--svg-color': svgColor }}>
        <div className="wrapper">
          <div className="icon">
            {icon}
          </div>
          <div className="text">
            <span>
              {text}
            </span>
          </div>
        </div>
      </div>
    </a>
  )
}

export const DetailBox = ({ year, title, para, link }) => {
  return (
    <div className={`award-edu-box d-flex flex-column`}>
      <small className='width-fit ms-auto mb-1'><span className='year fst-italic'>{year}</span></small>
      <span>
        <a href={link} target="_blank" rel="noopener noreferrer" className='text-decoration-none text-dark d-flex gap-3 align-items-start'>
          <span className="course fw-medium bg-theam py-1 px-3 rounded-pill text-white up-left-shadow-effect">{title}</span>
          <span className="short-para hover-underline">{para}</span>
        </a>
      </span>
    </div>
  )
}