import RootLayout from '@/layouts/RootLayout'
import { useEffect, useRef, useState } from 'react'
import { articlesList, getAdvertisements } from '@/libs/api'
import Cards from '@/components/common/Cards'
import { useRouter } from 'next/router';
export default function Lists({ data, ads }) {
    let page_no = 1;
    let cardref = useRef(null);
    let no_product = false;
    const router = useRouter();
    const [pageData, setPageData] = useState([])
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        if (data) {
            setTimeout(() => {
                setPageData(data)
            }, 200);
        }

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!no_product) {
                page_no > 1 ? getLists() : null
                page_no = page_no + 1
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }

    }, []);

    const getLists = async () => {
        setLoading(true)
        let Id = await router?.query.types;
        let param = {
            category_route: Id,
            page_no: page_no,
            page_size: 20,
            ir_prime: 1
        };

        let resp = await articlesList(param);
        if (resp.message && resp.message.length != 0) {
            setTimeout(() => {
                setPageData(d => d = [...d, ...resp.message])
                setLoading(false)
            }, 400);
        } else {
            no_product = true;
            setLoading(false)
        }
    }
    return (
        <>
            <RootLayout ad_payload={{ page: 'IR Prime', page_type: 'List' }} isLanding={false} homeAd={ads ? ads : null} adIdH={router.query.types + 'irH'} adIdF={router.query.types + 'irF'} head={'List'}>
                <div className=' md:p-[15px] container'>
                    {(pageData && pageData.length != 0) ? <>
                        <div className={`grid grid-cols-4 md:grid-cols-2 md:gap-[15px] lg:gap-5`}>
                            <Cards cardClass={"h-[335px]"} borderRadius={"rounded-[10px_10px_0_0]"} height={"h-[180px]"} width={"w-full"} isBorder={true} data={data} />
                        </div>
                    </> : <Skeleton />}

                    <div className='more h-[30px]' ref={cardref}></div>
                    {loading && <div id="wave">
                        <span className="dot"></span>
                        <span className="dot"></span>
                        <span className="dot"></span>
                    </div>}
                    {!pageData?.length && <Skeleton type='' />}
                </div>
            </RootLayout>
        </>
    )
}

const Skeleton = () => {
    return (
        <>
            <div className='grid grid-cols-4 md:grid-cols-2 gap-5 md:gap-[15px]'>
                {[0, 1, 2, 3].map(i => {
                    return (
                        <div key={i} className='border rounded-[10px] lg:h-[380px] md:h-[300px]'>
                            <div className='bg-[#E5E4E2] h-[210px] w-full rounded-[5px_5px_0_0]'></div>
                            <div className='p-[10px]'>
                                <p className={`bg-[#E5E4E2] h-[10px] w-full my-[10px] rounded-[5px]`}></p>
                                <p className={`bg-[#E5E4E2] h-[10px] w-full mb-[20px] rounded-[5px]`}></p>
                                <p className={`bg-[#E5E4E2] h-[7px] w-full my-[10px] rounded-[5px]`}></p>
                                <p className={`bg-[#E5E4E2] h-[7px] w-full mb-[10px] rounded-[5px]`}></p>
                                {/* <p className='flex my-[15px] gap-[10px] items-center'><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span><span className='bg-[#E5E4E2] h-[6px] w-[100px] rounded-[5px]'></span></p> */}
                                {/* <p className={`bg-[#E5E4E2] h-[7px] w-[150px] mt-[10px] rounded-[5px]`}></p> */}
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let Id = await params?.types;
    // let Id = 'beauty-wellness';
    let param = {
        // doctype: "Articles",
        // fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image"],
        // filters: { articles_category: Id, ir_prime: 1, published: 1 },
        category_route: Id,
        page_no: 1,
        page_size: 20,
        ir_prime: 1


    }
    let value = await articlesList(param);
    let data;

    if (value.status === 'Failed') {
        return {
            notFound: true
        }
    } else {
        data = value.message
    }

    // let param1 = { doctype: 'Articles', page_type: 'List', category_route: params.types }
    // const resp = await getAds(param1);

    let param1 = { page: 'IR Prime', page_type: 'List' }
    const resp = await getAdvertisements(param1);
    const ads = resp.message;

    return {
        props: { data, ads }
    }
}