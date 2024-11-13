import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import styles from '@/styles/Slider.module.scss'
import Image from 'next/image';
// import { check_Image } from '@/libs/common';
import { useRouter } from 'next/router';
import { check_Image, checkMobile } from '@/libs/api'
import Link from 'next/link'

export default function MultiCarousel({ islanding, isHome = undefined, cardHeight, none = false, noPlay, check, deviceType, data, type, height, width, card_width, perView }) {
    const router = useRouter();
    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: perView ? perView : 3,
            paritialVisibilityGutter: 60
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 3,
            paritialVisibilityGutter: 50
        },
        mobile: {
            breakpoint: { max: 464, min: 300 },
            items: 1,
            paritialVisibilityGutter: 60
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
            {(type != 'profile' && type != 'list') && <>
                <Carousel
                    // ssr
                    // partialVisbile
                    // deviceType={deviceType}
                    autoPlay={(noPlay || !none) ? false : true}
                    arrows={(noPlay && !isMobile && !none) ? true : false}
                    autoPlaySpeed={2000}
                    // containerClass="container-with-dots"
                    // dotListClass="dots"
                    infinite
                    // pauseOnHover
                    responsive={responsive}
                    // shouldResetAutoplay
                    // showDots={(!isMobile || !none) ? true : false}
                    // renderDotsOutside={!isMobile ? false : true}
                    // sliderClass=""
                    slidesToSlide={perView ? perView : 1}
                    swipeable
                >
                    {/* {type != 'profile' && <div className=''> */}
                    {(data && data.length != 0) && data.map((res, index) => {
                        return (
                            <Link key={index} href={isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}>
                                {/* onClick={() => islanding ? router.push(`${router.asPath}/${res.route}`) : null} */}
                                <div className={`${styles.cards} cursor-pointer ${cardHeight}`} >
                                    <div>
                                        <Image src={check ? check_Image(res.thumbnail_image) : res.image} className={`${height} ${width}`} height={150} width={300} alt={"image"} />
                                    </div>
                                    <div className={`${styles.card_content} flex flex-col justify-between`}>
                                        {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center'><span className={`text-[#e21b22] leading-normal tracking-wider !text-[10px] ${styles.primary_text}`}>{res.primary_text}</span> <span class="h-[10px] w-[1px] bg-[#6f6f6f] leading-normal"></span> <span className={`${styles.secondary_text} !text-[10px] leading-normal tracking-wider !text-[10px]`}>{res.secondary_text}</span></p>}
                                        <h4 className={`title line-clamp-2`}>{res.title ? res.title : ''}</h4>
                                        <p className={`sub_title mt-[6px] line-clamp-2`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>
                                        <p className='hashtags pt-1'>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>
                                    </div>
                                </div>

                            </Link>
                        )
                    })}
                    {/* </div>} */}
                </Carousel>

            </>}

            {type == 'profile' && <>
                <Carousel
                    // autoPlay={noPlay ? false :true}
                    arrows={(isMobile || none) ? false : true}
                    autoPlaySpeed={2000}
                    // containerClass="container-with-dots"
                    // dotListClass="dots"
                    infinite
                    // pauseOnHover
                    responsive={responsive}
                    // shouldResetAutoplay
                    // showDots={(isMobile || none) ? true : false}
                    // renderDotsOutside={false}
                    // sliderClass=""
                    slidesToSlide={5}
                    swipeable>

                    {(data && data.length != 0) && data.map((res, index) => {
                        return (
                            <Link key={index} href={isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}>

                                <div className={`border rounded-[10px] ${cardHeight ? cardHeight : 'h-[330px]'}`} >
                                    <div>
                                        <Image src={check ? check_Image(res.thumbnail_image) : res.image} className={`${height} ${width}`} height={150} width={300} alt={"image"} />
                                    </div>
                                    <div className={`${styles.card_content} flex flex-col justify-between p-[10px]`}>
                                        {/* {(res.primary_text && res.secondary_text) && <p className='flex gap-2'><span className={`text-red ${styles.primary_text}`}>{res.primary_text}</span> | <span className={`${styles.secondary_text}`}>{res.secondary_text}</span></p>} */}
                                        <div className='flex gap-[10px]'>
                                            <Image src={check ? ((res.avatar && res.avatar != null && res.avatar != '') ? check_Image(res.avatar) : '/profit.svg') : res.profile} height={40} width={40} alt={res.title} className={`rounded-full h-[40px] w-full flex-[0_0_calc(20%_-_10px)]`} />
                                            <h4 className={`title line-clamp-2`}>{res.title ? res.title : ''}</h4>
                                        </div>
                                        <p className={`sub_title pt-[5px] line-clamp-2`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>
                                        <p style={{ fontSize: '13px' }} className='hashtags pt-[5px] font-[500]'>by {res.hashtags ? res.hashtags : res.author ? res.author : res.publisher ? res.publisher : ''}</p>
                                    </div>
                                </div>


                            </Link>
                        )
                    })}
                    {/* </div> */}
                </Carousel>

            </>}

            {/* {
                type == 'list' && <>
                    <Carousel
                    autoPlay
                    arrows={true}
                    autoPlaySpeed={2000}
                    // containerClass="container-with-dots"
                    // dotListClass="dots"
                    infinite
                    pauseOnHover
                    responsive={responsive}
                    // shouldResetAutoplay
                    // showDots
                    // renderDotsOutside={false}
                    // sliderClass=""
                    slidesToSlide={1}
                    swipeable
                    
                    >
                        {data.map((res, index) => {
                            return (
                                <div key={index} className={`d__flex gap-3 rounded-lg p-2  ${styles.mb30} ${styles.list_parent}`}>
                                    <div className='basis-3/4'>
                                        <Image src={check ? check_Image(res.image) : res.image} alt={"image"} height={200} width={300} className='rounded-lg' />
                                    </div>
                                    <div>
                                        {(res.primary_text && res.secondary_text) && <p className='flex gap-2'><span className={`text-red ${styles.primary_text}`}>{res.primary_text}</span> | <span className={`${styles.secondary_text}`}>{res.secondary_text}</span></p>}
                                        <p className={`${styles.title}`}>{res.title ? res.title : ''}</p>
                                        <p>{res.sub_title ? res.sub_title : ''}</p>
                                        <p>{res.hashtags ? res.hashtags : ''}</p>
                                    </div>
                                </div>

                            )
                        })}
                    </Carousel>



                </>
            } */}



        </>
    )
}
