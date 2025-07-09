import { useState, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import Sliders from '@/components/Sliders/index'
import { podcastLanding, getAdvertisements, sliders, checkMobile } from '@/libs/api'
import SEO from '@/components/common/SEO'
import dynamic from 'next/dynamic'
const Advertisement = dynamic(()=> import('@/components/Baners/Advertisement'))
const HomePodcast = dynamic(()=> import('@/components/Podcast/HomePodcast'))
export default function Podcast({ data, ads_data, slider_data }) {
    // console.log(data,"data")
    const [isMobile, setIsMobile] = useState();
    const [values, setValues] = useState([])

    useEffect(() => {
        if (data && data.length != 0) {
            setTimeout(() => {
                setValues(data)
            }, 200)
        }
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
        slider_data && slider_data.map((res) => {
            !isMobile ? res.web_image ? res.image = res.web_image : res.image = '' : ''
            isMobile ? res.mobile_image ? res.image = res.mobile_image : res.image = '' : ''
        })
    }

    return (
        <>
            <RootLayout ad_payload={{ page: 'Podcasts', page_type: 'Landing' }} homeAd={ads_data ? ads_data : null} isLanding={true} head="" adIdH={'podcast-head'} adIdF={'podcast-foot'}>
                <SEO title={`Retail Trends Podcast : Insights for India's Market`} siteName={'India Retailing'} description={`Explore retail trends, strategies, and insights in India's dynamic market with expert interviews and analysis. Tune in for actionable takeaways.`} keywords={`Retail trends Podcast, India market Podcast , retail insights Podcast, retail podcast, market strategies Podcast, Indian retail Podcast, expert interviews, retail analysis, business growth Podcas`} />
                <div className="container zero-gap ">
                    {slider_data && slider_data.length != 0 && <Sliders common_slide={true} imgClass={'h-[400px] md:h-[220px] w-full'} event={true} data={slider_data} perView={1} className='gap-0' />}
                </div>
                {(values && values.length != 0) ? values.map((res, index) => {
                    return (
                        <>
                            <HomePodcast key={index} isLanding={true} i={index} data={res} />
                            {(ads_data && res.category_name == "Women At Work") &&
                                <div className='py-[20px]'>
                                    <Advertisement ad_payload={{ page: 'Podcasts', page_type: 'Landing' }} data={ads_data.women_at_work ? ads_data.women_at_work : null} adId={'podcast_top_first'} divClass={'h-[90px] lg:w-[728px] md:w-full m-auto'} insStyle={isMobile ? "display:inline-block;width:360px;height:90px;" : "display:inline-block;width:728px;height:90px;"} position={"high"} adPos={'middle'} />
                                </div>}
                        </>
                    )
                }) : <Skeleton />}
            </RootLayout>
        </>
    )
}

const Skeleton = () => {
    return (
        <div className='container lg:p-[30px_0px] md:p-[15px]'>
            {[0, 1, 2, 3].map(index => {
                return (
                    <div key={index}>
                        <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
                        <div className='flex items-center gap-[15px]'>
                            {[0, 1, 2, 3, 4].map(i => {
                                return (
                                    <div key={i} className=' h-[280px] flex-[0_0_calc(20%_-_10px)]'>
                                        <div className='bg-[#E5E4E2] h-[200px] w-full rounded-[5px]'></div>
                                        <div className='p-[10px]'>
                                            <p className={`bg-[#E5E4E2] h-[8px] w-full my-[10px] rounded-[5px]`}></p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </div>
    )
}

export async function getStaticProps() {
    let param = {
        fields: ['name', 'title', 'sound', 'image', 'category', 'description', 'route']
    }
    let value = await podcastLanding(param);
    let data = value.message;

    let slider_params = {
        page: 'Podcast',
        fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image','redirect_url']
    }
    const res = await sliders(slider_params)
    const slider_data = res.message

    let ads_params = { page: 'Podcasts', page_type: 'Landing' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { data, ads_data, slider_data }, revalidate: 10,
    }
}