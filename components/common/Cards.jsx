import React from 'react'
import styles from '@/styles/Cards.module.scss'
import { check_Image } from '@/libs/api'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Tags from './Tags'
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
export default function Cards({ searchNavigation, titleOnly, noPrimaryText, data, isHome = undefined, check, contentHeight, flex, border_none, isBorder, width, height, borderRadius, cardClass }) {
  const router = useRouter();
  const navigateDetail = (data) => {
    // router.push('/login')
    //   else if(data.type == 'News'){
    //     route = '/news/' + data.route
    // }
    let route = ''
    if (data.type == 'Articles') {
      // route = data.ir_prime == '1' ?'/IRPrime/' + data.route : '/categories/' + data.route
      route = '/' + data.route;
    } else if (data.type == 'Product') {
      route = '/bookstore/' + data.route
    } else if (data.type == 'Podcast') {
      route = '/podcast/' + data.route
    } else if (data.type == 'Video') {
      route = '/video/' + data.route
    } else if (data.type == 'Newsletter') {
      console.log(data, "data news card")
      route = '/newsletters/' + data.route
    }

    if (route) {
      router.push(route);
    }
  }


  return (
    <>
      {data && data.map((res, index) => {
        return (
          // '/' + router.asPath.split('/')[1] +
          <div key={res.title ? res.title : index} onClick={() => searchNavigation ? navigateDetail(res) : (router.push(`${isHome ? isHome + res.route : '/' + res.route}`))} className={`${styles.cards} ${flex} cursor-pointer ${isBorder && 'border rounded-[10px]'} ${cardClass}`} >
            <div className={`${styles.img_div}`}>
              {/* layout="fill" sizes="(min-width: 60em) 24vw, (min-width: 28em) 45vw, 100vw"  objectFit="cover" */}
              {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' height={100} width={200} className={` ${height} ${width} ${borderRadius} ${styles.card_img} ${border_none ? 'rounded-[5px]' : 'rounded-[10px]'} `} src={check ? check_Image(res.thumbnail_image ? res.thumbnail_image :res.image ? res.image : res.product_image) : check_Image(res.thumbnail_image ? res.thumbnail_image : res.image) } alt={"cards"} /> */}
              <ImageLoader style={`${height} ${width} ${borderRadius} ${styles.card_img} ${border_none ? 'rounded-[5px]' : 'rounded-[10px]'}`} src={res.thumbnail_image ? res.thumbnail_image : res.image ? res.image : res.product_image} title={res.title} />
            </div>
            <div className={`${styles.content} ${isBorder && 'p-[10px] '} ${contentHeight}  flex justify-between flex-col`}>
              {((res.primary_text && res.secondary_text) && !noPrimaryText) && <p className='flex gap-2 line-clamp-1 items-center'><span className={`primary_text fnt_13 line-clamp-1 nunito`}>{res.primary_text || res.type}</span> {res.secondary_text && <span className='h-[10px] w-[1px] bg-[#6f6f6f]'></span>} <span className={`secondary_text line-clamp-1 nunito`}>{res.secondary_text}</span></p>}
              {(!res.primary_text && res.type) && <p className='flex gap-2 '><span className='primary_text fnt_13'>{res.type}</span></p>}
              {res.title && <h4 className={`card-title line-clamp-2 lg:min-h-[40px] ${isHome ? '' : 'mt-2'} nunito`}>{res.title ? res.title : ''}</h4>}
              {(res.sub_title || res.blog_intro) && !titleOnly && <p className={`sub_title pt-1 ${(isHome && res.title) ? 'line-clamp-1 lg:pt-[10px]' : (isHome && !res.title) ? 'line-clamp-2' : 'line-clamp-2'}`}>{res.blog_intro ? res.blog_intro : res.sub_title ? res.sub_title : ''}</p>}
              {/* {((res.publisher) && !noPrimaryText) && <p className={`hashtags pt-[10px]`}>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>} */}
              {((res.hashtags) && !noPrimaryText) && <p className={`light_text pt-[10px]`}>{res.hashtags ? res.hashtags : ''}</p>}
              {!titleOnly && <Tags tags={res.tags} />}
            </div>
          </div>
        )
      })}
    </>
  )
}
