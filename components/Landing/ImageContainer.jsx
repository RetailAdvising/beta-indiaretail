import Image from 'next/image'
import Link from 'next/link';
import ImageLoader from '../ImageLoader';
import { check_Image } from '@/libs/api';

export default function ImageContainer({ data, height, width, isWeb, contStyle, isMobile }) {
    return (
        <>
            {data && <div className={`relative ${contStyle ? contStyle : ''}`}>
                <Link href={data.video_type && data.video_image ? '/video/' + data.route : '/' + data.route}>
                    {/* loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' */}
                    {/* onLoad={(e) => setLoad(true)} onLoadingComplete={(img) => changeImg(img)} */}
                    {/* loader={() => ImageLoader(data.thumbnail_imagee ? data.thumbnail_imagee : data.image)} */}
                    <div className='relative'>
                        {isMobile ?
                            <Image width={530} className={`rounded-[5px] ${height} ${width}`} alt={data.title} src={check_Image(data.thumbnail_imagee ? data.thumbnail_imagee : data.video_image ? data.video_image : data.image)} height={329} />
                            :
                            <ImageLoader type={data} style={`rounded-[5px] ${height} ${width}`} src={data.thumbnail_imagee ? data.thumbnail_imagee : data.video_image ? data.video_image : data.image} title={data.title} />
                        }

                    </div>
                    {/* <Image width={530}  loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur'  className={`rounded-[5px] ${height} ${width}`} alt="image.." src={check_Image(data.thumbnail_imagee ? data.thumbnail_imagee : data.image)} height={329} />                 <div className={`${height ? height : 'h-[350px]'} absolute top-0 w-full bg-[#0000002e]]`}></div> */}
                    <Image className={`${height ? height : 'h-[350px]'} absolute top-0 w-full rounded-[5px]`} src={'/bg-png.png'} height={329} width={530} alt='background...' />
                    <div className={`absolute ${isWeb ? 'bottom-[30px] md:bottom-[30px]' : 'bottom-[20px] md:bottom-[15px]'}  left-[10px]`}>
                        {(!isWeb) && <div className=''><button className='text-white h-[26px] font-semibold p-[0_10px] uppercase text-[11px] md:text-[10px] md:h-[24px]' style={{ background: 'linear-gradient(305deg, #F92A28 27.00%, #DA1752 100%, #FFF 100%)' }}>In Focus</button></div>}
                        {data.title && <p className={`font-[700] text-white text-[17px] md:text-[16px] py-1 nunito`}>{data.title}</p>}
                        {data.publisher && <p className={`text-white text-[12px] font-[500] mb-4 nunito`}>{data.publisher}</p>}
                    </div>
                </Link>
            </div>}
        </>
    )
}


// const Loader = () => {
//     return(
//         <>Loading....</>
//     )
// }