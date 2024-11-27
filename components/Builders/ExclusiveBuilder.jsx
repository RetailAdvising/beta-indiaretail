import { useState, useEffect } from 'react'
import List from '../common/List'
import { checkMobile } from '@/libs/api'
import Advertisement from '../Baners/Advertisement'
import Title from '../common/Title'
import { useRouter } from 'next/router'
import CustomSlider from '../Sliders/CustomSlider'
import Video from '../Video/Video'
import ImageLoader from '../ImageLoader';

export default function ExclusiveBuilder({ data, ads }) {
    const router = useRouter();
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
            <div className={`lg:flex lg:flex-wrap lg:gap-[15px] ${isMobile ? 'p-[15px] ' : 'container'}`}>
                {/* lg:h-[685px] */}
                {(data.message && data.message.length != 0) && <div className={`lg:h-[640px] ${isMobile ? '' : 'border p-5 md:p-[10px]'} rounded-[5px]  flex-[0_0_calc(42%_-_10px)] md:basis-full`}>
                    {data.message.slice(0, 1).map((res, index) => {
                        
                        return (
                            // ${router.asPath.split('/')[1]}/
                            <div key={index} onClick={() => router.push(`/${res.route}`)} className={`md:mb-[10px] mb-5 pb-5 cursor-pointer md:pb-[10px] ${(index == 0 && !isMobile) ? 'border_bottom' : ''}`}>
                                <h6 className={`${index == 0 ? 'lg:text-[18px] md:text-[17px] ' : ''} font-[700] nunito`}>{res.title}</h6>
                                <ImageLoader style={`${index == 0 ? 'h-[335px] md:h-[320px] w-full mt-[10px] rounded-[5px]' : ''}`} src={res.thumbnail_image ? res.thumbnail_image : res.image} title={res.title ? res.title : 's'} />
                                {/* <Image className={`${index == 0 ? 'h-[335px] md:h-[320px] w-full mt-[10px] rounded-[5px]' : ''}`} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.image)} height={250} width={300} alt={res.title} /> */}
                                {res.primary_text && <p className={`flex items-center ${index == 0 ? 'pt-[10px]' : ''}`}><span className={`primary_text pr-[10px] nunito`}>{res.primary_text}</span><span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span><span className={`secondary_text pl-[10px] nunito`}>{res.secondary_text}</span></p>}
                                <p className={`sub_title line-clamp-2 ${index == 0 ? 'pt-[10px]' : ''}`}>{res.blog_intro}</p>
                            </div>
                        )
                    })}
                    {!isMobile && <List check={true} line={'line-clamp-1'} imgWidth={'w-full'} isBB={false} imgHeight={'h-[90px]'} data={data.message.slice(1, 2)} borderRadius={'rounded-[10px]'} isReverse={true} />}
                </div>}


                <div className={`overflow-auto customScroll rounded-[5px] flex-[0_0_calc(33%_-_10px)] md:basis-full border p-5 md:p-[10px] lg:h-[640px]`}>
                    <List hash_bg={'pt-[10px]'} primary_pb={'lg:pb-[5px]'} isMp={true} titleClamp={'line-clamp-2 md:line-clamp-2'} line={'line-clamp-1 md:hidden'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} check={true} imgWidth={'w-[130px] md:w-full'} imgHeight={'h-[105px] md:h-full'} data={(isMobile ? data.message.slice(2, 5) : data.message.slice(2, data.message.length - 1))} borderRadius={'rounded-[5px]'} isReverse={true} />
                </div>

                {(data.sec1 && data.sec1.data && data.sec1.data.length != 0) &&
                    isMobile ? <div className='beautySlide pt-[20px]'><Title noPadding={true} data={data.sec1} seeMore={true} />
                    {/* <ListSlider data={data.sec1.data.slice(0, 5)} auto={false} /> */}
                    <CustomSlider cardClass={'flex-[0_0_85%]'}
                        slider_id={"slider" + 10} slider_child_id={"slider_child" + 10} data={data.sec1.data.slice(0, 5)} type='beautySlide' />
                </div>
                    :
                    <div className='w-full lg:h-[640px] md:pt-[20px] lg:pb-5 flex-[0_0_calc(25%_-_10px)] md:basis-full'>
                        <Title data={data.sec1} seeMore={true} />
                        <div className={`border lg:h-[595px] p-[10px] rounded-[5px]`}><List isMp={true} titleClamp={'md:line-clamp-2 line-clamp-3'} check={true} tittleOnly={true} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} isBB={true} imgWidth={'w-[130px] md:w-full'} imgHeight={'h-[85px] md:h-[110px]'} data={data.sec1.data.slice(0, 4)} borderRadius={'rounded-[5px]'} isTop={true} /></div>
                    </div>
                }
            </div>

            {/* Section - 2 p-[20px_30px_0_0] w-[30%]*/}
            {data.leaders_ink && data.leaders_ink.data && data.leaders_ink.data.lengrh != 0 && <div className={`flex lg:pt-[20px] md:p-[0_15px]  pb-[35px] container flex-wrap items-end justify-between w-full gap-[15px]`}>
                <div className='w-[calc(75%_-_10px)] md:basis-full md:pt-[10px]'>
                    <Title data={{ title: data.leaders_ink.title }} route={'/IRPrime/leaders-ink'} seeMore={true} />
                    <div className='primeSlide'>
                        {/* <MultiCarousel cardHeight={'h-[280px]'} type={'profile'} noPlay={true} height={'h-[150px]'} perView={4} width={'w-full'} data={val.section_2.col_1.data} /> */}
                        <CustomSlider cardClass={'lg:h-[305px] flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(70%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'}
                            slider_id={"slider_id" + 0} slider_child_id={"slider_child_id" + 0} data={data.leaders_ink.data} title_class={'line-clamp-1'} subtitle_class={'line-clamp-1'} />
                    </div>
                </div>

                {/* {(ads.right_first && Object.keys(ads.right_first).length != 0  && !isMobile) && <div className='w-[calc(25%_-_10px)] md:basis-full'><Advertisement divClass={'h-[250px] w-[300px] m-auto'}   data={ads.right_first} /></div>} */}
                {(!isMobile) && <div className='w-[calc(25%_-_10px)] md:basis-full'><Advertisement ad_payload={{ page: 'IR Prime', page_type: 'Landing' }} divClass={'h-[250px] w-[300px] m-auto'} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} adId={'right_first'} data={(ads.right_first && Object.keys(ads.right_first).length != 0) && ads.right_first} /></div>}
            </div>}

            {/* Section - 3 p-[20px_30px]*/}

            {(data.videos && data.videos.ir_video && data.videos.ir_video.length != 0) &&
                <div className='bg-[#F8F8F8] md:mt-[20px]'>
                    <div className='lg:py-8 md:p-[15px] container'>
                        <Title data={data.videos} isVid={true} route={'/video/ir-studio'} seeMore={true} />
                        {/* <div className='flex  gap-[15px] justify-between'><YTVideo data={res.ir_video} flex={"flex-[0_0_calc(25%_-_10px)]"} /></div> */}
                        <div className='lg:grid lg:grid-cols-4 irVideos lg:gap-[15px] lg:justify-between'>
                            <Video isHome={'/video/'} data={data.videos.ir_video} flex={'md:flex-[0_0_calc(70%_-_10px)] md:h-[235px]'} imgClass={'h-[180px] w-full'} />
                            {/* {data.videos.ir_video.map((res, index) => {
                                return (
                                    <div key={index} onClick={() => router.push(`/video/${res.route}`)} className='ir_div cursor-pointer'>
                                        <div className='relative'>
                                            <Image src={check_Image(res.video_image)} className='h-[175px] w-full' height={100} width={100} alt={res.title} />
                                            <Image src={'/irprime/youtube.svg'} className='absolute bottom-[10px] left-[10px] object-contain h-[20px] w-[30px]' height={100} width={100} alt={res.title} />
                                        </div>
                                        <p className='pt-[10px]'>{res.title}</p>
                                    </div>
                                )
                            })} */}

                        </div>
                    </div>
                </div>}

            {/* Section - 4 */}
            {(data.sec2 && data.sec2.data && data.sec2.data.length != 0) && <div className={`lg:py-8 md:p-[30px_15px]  container flex-wrap justify-between flex  gap-[20px]`}>
                <div className={`flex-[0_0_calc(75%_-_10px)] md:basis-full`}>
                    <Title data={data.sec2} seeMore={true} />
                    <List fullWidth={true} check={true} isBB={true} titleClamp={'line-clamp-2'} contentWidth={'gap-[5px] w-[520px] md:w-[auto]'} flex={'gap-[25px] items-center mb-[20px] pb-[20px]'}
                        imgFlex={'flex-[0_0_calc(28%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[160px] md:h-[130px]'} data={data.sec2.data.slice(0, 3)} borderRadius={'rounded-[5px]'} />
                </div>
                {/* {(ads.right_second && Object.keys(ads.right_second).length != 0 && !isMobile) && <div className='w-[calc(25%_-_10px)] md:basis-full'><Advertisement divClass={'h-[600px] w-[300px] m-auto'}  data={ads.right_second} /></div>} */}
                {(!isMobile) && <div className='w-[calc(25%_-_10px)] md:basis-full'><Advertisement ad_payload={{ page: 'IR Prime', page_type: 'Landing' }} divClass={'h-[600px] w-[300px] m-auto'} insStyle={"display:inline-block;width:300px;height:600px;"} position={"small"} adId={'right_second'} data={(ads.right_second && Object.keys(ads.right_second).length != 0 ) && ads.right_second} /></div>}

            </div>}
            {/* </div> */}
        </>
    )
}
