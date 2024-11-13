import React from 'react'
import RootLayout from '@/layouts/RootLayout'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Error() {
    const router = useRouter();
    return (
        <>
        
            <RootLayout isLanding={false} head={'404 Error'}>
                <div className='flex  container lg:p-[0_20px] md:p-[15px]'>
                    <div className='flex-[0_0_calc(40%_-_10px)] mt-[5%]'>
                        <Image src={'/indiaretail.png'} className='object-contain' height={76.23} priority width={284.65} alt='' />
                        <h2 className='text-xl md:text-[16px] font-semibold'>Oops, Something Went Wrong!</h2>
                        <p className='sub_title pt-[20px] md:pt-[10px]'>we looked all over, but that page seems to have gotten away from us. try one of these link to get back on track </p>
                        <button className='primary_btn text-[14px] h-[40px] w-[140px] lg:mt-[40px]' onClick={() => router.push('/')}>Back To Home</button>
                    </div>
                    <div className={`flex-[0_0_calc(60%_-_10px)] relative`}>
                        <Image src={'/errors/bg.png'} height={200} width={200} className={`h-full w-full`} alt={''} />
                        <Image src={'/errors/404.svg'} height={200} width={200} className={`absolute top-[10%] right-[10%] h-[400px] w-[50%] object-contain`} alt={''} />
                    </div>
                </div>
            </RootLayout>
        </>
    )
}
