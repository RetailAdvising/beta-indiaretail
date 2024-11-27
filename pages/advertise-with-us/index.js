import RootLayout from '@/layouts/RootLayout';
import SEO from '@/components/common/SEO';
import { HomePage } from '@/libs/api';
import Enquiry from '@/components/Advertise/Enquiry';
import Foster from '@/components/Advertise/Foster';
import Partners from '@/components/Advertise/Partners';
import BrandsGrowth from '@/components/Advertise/BrandsGrowth';
import MultipleRoutes from '@/components/Advertise/MultipleRoutes';
import Contact from '@/components/Advertise/Contact';


export default function Advertise({ data }) {
  // console.log(data, "data")

  // useEffect(() => {
  //   get_ad()
  // }, [])
  // async function get_ad() {
  //   const param = {
  //     // "application_type": "mobile",
  //     "route": "advertise-with-us",
  //     page_no: 1,
  //     page_size: 7
  //   }
  //   const resp = await HomePage(param);
  //   const data = await resp.message;
  // }
  return (
    <>
      <RootLayout adIdH={'advertise-head'} adIdF={'advertise-foot'}>
        <SEO title={'India Retailing Advertise with Us.'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        {/* <div className={`footer`}>
        <div className='container gap-11 py-10 md:p-[15px] max-w-full'>
          <div className={`flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] flex flex-row gap-1.5 md:flex-col`}>
            <div className="basis-2/4">
              <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-left mb-2'>Advertise with us</h2>
              <p className='address font-normal'>Showcase your product / solution to digitally savvy decision makers from Retail, eCommerce, D2C, Fashion, Food, shopping centres and grow exponentially.</p>
              <p className='address font-normal'>We have various ways to promote your brand and to know how, please get in touch with Bhavesh Pitroda email : bhaveshpitroda@imagesgroup.in</p>
            </div>
            <div className="basis-2/4">
              <Image src="/advertise_with_us_02.svg" alt="About" width={500} height={500} className='m-auto' />
            </div>
          </div>
        </div>
      </div> */}


        {(data && data.page_content && data.page_content.length != 0) && data.page_content.map((data, i) => {
          return (
            <div key={i} className={`${i == 3 ? 'container' : ''} lg:flex gap-5`}>
              {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                return (
                  <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class} ${(data.section != 'PS-23-00094') ? 'md:mb-[20px]' : 'container'}  ${((data.section == 'PS-23-00130') && !isMobile) ? 'container' : ''} ${data.section == 'PS-23-00166' ? 'container' : ''}`}>
                    {(res.components && res.components.length != 0) && res.components.map((c, c_index) => {
                      return (
                        <div key={c.component_title} className={`${c.component_title == "Top 4 Stories" ? 'top3  lg:justify-center md:gap-5' : ''}`}>
                          {(c.cid && data.data[c.cid] && c.component_title == "Enquiry") && <Enquiry data={data.data[c.cid]} />}
                          {(c.cid && data.data[c.cid] && c.component_title == "Foster Your Brand's Growth 1") && <Foster data={data.data[c.cid]} />}
                          {(c.cid && data.data[c.cid] && c.component_title == "360° RETAIL INTELLIGENCE") && <>
                            <section class="fybg ">
                              <div class="fybgHeading container md:px-[10px]">
                                <h3>
                                  {data.data[c.cid].heading}
                                </h3>
                                <div class="customHR3"></div>
                                <div class="fybgVideo">
                                  <iframe src={data.data[c.cid].attach} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen=""></iframe>
                                </div>
                              </div>
                            </section>
                          </>}
                          {(c.cid && data.data[c.cid] && c.component_title == "Partner Brands & Companies") && <Partners data={data.data[c.cid]} />}
                          {(c.cid && data.data[c.cid] && c.component_title == "Foster Your Brand's Growth 2") && <BrandsGrowth data={data.data[c.cid]} />}
                          {(c.cid && data.data[c.cid] && c.component_title == "Multiple Routes to Optimize Brand Visibility") && <MultipleRoutes data={data.data[c.cid]} />}
                          {(c.cid && data.data[c.cid] && c.component_title == "Contact Us") && <Contact data={data.data[c.cid]} />}
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
          )
        })}



      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  // page_content
  const param = {
    // "application_type": "mobile",
    "route": "advertise-with-us",
    page_no: 1,
    page_size: 7
  }
  const resp = await HomePage(param);
  const data = await resp.message;

  // const res = await HomePageAds();
  // let ads = res.message

  return {
    props: { data }, revalidate: 10
  }

}


