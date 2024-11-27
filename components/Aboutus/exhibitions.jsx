import Image from 'next/image';
import data from '@/libs/publications'


export default function Exhibitions() {
  return (
    <>
    <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-center'>{data.title1}</h2>
    <p className='sub_title josefin-sans text-center pb-3 pt-3'>{data.subtitle1}</p>
    <div className="pt-9 pb-9 md:pt-4 md:pb-4 grid-cols-3 md:grid-cols-2 gap-4 md:gap-2 grid">
      {data.exhibitions.map((exhibitions,index) => {
      return(
      <div className="basis-1/3 md:basis-1/2" key={index}>
        <div className='bg-[#F8F8F8] rounded-2xl p-4 md:rounded-lg h-full'>
          <Image src={exhibitions.image} alt="Article" width={350} height={180} className='m-2 m-auto rounded-2xl md:rounded-lg' />
          <h3 className='text-1xl font-bold pb-2 text-center mt-4'>{exhibitions.title}</h3>        </div>
      </div>
      )
      }
      )}
    </div>
    </>
  )
}

