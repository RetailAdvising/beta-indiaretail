import { useEffect, useState } from 'react'
import RootLayout from '@/layouts/RootLayout'
import { checkMobile, update_no_of_shares, get_subscription_plans, check_Image,seo_Image,getCurrentUrl } from '@/libs/api';
import { video_details, getAdvertisements } from '@/libs/api';
import { useRouter } from 'next/router';
// import { check_Image } from '@/libs/common'
import Image from 'next/image';
import List from '@/components/common/List'
import Title from '@/components/common/Title'
import Video from '../../../../components/Video/Video';
import Dropdowns from '../../../../components/common/Dropdowns';
import { useSelector } from 'react-redux';
import SubscriptionAlert from '@/components/common/SubscriptionAlert';
import Placeholders from '@/components/common/Placeholders'
// import { Nunito } from 'next/font/google'
import Head from 'next/head'
import Advertisement from '@/components/Baners/Advertisement';
// const nunito = Nunito({
//     weight: ["300", "400", "500", "600", "700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
// })
export default function Videos({ meta_info, ads_data }) {
     console.log(meta_info, ads_data)
    const router = useRouter();
    let [isMobile, setIsmobile] = useState();
    let [videoDetail, setVideoDetail] = useState();
    const [validator, setValidator] = useState(false)
    const [prev, setPrev] = useState('')
    const icons = [{ icon: "/bookstore/linkedin.svg", name: 'Linkedin' }, { icon: "/bookstore/FB.svg", name: 'Facebook' }, { icon: "/bookstore/twitter.svg", name: 'Twitter' }, { icon: "/bookstore/whatsapp.svg", name: 'Whatsapp' }]
    const user = useSelector(s => s.user);
    const role = useSelector(s => s.role);

    // let bannerImg = { ad_image: '/ads_baner.png' };

    useEffect(() => {
        if (typeof window !== 'undefined') {
            checkRole()
            // const data = JSON.parse(localStorage['roles']);
            // if (data && data.length != 0) {
            //     data.map(res => {
            //         if (res.role == 'Member') {
            //             setValidator(true);
            //         }
            //     })
            // }
        }
        if (router.query) {
            get_video_details()
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile)
            return () => {
                window.removeEventListener('resize', checkIsMobile);
            };
        }
    }, [router.query, role])

    const checkRole = () => {
        // console.log(role,'role')
        if (role && role != '' && role.message && role.message.length != 0) {
            // console.log(role)
            // if(updateCmts == -1){
            for (let index = 0; index < role.message.length; index++) {
                if (role.message[index] == 'Member' || role.message[index] == "Member User") {
                    setValidator(true);
                }
            }
            // }
        }

        getMembershipPlans()
    }

    const checkIsMobile = async () => {
        isMobile = await checkMobile();
        setIsmobile(isMobile);
    }

    const get_video_details = async () => {
        let id = await router.query.vids + '/' + router.query.detail;
        // "primary_text","secondary_text",
        let data = {
            "route": id, fields: ["name", "route", "title", "video_image", 'description']
        }
        let res = await video_details(data);
        if (res && res.status == "Success") {
            setVideoDetail(res)
        }
    }


    const updateShare = async (data) => {
        // console.log(data, 'share');
        const param = {
            doc_id: data.name,
            doctype: 'Video'
        }

        const resp = await update_no_of_shares(param);
        if (resp.message == 'Success') {
            // console.log(resp)

        }
    }

    const [plans, setPlans] = useState([])

    const getMembershipPlans = async () => {
        if (!validator) {
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
    }

    const videoLink = (link) => {
        // console.log(link,'link')
        return link.video_type.toLowerCase() == 'youtube' ? 'https://www.youtube.com/embed/' + link.video_id : 'https://player.vimeo.com/video/' + link.video_id
    }

    return (
        <RootLayout ad_payload={{ page: 'Videos', page_type: 'Detail' }} homeAd={ads_data ? ads_data : null} adIdH={router.query.vids+'vidsdH'} adIdF={router.query.vids+'vidsdF'} isLanding={false} head={'Detail'}>
            <Head>
                <title key="title">{meta_info?.message.meta_title}</title>
                <meta name="description" content={meta_info?.message.meta_description} />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta name="theme-color" content="#e21b22" />
                <meta property="og:type" content={'Article'} />
                <meta property="og:title" content={meta_info?.message.meta_title} />
                <meta property="og:description" content={meta_info?.message.meta_description} />
                <meta property="og:locale" content="en_IE" />
                <meta property="og:url" content={getCurrentUrl(router.asPath)}></meta>
                {/* <meta property="og:site_name" content={'IndiaRetailing'} />
         
          <meta property="og:site_name" content={'IndiaRetailing'} /> */}
                <meta

                    property="og:image"
                    itemprop="image"
                    content={seo_Image(meta_info?.message.meta_image)}
                />
                <meta

                    property="og:image:alt"
                    content={`${meta_info?.message.title} | ${'IndiaRetailing'}`}
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
                <meta property="twitter:image" content={seo_Image(meta_info?.message.meta_image)} />
                <meta

                    property="twitter:title"
                    content={meta_info?.message.title}
                />
                <meta

                    property="twitter:description"
                    content={meta_info?.message.meta_description}
                />



                {/* <link rel="canonical" href={'https://indiaretail.vercel.app/'} /> */}

                <link rel="shortcut icon" href="/ir_2023.png" />
            </Head>
            {/* {(meta_info && meta_info.message) && <SEO title={meta_info.message.meta_title ? meta_info.message.meta_title : meta_info.message.title} ogImage={check_Image(meta_info.message.video_image)} siteName={'India Retailing'} ogType={meta_info.message.meta_keywords ? meta_info.message.meta_keywords : meta_info.message.title} description={meta_info.message.meta_description ? meta_info.message.meta_description : meta_info.message.title} />} */}
            {videoDetail ? <>
                {videoDetail &&
                    // lg:py-[20px]
                    <div className='flex gap-[30px] container  md:flex-col md:p-[10px]'>
                        <div className={`${!validator && videoDetail.message.ir_prime == 1 ? 'lg:flex-[0_0_calc(80%_-_20px)] lg:m-[auto]' : 'lg:flex-[0_0_calc(70%_-_30px)]'}`}>
                            {/* <h6 className='text-[20px] line-clamp-2 font-semibold'>{videoDetail.message.title}</h6> */}

                            <div className='flex items-center gap-[10px] mb-[10px]'>
                                <div className='flex items-center gap-[10px]'>
                                    <Image className={`h-[15px] w-[15px] object-contain`} src={'/views.svg'} height={10} width={15} alt={'share'} />
                                    <span className='text-[12px] gray_color'>{videoDetail.message.noof_views} Views</span>
                                </div>
                                <div className='flex items-center gap-[10px]'>
                                    <Image className={`h-[15px] w-[15px] object-contain`} src={'/share.svg'} height={10} width={15} alt={'share'} />
                                    <span className='text-[12px] gray_color'>{videoDetail.message.no_of_share + ' shares'}</span>
                                </div>
                            </div>

                            <div className={`flex md:p-[10px] justify-between lg:gap-5 md:gap-[5px] pb-[10px] md:pl-0`}>
                                <h6 className={`md:text-[16px] line-clamp-2 lg:text-[20px] md:w-[calc(90%_-_10px)] md:mr-[10px] font-[700] nunito`}>{videoDetail.message.title}</h6>
                                {icons && <><Dropdowns copy_link={true} btnClass={'md:w-[32px]'} updateShare={(data) => updateShare(data)} link={videoDetail.message} data={icons} width={'w-[170px]'} share={true} /></>}
                            </div>

                            {(!validator && videoDetail.message.ir_prime == 1) && <Image src={check_Image(videoDetail.message.video_image)} alt='img' height={200} width={200} className='lg:h-[500px] object-contain md:h-full w-full' />}

                            {/* md:h-[220px] */}
                            <div className={`${validator ? 'lg:min-h-[80vh] md:min-h-[220px]' : ''} my-[10px]`}>
                                {(!validator && videoDetail.message.ir_prime == 1) ?
                                    <>
                                        {/* <div className='grid place-content-center max-w-[400px] p-[30px_20px_20px_20px] md:p-[20px] m-[0_auto]'>
                                        <div className={`flex items-center gap-[10px] `}>
                                        <Image src={'/irprime/premium.svg'} height={20} width={20} alt='premium' />
                                        <p className='text-red font-semibold'>Prime Video</p>
                                        </div>
                                        <h6 className='text-[32px] font-[600] leading-[40px] md:text-[17px] md:leading-[22px] pt-[10px]'>Its a Premium Content,Simply buy Membership to Unlock</h6>
                                        <p className='text-[14px] font-[400] text-gray pt-[10px] leading-[20px] md:leading-[16px] md:pt-[15px]'>50,000+ articles Prime Video is the only subscription you need</p>

                                        <div className='w-full mt-[25px] md:mt-[15px] md:text-center'>
                                        <button className='primary_button w-full text-[16px] h-[50px] p-[5px_10px] md:text-[14px] md:h-[35px] md:w-max' onClick={() => router.push('/membership')} style={{ borderRadius: '9999px', textTransform: 'unset' }}>Subscribe to Prime Video</button>
                                        </div>

                                    </div> */}
                                        <p className='gray_color  my-[10px] line-clamp-2 md:text-[14px] lg:text-[16px]' >{videoDetail.message.intro}</p>
                                        <div className='gray_color  my-[20px]' dangerouslySetInnerHTML={{ __html: videoDetail.message.description }} />
                                        <SubscriptionAlert data={(plans && plans.length != 0) ? plans : []} />
                                        {/* <Image src={check_Image(videoDetail.message.video_image)} alt='img' height={200} width={200} className='h-full w-full' />
                                    <div className='border-0 p-[20px] my-[20px] rounded-md bg-[#e21b22] mt-6 flex justify-between md:block'>
                                        <div className='text-center text-[20px] md:text-[16px] font-semibold text-[white] flex md:pb-2'>
                                            <Image src={'/ir-icon.svg'} height={38} width={38} alt={"image"} className='mr-3 object-contain' />
                                            <div className='text-center'>
                                                <h6 className='text-[20px] text-[white] md:text-[16px] font-semibold text-left'>Prime Video</h6>
                                                <p className='text-[14px] text-[white] md:text-[13px] md:text-left font-normal'>This video is for Premium Members you  have to buy Membership to Unlock</p>
                                            </div>

                                        </div>
                                        <div className='flex gap-[20px] justify-center pt-[0px]'>
                                            <button className='m-auto primary_btn p-[6px_8px] text-[13px] bg-[#fff] text-[#e21b22] flex' onClick={() => router.push('/membership')}><Image src={'/subscribe.svg'} height={18} width={18} alt={"image"} className='mr-1' />Subscribe</button>
                                        </div>
                                    </div> */}
                                    </>
                                    : 
                                    <>
                                    <iframe
                                        className={`lg:h-[75vh] md:h-[30vh] w-full`}
                                        title={videoDetail.message.title ? videoDetail.message.title : ''}
                                        // src={`https://www.youtube.com/embed/${videoDetail.message.video_id ? videoDetail.message.video_id : videoDetail.message.video_id}`}
                                        src={videoLink(videoDetail.message)}
                                        // width={res.width}
                                        // height={res.height}
                                        frameBorder="2"
                                        loading="lazy"
                                    // allowfullscreen="allowfullscreen"
                                    ></iframe>
                                    

                                    <p className='gray_color  my-[10px] line-clamp-2 md:text-[14px] lg:text-[16px]' >{videoDetail.message.intro}</p>
                                        <div className='gray_color  my-[20px]' dangerouslySetInnerHTML={{ __html: videoDetail.message.description }} />
                                    </>
                                    }

                                {/* <Image className='h-[400px] ' src={check_Image(videoDetail.message.video_image)} height={430} width={430} layout="fixed" alt={''} /> */}
                            </div>

                            {/* {(videoDetail.message.description) && <div className='gray_color josefin-sans my-[20px]' dangerouslySetInnerHTML={{ __html: videoDetail.message.description }} />} */}

                            {/* {videoDetail.other_category && videoDetail.other_category.data && videoDetail.other_category.data.length != 0 && 
                        <div className=''><Title data={videoDetail.other_category} seeMore={false} /><List fullWidth={true} check={true} isBB={true} isDesc={true} contentWidth={'w-[410px] md:w-[auto]'} imgFlex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]'} imgWidth={'w-full'} imgHeight={'h-[100px] md:h-[85px]'} data={videoDetail.other_category.data.slice(0,3)} borderRadius={'rounded-[5px]'} /></div>
                     } */}

                        </div>

                        <div className={`${!validator && videoDetail.message.ir_prime == 1 ? 'hidden' : 'lg:flex-[0_0_calc(30%_-_0px)] lg:pt-[40px]'}`}>




                            {(videoDetail.place_holders_ads && videoDetail.place_holders_ads.length != 0) ? <>
                                <Placeholders placeholder={videoDetail.place_holders_ads} />

                            </> : videoDetail.related_videos && videoDetail.related_videos.length != 0 &&
                            <>
                                <Title data={{ title: 'Related Videos' }} seeMore={false} />
                                <div className='border p-[10px] rounded-[5px] mb-[10px]'>
                                    <List isHome={'/video/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} isDesc={true} titleClamp={'line-clamp-2'} check={true} imgWidth={'w-full'} imgHeight={'h-[90px] md:h-[85px]'} data={videoDetail.related_videos.slice(0, 3)} borderRadius={'rounded-[5px]'} />
                                </div>
                                <Advertisement ad_payload={{ page: 'Videos', page_type: 'Detail' }} adId={'right_first'} data={(ads_data && ads_data.right_first) && ads_data.right_first} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
                                {ads_data && ads_data.right_second && <Advertisement ad_payload={{ page: 'Videos', page_type: 'Detail' }} adId={'right_second'} data={(ads_data && ads_data.right_second) && ads_data.right_second} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />}
                                {/* <Advertisement adId={'right_third'} data={(ads_data && ads_data.right_third) && ads_data.right_third} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} /> */}
                                {/* <AdsBaner data={bannerImg} height={'h-[250px]'} /> */}
                            </>
                            }


                            {/* <div className='h-[260px] mt-[10px]'>
                                <Image className='h-[250px] w-[300px]' src={'/ads_baner.png'} height={250} width={300} layout="fixed" alt={''} />
                            </div> */}

                            {/* <div className='h-[600px] mt-[30px] mb-[10px]'>
                        <Image className='h-[600px] w-[300px]' src={'/ads_music.png'} height={600} width={300} layout="fixed" alt={''} />
                      </div> */}
                        </div>
                    </div>

                }
                {(videoDetail && videoDetail.other_category && videoDetail.other_category.data && videoDetail.other_category.data.length != 0) && <div className='container py-[20px] md:p-[15px]'>
                    <div>
                        <Title data={videoDetail.other_category} />
                    </div>
                    <div className='lg:grid grid-cols-4 lg:gap-5 no_scroll'>
                        <Video data={videoDetail.other_category.data} flex={'md:flex-[0_0_calc(70%_-_10px)] md:h-[235px]'} imgClass={'h-[180px] w-full'} />

                    </div>
                </div>}
            </> : <Skeleton />}
        </RootLayout>
    )
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


export async function getServerSideProps({ params }) {
    let id = await params?.vids + '/' + await params?.detail;
    let data = {
        "route": id, fields: ["name", "route", "title", "video_image", 'description']
    }
    let res = await video_details(data);

    if(res.status === "Failed"){
        return {
            notFound: true
        }
    }
    
    let meta_info = res;

    let ads_params = { page: 'Videos', page_type: 'Detail' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;
    return {
        props: { meta_info, ads_data }
    }
}