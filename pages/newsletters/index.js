// import NewsLetterBuilder from '@/components/Builders/NewsLetterBuilder'
import RootLayout from '@/layouts/RootLayout'
import React, { useState, useEffect } from 'react'
import NewsList from '@/components/Newsletter/NewsList';
import Title from '@/components/common/Title';
import AdsBaner from '@/components/Baners/AdsBaner';
import Advertisement from '@/components/Baners/Advertisement';
import Subscribe from '@/components/Landing/Subscribe';
import { checkMobile, stored_customer_info, getAdvertisements, check_Image, newsLetterLanding, newsLanding, get_newsletter_by_id } from '@/libs/api';
import SubscribeNews from '@/components/Newsletter/SubscribeNews';
import AlertUi from '@/components/common/AlertUi';
import SEO from '@/components/common/SEO'
import { useSelector, useDispatch } from 'react-redux';
import SectionBox from '@/components/Category/SectionBox';
import CustomSlider from '@/components/Sliders/CustomSlider';
import Image from 'next/image';
import { useRouter } from 'next/router';
import NewsDetail from '@/components/Newsletter/NewsDetail';

export default function newsletter({ ads }) {

  const [isMobile, setIsMobile] = useState();
  let [data, setData] = useState();
  // let [localValue, setLocalValue] = useState(undefined);
  let [skeleton, setSkeleton] = useState(true);
  let [isLoggedIn, setIsLoggedIn] = useState(false);
  const user = useSelector(s => s.user);
  const router = useRouter()

  useEffect(() => {
    // setSkeleton(true);
    if (typeof window != 'undefined') {
      if (localStorage['apikey']) {
        setIsLoggedIn(true)
      } else {
        setIsLoggedIn(false)
      }
      newsLanding_info();
      getNewsLetters()
    }
    checkIsMobile();
    // let localValue = stored_customer_info()
    // setLocalValue(localValue);
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [user])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);
  }

  const [alertMsg, setAlertMsg] = useState({})
  const [enableModal, setEnableModal] = useState(false)

  async function newsLanding_info() {
    let value = await newsLetterLanding();
    let news = value.message
    setData(news);
    setSkeleton(false);
  }

  const [news, setNews] = useState()
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

  // function hide(obj) {
  //   if (obj.status == 'Success') {
  //     setAlertMsg({ message: 'You have successfully subscribed to our newsletter' });
  //     setEnableModal(true);
  //   }
  // }

  async function closeModal(value) {
    setEnableModal(false);

    
  }

  const [showAlert, setShowAlert] = useState(false);

  async function showPopup(obj, index) {
    // console.log(data);

    let get_check = data.filter(res => { return res.selected == 1 })

    if (get_check.length == data.length) {
      setAlertMsg({ message: 'Already you have subscribed all the Newsletters' });
      setEnableModal(true);
    } else {
      data.map((res, i) => {
        if (i == index) {
          res.selected = 1;
        } else {
          res.selected = 0;
        }
      })
      // setNews(obj);
      setShowAlert(true);
      show();
    }


  }

  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  function hide(obj) {
    setVisible(false);
    if (obj.status == 'Success') {
      setAlertMsg({ message: 'You have successfully subscribed to our newsletter' });
      setEnableModal(true);
    }
  }

  const [newsDetail,setNewsDetail] = useState(false)
  const[detail,setDetail] = useState()
  const navigate = (res) => {
    // console.log(res)
    if(isMobile){
      getNewsDetail(res.name)
    }else{
      const route1 = window.location.origin + ('/' + res.route.split('/')[0] + '/' + res.title + '/' + res.route.split('/')[1]) // Replace with your route
      window.open(route1, '_blank');
    }
  }

  function hideDetail() {
    setNewsDetail(false);
    document.body.style.overflow="auto"
  }

  const getNewsDetail = async (id)=>{
    let param = {
      name: id,
    }
  
    const resp = await get_newsletter_by_id(param);
    const data = resp.message;
    if(data.message){
      setDetail(data)
      setNewsDetail(true)
      document.body.style.overflow="hidden"
    }
  }

  return (
    <>

      {enableModal && <AlertUi isOpen={enableModal} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />}
      {visible && <SubscribeNews data={news} visible={visible} hide={(obj) => hide(obj)} />}
      {newsDetail && <NewsDetail data={detail} visible={newsDetail} hide={hideDetail} />}
      <RootLayout homeAd={ads ? ads : null} isLanding={true} head={'Newsletters'} adIdH={'news-head'} adIdF={'news-foot'}>
        {/* {!skeleton && localValue && !localValue['cust_name'] &&  */}
        <SEO title={'Newsletters'} siteName={'India Retailing'} description={'Newsletters'} />

        {!isLoggedIn && <>
          {skeleton ? <SkeletonLoader /> :
            <div className='lg:min-h-[250px]'>
              <SEO title={'Newsletters'} siteName={'India Retailing'} description={'Newsletters'} />
              {(news) && <div className='container p-[30px_0px] md:p-[15px] '>
                <div className='md:hidden text-center'><Title data={{ title: 'Newsletters' }} /></div>
                <div className='lg:flex md:flex-wrap justify-between gap-[20px]'>
                  <div className={`flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_calc(100%_-_0px)] ${isMobile ? '' : 'border p-[20px] rounded-[5px]'} `}>
                    <NewsList navigate={navigate} data={news} />
                  </div>

                  {!isMobile &&
                    <div className='flex-[0_0_calc(30%_-_15px)] md:mt-[15px] md:flex-[0_0_calc(100%_-_0px)]'>
                      <div className='pb-[20px]'>
                        <Advertisement adId={'right_first'} divClass={'h-[250px] w-[300px] m-auto'} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} data={(ads.right_first && Object.keys(ads.right_first).length != 0) && ads.right_first} />
                      </div>
                      <Subscribe />
                    </div>
                  }

                </div>


              </div>}
            </div>
          }
        </>}



        {isLoggedIn && <div className={`md:p-[15px_10px]  ${isMobile ? '' : 'container p-[30px_0px]'}`}>
          {/* <div className='container  md:p-[15px] '> */}
          <div className='md:hidden text-center'><Title data={{ title: 'Newsletters' }} /></div>
          {/* <Title data={{ title: 'Categories' }} font={'20px'} className='md:hidden' title_class='md:hidden' /> */}
          {(data && data.length != 0) ? data.map((res, index) => {
            return (
              <div key={index} className={`block md:mb-[10px] p-[15px] lg:mr-[15px] ${index == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} border rounded-[5px] `}>
                {/* lg:w-[calc(20%_-_10px)] md:w-[calc(100%_-_0px)] */}
                <div className={`flex items-center justify-between lg:px-[20px]`} >
                  <div className='w-full'>
                    <h6 className={`lg:text-[20px] md:text-[15px] text-center line-clamp-[2] pb-[5px] font-[700] cursor-pointer`} >{res.category}</h6>
                    <p className={`sub_title line-clamp-[4] mb-[5px] cursor-pointer text-center w-[60%] m-[auto]`}>{res.description}</p>
                  </div>

                  <div className='flex-[0_0_auto] flex gap-[15px] items-center'>
                    {!res.is_subscribed ? <>
                      <button style={{ borderRadius: '5px' }} onClick={() => showPopup(res, index)} className='primary_btn my-3 text-[14px] block h-[35px] w-[100px]'>Subscribe</button>
                    </> : <></>}

                    <p className='flex gap-[5px] md:justify-center items-center cursor-pointer ' onClick={() => router.push(`/newsletters/${res.day}`)}><span className='text-gray font-medium	 md:text-[12px]'>View All</span><Image className='img md:h-[14px] md:w-[14px]' src={'/categories/arrowright.svg'} alt='arrow' height={16} width={16} /></p>
                  </div>
                </div>
                {/* lg:w-[calc(80%_-_10px)]  md:p-[10px] */}
                <div className='lg:w-[97%] lg:m-[auto] py-[15px]'>
                  <CustomSlider navigate={navigate} newsletter={true} parent={res} data={res.data} cardClass={'lg:h-[280px]  md:h-[235px]  flex-[0_0_calc(20%_-_16px)] bg-white md:flex-[0_0_calc(65%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'}
                    slider_id={"slider_id" + index} slider_child_id={"slider_child_id" + index} subtitle_class={'hidden'} hashtags_class={'hidden'} primary_text_class={''} />
                </div>
              </div>
            )
          }) : <></>}

        </div>}

        {/* }
       {!skeleton && localValue && localValue['cust_name'] && 
         <SubscribeNews cssClass={'lg:w-[50%] lg:m-[0_auto] md:pb-[15px]'} data={data} no_modal={true} hide={(obj)=> hide(obj)}/>
       } */}
      </RootLayout>
    </>
  )
}


export async function getStaticProps() {
  // let param = {
  //   fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
  // }

  // if(localStorage['userid'] && localStorage['userid'] != ''){
  //   arg.email = localStorage['userid']
  // }

  // let value = await newsLanding(param);


  // let value = await newsLetterLanding();
  // let data = value.message


  let ads_param = { page: 'Newsletters', page_type: 'Landing' }
  const resp = await getAdvertisements(ads_param);
  const ads = resp.message;
  return {
    props: { ads }, revalidate: 50,
  }
}


const SkeletonLoader = () => {
  return (
    <div className={'container p-[30px_0px] md:p-[15px] '}>

      <h6 className='h-[20px] w-[120px] bg-slate-200 rounded-[5px] mb-3'></h6>


      <div className='flex gap-[10px] '>
        <div className={'flex-[0_0_calc(70%_-_0px)] md:flex-[0_0_calc(100%_-_0px)] border p-[20px] rounded-[5px]'}>
          {[1, 2, 3, 4, 5].map((res, index) => {
            return (
              <>
                <div className='animate-pulse gap-[10px] flex p-[10px] cursor-pointer items-center border-b-[1px] border-b-slate-100 last-child:border-b[0px]'>
                  <div className={'h-[100px] w-[100px] bg-slate-200 rounded-[5px]'}></div>
                  <div className='w-full'>
                    <h6 className='h-[15px] w-[50%] bg-slate-200 rounded-[5px]'></h6>
                    <h6 className='h-[20px] w-[70%] bg-slate-200 rounded-[5px] my-[7px]'></h6>
                    <h6 className='h-[15px] w-[90%] bg-slate-200 rounded-[5px]'></h6>
                  </div>
                </div>
              </>
            )
          })
          }
        </div>

        <div className={'flex-[0_0_calc(30%_-_10px)]'}>
          <div className={'w-[380px] h-[316px] bg-slate-200 rounded-[5px]'}></div>
        </div>
      </div>
    </div>

  )
}

// export async function getServerSideProps() {
//   let param = {
//     fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
//   }
//   let value = await newsLanding(param);
//   let data = value.message;

//   return {
//     props: { data }
//   }
// }