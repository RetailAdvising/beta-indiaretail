import RootLayout from '@/layouts/RootLayout'
import { useRef, useEffect, useState } from 'react'
import Title from '@/components/common/Title';
import Card from '@/components/Bookstore/Card';
import { getCategoryProduct, getAdvertisements } from '@/libs/api';
import { useRouter } from 'next/router';

export default function BookstoreList({ value, ads }) {
    const router = useRouter();
    let [data, setData] = useState([]);
    let cardref = useRef();
    let page_no = 1
    let no_product = false;

    useEffect(() => {

        if (value && value.length != 0) {
            setData(value.data)
        }


        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!no_product) {
                page_no > 1 ? get_list() : null
                page_no = page_no + 1
            }
        });
        intersectionObserver.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver.unobserve(cardref?.current)
        }


    }, [])

    async function get_list() {
        let param = { route: router.query.list, page_no: page_no, page_size: 10 }
        let resp = await getCategoryProduct(param);
        if (resp && resp.status && resp.status == 'Success') {
            if (resp.message.data.length != 0) {
                setData((d) => d = [...d, ...resp.message.data]);
            } else {
                no_product = true;
            }
        }
    }

    return (
        <>
            <RootLayout ad_payload={{ page: 'Books', page_type: 'List' }} adIdH={router.query.list + 'booklH'} adIdF={router.query.list + 'booklF'} homeAd={ads ? ads : null}>
                <div className='container'>
                    {(data && data.length != 0) &&
                        <div className='md:p-[15px]'>
                            <Title data={value} />
                            <div className={`grid gap-[30px_20px] gap-y-[30px] grid-cols-5 md:grid-cols-2 justify-between `}>
                                <Card check={true} data={data} category={router.query.list} isLanding={true} imgClass={'aspect-[2/2.5] w-full'} boxShadow={true} /></div>
                        </div>
                    }
                </div>
                <div className='more' ref={cardref}>
                </div>
            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ params }) {
    let Id = await params?.list;
    let param = { route: Id, page_no: 1, page_size: 10 }
    let resp = await getCategoryProduct(param);
    let value = resp.message || null;

    if (value === null) {
        return {
            notFound: true
        }
    }

    let para = { page: 'Books', page_type: 'List' }
    let res = await getAdvertisements(para)
    let ads = res.message;

    return {
        props: { value, ads }
    }
}