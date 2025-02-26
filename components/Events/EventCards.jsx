import Image from 'next/image'
import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';

export default function EventCards({ data, flex,height,width,card }) {
    const router = useRouter();
    return (
        <>
            {data && data.map((res, index) => {
               
                return (
                    <div className={` flex flex-col rounded-[10px] ${card ? card : 'md:min-h-[300px] lg:min-h-[370px]'} border cursor-pointer ${flex}`} onClick={() => router.push(`/${router.asPath.split('/')[1]}/${res.route}`) } key={index}>
                        <div className={``} >
                            {/* style={{ height: '250px', width: '100%', borderRadius: '10px 10px 0 0' }} */}
                            {/* <Image src={check_Image(res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : null)} className={`rounded-[10px_10px_0_0] ${height} ${width}`}  height={100} width={200} alt={res.title} /> */}
                            <ImageLoader style={`rounded-[10px_10px_0_0] ${height} ${width}`} src={res.thumbnail_path ? res.thumbnail_path : res.image_path ? res.image_path : null} title={res.title ? res.title : 's'} />

                        </div>
                        <div className={`flex flex-col p-[10px] h-full justify-between `}>
                            <h4 className={`event-title font-[700] line-clamp-1 nunito`}>{res.title} </h4>
                            <p className={`sub_title lg:pt-[5px] line-clamp-2`}>{res.description}</p>
                            {/* <p className={`sub_title pt-[5px]`}>{res.end}</p> */}
                            <div className={`flex gap-[5px] items-center lg:pt-[5px]`}>
                                <div className={`flex items-center gap-[5px] flex-[0_0_auto]`}><Image src={'/calendar.svg'} className='md:object-contain md:h-[15px] md:w-[17px]' objectFit='contain' height={15} width={20} alt={res.title} />  <span className={`light_text nunito`}>{res.event_date}</span></div><span className='h-[18px] w-[2px] mx-[6px] bg-[#ddd]'></span>
                                <div className={`flex  items-center gap-[5px]`}><Image src={'/location.svg'} className='md:object-contain md:h-[15px] md:w-[17px]' height={15} width={20} alt={res.title} /> 
                                {res.locations && res.locations.slice(0,1).map((item,index)=>{
                                    return(
                                        <span key={index} className={`light_text nunito line-clamp-1`}>{item.event_location}</span>
                                    )
                                })}
                                </div>
                            </div>
                            <div className='flex items-center gap-[5px] lg:pt-[5px]'><p className={`primary_text font-semibold capitalize `}>Register Now</p><Image src={'/arrowrightprimary.svg'} className='p-0.5 right-arrow' height={6} width={12} alt={'res.title'} /></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
