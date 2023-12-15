import React, { useContext, useEffect, useState } from 'react'
import { FaLongArrowAltRight } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom/dist'
import FunctionContext from '../context/function/FunctionContext'

export const IcoBtn = ({ link, icon }) => {

  const { redTheamFlag } = useContext(FunctionContext)

  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer" className={`${redTheamFlag === true ? 'icon-btn-shaded-red' : 'icon-btn-shaded'} user-select-none`}>
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

export const CustomBtn = ({ text, icon, type }) => {

  const { redTheamFlag } = useContext(FunctionContext);

  return (
    <>
      <button type={type === 'submit' ? 'submit' : 'button'} className={`btn-reset user-select-none ${redTheamFlag === true ? 'theam-btn-big-2' : 'theam-btn-big'}`}>
        <span>{icon}</span>
        <span>{text}</span>
      </button>
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

export const SkillBox = ({ icon, text, svgColor }) => {
  return (
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
  )
}

export const DetailBox = ({ year, title, para, link }) => {
  return (
    <div className="detailsBox-v2">
      <a href={link} target="_blank" rel="noopener noreferrer" className='text-decoration-none text-dark w-100'>
        <div className="wraper">
          <div className="year">
            <span>{year}</span>
          </div>
          <div className='d-flex gap-2'>
            <span className="fw-medium">{title}</span>
            <span className='fw-medium'>&nbsp;-&nbsp;</span>
            <span className="text-secondary">{para}</span>
          </div>
        </div>
      </a>
    </div>
  )
}

export const ExperienceCard = ({ img, role, para }) => {
  return (
    <div className="experience-box w-100 flex-wrap justify-content-md-start justify-content-sm-center justify-content-center">
      <div className="img col-xxl-3 col-lg-3 col-md-4 col-sm-12 col-12">
        <img src={img} alt="" />
      </div>
      <div className="matter col-xxl-9 col-lg-9 col-md-8 col-sm-12 col-12 px-2 d-flex flex-column px-3">
        <span className="role block my-2 p-0 fw-bold">
          <FirstLetterEffectText text={role} />
        </span>
        <span className='text-justify description'>{para}</span>
      </div>
    </div>
  )
}

export const FirstLetterEffectText = ({ text, className }) => {

  const { redPages } = useContext(FunctionContext)
  const pathname = useLocation().pathname
  const [firstLetterEffect, setFirstLetterEffect] = useState("")

  useEffect(() => {

    const arr = text.split(" ")
    if (redPages.indexOf(pathname) >= 0) {

      let data = arr.map((ele) => {
        return (
          <span key={ele}>
            <span className={`firstLetterEffect-red`}>
              {ele[0]}
            </span>
            <span className={`fs-3 ${className}`}>
              {ele.substring(1)}&nbsp;
            </span>
          </span>
        )
      })
      setFirstLetterEffect(data)

    } else {

      let data = arr.map((ele) => {
        return (
          <span key={ele}>
            <span className={`firstLetterEffect`}>
              {ele[0]}
            </span>
            <span className={`fs-3 ${className}`}>
              {ele.substring(1)}&nbsp;
            </span>
          </span>
        )
      })
      setFirstLetterEffect(data)

    }

  }, [text])

  return (
    <span className="role block my-2 p-0 fw-bold">{firstLetterEffect}</span>
  )
}

export const ProvideCard = ({ icon, text, modalId }) => {
  return (
    <>
      <div className="whatIProvideCard">
        <span className="icon">{icon}</span>
        <span className="fs-4 fw-bold">{text}</span>
        <button type="button" className='d-flex gap-2 align-items-center px-2 py-1 rounded' data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
          Know More <FaLongArrowAltRight />
        </button>
      </div>
    </>
  )
}

export const TestimonialCard = ({ message, name, date }) => {
  return (
    <div className="testimonial-card-custom">
      <p>{message}</p>
      <span>{name}</span>
      <span className="date mt-2">{date}</span>
    </div>
  )
}
