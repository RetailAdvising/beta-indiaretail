import { useState, useEffect } from 'react'
import { checkMobile } from '@/libs/api'
import Link from 'next/link'
import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//   weight: ["300", "400", "500", "600", "700"],
//   display: "block",
//   preload: true,
//   style: 'normal',
//   subsets: ["latin"],
//   variable: '--font-inter',
// })
export default function LatestNews({ data, height, width, isList }) {
  // console.log(data);
  const [isMobile, setIsMobile] = useState()
  const router = useRouter()
  useEffect(() => {
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);
  }
  return (
    <>
      {(data && !isMobile) ? data.map((res, index) => {
        return (
          <Link key={index} href={'/' + res.route}>
            {/* !res.image && */}
            <div className={`pb-[10px] ${((index != data.length - 1 || index == 1)) && 'border_bottom'}`}>
              {/* loader={imageLoader} */}
              {/* {(res.thumbnail_imagee && index < 2) && <Image loading="lazy" blurDataURL={'/empty_state.svg'}  placeholder='blur' src={check_Image(res.thumbnail_imagee ? res.thumbnail_imagee : res.image)} className={`rounded-[5px] ${height} ${width}`} width={400} height={200} alt={res.title} />} */}
              {(res.thumbnail_imagee && index < 2) && <ImageLoader style={`rounded-[5px] ${height} ${width}`} src={res.thumbnail_imagee ? res.thumbnail_imagee : res.image} title={res.title} />}
              {res.title && <h6 className={`my-[10px] line-clamp-1 title nunito`}>{res.title}</h6>}
              {(res.blog_intro && index >= 2) && <p className={`${!res.image && 'mb-[10px]'} sub_title josefin-sans line-clamp-2`}>{res.blog_intro}</p>}
            </div>
          </Link>
        )
      })

        : <>
          {(data && isMobile && !isList) &&
            data.slice(0, 2).map((res, i) => {
              return (
                <Link key={i} href={'/' + res.route} className='flex-[0_0_calc(70%_-_10px)] border rounded-[10px] h-[280px]'>
                  <div >
                    <ImageLoader style={`rounded-[5px_5px_0_0] ${height} ${width}`} src={res.thumbnail_imagee ? res.thumbnail_imagee : res.image} title={res.title} />
                    {/* <Image priority src={check_Image(res.thumbnail_imagee ? res.thumbnail_imagee : res.image)} className={`rounded-[5px_5px_0_0] ${height} ${width}`} width={400} height={200} alt={res.title} /> */}
                  </div>
                  <div className='px-[10px]'>
                    <h6 className={`my-[10px] line-clamp-2 title nunito`}>{res.title}</h6>
                    {res.publisher && <p className='light_text'>{res.publisher}</p>}
                  </div>
                </Link>
              )
            })
          }

          {(data && isMobile && isList) && data.map((res, i) => {
            return (
              <div key={i} onClick={() => router.push('/' + res.route)} className={`${i == 0 ? 'border_top border_bottom pb-[10px]' : 'mb-[15px]'}`}>
                {res.title && <h6 className={`my-[10px] line-clamp-1 title nunito`}>{res.title}</h6>}
                {(res.blog_intro) && <p className={`${!res.image && 'mb-[10px]'} sub_title line-clamp-2`}>{res.blog_intro}</p>}

              </div>
            )
          })}



        </>}
    </>
  )
}
