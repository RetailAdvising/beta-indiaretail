import SEO from '@/components/common/SEO'
import RootLayout from '@/layouts/RootLayout'
import { HomePage } from '@/libs/api'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const index = ({ data, detail }) => {
    const router = useRouter()
    // let routes = detail.replaceAll("-", " ")
    useEffect(() => {
    }, [router.query, data])

    return (
        <>
            <RootLayout>
                <SEO title={'Retail News | Latest Retail Industry News & Business Updates'} siteName={'India Retailing'} description={'Discover India Retail News, Trends, Reports, Case Studies, Business Analysis, Technology, Startup & Videos Trusted by Retail Business Leaders'} keywords={`Retail News, Online Retail News, Latest Retail News, Retail industry News, Retail Business News, Retail Technology News, Retail Updates, Retail Sector News, Best Retail Industry News`} />
                <div className="w-[100%] container lg:min-h-[calc(100vh_-_300px)]">
                    {data && data.page_content &&
                        data.page_content.length != 0 &&
                        data.page_content.map((datas, index) => {
                            return (
                                <div key={datas.name}>
                                    {datas.use_page_builder == 0 && (
                                        <>
                                            <h1 className="capitalize md:px-[10px] text-[18px] main-width pt-[20px] font-bold">{datas.name}</h1>
                                            <div
                                                className="main-width py-[20px] px-2"
                                                dangerouslySetInnerHTML={{
                                                    __html: datas.content,
                                                }}
                                            />
                                        </>
                                    )}
                                </div>
                            );
                        })}

                </div>
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    let { detail } = await params;

    const param = {
        "route": detail,
        page_no: 1,
        page_size: 4
    }
    const resp = await HomePage(param);
    const data = resp.message

    if (data === null) {
        return {
            notFound: true
        }
    }

    return {
        props: { data, detail },
    };
}


export default index