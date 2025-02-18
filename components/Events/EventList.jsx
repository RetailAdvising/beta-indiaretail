import Image from 'next/image'
import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';

export default function EventList({ data, flex, height, width, check, isHome, isRoute = undefined }) {
    const router = useRouter();
    return (
        <>

            {data && data.map((res, index) => {
                return (
                    // /${router.asPath.split('/')[1]}/${res.route}
                    <div className={`overflow-hidden cursor-pointer flex ${isHome ? 'flex rounded-[10px] h-[160px]' : ' pb-[20px]'}  bg-white gap-[10px]   ${flex}`} onClick={() => router.push(`${isRoute ? isRoute + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}`)} key={index}>
                        <div className={`flex-[0_0_calc(40%_-_10px)] ${isHome ? 'lg:grid lg:place-content-center' : ''}`}>
                            {/* style={{ background: imageBackground }} */}
                            {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur'  height={100} width={200} alt={res.title} src={!check ? check_Image(res.thumbnail_path) : res.image} className={`${height} ${width} ${isHome ? 'rounded-[25px] p-5' : 'rounded-[10px]'}`} /> */}
                            <ImageLoader style={`${height} ${width} ${isHome ? 'rounded-[25px] p-5' : 'rounded-[10px]'}`} src={res.thumbnail_path ? res.thumbnail_path : res.image ? res.image : null} title={res.title ? res.title : 's'} />
                        </div>
                        <div className={`flex flex-col ${isHome ? 'p-[10px] justify-between gap-[5px]' : 'leading-[2] px-[10px] min-h-[185px]'} `}>
                            <h4 className={`font-[700] ${isHome ? 'text-[14px] ' : 'text-[16px] py-[10px]'} line-clamp-2 text-[#39364F] !capitalize nunito`}>{res.title} </h4>
                            <p className={`sub_title line-clamp-2`}>{res.description}</p>
                            {/* <p className={`sub_title pt-[5px]`}>{res.end}</p> */}
                            <div className={`flex gap-[10px] items-center ${isHome ? '' : 'pt-[10px]'} `}>
                                <p className={`flex gap-[5px] items-center `}><Image src="/calendar.svg" className={`object-contain`} objectFit='contain' height={15} width={20} alt={res.title} /> <span className={`light_text pt-[2px] nunito`}>{res.event_date}</span></p> {res.locations && <span className='h-[18px] w-[2px] mx-[6px] bg-[#ddd]'></span>}
                                {res.locations && <p className={`flex gap-[5px] items-center`}><Image src="/location.svg" className={`object-contain`} objectFit='contain' height={10} width={20} alt={res.title} /> <span className={`light_text nunito`}>{res.locations[0] && res.locations[0].event_location}</span></p>}
                            </div>
                            <div className={`flex gap-[5px] items-center ${isHome ? '' : 'py-[10px]'} `}><p className={`primary_text font-[600]`}>Register Now</p>
                                <Image src="/arrowrightprimary.svg" className={`h-[17px] w-[17px] p-0.5`} height={14} width={14} alt={'res.title'} />
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}
