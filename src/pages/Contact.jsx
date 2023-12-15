import React from 'react'
import { CustomBtn, FirstLetterEffectText } from '../components/Utility'
import { BsFillSendFill } from 'react-icons/bs'

const Contact = () => {
    return (
        <>
            <section className="twinkling-stars-background pt-5">
                <div className="container py-5">
                    <div className="d-flex">
                        <div className="col-md-7 col-12 p-md-3 p-0 rounded-4" style={{ backdropFilter: 'blur(5px)', backgroundColor: '#a7233a1a' }}>
                            <FirstLetterEffectText text={"Get In Touch"} className="text-white" />
                            <form action="" className='mt-3'>
                                <div className="mb-2">
                                    <input type="text" className="rounded-1 custom-input-style-2" aria-describedby="NameHelp" placeholder="Your Name*" required />
                                </div>
                                <div className="mb-2">
                                    <input type="text" className="rounded-1 custom-input-style-2" aria-describedby="QueryHelp" placeholder="Your Query*" required />
                                </div>
                                <div className="mb-2">
                                    <input type="email" className="rounded-1 custom-input-style-2" aria-describedby="emailHelp" placeholder="youremail@domain.com*" />
                                </div>
                                <div className="mb-2">
                                    <textarea name="message" id="" rows="5" className='w-100 custom-input-style-2 rounded-1' placeholder="Your Message*" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" required />
                                </div>
                                <CustomBtn text="Send Message" icon={<BsFillSendFill />} type={'submit'} />
                            </form>
                        </div>

                        <div className="col-md-5 d-md-block d-none">
                            <img src="/contact-illus.svg" alt="" />
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Contact