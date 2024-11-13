import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { Nunito } from 'next/font/google'
import { check_Image } from '@/libs/api'

const nunito = Nunito({
    weight: ["300", "400", "500", "600", "700"],
    display: "block",
    preload: true,
    subsets: ["latin"]
})
export default function SectionBox({ data }) {
    const router = useRouter();
    return (
        <>
            {/* ,backgroundImage: `url(${check_Image(data.background_image)})` */}
            {/* style={{ backgroundColor:`${data.background_color ? data.background_color : '#EDF6E5' }`}} */}
            {data && <div className={`lg:flex lg:justify-between md:block`}  >
                {/* <p className='text-red lg:text-[14px] md:text-[12px] cursor-pointer'>{data.primary_text}</p> */}
                <div className='flex-[0_0_calc(90%_-_10px)]'>
                    <h6 className={`lg:text-[20px] md:text-[15px] text-center line-clamp-[2] font-[700] cursor-pointer ${nunito.className}`} onClick={() => router.push(`/categories/${data.route}`)}>{data.title}</h6>
                    <p className={`sub_title line-clamp-[4] mb-[5px] cursor-pointer text-center w-[60%] m-[auto]`}>{data.description}</p>
                </div>
                <p className='flex flex-[0_0_calc(10%_-_10px)] gap-[5px] md:justify-center mb-[15px] items-center cursor-pointer  seeMore' onClick={() => router.push(`/categories/${data.route}`)}><span className='text-gray font-medium	 md:text-[12px]'>View All</span><Image className='img md:h-[14px] md:w-[14px]' src={'/categories/arrowright.svg'} alt='arrow' height={16} width={16} /></p>
            </div>}
        </>
    )
}
