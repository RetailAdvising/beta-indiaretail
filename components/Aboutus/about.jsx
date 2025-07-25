import Image from 'next/image';
// import data from '@/libs/publications'

export default function About({item}) {
  // {console.log(item, "item")  }
  return (
    <>
    {/* {data.aboutus.map((item, index) =>  */}
    <div className={item.title == "About Us" ? 'oddabout' : 'evenabout'}>
      <div className='container md:p-[15px]' >
        <div className="flex md:flex-col-reverse flex-row gap-4 md:gap-2 pt-9 pb-9  md:pt-4 md:pb-4">
            <div className={`m-auto ${item.title == "Our Vision & Mission" ? "basis-2/4 ":"w-full"} md:basis-full`}>
              <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-left'>{item.title}</h2>
              <h6 className='font-medium text-left josefin-sans pt-1 text-[14px] text-[gray-dark1]'>{item.subtitle1}</h6>
              <h6 className='text-left text-[14px] font-medium josefin-sans text-[gray-dark1]'>{item.subtitle2}</h6>
              <div dangerouslySetInnerHTML={{ __html: item.content }} className='sub_title text-left pb-2 pt-3 md:text-left'/>
            </div>
            {item.title == "Our Vision & Mission" && <div className="text-center m-auto basis-2/4 md:basis-full">
              <Image src={item.image} alt="About" width={400} height={400} className='m-auto'/>
            </div>}
        </div>
      </div>
    </div>
    {/* // )} */}
    </>
  )
}

