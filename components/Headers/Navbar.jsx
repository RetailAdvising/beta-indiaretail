import nav from '@/libs/header'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import format from 'date-fns/format'

import { Nunito } from 'next/font/google'
import { set } from 'nprogress'
import { useState } from 'react'
import { GetDigitalIconList } from '@/libs/api'
import { list } from 'postcss'
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
    const [istechnology, setTechnology] = useState(false);
    let [listtech,setListTech] = useState([])

    const handleTechMouseEnter = async () => {
        if(!listtech || listtech.length === 0) {
            let resp = await GetDigitalIconList()
           if(resp && resp.message && resp.message.length > 0) {
            listtech = resp.message
            setListTech(listtech)
        }}
         setTechnology(true)

    }
    const handleTechMouseLeave = () => setTechnology(false);
    
    return (
        <>
            {/* sticky_header */}
            {/* {<div className={` lg:hidden sidebar ${navbar ? 'sideActive' : ''} `} ><SideBar data={nav} close={() => close()} /></div>} */}
            {/* onClick={showSidebar} */}
            {!checkout && (nav.header && nav.header.items.length != 0) && <div className={`res-nav ${router.asPath.split('/')[1] == 'tag' ? 'sticky_header z-20' : ''}  md:hidden ${(router.asPath == '' || router.asPath == '/') ? 'lg:p-[15px_30px]' : 'lg:p-[15px_30px]'} ${navbar ? '' : 'md:p-[0_20px]'} ${header.navHead} md:h-[55px]`}>
                <div className={`${navbar ? '' : 'container'} flex flex-wrap items-center justify-between`}>
                    {nav.header.items.map(res => {
                        return (
                            <div key={res.section_name} className={`${(res.section_name == 'Header Logo' || res.section_name == 'Header Profile Info') ? '' : (res.section_name == 'Header Category Info') ? 'lg:flex-[0_0_calc(100%_-_10px)] container pt-[10px]' : 'flex-[0_0_calc(80%_-_10px)]'}`}>
                                {res.section_name == 'Header Logo' && <div>
                                    {/* <Image priority height={20} width={20} alt={res.section_name} src={'/menu.svg'} /> */}
                                </div>}

                                {(res.section_name == 'Header Menu' && res.menus) && <>
                                    <div className={`flex items-center justify-center tab:overflow-auto tab:justify-start scrollbar-hide md:pb-0 md:hidden md:mt-0 ${navbar ? 'md:hidden' : 'md:hidden'
                                        } lg:gap-[20px] xl:gap-[25px]`}>
                                        {res.menus.map(item =>
                                            item.menu_label === "Technology" ? (
                                                <div
                                                    key={item.menu_label}
                                                    className={`${header.listKey} tab:flex-[0_0_auto] font-[700] navigation_c lg:text-[16px] relative ${"/" + router.asPath.split('/')[1] == item.redirect_url ? header.activeMenu : ''} ${nunito.className} tracking-[0]`}
                                                    onMouseEnter={handleTechMouseEnter}
                                                    onMouseLeave={handleTechMouseLeave}
                                                >
                                                    <Link href={item.redirect_url} >
                                                        {item.menu_label} <Image className='inline-block rotate-[90deg] ml-[5px]' src={'/arrow.svg'} alt='podcast' width={5} height={5} />
                                                    </Link>
                                                    {istechnology && listtech && listtech.length > 0 && (
                                                        <div className='absolute min-w-[150px] top-[20px] rounded-[5px] left-0 bg-white z-50 flex flex-col p-[5px] border-[1px]' >{
                                                            listtech.map((item, index) => (
                                                                <Link key={index} href={`/digital/${item.route}`} className=' text-[14px] p-[5px] font-[500] __className_e8004f tracking-[0]'>{item.name}</Link>
                                                            ))
                                                        }
                                                            {/* <Link className=' text-[14px] p-[5px] font-[500] __className_e8004f tracking-[0]' href={"/digital"}>Digital Icon</Link>
                                                            <Link className=' text-[14px] p-[5px] font-[500] __className_e8004f tracking-[0]' href={"/digital-icon-2025"}>Digital Icon 2025</Link> */}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <Link
                                                    key={item.menu_label}
                                                    href={item.redirect_url}
                                                    className={`${header.listKey} tab:flex-[0_0_auto] font-[700] navigation_c lg:text-[16px] relative ${"/" + router.asPath.split('/')[1] == item.redirect_url ? header.activeMenu : ''} ${nunito.className} tracking-[0]`}
                                                >
                                                    {item.menu_label}
                                                </Link>
                                            )
                                        )}
                                    </div>

                                    <div className='lg:hidden'>
                                        <Image style={{ objectFit: 'contain' }} className='h-[60px] w-full' height={76.23} priority width={284.65} alt='' src={'/indiaretail.png'}></Image>
                                    </div>

                                </>}
                                {res.section_name == 'Header Profile Info' && <div className={`text-end today_date items-center lg:flex lg:items-center lg:gap-[5px] lg:justify-end md:float-right ${navbar ? 'md:pr-[20px]' : ''}`}>
                                    {/* <Image src={'/Navbar/Date-and-time-01.svg'} className='md:hidden lg1:hidden' height={20} width={20} alt={'weather'} /> */}
                                    <> <p className={`md:hidden tab:hidden text-[#66161] text-[12px] lg1:text-[10px] ${nunito.className}`}>{format(new Date(), "iiii, d MMMM yyyy")}</p></>
                                    <Image className='lg:hidden' style={{ objectFit: 'contain' }} height={50} priority width={24} alt='search' src={'/search.svg'} ></Image>
                                </div>}

                                {res.section_name == 'Header Category Info' && <div className='flex justify-center items-center md:hidden tab:overflow-auto scrollbar-hide tab:justify-start'>
                                    {res.menus.map((item, index) => {
                                        return (
                                            // onClick={() => router.push(item.redirect_url)}
                                            // <div key={index} className={`nav-item ${index === activeIndex ? 'active' : ''}`} onClick={() => handleItemClick(index)}>
                                            <Link key={index} href={item.redirect_url} className={`${router.asPath == item.redirect_url ? 'active' : ''} justify-center p-[10px_8px] flex gap-[5px] items-center tab:flex-[0_0_auto]`} >
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
