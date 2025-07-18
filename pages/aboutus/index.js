import RootLayout from '@/layouts/RootLayout';
import Values from '@/components/Aboutus/values';
import Publications from '@/components/Aboutus/publications';
import Exhibitions from '@/components/Aboutus/exhibitions';
import Events from '@/components/Aboutus/events';
import About from '@/components/Aboutus/about';
import Books from '@/components/Aboutus/books';
import SEO from '@/components/common/SEO';
import { HomePage } from '@/libs/api';

export default function Aboutus({data}) {
    console.log(data, "data about us")
    return (
      <RootLayout adIdH={'about-head'} adIdF={'about-foot'}>
         <SEO title={'India Retailing About'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        <About></About>
        <div className='container md:p-[15px]'>
            <Values></Values>
        </div>
        <div className='container md:p-[15px]'>
            <Publications></Publications>
        </div>
        <div className='container md:p-[15px]'>
            <Books></Books>
        </div>
        <div className='container md:p-[15px]'>
            <Events></Events>
        </div>
        <div className='container md:p-[15px]'>
            <Exhibitions></Exhibitions>
        </div>
      </RootLayout>
    )
  }

  export async function getStaticProps() {
    // page_content
    const param = {
      // "application_type": "mobile",
      "route": "about-us",
      page_no: 1,
      page_size: 4
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