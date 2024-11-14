import React, { useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/newsLetter.module.scss'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import AlertPopup from '../common/AlertPopup';
import SubscribeNews from './SubscribeNews';
import AlertUi from '@/components/common/AlertUi';
import ImageLoader from '../ImageLoader';
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300","400","500","600","700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
//   })
export default function NewsList({ data,navigate }) {
  const router = useRouter();
  const [showAlert, setShowAlert] = useState(false);
  const [news, setNews] = useState()

  async function showPopup(obj,index) {
    // console.log(obj);

    let get_check = data.filter(res=>{ return res.selected == 1})

    if(get_check.length == data.length){
      setAlertMsg({message:'Already you have subscribed all the Newsletters'});
      setEnableModal(true);
    }else{
      data.map((res,i)=>{
        if(i == index){
          res.selected = 1;
        }else{
          res.selected = 0;
        }
      })
      setNews(obj);
      setShowAlert(true);
      show();
    }


  }

  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  const [enableModal,setEnableModal] = useState(false)
  const [alertMsg, setAlertMsg] = useState({})

  async function closeModal(value){
      setEnableModal(false);

      if(!localStorage['customer_id']){
        let ele = document.getElementById('sign-in')
        if(ele){
          ele.click()
        }
      }
  }
 
  function hide(obj) {
    setVisible(false);
    if(obj.status == 'Success'){
      setAlertMsg({message:'You have successfully subscribed to our newsletter'});
      setEnableModal(true);
    }
  }

  // const navigate = (res) => {
  //   // console.log(res)
  //   const route1 = window.location.origin + ('/' + res.route.split('/')[0] + '/' + res.title + '/' + res.route.split('/')[1]) // Replace with your route
  //   window.open(route1, '_blank');
  // }



  return (
    <>

    
      {enableModal && 
              <AlertUi isOpen={enableModal} closeModal={(value)=>closeModal(value)} headerMsg={'Alert'} button_2={'ok'} alertMsg={alertMsg} /> 
      }

      {data && data.map((res, index) => {
        return (
          <div className={`flex gap-[10px] cursor-pointer justify-between ${index != data.length - 1 ? 'pb-[20px]' : ''}`} key={index}>
            {/* flex-[0_0_calc(15%_-_10px)] */}
            <div  onClick={() => navigate(res,null)} className={`cursor-pointer flex gap-[10px] lg:w-[110px] md:flex-[0_0_calc(35%_-_5px)]`}>
              {/* <Image className={`lg:h-[93px] md:h-full w-full rounded-[6px] `} src={check_Image(res.image)} height={100} width={200} alt={res.title} /> */}
              <ImageLoader style={`lg:h-[93px] md:h-full w-full rounded-[6px]`} src={res.image} title={res.title ? res.title : 's'} />

            </div>
            <div  className={`lg:leading-[1.7] md:gap-[5px] md:flex-[0_0_calc(65%_-_5px)] lg:flex-[0_0_calc(60%_-_10px)]`}>
              <p onClick={() => navigate(res,null)} className={`text-[#818181] leading-[17.62px] lg:text-[13px] md:text-[11px] capitalize nunito`}>{res.title}</p>
              <h6 onClick={() => navigate(res,null)} className={`line-clamp-1 font-[700] text-[17px] md:text-[14px] nunito capitalize`}>{res.primary_text}</h6>
              <p onClick={() => navigate(res,null)} className={`text-[14px] md:text-[12px] line-clamp-2 josefin-sans`}>{res.description}</p>
              <div className='flex lg:hidden items-center md:gap-[10px] gap-[20px]'>
                {/* <p className='cursor-pointer text-[14px] md:text-[12px] font-semibold' onClick={() => router.push(`/${res.route}`)}>Preview</p> */}
                <p className='flex cursor-pointer justify-center items-center seeMore' onClick={() => {showPopup(res, index)}}><span className='capitalize text-[11px] text-[#e21b22] font-semibold'>Sign Up</span> <Image className='img h-[14px] object-contain' src={'/arrowrightprimary.svg'} height={15} width={15} alt='signup' /></p>
              </div>
            </div>
            {/* justify-between */}
            <div className='flex md:hidden items-center pl-[15px] gap-[10px] flex-[0_0_calc(25%_-_10px)]'>
              <p className={`cursor-pointer nunito flex-[0_0_calc(50%_-_10px)]`} onClick={() => navigate(res,null)}>Preview</p>
              <p className={`flex cursor-pointer nunito justify-center items-center seeMore`} onClick={() => {showPopup(res, index)}}><span className='primary_text '>Sign Up</span> <Image className='img' src={'/arrowrightprimary.svg'} height={15} width={15} alt='signup' /></p>
            </div>
          </div>
        )
      })}

      {/* {(showAlert && news) && <AlertPopup data={news} show={() => setShowAlert(false)} />} */}

      {visible && <SubscribeNews data={data} visible={visible} hide={(obj)=> hide(obj)} />}

    </>
  )
}
