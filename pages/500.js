import RootLayout from '@/layouts/RootLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'
export default function Errors() {
  const router = useRouter();
  return (
    <>
      <RootLayout isLanding={false} head={'500 Internal Server Error'}>
        <div className='flex items-center justify-center container lg:p-[0_20px] md:p-[15px]'>
          <div className='flex-[0_0_calc(100%_-_10px)] lg:mt-[5%] md:text-center'>
            <Image src={'/errors/500error.svg'} height={200} width={200} className={` h-[400px] w-[50%] object-contain md:w-full`} alt={''} />
            {/* <Image src={'/indiaretail.png'} className='object-contain' height={76.23} priority width={284.65} alt='' /> */}
            <h2 className='text-xl text-red md:text-[16px] font-semibold'>500 Internal Server Error</h2>
            <div className='pt-[20px] md:py-[10px]'>
              <p className='sub_title'>It's always time for a coffee break.</p>
              <p className='sub_title'>We should be back by the time you finish your coffee.</p>
            </div>
            <button className='primary_btn text-[14px] h-[40px] w-[140px] lg:mt-[40px]' onClick={() => router.push('/')}>Back To Home</button>
          </div>
          {/* <div className={`flex-[0_0_calc(60%_-_10px)] relative`}>
            <Image src={'/errors/500error.svg'} height={200} width={200} className={` h-[400px] w-[50%] object-contain`} alt={''} />
          </div> */}
        </div>
      </RootLayout>
    </>
  )
}
