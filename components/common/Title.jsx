import Image from 'next/image'
import { useRouter } from 'next/router'
import { Inter } from 'next/font/google'
const inter = Inter({
  weight: ["300","400","500","600","700"],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable: '--font-inter'
})


export default function Title({ data, textClass, seeMore, font, noPadding, isVid, see, route, title_class,isIcon,counter }) {
  const router = useRouter()

  async function goTo(data) {
    // console.log(route,"route")
    if (isVid) {
      router.push(route)
    } else if (route) {
      router.push(route)
    }
    else {
      router.push(`/${router.asPath.split('/')[1]}/${data.route}`)
    }
  }
  return (
    <> 
      {data &&
        <div className={`title_div ${noPadding ? '' : 'pb-3'} flex justify-between ${title_class ? title_class : ''}`}>
          <div className={`cursor-pointer ${counter ? 'flex items-baseline gap-[5px]' : ''}`}>
            <div>
            <h6 style={{ fontSize: font }} className={`title text-[18px] ${textClass} ${inter.className}`}>{data.title ? data.title : data.category_name ? data.category_name : ''}</h6>
            {data.title && <div className='line mt-1'></div>}
            </div>
           {counter && <p className='text-[#797979] text-[16px] font-semibold'>[ {` ${data.count} `} ]</p>}
          </div>
          {
            seeMore &&
            <div className={`flex items-center gap-[5px] cursor-pointer z-[9] ${data.title == 'Shopping Centers' ? 'lg:pr-[10px]' : ''}`} onClick={() => goTo(data)}>
              <p className={`text-[12px] font-normal ${see} nunito`}>View All</p>
              <Image className='h-[11px] w-[5px] object-contain' src={!isIcon && see ? '/arrow-white.svg' : '/forwardIcon.svg' } height={5} width={5} alt='View All' />
            </div>
          }

        </div>
      }
    </>
  )
}
