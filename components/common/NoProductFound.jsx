import React, { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function NoProductFound({height, width, cssClass, empty_icon, heading, sub_heading, button, btnName, route}) {

   const router = useRouter();

   return (
    <>
    {/* <div className='flex items-center justify-center flex-col'> */}
     <div className={`${cssClass ? cssClass : ''} flex items-center justify-center container p-[25px_0_0_0] gap-[7px]`}>
       {empty_icon && 
       <div className='flex items-center justify-center h-[150px]'>
        <Image className="h-[145px]" height={height ? height : 100} priority width={width ? width : 100} alt='search' src={empty_icon} ></Image>
       </div>
       }
       {heading && <p className={'text-[14] font-semibold'}>{heading}</p>}
       {sub_heading && <p className={'text-[14] font-semibold'}>{sub_heading}</p>}

       {button && <button onClick={()=>{router.push(route)}} className='primary_btn h-[35px] p-[0_15px] text-[14px]'>{btnName}</button>}

     </div>
    {/* </div> */}

    </>
   )
}