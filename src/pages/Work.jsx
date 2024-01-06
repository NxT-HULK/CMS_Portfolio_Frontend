import React, { useState } from 'react'
import '../styles/work.scss'
import { BtnBig, FirstLetterEffectText, StripedSliderCustom } from '../components/Utility'
import { FaInfo, FaWpexplorer } from 'react-icons/fa'
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";

const Work = () => {

    const [audioFlag, setAudioFlag] = useState(true)
    const [professional] = useState([
        {
            '_id': 0,
            'path': 'https://picsum.photos/id/10/350/200',
            'link': ''
        },
        {
            '_id': 1,
            'path': 'https://picsum.photos/id/11/350/200',
            'link': ''
        },
        {
            '_id': 2,
            'path': 'https://picsum.photos/id/12/350/200',
            'link': ''
        },
        {
            '_id': 3,
            'path': 'https://picsum.photos/id/13/350/200',
            'link': ''
        },
        {
            '_id': 4,
            'path': 'https://picsum.photos/id/14/350/200',
            'link': ''
        },
        {
            '_id': 5,
            'path': 'https://picsum.photos/id/15/350/200',
            'link': ''
        },
        {
            '_id': 6,
            'path': 'https://picsum.photos/id/16/350/200',
            'link': ''
        },
        {
            '_id': 7,
            'path': 'https://picsum.photos/id/17/350/200',
            'link': ''
        },
        {
            '_id': 8,
            'path': 'https://picsum.photos/id/18/350/200',
            'link': ''
        },
        {
            '_id': 9,
            'path': 'https://picsum.photos/id/19/350/200',
            'link': ''
        },
    ])

    return (
        <>
            <div className="p-0 m-0 w-100 min-vh-100">
                <div className="position-relative w-100 p-0 m-0 d-flex align-items-end" style={{ minHeight: '100vh' }}>
                    <video loop={true} muted={audioFlag} autoPlay={true} className='h-100 w-100 p-0 m-0 object-fit-cover position-absolute' style={{ zIndex: '-1' }}>
                        <source src={require('../assets/temp.mp4')} type='video/mp4' />
                    </video>

                    <div className="nav-padding h-100 z-2">
                        <div className="ms-md-5 ms-3 d-flex d-flex align-items-end justify-content-md-center justify-content-start">
                            <div className="col-md-6 col-12 mt-5 pt-5">
                                <div className="transparent-effect py-4 px-3 rounded-2 mb-3 col-10">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci repudiandae soluta impedit doloribus odit facere atque distinctio animi quos temporibus, omnis nihil enim rem ipsum consectetur dolores voluptatibus molestias quibusdam.
                                </div>
                                <div className="d-flex gap-3">
                                    <BtnBig text={`Explore`} link={'https://srconceptstudio.com/#/'} target={true} icon={<FaWpexplorer className='fs-5 me-1' />} />
                                    <button type={'button'} className={`btn-reset user-select-none theam-btn-big`}>
                                        <span> <FaInfo className='fs-6' /> </span>
                                        <span> Inforamtion </span>
                                    </button>
                                </div>
                            </div>

                            <div className="col-6 mb-5 z-2 d-md-block d-none">
                                <div className='position-absolute d-flex gap-2 align-items-center' style={{ right: 0 }}>
                                    <button type="button" className="btn-reset border border-2 border-theam rounded-circle transparent-effect lh-1 p-2" onClick={() => { setAudioFlag(!audioFlag) }}>
                                        {audioFlag === true ?
                                            <GiSpeakerOff className='fs-3 text-white' />
                                            :
                                            <GiSpeaker className='fs-3 text-white' />
                                        }
                                    </button>
                                    <span className="transparent-effect fw-semibold text-uppercase text-white py-2 px-4 border-start border-3 border-theam">
                                        {audioFlag === true ?
                                            <span> Mutted </span>
                                            :
                                            <span> Speaker </span>
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="vw-100 left-0 position-relative z-2 px-3 mt-4" style={{ marginBottom: '-80px' }}>
                            <FirstLetterEffectText text="Professional Works" className2={'text-white'} />
                            <StripedSliderCustom data={professional} />
                        </div>
                    </div>
                </div>
                <div className="gradientLayer z-1"></div>
            </div>

            <div className="container-fluid pt-5" id="work_svg_bg">
                <div className="pt-5 mt-2">
                    <FirstLetterEffectText text="My Hobby Work" className2={'text-white'} />
                    <div>
                        <StripedSliderCustom data={professional} />
                    </div>
                </div>

                <div className="pt-3 pb-5">
                    <FirstLetterEffectText text="Some Extra Stuff" className2={'text-white'} />
                    <div>
                        <StripedSliderCustom data={professional} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Work