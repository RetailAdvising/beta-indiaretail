import Image from 'next/image'
import { check_Image } from '@/libs/api'
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//   weight: ["300", "400", "500", "600", "700"],
//   display: "block",
//   preload: true,
//   style: 'normal',
//   subsets: ["latin"],
//   variable: '--font-inter',
// })
export default function IRPrime({ data }) {
    const router = useRouter();
    return (
        <>
            {
                <div className={`p-[15px] my-[10px] rounded bg-[#FFEDEF] z-[9] relative`}>
                    <div className={`flex justify-between cursor-pointer items-center pb-[5px] border_bottom_white`} >
                        <div className={`flex gap-2`}>
                            <div className={``}>
                                <Image src={'/IR.svg'} objectFit='contain' height={30} width={35} className={``} alt={"IR Prime"}></Image>
                            </div>
                            <div className={`flex flex-col`}>
                                <h6 className={`text-sm font-[700] nunito`}>IR Prime</h6><span className={`text-[11px] font-[400] text-[#757575]`}>Top 3  stories of the day</span>
                            </div>
                        </div>
                        <div>
                            <p onClick={() => router.push('/IRPrime')} className={`text-[13px] bg-white rounded-[5px] w-[60px] text-center p-[2px] button_text_color md:text-[12px] `}>View All</p>
                        </div>
                    </div>
                    {data.map((res, index) => {
                        return (
                            <Link key={index} href={'/' + res.route}>
                                <div className={`flex items-center gap-[10px] ${index != data.length - 1 && 'border_bottom_white'} py-[10px]`}>
                                    <div className='flex-[0_0_calc(25%_-_10px)]'>
                                        <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className='h-[60px] rounded-[5px] w-full' src={check_Image(res.thumbnail_image ? res.thumbnail_image : res.image)} alt={res.title} height={50} width={70} />
                                    </div>
                                    <p className={`text-sm font-[600] line-clamp-2 nunito`}>{res.title}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>

            }
        </>
    )
}
