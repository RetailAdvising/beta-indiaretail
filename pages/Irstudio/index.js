
// import { useEffect, useState, useRef, useCallback } from 'react'
// import RootLayout from '@/layouts/RootLayout';
// import { getAdvertisements, getCategoryList, checkMobile, check_Image, getIrstudioList } from '@/libs/api';
// import SectionBox from '@/components/Category/SectionBox';

// import SEO from '@/components/common/SEO'
// import CustomSlider from '@/components/Sliders/CustomSlider';

// export default function Irstudio({ data }) {
//     let [isMobile, setIsMobile] = useState(false)
//     const [datas, setDatas] = useState([])
//     const [ads,setAds] = useState()
//     useEffect(() => {
//         // console.log(data);
//         if (data && data.length != 0) {
//             setTimeout(() => {
//                 setDatas(data)
//             }, 200);
//         }
//         getAds()
//         checkIsMobile();
//         window.addEventListener('resize', checkIsMobile)
//         return () => {
//             window.removeEventListener('resize', checkIsMobile);
//         };
//     }, [])

//     const getAds = async () => {
//         let param = { page: 'Categories', page_type: 'Landing' }
//         const resp = await getAdvertisements(param);
//         if(resp.message){
//             // const ads = resp.message;
//             setAds(resp.message)
//         }
//     }

//     const checkIsMobile = async () => {
//         let is_Mobile = await checkMobile();
//         isMobile = is_Mobile
//         setIsMobile(isMobile);
//     }

//     // let page_no = 1;
//     let cardref = useRef(null);
//     let [pageNo, setPageNo] = useState(1)
//     let [loading, setLoading] = useState(false);
//     let [noProduct, setNoProduct] = useState(false);
   

//     const observer = useRef();
//   const lastPostElementRef = useCallback(
//     (node) => {
//       if (loading && noProduct) return;
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           setPageNo((prevPage) => prevPage + 1); // trigger loading of new posts by chaging page no
//         }
//       });

//       if (node) observer.current.observe(node);
//     },
//     [loading]
//   );

//   useEffect(() => {
//     if (pageNo > 1 && !noProduct) {
//       // console.log(pageNo,"pageNo")

//       setLoading(true);
//     //   getPageData()

      
//     }
//   }, [pageNo]);





//     const getPageData = async () => {
//         // console.log('load...',)
//         // setLoading(true)
//         let params = {
//             "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", 'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route"], "page_no": pageNo, "records": 10, "category_count": 5
//         }
//         const resp = await getCategoryList(params);

//         if (resp.message && resp.message && resp.message.length != 0) {
//             setTimeout(() => {
//                 setDatas(d => d = [...d, ...resp.message])
//                 setLoading(false)
//             }, 400);
//         } else {
            

//             noProduct = true;
//             setNoProduct(noProduct)
//         }
//     }


//     return (
//         <>
            
//             <RootLayout ad_payload={{ page: 'Categories', page_type: 'Landing' }} homeAd={ads ? ads : null} adIdH={'category-head'} adIdF={'category-foot'} head={'Categories'} isLanding={true}>
//                 <SEO title={'Categories'} siteName={'India Retailing'} description={'Categories'} />

//                 <div className={`md:p-[15px_10px]  ${isMobile ? '' : 'container'}`}>
//                     {/* <Title data={{ title: 'Categories' }} font={'20px'} className='md:hidden' title_class='md:hidden' /> */}
//                     {(datas && datas.length != 0) ? datas.map((res, index) => {
//                         return (
//                             <div key={index} ref={datas.length === index + 2 ? lastPostElementRef : null} className={`block md:mb-[10px] p-[15px] lg:mr-[15px] ${index == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} border rounded-[5px] `} style={{ backgroundImage: `url(${check_Image(res.background_image)})`, backgroundRepeat: 'no-repeat' }}>
//                                 {/* lg:w-[calc(20%_-_10px)] md:w-[calc(100%_-_0px)] */}
//                                 <div className={``} ><SectionBox data={res} /></div>
//                                 {/* lg:w-[calc(80%_-_10px)]  md:p-[10px] */}
//                                 <div className='lg:w-[97%] lg:m-[auto] py-[15px]'>
//                                     <CustomSlider data={res.events} cardClass={'lg:h-[280px]  md:h-[235px]  flex-[0_0_calc(20%_-_16px)] bg-white md:flex-[0_0_calc(65%_-_10px)]'} imgClass={'lg:h-[185px] md:h-[140px] w-full'}
//                                         slider_id={"slider_id" + index} slider_child_id={"slider_child_id" + index} subtitle_class={'hidden'} hashtags_class={'hidden'} primary_text_class={''} />
//                                 </div>
//                             </div>
//                         )
//                     }) : <Skeleton />}

//                     {/* <div className='more lg:hidden md:h-[80px]' ref={cardref}></div>
//                     {loading && <div id="wave">
//                         <span className="dot"></span>
//                         <span className="dot"></span>
//                         <span className="dot"></span>
//                     </div>} */}
//                     {!datas?.length && <Skeleton type='' />}
//                 </div>
//             </RootLayout>
//         </>
//     )
// }



// export async function getStaticProps() {
//     // let params = {
//     //     "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", 'image', "thumbnail_imagee as thumbnail_image", "articles_category", "route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description", "route", "background_color"], "page_no": 1, "records": 10, "category_count": 5
//     // }
//     const res = await getIrstudioList();
//     const data = res.message;

//     // let param = { page: 'Categories', page_type: 'Landing' }
//     // const resp = await getAdvertisements(param);
//     // const ads = resp.message;
//     return {
//         props: { data }, revalidate: 50,
//     }
// }

// const Skeleton = () => {
//     return (
//         <>
//             <div className='my-5 container'>
//                 {[0, 1, 2, 3, 4].map((res, i) => {
//                     return (
//                         <div key={i} className={`block md:mb-[10px] m-[auto] p-[15px] w-[97%] ${i == 0 ? 'lg:mb-[40px]' : 'lg:my-[35px]'} border rounded-[5px] `}>
//                             <div className='text-center my-[15px] grid place-content-center gap-[10px]'>
//                                 <p className='bg-[#E5E4E2] h-[8px] w-[150px]'></p>
//                                 <p className='bg-[#E5E4E2] h-[5px] w-[300px]'></p>
//                             </div>
//                             <div className=' flex gap-[20px] overflow-auto scroll-smooth scrollbar-hide md:p-[10px]'>
//                                 {[0, 1, 2, 3, 4].map(index => {
//                                     return (
//                                         <div key={index} className='border rounded-[10px] h-[280px] flex-[0_0_calc(20%_-_15px)]'>
//                                             <div className='bg-[#E5E4E2] h-[200px] w-full rounded-[5px_5px_0_0]'></div>
//                                             <div className='p-[10px]'>
//                                                 <p className='flex gap-[10px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
//                                                 <p className={`bg-[#E5E4E2] h-[8px] w-[220px] my-[10px] rounded-[5px]`}></p>
//                                                 <p className={`bg-[#E5E4E2] h-[8px] w-[220px] mb-[10px] rounded-[5px]`}></p>
//                                             </div>
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                         </div>
//                     )

//                 })}

//                 <div></div>

//             </div>

//         </>
//     )
// }
// 'use client'
import { useEffect, useState, useRef } from 'react'
import RootLayout from '@/layouts/RootLayout';
import List from '@/components/common/List';
import Cards from '@/components/common/Cards';
import { articlesList, checkMobile, getAdvertisements, getList } from '@/libs/api';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
import Tags from '@/components/common/Tags';
import ImageLoader from '@/components/ImageLoader';
import Link from 'next/link';

export default function Irstudio({ values, ads, Id,metaInfo }) {
    const router = useRouter();
    const [data, setData] = useState([]);

    // let apiCall = false;
    let page_no = 1;
    let cardref = useRef(null);
    let no_product = false;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(values);
        if (values) {
            setTimeout(() => {
                setData(values)
            }, 200);
        }

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            // console.log(entries[0].intersectionRatio,"entries[0].intersectionRatio")
            if (!no_product) {
                page_no = page_no + 1
                page_no > 1 ? loadMore() : null
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }

    }, [router.query, cardref]);

    async function loadMore() {
        setLoading(true)
        let Id = "ir-studio";
        let param = {
            // doctype: "Articles",
            category_route: "ir-studio",
            page_no: page_no,
            page_size: 13,
            // fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
            // filters: { articles_category: Id, ir_prime: 0, published: 1 }
        }
        let value = await articlesList(param);
        if (value && value.message.length != 0) {
            setData(d => d = Id == 'case-studies' ? [...d, ...value.message.message] : [...d, ...value.message]);
            // data = [...data,...value.message]
            setLoading(false)
            no_product = false;
        } else {
            no_product = true;
            setLoading(false)
        }

    }

    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }
    return (
        <>
            <RootLayout ad_payload={{ page: 'Categories', page_type: 'List' }} isLanding={false} homeAd={ads ? ads : null} adIdH={"ir-studio" + 'catH'} adIdF={"ir-studio" + 'catF'} head={"ir-studio"}>
                <SEO title={metaInfo && metaInfo.meta_title ? metaInfo.meta_title :  "ir-studio"} siteName={'India Retailing'} ogType={"ir-studio"} description={metaInfo && metaInfo.meta_description ? metaInfo.meta_description :"ir-studio"} keywords={metaInfo && metaInfo.meta_keywords ? metaInfo.meta_keywords :"ir-studio"} />
                <div className={`${isMobile ? 'md:p-[15px]' : 'container'}`} id='root' >
                    {(data && data.length != 0) ? <div className={`lg:flex lg:flex-wrap  lg:gap-[20px]`}>
                        <div className={`flex-[0_0_calc(65%_-_10px)]  md:flex-[0_0_calc(100%_-_10px)]`}>
                            {/* {!isMobile && <Title data={{ title: "ir-studio" }} />} */}
                            <div className={`${isMobile ? '' : 'border'} rounded-[10px] lg:min-h-[680px]  lg:p-[15px] cursor-pointer`}>{data && data.slice(0, 1).map((res, index) => {
                                return (
                                    // <div key={res.title ? res.title : index} onClick={() => router.push(`${Id == 'case-studies' ? '/p/' + res.route : '/' + res.route}`)} className={` pb-[10px]`}>
                                    <Link key={res.title ? res.title : index} href={`${Id == 'case-studies' ? '/p/' + res.route : '/' + res.route}`} className={` pb-[10px]`}>
                                        <h6 className={`lg:text-[18px] md:text-[16px] font-[700] nunito`}>{res.title}</h6>
                                        <ImageLoader style={`lg:h-[480px] md:h-[330px] w-full mt-[10px] rounded-[5px]`} src={res.image ? res.image : res.thumbnail_image ? res.thumbnail_image : res.meta_image ? res.meta_image : null} title={res.title ? res.title : 'indiaRetail'} />
                                        {/* <Image className={`h-[330px] w-full mt-[10px] rounded-[5px]`} src={check_Image(res.image ? res.image : res.thumbnail_image)} height={250} width={300} alt={res.title} /> */}
                                        {res.primary_text && <p className={`flex items-center pt-[10px]`}><span className={`primary_text pr-[10px] nunito`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#6f6f6f]'></span><span className={`secondary_text pl-[10px] nunito`}>{res.secondary_text}</span></p>}
                                        <p className={`sub_title line-clamp-2 pt-[10px]`}>{res.blog_intro ? res.blog_intro : res.meta_description ? res.meta_description : ''}</p>
                                        {/* <p className={`hashtags pt-[5px]`}>{res.publisher}</p> */}
                                        <Tags tags={res.tags} />
                                    </Link>
                                )
                            })}</div>
                        </div>
                        {/* lg:pt-[45px] */}
                        <div className={`lg:flex-[0_0_calc(35%_-_10px)]  md:pt-[20px] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <div className={`border p-[15px] ${data.length > 3 ? 'lg:grid' : ''}  md:h-[auto] lg:min-h-[680px] rounded-[10px]`}> <List primary_pb={'mb-[5px]'} hash_bg={'mt-[10px]'} route={Id == 'case-studies' ? Id : null} contentWidth={'flex-[0_0_calc(65%_-_10px)]'} titleClamp={'line-clamp-2 '} imgWidth={'w-full'} line={'line-clamp-1 md:hidden'} imgHeight={'h-[90px] md:h-[80px]'} check={true} data={data.slice(1, 6)} borderRadius={'rounded-[5px]'} isReverse={true} /></div>
                        </div>
                    </div> : <Skeleton />}
                    <div className={`grid grid-cols-4 md:grid-cols-2 md:pt-[20px] lg:pt-8 lg:pb-4 md:gap-[10px] lg:gap-[20px]`}>
                        {/* contentHeight={'h-[175px]'} */}
                        <Cards cardClass={"lg:h-[315px] md:h-full"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"lg:h-[180px] md:h-[150px]"} route={Id == 'case-studies' ? Id : null} check={true} width={"w-full"} isBorder={true} data={data.slice(6, data.length - 1)} />
                    </div>
                </div>


                <div className='more h-[20px]' ref={cardref}></div>
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
        <div className={`my-5 md:p-[15px] container`}>
            <div className='flex gap-[15px] items-center'>
                <div className='border p-5 md:p-[10px] rounded-[5px]  flex-[0_0_calc(65%_-_10px)] md:basis-full'>
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
                </div>
                <div className={`overflow-auto  rounded-[5px] flex-[0_0_calc(35%_-_10px)] md:basis-full border p-5 md:p-[10px] `}>
                    {[0, 1, 2, 3].map((res, index) => {
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
            </div>

            <div className='grid grid-cols-4 md:grid-cols-2 gap-5 justify-between my-5 items-center'>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(index => {
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
    )
}


export async function getServerSideProps({ params }) {
    let Id = "ir-studio";
    let param = {
        //    s: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
        category_route: "ir-studio",
        page_no: 1,
        page_size: 13,
    }
    // let value = await getList(param);
    let value = await articlesList(param);
    // let values = await value.message;
    let values = await param.category_route == 'case-studies' ? value.message.message : value.message;

    if (values.length === 0) {
        return {
            notFound: true
        }
    }

    let metaparam = {
        doctype: "Articles Category",
        fields: [ "meta_title", "meta_description", "meta_keywords", "meta_image"],
        filters: { "route": Id }
    }
    let metadata = await getList(metaparam);
    console.log(metadata, "metaparam")
    let metaInfo = {};
    if (metadata && metadata.message && metadata.message.length != 0) {
        metaInfo = metadata.message[0];
    }

    let param1 = { page: 'Categories', page_type: 'List' }
    const resp = await getAdvertisements(param1);
    const ads = resp.message;

    return {
        props: { values, ads, Id, metaInfo }
    }
}