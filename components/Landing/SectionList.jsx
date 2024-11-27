import Image from 'next/image'
import Tags from '../common/Tags'
import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';

export default function SectionList({ data, isHome }) {
  const router = useRouter();
  function navigate(event, res) {
    event.stopPropagation();
    // '/' + router.asPath.split('/')[1] +
    if(res.video_id){
      router.push(`${'/video/' + res.route}`)
    }else{
      router.push(`${isHome ? isHome + res.route : '/' + res.route}`)
    }
  }
  return (
    <>
      {data && data.map((res, index) => {
        return (
          // href={'/' + res.route}
          <div key={index} onClick={($event) => navigate($event, res)} className='cursor-pointer'>
            <div className={`flex justify-between gap-[10px] ${index == 0 ? 'lg:mt-[15px]' : ''} ${index != data.length - 1 ? 'mb-[15px] border_bottom' : ''}  items-center pb-[15px]`}>
              <div className={`flex flex-[0_0_calc(95%_-_10px)] w-full gap-[10px]`}>
                <div className={`flex-[0_0_calc(30%_-_10px)] md:flex-[0_0_calc(40%_-_10px)]`}>
                  <ImageLoader style={`rounded-[5px] h-[114px] md:h-[95px] w-full`} src={res.video_image ? res.video_image : res.thumbnail_imagee ? res.thumbnail_imagee : res.image} title={res.title} />
                  {/* <Image loading="lazy" blurDataURL={'/empty_state.svg'} placeholder='blur' className={`rounded-[5px] h-[90px] w-full`} src={check_Image(res.thumbnail_imagee ? res.thumbnail_imagee : res.image)} height={50} width={150} alt={"image"} ></Image> */}
                </div>
                <div className='md:grid'>
                  <p className={`primary_text lg:mb-[8px] nunito`}>{res.primary_text}</p>
                  <h4 className={`title line-clamp-2 md:my-[5px] lg:mb-[5px] nunito`}>{res.title}</h4>
                  {(res.blog_intro) && <p className={`sub_title lg:mb-[8px] line-clamp-1 md:line-clamp-1 md:!leading-[1.5]`}>{res.blog_intro}</p>}
                  {(res.intro) && <p className={`sub_title lg:mb-[8px] josefin-sans line-clamp-2 md:line-clamp-1 md:!leading-[1.5]`}>{res.intro}</p>}
                  {/* {res.publisher && <p className='light_text'>{res.publisher}</p>} */}
                  {res.tags && <Tags tagClass={'!p-0'} tags={res.tags} />}
                  {/* {res._user_tags &&} */}
                </div>
              </div>
              <div className='flex-[1] md:hidden'>
                <Image src={'/rightArrow.svg'} height={15} width={20} alt={'arrow'} ></Image>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}
