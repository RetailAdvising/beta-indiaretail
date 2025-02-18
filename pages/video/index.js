// import React, { useState, useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import { video_list_with_categoies, getAdvertisements, checkMobile, sliders } from '@/libs/api'
import Video from '@/components/Video/Video'
import Title from '@/components/common/Title'
import SEO from '@/components/common/SEO'
import Sliders from '@/components/Sliders/index'
// import Advertisement from '@/components/Baners/Advertisement'
import dynamic from 'next/dynamic'
const Advertisement = dynamic(()=> import('@/components/Baners/Advertisement'))
export default function Videos({ data, ads, slider_data }) {
  
  const [isMobile, setIsMobile] = useState();
  const [values, setValues] = useState([])

  useEffect(() => {
    if (data && data.length != 0) {
      setTimeout(() => {
        setValues(data)
      }, 200);
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
      <RootLayout ad_payload={{ page: 'Videos', page_type: 'Landing' }} homeAd={ads ? ads : null} isLanding={true} head={'IR Prime Videos'} adIdH={'video-head'} adIdF={'video-foot'} >
        <SEO title={'India Retailing Videos - Retail Industry Insights & Trends'} siteName={'India Retailing'} description={'Watch India Retailing videos featuring retail industry insights, expert interviews & trend analysis. Stay updated on the latest retail developments.'} keywords={`Retail Industry Video , Retail News Video , Latest Industry Video , Latest Retail Video, Retail Update Video, Business Growth Video, expert interviews`}/>
        <div className="container zero-gap ">
          {slider_data && slider_data.length != 0 && <Sliders common_slide={true} imgClass={'h-[400px] md:h-[220px] w-full'} event={true} data={slider_data} perView={1} className='gap-0' />}
        </div>
        {(values && values.length != 0) ? <div className='container lg:p-[30px_0px] md:p-[15px]'>
          {values.map((res, index) => {
            return (
              <div key={index} >
                {res.videos && res.videos.length != 0 && <div className='pb-[20px]'>
                  <Title data={res} seeMore={true} />
                  <div className={`lg:grid grid-cols-4 no_scroll lg:gap-5`}><Video data={res.videos.slice(0, 4)} flex={'md:flex-[0_0_calc(70%_-_10px)] md:h-[235px]'} imgClass={'h-[180px] w-full'} /></div>
                  {(ads && res.category_name == "IR Studio") &&
                    <div className='py-[20px]'>
                      <Advertisement ad_payload={{ page: 'Videos', page_type: 'Landing' }} data={ads.the_store ? ads.the_store : null} adId={'vid_top_first'} divClass={'h-[90px] lg:w-[728px] md:w-full m-auto'} insStyle={isMobile ? "display:inline-block;width:360px;height:90px;" : "display:inline-block;width:728px;height:90px;"} position={"high"} adPos={'middle'} />
                    </div>}
                </div>}
              </div>
            )
          })}


        </div> : <Skeleton />}
        {/* <Tabs /> */}
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
              {[0, 1, 2, 3].map(i => {
                return (
                  <div key={i} className=' h-[280px] flex-[0_0_calc(25%_-_10px)]'>
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
  let params = {
    fields: ["name", "route", "title", "video_image"]
  }
  const res = await video_list_with_categoies(params);
  let data = await res.message;
  if (res.status != 'Success') {
    data = [];
  }

  let slider_params = {
    page: 'Video',
    fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image','redirect_url']
  }
  const ress = await sliders(slider_params)
  const slider_data = ress.message

  let param = { page: 'Videos', page_type: 'Landing' }
  const resp = await getAdvertisements(param);
  const ads = resp.message;
  return {
    props: { data, slider_data, ads }, revalidate: 50,
  }
}