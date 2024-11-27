import Image from 'next/image';
import Slider from "react-slick";
import styles from '@/styles/Slider.module.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { check_Image } from '@/libs/common';

export default function ChildSlider({ data, type, rows,colsPerView, cols, per_view,check }) {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
        autoplay: {
            delay: 5000
        },
        speed: 4000,
        slidesToShow: 3,
        slidesToScroll: per_view ? per_view : 1,
        spaceBetween: 20,
        rows: rows ? rows : 1,
        slidesPerRow: colsPerView ? colsPerView : 1,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    // slidesToShow: per_view ? per_view : 3,
                    slidesToScroll: 1,
                    infinite: true,
                    rows: 1,
                    slidesPerRow: 6,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 6,
                    initialSlide: 2,
                    // dots: true,
                    infinite: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 6,
                    // dots: true,
                    infinite: true,
                }
            }
        ]
    };
    return (
        <>
            {/* <div className={perView == 3 ? 'slide' : 'slide2'} >
                <Slider {...settings}>
                    {data.map((image, index) => (
                        <div className={`${styles.cards}`} key={index}>
                            <Image className={`${styles.img}`} src={image.thumbnail_image} height={150} width={220} alt={`Slide ${index + 1}`} />
                            <p className={`${styles.sub_title}`}>{image.title}</p>
                        </div>
                    ))}
                </Slider>
            </div> */}

            {type == 'list' && <>
                <Slider {...settings}>
                    {data.map(res => {
                        return (
                            <div key={res.primary_text} className={`d__flex gap-3 rounded-lg p-2  ${styles.mb30} ${styles.list_parent}`}>
                                <div className='flex-[0_0_calc(40%_-_10px)]'>
                                    <Image src={check ? check_Image(res.image) : res.image} alt={"image"} height={200} width={300} className='rounded-lg h-full w-full' />
                                </div>
                                <div>
                                    {(res.primary_text && res.secondary_text) && <p className='flex '><span className={`text-red ${styles.primary_text} border_right pr-[10px] `}>{res.primary_text}</span> <span className={`${styles.secondary_text} pl-[10px]`}>{res.secondary_text}</span></p>}
                                    <p className={`${styles.title} line-clamp-2`}>{res.title ? res.title : ''}</p>
                                    {res.sub_title && <p className='line-clamp-2'>{res.sub_title ? res.sub_title : ''}</p>}
                                    {res.hashtags && <p>{res.hashtags ? res.hashtags : ''}</p>}
                                </div>
                            </div>
                            //     <div className={``} key={res.title}>

                            //          <div>
                            //             <Image src={res.image} height={250} width={250} alt={res.title} />
                            //         </div>
                            //         <div>
                            //             {res.primary_text && <p className={``}><span>{res.primary_text}</span><span>{res.secondary_text ? res.secondary_text : ""}</span></p>}
                            //             <p>{res.title}</p>
                            //         </div> 
                            //  </div> 
                        )
                    })}
                </Slider>
            </>}
            {type == 'card' && <div className='card'>
                <Slider {...settings}>
                    {data && data.map((res, index) => {
                        return (
                            <div key={index} className={`${styles.cards}`} style={{width:'285px !important'}}>
                                <div>
                                    <Image src={check ? check_Image(res.image) : res.image} height={150} width={300} alt={"image"} />
                                </div>
                                <div className={`${styles.card_content}`}>
                                    {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center'><span className={`text-red ${styles.primary_text}`}>{res.primary_text}</span> <span class="h-[10px] w-[1px] bg-[#6f6f6f]"></span> <span className={`${styles.secondary_text}`}>{res.secondary_text}</span></p>}
                                    <h4 className={` title`}>{res.title ? res.title : ''}</h4>
                                    <p className={` sub_title pt-1`}>{res.sub_title ? res.sub_title : ''}</p>
                                    <p className='hashtags pt-1'>{res.hashtags ? res.hashtags : ''}</p>
                                </div>
                            </div>
                        )
                    })}
                </Slider>
            </div>}


            {type == 'video' && <>
        <Slider {...settings}

            >
                {data && data.map((res, index) => {
                    return (
                        <div key={index} >
                            <iframe
                                title="YouTube video player"
                                src={`https://www.youtube.com/embed/${res.link}`}
                                width={width}
                                height={height}
                            // allowfullscreen="allowfullscreen"
                            ></iframe>
                            <p className={`text-[14px] font-semibold pt-[10px]`}>{res.title}</p>
                        </div>
                    )
                })}
            </Slider>
    
        
        </>}
            
        </>
    )
}





    
