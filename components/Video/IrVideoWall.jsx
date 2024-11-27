import Video from './Video'
import VideoSlide from './VideoSlide'
import Title from '../common/Title'
import {  Inter } from 'next/font/google'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
const inter = Inter({
    weight: ["300", "400", "500", "600", "700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter'
})
// const nunito = Nunito({
//     weight: ["300", "400", "500", "600", "700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
// })
export default function IrVideoWall({ data, c, isMobile }) {
    // console.log(data, 'data')
    const router = useRouter()
    const [activeTab, setActiveTab] = useState()
    const [categoryItems, setCategoryItems] = useState([])

    useEffect(() => {
        if (data && data[0]) {
            setActiveTab(data[0].category)
            setCategoryItems(data[0].data)
        }
    }, [data])


    const goTo = (data) => {
        // console.log(data,'data')
        if (data.category == 'IR Studio') {
            router.push('/video/ir-studio')
        } else if (data.category == 'Retail with Rasul Bailay') {
            router.push('/video/retail-with-rasul-bailay')
        } else if (data.category == 'The Store') {
            router.push('/video/the-store')
        }
    }

    const activateTab = (data) => {
        setActiveTab(data.category)
        setCategoryItems(data.data)
    }

    return (
        <>
            <div className='flex lg:items-center lg:justify-between gap-5 md:flex-col md:gap-[0px]'>
                <div>
                    <Title data={{ title: c.component_title }} textClass={'text-white'} see={'text-white'} route={'/video'} seeMore={isMobile} />
                </div>

                <div className='flex item-center md:justify-center gap-5 md:gap-[15px]'>
                    {data.map((res, i) => {
                        return (
                            <div key={`sjcfnj${res.category} `} className='cursor-pointer' onClick={() => activateTab(res)}>
                                <h6 className={`text-white text-[16px] md:text-[14px] font-medium ${inter.className} pb-[5px]`}>{res.category}</h6>
                                {activeTab == res.category && <div className={`active_tab`}></div>}
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='md:hidden'>
                <Title data={{ title: null }} textClass={'text-white'} see={'text-white'} route={'/video'} seeMore={true} />
            </div>

            {categoryItems && categoryItems.length > 0 && <div className={`wrapper md:!block lg:py-[15px]`}>
                {/* {data.map((res, i) => {
                    return (
                        <div key={i} className={`${i == 0 ? 'sidebar_1' : i == 1 ? 'right_1 md:overflow-hidden' : 'right_2 md:overflow-hidden'} rounded-[5px] p-[15px] md:my-[10px]`} style={{ background: 'rgba(53, 53, 53, 1)' }}>
                            <div className='flex justify-between pb-5'>
                                <h6 className={`text-white nunito`}>{res.category}</h6>
                                <div className='flex items-center gap-[5px] cursor-pointer' onClick={() => goTo(res)}>
                                    <p className={`text-[12px] font-normal text-white nunito`}>View All</p>
                                    <Image className='h-[11px] w-[5px] object-contain' src={'/arrow-white.svg'} height={5} width={5} alt='View All' />
                                </div>
                            </div>

                            {res.data && res.data.length != 0 && res.category == 'Retail with Rasul Bailay' && <Video data={res.data.slice(0, 1)} isBg={true} big={true} abs={'md:!bottom-[45px]'} isHome={'/video/'} imgClass={'h-[330px] w-full md:h-[200px]'} />}
                            {res.data && res.data.length != 0 && res.category == 'Retail with Rasul Bailay' && <div className={`flex gap-5 items-center md:mt-5`}><Video isBg={true} abs={'!bottom-[60px]'} flex={'flex-[0_0_calc(50%_-_10px)]'} data={res.data.slice(1, 3)} isHome={'/video/'} imgClass={'h-[177px] md:h-[120px] w-full'} /></div>}
                            {res.data && res.data.length != 0 && res.category == 'The Store' && <><VideoSlide  slider_child_id={'slide_1' + i} slider_id={'slide_parent_1' + i} data={res.data} title_class={'text-white'} isHome={'/video/'} cardClass={'flex-[0_0_calc(45%_-_15px)] md:flex-[0_0_calc(70%_-_15px)]'} imgClass={'h-[200px] md:h-[135px] w-full'} /></>}
                            {res.data && res.data.length != 0 && res.category == 'IR Studio' && <><VideoSlide slider_child_id={'slide_2' + i} slider_id={'slide_parent_2' + i} data={res.data} title_class={'text-white'} isHome={'/video/'} cardClass={'flex-[0_0_calc(45%_-_15px)] md:flex-[0_0_calc(70%_-_15px)]'} imgClass={'h-[200px] md:h-[135px] w-full'} /></>}

                        </div>
                    )
                })} */}

                {/* style={{ background: 'rgba(53, 53, rounded-[5px]53, 1)' }} */}
                <div className='sidebar_1  p-[15px] md:my-[10px]' >
                    {/* h-[330px] */}
                    {isMobile ?
                        <VideoSlide slider_child_id={'slide_3' + '11123'} slider_id={'slide_parent_3' + '11123'} data={categoryItems} title_class={'text-white line-clamp-2'} isHome={'/video/'} cardClass={'md:flex-[0_0_calc(100%_-_5px)]'} imgClass={'md:h-[200px] w-full'} />
                        :
                        <Video data={categoryItems.slice(0, 1)} isBg={true} big={true} abs={'md:!bottom-[45px]'} isHome={'/video/'} imgClass={'h-[350px] w-full md:h-[200px]'} />
                    }
                </div>
                {/* style={{ background: 'rgba(53, 53rounded-[5px], 53, 1)' }} */}
                <div className='right_1  p-[15px] md:my-[10px] md:hidden' >
                    <VideoSlide slider_child_id={'slide_1' + '11123'} slider_id={'slide_parent_1' + '11123'} data={categoryItems.slice(1, 6)} title_class={'text-white line-clamp-2'} isHome={'/video/'} cardClass={'flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(50%_-_15px)]'} imgClass={'h-[115px] md:h-[90px] w-full'} />
                </div>
                {/* style={{ background: 'rgba(53, 53, 53, 1)' }} rounded-[5px]*/}
                {categoryItems.length > 7 && <div className='right_2  p-[15px] md:my-[10px] md:hidden' >
                    <VideoSlide slider_child_id={'slide_1' + '1112'} slider_id={'slide_parent_1' + '1112'} data={categoryItems.slice(6, categoryItems.length - 1)} title_class={'text-white line-clamp-2'} isHome={'/video/'} cardClass={'flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(50%_-_15px)]'} imgClass={'h-[115px] md:h-[90px] w-full'} />
                </div>}

                {/* {categoryItems.map((res, i) => {
                    return (
                        <div key={i} className={`${i == 0 ? 'sidebar_1' : i == 1 ? 'right_1 md:overflow-hidden' : 'right_2 md:overflow-hidden'} rounded-[5px] p-[15px] md:my-[10px]`} style={{ background: 'rgba(53, 53, 53, 1)' }}>

                            {res.data && res.data.length != 0 && res.category == 'Retail with Rasul Bailay' && <Video data={res.data.slice(0, 1)} isBg={true} big={true} abs={'md:!bottom-[45px]'} isHome={'/video/'} imgClass={'h-[330px] w-full md:h-[200px]'} />}
                            {res.data && res.data.length != 0 && res.category == 'Retail with Rasul Bailay' && <div className={`flex gap-5 items-center md:mt-5`}><Video isBg={true} abs={'!bottom-[60px]'} flex={'flex-[0_0_calc(50%_-_10px)]'} data={res.data.slice(1, 3)} isHome={'/video/'} imgClass={'h-[177px] md:h-[120px] w-full'} /></div>}
                            {res.data && res.data.length != 0 && res.category == 'The Store' && <><VideoSlide slider_child_id={'slide_1' + i} slider_id={'slide_parent_1' + i} data={res.data} title_class={'text-white'} isHome={'/video/'} cardClass={'flex-[0_0_calc(45%_-_15px)] md:flex-[0_0_calc(70%_-_15px)]'} imgClass={'h-[200px] md:h-[135px] w-full'} /></>}
                            {res.data && res.data.length != 0 && res.category == 'IR Studio' && <><VideoSlide slider_child_id={'slide_2' + i} slider_id={'slide_parent_2' + i} data={res.data} title_class={'text-white'} isHome={'/video/'} cardClass={'flex-[0_0_calc(45%_-_15px)] md:flex-[0_0_calc(70%_-_15px)]'} imgClass={'h-[200px] md:h-[135px] w-full'} /></>}

                        </div>
                    )
                })} */}
            </div>}
        </>
    )
}