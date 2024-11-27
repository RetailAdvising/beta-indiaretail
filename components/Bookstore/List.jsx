import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';

export default function List({ data, border_b, line_clamp, flex, height,isLanding, width, imgWidth, imgWidth1, route, boxShadow, check, category }) {
  const router = useRouter();

  function navigateToDetail(res) {
    // router.push(`/${router.asPath.split('/')[1] +'/' + category + '/' + res.route}`)
    router.push({ pathname: `/${router.asPath.split('/')[1] + '/' + res.route}` }, undefined, { shallow: false, scroll: false });
    // router.replace({ pathname: `/${router.asPath.split('/')[1] +  '/' + res.route}` }, undefined, { shallow: false, scroll: false });
  }

  return (
    <>
      {data.map((res, index) => {
        return (
          <div className={`flex cursor-pointer gap-[10px] ${border_b ? border_b : ''} ${flex ? flex : ''}`} onClick={() => isLanding ? router.push('/bookstore/' + category + '/' + res.route) : navigateToDetail(res)} key={index}>
            <div className={`${imgWidth}`}>
              {/* <Image className={`${height} ${width}  ${boxShadow && 'rounded-[5px]'}`} src={check ? check_Image(res.product_image) : res.image} height={210} width={162} alt={res.title}></Image> */}
              <ImageLoader style={`${height} ${width}  ${boxShadow && 'rounded-[5px]'}`} src={res.product_image} title={res.title ? res.title : 's'} />
            </div>
            <div className={`${imgWidth1 ? imgWidth1 : ''} flex flex-col items-start gap-[10px] justify-center`}>
              {res.primary_text && <p className={`flex items-center`}><span className={`primary_text pr-[10px] nunito`}>{res.primary_text}</span>{res.secondary_text && <span className='h-[15px] w-[2px] bg-[#121212]'></span>}<span className={`secondary_text pl-[10px] nunito`}>{res.secondary_text}</span></p>}
              <h6 className={`line-clamp-2 font-[700] title nunito`}>{res.item_title}</h6>
              {res.short_description && <p className={`w-full sub_title line-clamp-${line_clamp ? line_clamp : '2'}`}>{res.short_description}</p>}
              {/* <button className={`primary_btn p-[5px] text-[13px]`}>select options</button> */}
            </div>
          </div>
        )
      })}
    </>
  )
}
