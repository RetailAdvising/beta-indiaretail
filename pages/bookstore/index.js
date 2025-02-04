import RootLayout from '@/layouts/RootLayout'
import { useState, useEffect } from 'react'
import Sliders from '@/components/Sliders/index'
import Title from '@/components/common/Title'
import Card from '@/components/Bookstore/Card'
import List from '@/components/Bookstore/List'
import { booksLanding, sliders, getAdvertisements } from '@/libs/api'
import { checkMobile } from '@/libs/api'
import SEO from '@/components/common/SEO'

export default function Bookstore({ data, slider_data }) {
  // export default function Bookstore({ data, ads_data, slider_data }) {

  let [isMobile, setIsmobile] = useState();
  const [ads_data, setAdsData] = useState()


  useEffect(() => {
    slider_data.map((res) => {
      res.web_image ? res.image = res.web_image : res.image = ''
    })
    get_ads()
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    isMobile = await checkMobile();
    setIsmobile(isMobile);
    // console.log('isMobile',isMobile)
  }

  const get_ads = async () => {
    let ads_params = { page: 'Books', page_type: 'Landing' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;
    if (ads_data) {
      setAdsData(ads_data)
    }
  }

  return (
    <>
      <RootLayout ad_payload={{ page: 'Books', page_type: 'Landing' }} homeAd={ads_data ? ads_data : null} adIdH={'book-head'} adIdF={'book-foot'} >
        <SEO title={'Bookstore'} siteName={'India Retailing'} description={'Bookstore'} />

        {(data && data.length != 0) && <>
          <div className="container zero-gap">
            {slider_data && slider_data.length != 0 && <Sliders common_slide={true} imgClass={'h-[400px] md:h-[200px] w-full'} event={true} data={slider_data} isMobile={isMobile} perView={1} className='gap-0' />}
          </div>
          
          <div className={`lg:bg-[#FBFBFD]`}>

            <div className='md:flex-wrap  md:p-[15px] py-8 container justify-between gap-[15px] flex'>
              <div className={`flex-[0_0_calc(100%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]`}>
                <Title data={data[0]} seeMore={true} />
                {/* [270px] w-[181px] */}
                <div className={`grid gap-[20px] grid-cols-5 md:grid-cols-2 `}><Card imgClass={'lg:h-[300px] md:h-[225px] mouse aspect-[2/2.5]'} category={data[0].route} check={true} isLanding={true} data={data[0].products.slice(0, 10)} boxShadow={true} /></div>
              </div>
              {/* <div className={`flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]`}><AdsBaner data={val.section_2.col_2} /></div> */}
            </div>
          
          </div>

          {(data[1] && data[2]) && <div className='lg:items-baseline container md:p-[10px_15px_10px_15px] pt-[2rem] pb-[6rem] md:flex-wrap md:flex-col flex justify-between gap-[15px]'>
            <div className={`flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]`}>
              <Title data={data[1]} seeMore={true} />
              {/* <div className={`flex lg:gap-[15px] h-full rounded-[5px] flex-wrap border p-[15px]`}><List line_clamp={'3'} category={data[1].category_name} check={true} isLanding={true} boxShadow={true} imgWidth={'flex-[0_0_calc(40%_-_10px)]'} imgWidth1={'md:w-[60%]'} height={isMobile ? 'h-[150px]' : 'h-[210px]'} width={'w-full'} data={data[1].products.slice(0, 4)} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] lg:h-[220px] md:h-[160px] object-contain'} /></div> */}
              <div className='lg:flex lg:flex-[0_0_calc(70%_-_10px)] gap-[10px] lg:rounded-[5px] lg:border lg:border-slate-200 lg:p-[15px]'>
                <div className={`flex-[0_0_calc(50%_-_5px)] md:flex-[0_0_calc(100%_-_0px)] flex gap-[10px]  h-full lg:rounded-[5px] flex-wrap  flex-col`}><List line_clamp={'3'} isStart={"justify-start"} category={data[1].route} border_b={'md:border-b-[1px] md:p-[0px_0_10px_0] md:border-slate-200 md:last:border-b-[0]'} check={true} boxShadow={true} isLanding={true} imgWidth={'flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(35%_-_10px)]'} height={'h-[150px]'} width={'w-full'} data={data[1].products.slice(0, 3)} /></div>
                <div className={`flex-[0_0_calc(50%_-_5px)] md:flex-[0_0_calc(100%_-_0px)] flex gap-[10px]  h-full lg:rounded-[5px] flex-wrap  flex-col`}><List line_clamp={'3'} isStart={"justify-start"} category={data[1].route} border_b={'md:border-b-[1px] md:p-[0px_0_10px_0] md:border-slate-200 md:last:border-b-[0]'} check={true} boxShadow={true} isLanding={true} imgWidth={'flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(35%_-_10px)]'} height={'h-[150px]'} width={'w-full'} data={data[1].products.slice(4, 6)} /></div>
              </div>
            </div>

            <div className={`flex-[0_0_calc(30%_-_10px)] md:pt-[10px] md:flex-[0_0_calc(100%_-_10px)]`}>
              <Title data={data[2]} seeMore={true} />
              <div className={`h-full lg:rounded-[5px] lg:border lg:border-slate-200 lg:p-[15px]`}><List line_clamp={'3'} isStart={"justify-start"} category={data[2].route} border_b={'md:border-b-[1px] md:p-[10px_0] md:first:pt-[0] md:border-slate-200 md:last:border-b-[0] lg:pb-[10px] lg:last:pb-[0px]'} check={true} boxShadow={true} isLanding={true} imgWidth={'flex-[0_0_calc(35%_-_10px)]'} height={'h-[150px]'} width={'w-full'} data={data[2].products.slice(0, 3)} /></div>

              {/* <div className={`flex gap-[10px]  h-full lg:rounded-[5px] flex-wrap  flex-col lg:border lg:border-slate-200 lg:p-[15px]`}><List  line_clamp={'3'} category={data[2].category_name} border_b={'md:border-b-[1px] md:p-[0px_0_10px_0] md:border-slate-200 md:last:border-b-[0]'} check={true} boxShadow={true} isLanding={true} imgWidth={'flex-[0_0_calc(35%_-_10px)]'} height={'h-[150px]'} width={'w-full'} data={data[2].products.slice(0, 3)} /></div> */}
            </div>
          </div>}

          {data[3] && <div className='' style={{ background: '#fbfbfd' }}>
            <div className={`flex-[0_0_calc(100%_-_10px)] m-[40px_auto]  md:m-[0px_auto] container md:p-[15px] lg:py-8`}>
              <Title data={data[3]} seeMore={true} />
              <div className={`flex gap-[15px] flex-wrap `}><Card category={data[3].route} object_fit={'object-contain'} padding={'p-[5px]'} isBorder={true} check={true} isLanding={true} height={isMobile ? 'h-[160px]' : 'h-[280px]'} flex={'flex-[0_0_calc(20%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} data={data[3].products} /></div>
            </div>
          </div>}

        </>}
      </RootLayout>
    </>
  )
}


// export async function getServerSideProps() {
export async function getStaticProps() {
  const resp = await booksLanding();
  const data = resp?.message;

  let slider_params = {
    page: 'Product',
    fields: ['name', 'title', 'web_image', 'mobile_image', 'mobile_app_image','redirect_url']
  }

  const res = await sliders(slider_params)
  const slider_data = res.message

  return {
    props: { data, slider_data }, revalidate: 50,
    // props: { data, ads_data, slider_data }, revalidate: 50,
  }

}

// export async function getServerSideProps() {
//   const resp = await booksLanding();
//   const data = resp.message;

//   return {
//     props: { data }
//   }

// }