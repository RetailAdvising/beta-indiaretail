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

  return (
    <>
      <RootLayout adIdH={'advertise-head'} adIdF={'advertise-foot'}>
        <SEO title={'India Retailing Advertise with Us.'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        
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

  return {
    props: { data }, revalidate: 50
  }

}


