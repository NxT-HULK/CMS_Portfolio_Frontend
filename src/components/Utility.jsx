import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaInfo, FaLink, FaLongArrowAltRight, FaPlay } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom/dist'
import DataContext from '../context/data/DataContext'
import { LiaAngleLeftSolid, LiaAngleRightSolid } from 'react-icons/lia'

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

export const FirstLetterEffectText = ({ text, className, className2 }) => {

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
    <span className={`role block my-2 p-0 fw-bold  ${className}`}>{firstLetterEffect}</span>
  )
}

export const ProvideCard = ({ icon, text, modalId }) => {
  return (
    <>
      <div className="whatIProvideCard">
        <span className="icon">{icon}</span>
        <span className="fs-4 fw-bold">{text}</span>
        <button type="button" className='d-flex gap-2 align-items-center px-2 py-1 rounded'>
          {/* <button type="button" className='d-flex gap-2 align-items-center px-2 py-1 rounded' data-bs-toggle="modal" data-bs-target={`#${modalId}`}> */}
          Know More <FaLongArrowAltRight />
        </button>
      </div>
    </>
  )
}

export const TestimonialCard = ({ rating, message, signature }) => {

  const [mess, setMess] = useState(message)
  const [moreInfo, setMoreInfo] = useState(true)

  useEffect(() => {
    if (mess.length > 179) {
      setMess(mess.substring(0, 179) + "...")
      setMoreInfo(true)
    }
  }, [mess])

  const { setInformationModalData } = useContext(DataContext)
  const handleKnowMore = () => {
    setInformationModalData({
      heading: `Testimonial - ${signature}`,
      message: message
    })
  }

  return (
    <>
      <div className="testimonial-card d-flex flex-column h-100">
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

  const scrollerContainer = useRef("")
  const card = useRef("")

  const hanleLeftClick = (e) => {
    const cardWidth = card.current.clientWidth
    scrollerContainer.current.scrollLeft -= cardWidth
  }

  const hanleRightClick = (e) => {
    const cardWidth = card.current.clientWidth
    scrollerContainer.current.scrollLeft += cardWidth
  }

  const { setResponseStatus, setResponseData } = useContext(DataContext)
  const hanleSetInformationData = (projectName, html) => {
    setResponseStatus(true)
    setResponseData({
      isLoading: false,
      heading: `Project Information - ${projectName}`,
      message: html
    })
  }

  return (
    <div className='d-flex align-items-stretch custom-strip-scroller'>
      <div className="controller">
        <button type="button" onClick={hanleLeftClick}>
          <LiaAngleLeftSolid />
        </button>
      </div>

      <div className="d-flex overflow-hidden scroll-smoth" ref={scrollerContainer}>
        {data && data.map((ele, idx) => {
          return (
            <div className="work-card-custom" key={`professional-cards-${idx}-${ele._id}`} ref={card}>
              <img src={ele.background} alt="" />

              <div className='detailed-controller'>
                <div className="justify-content-end d-flex gap-2 mb-2">
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
          )
        })}
      </div>

      <div className="controller">
        <button type="button" onClick={hanleRightClick}>
          <LiaAngleRightSolid />
        </button>
      </div>
    </div>
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
