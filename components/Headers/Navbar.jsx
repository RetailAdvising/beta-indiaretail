import nav from '@/libs/header'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import format from 'date-fns/format'

import { Nunito } from 'next/font/google'
const nunito = Nunito({
    weight: ["300", "400", "500", "600", "700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter',
})

export default function Navbar({ heading, isLanding, checkout }) {
    const router = useRouter();
    const navbar = false;
    // const [navbar, setNavbar] = useState(false);
    // const [isMobile, setIsMobile] = useState(false)
    // const [date, setDate] = useState(undefined)

    // useEffect(() => {

    //     dispatch(setRoutes(router.route));
    //     const formattedDate = format(new Date(), "iiii, d MMMM yyyy");
    //     setDate(formattedDate)
    //     // console.log('router.asPath',router.asPath); 
    //     // console.log('router.asPath',nav); 
    // }, [])


    return (
        <>
            {/* sticky_header */}
            {/* {<div className={` lg:hidden sidebar ${navbar ? 'sideActive' : ''} `} ><SideBar data={nav} close={() => close()} /></div>} */}
            {/* onClick={showSidebar} */}
            {!checkout && (nav.header && nav.header.items.length != 0) && <div className={`${router.asPath.split('/')[1] == 'tag' ? 'sticky_header z-20' : ''}  md:hidden ${(router.asPath == '' || router.asPath == '/') ? 'lg:p-[15px_30px]' : 'lg:p-[15px_30px]'} ${navbar ? '' : 'md:p-[0_20px]'} ${header.navHead} md:h-[55px]`}>
                <div className={`${navbar ? '' : 'container'} flex flex-wrap items-center justify-between`}>
                    {nav.header.items.map(res => {
                        return (
                            <div key={res.section_name} className={`${(res.section_name == 'Header Logo' || res.section_name == 'Header Profile Info') ? 'flex-[0_0_calc(20%_-_10px)]' : (res.section_name == 'Header Category Info') ? 'lg:flex-[0_0_calc(100%_-_10px)] container pt-[10px]' : 'flex-[0_0_calc(60%_-_10px)]'}`}>
                                {res.section_name == 'Header Logo' && <div>
                                    {/* <Image priority height={20} width={20} alt={res.section_name} src={'/menu.svg'} /> */}
                                </div>}

                                {(res.section_name == 'Header Menu' && res.menus) && <>
                                    <div className={`flex items-center justify-center  md:pb-0 md:hidden md:mt-0 ${navbar ? 'md:hidden' : 'md:hidden'
                                        } lg:gap-[20px] xl:gap-[25px]`}>
                                        {res.menus.map(item => {
                                            return (
                                                // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                                // tracking-wide
                                                <Link href={item.redirect_url} className={`${header.listKey} font-[700] navigation_c lg:text-[16px]  ${"/" + router.asPath.split('/')[1] == item.redirect_url ? header.activeMenu : ''} ${nunito.className} tracking-[0]`} key={item.menu_label}>
                                                    {item.menu_label}
                                                </Link>
                                            )
                                        })}
                                    </div>

                                    <div className='lg:hidden'>
                                        <Image style={{ objectFit: 'contain' }} className='h-[60px] w-full' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image>
                                    </div>

                                </>}
                                {res.section_name == 'Header Profile Info' && <div className={`text-end items-center lg:flex lg:items-center lg:gap-[5px] lg:justify-end md:float-right ${navbar ? 'md:pr-[20px]' : ''}`}>
                                    {/* <Image src={'/Navbar/Date-and-time-01.svg'} className='md:hidden lg1:hidden' height={20} width={20} alt={'weather'} /> */}
                                     <> <p className={`md:hidden text-[#66161] text-[12px] lg1:text-[10px] ${nunito.className}`}>{format(new Date(), "iiii, d MMMM yyyy")}</p></>
                                    <Image className='lg:hidden' style={{ objectFit: 'contain' }} height={50} priority width={24} alt='search' src={'/search.svg'} ></Image>
                                </div>}

                                {res.section_name == 'Header Category Info' && <div className='flex justify-center items-center md:hidden'>
                                    {res.menus.map((item, index) => {
                                        return (
                                            // onClick={() => router.push(item.redirect_url)}
                                            // <div key={index} className={`nav-item ${index === activeIndex ? 'active' : ''}`} onClick={() => handleItemClick(index)}>
                                            <Link key={index} href={item.redirect_url} className={`${router.asPath == item.redirect_url ? 'active' : ''} justify-center p-[10px_8px] flex gap-[5px] items-center`} >
                                                {/* m-[3px_0_0_0] */}
                                                <div className='h-[4px] w-[4px]  rounded-full bg-red'></div>
                                                <p className={`${router.asPath == item.redirect_url ? 'primary_color' : ''} text-[13px] font-[500] ${nunito.className} tracking-[0]`}>{item.menu_name}</p>
                                            </Link>
                                            // </div>
                                        )
                                    })}
                                </div>}
                            </div>
                        )
                    })
                    }
                </div>
            </div>}
            { }
            {/* {<div className='lg:hidden'><MobileHead isLanding={isLanding} Heading={heading} checkout={checkout} /></div>} */}

        </>
    )
}
