import Image from 'next/image'
import { useRouter } from 'next/router'
export default function TrendingBox({ data, icons, parentElement }) {
  const router = useRouter();
  const moveLeft = () => {
    let element = document.querySelector(`.${parentElement}`);
    element.scrollBy(100, 0);
  }

  const moveRight = () => {
    let element = document.querySelector(`.${parentElement}`);
    element.scrollBy(-100, 0);
  }

  return (
    <>
      {icons == 'left' && <div className='cursor-pointer h-[30px] w-[30px] border rounded-[5px] p-[6px]' onClick={moveRight}><Image className={`h-[15px] w-[15px]`} src={'/leftArrow.svg'} height={28} width={28} alt={'left'}></Image></div>}
      {data && data.map((res, index) => {
        return (
          <div className={`trendingList cursor-pointer`} onClick={() => router.push('/tag/' + res.route)} key={index}>
            <p className={`text-[14px]`} >{res.name}</p>
          </div>
        )
      })}
      {/* <p className='cursor-pointer h-[30px] w-[30px] border rounded-[5px] p-[6px]' onClick={moveRight}><Image className={`h-[15px] w-[15px]`} src={'/leftArrow.svg'} height={28} width={28} alt={'left'}></Image></p> */}
      {icons == 'right' &&
        <div className='cursor-pointer h-[30px] w-[30px] border rounded-[5px] p-[6px]' onClick={moveLeft}><Image className={`h-[15px] w-[15px]`} src={'/rightArrow.svg'} height={28} width={28} alt={'right'}></Image></div>}
    </>
  )
}
