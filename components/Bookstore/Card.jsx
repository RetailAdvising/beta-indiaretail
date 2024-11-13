import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import ImageLoader from '../ImageLoader';
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300","400","500","600","700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
//   })
export default function Card({ data, height, category, padding, isHome = false, flex, object_fit, isBorder, boxShadow, isLanding, imgClass }) {

  const router = useRouter();

  return (
    <>
      {data.map((res, index) => {
        return (
          <div key={index} onClick={() => router.push(`${isHome ? '/bookstore/' + res.category_route + '/' + res.route : isLanding ? '/' + router.asPath.split('/')[1] + '/' + category + '/' + res.route : '/' + router.asPath.split('/')[1] + '/' + router.asPath.split('/')[3] + '/' + res.route}`)} className={`${flex} cursor-pointer ${isBorder && 'border p-[10px] rounded-[5px]'}`}>
            <div className={`${padding ? padding : null}`}>
              {/* <Image className={` ${object_fit ? object_fit : 'object-cover'} ${imgClass ? imgClass : (height ? height : 'h-[150px]')} ${boxShadow && 'rounded-[5px]'}`} src={check_Image(res.product_image ? res.product_image : res.image ? res.image : null)} height={300} width={242} alt={res.title ? res.title : 's'}></Image> */}
              <ImageLoader style={`${object_fit ? object_fit : 'object-cover'} ${imgClass ? imgClass : (height ? height : 'h-[150px]')} ${boxShadow && 'rounded-[5px]'}`} src={res.product_image ? res.product_image : res.image ? res.image : null} title={res.title ? res.title : 's'} />
            </div>
            <h6 className={`pt-[10px] line-clamp-1 text-[14px] md:text-[14px] leading-normal font-[700] text-center nunito`}>{res.item_title ? res.item_title : res.item ? res.item : ''}</h6>
          </div>
        )
      })}
    </>
  )
}
