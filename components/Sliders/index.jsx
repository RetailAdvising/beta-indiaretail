import React from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';
import styles from '@/styles/Slider.module.scss'
import Image from 'next/image';
import { check_Image } from '@/libs/api';
import { useRouter } from 'next/router';
export default function Sliders({ data,perView,imgClass,event,isMobile }) {
  // console.log(data)
  const router = useRouter();
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: perView ? perView : 3,
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
  return (
    <>


     <Carousel
        // ssr
        // partialVisbile
        // deviceType={deviceType}
        // containerClass="container-with-dots"
        // dotListClass="dots"
        // shouldResetAutoplay
        // showDots
        // renderDotsOutside={false}
        // sliderClass=""
        
        autoPlay
        arrows={false}
        autoPlaySpeed={2500}
        infinite
        pauseOnHover
        responsive={responsive}
        slidesToSlide={1}
        swipeable
        // centerMode={true}
        // itemClass="carousel-item-padding-40-px"
        // containerClass="carousel-container"
        // showDots={true}
      >
        {data.map((res, index) => {
          return (
            <div onClick={()=> res.route ? router.push(`/${router.asPath.split('/')[1]}/category/${res.route}`) : null} className={`${event ? '' : 'flex items-center justify-center gap-[15px] h-full'}`} key={index}>
              <div className={`lg:flex-[0_0_calc(30%_-_10px)]`}>
              {/* h-[310px] w-[210px] object-contain */}
              {/* {isMobile} */}
                <Image alt={''} src={check_Image(isMobile ? res.mobile_image  : res.image ? res.image : res.detail_image ? res.detail_image : null)} quality={100} height={300} width={1500} className={`${imgClass ? imgClass : 'h-[300px]'} w-full `} />
              </div>
             {!event && <div className={`flex flex-col items-start justify-start lg:h-[175px]`}>
                <p className={`text-[15px] line-clamp-2 font-bold`}>{res.item}</p>
                <p className={`sub_title my-[15px] line-clamp-4`}>{res.short_description ? res.short_description : 'Retail in the New Phygital Era Arguably the Indian consumers have come of age'}</p>
                <button className={`p-[8px] text-[14px] rounded-[5px] ${styles.optionsBtn} bg-[#fff]`} >Select options</button>
              </div>}
            </div>
          )
        })}


      </Carousel>



    </>
  )
}
