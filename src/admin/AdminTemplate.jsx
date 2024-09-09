import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { FaBarsStaggered, FaBookmark, FaBullhorn, FaFire, FaNewspaper } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaBookReader } from "react-icons/fa";
import { MdContacts } from 'react-icons/md';
import { RiFeedbackFill } from "react-icons/ri";
import { LuFolderCog } from 'react-icons/lu';
import { HiDocumentPlus } from 'react-icons/hi2';
import { useLocation, useNavigate } from 'react-router-dom';
import FunctionContext from '../context/function/FunctionContext';
import AdminContext from '../context/admin/AdminContext'
import DataContext from '../context/data/DataContext'
import { BiSolidMessageSquareAdd } from "react-icons/bi";
import { Collapse } from 'react-bootstrap';
import { VscTriangleDown } from "react-icons/vsc";
import axios from 'axios';

const MenuList = ({ tooltip, icon, placement, name, full, link, setFalse, hasChild, menu }) => {

    const navigate = useNavigate()

    const [childState, setChildState] = useState(false)
    const [child] = useState(() => {
        if (hasChild) {
            const temp = menu?.find((li => li?.name === name))
            return [{ name, link, icon }, ...temp?.children]
        }
    })

    return (
        <OverlayTrigger
            placement={placement ? placement : "right"}
            delay={{ show: 150, hide: 200 }}
            overlay={full === true ? () => { return <></> } : tooltip}
        >
            <>
                <button
                    type="button"
                    className={`bg-transparent d-flex align-items-center ${hasChild && 'justify-content-between'} gap-2 ${full ? 'w-100 px-3 border py-1 rounded shadow-sm' : 'p-3 border-0'}`}
                    onClick={() => {
                        if (link?.length > 0 && !hasChild) {
                            navigate(link)
                            if (setFalse) {
                                setFalse()
                            }
                        } else if (hasChild === true) {
                            setChildState(!childState)
                        }
                    }}
                >
                    <span className='d-flex align-items-center gap-2'>
                        <span className='fs-5 text-theam'>{icon}</span>
                        <span className={`mt-1 ${full ? 'd-inline-block' : 'd-none'}`}>{name}</span>
                    </span>
                    {hasChild &&
                        <span className='text-theam'> <VscTriangleDown size={20} /> </span>
                    }
                </button>
                {hasChild === true &&
                    <Collapse in={childState}>
                        <div id="example-collapse-text">
                            <div className="p-2 d-flex flex-wrap gap-3">
                                {child?.map(child => {
                                    return (
                                        <ChildMenuList setFalse={() => setFalse()} key={`${name}-child-${child?.name}`} link={child?.link} icon={child?.icon} text={child?.name} />
                                    )
                                })}
                            </div>
                        </div>
                    </Collapse>
                }
            </>
        </OverlayTrigger >
    )
}

const ChildMenuList = ({ link, icon, text, setFalse }) => {
    const navigate = useNavigate()

    return (
        <button type="button" className='simleButton-with-shaded px-2 width-fit' onClick={() => { navigate(link); if (setFalse) { setFalse(); } }}>
            <span className='text-white me-1'>{icon}</span>
            {text}
        </button>
    )
}

const AdminTemplate = (mainProps) => {

    const navigate = useNavigate()
    const location = useLocation()
    const { authorityMode } = useContext(AdminContext)
    const { removeSlash } = useContext(FunctionContext)
    const { backendHost } = useContext(DataContext)

    const [sideBar, setSideBar] = useState(false)
    const menu = useMemo(() => {
        let baseMenu = [{
            name: 'Course',
            link: '/admin/course',
            icon: <FaBookReader />,
            children: [
                {
                    name: 'New Course',
                    link: '/admin/course/new-course',
                    icon: <BiSolidMessageSquareAdd />
                },
                {
                    name: 'Add Module',
                    link: '/admin/course/new-module',
                    icon: <LuFolderCog />
                },
                {
                    name: 'Add Page',
                    link: '/admin/course/new-pages',
                    icon: <HiDocumentPlus />
                }
            ],
            renderTooltip: (props) => {
                return <Tooltip {...props} id="Course"> Course </Tooltip>
            }
        },
        {
            name: 'Work',
            link: '/admin/work',
            icon: <FaFire />,
            children: [
                {
                    name: 'New Work',
                    link: '/admin/work/new-work',
                    icon: <FaBookmark />
                },
            ],
            renderTooltip: (props) => {
                return <Tooltip {...props} id="Work"> Work </Tooltip>
            }
        },
        {
            name: 'News Letter',
            link: '/admin/news-letter',
            icon: <FaNewspaper />,
            children: [
                {
                    name: 'Mail Newsletter',
                    link: '/admin/news-letter/mail-news',
                    icon: <FaBookmark />
                }
            ],
            renderTooltip: (props) => {
                return <Tooltip {...props} id="News"> News Letter </Tooltip>
            }
        },
        {
            name: 'Testimonial',
            link: '/admin/testimonial',
            icon: <RiFeedbackFill />,
            children: [],
            renderTooltip: (props) => {
                return <Tooltip {...props} id="Testimonial"> Testimonial </Tooltip>
            }
        },
        {
            name: 'Contacts Request',
            link: '/admin/contacts',
            icon: <MdContacts />,
            children: [],
            renderTooltip: (props) => {
                return <Tooltip {...props} id="Contacts"> Contacts Request </Tooltip>
            }
        },
        {
            name: 'Notification Manager',
            link: '/admin/notify',
            icon: <FaBullhorn />,
            children: [],
            renderTooltip: (props) => {
                return <Tooltip {...props} id="Notification"> Notification Manager </Tooltip>
            }
        }]

        if (authorityMode === "CourseWritter") {
            return baseMenu.filter((m) => m?.name === "Course")
        } else if (authorityMode === "BlogWritter") {
            return [];
        } else {
            return baseMenu;
        }
    }, [authorityMode])


    const genralTooltipFunction = {
        menuTooltip: (props) => {
            return <Tooltip id="Course" {...props}> Expand Menu </Tooltip>
        },
        logoutTooltip: (props) => {
            return <Tooltip id="Course" {...props}> Logout </Tooltip>
        },
    }

    const [childrenMenu, setChildrenMenu] = useState([])
    useEffect(() => {
        setChildrenMenu(() => {
            return menu.find((m) => {
                return removeSlash(location.pathname).indexOf(removeSlash(m?.link)) >= 0
            })?.children
        })
    }, [location.pathname, menu, removeSlash])


    const handleLogoutAdmin = async () => {
        try {
            const fetch = await axios.post(`${backendHost}/api/admin/logout`, {}, { withCredentials: true })
            if (fetch.status === 200) {
                navigate("/auth")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const [topText, setTopText] = useState("Admin")
    useEffect(() => {
        setTopText(() => {
            const temp = menu.find((ele) => removeSlash(location?.pathname).indexOf(removeSlash(ele?.link)) >= 0)
            return "Admin - " + temp?.name
        })
    }, [location?.pathname])


    return (
        <>
            <Offcanvas show={sideBar} onHide={() => { setSideBar(false); }}>
                <Offcanvas.Header closeButton className='border-bottom'>
                    <Offcanvas.Title className='fw-bold text-theam fs-4'>
                        Admin Menu
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul className='d-flex flex-column gap-4'>
                        {menu.map((ele, idx) => {
                            if (ele.children.length > 0) {
                                return (
                                    <li key={`menu-desktop-${idx}`}>
                                        <MenuList link={ele?.link} hasChild={true} menu={menu} tooltip={ele?.renderTooltip} icon={ele?.icon} name={ele?.name} full={true} setFalse={() => setSideBar(false)} />
                                    </li>
                                )
                            } else {
                                return (
                                    <li key={`menu-desktop-${idx}`}>
                                        <MenuList tooltip={ele?.renderTooltip} icon={ele?.icon} name={ele?.name} full={true} link={ele?.link} setFalse={() => setSideBar(false)} />
                                    </li>
                                )
                            }
                        })}
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

            <div className='d-flex align-items-center justify-content-between w-100 border-bottom position-sticky top-0 bg-white' style={{ zIndex: 9 }}>
                <span className='bg-theam' onClick={() => { setSideBar(true) }}>
                    <MenuList tooltip={genralTooltipFunction?.menuTooltip} icon={<FaBarsStaggered className='text-white' />} />
                </span>
                <span className='text-theam fs-4 fw-bold mx-lg-0 mx-auto pe-lg-0 pe-5 user-select-none'>{topText}</span>
                <span className='bg-danger d-lg-block d-none' onClick={handleLogoutAdmin}>
                    <MenuList placement={"left"} tooltip={genralTooltipFunction?.logoutTooltip} icon={<IoMdLogOut className='text-white' />} />
                </span>
            </div >

            <main className='d-inline-flex w-100 overflow-auto'>
                <nav className='border-end position-fixed bg-white h-100 d-lg-inline d-none'>
                    <ul className='d-flex flex-column gap-4 py-4'>
                        {menu.map((ele, idx) => {
                            return (
                                <li key={`menu-desktop-${idx}`}>
                                    <MenuList tooltip={ele?.renderTooltip} icon={ele?.icon} name={ele?.name} link={ele?.link} full={false} />
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                <div className='w-100 ps-lg-5 ps-0'>
                    <div className='bg-body-secondary'>
                        <div className={`d-flex gap-3 ${childrenMenu?.length > 0 && 'p-3'}`}>
                            {Array.isArray(childrenMenu) && childrenMenu?.map((ele) => {
                                return (
                                    <ChildMenuList key={`${ele?.name}-subMenu`} link={ele?.link} icon={ele?.icon} text={ele?.name} />
                                )
                            })}
                        </div>
                    </div>
                    <div className='p-3 px-lg-4 position-relative'>
                        {menu?.length === 0 ?
                            <div className='d-flex align-items-center justify-content-center' style={{ minHeight: '60dvh' }}>
                                <span className="fs-2 fw-light">
                                    Comming Soon
                                </span>
                            </div>
                            :
                            mainProps.children
                        }
                    </div>
                </div>
            </main>
        </>
    )
}

export default AdminTemplate
