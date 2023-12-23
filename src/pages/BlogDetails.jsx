import React, { useRef } from 'react'
import { MdAccessTime } from "react-icons/md";
import { FaAngleLeft, FaAngleRight, FaEye, FaRegComment } from "react-icons/fa";
import { BlogCommentBox, BlogSmallCard, ButtonShaded, CustomTags, FirstLetterEffectText } from '../components/Utility';

const BlogDetails = () => {

    const moreBlogsContainer = useRef("")
    const handleControl_left = () => {
        let card = moreBlogsContainer.current.querySelector('.more-blog-card')
        moreBlogsContainer.current.scrollLeft -= card.clientWidth + 8
    }

    const handleControl_Right = () => {
        let card = moreBlogsContainer.current.querySelector('.more-blog-card')
        let currLimit = moreBlogsContainer.current.scrollWidth - moreBlogsContainer.current.clientWidth
        if (moreBlogsContainer.current.scrollLeft === currLimit) {
            moreBlogsContainer.current.scrollLeft = 0
        } else {
            moreBlogsContainer.current.scrollLeft += card.clientWidth + 8
        }

        console.log(card.clientWidth + 8);
    }

    return (
        <>
            <div className="container-fluid d-flex px-xl-5 px-2 gap-4 flex-xl-row flex-column">
                <div className="py-2">
                    <span className="fs-2 fw-bold d-block my-4" style={{ lineHeight: '1.095' }} > Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, officiis. </span>
                    <div className='d-flex my-3'>
                        <div className='pe-3 border-end d-flex align-items-center gap-1 flex-xl-row flex-column text-center'>
                            <MdAccessTime className='fs-5 text-secondary' />
                            <span className='text-secondary'>12 August 2023</span>
                        </div>

                        <div className='px-3 border-end d-flex align-items-center gap-1 flex-xl-row flex-column text-center'>
                            <FaRegComment className='fs-5 text-secondary' />
                            <span className='text-secondary'>10 Comments</span>
                        </div>

                        <div className='px-3 d-flex align-items-center gap-1 flex-xl-row flex-column text-center'>
                            <FaEye className='fs-5 text-secondary' />
                            <span className='text-secondary'>10 Minutes Reading</span>
                        </div>
                    </div>

                    <img src="https://picsum.photos/seed/picsum/700/400" alt="" className='mb-3 rounded d-block mx-xl-0 mx-auto w-100' />

                    <div className='me-md-4 me-0'>
                        <p className='text-jsutify'>
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Optio, ducimus commodi sunt alias soluta eum odit repellat omnis cumque sequi, fuga perspiciatis nihil modi, deserunt quod? Laborum omnis ipsa eveniet impedit incidunt, molestias dolor hic ipsam expedita velit odio aliquam totam alias? Ducimus, incidunt numquam quia natus sequi autem dignissimos eligendi eum sit aperiam deleniti perspiciatis porro iste eaque tempora, laudantium vero. Sit ratione ipsa mollitia porro molestias iusto quos dignissimos similique. Repellat enim hic alias assumenda aperiam recusandae laboriosam quaerat provident aspernatur inventore sapiente exercitationem, sit neque beatae vel doloremque rem laborum tenetur eveniet nihil consectetur ipsum. Quia corporis quas ab impedit delectus, voluptates alias, ipsam corrupti maiores ullam, molestias voluptatem sit tempore nulla aliquam nesciunt amet doloremque! Temporibus autem omnis quaerat veritatis natus voluptatum, ex iste asperiores reprehenderit quis quas magnam aliquid provident explicabo, quidem tempore, in alias quisquam expedita dolorum? Sunt dolore quia, dignissimos illo similique, dolor libero numquam odit deserunt, nostrum tenetur? Hic aspernatur, vero aut odit esse doloribus adipisci quibusdam, beatae voluptatibus asperiores natus tenetur quos distinctio debitis consequatur culpa, necessitatibus ab tempora vel eveniet fugiat! Sunt quos, ratione facere hic illum architecto nobis cum facilis commodi accusantium eius est non. Nobis maiores possimus officia!
                        </p>
                    </div>
                </div>

                <div className="col-xl-4 col-12 py-2 pt-xl-5 pt-0">
                    <div className="border border-theam rounded overflow-hidden mb-4">
                        {/* tags will goes here */}
                        <div>
                            <span className="py-1 bg-theam text-white d-flex justify-content-center fw-bold fs-5 text-uppercase shadow"> Tags </span>
                        </div>
                        <div className="px-2 py-3 d-flex gap-3 flex-wrap">
                            <CustomTags tag="hello" />
                            <CustomTags tag="hello" />
                            <CustomTags tag="hello" />
                            <CustomTags tag="hello" />
                            <CustomTags tag="hello" />
                            <CustomTags tag="hello" />
                        </div>
                    </div>

                    <div className="border border-theam rounded overflow-hidden mb-4">
                        {/* tags will goes here */}
                        <div> <span className="py-1 bg-theam text-white d-flex justify-content-center fw-bold fs-5 text-uppercase shadow"> Comments </span> </div>
                        <div className="px-2 py-3 d-flex gap-3 flex-wrap">
                            <BlogCommentBox mess={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ipsam reprehenderit quia optio natus!"} date={'01/01/2024'} />
                            <BlogCommentBox mess={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ipsam reprehenderit quia optio natus!"} date={'01/01/2024'} />
                            <BlogCommentBox mess={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ipsam reprehenderit quia optio natus!"} date={'01/01/2024'} />
                            <BlogCommentBox mess={"Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam ipsam reprehenderit quia optio natus!"} date={'01/01/2024'} />
                        </div>
                    </div>

                    <div className="border border-theam rounded overflow-hidden">
                        {/* tags will goes here */}
                        <div> <span className="py-1 bg-theam text-white d-flex justify-content-center fw-bold fs-5 text-uppercase shadow"> Push your comment </span> </div>
                        <div className="px-2 py-3 d-flex gap-3 flex-wrap">
                            <form className='w-100'>
                                <div className="mb-2 w-100">
                                    <textarea name="comment" id="" rows="5" className='w-100 custom-input-style rounded-1' placeholder="I'll appreciate you thought, Feel free to say anything." required />
                                </div>
                                <div className="mb-2 w-100">
                                    <ButtonShaded text={`push`} />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid my-5 px-xl-5 px-3">
                <div className='d-flex align-items-center justify-content-between'>
                    <FirstLetterEffectText text={"See More Blogs"} />

                    <div className="d-flex gap-3">
                        <button type="button" className="btn-reset rounded-circle d-block bg-theam lh-1 p-2" onClick={handleControl_left}>
                            <FaAngleLeft className='fs-4 text-white' />
                        </button>
                        <button type="button" className="btn-reset rounded-circle d-block bg-theam lh-1 p-2" onClick={handleControl_Right}>
                            <FaAngleRight className='fs-4 text-white' />
                        </button>
                    </div>
                </div>

                <div className="mt-3 overflow-y-auto">
                    <div className="pb-2 px-0 d-flex gap-3 overflow-hidden" ref={moreBlogsContainer} style={{ scrollBehavior: 'smooth' }}>
                        <BlogSmallCard title={"Lorem ipsum dolor sit amet."} imgLink={"https://picsum.photos/id/455/600/800"} />
                        <BlogSmallCard title={"Sample Blog"} imgLink={"https://picsum.photos/id/456/600/800"} />
                        <BlogSmallCard title={"Sample Blog"} imgLink={"https://picsum.photos/id/459/600/800"} />
                        <BlogSmallCard title={"Sample Blog"} imgLink={"https://picsum.photos/id/458/600/800"} />
                        <BlogSmallCard title={"Sample Blog"} imgLink={"https://picsum.photos/id/460/600/800"} />
                        <BlogSmallCard title={"Sample Blog"} imgLink={"https://picsum.photos/id/461/600/800"} />
                        <BlogSmallCard title={"Sample Blog"} imgLink={"https://picsum.photos/id/464/600/800"} />
                        <BlogSmallCard title={"Sample Blog"} imgLink={"https://picsum.photos/id/466/600/800"} />
                    </div>
                </div>

            </div>
        </>
    )
}

export default BlogDetails