import SEO from '@/components/common/SEO'
import RootLayout from '@/layouts/RootLayout'
import { check_Image, getAdvertisements, GetDigitalIconCandidate } from '@/libs/api'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const Candidate = ({ res, param }) => {
    // console.log(datas, "datas",param)
    const [ads_data, setAdsData] = useState();
    let [data, setData] = useState(res ? res : null);

    useEffect(() => {

        get_ads()

    }, [])

    const get_ads = async () => {
        let ads_params = { page: 'Digital', page_type: 'Landing' }
        const res_ads = await getAdvertisements(ads_params);
        const ads_data = res_ads.message;
        if (ads_data) {
            setAdsData(ads_data)
        }
    }
    return (
        <RootLayout ad_payload={{ page: 'Digital', page_type: 'Landing' }} homeAd={ads_data ? ads_data : null} adIdH={'digital-head'} adIdF={'digital-foot'} >
            <SEO title={'Digital'} siteName={'India Retailing'} description={'Digital'} />
            <div className='container bg-black'>

                <div className='flex flex-col items-center justify-center py-[20px]'>
                    <Image src={check_Image(data.image)} height={200} width={200} alt={data.full_name} className='w-auto h-auto' />
                </div>
                {/* {console.log(data, "data")} */}

            <div className='flex flex-col gap-[20px] p-[20px_10px]'>
                {data.specs && data.specs.length > 0 && <div className="flex flex-wrap w-full gap-[20px] ">
                    {data.specs.map((spec, index) => {
                        // let count = 0;

                        return (
                            <>
                                {spec.top_spec && <div key={`${spec.title}_${index}`} className={`flex flex-col customBorder lg:w-[90%] mx-auto `}>
                                    <h2 className="keyLearnings customHeading1">{spec.title}</h2>
                                    <ul className="keyLearningsList">
                                        {spec.content.map((item, i) => (
                                            <li key={`${item}_${i}`} className="keyLearningItem customText">{item}</li>
                                        ))}
                                    </ul>
                                </div>}
                            </>
                        )
                    })}
                </div>
                }

                {data.career_history && data.career_history.length > 0 && <div className="w-[90%] mx-auto ">
                    <h1 className="customHeading2 text-[#ffd700]">Career History</h1>

                    <div className={`${data.career_history.length >= 3 ? "grid-cols-3" : "grid-cols-2"} grid gap-[20px] w-full md:grid-cols-1`}>
                        {data.career_history && data.career_history.length > 0 && data.career_history.map((car, index) => (
                            <div key={`${car.company}_${index}`} className={` flex flex-col items-center justify-center `}>
                                <h2 className="customHeading3">{car.company_name}</h2>
                                <div className="carcustomText" dangerouslySetInnerHTML={{ __html: car.designation }} />
                            </div>
                        ))}
                    </div>

                </div>}

                {data.specs && data.specs.length > 0 && <div className="flex flex-col w-full gap-[20px]">
                    {data.specs.map((spec, index) => (<>
                        {!spec.top_spec && <div key={`${spec.title}_${index}`}>
                            <h1 className="customHeading4 text-[#ffd700]">{spec.title}</h1>
                            <ul className="keyLearningsList">
                                {spec.content.map((item, i) => (
                                    <li key={`${item}_${i}`} className="keyLearningItem customText">{item}</li>
                                ))}
                            </ul>

                        </div>}


                    </>))}</div>}

</div>

            </div>
        </RootLayout>
    )
}

export default Candidate

export async function getServerSideProps({ params }) {
    let Id = await params?.name;

    let param = {
        name: Id,
    }
    // let datas = await GetDigitalIconCandidate(param);
    // let res = datas?.message?.message ? datas.message.message : null;
    let res = null;
    if (!res) {
        return {
            notFound: true,
        }
    }
    return {
        props: { res, param },
    }
}