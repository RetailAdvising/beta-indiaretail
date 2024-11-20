// 'use client'
import React, { useEffect, useState, useRef } from 'react'
import Title from '@/components/common/Title';
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';
import List from '@/components/common/List';
import Cards from '@/components/common/Cards';
import { getList, articlesList, checkMobile, check_Image, getAdvertisements, trending } from '@/libs/api';
import { useRouter } from 'next/router';
import SEO from '@/components/common/SEO'
import Tags from '@/components/common/Tags';
import ImageLoader from '@/components/ImageLoader';
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300", "400", "500", "600", "700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
// })
export default function CategoryType({ values, ads,Id }) {
    const router = useRouter();
    const [data, setData] = useState([]);

    // let apiCall = false;
    let page_no = 1;
    let cardref = useRef(null);
    let no_product = false;
    const [loading, setLoading] = useState(false);

    // console.log(values)


    useEffect(() => {
        // console.log(values);
        if (values) {
            setTimeout(() => {
                setData(values)
            }, 200);
        }

        // const handleScroll = () => {
        //     const scrollTop = document.documentElement.scrollTop
        //     const scrollHeight = document.documentElement.scrollHeight
        //     const clientHeight = document.documentElement.clientHeight
        //     if ((scrollTop + clientHeight) + 700 >= scrollHeight) {
        //         if (!apiCall) {
        //             apiCall = true;
        //             page_no += 1;
        //             loadMore()
        //         }
        //     }
        // };

        // window.addEventListener('scroll', handleScroll);

        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            // console.log(entries[0].intersectionRatio,"entries[0].intersectionRatio")
            if (!no_product) {
                page_no = page_no + 1
                page_no > 1 ? loadMore() : null
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }

    }, [router.query,cardref]);

    async function loadMore() {
        setLoading(true)
        let Id = router.query.types;
        let param = {
            // doctype: "Articles",
            category_route: Id,
            page_no: page_no,
            page_size: 13,
            // fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
            // filters: { articles_category: Id, ir_prime: 0, published: 1 }
        }
        let value = await articlesList(param);
        if (value && value.message.length != 0) {
            setData(d => d = Id == 'case-studies' ? [...d, ...value.message.message] : [...d, ...value.message]);
            // data = [...data,...value.message]
            setLoading(false)
            no_product = false;
        } else {
            no_product = true;
            setLoading(false)
        }

    }

    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }
    return (
        <>
            <RootLayout isLanding={false} homeAd={ads ? ads : null} adIdH={router.query.types+'catH'} adIdF={router.query.types+'catF'} head={router.query.types}>
                <SEO title={router.query.types} siteName={'India Retailing'} ogType={router.query.types} description={router.query.types} />
                <div className={`${isMobile ? 'md:p-[15px]' : 'container'}`} id='root' >
                    {(data && data.length != 0) ? <div className={`lg:flex lg:flex-wrap  lg:gap-[20px]`}>
                        <div className={`flex-[0_0_calc(65%_-_10px)]  md:flex-[0_0_calc(100%_-_10px)]`}>
                            {/* {!isMobile && <Title data={{ title: router.query.types }} />} */}
                            <div className={`${isMobile ? '' : 'border'} rounded-[10px] lg:h-[520px] lg:p-[15px] cursor-pointer`}>{data && data.slice(0, 1).map((res, index) => {
                                return (
                                    <div key={res.title ? res.title : index} onClick={() => router.push(`${Id == 'case-studies' ? '/p/'+ res.route : '/'+ res.route}`)} className={` pb-[10px]`}>
                                        <h6 className={`lg:text-[18px] md:text-[16px] font-[700] nunito`}>{res.title}</h6>
                                        <ImageLoader style={`h-[330px] w-full mt-[10px] rounded-[5px]`} src={res.image ? res.image : res.thumbnail_image ? res.thumbnail_image : res.meta_image ? res.meta_image : null} title={res.title ? res.title : 'indiaRetail'} />
                                        {/* <Image className={`h-[330px] w-full mt-[10px] rounded-[5px]`} src={check_Image(res.image ? res.image : res.thumbnail_image)} height={250} width={300} alt={res.title} /> */}
                                        {res.primary_text && <p className={`flex items-center pt-[10px]`}><span className={`primary_text pr-[10px] nunito`}>{res.primary_text}</span><span className='h-[15px] w-[2px] bg-[#6f6f6f]'></span><span className={`secondary_text pl-[10px] nunito`}>{res.secondary_text}</span></p>}
                                        <p className={`sub_title line-clamp-2 pt-[10px]`}>{res.blog_intro ? res.blog_intro : res.meta_description ? res.meta_description : ''}</p>
                                        {/* <p className={`hashtags pt-[5px]`}>{res.publisher}</p> */}
                                        <Tags tags={res.tags} />
                                    </div>
                                )
                            })}</div>
                        </div>
                        {/* lg:pt-[45px] */}
                        <div className={`lg:flex-[0_0_calc(35%_-_10px)]  md:pt-[20px] md:flex-[0_0_calc(100%_-_10px)]`}>
                            <div className={`border p-[15px] ${data.length > 3 ? 'lg:grid' : '' }  md:h-[auto] h-[520px] rounded-[10px]`}> <List primary_pb={'mb-[5px]'} hash_bg={'mt-[10px]'} route={Id == 'case-studies' ? Id : null} contentWidth={'flex-[0_0_calc(65%_-_10px)]'} titleClamp={'line-clamp-2 '} imgWidth={'w-full'} line={'line-clamp-1 md:hidden'} imgHeight={'h-[90px] md:h-[80px]'} check={true} data={data.slice(1, 5)} borderRadius={'rounded-[5px]'} isReverse={true} /></div>
                        </div>
                    </div> : <Skeleton />}
                    <div className={`grid grid-cols-4 md:grid-cols-2 md:pt-[20px] lg:py-8 md:gap-[10px] lg:gap-[20px]`}>
                        {/* contentHeight={'h-[175px]'} */}
                        <Cards cardClass={"lg:h-[315px] md:h-full"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"lg:h-[180px] md:h-[150px]"} route={Id == 'case-studies' ? Id : null} check={true} width={"w-full"} isBorder={true} data={data.slice(5, data.length - 1)} />
                    </div>
                </div>


                <div className='more h-[30px]' ref={cardref}></div>
                {(loading && isMobile) && <div id="wave">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>}
            </RootLayout>
        </>
    )
}


const Skeleton = () => {
    return (
        <div className={`my-5 md:p-[15px] container`}>
            <div className='flex gap-[15px] items-center'>
                <div className='border p-5 md:p-[10px] rounded-[5px]  flex-[0_0_calc(65%_-_10px)] md:basis-full'>
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
                </div>
                <div className={`overflow-auto  rounded-[5px] flex-[0_0_calc(35%_-_10px)] md:basis-full border p-5 md:p-[10px] `}>
                    {[0, 1, 2, 3].map((res, index) => {
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
            </div>

            <div className='grid grid-cols-4 md:grid-cols-2 gap-5 justify-between my-5 items-center'>
                {[0, 1, 2, 3, 4, 5, 6, 7].map(index => {
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
    )
}


// export async function getStaticPaths({params}){

// }

export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    let param = {
        //    s: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
        category_route: Id,
        page_no: 1,
        page_size: 13,
    }
    // let value = await getList(param);
    let value = await articlesList(param);
    // let values = await value.message;
    let values = await param.category_route == 'case-studies' ? value.message.message : value.message;

    if(values.length === 0){
        return{
            notFound : true
        }
    }

    let param1 = { page: 'Categories', page_type: 'List' }
    const resp = await getAdvertisements(param1);
    const ads = resp.message;

    return {
        props: { values, ads,Id }
    }
}