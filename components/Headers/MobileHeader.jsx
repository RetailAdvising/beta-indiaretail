import React from 'react'
import Image from 'next/image'

export default function MobileHeader({ Heading }) {
  return (
    <>
      <div className='flex items-center h-[45px] border-b-[1px] p-[0px_10px] border-slate-200 justify-between'>
        <Image onClick={() => window.history.back()} className='h-[16px]' src="/backIcon.svg" height={14} width={15} layout="fixed" alt="Edit" />
        <h6 className='text-[16px] font-semibold tex-black'>{Heading}</h6>
        <span></span>
      </div>
    </>
  )
}