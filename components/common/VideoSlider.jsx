import React from 'react'
import Carousel from "react-multi-carousel";
import 'react-multi-carousel/lib/styles.css';


const VideoSlider = ({youtube}) => {

      const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
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
    <div className='py-[20px]'>

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
                        // infinite
                        pauseOnHover
                        responsive={responsive}
                        slidesToSlide={1}
                        swipeable
                        // centerMode={true}
                        // itemClass="carousel-item-padding-40-px"
                        containerClass="carousel-container-digital-video"
                    // showDots={true}
                    >
                        {youtube && youtube.length > 0 && youtube.map((item, index) => (
                            <div key={index} className="md:px-[10px] lg:pr-[10px] h-full">
                               <iframe
                            width="100%" height="250"
                            src={`https://www.youtube.com/embed/${item.youtube_video_id}`}
                            frameBorder="0"
                            allowFullScreen
                            className="rounded"
                            style={{ minWidth: "100%", overflow: "hidden" }}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        ></iframe>
                            </div>
                        ))}

                    </Carousel>
    </div>
  )
}

export default VideoSlider