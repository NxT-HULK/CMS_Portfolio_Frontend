import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/data/DataContext'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { formatDistance } from 'date-fns'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { FaEdit, FaInfo, FaLink, FaLongArrowAltRight, FaPlay, FaTrash } from 'react-icons/fa'
import { MdDelete, MdOutlineChecklistRtl } from 'react-icons/md'
import { ImSpinner4 } from 'react-icons/im'
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { AiOutlineFieldTime } from "react-icons/ai";
import FunctionContext from '../context/function/FunctionContext'
import AdminContext from '../context/admin/AdminContext';

export const IcoBtn = ({ link, icon }) => {
  return (
    <>
      <a href={link} target="_blank" rel="noopener noreferrer" className={`icon-btn-shaded user-select-none`}>
        <span>
          {icon}
        </span>
      </a>
    </>
  )
}

export const BtnBig = ({ text, icon, link, target }) => {
  return (
    <>
      <Link to={link} type="button" className='theam-btn-big user-select-none' target={target === true ? '_blank' : ''}>
        <span>{icon}</span>
        <span>{text}</span>
      </Link>
    </>
  )
}

export const CustomBtn = ({ text, icon, type, className }) => {
  return (
    <>
      <button type={type === 'submit' ? 'submit' : 'button'} className={`btn-reset user-select-none theam-btn-big ${className}`}>
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
        <div className="icon"> {icon} </div>
        <div className="text"> <span> {text} </span> </div>
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

  const mainPara = { __html: para }

  return (
    <div className="experience-box w-100 flex-wrap justify-content-md-start justify-content-sm-center justify-content-center">
      {/* <div className="img col-xxl-3 col-lg-3 col-md-4 col-sm-12 col-12">
        <img src={img} alt="" />
      </div> */}
      <div className="matter col-12 col-12 px-2 d-flex flex-column px-3">
        <span className="role block my-2 p-0 fw-bold">
          <FirstLetterEffectText text={role} />
        </span>
        <span className='text-justify description' dangerouslySetInnerHTML={mainPara}></span>
      </div>
    </div>
  )
}

export const FirstLetterEffectText = ({ text, className, className2, style }) => {

  const pathname = useLocation().pathname
  const [firstLetterEffect, setFirstLetterEffect] = useState("")

  useEffect(() => {
    const arr = text.split(" ")
    let data = arr.map((ele) => {
      return (
        <span key={ele}>
          <span className={`firstLetterEffect text-capitalize`}>
            {ele[0]}
          </span>
          <span className={`fs-3 ${className2}`}>
            {ele.substring(1)}&nbsp;
          </span>
        </span>
      )
    })
    setFirstLetterEffect(data)

  }, [text, className, pathname, className2])

  return (
    <span className={`${className || ''} role block my-2 p-0 fw-bold`} style={{ ...style, wordBreak: 'break-word' }}>{firstLetterEffect}</span>
  )
}

export const ProvideCard = ({ icon, text, modalId }) => {
  return (
    <>
      <div className="whatIProvideCard">
        <span className="icon">{icon}</span>
        <span className="fs-md-4 fs-5 fw-bold">{text}</span>
        <button type="button" className='d-flex gap-2 align-items-center px-2 py-1 rounded'>
          {/* <button type="button" className='d-flex gap-2 align-items-center px-2 py-1 rounded' data-bs-toggle="modal" data-bs-target={`#${modalId}`}> */}
          Know More <FaLongArrowAltRight />
        </button>
      </div>
    </>
  )
}

export const TestimonialCard = ({ rating, message, signature }) => {
  const [mess, setMess] = useState()
  const [moreInfo, setMoreInfo] = useState(false)

  useEffect(() => {
    if (message.length > 179) {
      setMess(mess.substring(0, 179) + "...")
      setMoreInfo(true)
    } else {
      setMess(message)
    }
  }, [message, mess])

  const { setInformationModalData } = useContext(DataContext)
  const handleKnowMore = () => {
    setInformationModalData({
      heading: `Testimonial - ${signature}`,
      message: message
    })
  }

  return (
    <>
      <div className="testimonial-card d-flex flex-column h-100" style={{ minHeight: '300px' }}>
        <div className="main-container d-flex flex-column align-items-center user-select-none h-100">
          <div className="d-flex gap-2 stars-wrapper">
            {
              rating === 1 &&
              <>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
              </>
            }
            {
              rating === 2 &&
              <>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
              </>
            }
            {
              rating === 3 &&
              <>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
              </>
            }
            {
              rating === 4 &&
              <>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
              </>
            }
            {
              rating === 5 &&
              <>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
                <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" /></svg>
              </>
            }
          </div>
          <p className='my-3 text-center'>
            {mess}
            {moreInfo === true &&
              <small>
                <button type="button" className='text-decoration-underline fst-italic border-0 bg-transparent text-white' onClick={handleKnowMore} data-bs-toggle="modal" data-bs-target="#informationModal" >more</button>
              </small>
            }
          </p>
          <div className="sign-area"> <span>{signature}</span> </div>
        </div>
      </div>
    </>
  )
}

export const CustomTags = ({ tag, className }) => {
  return (
    <>
      <span className={`${className} rounded-1 text-theam text-uppercase px-3 py-1 d-inline-block border`}>#{tag}</span>
    </>
  )
}

export const BlogCommentBox = ({ mess, date }) => {

  const [message, setMessage] = useState(mess)
  useEffect(() => {
    if (mess.length > 100) {
      setMessage(mess.substring(0, 100) + "...")
    }
  }, [mess])

  const { setInformationModalData } = useContext(DataContext)
  const handleKnowMore = () => {
    setInformationModalData({
      heading: `Comment`,
      message: mess
    })
  }

  return (
    <>
      <div className="w-100 border px-2 pt-3 pb-2 rounded">
        <p className='mb-1'>
          {message}
          {mess.length !== message.length &&
            <small>
              <button type="button" className='text-decoration-underline fst-italic border-0 bg-transparent text-theam' onClick={handleKnowMore} data-bs-toggle="modal" data-bs-target="#informationModal" >more</button>
            </small>
          }
        </p>
        <small> <span className="font-monospace d-block text-end">{date}</span> </small>
      </div>
    </>
  )
}

export const BlogSmallCard = ({ title, imgLink }) => {

  const [titleText, setTitleText] = useState(title)
  useEffect(() => {
    if (title.length > 19) {
      setTitleText(title.substring(0, 19) + "...")
    }
  }, [title])


  return (
    <>
      <div className="more-blog-card d-flex align-items-center justify-content-end flex-column" style={{ '--bg': `url(${imgLink})` }} >
        <span className="fw-bold d-block text-light fs-5"> {titleText} </span>
        <Link to="/blogs/another-blog">Details</Link>
      </div>
    </>
  )
}

export const ButtonShaded = ({ type, className, text, onClick }) => {
  return (
    <button type={`${type ? type : 'submit'}`} className={`simleButton-with-shaded ${className}`}> {text} </button>
  )
}

export const StripedSliderCustom = ({ data }) => {

  const { setResponseStatus, setResponseData } = useContext(DataContext)
  const hanleSetInformationData = (projectName, html) => {
    setResponseStatus(true)
    setResponseData({
      isLoading: false,
      heading: `Project Information - ${projectName}`,
      message: html
    })
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 425,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          fade: true
        }
      },
    ]
  };

  return (
    <Slider {...settings}>
      {data && data.map((ele, idx) => {
        return (
          <div className='px-2' key={`${ele?._id}`}>
            <div className="work-card-custom" key={`professional-cards-${idx}-${ele._id}`}>
              <img src={ele.background} alt="" loading='eager' />

              <div className='detailed-controller'>
                <div className="justify-content-center d-flex gap-2 mb-2">
                  <button type="button" className="controller-btn" onClick={() => { hanleSetInformationData(ele.name, ele.html) }}>
                    <FaInfo />
                  </button>
                  <a href={ele.link} target="_blank" rel="noopener noreferrer" className="controller-btn">
                    <FaLink />
                  </a>
                  <button type="button" className="controller-btn d-none">
                    <FaPlay className='ms-1' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </Slider>
  )
}

export const Toast = () => {
  const { ToastModalData, setToastModalData } = useContext(DataContext);
  const [status, setStatus] = useState(ToastModalData.message.length > 0 ? true : false);

  useEffect(() => {
    let intervalId;
    if (ToastModalData && ToastModalData.message.length !== 0) {
      setStatus(true);
      intervalId = setInterval(() => {
        if (ToastModalData.time <= 1) {
          setStatus(false);
        } else {
          setToastModalData({
            ...ToastModalData,
            'time': ToastModalData.time - 1
          })
        }
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [ToastModalData, setToastModalData]);

  return (
    <>
      <div className={`toastBox p-3 d-flex align-items-center gap-3 ${status ? 'd-block' : 'd-none'}`}>
        <div className="timer" style={{
          background: `linear-gradient(#222, #222) content-box no-repeat, conic-gradient(#6a59d1 calc(${ToastModalData.multipliedBy}*${ToastModalData.time}%), 0, #222) border-box`
        }}>{ToastModalData.time}</div>
        <p className='m-0 text-capitalize'>{ToastModalData.message}</p>
      </div>
    </>
  );
};

export const LoadingDataSpinner = ({ className, textClassName }) => {
  return (
    <div className='d-flex align-items-center'>
      <div className="spinner-border border-0 d-flex align-items-center justify-content-center">
        <ImSpinner4 className={`fs-5 ${className ? className : 'text-white'}`} />
      </div>
      <span className={`${className ? className : 'text-white'} ${textClassName}`}>Loading Data</span>
    </div>
  )
}

export const CourseCard = ({ courseTitle, img, adminComponent, id, deleteCourse, deleteStatus }) => {

  const { setResponseData, setResponseStatus, courses } = useContext(DataContext)
  const getOverview = () => {
    let selectedCourse = courses.find(ele =>  ele._id === id)
    setResponseStatus(true)
    setResponseData({
      isLoadingData: false,
      heading: "Course Overview",
      message: selectedCourse?.welcome_screen
    })
  }

  const navigate = useNavigate()

  return (
    <div className='d-flex flex-column'>
      <div className="position-relative more-blog-card d-flex align-items-center justify-content-end flex-column" style={{ '--bg': `url(${img})` }} >
        <span className="fw-semibold d-block text-light fs-5 text-truncate col-10" style={{ letterSpacing: '1px' }}> {courseTitle} </span>
        <Link to={`/course/details?course=${id}`}>Start Learning</Link>
        <div className='position-absolute m-3 admin-control d-flex gap-2 align-items-center'>
          <button type="button" className='btn-reset bg-theam lh-1 p-2 rounded-circle shadow-lg fw-bold' onClick={() => { getOverview(id) }}>
            <span className='d-flex align-items-center justify-content-center text-white fs-5 font-monospace' style={{ height: '20px', width: '20px' }}> i </span>
          </button>
          {adminComponent === true &&
            <button type="button" className='btn-reset bg-danger lh-1 p-2 rounded-circle shadow-lg text-white' onClick={() => { deleteCourse() }} disabled={deleteStatus?.isDeleting === true ? true : false}>
              {deleteStatus?.isDeleting === true && deleteStatus?.id === id ?
                <div className="spinner-border fw-medium border-0 d-inline-flex align-items-center justify-content-center me-1" style={{ height: '20px', width: '20px' }}>
                  <ImSpinner4 />
                </div>
                :
                <MdDelete size={20} />
              }
            </button>
          }
        </div>
      </div>

      {adminComponent === true &&
        <div className='mt-1 d-flex flex-wrap'>
          <div className="col-6 pe-1">
            <button type="button" className='btn btn-warning text-white fw-medium px-2 py-1 w-100' onClick={() => { navigate(`/admin/course/edit-details?id=${id}`) }}>
              Edit Course
            </button>
          </div>

          <div className="col-6 ps-1">
            <button type="button" className='btn btn-success fw-medium px-2 py-1 w-100' onClick={() => { navigate(`/admin/course/edit-content?id=${id}`) }}>
              Modify Content
            </button>
          </div>
        </div>
      }

    </div>
  )
}

export const AccordianCustom = ({
  children, id, idx, name, subModuleLen, lastUpdated,
  urlThreaten, adminMode, course_id, deletestatus,
  handleDeleteModule, setCurrModuleData, setResponseStatus,
  setResponseData
}) => {

  const [params] = useSearchParams()
  const navigate = useNavigate()
  let currModule = params.get('module')
  const [isOpen, setIsOpen] = useState(() => {
    if (currModule === id && !urlThreaten) {
      return true
    } else {
      return false
    }
  })

  useEffect(() => {
    if (currModule === id) {
      setIsOpen(true)
    }
  }, [currModule, id, setIsOpen])

  let lastUpdatedStr = formatDistance(lastUpdated || new Date(), new Date(), { addSuffix: true });
  const handleEditButton = () => {
    navigate(`/admin/course/edit-module?course=${course_id}&module=${id}`)
  }

  const handleDelete = async (course_id, module_id) => {
    try {
      let confirmation = window.confirm('Are you sure want to delete page')
      if (confirmation) {
        let fetching = await handleDeleteModule(course_id, module_id)
        if (fetching.status === 200) {
          setCurrModuleData((prev) => {
            let curr = prev
            curr.modules = curr.modules.filter(ele => ele?._id !== module_id)
            return curr
          })
        }
      } else {
        return;
      }

    } catch (error) {
      console.log(error);
      setResponseStatus(true)
      setResponseData({
        flag: true,
        heading: 'Somthing got wrong!',
        message: error?.message
      })
    }
  }

  return (
    <div>
      <div className={`custom-accordian ${isOpen && 'rounded-bottom-0 border-bottom-0'}`} onClick={() => { setIsOpen(!isOpen) }}>
        <div>
          <div className={`text-capitalize title fs-5 fw-semibold ${!isOpen && 'border-bottom'} py-2 px-3 d-flex justify-content-between gap-md-4 gap-0 ${currModule === id ? 'bg-theam' : 'bg-theam-palate'}`}>
            <span className='text-truncate d-block col-md-10 col-8'>
              <span>{idx}.&nbsp;</span><span>{name}</span>
            </span>
            <div className='d-flex gap-3 align-items-center'>
              <IoIosArrowDropdownCircle className='fs-4' />
              {adminMode &&
                <div className='d-flex gap-3'>
                  <button
                    type="button"
                    className='btn-reset bg-warning rounded-circle lh-1 d-flex align-items-center justify-content-center'
                    style={{ height: '30px', width: '30px' }}
                    onClick={handleEditButton}>
                    <FaEdit size={16} />
                  </button>

                  <button
                    type="button"
                    className='btn-reset bg-danger rounded-circle lh-1 d-flex align-items-center justify-content-center'
                    style={{ height: '30px', width: '30px' }}
                    onClick={() => handleDelete(course_id, id)}
                    disabled={deletestatus === true ? true : false}>
                    {deletestatus === true &&
                      <LoadingDataSpinner className={'text-white'} textClassName={'d-none'} />
                    }
                    <FaTrash size={16} />
                  </button>
                </div>
              }
            </div>
          </div>

          {!isOpen &&
            <div className='px-2 pb-2 bg-theam-palate py-2'>
              <div className='subtopic-len'>
                <MdOutlineChecklistRtl />
                <span className='text-truncate text-white col-10 d-inline-block'>{subModuleLen} Subtopics</span>
              </div>
              <div className='last-updated'>
                <AiOutlineFieldTime />
                <span className='text-truncate text-white col-10 d-inline-block'>Last update {lastUpdatedStr}</span>
              </div>
            </div>
          }
        </div>
      </div>

      {isOpen &&
        <div className='p-2 accordian-main-body rounded-bottom d-flex flex-column gap-2 bg-body-tertiary'>
          {children}
        </div>
      }
    </div>
  )
}

export const SidebarAccordianList = ({
  id, name, page, lastUpdated, ofModule, adminMode, course_id
}) => {

  let lastUpdatedStr = formatDistance(lastUpdated || new Date(), new Date(), { addSuffix: true })
  const [params, setParams] = useSearchParams()
  let currpage = params.get('page')

  const navigate = useNavigate()
  const handleEditButton = () => {
    navigate(`/admin/course/edit-page?course=${course_id}&module=${ofModule}&page=${id}`)
  }

  const { handleDeletePage, deletePageStatus } = useContext(AdminContext)
  const { setCourseLearning_offCanvasFlag } = useContext(DataContext)
  const { scrollTop } = useContext(FunctionContext)

  return (
    <>
      <div className={`bg-white border border-theam rounded-1 overflow-hidden d-flex gap-2 cursor-pointer`} onClick={() => {
        if (adminMode === false) {
          setParams({
            course: course_id,
            module: ofModule,
            page: id
          })
        }

        setCourseLearning_offCanvasFlag(false); scrollTop();
      }}
      >
        <span className={`col-2 text-white d-flex align-items-center justify-content-center px-3 fs-5 ${currpage === id && ofModule === params.get('module') ? 'bg-theam' : 'bg-theam-palate'}`}> {page} </span>
        <div className='col-10 py-1 d-flex align-items-center justify-content-between pe-3'>
          <div className='d-flex flex-column gap-1 text-truncate'>
            <span className={`text-capitalize text-truncate d-block ${currpage === id && ofModule === params.get('module') ? 'fw-semibold' : 'fw-normal'}`}> {name} </span>
            <span className={`lh-1 ${currpage === id && ofModule === params.get('module') ? 'fw-normal' : 'fw-light'}`} style={{ fontSize: '12px' }}> Last updated {lastUpdatedStr} </span>
          </div>

          <div className='d-flex gap-3'>
            {adminMode &&
              <>
                <button type="button"
                  className='btn-reset bg-warning rounded-circle lh-1 d-flex align-items-center justify-content-center'
                  style={{ height: '30px', width: '30px' }}
                  onClick={handleEditButton}>
                  <FaEdit size={16} className='text-white' />
                </button>
                <button type="button"
                  className='btn-reset bg-danger rounded-circle lh-1 d-flex align-items-center justify-content-center'
                  style={{ height: '30px', width: '30px' }}
                  onClick={() => handleDeletePage(ofModule, id)}
                  disabled={deletePageStatus?.isDeleting}
                >
                  {deletePageStatus?.isDeleting === true && deletePageStatus?.id === id ?
                    <div className="spinner-border border-0 d-flex align-items-center justify-content-center">
                      <ImSpinner4 className={`fs-5 text-white`} />
                    </div>
                    :
                    <FaTrash size={16} className='text-white' />
                  }
                </button>
              </>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export const FirstLetterEffectText2 = ({ text }) => {

  const [textArr, setTextArr] = useState([])
  useEffect(() => {
    let arr = text.split(" ");
    setTextArr(arr)
  }, [text])

  return (
    <>
      <span>
        {textArr.map((ele, idx) => {
          return (
            <span className={`themed-first-letter`} key={`${ele}-idx-${idx}`}>{ele}&nbsp;</span>
          )
        })
        }
      </span>
    </>
  )
}