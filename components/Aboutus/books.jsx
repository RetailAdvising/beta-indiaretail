import Image from 'next/image';
import data from '@/libs/books'

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Books(){
    const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 4,
          slidesToScroll: 4,
          autoplay: true,
          autoplaySpeed: 3000,
          pauseOnHover: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 1,
                spaceBetween: 20
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                spaceBetween: 10
              }
            }
          ]
    };
  return (
    <>
    <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-center'>{data.title2}</h2>
    <p className='sub_title josefin-sans text-center pb-3 pt-3'>{data.subtitle2}</p>
    <div className="pt-9 pb-9 md:pt-4 md:pb-4 gap-4 md:gap-2 books">
    <Slider {...settings}>
      {data.books.map((book,index) => {
      return(
            <div className='p-0' key={index}>
                <Image src={book.image} alt="Books" width={200} height={200} className='m-2 m-auto p-3' />
                <h3 className='text-1xl font-bold text-center'>{book.title}</h3> 
            </div>
      )
      }
      )}
      </Slider>
    </div>
    </>
  )
}

