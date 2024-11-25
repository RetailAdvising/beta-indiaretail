import { useRouter } from 'next/router'
import { useEffect } from 'react'
import RootLayout from '@/layouts/RootLayout';
import EventDetail from '@/components/Events/EventDetail';
import { postMethod, getAdvertisements,getCurrentUrl,seo_Image } from '@/libs/api';
import Head from 'next/head'

export default function EventDetails({ data, ads_data }) {
    const router = useRouter();
    useEffect(() => {

    }, [router.query])
    return (
        <>
            <RootLayout ad_payload={{ page: 'Events', page_type: 'Detail' }} homeAd={ads_data ? ads_data : null} adIdH={router.query.deatil+'evdH'} adIdF={router.query.deatil+'evdF'} isLanding={false} head={'Events'}>
                <Head>
                    <title key="title">{data?.message.meta_title}</title>
                    <meta name="description" content={data?.meta_description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                    <meta name="theme-color" content="#e21b22" />
                    <meta property="og:type" content={'Article'} />
                    <meta property="og:title" content={data?.message.meta_title} />
                    <meta property="og:description" content={data?.message.meta_description} />
                    <meta property="og:locale" content="en_IE" />
                    <meta property="og:url" content={getCurrentUrl(router.asPath)}></meta>
                    {/* <meta property="og:site_name" content={'IndiaRetailing'} />
         
          <meta property="og:site_name" content={'IndiaRetailing'} /> */}
                    <meta

                        property="og:image"
                        itemprop="image"
                        content={seo_Image(data?.message.meta_image)}
                    />
                    <meta

                        property="og:image:alt"
                        content={`${data?.title} | ${'IndiaRetailing'}`}
                    />
                    <meta property="og:image:width" content="1200" />
                    <meta property="og:image:height" content="630" />

                    <meta name="robots" content="index,follow" />

                    <meta

                        name="twitter:card"
                        content="summary_large_image"
                    />
                    <meta

                        name="twitter:site"
                        content={'@d__indiaRetail'}
                    />
                    <meta

                        name="twitter:creator"
                        content={'@d__indiaRetail'}
                    />
                    <meta property="twitter:image" content={seo_Image(data?.message.meta_image)} />
                    <meta

                        property="twitter:title"
                        content={data?.message.title}
                    />
                    <meta

                        property="twitter:description"
                        content={data?.message.meta_description}
                    />



                    {/* <link rel="canonical" href={'https://indiaretail.vercel.app/'} /> */}

                    <link rel="shortcut icon" href="/ir_2023.png" />
                </Head>
                {/* {data && data.message && <SEO title={data.message.meta_title ? data.message.meta_title : data.message.title} ogImage={check_Image(data.message.meta_image ? data.message.meta_image : data.message.image_path)} siteName={'India Retailing'} ogType={data.message.meta_keywords ? data.message.meta_keywords : data.message.title} description={data.message.meta_description ? data.message.meta_description : data.message.title} />} */}
                {data && <EventDetail data={data} ads_data={ads_data} />}
            </RootLayout>
        </>
    )
}

export async function getServerSideProps({ params }) {
    const Id = await params?.list + '/' + params?.detail;
    const datas = { route: Id }
    const response = await postMethod("india_retailing.india_retailing.api.event_detail", datas)
    const data = await response;

    if(data.status === 'Failed'){
        return{
            notFound : true
        }
    }

    let ads_params = { page: 'Events', page_type: 'Detail' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;

    return {
        props: { data, ads_data }
    }
}

