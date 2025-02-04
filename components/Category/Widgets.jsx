import { useState, useEffect } from 'react'
import Image from 'next/image'
import { check_Image, checkMobile } from '@/libs/api'

export default function Widgets({ data, index, routers, productNavigation }) {
  //  console.log('wight',data)
  const checkRoute = (res, data) => {
    if (data.title == 'Articles') {
      res.route = res.route
      productNavigation(res.route)
    } else if (data.title == 'Community Event' || data.title == 'Events') {
      res.route = '/events/' + res.route
      routers.push(res.route)
    } else if (data.title == 'Books') {
      res.route = '/bookstore/' + res.category_route + '/' + res.route
      routers.push(res.route)
    } else if (data.title == 'Videos') {
      res.route = '/video/' + res.route
      routers.push(res.route)
    } else if (data.title == 'Podcasts') {
      res.route = '/podcast/' + res.route
      routers.push(res.route)
    }
  }

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

  return (
    <>
      <div className={`${data.title == 'Banner Ad' || data.title == 'Custom Widget' ? 'my-[15px]' : 'border mb-[10px] rounded-[8px] p-[15px]'}`}>
        {data.title != 'Banner Ad' && data.title != 'Custom Widget' && <h6 className={`text-[15px] nunito font-[700] mb-[10px]`}>{data.title}</h6>}
        {data.data && data.data.length != 0 &&
          <div className={`lg:grid lg:gap-5 ${data.title == 'Books' ? 'lg:grid-cols-4 ' : data.title == 'Banner Ad' || data.title == 'Custom Widget' ? 'grid-cols-1' : 'lg:grid-cols-3'} md:flex md:items-center md:gap-[10px] md:overflow-auto no_scroll`}>
            {data.title != 'Videos' && data.title != 'Books' && data.title != 'Banner Ad' && data.title != 'Custom Widget' && data.data.slice(0, 6).map((res, i) => {
              return (
                <div key={index} onClick={() => checkRoute(res, data)} className='flex cursor-pointer h-[100px] gap-[10px] border rounded-[5px] p-[10px] md:flex-[0_0_calc(90%_-_10px)]'>
                  <div className='flex-[0_0_calc(40%_-_10px)]'>
                    <Image className='h-[75px] rounded-[5px] !p-0 w-full' height={200} width={400} alt={res.title ? res.title : res.item ? res.item : i} src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.image ? res.image : res.thumbnail_path ? res.thumbnail_path : res.product_image ? res.product_image : res.video_image ? res.video_image : null)} />
                  </div>
                  <div>
                    {(res.primary_text && res.secondary_text) && <p className={`flex gap-2 !mb-[5px] items-center py-[5px] line-clamp-1`}><span className={`primary_text nunito leading-normal tracking-wider !text-[10px] line-clamp-1 flex-[0_0_50%]`}>{res.primary_text}</span> {res.secondary_text && <span className="h-[10px] w-[1px] bg-[#6f6f6f] flex-[0_0_1%]"></span>} <span className={`secondary_text nunito line-clamp-1 flex-[0_0_49%]`}>{res.secondary_text}</span></p>}
                    {res.title && <p className={`line-clamp-2 !mb-0 !text-[14px] title nunito text-start`}>{res.title}</p>}
                    {res.item && <p className={`line-clamp-2 !mb-0 !text-[14px] title nunito text-start`}>{res.item}</p>}
                    {data.title == 'Events' &&
                      <div className={`flex gap-[5px] items-center lg:pt-[10px]`}>
                        <p className={`flex !mb-0 items-center gap-[5px] md:flex-direction`}><Image src={'/calendar.svg'} className=' h-[15px] w-[13px] !p-0' objectFit='contain' height={25} width={20} alt={res.title} />  <span className={`light_text !text-[9px]  nunito`}>{res.start_date}</span></p>{res.locations && <span className='h-[18px] w-[2px] mx-[6px] bg-[#ddd]'></span>}
                        {res.locations && <>
                          <p className={`flex !mb-0 flex-wrap items-center gap-[5px]`}><Image src={'/location.svg'} className='!p-0' height={15} width={20} alt={res.title} />

                            {res.locations.slice(0, 1).map((item, index) => {
                              return (
                                <span key={index} className={`light_text nunito !text-[9px]`}>{item.event_location}</span>
                              )
                            })}
                          </p>
                        </>}
                      </div>
                    }
                    {data.title == 'Podcasts' && res.description && <div className={`!text-[12px] innertag pt-[5px] line-clamp-1`} dangerouslySetInnerHTML={{ __html: res.description }}></div>
                    }
                  </div>
                </div>
              )
            })}

            {data.title == 'Videos' && data.data.slice(0, 3).map((res, i) => {
              return (
                // <div key={i + res.title}>
                <div key={i + res.title} onClick={() => checkRoute(res, data)} className={` md:flex-[0_0_calc(80%_-_10px)]  cursor-pointer relative`}>
                  <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.video_image)} className={`!rounded-[5px] !p-0 h-[175px] w-full`} height={150} width={273} alt={res.title} />
                  {/* <ImageLoader style={`rounded-[5px] ${imgClass ? imgClass : 'h-[175px] w-full'}`} src={res.video_image} title={res.title ? res.title : 's'} /> */}
                  <Image src={'/irprime/youtube.svg'} className={`absolute !p-0 bottom-[45px] left-[5px]  md:bottom-[45px]  object-contain h-[20px] w-[30px]`} height={100} width={100} alt={res.title} />
                  <p className={`pt-[10px] !text-[14px] md:!text-[13px] nunito line-clamp-1 font-[500]`}>{res.title}</p>
                </div>
                // </div>
              )
            })}

            {data.title == 'Books' && data.data.slice(0, 4).map((res, index) => {
              return (
                <div key={index} onClick={() => checkRoute(res, data)} className={` cursor-pointer md:flex-[0_0_calc(100%_-_10px)]`}>
                  <div className={``}>
                    {/* <Image className={` ${object_fit ? object_fit : 'object-cover'} ${imgClass ? imgClass : (height ? height : 'h-[150px]')} ${boxShadow && 'rounded-[5px]'}`} src={check_Image(res.product_image ? res.product_image : res.image ? res.image : null)} height={300} width={242} alt={res.title ? res.title : 's'}></Image> */}
                    <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' src={check_Image(res.product_image ? res.product_image : res.image ? res.image : null)} className={`!rounded-[5px] md:object-contain !p-0 h-[300px] w-full`} height={150} width={273} alt={res.title} />
                  </div>
                  <h6 className={`pt-[10px] nunito line-clamp-1 text-[14px] md:text-[14px] leading-normal font-[700] text-center`}>{res.item_title ? res.item_title : res.item ? res.item : ''}</h6>
                </div>
              )
            })}

            {data.title == 'Banner Ad' && data.data[0] && <a target='_blank' href={data.data[0].ad_link} className={`w-[728px] !m-auto h-[90px] object-contain md:w-[80%]`}>
              <Image className='h-full w-full !p-0' src={check_Image(isMobile ? data.data[0].mobile_image : data.data[0].web_image)} height={200} width={200} alt={data.data[0].title ? data.data[0].title : data.title} />
            </a>}

            {data.title == 'Custom Widget' && data.data[0] && <div className='m-[auto]' dangerouslySetInnerHTML={{ __html: data.data[0].snippet }} />}
          </div>}
      </div>
    </>
  )
}
