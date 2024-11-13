import { check_Image } from '@/libs/common'
import Image from 'next/image'
import React from 'react'
import List from '../common/List'
export default function ImageContainer({ data }) {
    let sub_title = 'Changanassery: The Vatican published the list of participant who will attend the Synod on Synodality scheduled from October 4 to 29. The list includes participants ...'
    return (
        <>
            {(data && data.data) &&
                <div className='border rounded-[5px] p-[10px]'>
                    <div className='border_bottom pb-[10px] mb-[10px]'>
                    <p className='text-[16px] font-semibold pb-3'>{data.data.title}</p>
                    <Image className='rounded-[5px]' src={check_Image(data.data.thumbnail_image)} height={350} width={500} alt={data.data.title} />
                    <p className='flex items-center py-3'><span className='primary_text border_right pr-[8px]'>{data.data.primary_text}</span><span className='secondary_text pl-[8px]'>{data.data.secondary_text}</span></p>
                    <p className='sub_title'>{sub_title}</p>
                    </div>

                    {(data && data.datas) && <List imgWidth={"w-[220px]"} imgHeight={"h-[100px]"} data={data.datas} borderRadius={'rounded-[5px]'} isReverse={true} check={true} />}
                </div>}
        </>
    )
}
