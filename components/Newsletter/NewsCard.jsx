import React from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
import { check_Image } from '@/libs/common'
import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//   weight: ["300", "400", "500", "600", "700"],
//   display: "block",
//   preload: true,
//   style: 'normal',
//   subsets: ["latin"],
//   variable: '--font-inter',
// })
export default function NewsCard({ data, imgClass, imgFlex, cardClass }) {
  const router = useRouter();
  // console.log(router.asPath)
  // const route1 = window.location.origin + ('/' + res.route.split('/')[0] + '/' + parent.day + '/' + res.route.split('/')[1]) // Replace with your route
  //               window.open(route1, '_blank');
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div key={index} onClick={() => { window.open((window.location.origin + '/' + router.asPath + '/' + res.name), '_blank') }} className={`border cursor-pointer rounded-[10px] ${cardClass}`}>
            <div className={`${imgFlex}`}>
              {/* <Image className={`${imgClass}`} src={check_Image(res.image)} height={100} width={200} alt={res.title} /> */}
              <ImageLoader style={`${imgClass}`} src={res.image} title={res.title || res.subject} />

            </div>
            <div className={`p-[10px]`}>
              {(res.title || res.subject) && <p className={`line-clamp-2 title nunito`}>{res.title ? res.title : res.subject ? res.subject : ''}</p>}
              {/* {res.title && <p className={`${res.title ? 'line-clamp-1' : 'line-clamp-2'} sub_title pt-[10px]`}>{res.title}</p>} */}
            </div>
          </div>
        )
      })}
    </>
  )
}



