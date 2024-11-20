import RootLayout from '@/layouts/RootLayout'
import { HomePage, newsLanding, checkMobile, getList, getPollsList, get_ip, HomePageAds, check_Image } from '../libs/api';
import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import SEO from '@/components/common/SEO'
import dynamic from 'next/dynamic'
import TopStories from '@/components/Landing/TopStories'
import ImageContainer from '@/components/Landing/ImageContainer'
import SectionList from '@/components/Landing/SectionList'
import LatestNews from '@/components/Landing/LatestNews'
// import AdsBaner from '@/components/Baners/AdsBaner'
import IRPrime from '@/components/Landing/IRPrime'
import Subscribe from '@/components/Landing/Subscribe'
import Image from 'next/image';
import { useRouter } from 'next/router';
import ImageLoader from '@/components/ImageLoader';
import CaseStudy from '@/components/Landing/CaseStudy';
// import { Nunito } from 'next/font/google';


const List = dynamic(() => import('@/components/common/List'))
const Cards = dynamic(() => import('@/components/common/Cards'))
// const CardCarousel = dynamic(() => import('@/components/Sliders/CardCarousel'))
const ImageGroupEvents = dynamic(() => import('@/components/Landing/ImageGroupEvents'))
const EventList = dynamic(() => import('@/components/Events/EventList'))
const ListSlider = dynamic(() => import('@/components/Sliders/ListSlider'));
const Card = dynamic(() => import('@/components/Bookstore/Card'))
const IrVideoWall = dynamic(() => import('@/components/Video/IrVideoWall'))
const Poll = dynamic(() => import('@/components/Poll/Poll'))
const CustomSlider = dynamic(() => import('@/components/Sliders/CustomSlider'))
const Video = dynamic(() => import('@/components/Video/Video'))
const TrendingBox = dynamic(() => import('@/components/Landing/TrendingBox'))
const Title = dynamic(() => import('@/components/common/Title'))
const BulletList = dynamic(() => import('@/components/Landing/BulletList'))
const Advertisement = dynamic(() => import('@/components/Baners/Advertisement'))
// import SubscriptionAlert from '../common/SubscriptionAlert'
// import { useSession } from 'next-auth/react'
// import Advertisement from '@/components/Baners/Advertisement';

// const nunito = Nunito({
//   weight: ["300", "400", "500", "600", "700"],
//   display: "block",
//   preload: true,
//   style: 'normal',
//   subsets: ["latin"],
//   variable: '--font-inter',
// }) 
export default function Home({ data }) {
  // console.log(data, "data");
  // console.log(ads,"ads");
  const [value, setValue] = useState([])
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([])
  const [ads, setAds] = useState()
  const [pageNo, setPageNo] = useState(2)
  const [noProduct, setNoProduct] = useState(false)
  const router = useRouter()

  // console.log('home', value)
  function get_customer_info() {
    let users = {}
    users.cust_email = localStorage['userid'] ? localStorage['userid'] : undefined;
    users.cust_name = localStorage['full_name'] ? localStorage['full_name'] : undefined;
    users.customer_id = localStorage['customer_id'] ? localStorage['customer_id'] : undefined;
    // dispatch(userAction(users));
  }

  const getAd = async () => {
    // let params = { doctype: 'Web Page Builder', page_type: 'Home' }
    // const res = await getAds(params);
    // const ads = res.message;
    // if (ads) {
    //   setAds(ads)
    // }

    const resp = await HomePageAds();
    if (resp.message) {
      // ads = resp.message;
      setAds(resp.message)
      // console.log(resp)
      // setAds(ads)
    }
  }


  let cardref = useRef();

  let [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    // if (window.googletag) {
    //   window.googletag.cmd = window.googletag.cmd || [];
    //   window.googletag.cmd.push(function () {
    //     window.googletag.display('div-gpt-ad-1617096742911-0');
    //   });
    // }

    checkIsMobile();
    get_polls()
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const [pollList, setPollList] = useState(null);
  const [ipAddress, setIpAddress] = useState(null);

  const get_polls = async () => {
    let ip_address = await get_ip()
    setIpAddress(ip_address)
    let param = {
      ip_address: ip_address
    }
    const resp = await getPollsList(param);
    setPollList(resp.message)
  }

  const checkIsMobile = async () => {
    let is_mobile = await checkMobile();
    isMobile = is_mobile
    setIsMobile(isMobile);
  }

  useEffect(() => {
    if (data && data.page_content && data.page_content.length != 0) {
      // console.log(data.page_content,'data.page_content')
      setTimeout(() => {
        setValue(data.page_content)
      }, 100)
      // console.log('data1234567',data);
      // console.log(ads)
    }

    getNewsLetters();
    getBooks();
    getAd();


    // const intersectionObserver = new IntersectionObserver(entries => {
    //   if (entries[0].intersectionRatio <= 0) return;
    //   if (!no_product) {
    //     page_no > 1 ? getPageData() : null
    //     page_no = page_no + 1
    //   }
    // });

    // intersectionObserver?.observe(cardref?.current);

    // return () => {
    //   cardref?.current && intersectionObserver?.unobserve(cardref?.current)
    // }


    // if (!isMobile) {
    //   const handleScroll = () => {
    //     const scrollTop = document.documentElement.scrollTop
    //     const scrollHeight = document.documentElement.scrollHeight
    //     const clientHeight = document.documentElement.clientHeight
    //     if ((scrollTop + clientHeight) + 1500 >= scrollHeight) {
    //       if (!loading && !noProduct && !isMobile) {
    //         // no_product = true
    //         if (pageNo > 1) {
    //           loading = true
    //           setLoading(loading)
    //           getPageData()
    //         }
    //         else {
    //           pageNo += 1
    //           setPageNo(pageNo)
    //         }
    //         // page_no > 1 ? getPageData() : loading = true, setLoading(loading)
    //         // page_no = page_no + 1
    //       }
    //     }
    //   };

    //   window.addEventListener('scroll', handleScroll);

    //   return () => {
    //     window.removeEventListener('scroll', handleScroll);
    //   };
    // }

  }, [])

  const observer = useRef();
  const lastPostElementRef = useCallback(
    (node) => {
      if (loading && noProduct) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNo((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    if (pageNo > 1 && !noProduct) {
      // console.log(pageNo,"pageNo")

      setLoading(true);
      getPageData()

      // const loadData = async () => {
      //   await loadMore(data);

      //   setLoading(false);
      // };

      // loadData();
    }
  }, [pageNo]);

  // useEffect(() => {
  //   const intersectionObserver = new IntersectionObserver(entries => {
  //     if (entries[0].intersectionRatio <= 0) return;
  //     if (!loading && !noProduct && isMobile) {
  //       if (pageNo > 1) {
  //         loading = true
  //         setLoading(loading)
  //         getPageData()
  //       } else {
  //         pageNo += 1
  //         setPageNo(pageNo)
  //       }
  //     }
  //   });

  //   intersectionObserver?.observe(cardref?.current);

  //   return () => {
  //     cardref?.current && intersectionObserver?.unobserve(cardref?.current)
  //   }
  // }, [cardref])
  // console.log(data)

  const getNewsLetters = async () => {
    let param = {
      fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
    }
    let value = await newsLanding(param);
    let data = value.message;
    if (data && data.length != 0) {
      setNews(data);
    }
  }

  // console.log('ads', ads);


  const getPageData = async () => {
    // console.log('load...',)
    // setLoading(true)
    // if (page_no > 1) {
    if (pageNo > 1) {
      const param = {
        // "application_type": "mobile",
        "route": "home",
        page_no: pageNo,
        page_size: 4
      }
      const resp = await HomePage(param);
      if (resp.message && resp.message.page_content && resp.message.page_content.length != 0) {
        setValue(d => d = [...d, ...resp.message.page_content])
        // loading = false
        setLoading(false)
        // pageNo += 1
        // setPageNo(pageNo)
        setNoProduct(false)
        setTimeout(() => {
          // no_product = false;
        }, 200);
        // console.log(resp.message.page_content)
      } else {
        // no_product = true;
        // noProduct = true;
        setNoProduct(true)
        // loading = false
        setLoading(false)
        // setLoading(false)
      }
    }

  }

  const getBooks = async () => {
    const params = {
      doctype: 'Product',
      fields: ['name', 'route', 'item', 'image'],
      page_no: 1,
      page_size: 5
    };
    const resp = await getList(params);
    // console.log(resp);
    if (resp.message && resp.message.length != 0) {
      setBooks(resp.message)
    }
  }




  return (
    <>
      {/*  isLast={index == value.length - 1} */}



      <RootLayout data={data} isLanding={true} head={''} adIdH={'home-head'} adIdF={'home-foot'} homeAd={ads && ads.header ? ads : null}>
        <SEO title={'India Retailing'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />

        {(value && value.length != 0) ? value.map((data, i) => {
          return (
            // <HomePageBuilder news={news ? news : []} key={index} isLast={index == value.length - 1} i={index} val={value} data={res} loadMore={() => load()} />
            // Video section => bg-[#000] lg:my-5 lg:p-[20px_40px] md:py-[20px] md:h-[350px] no_scroll
            <div key={i} ref={value.length === i + 3 ? lastPostElementRef : null} className={`py-[20px] ${data.section == 'PS-24-00630' ? 'lg:p-5 bg-[#F8F9FA]' : data.section == 'PS-23-00157' || data.section == 'Infocus' ? 'border-b border-[#d4d8d8] container' : data.section == 'PS-23-00166' ? 'bg-[#000] lg:my-5 lg:p-[20px_40px] md:py-[20px]  no_scroll ' : data.section == 'PS-23-00130' ? 'lg:bg-[#f1f1f1] p-5 lg:my-5' : data.section == 'PS-24-00623' ? 'bg-[#F0F0F0]' : 'container'}  md:p-[15px]  md:py-[10px] lg:flex gap-5`}>
              {(data.layout_json && JSON.parse(data.layout_json).length != 0) && JSON.parse(data.layout_json).map((res, index) => {
                return (
                  // || i == 5
                  <div key={index} className={`${res.class == 'flex-[0_0_calc(100%_-_0px)]' ? 'w-full' : res.class} ${(data.section != 'PS-24-00630') ? 'md:mb-[20px]' : 'container'}  ${((data.section == 'PS-23-00130') && !isMobile) ? 'container' : ''} ${data.section == 'PS-23-00166' ? 'container' : ''} ${data.section == 'PS-24-00623' && !isMobile ? 'container' : ''}`}>
                    {(res.components && res.components.length != 0) && res.components.map((c, c_index) => {
                      return (
                        <div key={c.component_title} className={`${c.component_title == "Top 4 Stories" ? 'top3  lg:justify-center md:gap-5' : c.component_title == "Featured Content" ? 'md:mb-[20px] pt-[20px]' : ''}`}>
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Top 4 Stories") && <TopStories data={data.data[c.cid].data.slice(0, 4)} />}
                          {(c.component_title == "In Focus" && c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_data_type == 'Location') && <>
                            {/* <div className={``}> */}
                            <ImageContainer data={data.data[c.cid].data[0]} height={"h-[350px] md:h-[250px]"} contStyle={'mb-[15px]'} width={'w-full'} />
                            <SectionList data={data.data[c.cid].data.slice(1, 4)} />
                            {/* </div> */}
                          </>}
                          {(c.component_title == "Latest News" && c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_data_type == 'Location') && <>
                            <Title data={{ title: 'Latest News' }} seeMore={true} route={'/categories/latest-news'} />
                            {isMobile ? <><div className='no_scroll md:mb-[15px]'><LatestNews height={'h-[190px]'} width={'w-full'} data={data.data[c.cid].data.slice(0, 4)} /></div><LatestNews height={'h-[190px]'} width={'w-full'} isList={true} data={data.data[c.cid].data.slice(4, 6)} /></> : <LatestNews height={'md:h-[222px] lg:h-[240px]'} width={'w-full'} data={data.data[c.cid].data.slice(0, 4)} />}
                          </>}
                          {(ads && c.component_title == "Infocus Ad" && data.section == 'Infocus' && c.cid && data.data[c.cid]) &&
                            // {(ads && ads.infocus && c.component_title == "Infocus Ad" && data.section == 'Infocus' && c.cid && data.data[c.cid] && data.data[c.cid].section == ads.infocus.section) &&
                            <>
                              {/* {console.log(ads.infocus,'ads.infocus')} */}
                              {/* <AdsBaner data={ads.infocus} height={'h-[250px] w-[300px] object-contain'} /> */}
                              <Advertisement data={ads.infocus ? ads.infocus : null} position={'small'} adId={'infocus'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px] m-auto`} />

                            </>
                          }
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive") && <IRPrime data={data.data[c.cid].data} />}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Exclusive" && !isMobile) && <Subscribe height={"h-[125px] "} data={news} width={"w-full"} />}
                          {(ads && c.component_title == "Top Stories Ad" && c.cid && data.data[c.cid]) &&
                            <div className="h-[90px]" style={{ height: '90px !important' }}>
                              <Advertisement data={ads.top_stories ? ads.top_stories : null} adId={'top_stories_ad'} divClass={'h-[90px] lg:w-[728px] md:w-full m-auto'} insStyle={isMobile ? "display:inline-block;width:360px;height:90px;" : "display:inline-block;width:728px;height:90px;"} position={"high"} />
                            </div>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Web Special" && c.component_data_type == 'Location') && <>
                            <div className='lg:w-[calc(70%_-_10px)]'><Title data={{ title: c.component_title }} seeMore={true} route={'/categories/web-special'} /></div>
                            <div className={`lg:flex gap-5`}>
                              <div className='lg:flex flex-wrap justify-between flex-[0_0_calc(70%_-_10px)]'>
                                <div className='flex-[0_0_calc(55%_-_10px)]'><ImageContainer isWeb={true} data={data.data[c.cid].data[0]} height={'h-[250px]'} width={'w-[500px]'} /></div>
                                <div className={`${isMobile ? '' : 'border_right border_left px-[20px] h-[250px] flex-[0_0_calc(45%_-_10px)]'}`}><BulletList data={data.data[c.cid].data.slice(1, 6)} /></div>
                              </div>
                              {/* {ads && ads.web_special && <div className='md:my-[15px] md:hidden'><AdsBaner data={ads && ads.web_special ? ads.web_special : null} height={'h-[250px]'} width={'w-[300px]'} /></div>} */}
                              <div className='md:my-[15px]'>
                                <Advertisement data={ads && ads.web_special ? ads.web_special : null} position={'small'} adId={'web_special'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px] m-auto`} />
                              </div>
                            </div>
                            <div className={` flex border-t border-[#d4d8d8] pt-[10px] mt-[10px] md:hidden`}><BulletList isBorder={true} data={data.data[c.cid].data.slice(6, 10)} /></div>
                            <div className={`lg:flex no_scroll lg:my-[15px] md:my-[10px] gap-[10px] lg:flex-wrap lg:justify-between`}><Cards noPrimaryText={true} titleOnly={true} contentHeight={'pt-[10px]'} isHome={'/'} data={data.data[c.cid].data.slice(10, 15)} check={true} height={'h-[125px] w-full'} border_none={true} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(60%_-_10px)]'} /></div>
                          </>}

                          {(c.cid && data.data[c.cid] && (data.data[c.cid]['banner-list'] && data.data[c.cid]['banner-list'].length > 0) && c.component_title == "Web Special New") && <>
                            <Title data={{ title: c.component_title }} />
                            <div className={`flex items-center gap-[20px] md:overflow-auto lg:flex-wrap ${isMobile ? 'scrollbar-hide' : ''} md:gap-[15px] lg:justify-center`}>
                              {data.data[c.cid]['banner-list'].map((resp, index) => {
                                return (
                                  <div className={`flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(50%_-_10px)] cursor-pointer`} onClick={() => router.push(resp.url)} key={resp.url}>
                                    <Image src={check_Image(resp['banner-image'])} className='h-[250px] md:h-[150px] w-full rounded-[10px]' height={100} width={100} alt={resp.url}></Image>
                                  </div>
                                )
                              })}
                            </div>

                          </>}

                          {(c.cid && data.data[c.cid] && c.component_title == "Featured Content") && <>
                            <Title data={{ title: c.component_title }} isIcon={true} see={`uppercase !font-semibold !text-[#e21b22]`} route={'/p/web-special-list/1'} seeMore={true} />
                            <div className={`flex items-center gap-[20px] md:overflow-auto lg:flex-wrap scrollbar-hide md:gap-[15px]`}>
                              {data.data[c.cid].data.map((resp, index) => {
                                return (
                                  <div className={`flex-[0_0_calc(50%_-_15px)] md:flex-[0_0_calc(90%_-_10px)] gap-[15px] flex items-center bg-white rounded-[10px] p-[10px] relative cursor-pointer`} onClick={() => router.push('/p/featured-content/' + resp.route)} key={resp.route}>
                                    <div className='lg:flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'>
                                      {/* <Image src={check_Image(resp['image'])} className='h-[250px] md:h-[150px] w-full rounded-[10px]' height={100} width={100} alt={resp.url}></Image> */}
                                      <ImageLoader style={`rounded-[5px] h-[106px] md:h-[80px] w-full`} src={resp.thumbnail_imagee} title={resp.title} />
                                    </div>

                                    {resp.featured_content_tag && <div className='absolute top-0 right-0 bg-[#E21B22] rounded-[0_10px_0_10px] min-w-[70px] text-center p-[3px_10px] md:p-[2px_6px]'>
                                      <p className={`text-white text-[11px] md:text-[9px]`}>{resp.featured_content_tag}</p>
                                    </div>}

                                    <div className='lg:flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(60%_-_10px)]'>
                                      <h6 className={`line-clamp-2 title nunito`}>{resp.title}</h6>
                                      <p className={`line-clamp-2 md:line-clamp-1 sub_title lg:my-[5px] `}>{resp.blog_intro}</p>
                                      <div className='flex items-center gap-[5px] py-[5px]'>
                                        <span className='text-[#999999] text-[12px] md:flex-[0_0_auto]'>Published On : </span>
                                        <p className={`text-[13px] md:text-[12px] md:line-clamp-1 font-[500] nunito`}>{resp['published_on']}</p>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>

                          </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Trending" && !isMobile) && <>
                            <Title data={{ title: c.component_title }} />
                            <div className='lg:flex  items-center gap-[10px]'>
                              <div className={`flex gap-[10px] flex-[0_0_calc(4%_-_10px)]`}><TrendingBox icons={'left'} parentElement={'trending'} /></div>
                              <div className={`flex gap-[10px] flex-[0_0_calc(92%_-_10px)] overflow-auto trending`}><TrendingBox data={data.data[c.cid].data} /></div>
                              <div className={`flex gap-[10px] flex-[0_0_calc(4%_-_10px)] justify-end`}><TrendingBox icons={'right'} parentElement={'trending'} /></div>
                            </div>
                          </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Leaders Ink") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/leaders-ink'} seeMore={true} />
                            {data.data[c.cid].data &&
                              <div className='overflow-auto scrollbar-hide'>
                                {/* <CardCarousel isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[275px] flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(70%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /> */}
                                <CustomSlider noPrimaryText={true} slider_id={'leader_slide' + c_index} hide_scroll_button={false} slider_child_id={'leaders_ink' + c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[315px] md:h-[280px] flex-[0_0_calc(20%_-_16px)] md:flex-[0_0_calc(75%_-_10px)]'}
                                  imgClass={'lg:h-[185px] md:h-[150px] w-full'} title_class={'min-h-[35px] line-clamp-2'} />
                              </div>}

                            {/* <div className='none leaders'><MultiCarousel isHome={'/categories/'} perView={3} check={true} none={true} data={data.data[c.cid].data} cardHeight={'h-[310px]'} card_width={"285px !important"} height={"h-[185px]"} width={"w-full"} type={'profile'} /></div>} */}
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Research") && <>
                            {/* route={'/categories/'} seeMore={true} */}
                            <Title data={{ title: c.component_title }} route={'/categories/research'} seeMore={true} />
                            {data.data[c.cid].data && isMobile ? <div className='mb-[10px] research'><ListSlider route={'/'} noDots={true} auto={false} data={data.data[c.cid].data} /></div> :
                              // className='overflow-auto scrollbar-hide gap-[15px] flex '
                              <>
                                {/* <CardCarousel isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[310px] md:h-[220px] flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_calc(50%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'} /> */}
                                <CustomSlider noPrimaryText={true} slider_id={'research_slide' + c_index} slider_child_id={'research' + c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[315px] md:h-[275px] flex-[0_0_calc(20%_-_16px)] md:flex-[0_0_calc(70%_-_10px)]'}
                                  imgClass={'lg:h-[185px] md:h-[140px] w-full'} title_class={'min-h-[35px]'} />
                              </>

                              // <div className={`pr-[30px] none research`}><MultiCarousel isHome={'/categories/'} none={true} check={true} cardHeight={'h-[310px]'} perView={2} noPlay={true} data={data.data[c.cid].data} card_width={"285px !important"} height={"h-[185px]"} width={'w-full'} type={'card'} /></div>
                            }
                          </>}

                          {(ads && c.component_title == "Research Ad" && c.cid && data.data[c.cid]) &&
                            <>
                              <Advertisement data={ads.research ? ads.research : null} adId={'research_ad'} divClass={'h-[90px] lg:w-[728px] md:w-full m-auto'} insStyle={isMobile ? "display:inline-block;width:360px;height:90px;" : "display:inline-block;width:728px;height:90px;"} position={"high"} />
                            </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "IR Video Wall") && <>
                            {/* <Title data={{ title: c.component_title }} textClass={'text-white'} see={'text-white'} route={'/video'} seeMore={true} /> */}
                            <><IrVideoWall data={data.data[c.cid].data} c={c} isHome={'/video/'} isMobile={isMobile} imgClass={'h-[460px] w-full md:h-[200px]'} /></>
                          </>}

                          {(ads && c.component_title == "Video below Ad" && c.cid && data.data[c.cid]) &&
                            // {(ads && ads.video_below && c.component_title == "Video below Ad" && c.cid && data.data[c.cid] && data.data[c.cid].section == ads.video_below.section) &&
                            <>
                              <Advertisement data={ads.video_below ? ads.video_below : null} position={'high'} adId={'video_below'} insStyle={"display:inline-block;width:728px;height:90px;"} divClass={`h-[90px] lg:w-[728px] md:w-full object-cover m-auto`} />

                            </>}

                          {/* {(c.component_title == "Banner Ads" && ads && ads.video_below) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={'h-full'} width={'w-full'} data={ads.video_below} /></>} */}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Fashion & Lifestyle") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/fashion-lifestyle'} seeMore={true} />
                            {/* imgWidth={"h-[160px]"} */}
                            <div className={`flex gap-5 md:gap-[5px] flex-wrap`}><List primary_pb={'lg:pb-[5px]'} hash_bg={'pt-[10px]'} titleClamp={'line-clamp-2'} isHome={'/'} imgFlex={'flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(45%_-_10px)]'} data={isMobile ? data.data[c.cid].data.slice(0, 3) : data.data[c.cid].data.slice(0, 6)} check={true} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} imgWidth={"h-[135px]"} imgHeight={"w-[215px]"} borderRadius={"rounded-[10px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Beauty & Wellness") && <div className='md:bg-[#F3F4F6] md:p-[10px] md:rounded-[5px]'>
                            <Title data={{ title: c.component_title }} route={'/categories/beauty-wellness'} seeMore={true} />
                            <div className={`${isMobile ? '' : 'border'} p-[10px] rounded-[5px]`}><List titleClamp={'line-clamp-2'} tittleOnly={true} isHome={'/'} imgFlex={'flex-[0_0_calc(25%_-_10px)]'} data={data.data[c.cid].data.slice(0, 4)} check={true} imgWidth={"w-[100px]"} imgHeight={"h-[73px]"} borderRadius={"rounded-[5px]"} isTop={isMobile ? false : true} isReverse={isMobile ? true : false} isBB={true} /></div>
                          </div>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Food & Beverage") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/food-beverage'} seeMore={true} />
                            <div className={`${isMobile ? 'no_scroll' : 'grid gap-5  grid-cols-5'}`}><Cards isHome={'/'} cardClass={"h-[320px] md:h-[310px]"} check={true} data={data.data[c.cid].data.slice(0, 5)} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} flex={'md:flex-[0_0_calc(75%_-_15px)]'} isBorder={true} /></div>
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
                            <Title data={{ title: c.component_title }} route={c.component_title == "E-Commerce" ? '/categories/e-commerce' : c.component_title == "People" ? '/categories/people' : c.component_title == "D2C Buzz" ? '/categories/d2c-buzz' : null} seeMore={true} />
                            {/* //  h-[144px] contentWidth={'lg:gap-[3px]'}  */}
                            <div className={` lg:grid lg:gap-[10px] md:flex md:flex-col md:gap-[5px]`}><List primary_pb={'lg:pb-[5px]'} hash_bg={'pt-[10px]'} check={true} titleClamp={'line-clamp-2'} line={'line-clamp-2'} isHome={'/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} flex={'items-center'} data={data.data[c.cid].data.slice(0, 3)} imgWidth={"w-full"} imgHeight={"h-[135px] md:h-[115px]"} borderRadius={"rounded-[7px]"} /></div>
                          </div>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Shopping Centers") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/shopping-centers'} seeMore={true} />
                            <div className={`md:flex md:flex-col md:gap-[5px]`}><List isHome={'/'} flex={'items-center lg:mb-[8px] lg:gap-5'} imgFlex={'flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} contentWidth={'lg:flex-[0_0_calc(60%_-_10px)] lg:gap-[5px]'} titleClamp={'line-clamp-2'} line={'line-clamp-2 md:line-clamp-1'} data={data.data[c.cid].data.slice(0, 3)} check={true} fullWidth={true} imgWidth={"w-full"} imgHeight={"h-[130px] md:h-[110px]"} borderRadius={"rounded-[5px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Podcast") && <div className={`border md:mt-[15px] p-[10px] rounded-[5px]`}>
                            <Title data={{ title: c.component_title }} route={'/podcast'} seeMore={true} />
                            <List titleClamp={'md:pt-[0px]'} descLine={'line-clamp-2'} isHome={'/podcast/'} isDesc={true} data={isMobile ? data.data[c.cid].data : data.data[c.cid].data.slice(0, 1)} imgWidth={"w-full "} imgFlex={'lg:flex-[0_0_calc(27%_-_10px)] md:flex-[0_0_calc(30%_-_10px)]'} imgHeight={"h-[80px] md:h-[75px]"} check={true} isBB={true} borderRadius={"rounded-[6px]"} />
                          </div>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Privilege Members Corner") && <>
                            <Title data={{ title: c.component_title }} route={'/video'} seeMore={true} />
                            <Video imgClass={'h-[210px] md:h-[190px] w-full'} isHome={'/video/'} vh={'h-[265px] md:h-[245px]'} data={data.data[c.cid].data} />
                          </>}

                          {/* {(ads && ads.shopping_centre_below && c.component_title == "Shopping centre below Ad" && c.cid && data.data[c.cid] && data.data[c.cid].section == ads.shopping_centre_below.section) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} data={ads.shopping_centre_below} height={"h-[90px] w-[728px] object-contain m-[auto]"} /></>} */}
                          {(ads && c.component_title == "Shopping centre below Ad" && c.cid && data.data[c.cid]) && <><Advertisement position={'high'} adId={'shopping_centre_below'} data={ads.shopping_centre_below ? ads.shopping_centre_below : null} insStyle={"display:inline-block;width:728px;height:90px;"} divClass={`h-[90px] w-[728px] md:w-full m-auto`} />
                          </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && (c.component_title == "Supply Chain" || c.component_title == "Marketing")) && <>
                            <Title data={{ title: c.component_title }} route={c.component_title == "Supply Chain" ? '/categories/supply-chain' : c.component_title == "Marketing" ? '/categories/marketting' : null} seeMore={true} />
                            <div className='md:flex md:flex-col md:gap-[5px]'><List isHome={'/'} primary_pb={'lg:pb-[5px]'} mb={true} data={data.data[c.cid].data.slice(0, 3)} titleClamp={'line-clamp-2'} line={'line-clamp-1 md:line-clamp-1'} hash_bg={'pt-[10px] md:pt-[10px]'} check={true} imgFlex={'flex-[0_0_calc(35%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={"w-full"} imgHeight={"h-[125px] md:h-[115px]"} borderRadius={"rounded-[10px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Technology") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/technology'} seeMore={true} />
                            <div className={'border p-[10px] rounded-[5px]'}><List line={'line-clamp-1'} isHome={'/'} titleClamp={'line-clamp-2'} check={true} data={data.data[c.cid].data.slice(0, 3)} imgFlex={'flex-[0_0_calc(30%_-_10px)]'} imgWidth={"w-full"} imgHeight={"h-[92px] md:h-[80px]"} isBB={true} isTop={true} borderRadius={"rounded-[10px] md:rounded-[5px]"} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Case Studies") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/case-studies'} seeMore={true} />
                            <CustomSlider hide_scroll_button={isMobile ? true : false} noPrimaryText={true} slider_id={'case_studies_id' + c_index} slider_child_id={'case_studies' + c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[315px] md:h-[275px] flex-[0_0_calc(20%_-_16px)] md:flex-[0_0_calc(65%_-_10px)]'}
                              imgClass={'lg:h-[185px] md:h-[140px] w-full'} subtitle_class={'md:line-clamp-1 line-clamp-2 md:mb-[10px]'} title_class={'min-h-[35px] line-clamp-2'} />
                          </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Case Study") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/case-studies'} seeMore={true} />
                            <CaseStudy imgClass={'lg:h-[285px] md:h-[140px] w-full'} title_class={'min-h-[35px] line-clamp-2'} hide_scroll_button={isMobile ? true : false} slider_id={'case_study_id' + c_index} slider_child_id={'case_study' + c_index} data={data.data[c.cid].data} cardClass={'h-[315px] md:h-[275px] flex-[0_0_calc(33.333%_-_16px)] md:flex-[0_0_calc(65%_-_10px)]'} />
                            
                          </>}

                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Photo Essays") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/photo-essays'} seeMore={true} />
                            {/* overflow-auto scrollbar-hide gap-[15px] flex */}
                            <>
                              <CustomSlider hide_scroll_button={isMobile ? true : false} noPrimaryText={true} slider_id={'photo_essays_id' + c_index} slider_child_id={'photo_essays' + c_index} isHome={'/'} data={data.data[c.cid].data} cardClass={'h-[315px] md:h-[275px] flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(65%_-_10px)]'}
                                imgClass={'lg:h-[185px] md:h-[140px] w-full'} title_class={'min-h-[35px] line-clamp-2'} subtitle_class={'md:line-clamp-1 line-clamp-2 md:mb-[10px]'} />
                            </>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Poll") && <>
                            <Title data={{ title: 'India Retailing Poll' }} route={'/polls'} seeMore={true} />
                            {(pollList && ipAddress) && <Poll data={pollList.slice(0, 1)} ipAddress={ipAddress} />}

                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && data.data[c.cid].data.length > 0 && c.component_title == "IMAGES Group Events") && <>
                            <Title data={{ title: c.component_title }} route={'/events'} seeMore={true} />
                            {isMobile ? <div className='eventSlide'><ListSlider route={'/events/'} isEvent={true} noDots={true} auto={false} data={data.data[c.cid].data} /></div> : <div className='flex gap-5 lg:pb-[30px]'>
                              <div className={`flex-[0_0_calc(30%_-_10px)]`}><ImageGroupEvents isHome={'/events/'} data={data.data[c.cid].data.slice(0, 1)} height={"h-[85%]"} width={"w-[80%]"} /></div>
                              <div className={`flex flex-wrap gap-[20px]`}><EventList isRoute={'/events/'} check={false} data={data.data[c.cid].data.slice(1, 7)} height={"h-[160px] rounded-[0px]"} width={"w-full"} flex={'flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'} isHome={true} /></div>
                            </div>}
                          </>}

                          {(c.cid && books && books.length != 0 && c.component_title == "Book Store") && <>
                            <Title data={{ title: c.component_title }} route={'/bookstore'} seeMore={true} />
                            <div className={`lg:grid lg:gap-5 lg:grid-cols-5 no_scroll`}><Card isHome={true} imgClass={'lg:h-[300px] md:h-[225px] mouse'} check={true} flex={'md:flex-[0_0_calc(50%_-_10px)]'} data={books} boxShadow={true} /></div>
                          </>}
                          {(c.cid && data.data[c.cid] && data.data[c.cid].data && c.component_title == "Reconnect") && <>
                            <Title data={{ title: c.component_title }} route={'/categories/reconnect'} seeMore={true} />
                            <div className={`lg:flex lg:gap-5 lg:justify-between no_scroll`}><Cards check={true} isHome={'/'} flex={'flex-[0_0_calc(33.333%_-_15px)] md:flex-[0_0_calc(75%_-_10px)]'} cardClass={'h-[320px] md:h-[290px]'} data={isMobile ? data.data[c.cid].data : data.data[c.cid].data.slice(0, 3)} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px] md:h-[160px]"} width={"w-full"} isBorder={true} /></div>
                          </>}
                          {/* {(ads && ads.reconnect && c.component_title == "Reconnect Ad" && c.cid && data.data[c.cid] && data.data[c.cid].section == ads.reconnect.section) && <><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} data={ads.reconnect} height={"h-[280px] w-[336px] object-contain m-[auto]"} /></>} */}
                          {(ads && c.component_title == "Reconnect Ad" && c.cid && data.data[c.cid]) && <div className='pt-[10px]'><Advertisement data={ads.reconnect ? ads.reconnect : null} position={'small'} adId={'reconnect'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[280px] w-[336px] m-auto`} />
                          </div>}

                          {/* {(c.cid && c.component_title == "Banner Ads" && !isMobile) && <div className='pt-[30px]'><AdsBaner Class={'flex pt-[10px] flex-col justify-center items-center'} height={"h-[300px]"} width={'w-full'} data={{ bannerAd: '/no_state.svg' }} /></div>} */}
                        </div>
                      )
                    })}
                    {/* {(res.u_id) &&  data[u_id]} */}
                  </div>
                )
              })}
            </div>
          )
        }) : <Skeleton />}
        <div className='more h-[30px]' ref={cardref}></div>
        {(loading && isMobile) && <div id="wave">
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>}
      </RootLayout>
    </>
  )
}

const Skeleton = () => {
  return (
    <div className={` `}>
      <div className=' bg-[#f8f9fa] '>
        <div className='lg:p-[30px_0px] md:p-[15px] container flex gap-5 items-center'>
          {[0, 1, 2, 3].map((res, i) => {
            return (
              <div key={i} className='flex flex-[0_0_calc(25%_-_15px)] md:flex-[0_0_calc(70%_-_10px)] bg-white h-[85px] p-[10px] rounded-[5px] items-center gap-[10px]'>
                <div className='flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(30%_-_10px)]'>
                  <div className='w-full bg-[#E5E4E2] h-[60px] rounded-[5px]'></div>
                </div>
                <div className='flex-[0_0_calc(70%_-_10px)]'>
                  <p className={`bg-[#E5E4E2] h-[8px]  w-[100px] md:w-[60px] rounded-[5px]  mb-[15px] `}></p>
                  <p className={`bg-[#E5E4E2] h-[8px]  w-[160px] md:w-[140px] rounded-[5px]  mt-[5px] `}></p>
                  <p className={`bg-[#E5E4E2] h-[6px]  w-[160px] md:w-[110px] rounded-[5px]  mt-[5px] `}></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className={`lg:p-[30px_0px] md:p-[15px] container flex gap-5 md:flex-col`}>
        <div className={`flex-[0_0_calc(45%_-_15px)]`}>
          <div className='w-full bg-[#E5E4E2] mb-[20px] h-[350px] md:h-[250px] rounded-[5px]'></div>
          <div className='my-[30px]'>
            {[0, 1, 2].map((res, i) => {
              return (
                <div key={i} className='flex mb-[15px] flex-[0_0_calc(25%_-_15px)] rounded-[5px] items-center gap-[10px]'>
                  <div className='flex-[0_0_calc(30%_-_10px)]'>
                    <div className='w-full bg-[#E5E4E2] h-[110px] md:h-[95px] rounded-[5px]'></div>
                  </div>
                  <div className='flex-[0_0_calc(70%_-_10px)]'>
                    <p className={`bg-[#E5E4E2] h-[8px]  w-[100px] rounded-[5px]  mb-[15px] `}></p>
                    <p className={`bg-[#E5E4E2] h-[8px]  w-full md:w-[220px] rounded-[5px]  mt-[5px] `}></p>
                    <p className={`bg-[#E5E4E2] h-[6px]  w-[290px] md:w-[200px] rounded-[5px]  mt-[5px] `}></p>
                    <p className={`bg-[#E5E4E2] h-[6px]  w-[160px] rounded-[5px]  mt-[10px] `}></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`flex-[0_0_calc(30%_-_15px)] md:hidden`}>
          <div>
            {[0, 1].map((res, i) => {
              return (
                <div key={i}>
                  <div className='w-full bg-[#E5E4E2] h-[240px] rounded-[5px]'></div>
                  <p className={`bg-[#E5E4E2] h-[8px] my-[10px] w-full rounded-[5px]  mb-[15px] `}></p>
                </div>
              )
            })}
          </div>

          <div>
            {[0, 1].map((res, i) => {
              return (
                <div key={i} className={`${i == 0 ? 'border_bottom' : 'mt-[15px]'}`}>
                  <p className='w-full bg-[#E5E4E2] h-[10px] rounded-[5px]'></p>
                  <p className={`bg-[#E5E4E2] h-[8px] mt-[10px] w-full rounded-[5px]  mb-[15px] `}></p>
                  <p className={`bg-[#E5E4E2] h-[8px] mt-[5px] w-[250px] rounded-[5px]  mb-[15px] `}></p>
                </div>
              )
            })}
          </div>
        </div>
        <div className={`flex-[0_0_calc(25%_-_15px)] md:hidden`}>
          <div className='w-full bg-[#E5E4E2] h-[250px] rounded-[5px]'></div>
          <div className='my-[15px] border p-[10px] rounded-[5px]'>
            {[0, 1, 2].map((res, i) => {
              return (
                <div key={i} className='flex mb-[15px] flex-[0_0_calc(25%_-_15px)] rounded-[5px] items-center gap-[10px]'>
                  <div className='flex-[0_0_calc(30%_-_10px)]'>
                    <div className='w-full bg-[#E5E4E2] h-[60px] rounded-[5px]'></div>
                  </div>
                  <div className='flex-[0_0_calc(70%_-_10px)]'>

                    <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[5px] `}></p>
                    <p className={`bg-[#E5E4E2] h-[6px]  w-[200px] rounded-[5px]  mt-[5px] `}></p>
                    <p className={`bg-[#E5E4E2] h-[6px]  w-[140px] rounded-[5px]  mt-[5px] `}></p>

                  </div>
                </div>
              )
            })}
          </div>
          <div className='flex my-[15px] border p-[10px] rounded-[5px] items-center gap-[10px]'>
            <div className='flex-[0_0_calc(30%_-_10px)]'>
              <div className='w-full bg-[#E5E4E2] h-[80px] rounded-[5px]'></div>
            </div>
            <div className='flex-[0_0_calc(70%_-_10px)]'>

              <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[5px] `}></p>
              <p className={`bg-[#E5E4E2] h-[6px]  w-[200px] rounded-[5px]  mt-[5px] `}></p>
              <p className={`bg-[#E5E4E2] h-[6px]  w-[140px] rounded-[5px]  mt-[5px] `}></p>

            </div>
          </div>
        </div>
      </div>
      {/* <div className='flex gap-[15px] items-center'>
        <div className='lg:h-[640px] border p-5 md:p-[10px] rounded-[5px]  flex-[0_0_calc(42%_-_10px)] md:basis-full'>
          {[0].map((res, i) => {
            return (
              <div key={i} className={`md:mb-[10px] mb-5 pb-5 cursor-pointer md:pb-[10px] border_bottom`}>
                <h6 className={`bg-[#E5E4E2] h-[10px] mt-[10px] w-full rounded-[5px]`}></h6>
                <h6 className={`bg-[#E5E4E2] h-[10px] my-[10px] w-[200px] rounded-[5px]`}></h6>
                <div className={`h-[350px] bg-[#E5E4E2] md:h-[320px] w-full mt-[10px] rounded-[5px]`} ></div>
                <p className={`flex items-center gap-[10px] mt-[10px]`}><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px] `}></span><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px]`}></span></p>
                <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[10px] `}></p>
                <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[10px] `}></p>
              </div>
            )
          })}
          <div className='flex gap-[15px] justify-between'>
            <div className='flex-[0_0_calc(65%_-_10px)]'>
              <p className={`flex items-center gap-[10px] mt-[10px]`}><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px] `}></span><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px]`}></span></p>
              <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
              <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
              <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[15px] `}></p>
            </div>
            <div className='flex-[0_0_calc(35%_-_10px)] bg-[#E5E4E2] h-[90px] rounded-[5px]'></div>
          </div>
        </div>
        <div className={`overflow-auto customScroll rounded-[5px] flex-[0_0_calc(33%_-_10px)] md:basis-full border p-5 md:p-[10px] lg:h-[640px]`}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((res, index) => {
            return (
              <div key={index} className='flex gap-[15px] justify-between border_bottom mb-[15px] pb-[15px]'>
                <div className='flex-[0_0_calc(65%_-_10px)]'>
                  <p className={`flex items-center gap-[10px] mt-[10px]`}><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px] `}></span><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px]`}></span></p>
                  <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
                  <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
                  <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[15px] `}></p>
                </div>
                <div className='flex-[0_0_calc(35%_-_10px)] bg-[#E5E4E2] h-[90px] rounded-[5px]'></div>
              </div>
            )
          })}
        </div>
        <div className='flex-[0_0_calc(25%_-_10px)] '>
          
          <div className='border rounded-[5px] p-[15px] lg:h-[615px]'>
            {[0, 1, 2, 3].map((res, i) => {
              return (
                <div key={i} className='flex items-center gap-[15px] justify-between border_bottom mb-[15px] pb-[15px]'>
                  <div className='flex-[0_0_calc(40%_-_10px)]'>
                    <div className='w-full bg-[#E5E4E2] h-[100px] rounded-[5px]'></div>
                  </div>
                  <div className='flex-[0_0_calc(65%_-_10px)]'>
                    <p className={`bg-[#E5E4E2] h-[8px]  w-[100px] rounded-[5px]  mt-[10px] `}></p>
                    <p className={`bg-[#E5E4E2] h-[8px]  w-[160px] rounded-[5px]  mt-[5px] `}></p>
                    <p className={`bg-[#E5E4E2] h-[6px]  w-[160px] rounded-[5px]  mt-[5px] `}></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div> */}

      {/* <div className='flex gap-[15px] justify-between my-5 items-center'>
        <div className='lg:w-[calc(75%_-_15px)]'>
          <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
          <div className=' flex gap-[20px] overflow-auto scroll-smooth scrollbar-hide'>
            {[0, 1, 2, 3, 4].map(index => {
              return (
                <div key={index} className='border rounded-[10px] h-[280px] flex-[0_0_calc(20%_-_10px)]'>
                  <div className='bg-[#E5E4E2] h-[200px] w-full rounded-[5px_5px_0_0]'></div>
                  <div className='p-[10px]'>
                    <p className='flex gap-[10px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
                    <p className={`bg-[#E5E4E2] h-[8px] w-[220px] my-[10px] rounded-[5px]`}></p>
                    <p className={`bg-[#E5E4E2] h-[8px] w-[220px] mb-[10px] rounded-[5px]`}></p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className='lg:w-[calc(25%_-_15px)]'>
          <div className='bg-[#E5E4E2] h-[280px] w-full rounded-[5px]'></div>
        </div>
      </div> */}

      {/* <div>
        <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
        <div className='flex items-center gap-[15px]'>
          {[0, 1, 2, 3].map(index => {
            return (
              <div key={index} className=' h-[280px] flex-[0_0_calc(25%_-_10px)]'>
                <div className='bg-[#E5E4E2] h-[200px] w-full rounded-[5px]'></div>
                <div className='p-[10px]'>
                  <p className={`bg-[#E5E4E2] h-[8px] w-full my-[10px] rounded-[5px]`}></p>
                </div>
              </div>
            )
          })}
        </div>
      </div> */}

      {/* <div className='flex items-center gap-[15px]'>
        <div className='flex-[0_0_calc(75%_-_15px)]'>
          <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
          {[0, 1, 2].map(index => {
            return (
              <div key={index} className='flex items-center border_bottom pb-[15px] mb-[15px]'>
                <div className='bg-[#E5E4E2] h-[170px] flex-[0_0_calc(30%_-_10px)] w-full rounded-[5px]'></div>
                <div className='p-[10px]'>
                  <p className='flex gap-[10px] mb-[20px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
                  <p className={`bg-[#E5E4E2] h-[8px] w-[380px] my-[10px] rounded-[5px]`}></p>
                  <p className={`bg-[#E5E4E2] h-[8px] w-[240px] mb-[20px] rounded-[5px]`}></p>
                  <p className={`bg-[#E5E4E2] h-[8px] w-[380px] mb-[10px] rounded-[5px]`}></p>
                  <p className={`bg-[#E5E4E2] h-[8px] w-[240px] mb-[10px] rounded-[5px]`}></p>
                </div>
              </div>
            )
          })}
        </div>
        <div className='flex-[0_0_calc(25%_-__10px)]'>
          <div className='bg-[#E5E4E2] h-[600px] w-full rounded-[5px]'></div>
        </div>
      </div> */}

    </div>
  )
}


export async function getStaticProps() {
  // page_content
  const param = {
    // "application_type": "mobile",
    "route": "home",
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





