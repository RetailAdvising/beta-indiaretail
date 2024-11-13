import React,{useRef, useState} from 'react'
import Image from 'next/image'
import { check_Image } from '@/libs/common';
export default function YTVideo({ data, flex, classImg, isBg,frame }) {
  const player = useRef(null);

  function playVideo(id,video){
    // player.current.onload;
    // console.log(player)
    // console.log(id)
    let element = document.getElementById(id);
    // console.log(element)
    element.style.display= 'none';
    let vid = document.getElementById(id+JSON.stringify(video));
    vid.addEventListener('click',function(e){
      e.target.attributes.src.value += '?autoplay=1';
    })
   setTimeout(() => {
    vid.click();
   }, 400);    
  }
  return (
    <>
      {data && data.map((res, index) => {
        return (
          <div key={index} className={`${flex} ${classImg} relative overflow-hidden `}>
            <div className={`${frame}`}>
              <iframe
              ref={player}
                className={`h-full w-full`}
                title={res.name ? res.name : ''}
                src={`https://www.youtube.com/embed/${res.link ? res.link : res.video_id
              }`}
                id={res.id+ JSON.stringify(index)}
                // width={res.width}
                // height={res.height}
                frameBorder="2"
                loading="lazy"
              // allowfullscreen="allowfullscreen"
              ></iframe>

            </div>
            {res.video_image && <Image id={res.id} onClick={()=> playVideo(res.id,index)} src={check_Image(res.video_image)} className={`absolute top-0 ${frame ? 'h-[85%]': 'h-[75%]'} w-full`} height={res.height? res.height : 100} width={res.width ?res.width : 200} alt={''} />}
            {res.content && <p className={`pt-[10px]  ${isBg ? 'text-white': ''}`}>{res.content}</p>}
            {res.title && <p className={`pt-[10px] ${isBg ? 'text-white': ''}`}>{res.title}</p>}
          </div>
        )
      })}
    </>
  )
}
