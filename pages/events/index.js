import RootLayout from '@/layouts/RootLayout'
import { useEffect, useRef, useState } from 'react'
import Title from '@/components/common/Title'
import Sliders from '@/components/Sliders/index'
import EventCards from '@/components/Events/EventCards'
import { getCategoryList, sliders, checkMobile, getAdvertisements } from '@/libs/api'
import SEO from '@/components/common/SEO'
import dynamic from 'next/dynamic'
const Advertisement = dynamic(()=> import('@/components/Baners/Advertisement'))
// import Advertisement from '@/components/Baners/Advertisement'

export default function Events({ data, slider_data, ads_data }) {
    // console.log(ads_data,"ads_data")
    // console.log(data,"data")
    const [pageData, setPageData] = useState([])
    const [isMobile, setIsMobile] = useState();

    let page_no = 1;
    let cardref = useRef(null);
    let no_product = false;
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        checkIsMobile();
        // slider_data.map((res)=> {
        //     !isMobile && res.web_image ? res.image = res.web_image : res.image = ''
        //     isMobile && res.mobile_image ? res.image = res.mobile_image : res.image = ''
        // })
        if (data) {
            setTimeout(() => {
                setPageData(data)
            }, 200);
        }

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0){
                
                return
            };
            if (!no_product) {
                page_no > 1 ? getEvents() : null
                page_no = page_no + 1
            }else{
                let more = document.getElementsByClassName("more")[0]
                more.style.display = "none"
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }
    }, []);

    const getEvents = async () => {
        setLoading(true)
        let params = {
            "doctype": "Community Event", "filter_name": "category", "parent_fields": ["name", "title", "thumbnail_path", "start_date", "description", "category", "route"], "category_doctype": "Event Category", "category_fields": ["name", "category_name", "route"], "page_no": page_no, "records": 4, "category_count": 4
        }
        const resp = await getCategoryList(params);
        if (resp.message && resp.message.length != 0) {
            setTimeout(() => {
                setPageData(d => d = [...d, ...resp.message])
                setLoading(false)
            }, 400);
        } else {
            no_product = true;
            setLoading(false)
        }
    }

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
        slider_data && slider_data.map((res) => {
            !isMobile ? res.web_image ? res.image = res.web_image : res.image = '' : ''
            isMobile ? res.mobile_image ? res.image = res.mobile_image : res.image = '' : ''
        })
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }  

    return (
        <>
            <RootLayout ad_payload={{ page: 'Events', page_type: 'Landing' }} homeAd={ads_data ? ads_data : null} isLanding={true} head={'Events'} adIdH={'events-head'} adIdF={'events-foot'}>
                <SEO title={'India Retailing Events - Retail Industry Conference & Awards'} siteName={'India Retailing'} description={'Explore Upcoming Retail Events, Conferences & Awards on India Retailing. Join Industry Leaders & Professionals for Insights, Networking & Business Growth.'} keywords={`Retail Event Update , Industry Event Update , Explore Retail Event , Explore Retail Industry , Retail Industry Growth , Retail Networking`} />
                {/* !mt-6 */}
                <div className="container zero-gap ">
                    {slider_data && slider_data.length != 0 && <Sliders common_slide={true} imgClass={'h-[400px] md:h-[220px] w-full rounded-[5px]'} event={true} data={slider_data} perView={1} className='gap-0' />}
                </div>
                <div className='gap-[20px] container justify-between flex-wrap pt-[30px] md:p-[15px] lg:flex lg:mb-[30px]'>
                    {(pageData && pageData.length != 0) ? pageData.map((resp, index) => {
                        return (
                            <div key={index} className={`flex flex-col md:flex-[0_0_calc(100%_-_0px)] flex-[0_0_calc(100%_-_15px)] ${index != 0 ? 'md:pt-[15px]' : ''}`}>
                                {resp.events && resp.events.length != 0 && <div><Title data={resp} seeMore={true} /></div>}
                                {/* flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]'} */}
                                <div className={`lg:grid lg:grid-cols-4 eventCards md:flex  md:gap-[15px] md:overflow-auto justify-between lg:gap-[20px]`}><EventCards data={resp.events.slice(0, 4)} flex={'md:flex-[0_0_calc(70%_-_10px)]'} height={'h-[210px] md:h-[150px]'} width={'w-full'} /></div>
                                {(ads_data && resp.name == "Conferences & Summits" ) &&
                                    <div className='py-[20px] lg:mt-4'>
                                        <Advertisement ad_payload={{ page: 'Events', page_type: 'Landing' }} data={ads_data.web_special ? ads_data.web_special : null} adId={'top_first'} divClass={'h-[90px] lg:w-[728px] md:w-full m-auto'} insStyle={isMobile ? "display:inline-block;width:360px;height:90px;" : "display:inline-block;width:728px;height:90px;"} position={"high"} adPos={'middle'} />
                                    </div>}
                            </div>
                        )
                    }) : <Skeleton />}

                    <div className='more h-[30px]' ref={cardref}></div>
                    {loading && <div id="wave">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>}
                    {!pageData?.length && <Skeleton type='' />}
                </div>

            </RootLayout>

        </>

    )
}

const Skeleton = () => {
    return (
        <>
            {[0, 1, 2, 3].map((res, index) => {
                return (
                    <div key={index} className='mb-5'>
                        <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
                        <div className='grid grid-cols-4 gap-[15px]'>
                            {[0, 1, 2, 3].map(i => {
                                return (
                                    <div key={i} className='border rounded-[10px] lg:h-[380px] md:h-[300px]'>
                                        <div className='bg-[#E5E4E2] h-[210px] w-full rounded-[5px_5px_0_0]'></div>
                                        <div className='p-[10px]'>
                                            <p className={`bg-[#E5E4E2] h-[10px] w-full my-[10px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[10px] w-full mb-[20px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-full my-[10px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-full mb-[10px] rounded-[5px]`}></p>
                                            <p className='flex my-[15px] gap-[10px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-[150px] mt-[10px] rounded-[5px]`}></p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </>
    )
}

export async function getStaticProps() {
    let params = {
        "doctype": "Community Event", "filter_name": "category", "parent_fields": ["name", "title", "thumbnail_path", "event_date", "description", "category", "route"], "category_doctype": "Event Category", "category_fields": ["name", "category_name", "route"], "page_no": 1, "records": 4, "category_count": 4
    }
    const resp = await getCategoryList(params);

    let slider_params = {
        page: 'Community Event',
        fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image','redirect_url']
    }
    const res = await sliders(slider_params)
    const data = resp.message;
    const slider_data = res.message

    let ads_params = { page: 'Events', page_type: 'Landing' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data, slider_data, ads_data }, revalidate: 50,
    }
}

// export async function getServerSideProps() {
//     let params = {
//         "doctype": "Community Event", "filter_name": "category", "parent_fields": ["name", "title","thumbnail_path","start_date","description","category","route"], "category_doctype": "Event Category", "category_fields": ["name", "category_name","route"], "page_no": 1, "records": 4, "category_count": 4
//     }
//     const resp = await getCategoryList(params);
//     const data = resp.message;
//     return {
//         props: { data }
//     }
// }