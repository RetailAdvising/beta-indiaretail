import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import AlertPopup from '../common/AlertPopup';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';

export default function SubscribeNews({ data, visible, hide, no_modal, email = undefined,cssClass }) {

  // useEffect(() => {

  // },[]) 

  return (
    <div className='NewsLetterSub'>
      {!no_modal && <Rodal visible={visible} onClose={hide}>
        <NewsLetterSub cssClass={cssClass} email={email} data={data} hide={hide} />
      </Rodal>
      }
      {no_modal && <NewsLetterSub cssClass={cssClass} data={data} hide={hide} />}
    </div>
  )
}

const NewsLetterSub = ({ data, hide,email,cssClass }) => {

  let [news, setNews] = useState(data);
  let [indexNews, setIndexNews] = useState(-1);


  // useEffect(() => {

  // },[]) 

  function selectNewLetter(array, index) {
    array.map((res, i) => {
      if (i == index) {
        res.selected = res.selected == 1 ? 0 : 1;
      }
    })
    setNews(array);
    setIndexNews(indexNews + 1);
    console.log(array)
  }


  return (
    <>
      <div className={`${cssClass} flex flex-col h-[100%]`}>

        {/* border-b-[1px] border-b-slate-100  h-[55px] px-[10px] */}
        <div className='header p-[35px_30px_15px_30px]'>
          <h6 className='text-[18px] font-semibold'>Newsletters Subscription</h6>
          <h5 className='text-[12px] gray_color pt-[5px] line-clamp-2'>In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.</h5>
        </div>

        <div className='body_sec h-[100%] overflow-auto scrollbar-hide p-[10px] w-[95%] m-[0px_auto]'>
          {news && news.map((res, index) => {
            return (
              <div key={index} onClick={() => { selectNewLetter(news, index) }} className='flex items-center justify-between border-0 rounded-[10px] border-slate-100 hover:bg-[#f1f1f159] mb-[10px] cursor-pointer pr-[10px]'>
                <div className={`flex w-[93%] items-center w-full p-[0px] gap-[5px]`} >
                  <span className='h-[65px] w-[65px] flex items-center justify-center p-[5px] rounded-[50%]'><Image className={`h-[50px] w-[50px] rounded-[50%] object-cover`} src={check_Image(res.image)} height={150} width={150} alt={''} /></span>
                  <div className='w-[85%'>
                    <h6 className='text-[14px] font-semibold capitalize'>{res.primary_text} <span className='text-[12px] gray_color'>({res.title})</span></h6>
                    {/* <h6 className='text-[12px] pt-[2px] gray_color'>{res.custom_title} </h6> */}
                  </div>
                </div>
                <span className='h-[20px] w-[7%]'><Image className={`h-[18px] object-contain`} src={res.selected == 1 ? '/newsletter/tick.svg' : '/newsletter/plus.svg'} height={18} width={18} alt={''} /></span>
              </div>
            )
          })}
        </div>

        <div>
          <AlertPopup email={email} news={news} hide={hide}></AlertPopup>
        </div>

      </div>
    </>
  )
} 