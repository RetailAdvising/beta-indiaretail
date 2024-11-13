import { useState, useEffect } from 'react'
import { check_Image } from '@/libs/api'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Image from 'next/image'
import {domain} from '@/libs/config/siteConfig'
export default function ImageLoader({ src, title, style, type,isDetail }) {
    const [load, setLoad] = useState(false)
    const [lazy, setLazy] = useState(false)
    // useEffect(()=>{
    //     setTimeout(() => {
    //         setLoad(true) 
    //     }, 500);
    // },[])
    // console.log(src,'src')
    const check_Images = (Image) => {
        let baseUrl = `https://${domain}`
        if (Image) {
            if (Image.indexOf('https') == -1) {
                return baseUrl + Image;
            } else if (Image.indexOf('https') == 0) {
                return Image;
            }
        } else {
            // return '/empty_state.svg'
            return '/no-image.jpg'
        }
    }
    return (
        <>
            {/* {!load  && (
                <img
                    className={style}
                    src="/empty_state.svg"
                    alt="Placeholder"
                />
            ) } */}
            <LazyLoadImage
                effect="blur" // You can choose different effects here
                src={isDetail && !load ? '/no-image.jpg' : !load ? '/empty_state.svg' : isDetail ? check_Images(src) : check_Image(src)}
                alt={title}
                className={style}
                style={{
                    opacity: load ? 1 : 0.7,
                    // transition: 'opacity 0.5s',
                    transition: 'all 0.2s',
                    // width: '100%',
                    // height: '100%',
                    // objectFit: 'cover',
                }}
                afterLoad={() =>
                    setTimeout(() => {
                        setLoad(true)
                    }, 250)

                }
            />

            {type && type.video_type && type.video_image && <div className='absolute bottom-[70px] z-10 right-[10px] md:bottom-[65px]'>
                <Image src={'/irprime/youtube.svg'} className='h-[35px] w-[35px] object-contain' height={50} width={50} alt={title + 'video'} />
            </div>}

        </>
    )
    // return <>Loading....</>
}