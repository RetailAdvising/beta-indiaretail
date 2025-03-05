import Image from 'next/image'
import exclusives from '@/styles/Exclusives.module.scss';
import { useRouter } from 'next/router';
import Tags from '../common/Tags';
import ImageLoader from '../ImageLoader';

export default function Lists({ productNavigation, imgFlex, hash_bg, contentWidth, primary_pb, line, data, titleClamp, isTop, isReverse, borderRadius, imgHeight, imgWidth, isBB, flex, isMp, tittleOnly, isHome = undefined, isDesc, descLine, mb }) {

    const router = useRouter();

    const checkRoute = (data) => {
        if (productNavigation && data.doc_type == 'Articles') {
            productNavigation(data.route)
        }
        else if (data.doc_type == 'Community Event') {
            const route = '/events/' + data.route
            // router.push({ route }, undefined, { scroll: true })
            router.push(route)
        } else if (data.doc_type == 'Product') {
            router.push('/bookstore/' + data.route)
        } else if (data.doc_type == 'Video') {
            router.push('/video/' + data.route)
        } else if (data.doc_type == 'Podcast') {
            const route = '/podcast/' + data.route
            router.push(route)
            // router.push({route},undefined, { shallow: false, scroll: false })  
            // router.replace({route},undefined, { shallow: false, scroll: false }) 
        }
        // }

    }

    // console.log(data, "dataa")

    const sortEventsByStartDate = (events) => {
        return events.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    };
    return (
        <>
            {(data && data.length > 0) && (data[0]['doc_type'] === "Community Event" ? sortEventsByStartDate(data) : data).map((res, index) => {
                return (
                    // style={{flex:flex}}
                    <div key={index} onClick={() => checkRoute(res)} className={`${flex} flex cursor-pointer gap-[15px] ${(index != data.length - 1 && !isMp) ? 'pb-[10px]' : (isMp && index != data.length - 1) ?
                        'lg:mb-[20px] lg:pb-[20px] md:pb-[10px] md:mb-[10px]' : ''} ${mb && index != data.length - 1 ? 'lg:mb-[10px]' : ''} relative ${exclusives.card_item} ${(isReverse) ? 'flex-row-reverse items-center  mb-[10px] justify-between' : ''} ${(isReverse && index != data.length - 1) ?
                            'border_bottom' : ''} ${(isBB && index != data.length - 1) && 'border_bottom mb-[10px]'}`}>
                        {(res.primary_text && res.secondary_text && isTop) && <p className={`flex line-clamp-1  ${exclusives.title_top}  items-center absolute`}><span className={`primary_text nunito pr-[8px] line-clamp-1`}>{res.primary_text}</span> {res.secondary_text && <span className='h-[10px] w-[1px]  bg-[#6f6f6f]'></span>} <span className={`pl-[8px] nunito line-clamp-1 secondary_text`}>{res.secondary_text}</span></p>}
                        {/* ${check ? '' : 'basis-1/4'} */}
                        <div className={`${imgFlex} ${isTop && 'pt-[25px]'}`}>
                            {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgHeight} ${imgWidth} ${borderRadius}`} src={check_Image(res.image || res.video_image || res.thumbnail_image)} height={100} width={100} alt={"image"} /> */}
                            <ImageLoader style={`${imgHeight} ${imgWidth} ${borderRadius}`} src={res.image || res.video_image || res.thumbnail_image} title={res.title ? res.title : 's'} />

                        </div>
                        {/* w-[280px] */}
                        {res.doc_type == 'Community Event' ?
                            <div className='flex flex-col'>
                                {res.title && <h6 className={`title  pt-[5px] ${titleClamp ? titleClamp : 'line-clamp-1'} nunito`}>{res.title ? res.title : ''}</h6>}
                                <div className={`flex gap-[5px] items-center lg:pt-[10px]`}>
                                    <p className={`flex items-center gap-[5px] flex-[0_0_auto]`}><Image src={'/calendar.svg'} className='md:hidden h-[15px] w-[13px]' objectFit='contain' height={25} width={20} alt={res.title} />  <span className={`light_text nunito`}>{res.start_date}</span></p>{res.locations && <span className='h-[18px] w-[2px] mx-[6px] bg-[#ddd]'></span>}
                                    {res.locations && <>
                                        <p className={`flex items-center gap-[5px]`}><Image src={'/location.svg'} className='md:hidden' height={15} width={20} alt={res.title} />

                                            {res.locations.slice(0, 1).map((item, index) => {
                                                return (
                                                    <span key={index} className={`light_text nunito line-clamp-1`}>{item.event_location}</span>
                                                )
                                            })}
                                        </p>
                                    </>}
                                </div>
                            </div>
                            : <div className={`flex flex-col leading-[1]`}>
                                {(res.primary_text && res.secondary_text && !isTop) && <p className={`flex items-center line-clamp-1 ${primary_pb}`}><span className={`primary_text pr-[8px] line-clamp-1 nunito flex-[0_0_calc(50%_-_5px)]`}>{res.primary_text}</span> {res.secondary_text && <span className='h-[10px] w-[1px] bg-[#6f6f6f] '></span>} <span className={`secondary_text nunito line-clamp-1 pl-[8px] flex-[0_0_calc(50%_-_5px)]`}>{res.secondary_text}</span></p>}
                                {res.title && <h6 className={`title  pt-[5px] ${titleClamp ? titleClamp : 'line-clamp-1'} nunito`}>{res.title ? res.title : ''}</h6>}
                                {((res.sub_title || res.blog_intro) && (!tittleOnly && res.doc_type != 'Product')) && <p className={`sub_title pt-[5px] ${line ? line : 'line-clamp-2'}`}>{res.doc_type != 'Product' ? '' : (res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : '')}</p>}
                                {res.blog_intro && <div className={`${descLine ? descLine : ''} sub_title innertag pt-[5px] line-clamp-1`} dangerouslySetInnerHTML={{ __html: res.blog_intro }}></div>}

                                {/* {((res.hashtags || res.publisher) && !tittleOnly) && <p className={`hashtags  ${hash_bg ? hash_bg : 'pt-[5px]'} font-[500]`}>by {res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>} */}
                                <Tags tags={res.tags} />
                            </div>}
                    </div>
                )
            })}
        </>
    )
}
