import RootLayout from '@/layouts/RootLayout'
import React, { useEffect,useState } from 'react'
import { primeLanding, getAds,getAdvertisements } from '@/libs/api'
import ExclusiveBuilder from '@/components/Builders/ExclusiveBuilder'
import SEO from '@/components/common/SEO'


export default function IRPrime({ data,ads }) {
    const [value, setValue] = useState()
    // let [ads,setAds] = useState()

    useEffect(() => {
        if (data && data.message && data.message.length != 0) {
            setTimeout(() => {
                // console.log(data,'data')
                // console.log(ads,'ads')
                setValue(data)
            }, 200);
        }
    }, [])

    // console.log('dadad', data, ads)
    return (
        <>
            <RootLayout homeAd={ads ? ads : null} isLanding={true} head={'IR Prime'} adIdH={'ir-prime-head'} adIdF={'ir-prime-foot'}>
                <SEO title={'IR Prime'} siteName={'India Retailing'} description={'IR Prime'} />
                {(value && value.message && value.message.length != 0) ? <ExclusiveBuilder data={value} ads={ads ? ads : null} /> : <Skeleton />}
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
    // let params = {
    //     "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", "thumbnail_image", "articles_category", "blog_intro", "primary_text", "secondary_text", "avatar", "publisher","route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description",'route'], "page_no": 1, "records": 6, "category_count": 6, "ir_prime": 1
    // }
    let params = {
        fields: ["name", "route", "primary_text", "secondary_text", "title", "thumbnail_imagee as thumbnail_image", "image", "articles_category", "blog_intro", "avatar", "publisher"], page_length: 10, page_no: 1
    }
    const res = await primeLanding(params);
    const data = await res;
    let param = { page: 'IR Prime', page_type: 'Landing' }
    const resp = await getAdvertisements(param);
    let ads = resp.message
       
    return {
        props: { data,ads }, revalidate: 50,
    }
}

// export async function getServerSideProps() {
//     let params = {
//         "doctype": "Articles", "filter_name": "articles_category", "parent_fields": ["name", "title", "thumbnail_image", "articles_category", "blog_intro", "primary_text", "secondary_text", "avatar", "publisher","route"], "category_doctype": "Articles Category", "category_fields": ["name", "title", "primary_text", "description",'route'], "page_no": 1, "records": 6, "category_count": 6, "ir_prime": 1
//     }
//     const res = await getCategoryList(params);
//     const data = await res?.message;
//     return {
//         props: { data }
//     }
// }