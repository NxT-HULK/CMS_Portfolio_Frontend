import React from 'react'
import { BtnBig, FirstLetterEffectText } from '../components/Utility'
import { TbArrowBack } from "react-icons/tb";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const NotFound = () => {
    return (
        <div className='d-flex flex-column align-items-center justify-content-center' style={{ minHeight: '60vh' }}>
            <HelmetProvider>
                <Helmet>
                    <title>Page not Found | Eror - 404</title>
                </Helmet>
            </HelmetProvider>
            <p className='fw-bold fs-2 mb-0'>
                <span> Error: </span>
                <span className='text-theam'> 404 </span>
            </p>

            <FirstLetterEffectText text={'Page Not Found'} className={'lh-1 mb-5'} />

            <BtnBig icon={<TbArrowBack />} link={"/"} text={'Go Home'} />

        </div>
    )
}

export default NotFound