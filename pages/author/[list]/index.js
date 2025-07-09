import Cards from "@/components/common/Cards";
import RootLayout from "@/layouts/RootLayout"
import { checkMobile, get_author_based_article_list } from "@/libs/api";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export default function AuthorList({ values, Id }) {
    const router = useRouter();
    const [data, setData] = useState([]);
    // console.log(values)

    // let apiCall = false;
    let page_no = 1;
    let cardref = useRef(null);
    let no_product = false;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // console.log(values);
        // debugger
        if (values) {
            setTimeout(() => {
                setData(values)
            }, 200);
        }

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

    }, [router.query, cardref]);

    async function loadMore() {
        // debugger
        setLoading(true)
        let Id = router.query.list;
        let param = {
            // doctype: "Articles",
            author: Id,
            page_no: page_no,
            page_size: 20,
            // fields: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
            // filters: { articles_category: Id, ir_prime: 0, published: 1 }
        }
        let value = await get_author_based_article_list(param);
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
        <RootLayout >
            {/* {props.data && <HomePodcast data={props} />} */}
            <div className={`${isMobile ? 'md:p-[15px]' : 'container'}`} id='root' >

               
                <div className={`grid grid-cols-4 md:grid-cols-2 md:pt-[20px] lg:pt-8 lg:pb-4 md:gap-[10px] lg:gap-[20px]`}>
                    {/* contentHeight={'h-[175px]'} */}
                    <Cards cardClass={"lg:h-[315px] md:h-full"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"lg:h-[180px] md:h-[150px]"} route={Id == 'case-studies' ? Id : null} check={true} width={"w-full"} isBorder={true} data={data} />
                </div>
            </div>
            <div className='more h-[20px]' ref={cardref}></div>
            {(loading && isMobile) && <div id="wave">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
            </div>}
        </RootLayout>
    )
}

export async function getServerSideProps({ params }) {
    let Id = await params?.list

    // let param = {
    //     author: id,
    //     page_no: 1,
    //     page_size: 13,
    // }

      let param = {
        //    s: ["blog_intro", "name", "articles_category", "title", "publisher", "secondary_text", "route", "primary_text", "thumbnail_image", "image", "sub_title", "_user_tags", "location"],
        author: Id,
        page_no: 1,
        page_size: 20,
    }
    // let value = await getList(param);
    let value = await get_author_based_article_list(param);
    // let values = await value.message;
    let values = await param.category_route == 'case-studies' ? value.message.message : value.message;
    return {
        props: { values,Id }
    }
}
