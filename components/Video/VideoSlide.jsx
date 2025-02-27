import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { check_Image, getVideoDuration } from '../../libs/api';
import { useRouter } from 'next/router';

export default function VideoSlide({ data, cardClass, imgClass, slider_id, slider_child_id, title_class, hide_scroll_button }) {
    const router = useRouter();

    const containerRef = useRef(null);
    const [isLeftArrowVisible, setIsLeftArrowVisible] = useState(false);
    const [isRightArrowVisible, setIsRightArrowVisible] = useState(true);

    useEffect(() => {
        const slider = document.getElementById(slider_child_id);

        if (slider) {
            const handleScroll = () => {
                const isAtStart = slider.scrollLeft === 0;
                const isAtEnd = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
                setIsLeftArrowVisible(!isAtStart);
                setIsRightArrowVisible(!isAtEnd);
            };

            slider.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial check for arrow visibility

            return () => {
                slider.removeEventListener('scroll', handleScroll);
            };
        }
    }, [slider_child_id]);

    const scrollTo = (direction) => {
        const slider = document.getElementById(slider_child_id);
        const sliderWidth = slider.clientWidth;
        slider.scrollLeft += direction === 'next' ? sliderWidth : -sliderWidth;
    };

    // const get_durations = async (id) => {
    //     let val =  await getVideoDuration(id)
    //     return await (val && val.duration) ? val.duration : '00:00'
    // }

    // const [durations, setDurations] = useState({});

//   useEffect(() => {
//     const fetchDurations = async () => {
//       const durationsObj = {};
//       for (const item of data) {
//         const val = await get_durations(item.video_id);
//         durationsObj[item.video_id] = val;
//       }
//       setDurations(durationsObj);
//     };

//     if (data) {
//       fetchDurations();
//     }
//   }, [data]);

    return (
        <>
            <div className="relative lg:grid lg:h-full lg:items-center" id={slider_id}>
                {/* Left Arrow */}
                <div
                    className={`${(hide_scroll_button || !isLeftArrowVisible) ? 'cursor-not-allowed' : 'cursor-pointer'} absolute top-[25%] left-[-15px] h-[35px] w-[35px] z-10 text-black rounded-full flex items-center justify-center`}
                    onClick={() => scrollTo('prev')}
                >
                    <Image alt="Prev" src="/video/black_left.svg" width={35} height={35} />
                </div>

                {/* Slider Content */}
                <div
                    id={slider_child_id}
                    ref={containerRef}
                    className="overflow-auto scroll-smooth lg:flex-[0_0_calc(25%_-_15px)] scrollbar-hide md:gap-[10px] gap-[20px] flex md:p-[0px] md:w-[calc(100vw_-_60px)]"
                >
                    {data &&
                        data.map((res, index) => (
                            <div
                                key={index}
                                className={`${cardClass} item cursor-pointer rounded-[10px] overflow-hidden`}
                                onClick={() => router.push('/video/' + res.route)}
                            >
                                <div className="relative">
                                    <Image
                                        loading="lazy"
                                        blurDataURL="/empty_state.svg"
                                        placeholder="blur"
                                        src={check_Image(res.video_image)}
                                        className={`rounded-[5px] ${imgClass || 'h-[175px] w-full'}`}
                                        height={150}
                                        width={273}
                                        alt={res.title}
                                    />
                                    <div className="absolute bg-[#d50000] bottom-0 left-0 flex items-center gap-[7px] p-[3px_5px] rounded-[5px]">
                                        <Image
                                            src="/irprime/youtube.svg"
                                            className="object-contain h-[12px] w-[12px]"
                                            height={100}
                                            width={100}
                                            alt={res.title}
                                        />
                                        <p className="text-white text-[11px] font-[500]">
                                            {res.duration ? res.duration : "00:00"}
                                            {/* {durations[res.video_id]} */}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between p-[10px]">
                                    <h4 className={`title !font-[500] ${title_class || 'line-clamp-2'} nunito`}>
                                        {res.title || ''}
                                    </h4>
                                </div>
                            </div>
                        ))}
                </div>

                {/* Right Arrow */}
                <div
                    className={`${(hide_scroll_button || !isRightArrowVisible) ? 'cursor-not-allowed' : 'cursor-pointer'} absolute top-[25%] right-[-15px] h-[35px] w-[35px] z-10 text-black rounded-full flex items-center justify-center`}
                    onClick={() => scrollTo('next')}
                >
                    <Image alt="Next" src="/video/black_right.svg" width={35} height={35} />
                </div>
            </div>
        </>
    );
}
