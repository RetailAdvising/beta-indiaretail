import NoProductFound from '@/components/common/NoProductFound';
import NewsCard from '@/components/Newsletter/NewsCard';
import RootLayout from '@/layouts/RootLayout';
import { get_all_newsletter_by_category } from '@/libs/api';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react'

const index = ({ data }) => {
    let [allNewsLetter, setAllNewsLetter] = useState([])
    const [noProduct, setNoProduct] = useState(false)
    let [loading, setLoading] = useState(false);
    let [pageNo, setPageNo] = useState(1)
    const cardref = useRef(null)
    const router = useRouter()
    // All News
    const allNews = async () => {
        let param = {
            category: await router.query.list,
            // newsletter_id: await router.query.detail,
            page_no: pageNo,
            limit: 15,
        }

        const resp = await get_all_newsletter_by_category(param);
        if (resp.message && resp.message.message && resp.message.message.length != 0) {
            allNewsLetter = pageNo == 1 ? resp.message.message : [...allNewsLetter, ...resp.message.message]
            setAllNewsLetter(allNewsLetter)
            loading = false
            setLoading(loading)
            setNoProduct(false)
        } else {
            loading = false
            setLoading(loading)
            setNoProduct(true)
        }
    }


    useEffect(() => {
        if (data && data.message && data.message.length > 0) {
            allNewsLetter = data.message
            setAllNewsLetter(allNewsLetter)
        }

        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0].intersectionRatio <= 0) return;
            if (!loading && !noProduct) {
                pageNo += 1
                setPageNo(pageNo)
                loading = true
                setLoading(loading)
                allNews()
                // if (pageNo > 1) {
                //     loading = true
                //     setLoading(loading)
                //     allNews()
                // } else {
                //     pageNo += 1
                //     setPageNo(pageNo)
                // }
            }
        });

        intersectionObserver?.observe(cardref?.current);

        return () => {
            cardref?.current && intersectionObserver?.unobserve(cardref?.current)
        }
    }, [router.query])
    return (
        <>
            <RootLayout isLanding={false} homeAd={null} head={'Newsletters'} adIdH={router.query.list + 'nwsH'} adIdF={router.query.list + 'nwsF'}>
                <div className='container p-[30px_0px] md:p-[15px]'>
                    {(allNewsLetter && allNewsLetter.length != 0) ?
                        <div className='grid grid-cols-4 md:grid-cols-2 gap-[20px] md:gap-[10px] pt-[20px] md:pt-[15px] '>
                            <NewsCard data={allNewsLetter} imgClass={'h-[315px] md:h-[200px] w-full rounded-[10px_10px_0_0]'} cardClass={'h-[410px] md:h-[300px]'} />
                        </div> :
                        <NoProductFound cssClass={'flex-col h-[calc(100vh_-_220px)]'} empty_icon={'/empty_states/no-newsletter.svg'} heading={'No Newsletters Found'} />
                    }
                </div>

                <div className='more h-[30px]' ref={cardref}></div>
                {/* {(loading && isMobile) && <div id="wave">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                </div>} */}
            </RootLayout>
        </>
    )
}

export default index


export async function getServerSideProps({ params }) {

    let param = {
        category: await params.list,
        // newsletter_id: await router.query.detail,
        page_no: 1,
        limit: 15,
    }

    const resp = await get_all_newsletter_by_category(param);
    const data = resp.message

    return {
        props: { data }
    }
}