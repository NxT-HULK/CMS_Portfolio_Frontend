import React from 'react'

const Blogs = () => {

    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']

    return (
        <div id='blogMain' className='nav-padding'>
            <div className="container-fluid py-4">

                {arr.map((ele, idx) => {
                    return (
                        <div className="blog-card-overview" key={ele + "" + idx}>
                            <div className="gradient-closer"></div>
                            <img src={"https://picsum.photos/600/800/"} alt="" />
                            <div className='position-relative p-md-3 p-2 allMatter d-flex align-items-end h-100'>
                                <span>Lorem ipsum dolor sit amet consectetur {idx + 1}</span>
                            </div>
                        </div>
                    )
                })}


            </div>
        </div>
    )
}

export default Blogs