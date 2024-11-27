import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { check_Image } from '../../libs/api'
import Link from 'next/link'
import { useRouter } from 'next/router';
import ImageLoader from '../ImageLoader';

export default function CustomSlider({ data, cardClass, imgClass, slider_id, slider_child_id, type, route, title_class, subtitle_class, primary_text_class, hashtags_class, hide_scroll_button, noPrimaryText, routers, parent, productNavigation,newsletter,navigate }) {
    // let router = routers ? routers : useRouter();
    // let router = routers ;
    let router;

    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    // console.log(type, 'type')
    if (type == 'widget') {
        router = routers
    } else {
        router = useRouter()
    }
    let isDown = false;
    var slider = '';
    useEffect(() => {
        // router = type == 'widget' ?  routers : useRouter()
        if (slider_child_id) {
            slider = document.getElementById(slider_child_id);
            // setTimeout(() => {
            // }, 2000);
            (() => {
                slider.addEventListener('mousedown', start);
                slider.addEventListener('touchstart', start);

                slider.addEventListener('mousemove', move);
                slider.addEventListener('touchmove', move);

                slider.addEventListener('mouseleave', end);
                slider.addEventListener('mouseup', end);
                slider.addEventListener('touchend', end);
            })();
        }

    }, [])

    const sctollTo = (direction) => {
        if (slider_id && slider_child_id) {
            let custom_slider = document.getElementById(slider_id)
            let slider_div = document.getElementById(slider_child_id)
            let slider_width = custom_slider.clientWidth
            if (direction == 'next') {
                slider_div.scrollLeft += slider_width
            } else {
                slider_div.scrollLeft -= slider_width
            }
            // let nextBtn = document.getElementById('next_' + slider_id)
            // let prevBtn = document.getElementById('prev_' + slider_id)
            // if (slider_div.scrollLeft >= slider_div.clientWidth) nextBtn.classList.add('hidden')
            // else nextBtn.classList.remove('hidden')
            // if (slider_div.scrollLeft == 0) prevBtn.classList.add('hidden')
            // else prevBtn.classList.remove('hidden')
        }
    }

    const containerRef = useRef(null);
    let startX = ''
    let scrollLeft = ''

    // start
    const end = () => {
        isDown = false;
        slider.classList.remove('active');
    }

    const start = (e) => {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }

    const move = (e) => {
        if (!isDown) return;

        e.preventDefault();
        const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
        const dist = (x - startX);
        slider.scrollLeft = scrollLeft - dist;
    }


    const handleScroll = () => {
        const sliderDiv = document.getElementById(slider_child_id);
        if (sliderDiv) {
            const isAtStart = sliderDiv.scrollLeft === 0;
            const isAtEnd = sliderDiv.scrollLeft + sliderDiv.clientWidth >= sliderDiv.scrollWidth;
    
            setAtStart(isAtStart);
            setAtEnd(isAtEnd);
        }
    };

    
    useEffect(()=>{
        slider.addEventListener('scroll', handleScroll);
        handleScroll();
    },[])

    const checkRoute = (res) => {
        if (type == 'widget') {
            // console.log(parent)
            // console.log(res.route)
            // if (productNavigation) {
            if (parent && parent.title) {
                if (parent.title == 'Articles') {
                    res.route = res.route
                    productNavigation(res.route)
                } else if (parent.title == 'Community Event' || parent.title == 'Events') {
                    res.route = '/events/' + res.route
                    routers.push(res.route)
                } else if (parent.title == 'Books') {
                    res.route = '/bookstore/' + res.category_route + '/' + res.route
                    routers.push(res.route)
                } else if (parent.title == 'Videos') {
                    res.route = '/video/' + res.route
                    routers.push(res.route)
                } else if (parent.title == 'Podcasts') {
                    res.route = '/podcast/' + res.route
                    routers.push(res.route)
                }
            }
            // productNavigation(res.route)
            // } 
            // else if (parent && parent.title) {
            //     if (parent.title == 'Articles') {
            //         res.route = '/' + res.route
            //     } else if (parent.title == 'Community Event' || parent.title == 'Events') {
            //         res.route = '/events/' + res.route
            //     } else if (parent.title == 'Books') {
            //         res.route = '/bookstore/' + res.category_route + '/' + res.route
            //     } else if (parent.title == 'Videos') {
            //         res.route = '/video/' + res.route
            //     } else if (parent.title == 'Podcasts') {
            //         res.route = '/podcast/' + res.route
            //     }
            // } else {
            //     res.route = '/' + res.route
            // }
            // routers.push(res.route)
        } else if (route) {

            router.push(route + res.route)
        } else {
            // let route = res.route.split('/')
            if(newsletter){
                // const route1 = window.location.origin + ('/' + res.route.split('/')[0] + '/' + parent.day + '/' + res.route.split('/')[1]) // Replace with your route
                // window.open(route1, '_blank');
                navigate(res,parent.category)
            }else{
                router.push((parent && parent.day) ? ('/' + res.route.split('/')[0] + '/' + parent.day + '/' + res.route.split('/')[1]) : ('/' + res.route))
            }
            // console.log(route, "route")
            // console.log(router.asPath, "route")
        
            // router.push('/' + res.route)
        }
        // : route ? route + res.route : '/' + res.route
    }
    return (
        <>
            {(!type || type == 'widget') && <div className='relative' id={slider_id}>
                <div className={`${hide_scroll_button && 'hidden'} ${atStart ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} absolute top-[40%] left-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center md:hidden`}
                    onClick={() => sctollTo('prev')} id={'prev_' + slider_id}>
                    <Image alt="Prev" src={'/less_than.svg'} width={35} height={35} ></Image>
                </div>
                <div id={slider_child_id} ref={containerRef}
                    className='overflow-auto scroll-smooth lg:flex-[0_0_calc(25%_-_15px)] scrollbar-hide md:gap-[10px] gap-[20px] flex md:p-[0px] md:w-[calc(100vw_-_41px)]'
                >
                    {data && data.map((res, index) => {
                        return (
                            // '/' + router.asPath.split('/')[1] +
                            <div key={index} className={`${cardClass} item border cursor-pointer rounded-[10px] overfow-hidden`} onClick={() => checkRoute(res)}>
                                <div className={``} >
                                    {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} rounded-[10px_10px_0_0]`} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.thumbnail_imagee ? res.thumbnail_imagee : res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : res.video_image ? res.video_image : res.product_image ? res.product_image : res.image)} height={200} width={300} alt={index + 'image'} /> */}
                                    <ImageLoader style={`${imgClass} rounded-[10px_10px_0_0]`} src={res.thumbnail_image ? res.thumbnail_image : res.thumbnail_imagee ? res.thumbnail_imagee : res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : res.video_image ? res.video_image : res.product_image ? res.product_image : res.image} title={index + 'image'} />
                                </div>
                                <div className={` flex flex-col justify-between p-[10px] `}>
                                    {/* !text-[10px] */}
                                    {(res.primary_text && res.secondary_text && !noPrimaryText) && <p className={`${primary_text_class} flex gap-2 items-center py-[5px]`}><span className={`primary_text leading-normal tracking-wider  line-clamp-1 nunito`}>{res.primary_text}</span> {res.secondary_text && <span className="h-[10px] w-[1px] bg-[#6f6f6f]"></span>} <span className={`secondary_text line-clamp-1 nunito`}>{res.secondary_text}</span></p>}
                                    {(newsletter && !noPrimaryText && res.date) && <p className={`${primary_text_class} flex gap-2 items-center py-[5px]`}><span className={`primary_text leading-normal tracking-wider  line-clamp-1 nunito`}>{res.date}</span> {res.secondary_text && <span className="h-[10px] w-[1px] bg-[#6f6f6f]"></span>} <span className={`secondary_text line-clamp-1 nunito`}>{res.secondary_text}</span></p>}
                                    <h4 className={`title  ${title_class ? title_class : 'line-clamp-2'} nunito`}>{res.title ? res.title : res.item ? res.item : res.subject ? res.subject : ''}</h4>
                                    {/* {res.subject && <h4 className={`title  ${title_class ? title_class : 'line-clamp-2'} nunito`}>{res.subject}</h4>} */}
                                    {res.short_description && <p className={` ${subtitle_class ? subtitle_class : 'line-clamp-2'} sub_title !mt-[6px] `}>{res.short_description}</p>}
                                    {(res.sub_title || res.blog_intro) && <p className={` ${subtitle_class ? subtitle_class : 'line-clamp-2'} sub_title !mt-[6px] `}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
                                    {(res.hashtags || res.publisher) && <p className={`${hashtags_class} hashtags pt-1 line-clamp-1 nunito`}>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
                                    {(res.locations && res.start_date) && <div className={`flex gap-[5px] items-center lg:pt-[5px]`}>
                                        {res.start_date && <div className={`flex items-center gap-[5px] md:flex-direction`}><Image src={'/calendar.svg'} className='md:object-contain md:h-[15px] md:w-[17px]' objectFit='contain' height={15} width={20} alt={res.title} />  <span className={`light_text`}>{res.start_date}</span></div>}{(res.locations && res.locations.length != 0) && <span className='h-[18px] w-[2px] mx-[6px] bg-[#ddd]'></span>}
                                        {(res.locations && res.locations.length != 0) && <div className={`flex flex-wrap items-center gap-[5px]`}><Image src={'/location.svg'} className='md:object-contain md:h-[15px] md:w-[17px]' height={15} width={20} alt={res.title} />
                                            {res.locations && res.locations.slice(0, 1).map((item, index) => {
                                                return (
                                                    <span key={index} className={`light_text`}>{item.event_location}</span>
                                                )
                                            })}
                                        </div>}
                                    </div>}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`${hide_scroll_button && 'hidden'} ${atEnd ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} absolute top-[40%] right-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center md:hidden`}
                    onClick={() => sctollTo('next')} id={'next_' + slider_id}>
                    <Image alt="forward" src={'/greater_than.svg'} width={35} height={35}></Image>
                </div>
            </div>}
            {type == 'beautySlide' &&
                <div id={slider_child_id} className='overflow-auto scroll-smooth  justify-between scrollbar-hide gap-[20px] flex md:p-[0px]'
                >
                    {data && data.map((res, index) => {
                        return (
                            <Link key={index} className={`${cardClass} flex gap-[15px] mt-[10px] items-center flex-[0_0_100%] border rounded-[5px] overfow-hidden p-[10px]`} href={'/' + router.asPath.split('/')[1] + '/' + res.route}>
                                <div className={`flex-[0_0_30%]`} >
                                    <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} h-[70px] `} src={check_Image(res.thumbnail_image)}
                                        style={{ borderRadius: '5px' }} height={50} width={100} alt={index + 'image'} />
                                </div>
                                <div >
                                    {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center'><span className={`text-red leading-normal tracking-wider primary_text`}>{res.primary_text}</span> <span className="h-[10px] w-[1px] bg-[#6f6f6f] "></span> <span className='secondary_text'>{res.secondary_text}</span></p>}
                                    <h4 className={`title leading-4 line-clamp-2`}>{res.title ? res.title : ''}</h4>
                                    {(res.hashtags || res.publisher) && <p className='hashtags pt-1 text-[#757575]'>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            }


        </>
    )
}
