'use client'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect, useMemo } from 'react'
import { articlesDetail, getList, commentList, update_no_of_shares, get_subscription_plans, getAdvertisements, seo_Image, getCurrentUrl } from '@/libs/api';
import CategoryBuilder from '@/components/Builders/CategoryBuilder';
import { useRouter } from 'next/router';
import Advertisement from '@/components/Baners/Advertisement'
import { useSelector } from 'react-redux';
import Head from 'next/head'
// import { NextSeo } from 'next-seo'
export default function Details({ data, page_route }) {
  const router = useRouter();
  // console.log(router,"router")
  const [values, setValues] = useState([])
  const [prev, setPrev] = useState('')
  const [pagination, setPagination] = useState(true);
  const [advertisement, setAds] = useState();
  const [pageNo, setPageNo] = useState(1);
  const [meta_info, setMetaInfo] = useState();
  const [comments, setComments] = useState([]);
  const [scrollEle, setScrollEle] = useState(true)

  const generateMetaData = (data) => {
  }

  const meta_inf = useMemo(() => generateMetaData(meta_info), [meta_info])

  // const meta_inf0s = useMemo(() => generateMetaData(comments), [comments])

  let page_no = 1;
  let [divs, setDivs] = useState(['div0']);
  let [routeList, setRouteList] = useState([])

  const articleDetail = async (route) => {
    // console.log(route,'route')
    // console.log(page_route,'page_route')
    if (router.query && router.query?.detail && typeof window !== 'undefined') {
      let Id = route ? route : page_route
      values.length = 0
      setValues(values)
      // let Id = await router.query?.detail;
      let param = {
        "route": Id,
        // "category": category,
        "next": 0
      }
      let value = await articlesDetail(param);
      let data = await value.message;
      if (data.status == "Success") {
        if (data && data._user_tags && data._user_tags != '') {
          let tags = data._user_tags.split(',');
          tags.splice(0, 1);
          data._user_tags = tags
        } else {
          // data._user_tags = [];
          data ? data._user_tags = [] : null;
        }
        if (router.query.preview != 'true') {
          routeList.push(data.route)
          setRouteList(routeList)
        }
        setMetaInfo(data)
        page_no += 1;
        setPageNo(pageNo + 1)
        // let val = [data]
        // setValues(d => [...d, ...val])
        // if(!values.some(art => art.name === data.name)){
        //   values.push(data)
        //   setValues(values)
        // }

        setValues((prevValues) => {
          // Check if the item already exists based on the name
          if (!prevValues.some(art => art.name === data.name)) {
            return [...prevValues, data]; // Add the new item if it doesn't exist
          }
          return prevValues; // Return previous values if duplicate
        });

        setPrev(route ? route : page_route)
        commentslist(data)
        if (!data.is_member && data.ir_prime == 1) {
          // if (data.is_member == 0) {
          getMembershipPlans();
        }
      }
    }
    // console.log('sad'+val)
  }

  const ads = async () => {
    // let param = { doctype: 'Articles', page_type: 'Detail' }
    // const resp = await getAds(param);
    // const ads = resp.message;
    // setAds(ads)

    let param = { page: 'Categories', page_type: 'Detail' }
    const resp = await getAdvertisements(param);
    const ads = resp.message;
    setAds(ads)
  }

  // console.log(data,'meta')


  const user = useSelector(s => s.user);


  useEffect(() => {
    // window.addEventListener("scroll", call_observer)
    if (typeof window !== 'undefined' && !localStorage['apikey']) {
      articleDetail(undefined);

    }
    ads();

    // console.log(user, 'user')



    // checkIsMobile();
    // window.addEventListener('resize', checkIsMobile)
    // return () => {
    //   window.removeEventListener('resize', checkIsMobile);
    // };

  }, [])

  const role = useSelector(s => s.role);
  useEffect(() => {
    if (typeof window !== 'undefined' && localStorage['apikey']) {
      if (role) { 
        setValues([])
        setPageNo(1)
        setComments(prevValues=>{
          prevValues = [...[]]
          return prevValues
        })
        articleDetail(undefined);

        if (typeof window !== 'undefined' && localStorage['roles'] && localStorage['roles'] != '') {
          values.map(res => {
            res.ir_prime = 1;
          })
          setValues(values);
        }
      }
    }
  }, [role])

  useMemo(()=>{
    if(comments && comments.length > 0){
      console.log(comments,"comments")
    }
  },[comments])

  // const [isMobile, setIsMobile] = useState()

  // const checkIsMobile = async () => {
  //   let isMobile = await checkMobile();
  //   setIsMobile(isMobile);
  // }





  async function loadMore() {
    // console.log(router);
    let param = {
      "route": prev,
      // "category": router.query?.types,
      "next": 1,
    }

    if (pagination && pageNo <= 5 && router.query.preview != 'true') {
      let value = await articlesDetail(param);
      let data = value.message;
      // console.log(data)
      if (data && data.status == "Success") {
        routeList.push(data.route)
        setRouteList(routeList)
        setPrev(data.route)
        page_no += 1;
        setPageNo(pageNo + 1)
        commentslist(data)
        let val = data
        // router.replace(`/categories/${router.query.types}/${data.name}`)
        // if (val && val[0] && val[0]._user_tags && val[0]._user_tags != '') {
        //   let tags = val[0]['_user_tags'].split(',');
        //   tags.splice(0, 1);
        //   val[0]._user_tags = tags
        // } else {
        //   val[0]._user_tags = [];
        // }

        if (val && val._user_tags && val._user_tags != '') {
          let tags = val['_user_tags'].split(',');
          tags.splice(0, 1);
          val._user_tags = tags
        } else {
          val._user_tags = [];
        }
        // if(!values.some(art => art.name === val.name)){
        //   values.push(data)
        //   setValues(values)
        // }
        setValues((prevValues) => {
          // Check if the item already exists based on the name
          if (!prevValues.some(art => art.name === val.name)) {
            return [...prevValues, val]; // Add the new item if it doesn't exist
          }
          return prevValues; // Return previous values if duplicate
        });

        // values.push(val)
        // // setValues(d => d = [...d, ...val]);
        // setValues(values);
        divs.push('div' + divs.length)
        setDivs(divs)
      } else {
        setPagination(!pagination)
      }
    }

  }


  useEffect(() => {
    // Event listener to track scroll events

    const handleScroll = () => {
      if (scrollEle) {
        // console.log(scrollEle, 'scrollele')
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;

        for (const divId of divs) {

          const div = document.getElementById(divId);

          if (!div) continue;

          const divTop = div.getBoundingClientRect().top;
          const divBottom = div.getBoundingClientRect().bottom;

          if (divTop < windowHeight / 2 && divBottom > windowHeight / 2) {
            let ind = divId.replace('div', '')
            ind = Number(ind);

            setTimeout(() => {
              if (routeList && routeList.length > 0 && routeList[ind]) {
                // console.log(routeList)
                // router.push('/' + routeList[ind], undefined, { scroll: false });
                router.replace({ pathname: '/' + routeList[ind] }, undefined, { shallow: true, scroll: false });
                // let val = document.getElementById('target' + divId[divId.length - 1])
                // val?.classList.remove('sticky', 'top-0', 'z-10','bg-white','h-[calc(100vh_-_10px)]','overflow-auto','scrollbar-hide')
                // generateMetaData(values[ind])
                if (values && values.length > 0 && values[ind]) {
                  data['meta_title'] = values[ind]['meta_title']
                  data['meta_image'] = values[ind]['meta_image']
                  data['meta_description'] = values[ind]['meta_description']
                  setMetaInfo(values[ind]);
                  // console.log(ind)
                  // document.title = values[ind].meta_title ? values[ind].meta_title : 'Updated Title';
                  // document.querySelector('meta[name="description"]').setAttribute('content', 'updated description');
                }
              }
            }, 300)
            break;
          }

        }
      }
    };



    if (router && router.query && router.query.preview != 'true') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }


  }, [scrollEle]);

  const noScroll = (val) => {
    // console.log('triggered....',val)
    setScrollEle(val);
  }



  const productNavigation = (obj) => {
    // console.log(obj)
    router.replace({ pathname: '/' + obj }, undefined, { shallow: false, scroll: true });
    routeList.length = 0
    setRouteList(routeList)
    setPageNo(1);
    setValues([]);
    articleDetail(obj);
    //  window.scrollTo(0, 0);
  }



  const [pageno, setPageno] = useState(1)

  async function commentslist(data) {
    let param = { ref: data.name, page_no: pageno, page_size: 25 };
    let resp = await commentList(param);
    if (resp.message && resp.message.length != 0) {
      const val = { data: resp.message, route: data.name }
      // data.comments = val;
      // comments.push(val);
      // setComments(comments)

      // if (!comments.some(comment => comment.route === val.name)) {
      //   comments.push(val);
      //   setComments([...comments]); // Spread operator to create a new array for reactivity
      // }

      setComments((prevValues) => {
        // Check if the item already exists based on the name
        if (!prevValues.some(comment => comment.route === val.name)) {
          return [...prevValues, val]; // Add the new item if it doesn't exist
        }
        return prevValues; // Return previous values if duplicate
      });

      // comment.push(val);
      // dispatch(setComments)
      // setComments(resp.message);
      // setTimeout(() => {
      //     setNoData(false)
      // }, 200);
    } else {
      const val = { data: [], route: data.name }
      // data.comments = val;
      // comments.push(val);
      // setComments(comments)

      setComments((prevValues) => {
        // Check if the item already exists based on the name
        if (!prevValues.some(comment => comment.route === val.name)) {
          return [...prevValues, val]; // Add the new item if it doesn't exist
        }
        return prevValues; // Return previous values if duplicate
      });
      // setTimeout(() => {
      //     setNoData(false)
      // }, 200);
    }
  }



  const updatedCmt = (cmt, route, index) => {
    if (comments && comments.length != 0) {
      comments.map(async (res, i) => {
        if (res.route == route) {
          let param = { ref: route, page_no: 1, page_size: 10 };
          let resp = await commentList(param);
          if (resp.message && resp.message.length != 0) {
            const val = { data: resp.message, route: res.route }
            comments.splice(i, 1, val);
            setComments(comments)
          }
        }
      })
    }
  }

  const updateShare = async (data) => {
    // console.log(data,'share');
    const param = {
      doc_id: data.name,
      doctype: 'Articles'
    }

    const resp = await update_no_of_shares(param);
    if (resp.message == 'Success') {
      // console.log(resp)

    }
  }

  const [plans, setPlans] = useState([])

  const getMembershipPlans = async () => {
    let data = { "plan_type": "Month", "res_type": "member" }
    const resp = await get_subscription_plans(data);
    if (resp && resp.message && resp.message.status && resp.message.status == 'success') {
      // console.log(resp)
      if (resp.message.message && resp.message.message.length != 0 && resp.message.message[0]) {
        // plans.push(resp.message.message[0].features)
        setPlans(resp.message.message[0].features)
      }
    }
  }


  return (
    <>
      <RootLayout isLanding={true} is_detail={true} adIdH={router.query.deatil + 'aH'} adIdF={router.query.deatil + 'aF'} homeAd={advertisement ? advertisement : null} head={''}>
        <Head>
          <title key="title">{data?.meta_title}</title>
          <meta name="description" content={data?.meta_description} />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
          <meta name="theme-color" content="#e21b22" />
          <meta property="og:type" content={'Article'} />
          <meta property="og:title" content={data?.meta_title} />
          <meta property="og:description" content={data?.meta_description} />
          <meta property="og:url" content={getCurrentUrl(router.asPath)}></meta>
          <meta property="og:locale" content="en_IE" />
          {/* <meta property="og:site_name" content={'IndiaRetailing'} />
         
          <meta property="og:site_name" content={'IndiaRetailing'} /> */}
          <meta

            property="og:image"
            itemprop="image"
            content={seo_Image(data.meta_image ? data.meta_image : data.thumbnail_imagee)}
          />
          <meta

            property="og:image:alt"
            content={`${data?.meta_title} | ${'IndiaRetailing'}`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />

          <meta name="robots" content="index,follow" />

          <meta

            name="twitter:card"
            content="summary_large_image"
          />
          <meta

            name="twitter:site"
            content={'@d__indiaRetail'}
          />
          <meta

            name="twitter:creator"
            content={'@d__indiaRetail'}
          />
          <meta property="twitter:image" content={seo_Image(data.meta_image ? data.meta_image : data.thumbnail_imagee)} />
          <meta

            property="twitter:title"
            content={data?.meta_title}
          />
          <meta property="twitter:url" content={getCurrentUrl(router.asPath)}></meta>
          <meta

            property="twitter:description"
            content={data?.meta_description}
          />



          {/* <link rel="canonical" href={'https://indiaretail.vercel.app/'} /> */}

          <link rel="shortcut icon" href="/ir_2023.png" />
        </Head>
        {(values && values.length != 0) ? <>
          {/* <Adsense adSlot="/21631575671/New-IndiaRetailing-Home-Top-728x90" adClient="ca-pub-9354161551837950" adStyle={{ display: "inline-block", width: "728px", height: "90px" }} /> */}
          {values.map((res, index) => {
            return (
              <div id={'div' + index} key={index + 'aertind'} className={`box ${'div' + index}`} >
                {/* <SEO title={res.meta_title ? res.meta_title : res.title} ogImage={check_Image(res.meta_image ? res.meta_image : res.image)} siteName={'India Retailing'} ogType={res.meta_keywords ? res.meta_keywords : res.title} description={res.meta_description ? res.meta_description : res.title} /> */}
                <CategoryBuilder ads_data={advertisement ? advertisement : null} productNavigation={(obj) => { productNavigation(obj) }} updateShare={(data) => updateShare(data)} isLast={index == values.length - 1} i={index} user={user} data={res} load={loadMore} comments={comments && comments.length != 0 ? comments : []} updatedCmt={(cmt, route, index) => updatedCmt(cmt, route, index)} noScroll={(val) => noScroll(val)} plans={(plans && plans.length != 0) ? plans : []} />
                <div className="md:hidden my-5 lg:grid lg:justify-center"><Advertisement adId={"divsad" + index} data={(advertisement && advertisement.footer) ? advertisement.footer : null} position={"high"} adPos={'footer'} divClass={'h-[90px] w-[728px] m-auto'} insStyle={"display:inline-block;width:728px;height:90px;"} /></div>
                {!(index == values.length - 1) && <div id={'div_next' + res.route} className={` lg:m-[20px_auto_0]  md:p-[10px_15px] lg:p-[15px 0] container`}>
                  <h6 className={`flex-[0_0_auto] lg:text-[18px] md:text-[14px] font-semibold pb-[10px]`}>Next Post</h6>
                  <div style={{ background: 'linear-gradient(90deg, #E21B22 0%, #E1252C 9.73%, #D8D8D8 10.3%, #D8D8D8 97.95%)' }} className='lg:bg-[#999] w-full h-[3px] md:bg-stone-200'></div>
                </div>}
              </div>
            )
          })}
        </> : <Skeleton />
        }
      </RootLayout >
    </>
  )
}




{/* <NextSeo
  title="Manage SEO in NextJS with Next SEO"
  description="Next SEO packages simplifies the SEO management in Next Apps with less configurations"
  canonical="www.example.com/next-seo-blog"
  openGraph={{
    type: 'article',
    article: {
      publishedTime: '2022-06-21T23:04:13Z',
      modifiedTime: '2022-01-21T18:04:43Z',
      authors: [
        'https://www.example.com/authors/@firstnameA-lastnameA',
        'https://www.example.com/authors/@firstnameB-lastnameB',
      ],
      tags: ['Tag A', 'Tag B', 'Tag C'],
    },
    url: 'www.example.com/next-seo-blog',
    images: {
      url: 'https://www.test.ie/images/cover.jpg',
      width: 850,
      height: 650,
      alt: 'Photo of text',
    },
    site_name: 'Next Blog'
  }}
/> */}

export async function getServerSideProps({ params }) {
  let page_route = await params?.detail;
  // let Id = 'beauty-wellness';
  let param = {
    doctype: "Articles",
    fields: ["name", "route", "title", "meta_title", "meta_description", "meta_keywords", "meta_image", "image", "published_on", "modified", "_user_tags"],
    filters: { "route": page_route }
  }

  let value = await getList(param);
  let data;
  if (value && value.message && value.message.length != 0) {
    data = value.message[0];
  } else {
    data = value
  }

  return {
    props: { data, page_route }
  }
}


const Skeleton = () => {
  return (
    <>
      <div className='lg:flex md:flex-wrap container justify-between p-[30px_0px] md:p-[20px_15px]'>
        <div className='flex-[0_0_calc(70%_-_10px)] md:overflow-hidden md:flex-[0_0_calc(100%_-_10px)]'>
          <div className='flex gap-[5px]'>
            {[0, 1, 2, 3].map((res, index) => {
              return (
                <p key={index} className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
              )
            })}
          </div>
          <p className='h-[20px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <div className='flex justify-between items-center'>
            <div className='flex gap-[10px]'>
              <p className='h-[40px]  w-[40px] rounded-full bg-[#E5E4E2]'></p>
              <p className='flex flex-col gap-[5px]'><span className='h-[15px] w-[80px] bg-[#E5E4E2]'></span><span className='h-[15px] w-[80px] bg-[#E5E4E2]'></span></p>
            </div>
            <p className='flex gap-[5px]'><span className='h-[20px] w-[20px] bg-[#E5E4E2]'></span><span className='h-[20px] w-[20px] bg-[#E5E4E2]'></span></p>
          </div>
          <p className='h-[20px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <p className='h-[400px]  w-full bg-[#E5E4E2]'></p>
          <p className='h-[20px] mt-[20px] w-full bg-[#E5E4E2]'></p>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((res, index) => {
            return (
              <p key={index} className='h-[20px] mt-[5px] w-full bg-[#E5E4E2]'></p>
            )
          })}
          <p className='flex justify-between'>
            <span className='h-[20px] mt-[10px] w-[130px] bg-[#E5E4E2]'></span>
            <span className='h-[20px] mt-[10px] w-[140px] bg-[#E5E4E2]'></span>
            <span className='h-[20px] mt-[10px] w-[120px] bg-[#E5E4E2]'></span>
          </p>
          <div className='flex justify-center my-5'>
            <p className='flex justify-center items-center gap-[10px]'>
              {[0, 1, 2, 3].map((res, index) => {
                return (
                  <span key={index} className='h-[40px] rounded-full mt-[10px] w-[40px] bg-[#E5E4E2]'></span>
                )
              })}
            </p>
          </div>
          <p className='h-[20px] mt-[10px] w-[100px] bg-[#E5E4E2]'></p>
          <div className='flex flex-col'>

            {[0, 1, 2].map((res, index) => {
              return (
                <div className='flex gap-[10px] mt-[10px]' key={index}>
                  <p className='h-[50px] rounded-full  w-[50px] bg-[#E5E4E2]'></p>
                  <div className='w-[80%]'>
                    <p className='h-[20px]  w-[120px] bg-[#E5E4E2]'></p>
                    <p className='h-[20px] mt-[5px] w-ful bg-[#E5E4E2]'></p>
                    <p className='flex gap-[10px] mt-[10px]'><span className='h-[20px]  w-[80px] bg-[#E5E4E2]'></span><span className='h-[20px]  w-[100px] bg-[#E5E4E2]'></span><span className='h-[20px]  w-[100px] bg-[#E5E4E2]'></span></p>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
        <div className='flex-[0_0_calc(30%_-_10px)] md:overflow-hidden md:mt-[20px] md:flex-[0_0_calc(100%_-_10px)]'>
          <p className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
          {[0, 1, 2].map((res, index) => {
            return (
              <div key={index} className='flex gap-[10px] mt-5'>
                <p className='h-[90px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                <p className='flex flex-col w-[65%] gap-[10px]'>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                </p>
              </div>
            )
          })}
          <p className='h-[250px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <p className='h-[15px] w-[100px] bg-[#E5E4E2]'></p>
          {[0, 1, 2].map((res, index) => {
            return (
              <div key={index} className='flex gap-[10px] mt-5'>
                <p className='h-[90px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                <p className='flex flex-col w-[65%] gap-[10px]'>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-full bg-[#E5E4E2]'></span>
                  <span className='h-[15px] w-[100px] bg-[#E5E4E2]'></span>
                </p>
              </div>
            )
          })}
          <p className='h-[600px] my-[20px] w-full bg-[#E5E4E2]'></p>
          <p className='h-[15px] mb-[20px] w-[100px] bg-[#E5E4E2]'></p>
          {[0, 1, 2, 3, 4].map((res, index) => {
            return (
              <div className='mb-[10px]' key={index}>
                <p className='flex gap-[10px]'><span className='h-[15px] w-[45px] bg-[#E5E4E2]'></span> <span className='h-[15px] w-[45px] bg-[#E5E4E2]'></span></p>
                <div className='flex items-center gap-[10px] mt-[10px]'>
                  <p className='h-[70px] w-[100px] rounded-[5px] bg-[#E5E4E2]'></p>
                  <p className='flex gap-[10px] flex-col w-[65%]'><span className='h-[15px] w-full bg-[#E5E4E2]'></span><span className='h-[15px] w-full bg-[#E5E4E2]'></span></p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cards */}
      <div className='container lg:px-[30px] md:px-[15px] md:mb-[20px] md:overflow-hidden flex justify-between gap-[15px]'>
        {[0, 1, 2, 3, 4].map((res, index) => {
          return (
            <div key={index} className='flex-[0_0_calc(20%_-_10px)]'>
              <p className='h-[140px] w-full bg-[#E5E4E2] rounded-[5px]'></p>
              <p className='flex my-[10px] flex-col gap-[5px]'><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span></p>
              <p className='flex my-[10px] flex-col gap-[5px]'><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span><span className='h-[15px] w-full bg-[#E5E4E2] rounded-[5px]'></span></p>
              <p className='h-[15px] w-[100px] bg-[#E5E4E2] rounded-[5px]'></p>
            </div>
          )
        })}
      </div>
    </>
  )
}

