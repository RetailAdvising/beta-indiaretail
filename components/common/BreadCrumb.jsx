import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
export default function BreadCrumb({BreadCrumbs, cssClass}) {

   const router = useRouter();

   return (
    <>
    <div className={`${cssClass ? cssClass : ''} flex items-center container p-[25px_0_0_0] gap-[7px]`}>
      {BreadCrumbs && BreadCrumbs.length != 0 && BreadCrumbs.map((res,index)=>{
        return(
          <div className='flex items-center gap-[7px]' key={index}>
            <h6 onClick={()=>{(((index + 1) != BreadCrumbs.length ) && res.route) ? router.push(res.route) : null}} className=" cursor-pointer capitalize text-[14px] hover:text-[red]" >{res.name}</h6>
            {index + 1 < BreadCrumbs.length && <div className='flex items-center justify-center'><Image height={7} priority width={7} alt='search' src={'/forwardIcon.svg'} className="opacity-50"></Image></div>}
          </div>
        )
      })}
    </div>
    </>
   )
}