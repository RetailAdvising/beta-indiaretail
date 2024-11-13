import React from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link'
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
export default function TopStories({ data }) {
    // data = data.slice(0,3)
    return (
        <>
            {data && data.slice(0, 4).map((res, index) => {
                return (
                    <Link key={index} href={'/' + res.route} className='flex-[0_0_calc(25%_-_15px)] flex gap-[10px] justify-between items-center h-[85px] px-[10px]  rounded-[5px] bg-white  md:h-[85px] md:flex-[0_0_calc(85%_-_10px)]'>
                        {/* <div  className={`flex gap-[10px]  items-center h-[100px] px-[10px]  rounded-[5px] bg-white  md:h-[80px]  md:flex-[0_0_calc(90%_-_10px)] ${index == data.length - 1 ? 'md:mx-[15px]' : index == 0 ? '' : 'md:ml-[15px]'}`}> */}
                        {/* <div > */}
                        <div className='flex-[0_0_calc(27%_-_5px)]  md:h-[70px] md:flex-[0_0_calc(33%_-_10px)]'>
                            <ImageLoader style={`rounded-[5px] h-[60px] md:h-[60px] w-full`} src={res.thumbnail_image ? res.thumbnail_image : res.image} title={res.title} />
                            {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.image)} height={80} width={100} alt={res.title} className={`rounded-[5px] h-[75px] md:h-[70px] w-full`} /> */}
                        </div>
                        {/* </div> */}
                        <div className='lg:flex-[0_0_calc(73%_-_5px)]'>
                            <p className={`${res.primary_text ? 'top_primary_text' : 'fnt_14'} tracking-[0] nunito`}>{res.primary_text}</p>
                            {/* <Link href={'/' + res.route}> */}
                            <h6 className={`top_title tracking-[0] nunito`}>{res.title}</h6>
                            {/* </Link> */}
                        </div>
                        {/* </div>*/}
                    </Link>
                )
            })}
        </>
    )
}
