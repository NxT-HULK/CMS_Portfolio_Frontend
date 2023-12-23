import React from 'react'
import { CustomBtn, FirstLetterEffectText } from '../components/Utility'
import { BsFillSendFill } from 'react-icons/bs'

const Contact = () => {
    return (
        <>
            <section className="random-background py-5">
                <div className="container-fluid">
                    <div className="d-flex justify-content-center align-items-center gap-5 mx-3">
                        <div className="col-md-5 d-md-block d-none">
                            <img src="/contact-illus.svg" alt="" />
                        </div>

                        <div className="col-md-6 col-12 p-md-3 px-2 rounded-4" style={{ background: '#6a59d115', backdropFilter: 'blur(7px)', boxShadow: '5px 5px 0 #6a59d130' }}>
                            <FirstLetterEffectText text={"Get In Touch"} className={'text-md-start text-center'} />
                            <form action="" className='mt-3'>
                                <div className="mb-2">
                                    <input type="text" className="rounded-1 custom-input-style" aria-describedby="NameHelp" placeholder="Your Name*" required />
                                </div>
                                <div className="mb-2">
                                    <input type="text" className="rounded-1 custom-input-style" aria-describedby="QueryHelp" placeholder="Your Query*" required />
                                </div>
                                <div className="mb-2">
                                    <input type="email" className="rounded-1 custom-input-style" aria-describedby="emailHelp" placeholder="youremail@domain.com*" />
                                </div>
                                <div className="mb-2">
                                    <textarea name="message" id="" rows="5" className='w-100 custom-input-style rounded-1' placeholder="Your Message*" data-gramm="false" data-gramm_editor="false" data-enable-grammarly="false" required />
                                </div>
                                <CustomBtn text="Send Message" icon={<BsFillSendFill />} type={'submit'} className={'mx-md-0 mx-auto'} />
                            </form>
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
}

export default Contact