import { useEffect, useState } from 'react'
import Image from 'next/image'
import nav from '@/libs/header'
import dynamic from 'next/dynamic';
const SideBar = dynamic(() => import('./SideBar'))
const TopNavBar = dynamic(() => import('./SideBar'))
// import SideBar from './SideBar';
// import TopNavBar from './TopNavBar';
import { useRouter } from 'next/router';
import { checkMobile } from '@/libs/api';

export default function MobileHead({ isLanding = true, getActiveTab, activeTab }) {
    const [isMobile, setIsMobile] = useState()
    const [isVisible, setIsVisible] = useState(false);
    const router = useRouter()
    useEffect(() => {
        // After 2 seconds, set the isVisible state to true
        const timeout = setTimeout(() => {
            setIsVisible(true);
        }, 2000);

        if (isMobile && router) {
            show_header()
        }
        // Clear the timeout if the component unmounts before the 2 seconds
        return () => clearTimeout(timeout);
    }, [isMobile, router.query, activeTab]);

    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const emit_nav_item = (item) => {
        activeTab = item
        getActiveTab(item)
    }

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }

    const show_header = () => {
        var lastScrollTop = 0;
        var element = document.getElementById('scroll_div')
        // var main = document.getElementById('main')
        var tabs = document.getElementById('tabs')
        var header = document.getElementById('header')
        element.scrollTop = 0
        header.className = 'nav-down'
        element.classList.add('lg:mt-[95px]', 'md:mt-[60px]');
        if (tabs)
            tabs.className = 'tabs-down'

        element.addEventListener("scroll", function () { // or window.addEventListener("scroll"....
            var st = element.scrollTop // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
            if (st < 100) {
                // console.log(st);
                header.className = 'nav-down'
                element.classList.add('lg:mt-[95px]', 'md:mt-[60px]');
                tabs.className = 'tabs-down'
            }
            else if (st > lastScrollTop) {
                header.className = 'nav-up'
                element.classList.remove('lg:mt-[95px]', 'md:mt-[60px]');
                tabs.className = 'tabs-up'
            } else if (st < lastScrollTop && st > 100) {
                header.className = 'nav-down'
                element.classList.remove('lg:mt-[95px]', 'md:mt-[60px]');
                tabs.className = 'tabs-down'
            } // else was horizontal scroll
            lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
        }, false);
    }

    const [navbar, setNavbar] = useState(false);

    const showSidebar = () => {
        setNavbar(!navbar)
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'hidden';
        }
    }

    const close = async () => {
        setNavbar(false)
        if (typeof window != 'undefined' && window.document) {
            document.body.style.overflow = 'auto';
        }
    }

    return (
        <>
            <div className={`${navbar ? 'sideBackdrop' : ''} `} >
                <div className={`fixed sidebar ${navbar ? 'sideActive' : ''} `}>
                    <div className={`${isVisible ? 'visible' : ''}`}></div>
                    {nav && <SideBar data={nav} navbar={navbar} close={() => close()} emit_item={emit_nav_item} />}
                </div>
            </div>
            {navbar && <Backdrop />}

            <div id="header" className=' md:!h-fit'>
                <div className='flex border_bottom items-center z-30 justify-between p-[5px_15px] min-h-[60px]' >
                    <div className='flex gap-[15px] items-center'>
                        <div >
                            <Image onClick={() => isLanding ? showSidebar() : window.history.back()} className={`${isLanding ? 'w-[20px]' : 'w-[9px]'} mouse`} src={isLanding ? '/menu.svg' : '/back.svg'} height={14} width={15} layout="fixed" alt="Edit" />
                        </div>
                        {/* {Heading == '' ? <Image style={{ objectFit: 'contain' }} onClick={() => router.push('/')} className='h-[50px] w-full' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image> : <h6 className='text-[16px] font-semibold tex-black capitalize'>{Heading}</h6>} */}
                        <Image style={{ objectFit: 'contain' }} onClick={() => router.push('/')} className='w-[132px] mt-[5px]' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image>
                    </div>
                    <Image className='lg:hidden md:h-[20px] cursor-pointer' onClick={() => router.push("/search?searchText=")} style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} ></Image>
                </div>
                {router.route != '/login' && <TopNavBar nav_data={nav} getActiveTab={getActiveTab} activeTab={activeTab} />}
            </div>
        </>
    )
}

const Backdrop = () => {
    return (
        <div className='backdrop'>
            <div className="h-[100%] flex flex-col gap-[10px] items-center  justify-center"></div>
        </div>
    )
}