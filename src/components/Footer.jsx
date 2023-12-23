import React, { useContext } from 'react'
import { IcoBtn } from './Utility'
import { FaArrowRightLong, FaLinkedinIn } from 'react-icons/fa6'
import { FaFacebookF, FaGithub, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DataContext from '../context/data/DataContext'

const CustomList = ({ link, text }) => {
  return (
    <>
      <li className='custom-footer-links'>
        <Link to={link} className={`text-white d-flex align-items-center gap-2 text-decoration-none`}>
          <FaArrowRightLong />
          <span>{text}</span>
        </Link>
      </li>
    </>
  )
}

const Footer = () => {
  
  const { socialLinks } = useContext(DataContext)
  const { facebook, github, insta, linkedin } = socialLinks

  return (
    <div className={`mainFooter`}>
      <div className="mx-md-5 mx-3 py-5 d-flex flex-wrap gap-md-0 gap-5">
        <div className='d-flex flex-column gap-3 col-md-5 col-12'>
          <div className={`transparent-effect-thin d-block width-fit px-3 py-1 rounded-3 user-select-none shadow-md-white`}>
            <span className="fs-1 fw-bold text-uppercase text-white d-block">Shivam Kashyap</span>
          </div>
          <div className={`transparent-effect-thin d-block width-fit px-3 py-1 rounded-3 user-select-none shadow-md-white me-4`}>
            <span className="text-white d-block fw-medium fs-5 d-block">
              MERN Stack Developer
            </span>
          </div>
          <div>
            <ul className='p-0 m-0 d-flex gap-3'>
              <li><IcoBtn link={github} icon={<FaGithub />} /></li>
              <li><IcoBtn link={linkedin} icon={<FaLinkedinIn />} /></li>
              <li><IcoBtn link={facebook} icon={<FaFacebookF />} /></li>
              <li><IcoBtn link={insta} icon={<FaInstagram />} /></li>
            </ul>
          </div>
        </div>

        <div className='d-flex flex-column gap-2 col-md-2 col-12'>
          <div className={`transparent-effect-thin d-block width-fit px-3 py-1 rounded-3 user-select-none shadow-md-white me-4`}>
            <span className="text-white d-block fw-medium fs-5 d-block">
              Quick Links
            </span>
          </div>

          <div className="mt-2">
            <ul className='p-0 m-0 d-flex flex-column gap-1'>
              <CustomList link={'/'} text={'Portfolio'} />
              <CustomList link={'/work'} text={'Work'} />
              <CustomList link={'/course'} text={'Course'} />
              <CustomList link={'/blogs'} text={'Blogs'} />
              <CustomList link={'/contact'} text={'Contact'} />
            </ul>
          </div>
        </div>

        <div className='d-flex flex-column gap-2 col-md-5 col-12 d-flex flex-column align-items-md-end'>
          <div className={`transparent-effect-thin d-block width-fit px-3 py-1 rounded-3 user-select-none shadow-md-white`}>
            <span className="text-white d-block fw-medium fs-5 d-block">
              Subscribe to our Newsletter today!
            </span>
          </div>

          <div>
            <form className={`newsLetterForm align-items-md-end align-items-center`}>
              <input type="email" name="newsletter_email" id="newsLetterEmail" placeholder='youremail@domain.com' />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer