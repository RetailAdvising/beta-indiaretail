import SEO from "@/components/common/SEO";
import VideoSlider from "@/components/common/VideoSlider";
import RootLayout from "@/layouts/RootLayout";
import { check_Image, checkMobile, getAdvertisements, GetDigitalIcon } from "@/libs/api";
import index from "@/pages/polls";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';

export default function Digital({ res }) {
    let [data, setData] = useState(res);
    // console.log(data, "data")
    let [isMobile, setIsmobile] = useState();
    const [ads_data, setAdsData] = useState()
    const [viewMore, setViewMore] = useState(false);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 4,
            paritialVisibilityGutter: 60
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            paritialVisibilityGutter: 50
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            paritialVisibilityGutter: 30
        }
    }
    useEffect(() => {

        get_ads()
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        isMobile = await checkMobile();
        setIsmobile(isMobile);
        // console.log('isMobile',isMobile)
    }

    const get_ads = async () => {
        let ads_params = { page: 'Digital', page_type: 'Landing' }
        const res_ads = await getAdvertisements(ads_params);
        const ads_data = res_ads.message;
        if (ads_data) {
            setAdsData(ads_data)
        }
    }
    return (
        <RootLayout ad_payload={{ page: 'Digital', page_type: 'Landing' }} homeAd={ads_data ? ads_data : null} adIdH={'digital-head'} adIdF={'digital-foot'} >
            <SEO title={'Digital'} siteName={'India Retailing'} description={'Digital'} />
            {Object.keys(data).length > 0 && <div>
                <div className="flex items-center justify-center gap-[20px]" style={{ backgroundImage: `url(${check_Image(data.background_image)})`, backgroundSize: 'cover' }}>
                    <div className="flex justify-center items-center h-[300px]">
                        <Image src={data.inline_image_1} width={250} height={100} alt="digital_icons" />
                    </div>
                    <div className="flex justify-center items-center h-[300px]">
                        <Image src={data.inline_image_2} width={250} height={100} alt="digital_icons" />
                    </div>

                </div>
                <div className="container ">
                    <Image src={data.header_bottom_image} width={1200} height={300} alt="digital_banner" className="w-full h-auto" />

                </div>
                <div className="md:py-[20px] md:px-[10px] lg:py-[40px]" style={{ backgroundImage: 'url("/digital/pageBG.png")', backgroundSize: 'cover' }}>
                    <h1 className="digital-icons">{data.content_title}</h1>
                    <div className="container flex md:flex-col items-center">
                        {data.digital_icons && data.digital_icons.length && data.digital_icons.slice(0, 1).map((item, i) => {
                            return (<>
                                <div key={`${item.full_name}_${i}`} className="grow basis-0 max-w-[100%] flex items-center justify-center">
                                    <Image src={check_Image(item.image)} width={420} height={100} alt={item.full_name} className="md:w-[300px] lg:w-[420px] h-auto rounded-[50px]" />

                                </div>
                                <div className="grow basis-0 max-w-[100%]">
                                    <h1 className="speakerName mb-[8px]">{item.full_name}</h1>

                                    <div className="speakerTitle mb-[1rem]" dangerouslySetInnerHTML={{ __html: item.designation }} />
                                    <p className="speakerDesc mb-[1rem]">{item.intro}</p>
                                    <p className="viewMoreButton cursor-pointer" onClick={() => { setViewMore(true) }}>View More</p>
                                </div>
                            </>)
                        })}

                    </div>

                    {viewMore && <div className="container flex flex-col gap-[20px] items-center !my-[40px] ">
                        {data.digital_icons && data.digital_icons.length > 0 && data.digital_icons.slice(0, 1).map((item, i) => {
                            return (<>

                                {item.specs && item.specs.length > 0 && <div className="flex flex-wrap w-full gap-[20px] ">
                                    {item.specs.map((spec, index) =>{ 
                                        // let count = 0;

                                        return (
                                        <>
                                            {spec.top_spec && <div key={`${spec.title}_${index}`} className={`flex flex-col customBorder w-[90%] mx-auto `}>
                                                <h2 className="keyLearnings customHeading1">{spec.title}</h2>
                                                <ul className="keyLearningsList">
                                                    {spec.content.map((item, i) => (
                                                        <li key={`${item}_${i}`} className="keyLearningItem customText">{item}</li>
                                                    ))}
                                                </ul>
                                            </div>}
                                        </>
                                    )})}
                                </div>
                                }

                                {item.career_history && item.career_history.length > 0 && <div className="w-[90%] mx-auto ">
                                    <h1 className="customHeading2 text-[#ffd700]">Career History</h1>

                                    <div className={`${item.career_history.length >= 3 ? "grid-cols-3" : "grid-cols-2"} grid gap-[20px] w-full md:grid-cols-1`}>
                                        {item.career_history && item.career_history.length > 0 && item.career_history.map((car, index) => (
                                            <div key={`${car.company}_${index}`} className={` flex flex-col items-center justify-center `}>
                                                <h2 className="customHeading3">{car.company_name}</h2>
                                                <div className="carcustomText" dangerouslySetInnerHTML={{ __html: car.designation }} />
                                            </div>
                                        ))}
                                    </div>

                                </div>}

                                {item.specs && item.specs.length > 0 && <div className="flex flex-col w-full gap-[20px]">
                                    {item.specs.map((spec, index) => (<>
                                    {!spec.top_spec && <div key={`${spec.title}_${index}`}>
                                         <h1 className="customHeading4 text-[#ffd700]">{spec.title}</h1>
                                         <ul className="keyLearningsList">
                                                    {spec.content.map((item, i) => (
                                                        <li key={`${item}_${i}`} className="keyLearningItem customText">{item}</li>
                                                    ))}
                                                </ul>

                                    </div>}
                                    
                                    
                                    </>))}</div>}

                            </>)
                        })}




                        <p className="viewMoreButton cursor-pointer" onClick={() => { setViewMore(false) }}>Hide</p>
                    </div>}
                    {data.digital_icons && data.digital_icons.length > 1 &&  <div className="container !my-[40px]">

                        <Carousel
                            // ssr
                            // partialVisbile
                            // deviceType={deviceType}
                            // containerClass="container-with-dots"
                            // dotListClass="dots"
                            // shouldResetAutoplay
                            showDots
                            // renderDotsOutside={false}
                            // sliderClass=""

                            // autoPlay
                            // arrows={true}
                            autoPlaySpeed={2500}
                            infinite
                            pauseOnHover
                            responsive={responsive}
                            slidesToSlide={1}
                            swipeable
                            // centerMode={true}
                            // itemClass="carousel-item-padding-40-px"
                            containerClass="carousel-container-digital"
                        // showDots={true}
                        >
                            {data.digital_icons && data.digital_icons.length > 1 &&  data.digital_icons.slice(1,data.digital_icons.length).map((item, index) => (
                                <div key={index} className="md:px-[10px] lg:pr-[10px] h-full">
                                    <div className=" otherSpeakerBody flex flex-col items-center justify-center h-full bg-gray-200 ">
                                        <div className="h-[200px] overflow-hidden w-[100%] block object-contain object-top">
                                            <Image src={check_Image(item.image)} width={300} height={300} alt={`Digital Icon ${index + 1}`} className="w-full h-auto" />
                                        </div>
                                        <div className="h-[150px] w-[100%] flex flex-col items-center justify-center">
                                            <Link href={`/digital-icon/${item.full_name}`}>
                                                <h4 class="otherSpeakerName">{item.full_name}</h4>
                                            </Link>
                                            <h5 class="otherSpeakerDes flex flex-col items-center justify-center"><Link className="text-center" href={`/digital-icon/${item.full_name}`} dangerouslySetInnerHTML={{ __html: item.designation }}/> </h5>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </Carousel>
                    </div>}
                    {data.youtube_video && data.youtube_video.length > 0 &&  <div className="container !my-[40px]">
                        <h1 className="aboutETP">{data.partner_title}</h1>
                        <p className="aboutETPDesc">{data.description}</p>
                        <VideoSlider youtube={data.youtube_video} />
                    </div>}
                </div>

            </div>}
        </RootLayout>
    )
}
export async function getServerSideProps({ params }) {
    let Id = await params?.list[0];
    let param = {
        route: Id,
    }
    let datas = await GetDigitalIcon(param);
    let res = datas?.message?.message ? datas.message.message : null;
    if (!res) {
        return {
            notFound: true,
        }
    }
    return {
        props: { res, param },
    }
}