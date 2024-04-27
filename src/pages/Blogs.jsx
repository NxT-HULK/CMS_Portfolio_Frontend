import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Blogs = () => {

    let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

    return (
        <div id='blogMain' className='nav-padding'>
            <HelmetProvider>
                <Helmet>
                    <title>Blogs - Comming Soon || Shivam Kashyap</title>
                </Helmet>
            </HelmetProvider>

            <div className="container-fluid py-4">

                {arr.map((ele, idx) => {
                    return (
                        <div className="blog-card-overview" key={ele + "" + idx}>
                            <div className="gradient-closer"></div>
                            <img src={`https://picsum.photos/id/${450 + idx}/600/800`} alt="" />
                            <div className='position-relative p-md-3 p-2 allMatter d-flex justify-content-end h-100 flex-column'>
                                <span>Lorem ipsum dolor sit amet consectetur {idx + 1}</span>
                                <Link to='/blogs/id'>Know More</Link>
                            </div>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default Blogs