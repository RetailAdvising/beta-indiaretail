import React, { useEffect, useState } from 'react';
import styles from '@/styles/Components.module.scss'
import { check_Image } from '@/libs/common'
import Image from 'next/image';

export default function Faq({data}) {
  // const [open, setOPen] = useState(false);

  const [seclected, setSelcted] = useState(-1)

  const toggle = (index) => {
    for (let i = 0; i < data.data.length; i++) {
      if (index == i) {
        seclected == index ? setSelcted(-1) : setSelcted(i)
      }
    }
  }

  useEffect(()=>{

  },[seclected])

  return (
    <div className="flex flex-row items-center lg:pt-[40px] gap-6 md:flex-col container">
      <div className="basis-1/2 text-center m-auto md:basis-full">
           <Image src={check_Image(data.left_image)} alt="About" width={400} height={400} className='m-auto object-contain h-[390px] md:h-[185px]'/>
      </div>
      <div className="basis-1/2">
       <h2 className='font-bold text-3xl md:text-2xl'>{data.title}</h2>
        <div className='accordion'>
          {data.data.map((faq,index) => {
            return (
              <div key={index}>
                <h3  className='text-1xl font-bold pb-2 d__flex faq_title' onClick={() => toggle(index)}>{faq.question}<span>{(seclected == index) ? '-' : '+'}</span></h3>
                <p className={(seclected == index) ? 'content show' : 'content'}>{faq.answer}</p>
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}

