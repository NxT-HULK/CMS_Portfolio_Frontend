import React, { useContext, useEffect, useState } from 'react'
import '../styles/work.scss'
import { CustomBtn, FirstLetterEffectText, StripedSliderCustom } from '../components/Utility'
import { FaInfo, FaWpexplorer } from 'react-icons/fa'
import { GiSpeaker, GiSpeakerOff } from "react-icons/gi";
import DataContext from '../context/data/DataContext';
import { ImSpinner4 } from 'react-icons/im'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Work = () => {

    const [audioFlag, setAudioFlag] = useState(true)
    const { backendHost } = useContext(DataContext)

    const [isLoadingProfessionalProjects, setIsLoadingProfessionalProjects] = useState(false)
    const [professionalData, setProfessionalData] = useState(false)

    const [isLoadingPersonalProjects, setIsLoadingPersonalProjects] = useState(false)
    const [personalProjects, setPersonalProjects] = useState(false)

    const [isLoadingHobbyProjects, setIsLoadingHobbyProjects] = useState(false)
    const [hobbyProjects, setHobbyProjects] = useState(false)

    useEffect(() => {
        (async () => {
            setIsLoadingProfessionalProjects(true)
            let raw = await fetch(`${backendHost}/work/get-data/professional`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await raw.json()
            data.sort((a, b) => {
                return a.order - b.order
            })
            setProfessionalData(data)
            setIsLoadingProfessionalProjects(false)
        })();

        (async () => {
            setIsLoadingPersonalProjects(true)
            let raw = await fetch(`${backendHost}/work/get-data/personal`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await raw.json()
            data.sort((a, b) => {
                return a.order - b.order
            })
            setPersonalProjects(data)
            setIsLoadingPersonalProjects(false)
        })();

        (async () => {
            setIsLoadingHobbyProjects(true)
            let raw = await fetch(`${backendHost}/work/get-data/hobby`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let data = await raw.json()
            data.sort((a, b) => {
                return a.order - b.order
            })
            setHobbyProjects(data)
            setIsLoadingHobbyProjects(false)
        })();
    }, [backendHost])


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Work - Gem 💎 | Shivam Kashyap</title>
                </Helmet>
            </HelmetProvider>
            <div className="p-0 m-0 w-100 min-vh-100 position-relative">
                <div className="position-relative w-100 p-0 m-0 d-flex align-items-end" style={{ minHeight: '100vh' }}>
                    <video loop={true} muted={audioFlag} autoPlay={true} className='h-100 w-100 p-0 m-0 object-fit-cover position-absolute' style={{ zIndex: '-1' }}>
                        <source src={require('../assets/work.mp4')} type='video/mp4' />
                    </video>

                    <div className="nav-padding h-100 z-2">
                        <div className="ms-md-5 ms-3 d-flex d-flex align-items-end justify-content-md-center justify-content-start">
                            <div className="col-md-6 col-12 mt-5 pt-5 d-md-block d-none">
                                <div className="transparent-effect py-4 px-3 rounded-2 mb-3 col-10">
                                    Welcome to my portfolio, where creativity meets purpose. Explore a journey of innovation and passion as I showcase my diverse skills and experiences. Thank you for joining me on this visual and intellectual adventure. Feel free to explore, connect, and discover the essence of my work. Your presence here is truly appreciated.
                                </div>
                                <div className="d-flex gap-3">
                                    <CustomBtn text={`Explore`} icon={<FaWpexplorer className='fs-5 me-1' />} />
                                    <CustomBtn text={`Information`} icon={<FaInfo className='fs-6' />} />
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

                        <div className="vw-100-2 left-0 position-relative z-2 px-2 mt-4" style={{ marginBottom: '-80px' }}>
                            <div className='w-100 d-flex justify-content-between align-items-center'>
                                <FirstLetterEffectText text="Professional Works" className2={'text-white'} />
                                <div className='text-white fs-4 fw-bold bg-white px-4 lh-1 rounded-pill bg-theam py-2'>
                                    <span> {professionalData.length} </span>
                                    <span className='d-md-inline d-none'> Projects </span>
                                </div>
                            </div>

                            {isLoadingProfessionalProjects === true ?
                                <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                                    <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                                        <ImSpinner4 className='text-white fs-5' />
                                    </div>
                                    <span className='text-white'>Loading Data</span>
                                </div>
                                :
                                <StripedSliderCustom data={professionalData} />
                            }

                            <div className='d-md-none d-flex gap-2 align-items-center position-absolute top-0' id="responsive_speaker_btn" style={{ right: '-15px', marginTop: '-50px' }}>
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
                </div>
                <div className="gradientLayer z-1"></div>
            </div>

            <div className="container-fluid pt-5" id="work_svg_bg">
                <div className="pt-5 mt-5">
                    <div className='w-100 d-flex justify-content-between align-items-center'>
                        <FirstLetterEffectText text="Frelance Works" className2={'text-white'} />
                        <div className='text-white fs-4 fw-bold bg-white px-4 lh-1 rounded-pill bg-theam py-2'>
                            <span> {personalProjects.length} </span>
                            <span className='d-md-inline d-none'> Projects </span>
                        </div>
                    </div>
                    <div>
                        {isLoadingPersonalProjects === true ?
                            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                                <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                                    <ImSpinner4 className='text-white fs-5' />
                                </div>
                                <span className='text-white'>Loading Data</span>
                            </div>
                            :
                            <StripedSliderCustom data={personalProjects} />
                        }
                    </div>
                </div>

                <div className="pt-3 pb-5 mt-4 mb-3">
                    <div className='w-100 d-flex justify-content-between align-items-center'>
                        <FirstLetterEffectText text="Learning Projects" className2={'text-white'} />
                        <div className='text-white fs-4 fw-bold bg-white px-4 lh-1 rounded-pill bg-theam py-2'>
                            <span> {hobbyProjects.length} </span>
                            <span className='d-md-inline d-none'> Projects </span>
                        </div>
                    </div>
                    <div>
                        {isLoadingHobbyProjects === true ?
                            <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '50vh' }}>
                                <div className="spinner-border border-0 d-flex align-items-center justify-content-center" role="status">
                                    <ImSpinner4 className='text-white fs-5' />
                                </div>
                                <span className='text-white'>Loading Data</span>
                            </div>
                            :
                            <StripedSliderCustom data={hobbyProjects} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Work