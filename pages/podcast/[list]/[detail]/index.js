import RootLayout from '@/layouts/RootLayout'
import AudioPlayer from '@/components/Podcast/AudioPlayer';
import { podcast_details, getAdvertisements, getCurrentUrl, seo_Image } from '@/libs/api'
import Title from '@/components/common/Title'
import Cards from '@/components/common/Cards'
// import List from '@/components/common/List'
// import Advertisement from '@/components/Baners/Advertisement'
// import Placeholders from '@/components/common/Placeholders'
import Head from 'next/head'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic';
const Placeholders = dynamic(()=> import('@/components/common/Placeholders'))
const Advertisement = dynamic(()=> import('@/components/Baners/Advertisement'))
const List = dynamic(()=> import('@/components/common/List'))
export default function PodcastDetail({ data, ads_data }) {
    const router = useRouter()
    // const {data,ads_data} = data
    //  console.log('pos',data);
    return (
        <>
            <Head>
                <title key="title">{data?.message.meta_title}</title>
                <meta name="description" content={data?.message.meta_description} />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
                <meta name="theme-color" content="#e21b22" />
                <meta property="og:type" content={'Article'} />
                <meta property="og:title" content={data?.message.meta_title} />
                <meta property="og:description" content={data?.message.meta_description} />
                <meta property="og:locale" content="en_IE" />
                {/* <meta property="og:site_name" content={'IndiaRetailing'} />
         
          <meta property="og:site_name" content={'IndiaRetailing'} /> */}
                <meta

                    property="og:image"
                    itemprop="image"
                    content={seo_Image(data?.message.meta_image)}
                />
                <meta property="og:url" content={getCurrentUrl(router.asPath)}></meta>
                <meta

                    property="og:image:alt"
                    content={`${data?.message.title} | ${'IndiaRetailing'}`}
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
            {data && <RootLayout homeAd={ads_data ? ads_data : null} adIdH={router.query.deatil + 'podH'} adIdF={router.query.deatil + 'podF'} head={data.message.title}>
                {/* <SEO title={data.message.meta_title ? data.message.meta_title : data.message.title} ogImage={check_Image(data.message.image)} siteName={'India Retailing'} ogType={data.message.meta_keywords ? data.message.meta_keywords : data.message.title} description={data.message.meta_description ? data.message.meta_description : data.message.title} /> */}
                <div className={`flex md:p-[15px] justify-between flex-wrap gap-[25px] container`}>
                    {/* {
                        <div className="w-full">
                            <AudioPlayer data={data.message} />
                        </div>
                    } */}
                    <>
                        {/* <Placeholders placeholder={videoDetail.place_holders_ads}  /> */}
                        {
                            <div className="flex w-full justify-between gap-[15px]">
                                <div className="flex-[0_0_calc(70%_-_15px)] md:flex-[0_0_100%] md:w-full lg:pr-[10px] my-[10px]">
                                    <div className="w-full mb-5">
                                        <AudioPlayer data={data.message} />
                                    </div>

                                    <Title data={{ title: 'Related Podcasts' }} seeMore={false} />
                                    <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap md:flex-wrap md:gap-[10px]`}>
                                        <Cards data={data.related_podcasts} isHome={'/podcast/'} check={true} border_none={true} height={'h-[220px]'} width={'w-[100%]'} flex={'flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                                    </div>
                                </div>
                                <div className="flex-[0_0_calc(30%_-_15px)] md:hidden">
                                    {
                                        data.place_holders_ads && data.place_holders_ads.length != 0 ?
                                            <Placeholders placeholder={data.place_holders_ads} />
                                            :
                                            <div className={`border p-[15px] rounded-[5px]`}>
                                                <Title data={data.other_category} seeMore={false} />
                                                <List isHome={'/podcast/'} isDesc={true} imgFlex={`flex-[0_0_calc(40%_-_10px)]`} imgHeight={`h-[90px]`} borderRadius={'rounded-[5px]'} titleClamp={'line-clamp-2'} imgWidth={`w-full`} data={data.other_category.data} check={true} />
                                            </div>
                                    }
                                    <div className='mb-[15px]'>
                                        <Advertisement adId={'right_first'} data={(ads_data && ads_data.right_first) && ads_data.right_first} position={"small"} adPos={'300'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
                                        {(ads_data && ads_data.right_second) && <div className='lg:py-[10px]'>
                                            <Advertisement adId={'right_second'} data={(ads_data && ads_data.right_second) && ads_data.right_second} position={"small"} adPos={'300'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
                                        </div>}
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                </div>
                {/* {ads_data && ads_data.right_first && <Advertisement data={ads_data.right_first} divClass={`h-[250px] w-[300px]`} />}
                {ads_data && ads_data.right_second && <Advertisement data={ads_data.right_second} divClass={`h-[250px] w-[300px]`} />} */}
                {/* <Advertisement adId={'right_first'} data={(ads_data && ads_data.right_first) && ads_data.right_first} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
                <Advertisement adId={'right_second'} data={(ads_data && ads_data.right_second) && ads_data.right_second} position={"small"} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} /> */}
            </RootLayout>}

        </>
    )
}
{/* {list_data && <HomePodcast data={list_data} />} */ }
{/* <Title data={data} seeMore={true} />
                            <div className={`flex gap-[10px] justify-between no_scroll lg:flex-wrap`}>
                                <Cards data={data.data} check={true} border_none={true} height={'h-[190px]'} flex={'flex-[0_0_calc(20%_-_10px)] md:flex-[0_0_calc(50%_-_10px)]'} />
                            </div> */}

export async function getServerSideProps({ params }) {
    let Id = await params?.detail;
    let list_Id = await params?.list;
    let param = {
        route: list_Id + '/' + Id,
        fields: ['name', 'title', 'sound', 'image', 'category', 'description', 'route'],
    }
    let value = await podcast_details(param);
    let data = value;

    let ads_params = { page: 'Podcasts', page_type: 'Detail' }
    const res_ads = await getAdvertisements(ads_params);
    const ads_data = res_ads.message;

    if(data.status === "Failed"){
        return {
            notFound: true
        }
    }
    return {
        props: { data, ads_data }
    }
}