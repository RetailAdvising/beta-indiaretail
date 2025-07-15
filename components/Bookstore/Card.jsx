import { useRouter } from 'next/router'
import ImageLoader from '../ImageLoader';
import Link from 'next/link';

export default function Card({ data, height, category, padding, isHome = false, flex, object_fit, isBorder, boxShadow, isLanding, imgClass }) {

  const router = useRouter();

  return (
    <>
      {data.map((res, index) => {

           let href = '';

        if (isHome) {
          href = `/bookstore/${res.category_route}/${res.route}`;
        } else if (isLanding) {
          href = `/${router.asPath.split('/')[1]}/${category}/${res.route}`;
        } else {
          href = `/${router.asPath.split('/')[1]}/${router.asPath.split('/')[3]}/${res.route}`;
        }

        return (
          // <div key={index} onClick={() => router.push(`${isHome ? '/bookstore/' + res.category_route + '/' + res.route : isLanding ? '/' + router.asPath.split('/')[1] + '/' + category + '/' + res.route : '/' + router.asPath.split('/')[1] + '/' + router.asPath.split('/')[3] + '/' + res.route}`)} className={`${flex} cursor-pointer ${isBorder && 'border p-[10px] rounded-[5px]'}`}>
          <Link href={href} key={index} >
            <div className={`${padding ? padding : null}`}>
              {/* <Image className={` ${object_fit ? object_fit : 'object-cover'} ${imgClass ? imgClass : (height ? height : 'h-[150px]')} ${boxShadow && 'rounded-[5px]'}`} src={check_Image(res.product_image ? res.product_image : res.image ? res.image : null)} height={300} width={242} alt={res.title ? res.title : 's'}></Image> */}
              <ImageLoader style={`${object_fit ? object_fit : 'object-cover'} ${imgClass ? imgClass : (height ? height : 'h-[150px]')} ${boxShadow && 'rounded-[5px]'}`} src={res.product_image ? res.product_image : res.image ? res.image : null} title={res.title ? res.title : 's'} />
            </div>
            <h6 className={`pt-[10px] text-[14px] md:text-[14px] leading-normal font-medium nunito`}>{res.item_title ? res.item_title : res.item ? res.item : ''}</h6>
          </Link>
        )
      })}
    </>
  )
}
