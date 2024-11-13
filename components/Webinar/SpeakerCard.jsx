import React from 'react'
import ImageLoader from '../ImageLoader'
import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({
    weight: ["300","400","500","600","700"],
    display: "block",
    preload: true,
    style: 'normal',
    subsets: ["latin"],
    variable: '--font-inter'
})

const SpeakerCard = ({ data }) => {
  return (
    <div className='relative flex flex-col lg:flex-row gap-1 lg:gap-2 lg:w-fit md:w-full'>
      <div className='flex-shrink-0'>
        <ImageLoader src={data.profile_image} style="h-[92px] md:h-[170px] w-[90px] md:w-full object-cover rounded-xl" />
        <div className='absolute top-0 bg-[#F25022] rounded-tl-xl rounded-br-lg p-[6px] md:p-[8px]'>
          <Image src="/webinar/microphone.png" width={8} height={7} />
        </div>
      </div>

      <div className='flex flex-col justify-between pb-[5px]'>
        <div>
          <p className={`md:text-[14px] lg:text-[16px] font-medium nunito`}>
            {data.name1}
          </p>
          <p className='md:text-[12px] lg:text-[14px] text-[#666666] sub_title font-normal'>
            {data.designation}
          </p>
        </div>
        <span className='text-[#F25022] text-[12px] md:text-[14px]'>
          {data.company_name}
        </span>
      </div>
    </div>
  )
}

export default SpeakerCard
