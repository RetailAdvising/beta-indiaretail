import React, { useRef, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import TopStories from '../Landing/TopStories'
import ImageContainer from '../Landing/ImageContainer'
import SectionList from '../Landing/SectionList'
import LatestNews from '../Landing/LatestNews'
import AdsBaner from '../Baners/AdsBaner'
import IRPrime from '../Landing/IRPrime'
import Subscribe from '../Landing/Subscribe'
import BulletList from '../Landing/BulletList'
import TrendingBox from '../Landing/TrendingBox'
import Title from '../common/Title'
import Video from '../Video/Video'
import { checkMobile } from '@/libs/api'
// import ListSlider from '../Sliders/ListSlider'
// import ImageGroupEvents from '../Landing/ImageGroupEvents'
// import EventList from '../Events/EventList'
// import Cards from '../common/Cards'
// import List from '../common/List'
// import MultiCarousel from '../Sliders/MultiCarousel'
// import EventCards from '../Events/EventCards'
// import { useSelector } from 'react-redux'
// import SectionBox from '../Category/SectionBox'
// import Tabs from '../Landing/Tabs'
// import CardCarousel from '../Sliders/CardCarousel'

const List = dynamic(() => import('../common/List'))
const Cards = dynamic(() => import('../common/Cards'))
const CardCarousel = dynamic(() => import('../Sliders/CardCarousel'))
const ImageGroupEvents = dynamic(() => import('../Landing/ImageGroupEvents'))
const EventList = dynamic(() => import('../Events/EventList'))
const ListSlider = dynamic(() => import('../Sliders/ListSlider'))


export default function HomePageBuilder({ data, isLast, loadMore, i, val, news }) {
    const cardref = useRef(null);
    const [page_no, setPage_no] = useState(1);
    useEffect(() => {
        if (!cardref?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                // newLimit();
                // setPage_no(p => p += 1);
                load()
                // console.log(entry)
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardref.current);
    }, [isLast]);

    // useEffect(() => {
    //     if (page_no > 1) {
    //         loadMore(page_no)
    //     }
    // }, [page_no])
    // // console.log(data.layout_json)
    // console.log(JSON.parse(data.layout_json))

    const load = () => {
        // setPage_no(page_no + 1);
        loadMore()
    }


    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }


    return (
        <>
            <div ref={cardref} className={`py-[20px] ${i == 0 ? 'lg:p-5 bg-[#F8F9FA]' : i == 1 ? 'border-b border-[#d4d8d8] container' : i == 5 ? 'bg-[#000] lg:my-5 lg:p-[20px_40px] md:py-[20px] md:h-[350px] no_scroll' : i == 14 ? 'lg:bg-[#f1f1f1] p-5 lg:my-5' : 'container'}  md:p-[15px] md:py-[10px] lg:flex gap-5`}>
                {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                    return (
                        // || i == 5
                        <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class} ${(i != 0) ? 'md:mb-[20px]' : ''}  ${((i == 14) && !isMobile) ? 'container' : ''} `}>
                            {(res.components && res.components.length != 0) && res.components.map(c => {
                                return (
                                    <div key={c.component_title} className={`${c.component_title == "Top 3 Stories" ? 'top3 lg:justify-center md:gap-5' : ''}`}>
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Top 3 Stories") && <TopStories data={data.data[c.cid].data} />}
                                        {(c.component_title == "News" && c.cid && data.data[c.cid] && data.data[c.cid].data) && <div className='lg:flex gap-5'>
                                            <div className={`flex-[0_0_calc(60%_-_10px)]`}><ImageContainer data={data.data[c.cid].data[0]} height={"h-[350px] md:h-[250px]"} width={'w-full'} />
                                                <SectionList data={data.data[c.cid].data.slice(1, 4)} /></div>
                                            <div className={`flex-[0_0_calc(40%_-_10px)]`}>
                                                <Title data={{ title: 'Latest News' }} />
                                                {isMobile ? <><div className='no_scroll md:mb-[15px]'><LatestNews height={'h-[190px]'} width={'w-full'} data={data.data[c.cid].data.slice(0, 4)} /></div><LatestNews height={'h-[190px]'} width={'w-full'} isList={true} data={data.data[c.cid].data.slice(6, 8)} /></> : <LatestNews height={'h-[222px]'} width={'w-full'} data={data.data[c.cid].data.slice(4, 8)} />}
                                            </div>
                                        </div>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Advertisement") && <AdsBaner data={data.data[c.cid].data[0]} height={'h-[250px]'} />}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive") && <IRPrime data={data.data[c.cid].data} />}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive" && !isMobile) && <Subscribe height={"h-[162px]"} data={news} width={"w-full"} />}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Web specials") && <>
                                            <div className='lg:w-[calc(70%_-_10px)]'><Title data={{ title: c.component_title }} /></div>
                                            <div className={`lg:flex gap-5`}>
                                                <div className='lg:flex flex-wrap justify-between flex-[0_0_calc(70%_-_10px)]'>
                                                    <div className='flex-[0_0_calc(55%_-_10px)]'><ImageContainer isWeb={true} data={data.data[c.cid].data[0]} height={'h-[250px]'} width={'w-[500px]'} /></div>
                                                    <div className={`${isMobile ? '' : 'border_right border_left px-[20px] h-[250px] flex-[0_0_calc(45%_-_10px)]'}`}><BulletList data={data.data[c.cid].data.slice(0, 5)} /></div>
                                                    <div className={` flex border-t border-[#d4d8d8] pt-[15px] md:hidden`}><BulletList isBorder={true} data={data.data[c.cid].data.slice(0, 3)} /></div>
                                                </div>
                                                <div className='md:my-[15px] md:hidden'><AdsBaner data={{ ad_image: '/ads_baner.png' }} height={'h-[250px]'} width={'w-[300px]'} /></div>
                                            </div>
                                            <div className={`lg:flex no_scroll lg:my-[15px] md:my-[10px] gap-[10px] lg:flex-wrap lg:justify-between`}>
                                                <Cards contentHeight={'pt-[10px]'} isHome={'/news/'} data={data.data[c.cid].data.slice(0, 5)} check={true} height={'h-[125px] w-full'} border_none={true} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(60%_-_10px)]'} /></div>
                                        </>}

                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Trending") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className='lg:flex justify-between items-center gap-[10px]'>
                                                <div className={`flex gap-[10px] overflow-auto trending`}><TrendingBox data={data.data[c.cid].data} /></div>
                                                {!isMobile && <div className={`flex gap-[10px] flex-[0_0_calc(7%_-_10px)] justify-end`}><TrendingBox icons={true} parentElement={'trending'} /></div>}
                                            </div>
                                        </>}

                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Leaders Ink") && <>
                                            <Title data={{ title: c.component_title }} />
                                            {data.data[c.cid].data &&
                                                <div className='overflow-auto scrollbar-hide gap-[15px] flex md:w-screen'><CardCarousel isHome={'/categories/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[260px] flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(70%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /></div>}

                                            {/* <div className='none leaders'><MultiCarousel isHome={'/categories/'} perView={3} check={true} none={true} data={data.data[c.cid].data} cardHeight={'h-[310px]'} card_width={"285px !important"} height={"h-[185px]"} width={"w-full"} type={'profile'} /></div>} */}
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Research") && <>
                                            {/* route={'/categories/'} seeMore={true} */}
                                            <Title data={{ title: c.component_title }} />
                                            {data.data[c.cid].data && isMobile ?
                                                <div className='mb-[10px] research'><ListSlider route={'/categories/'} noDots={true} auto={false} data={data.data[c.cid].data} /></div> :
                                                <div className='overflow-auto scrollbar-hide gap-[15px] flex '><CardCarousel isHome={'/categories/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[220px] flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /></div>

                                                // <div className={`pr-[30px] none research`}><MultiCarousel isHome={'/categories/'} none={true} check={true} cardHeight={'h-[310px]'} perView={2} noPlay={true} data={data.data[c.cid].data} card_width={"285px !important"} height={"h-[185px]"} width={'w-full'} type={'card'} /></div>
                                            }
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Video Wall") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} see={'text-white'} route={'/video'} seeMore={true} />
                                            <><Video data={data.data[c.cid].data} isHome={'/video/'} isBg={true} big={true} imgClass={'h-[460px] w-full md:h-[200px]'} /></>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Retail with Rasul Bailay") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                                            <><Video data={isMobile ? data.data[c.cid].data.slice(0, 1) : data.data[c.cid].data} isHome={'/video/'} vh={'h-[205px]'} isBg={true} imgClass={'h-[150px] w-full md:h-[200px]'} /></>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Prime Videos") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                                            <><Video data={isMobile ? data.data[c.cid].data.slice(0, 1) : data.data[c.cid].data} vh={'h-[205px]'} isHome={'/video/'} isBg={true} imgClass={'h-[150px] w-full md:h-[200px]'} /></>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Store Videos") && <>
                                            <Title data={{ title: c.component_title }} textClass={'text-white'} />
                                            <><Video data={isMobile ? data.data[c.cid].data.slice(0, 1) : data.data[c.cid].data} vh={'h-[205px]'} isHome={'/video/'} isBg={true} imgClass={'h-[150px] w-full md:h-[200px]'} /></>
                                        </>}

                                        {/* {(resp.component_title == "AdsBaner" && resp.component_type == "Ad3" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={'h-full'} width={'w-full'} data={resp.data} /></>} */}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Fashion & Lifestyle") && <>
                                            <Title data={{ title: c.component_title }} route={'/categories/fashion-lifestyle'} seeMore={true} />
                                            {/* imgWidth={"h-[160px]"} */}
                                            <div className={`flex gap-5 md:gap-[5px] flex-wrap`}><List primary_pb={'lg:pb-[5px]'} hash_bg={'pt-[10px]'} titleClamp={'line-clamp-2'} isHome={'/categories/'} imgFlex={'flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(45%_-_10px)]'} data={isMobile ? data.data[c.cid].data.slice(0, 3) : data.data[c.cid].data} check={true} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} imgWidth={"h-[135px]"} imgHeight={"w-[215px]"} borderRadius={"rounded-[10px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Beauty & Wellness") && <div className='md:bg-[#F3F4F6] md:p-[10px] md:rounded-[5px]'>
                                            <Title data={{ title: c.component_title }} route={'/categories/beauty-wellness'} seeMore={true} />
                                            <div className={`${isMobile ? '' : 'border'} p-[10px] rounded-[5px]`}><List titleClamp={'line-clamp-2'} isHome={'/categories/'} imgFlex={'flex-[0_0_calc(25%_-_10px)]'} data={data.data[c.cid].data.slice(0, 4)} check={true} imgWidth={"w-[100px]"} imgHeight={"h-[73px]"} borderRadius={"rounded-[5px]"} isTop={isMobile ? false : true} isReverse={isMobile ? true : false} isBB={true} /></div>
                                        </div>}

                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Food & Beverage") && <>
                                            <Title data={{ title: c.component_title }} />
                                            <div className={`${isMobile ? 'no_scroll' : 'grid gap-5  grid-cols-5'}`}><Cards isHome={'/categories/'} cardClass={"h-[300px] md:h-[290px]"} check={true} data={data.data[c.cid].data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'md:flex-[0_0_calc(75%_-_15px)]'} isBorder={true} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && (c.component_title == "E-Commerce" || c.component_title == "People" || c.component_title == "D2C Buzz")) && <div className={`${isMobile ? '' : 'border p-[10px_15px] rounded-[10px]'}`}>
                                            {/* {isMobile ? <>
                                            
                                            <div className='flex'><Tabs categories={["E-Commerce","People","D2C Buzz"]} setTabs={(data) => setTab(data)} tab={tab} /></div>
                                            {(tab == c.component_title && data.data[c.cid].data) && <div className={`border p-[10px] rounded-[5px]`}><List check={true} titleClamp={'line-clamp-2'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[125px]"} borderRadius={"rounded-[10px]"} /></div>}                                       
                                            
                                            </> : <>
                                                <Title data={{ title: c.component_title }} />
                                                <div className={`border p-[10px] rounded-[5px]`}><List check={true} titleClamp={'line-clamp-2'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[125px]"} borderRadius={"rounded-[10px]"} /></div>
                                            </>

                                            } */}
                                            <Title data={{ title: c.component_title }} route={c.component_title == "E-Commerce" ? '/news/e-commerce' : c.component_title == "People" ? '/news/people' : c.component_title == "D2C Buzz" ? '/news/d2c-buzz' : null} seeMore={true} />
                                            {/* //  h-[144px] contentWidth={'lg:gap-[3px]'}  */}
                                            <div className={` lg:grid lg:gap-[10px] md:flex md:flex-col md:gap-[5px]`}><List primary_pb={'lg:pb-[5px]'} hash_bg={'pt-[10px]'} check={true} titleClamp={'line-clamp-2'} line={'line-clamp-1'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} flex={'items-center'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[135px] md:h-[115px]"} borderRadius={"rounded-[7px]"} /></div>
                                        </div>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Shopping Centers") && <>
                                            <Title data={{ title: c.component_title }} route={'/news/shopping-centers'} seeMore={true} />
                                            <div className={`md:flex md:flex-col md:gap-[5px]`}><List isHome={'/news/'} flex={'items-center lg:mb-[8px] lg:gap-5'} imgFlex={'flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} contentWidth={'lg:flex-[0_0_calc(60%_-_10px)] lg:gap-[5px]'} titleClamp={'line-clamp-2'} line={'line-clamp-2 md:line-clamp-1'} data={data.data[c.cid].data} check={true} fullWidth={true} imgWidth={"w-full"} imgHeight={"h-[130px] md:h-[110px]"} borderRadius={"rounded-[5px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Podcast") && <div className={`border md:mt-[15px] p-[10px] rounded-[5px]`}>
                                            <Title data={{ title: c.component_title }} route={'/podcast'} seeMore={true} />
                                            <List titleClamp={'md:pt-[0px]'} descLine={'line-clamp-2'} isHome={'/podcast/'} isDesc={true} data={isMobile ? data.data[c.cid].data : data.data[c.cid].data.slice(0, 1)} imgWidth={"w-full "} imgFlex={'lg:flex-[0_0_calc(27%_-_10px)] md:flex-[0_0_calc(30%_-_10px)]'} imgHeight={"h-[80px] md:h-[75px]"} check={true} isBB={true} borderRadius={"rounded-[6px]"} />
                                        </div>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Privilege Members Corner") && <>
                                            <Title data={{ title: c.component_title }} route={'/video'} seeMore={true} />
                                            <><Video imgClass={'h-[210px] md:h-[190px] w-full'} isHome={'/video/'} vh={'h-[265px] md:h-[245px]'} data={data.data[c.cid].data} /></>
                                        </>}
                                        {/* {(resp.component_title == "AdsBaner" && resp.component_type == "Ad4" && resp.data) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} data={resp.data} height={"100px"} /></>} */}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && (c.component_title == "Supply Chain" || c.component_title == "Marketing")) && <>
                                            <Title data={{ title: c.component_title }} route={c.component_title == "Supply Chain" ? '/news/supply-chain' : c.component_title == "Marketing" ? '/news/marketting' : null} seeMore={true} />
                                            <div className='md:flex md:flex-col md:gap-[5px]'><List isHome={'/news/'} primary_pb={'lg:pb-[5px]'} mb={true} data={data.data[c.cid].data} titleClamp={'line-clamp-2'} line={'line-clamp-1 md:line-clamp-1'} hash_bg={'pt-[10px] md:pt-[10px]'} check={true} imgFlex={'flex-[0_0_calc(35%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={"w-full"} imgHeight={"h-[125px] md:h-[115px]"} borderRadius={"rounded-[10px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Technology") && <>
                                            <Title data={{ title: c.component_title }} route={'/news/technology'} seeMore={true} />
                                            <div className={'border p-[10px] rounded-[5px]'}><List line={'line-clamp-1'} isHome={'/news/'} titleClamp={'line-clamp-2'} check={true} data={data.data[c.cid].data} imgFlex={'flex-[0_0_calc(30%_-_10px)]'} imgWidth={"w-full"} imgHeight={"h-[92px] md:h-[80px]"} isBB={true} isTop={true} borderRadius={"rounded-[10px] md:rounded-[5px]"} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Case Studies") && <>
                                            <Title data={{ title: c.component_title }} route={'/categories/case-studies'} seeMore={true} />
                                            <div className={`lg:flex no_scroll lg:gap-5`}><Cards check={true} isHome={'/categories/'} data={data.data[c.cid].data} cardClass={"h-[300px] "} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'basis-1/3 md:flex-[0_0_calc(65%_-_10px)]'} isBorder={true} /></div>
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Photo Essays") && <>
                                            <Title data={{ title: c.component_title }} route={'/categories/photo-essays'} seeMore={true} />
                                            <div className='overflow-auto scrollbar-hide gap-[15px] flex '><CardCarousel isHome={'/categories/'} data={data.data[c.cid].data} cardClass={'lg:h-[300px]  flex-[0_0_calc(70%_-_15px)] '} imgClass={'h-[175px]  w-full'} /></div>
                                            {/* <div className='photo'><MultiCarousel isHome={'/categories/'} check={true} cardHeight={'h-[310px]'} data={data.data[c.cid].data} height={"h-[175px]"} width={'w-full'} perView={2} noPlay={true} none={true} type={'card'} /></div> */}
                                        </>}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && data.data[c.cid].data.length > 0 && c.component_title == "IMAGES Group Events") && <>
                                            <Title data={{ title: c.component_title }} route={'/events'} seeMore={true} />
                                            {isMobile ? <div className='eventSlide'><ListSlider route={'/events/'} isEvent={true} noDots={true} auto={false} data={data.data[c.cid].data} /></div> : <div className='flex gap-5 lg:pb-[30px]'>
                                                <div className={`flex-[0_0_calc(30%_-_10px)]`}><ImageGroupEvents isHome={'/events/'} data={data.data[c.cid].data.slice(0, 1)} height={"h-[85%]"} width={"w-[80%]"} /></div>
                                                <div className={`flex flex-wrap gap-[20px]`}><EventList isRoute={'/events/'} check={false} data={data.data[c.cid].data.slice(1, 7)} height={"h-[160px] rounded-[0px]"} width={"w-full"} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} isHome={true} /></div>
                                            </div>}
                                        </>}
                                        {/* {(resp.component_title == "Card" && resp.component_type == "card3" && resp.data) && <>
                                            <Title data={resp.data} />
                                            <div className={`flex flex-wrap gap-5 justify-between`}><Cards data={resp.data.data} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[330px]"} width={"w-full"} flex={'flex-[0_0_calc(20%_-_20px)] md:flex-[0_0_calc(50%_-_10px)]'} isBorder={true} /></div>
                                        </>} */}
                                        {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Reconnect") && <>
                                            <Title data={{ title: c.component_title }} route={'/categories/reconnect'} seeMore={true} />
                                            <div className={`lg:flex lg:gap-5 lg:justify-between no_scroll`}><Cards check={true} isHome={'/categories/'} flex={'flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(85%_-_10px)]'} cardClass={'h-[310px] md:h-[290px]'} data={isMobile ? data.data[c.cid].data : data.data[c.cid].data.slice(0, 3)} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px] md:h-[160px]"} width={"w-full"} isBorder={true} /></div>
                                        </>}
                                        {(c.cid && c.component_title == "Image" && !isMobile) && <div className='pt-[30px]'><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={"h-[300px]"} width={'w-full'} data={{ ad_image: '/ads_bike.png' }} /></div>}


                                    </div>
                                )
                            })}
                            {/* {(res.u_id) &&  data[u_id]} */}
                        </div>
                    )
                })}
            </div>
            {/* ) */}
            {/* })} */}
        </>
    )
}
