import React from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'

export default function Myprofile({ profileInfo, navigateToProfile }) {
  
  const router = useRouter();

  const clickTogo = (res,index) =>{
    navigateToProfile(res)
  }

  return (
    <>
      {profileInfo.map((res, index) => {
        return (
          // lg:bg-[#eca2a221]
          <div onClick={()=>{clickTogo(res,index)}} className={`${res.selected == 1 ? 'bg-[#bdbdbd21] lg:text-black' : null} flex items-center rounded-[10px] p-[10px] cursor-pointer gap-[10px] lg:hover:bg-[#bdbdbd21] lg:hover:text-black first:mt-[10px] m-[12px_15px] justify-between`} key={index} >
            
            <div className='flex items-center gap-[13px]'>
             <div className='flex items-center justify-center h-[18px] w-[18px]'><Image className="object-contain h-[18px]" height={20} priority width={20} alt='search' src={res.icon}></Image></div>
             <h6 className={'text-[14px] font-medium'}>{res.title}</h6>
            </div>

            <div className='lg:hidden flex items-center justify-center h-[18px]'><Image className='h-[11px] w-[5px] object-contain' src={'/forwardIcon.svg'} height={5} width={5} alt='View All' /></div>
          </div>
        )
      })}
    </>
  )
}