import { useEffect, useRef } from 'react'
import ImageLoader from '../ImageLoader'
import Image from 'next/image';
import { useRouter } from 'next/router';

const EventSlide = ({slider_id,slider_child_id,data,card,height,width,flex}) => {
    let isDown = false;
    var slider = '';
    const router = useRouter()
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

    return (
        <>
            <div className='relative' id={slider_id}>
                <div className={` absolute top-[40%] left-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center  cursor-pointer md:hidden`}
                    onClick={() => sctollTo('prev')} id={'prev_' + slider_id}>
                    <Image alt="Prev" src={'/less_than.svg'} width={35} height={35} ></Image>
                </div>
                <div id={slider_child_id} ref={containerRef}
                    className='overflow-auto scroll-smooth lg:flex-[0_0_calc(25%_-_15px)] scrollbar-hide md:gap-[10px] gap-[20px] flex md:p-[0px] md:w-[calc(100vw_-_41px)]'
                >
                    {data &&  data.map((res, index) => {
                        return (
                            // '/' + router.asPath.split('/')[1] +
                            <div className={` flex flex-col rounded-[10px] ${card ? card : 'md:h-[300px] lg:h-[370px]'} border cursor-pointer ${flex}`} onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`)} key={index}>
                                <div className={``} >
                                    {/* style={{ height: '250px', width: '100%', borderRadius: '10px 10px 0 0' }} */}
                                    {/* <Image src={check_Image(res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : null)} className={`rounded-[10px_10px_0_0] ${height} ${width}`}  height={100} width={200} alt={res.title} /> */}
                                    <ImageLoader style={`rounded-[10px_10px_0_0] ${height} ${width}`} src={res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : null} title={res.title ? res.title : 's'} />

                                </div>
                                <div className={`flex flex-col p-[10px] h-full justify-between `}>
                                    <h4 className={`event-title font-[700] line-clamp-1 nunito`}>{res.title} </h4>
                                    <p className={`sub_title lg:pt-[5px] line-clamp-2`}>{res.description}</p>
                                    {/* <p className={`sub_title pt-[5px]`}>{res.end}</p> */}
                                    <div className={`flex gap-[5px] items-center lg:pt-[5px]`}>
                                        <div className={`flex items-center gap-[5px] md:flex-direction`}><Image src={'/calendar.svg'} className='md:object-contain md:h-[15px] md:w-[17px]' objectFit='contain' height={15} width={20} alt={res.title} />  <span className={`light_text nunito`}>{res.start_date}</span></div><span className='h-[18px] w-[2px] mx-[6px] bg-[#ddd]'></span>
                                        <div className={`flex flex-wrap items-center gap-[5px]`}><Image src={'/location.svg'} className='md:object-contain md:h-[15px] md:w-[17px]' height={15} width={20} alt={res.title} />
                                            {res.locations && res.locations.slice(0, 1).map((item, index) => {
                                                return (
                                                    <span key={index} className={`light_text nunito`}>{item.event_location}</span>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    {/* <div className='flex items-center gap-[5px] lg:pt-[5px]'><p className={`primary_text font-semibold capitalize `}>Register Now</p><Image src={'/arrowrightprimary.svg'} className='p-0.5 right-arrow' height={6} width={12} alt={'res.title'} /></div> */}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className={` absolute top-[40%] right-[-15px] h-[35px] w-[35px] z-10 bg-[#fff] text-black  rounded-full flex items-center justify-center cursor-pointer md:hidden`}
                    onClick={() => sctollTo('next')} id={'next_' + slider_id}>
                    <Image alt="forward" src={'/greater_than.svg'} width={35} height={35}></Image>
                </div>
            </div>


        </>
    )
}

export default EventSlide