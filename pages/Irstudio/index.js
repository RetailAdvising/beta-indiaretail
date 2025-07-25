
import { useEffect, useState, useRef, useCallback } from 'react'
import RootLayout from '@/layouts/RootLayout';
import { getAdvertisements, getCategoryList, checkMobile, check_Image, getIrstudioList } from '@/libs/api';
import SectionBox from '@/components/Category/SectionBox';

import SEO from '@/components/common/SEO'
import CustomSlider from '@/components/Sliders/CustomSlider';

export default function Irstudio({ data }) {
    let [isMobile, setIsMobile] = useState(false)
    const [datas, setDatas] = useState([])
    const [ads,setAds] = useState()
    useEffect(() => {
        // console.log(data);
        if (data && data.length != 0) {
            setTimeout(() => {
                setDatas(data)
            }, 200);
        }
        getAds()
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const getAds = async () => {
        let param = { page: 'Categories', page_type: 'Landing' }
        const resp = await getAdvertisements(param);
        if(resp.message){
            // const ads = resp.message;
            setAds(resp.message)
        }
    }

    const checkIsMobile = async () => {
        let is_Mobile = await checkMobile();
        isMobile = is_Mobile
        setIsMobile(isMobile);
    }

    // let page_no = 1;
    let cardref = useRef(null);
    let [pageNo, setPageNo] = useState(1)
    let [loading, setLoading] = useState(false);
    let [noProduct, setNoProduct] = useState(false);
   

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
    //   getPageData()

      
    }
  }, [pageNo]);





    const getPageData = async () => {
        // console.log('load...',)
        // setLoading(true)
        let params = {
            "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", 'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route"], "page_no": pageNo, "records": 10, "category_count": 5
        }
        const resp = await getCategoryList(params);

        if (resp.message && resp.message && resp.message.length != 0) {
            setTimeout(() => {
                setDatas(d => d = [...d, ...resp.message])
                setLoading(false)
            }, 400);
        } else {
            

            noProduct = true;
            setNoProduct(noProduct)
        }
    }


    return (
        <>
            
            <RootLayout ad_payload={{ page: 'Categories', page_type: 'Landing' }} homeAd={ads ? ads : null} adIdH={'category-head'} adIdF={'category-foot'} head={'Categories'} isLanding={true}>
                <SEO title={'Categories'} siteName={'India Retailing'} description={'Categories'} />

                <div className={`md:p-[15px_10px]  ${isMobile ? '' : 'container'}`}>
                    {/* <Title data={{ title: 'Categories' }} font={'20px'} className='md:hidden' title_class='md:hidden' /> */}
                    {(datas && datas.length != 0) ? datas.map((res, index) => {
                        return (
                            <div key={index} ref={datas.length === index + 2 ? lastPostElementRef : null} className={`block md:mb-[10px] p-[15px] lg:mr-[15px] ${index == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} border rounded-[5px] `} style={{ backgroundImage: `url(${check_Image(res.background_image)})`, backgroundRepeat: 'no-repeat' }}>
                                {/* lg:w-[calc(20%_-_10px)] md:w-[calc(100%_-_0px)] */}
                                <div className={``} ><SectionBox data={res} /></div>
                                {/* lg:w-[calc(80%_-_10px)]  md:p-[10px] */}
                                <div className='lg:w-[97%] lg:m-[auto] py-[15px]'>
                                    <CustomSlider data={res.events} cardClass={'lg:h-[280px]  md:h-[235px]  flex-[0_0_calc(20%_-_16px)] bg-white md:flex-[0_0_calc(65%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'}
                                        slider_id={"slider_id" + index} slider_child_id={"slider_child_id" + index} subtitle_class={'hidden'} hashtags_class={'hidden'} primary_text_class={''} />
                                </div>
                            </div>
                        )
                    }) : <Skeleton />}

                    {/* <div className='more lg:hidden md:h-[80px]' ref={cardref}></div>
                    {loading && <div id="wave">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>} */}
                    {!datas?.length && <Skeleton type='' />}
                </div>
            </RootLayout>
        </>
    )
}



export async function getStaticProps() {
    // let params = {
    //     "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", 'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route", "background_color"], "page_no": 1, "records": 10, "category_count": 5
    // }
    const res = await getIrstudioList();
    const data = res.message;

    // let param = { page: 'Categories', page_type: 'Landing' }
    // const resp = await getAdvertisements(param);
    // const ads = resp.message;
    return {
        props: { data }, revalidate: 50,
    }
}

const Skeleton = () => {
    return (
        <>
            <div className='my-5 container'>
                {[0, 1, 2, 3, 4].map((res, i) => {
                    return (
                        <div key={i} className={`block md:mb-[10px] m-[auto] p-[15px] w-[97%] ${i == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} border rounded-[5px] `}>
                            <div className='text-center my-[15px] grid place-content-center gap-[10px]'>
                                <p className='bg-[#E5E4E2] h-[8px] w-[150px]'></p>
                                <p className='bg-[#E5E4E2] h-[5px] w-[300px]'></p>
                            </div>
                            <div className=' flex gap-[20px] overflow-auto scroll-smooth scrollbar-hide md:p-[10px]'>
                                {[0, 1, 2, 3, 4].map(index => {
                                    return (
                                        <div key={index} className='border rounded-[10px] h-[280px] flex-[0_0_calc(20%_-_15px)]'>
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
                    )

                })}

                <div></div>

            </div>

        </>
    )
}
