import { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import ImageLoader from '../ImageLoader';

const CaseStudy = ({ data, cardClass, imgClass, slider_id, slider_child_id, title_class, hide_scroll_button, }) => {

    const [atStart, setAtStart] = useState(true);
    const [atEnd, setAtEnd] = useState(false);

    // console.log(type, 'type')

    const router = useRouter()

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

    // end

    // };


    const handleScroll = () => {
        const sliderDiv = document.getElementById(slider_child_id);
        if (sliderDiv) {
            const isAtStart = sliderDiv.scrollLeft === 0;
            const isAtEnd = sliderDiv.scrollLeft + sliderDiv.clientWidth >= sliderDiv.scrollWidth;

            setAtStart(isAtStart);
            setAtEnd(isAtEnd);
        }
    };


    useEffect(() => {
        slider.addEventListener('scroll', handleScroll);
        handleScroll();
    }, [])

    const checkRoute = (res) => {
        router.push('/p/'+res.route)
    }

    return (
        <>

            <div className='relative' id={slider_id}>
                <div className={`${hide_scroll_button && 'hidden'} ${atStart ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} absolute top-[40%] left-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center md:hidden`}
                    onClick={() => sctollTo('prev')} id={'prev_' + slider_id}>
                    <Image alt="Prev" src={'/less_than.svg'} width={35} height={35} ></Image>
                </div>
                <div id={slider_child_id} ref={containerRef}
                    className='overflow-auto scroll-smooth lg:flex-[0_0_calc(25%_-_15px)] scrollbar-hide md:gap-[10px] gap-[20px] flex md:p-[0px] md:w-[calc(100vw_-_41px)]'
                >
                    {data && data.map((res, index) => {
                        return (

                            <div key={index} className={`${cardClass} cursor-pointer rounded-[10px] overfow-hidden`} onClick={() => checkRoute(res)}>
                                <div className={``} >
                                    {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} rounded-[10px_10px_0_0]`} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.thumbnail_imagee ? res.thumbnail_imagee : res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : res.video_image ? res.video_image : res.product_image ? res.product_image : res.image)} height={200} width={300} alt={index + 'image'} /> */}
                                    <ImageLoader style={`${imgClass} rounded-[5px]`} src={res.meta_image} title={index + 'image'} />
                                </div>
                                <div className={` flex flex-col justify-between p-[10px] `}>
                                    <h4 className={`title  ${title_class ? title_class : 'line-clamp-2'} nunito`}>{res.title ? res.title : ''}</h4>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={`${hide_scroll_button && 'hidden'} ${atEnd ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'} absolute top-[40%] right-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center md:hidden`}
                    onClick={() => sctollTo('next')} id={'next_' + slider_id}>
                    <Image alt="forward" src={'/greater_than.svg'} width={35} height={35}></Image>
                </div>
            </div>
        </>
    )
}

export default CaseStudy