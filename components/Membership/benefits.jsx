import Image from 'next/image';
import { check_Image } from '@/libs/common'

export default function Benefits({ data }) {

  return (
    <>
      {data.section_name == 'IR Member Ship' && data.section_type == 'Static Section' &&
        <>
          <h2 className='font-bold text-3xl md:text-2xl pt-6 text-center'>{data.heading}</h2><p className='sub_title text-center pb-3 pt-3'>{data.sub_heading}</p><div className="pt-3.5 grid-cols-4 container md:grid-cols-1 gap-4 grid overflow-auto md:p-[15px] md:flex md:items-center">
            {data.member_ship_options.map((benefits, index) => {
              return (
                <div style={{ background: benefits.color ? benefits.color : '#EEF8F9' }} className={`lg:basis-1/4 benefitcard md:min-h-[330px] rounded-2xl p-6 md:flex-[0_0_calc(75%_-_10px)]`} key={benefits.list_heading}>
                  <h3 className='text-1xl  font-bold pb-2 line-clamp-2 md:min-h-[56px]'>{benefits.list_heading}</h3>
                  <p className='content_ lg:pb-6 text-xs mb-[15px] line-clamp-5'>{benefits.list_sub_heading}</p>
                  <div className='md:h-[150px]'> <Image src={check_Image(benefits.image)} alt="Article" width={150} height={150} className='m-2 m-auto h-[145px] object-cover ' /></div>
                </div>
              );
            }
            )}
          </div>
        </>
      }

      {data.section_name == 'Left Content Right Image with Subtitle' && data.section_type == 'Static Section' &&
        <div className={`md:py-4 md:p-[15px]`} >
          <div className="flex md:flex-col-reverse container flex-row gap-4 md:gap-2 pt-9 pb-9  md:pt-4 md:pb-4">
            <div className="m-auto basis-2/4 md:basis-full">
              <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-left'>{data.title}</h2>
              <p className='sub_title text-left pb-2 pt-3 md:text-left'>{data.description}</p>
            </div>
            <div className="text-center m-auto basis-2/4 md:basis-full">
              <Image src={check_Image(data.right_img)} alt="About" width={400} height={400} className='m-auto object-contain h-[390px] md:h-[185px]' />
            </div>
          </div>
        </div>
      }

      {data.section_name == 'Right Content Left Image' && data.section_type == 'Static Section' &&
        <div className={`md:py-4 md:p-[15px] bg-[#EAF0F6]`} >
          <div className="flex md:flex-col-reverse container flex-row gap-4 md:gap-2 pt-9 pb-9  md:pt-4 md:pb-4">

            <div className="text-center m-auto basis-2/4 md:basis-full">
              <Image src={check_Image(data.left_image)} alt="About" width={400} height={400} className='m-auto object-contain h-[390px] md:h-[185px]' />
            </div>

            <div className="m-auto basis-2/4 md:basis-full">
              <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-left'>{data.title}</h2>
              <p className='sub_title text-left pb-2 pt-3 md:text-left'>{data.content}</p>
            </div>

          </div>
        </div>
      }

    </>
  )
}

