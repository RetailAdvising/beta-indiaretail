import Image from 'next/image'
import { check_Image } from '../../libs/api'
import Link from 'next/link'
import { useRouter } from 'next/router';
export default function CardCarousel({ data, cardClass, imgClass, isHome = undefined }) {
    const router = useRouter()
    return (
        <>
            {data && data.map((res, index) => {
                return (
                    // <div >
                    <Link key={index} className={`${cardClass} border rounded-[10px]`} href={isHome ? isHome + res.route : '/' + router.asPath.split('/')[1] + '/' + res.route}>
                        <div className={``}>
                            <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`${imgClass} rounded-[10px_10px_0_0]`} src={check_Image(res.thumbnail_image)} height={200} width={300} alt={index + 'image'} />
                        </div>
                        <div className={` flex flex-col justify-between p-[10px]`}>
                            {(res.primary_text && res.secondary_text) && <p className='flex gap-2 items-center'><span className={`text-red leading-normal tracking-wider !text-[10px] ${styles.primary_text}`}>{res.primary_text}</span> <span class="h-[10px] w-[1px] bg-[#6f6f6f]"></span> <span className={`${styles.secondary_text}`}>{res.secondary_text}</span></p>}
                            <h4 className={`title line-clamp-2`}>{res.title ? res.title : ''}</h4>
                            {(res.sub_title || res.blog_intro) && <p className={`sub_title mt-[6px] line-clamp-2`}>{res.sub_title ? res.sub_title : res.blog_intro ? res.blog_intro : ''}</p>}
                            {(res.hashtags || res.publisher) && <p className='hashtags pt-1'>{res.hashtags ? res.hashtags : res.publisher ? res.publisher : ''}</p>}
                        </div>


                    </Link>
                    // </div>
                )
            })}


            {/* {data && data.map((res,i)=>{
                return(
                    <div key={i} className='h-[5px] w-[5px] bg-red rounded-full'></div>
                )
            })} */}
        </>
    )
}
