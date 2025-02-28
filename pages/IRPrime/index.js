import RootLayout from '@/layouts/RootLayout'
import { useEffect, useState } from 'react'
import { primeLanding, getAdvertisements } from '@/libs/api'
import ExclusiveBuilder from '@/components/Builders/ExclusiveBuilder'
import SEO from '@/components/common/SEO'
import Image from 'next/image'


export default function IRPrime({ data, ads }) {
    const [value, setValue] = useState()
    const [skeleton, setSkeleton] = useState(true)


    useEffect(() => {
        if (data && data.message && data.message.length != 0) {
            setTimeout(() => {
                setValue(data)
                
            }, 200);
        }
        setTimeout(() => {
            setSkeleton(false)
        }, 200);
    }, [])

    return (
        <>
            <RootLayout ad_payload={{ page: 'IR Prime', page_type: 'Landing' }} homeAd={ads ? ads : null} isLanding={true} head={'IR Prime'} adIdH={'ir-prime-head'} adIdF={'ir-prime-foot'}>
                <SEO title={'IR Prime - Retail Insights & Retail Industry News Portal'} siteName={'India Retailing'} description={'Stay updated with the latest retail news, insights & trends on India Retailing ( IR Prime). Discover exclusive articles, industry analysis & expert opinions.'} keywords={`IR Prime , Retail Prime News , Retail Industry News , industry insights , Retail Prime , Retail Trends , Retail Prime Information , Retail Prime Update`} />
                {(!skeleton && value && value.message && value.message.length != 0) ? <ExclusiveBuilder data={value} ads={ads ? ads : null} /> : skeleton ? <Skeleton /> : <>

                    <div className='grid lg:flex-[0_0_calc(50%_-_10px)] place-content-center'>
                        <div>
                            <Image src={'/empty_states/no-article.svg'} className='' height={200} width={300} alt={'no data'} />
                        </div>
                        <h6 className='text-[16px] font-semibold text-center pt-[15px]'> No Data Found...</h6>
                    </div>
                </>}
            </RootLayout>

        </>
    )
}

const Skeleton = () => {
    return (
        <div className={`md:p-[15px] container`}>
            <div className='flex gap-[15px] items-center'>
                <div className='lg:h-[640px] border p-5 md:p-[10px] rounded-[5px]  flex-[0_0_calc(42%_-_10px)] md:basis-full'>
                    {[0].map((res, i) => {
                        return (
                            <div key={i} className={`md:mb-[10px] mb-5 pb-5 cursor-pointer md:pb-[10px] border_bottom`}>
                                <h6 className={`bg-[#E5E4E2] h-[10px] mt-[10px] w-full rounded-[5px]`}></h6>
                                <h6 className={`bg-[#E5E4E2] h-[10px] my-[10px] w-[200px] rounded-[5px]`}></h6>
                                <div className={`h-[350px] bg-[#E5E4E2] md:h-[320px] w-full mt-[10px] rounded-[5px]`} ></div>
                                <p className={`flex items-center gap-[10px] mt-[10px]`}><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px] `}></span><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px]`}></span></p>
                                <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[10px] `}></p>
                                <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[10px] `}></p>
                            </div>
                        )
                    })}
                    <div className='flex gap-[15px] justify-between'>
                        <div className='flex-[0_0_calc(65%_-_10px)]'>
                            <p className={`flex items-center gap-[10px] mt-[10px]`}><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px] `}></span><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px]`}></span></p>
                            <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
                            <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
                            <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[15px] `}></p>
                        </div>
                        <div className='flex-[0_0_calc(35%_-_10px)] bg-[#E5E4E2] h-[90px] rounded-[5px]'></div>
                    </div>
                </div>
                <div className={`overflow-auto customScroll rounded-[5px] flex-[0_0_calc(33%_-_10px)] md:basis-full border p-5 md:p-[10px] lg:h-[640px]`}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((res, index) => {
                        return (
                            <div key={index} className='flex gap-[15px] justify-between border_bottom mb-[15px] pb-[15px]'>
                                <div className='flex-[0_0_calc(65%_-_10px)]'>
                                    <p className={`flex items-center gap-[10px] mt-[10px]`}><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px] `}></span><span className={`bg-[#E5E4E2] h-[6px]  w-[80px] rounded-[5px]`}></span></p>
                                    <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
                                    <p className={`bg-[#E5E4E2] h-[8px]  w-full rounded-[5px]  mt-[10px] `}></p>
                                    <p className={`bg-[#E5E4E2] h-[6px]  w-full rounded-[5px]  mt-[15px] `}></p>
                                </div>
                                <div className='flex-[0_0_calc(35%_-_10px)] bg-[#E5E4E2] h-[90px] rounded-[5px]'></div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex-[0_0_calc(25%_-_10px)] '>
                    <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
                    <div className='border rounded-[5px] p-[15px] lg:h-[615px]'>
                        {[0, 1, 2, 3].map((res, i) => {
                            return (
                                <div key={i} className='flex items-center gap-[15px] justify-between border_bottom mb-[15px] pb-[15px]'>
                                    <div className='flex-[0_0_calc(40%_-_10px)]'>
                                        <p className={`flex items-center gap-[10px] mb-[10px]`}><span className={`bg-[#E5E4E2] h-[6px]  w-[40px] rounded-[5px] `}></span><span className={`bg-[#E5E4E2] h-[6px]  w-[40px] rounded-[5px]`}></span></p>
                                        <div className='w-full bg-[#E5E4E2] h-[100px] rounded-[5px]'></div>
                                    </div>
                                    <div className='flex-[0_0_calc(65%_-_10px)]'>
                                        <p className={`bg-[#E5E4E2] h-[8px]  w-[160px] rounded-[5px]  mt-[10px] `}></p>
                                        <p className={`bg-[#E5E4E2] h-[8px]  w-[160px] rounded-[5px]  mt-[10px] `}></p>
                                        <p className={`bg-[#E5E4E2] h-[6px]  w-[160px] rounded-[5px]  mt-[15px] `}></p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <div className='flex gap-[15px] justify-between my-5 items-center'>
                <div className='lg:w-[calc(75%_-_15px)]'>
                    <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
                    <div className=' flex gap-[20px] overflow-auto scroll-smooth scrollbar-hide'>
                        {[0, 1, 2, 3, 4].map(index => {
                            return (
                                <div key={index} className='border rounded-[10px] h-[280px] flex-[0_0_calc(20%_-_10px)]'>
                                    <div className='bg-[#E5E4E2] h-[200px] w-full rounded-[5px_5px_0_0]'></div>
                                    <div className='p-[10px]'>
                                        <p className='flex gap-[10px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
                                        <p className={`bg-[#E5E4E2] h-[8px] w-[220px] my-[10px] rounded-[5px]`}></p>
                                        <p className={`bg-[#E5E4E2] h-[8px] w-[220px] mb-[10px] rounded-[5px]`}></p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='lg:w-[calc(25%_-_15px)]'>
                    <div className='bg-[#E5E4E2] h-[280px] w-full rounded-[5px]'></div>
                </div>
            </div>

            <div>
                <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
                <div className='flex items-center gap-[15px]'>
                    {[0, 1, 2, 3].map(index => {
                        return (
                            <div key={index} className=' h-[280px] flex-[0_0_calc(25%_-_10px)]'>
                                <div className='bg-[#E5E4E2] h-[200px] w-full rounded-[5px]'></div>
                                <div className='p-[10px]'>
                                    <p className={`bg-[#E5E4E2] h-[8px] w-full my-[10px] rounded-[5px]`}></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className='flex items-center gap-[15px]'>
                <div className='flex-[0_0_calc(75%_-_15px)]'>
                    <h6 className={`bg-[#E5E4E2] h-[10px]  w-[140px] rounded-[5px] mb-[15px]`}></h6>
                    {[0, 1, 2].map(index => {
                        return (
                            <div key={index} className='flex items-center border_bottom pb-[15px] mb-[15px]'>
                                <div className='bg-[#E5E4E2] h-[170px] flex-[0_0_calc(30%_-_10px)] w-full rounded-[5px]'></div>
                                <div className='p-[10px]'>
                                    <p className='flex gap-[10px] mb-[20px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p>
                                    <p className={`bg-[#E5E4E2] h-[8px] w-[380px] my-[10px] rounded-[5px]`}></p>
                                    <p className={`bg-[#E5E4E2] h-[8px] w-[240px] mb-[20px] rounded-[5px]`}></p>
                                    <p className={`bg-[#E5E4E2] h-[8px] w-[380px] mb-[10px] rounded-[5px]`}></p>
                                    <p className={`bg-[#E5E4E2] h-[8px] w-[240px] mb-[10px] rounded-[5px]`}></p>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='flex-[0_0_calc(25%_-__10px)]'>
                    <div className='bg-[#E5E4E2] h-[600px] w-full rounded-[5px]'></div>
                </div>
            </div>

        </div>
    )
}



export async function getStaticProps() {
    let params = {
        fields: ["name", "route", "primary_text", "secondary_text", "title", "thumbnail_imagee as thumbnail_image", "image", "articles_category", "blog_intro", "avatar", "publisher"], page_length: 10, page_no: 1
    }
    const res = await primeLanding(params);
    const data = await res;
    let param = { page: 'IR Prime', page_type: 'Landing' }
    const resp = await getAdvertisements(param);
    let ads = resp.message

    return {
        props: { data, ads }, revalidate: 50,
    }
}
