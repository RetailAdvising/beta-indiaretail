import { check_Image, checkMobile } from '@/libs/api'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import ImageLoader from '../ImageLoader';

export default function AdsBaner({ data, height, Class, style, width, homeAd, footerAd }) {
  const router = useRouter()
  let [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    let is_mobile = await checkMobile();
    isMobile = is_mobile
    setIsMobile(isMobile);
  }

  // const load = (img, image) => {
  //   // let loaded = check_Image(image);
  //   img.target.src = '/empty_state.svg'
  //   setTimeout(() => {
  //     img.target.src = check_Image(image)
  //   }, 100);
  // }

  return (
    <>
      {
        data && <div style={style} onClick={() => window.open(data.banner_link ? data.banner_link : data.ad_link, '_blank')} className={`${Class}`}>
          {/* {data &&
            <div className='flex items-center justify-center gap-[5px]'>
              <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
              <h6 className='text-[11px] tracking-[0.1]'>{data.title ? data.title : 'Advertisement'}</h6>
              <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
            </div>
            //  <h6 className='fnt_12 text-center ads_line relative text-[#0000009c]'>{data.title ? data.title : 'Advertisement'}</h6>
          } */}
          {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur'  src={data.ad_image || check_Image(data.banner_image)} height={250} className={`${height} ${width} `} width={970} alt='ad' /> */}
          <ImageLoader style={`${height} ${width}`} src={isMobile ? data.mobile_image : data.ad_image ? data.ad_image : data.banner_image ? data.banner_image : data.web_image} title={data.title ? data.title : 's'} />
        </div>
      }
      {
        (homeAd && homeAd.header && homeAd.header.length != 0) ? <>
          {homeAd.header[0] && <div onClick={() => window.open(homeAd.header[0].banner_link, '_blank')} style={style} className={`${Class} !h-[200px] !w-[980px]`}>
            {/* loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' */}
            {/* onLoad={(image) => load(image, homeAd.header[0].banner_image)} */}
            {/* {(homeAd.header[0].title && homeAd.header[0].title != null) && <p className='fnt_12 text-center'>{homeAd.header[0].title ? homeAd.header[0].title : ''}</p>} */}
            <ImageLoader style={`h-full w-full cursor-pointer`} src={homeAd.header[0].banner_image} title={homeAd.header[0].title ? homeAd.header[0].title : 's'} />

            {/* <Image loading='lazy'  onClick={() => window.open(homeAd.header[0].banner_link, '_blank')} src={check_Image(homeAd.header[0].banner_image)} height={250} className={`h-full w-full cursor-pointer`} width={970} alt='ad' /> */}
          </div>}
        </> : null
      }
      {
        (footerAd && footerAd.footer && footerAd.footer.length != 0) ? <>
          {/* {footerAd.footer[0] &&
            <div className='flex items-center justify-center gap-[5px]'>
              <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
              <h6 className='fnt_12'>Advertisement</h6>
              <span className='bg-[#00000066] h-[1px] w-[10px] rounded-[5px]'></span>
            </div>
            // <p className="fnt_12 text-center">Advertisement</p>
          } */}
          {footerAd.footer[0] &&
            <div style={style} onClick={() => window.open(footerAd.footer[0].banner_link, '_blank')} className={`${Class} lg:!h-[90px] lg:!w-[970px]`}>
              <ImageLoader style={`${height ? height : 'h-[250px]'} ${width ? width : 'w-[970px]'}  cursor-pointer`} src={footerAd.footer[0].banner_image} title={footerAd.footer[0].title ? footerAd.footer[0].title : 's'} />
              {/* <Image priority onClick={() => window.open(footerAd.footer[0].banner_link, '_blank')} src={check_Image(footerAd.footer[0].banner_image)} height={250} className={`${height ? height : 'h-[250px]'} ${width ? width : 'w-[970px]'} object-contain cursor-pointer`} width={970} alt='ad' /> */}
            </div>}
        </> : null
      }

    </>
  )
}
