import RootLayout from '@/layouts/RootLayout';
import Values from '@/components/Aboutus/values';
import Publications from '@/components/Aboutus/publications';
import Exhibitions from '@/components/Aboutus/exhibitions';
import Events from '@/components/Aboutus/events';
import About from '@/components/Aboutus/about';
import Books from '@/components/Aboutus/books';
import SEO from '@/components/common/SEO';
import { HomePage } from '@/libs/api';
import { useEditable } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

export default function Aboutus({data}) {
    console.log(data, "data about us")

    const [home,setHome] = useState();

    useEffect(() => {
      if(typeof window !== 'undefined') {
        if (data && data.page_content) {
          setTimeout(()=>{

            setHome(data.page_content);
          },100) 
        }}
    }, [data]);
    return (
      <RootLayout adIdH={'about-head'} adIdF={'about-foot'}>
         <SEO title={'India Retailing About'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        {/* <About></About> */}
        {/* <div className='container md:p-[15px]'>
            <Values></Values>
        </div> */}
        {/* <div className='container md:p-[15px]'>
            <Publications></Publications>
        </div> */}
        {/* <div className='container md:p-[15px]'>
            <Books></Books>
        </div> */}
        {/* <div className='container md:p-[15px]'>
            <Events></Events>
        </div> */}
        {/* <div className='container md:p-[15px]'>
            <Exhibitions></Exhibitions>
        </div> */}

        {(home && home.length != 0) ? home.map((data, i) => {
                  return (
                    <div key={i}  >
                      {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                        return (
                          <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class} ${(data.section != 'PS-24-00630') ? 'md:my-[10px]' : 'container'}  ${((data.section == 'PS-23-00130') && !isMobile) ? 'container' : ''} ${data.section == 'PS-23-00166' ? 'container md:!mb-0' : ''} ${data.section == 'PS-24-00623' && !isMobile ? 'container' : ''}`}>
                            {(res.components && res.components.length != 0) && res.components.map((c, c_index) => {
                              return (<>
                              {(c.cid && data.data[c.cid]  && c.component_title == "About us section") && <About item={data.data[c.cid]} />}
                              {(c.cid && data.data[c.cid]  && c.component_title == "Values") && <div className='container md:p-[15px]'> <Values data={data.data[c.cid]} /></div>}
                              {(c.cid && data.data[c.cid]  && c.component_title == "Images Publications") && <div className='container md:p-[15px]'> <Publications data={data.data[c.cid]} /></div>}
                              {(c.cid && data.data[c.cid]  && c.component_title == "Books") && <div className='container md:p-[15px]'> <Books data={data.data[c.cid]} /></div>}
                              {(c.cid && data.data[c.cid]  && c.component_title == "Images Events & Exhibitions") && <div className='container md:p-[15px]'> <Events data={data.data[c.cid]} /></div>}
                              {(c.cid && data.data[c.cid]  && c.component_title == "Images Awards") && <div className='container md:p-[15px]'> <Exhibitions data={data.data[c.cid]} /></div>}
                              
                              
                              </>)})}</div>
                        ) 
                      }
                      )}
                    </div>
                  )
                }) : <div className='container md:p-[15px]'>No Data Found</div>}
                                
      </RootLayout>
    )
  }

  export async function getStaticProps() {
    // page_content
    const param = {
      // "application_type": "mobile",
      "route": "about-us",
      page_no: 1,
      page_size: 20
    }
    const resp = await HomePage(param);
    const data = await resp.message;
  
    // const res = await HomePageAds();
    // let ads = res.message
  
    return {
      props: { data }, revalidate: 10
    }
  
  }

  // {
        //     "title":"Our Mission",
        //     "subtitle1":"",
        //     "subtitle2":"",
        //     "content":"Profitably connecting our Consumers & Customers to businesses, people, knowledge and ideas associated with modern retail.",
        //     "image":"/about/mission.svg"
        // }
// {
//             "title":"Phygital",
//             "image":"/about/phygital.jpg",
//             "href": "https://shop.indiaretailing.com/product/images-business-of-fashion-july-2025/"
//         }

// {
//             "title":"Images Business of Fashion Report",
//             "image":"/about/book1.svg"
//         },
//         {
//             "title":"India D2C Yearbook",
//             "image":"/about/book1.svg"
//         },
//         {
//             "title":"Evolve",
//             "image":"/about/book1.svg"
//         },
//         {
//             "title":"Shopping Centre Next",
//             "image":"/about/book1.svg"
//         },
        
//         {
//             "title":"India Retail Report",
//             "image":"/about/book1.svg"
//         },
//         {
//             "title":"India Phygital Index",
//             "image":"/about/book1.svg"
//         },
//         {
//             "title":"Retail Icons of India",
//             "image":"/about/book1.svg"
//         }
// ,
//         {
//             "title":"Shopping Centre Next",
//             "image":"/about/shopping.png"
//         },
//         {
//             "title":"Phygital Retail Convention",
//             "image":"/about/Retail.png"
//         },
//         {
//             "title":"India D2C Summit & Awards",
//             "image":"/about/summit.png"
//         },
//         {
//             "title":"Internet Commerce Summit",
//             "image":"/about/Commerce.png"
//         }

//  {
//             "title":"India E-commerce Awards",
//             "image":"/about/awards5.jpg"
//         },
//         {
//             "title":"India D2C Awards",
//             "image":"/about/awards6.jpg"
//         }