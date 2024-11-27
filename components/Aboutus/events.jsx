import Image from 'next/image';
import data from '@/libs/publications'


export default function Events() {
  return (
    <>
    <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-center'>{data.title2}</h2>
    <p className='sub_title josefin-sans text-center pb-3 pt-3'>{data.subtitle2}</p>
    <div className="pt-9 pb-9 md:pt-4 md:pb-4 grid-cols-3 md:grid-cols-2 gap-4 md:gap-2 grid">
      {data.events.map((events,index) => {
      return(
      <div className="basis-1/3 md:basis-1/2" key={index}>
        <div className='bg-[#F8F8F8] rounded-2xl p-0 border border-[#ddd] border-solid'>
          <Image src={events.image} alt="Article" width={200} height={200} className='m-2 m-auto p-3' />
          <div className='flex justify-between items-center px-4 pt-2 pb-2 bg-[#fff] rounded-bl-[1rem] rounded-br-[1rem]'>
          <h3 className='text-1xl font-bold text-center md:text-[12px]'>{events.title}</h3> 
          <Image src="/about/right-point.svg" alt="Article" width={11} height={11} className='' />
          </div>
          </div>
      </div>
      )
      }
      )}
    </div>
    </>
  )
}

