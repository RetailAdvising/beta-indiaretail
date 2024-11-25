import Image from 'next/image'
import { check_Image } from '../../libs/api'
import Link from 'next/link'
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300","400","500","600","700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
//   })
export default function ImageGroupEvents({ data, height, width}) {
    return (
        <>
            {data && data.map((res, index) => {
                return (
                    <Link key={index} href={'/' + res.route }>
                        <div className={`imageGroup h-full`} >
                            <div className={`imageContainer h-[80%]`}>
                                <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`image ${height} ${width}`} src={check_Image(res.thumbnail_path)} height={100} width={200} alt={res.title} />
                            </div>
                            <div className={`pt-[10px]`}>
                                {/* <p className={`primary_text `}>{res.primary_text} </p> */}
                                <div className={`flex gap-[10px] items-center pt-[5px]`}><h6 className={`font-[700] text-[16px] flex-[0_0_calc(70%_-_10px)] capitalize line-clamp-2 nunito`}>{res.title} </h6>
                                    <p className={`flex gap-[5px] flex-[0_0_calc(30%_-_10px)]`}><Image src={'/calendar.svg'} objectFit='contain' className='h-[20px] w-[20px]' height={15} width={20} alt={res.title} /> <span className={`light_text`}>{res.start_date}</span></p>
                                    {/* <p className={`flex gap-[5px]`}><Image src={res.location} objectFit='contain' height={10} width={20} alt={res.title} /> <span className={`light_text`}>{res.event_location}</span></p> */}
                                </div>
                                <p className={`sub_title  line-clamp-2`}>{res.description}</p>
                            </div>
                        </div>
                    </Link>
                )
            })}
        </>
    )
}
