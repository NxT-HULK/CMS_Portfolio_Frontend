import React, { useContext } from 'react'
import { FirstLetterEffectText, CourseCard, LoadingDataSpinner } from '../components/Utility'
import DataContext from '../context/data/DataContext'

const Course = () => {

    let { courses, isLoadingCourse } = useContext(DataContext)

    return (
        <div className='container-fluid py-4 px-md-5 px-0 mb-4' style={{ minHeight: '40vh' }}>
            {courses.length > 0 ?
                <>
                    <div className='w-100 mb-4'>
                        <div className='width-fit'>
                            <FirstLetterEffectText text={'with the belief of practical learning'} className={''} style={{ wordSpacing: '5px' }} />
                            <div className='border border-theam'></div>
                        </div>
                    </div>

                    <div className="w-100 d-flex flex-wrap gap-4">
                        {isLoadingCourse ?
                            <LoadingDataSpinner />
                            :
                            courses.map((ele) => {
                                return (
                                    <CourseCard
                                        key={ele._id}
                                        courseTitle={ele.name}
                                        id={ele._id}
                                        img={ele.img}
                                    />
                                )
                            })
                        }
                    </div>
                </>
                :
                <>
                    <FirstLetterEffectText text={`i'll upload course very soon`} style={{ wordSpacing: '5px' }} />
                    <div className='mt-3'>
                        <span className="d-inline-block bg-body-tertiary border px-3 py-1 fw-semibold fs-5 rounded">Please visit after few days!</span>
                    </div>
                </>
            }
        </div >
    )
}

export default Course