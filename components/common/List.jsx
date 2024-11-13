import React from 'react'
import Image from 'next/image'
import { check_Image, trending } from '@/libs/api'
import exclusives from '@/styles/Exclusives.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link'
import Tags from './Tags';
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
// import {Roboto} from 'next/font/google'

// const roboto = Roboto({
//     weight: ["200","300","400","500","600",'700'],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"]
//   })


export default function List({ imgFlex, hash_bg, contentWidth, primary_pb, line, data, titleClamp, isTop, isReverse, borderRadius, imgHeight, imgWidth, isBB, flex, isMp, fullWidth, noWidth, tittleOnly, isHome = undefined, isDesc, descLine, mb }) {
    const router = useRouter();
    function navigate(event, res) {
        event.stopPropagation();
        // '/' + router.asPath.split('/')[1] +
        router.push(`${isHome ? isHome + res.route :  '/' + res.route}`)
    }

    return (
        <>
            {data && data.map((res, index) => {
              
                return (
                    // style={{flex:flex}}
                    <div key={res.title ? res.title : index} onClick={($event) => navigate($event, res)} className={`${flex} flex cursor-pointer gap-[15px] ${(index != data.length - 1 && !isMp) ? 'pb-[10px]' : (isMp && index != data.length - 1) ?
                        'lg:mb-[20px] lg:pb-[20px] md:pb-[10px] md:mb-[10px]' : ''} ${mb && index != data.length - 1 ? 'lg:mb-[10px]' : ''} relative ${exclusives.card_item} ${(isReverse) ? 'flex-row-reverse items-center  mb-[10px] justify-between' : ''} ${(isReverse && index != data.length - 1) ?
                            'border_bottom' : ''} ${(isBB && index != data.length - 1) && 'border_bottom mb-[10px]'}`}>
                        {((res.primary_text || res.secondary_text) && isTop) && <p className={`flex line-clamp-1  ${exclusives.title_top}  items-center absolute`}><span className={`primary_text pr-[8px] line-clamp-1 nunito`}>{res.primary_text}</span> {res.secondary_text && <span className='h-[10px] w-[1px]  bg-[#6f6f6f]'></span>} <span className={`pl-[8px] line-clamp-1 secondary_text nunito`}>{res.secondary_text}</span></p>}
                        {/* ${check ? '' : 'basis-1/4'} */}
                        <div className={`${imgFlex} ${isTop && 'pt-[25px]'} ${isReverse ? 'flex-[0_0_calc(35%_-_10px)]' : ''}`}>
                            {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgHeight} ${imgWidth} ${borderRadius}`} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.image ? res.image : res.video_image ? res.video_image : null )} height={100} width={100} alt={"image"} /> */}
                            <ImageLoader style={`${imgHeight} ${imgWidth} ${borderRadius}`} src={res.thumbnail_image ? res.thumbnail_image : res.image ? res.image : res.video_image ? res.video_image : null } title={res.title ? res.title : 'indiaRetail'} />
                        </div>
                        {/* w-[280px] */}
                        <div className={`${(!fullWidth && !isReverse) && ''} ${contentWidth} flex flex-col leading-[1] ${isTop && 'pt-[25px]'}`}>
                            {((res.primary_text || res.secondary_text) && !isTop) && <p className={`flex items-center line-clamp-1 ${primary_pb}`}><span className={`primary_text pr-[8px] line-clamp-1 nunito`}>{res.primary_text}</span> {res.secondary_text && <span className='h-[10px] w-[1px] bg-[#6f6f6f] '></span>} <span className={`secondary_text line-clamp-1 pl-[8px]  nunito`}>{res.secondary_text}</span></p>}
                            {res.title && <h6 className={`title  pt-[5px] ${titleClamp ? titleClamp : 'line-clamp-1'} nunito`}>{res.title ? res.title : ''}</h6>}
                            {((res.sub_title || res.blog_intro) && !tittleOnly) && <p className={`sub_title pt-[5px] ${line ? line : 'line-clamp-2'}`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
                            {/* {((res.hashtags || res.publisher) && !tittleOnly) && <p className={`hashtags  ${hash_bg ? hash_bg : 'pt-[5px]'} font-[500]`}>by {res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>} */}
                            <Tags tags={res.tags}/>
                            {(isDesc && res.description) && <div className={`${descLine ? descLine : ''} sub_title innertag pt-[5px] line-clamp-1`} dangerouslySetInnerHTML={{ __html: res.description }} />}
                        </div>
                    </div>
                )
            })}
        </>
    )
}