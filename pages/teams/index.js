import RootLayout from '@/layouts/RootLayout';
import Image from 'next/image';
import SEO from '@/components/common/SEO';
import { check_Image, HomePage } from '@/libs/api';
import Link from 'next/link';

export default function Teams({ data }) {

    return (
        <RootLayout>
            <SEO title={'India Retailing Team'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
            {data && data.page_content && data.page_content.length > 0 &&
                data.page_content.map(res => {
                    return (
                        <div className={``} key={res.section_id}>
                            {res.our_team && res.our_team.length > 0 && <>
                                {res.our_team.map((val, teamindex) => (
                                    <div key={val.title + teamindex} className={`${teamindex === 0 ? '!bg-[#F8F8F8]' : ''}  ${teamindex % 2 === 0 ? 'eventeam' : ' oddteam'}`}>
                                        <div className={`container ${teamindex === 0 ? 'py-24' : 'py-16'}  md:p-[15px]`}>
                                            <div className={`${teamindex % 2 === 0 ? 'flex-row' : ' flex-row-reverse'} flex md:flex-col-reverse flex-row gap-4 md:gap-2   md:pt-4 md:pb-4`}>
                                                <div className={`col-span-1 text-center  basis-2/4 md:basis-full`}>
                                                    <h2 className='font-bold text-3xl md:text-2xl pt-6 text-left'>{val.title}</h2>
                                                    <p className='font-medium text-left pt-1 text-[16px] text-[gray-dark1]'>{val.sub_title}</p>
                                                    <p className='sub_title  text-left pt-3'>{val.description}</p>
                                                </div>

                                                <div className={`col-span-1 basis-2/4 md:basis-full flex justify-center flex-col items-center`}>
                                                    <Image src={check_Image(val.image)} alt={val.title} width={300} height={300} />

                                                    <div className='d__flex gap-4 pt-6 justify-center'>
                                                        {val.instagram_url && <Link href={val.instagram_url} target="_blank"><Image src={"/teams/instagram.svg"} alt={"instagram"} width={24} height={24} /></Link>}
                                                        {val.x_url && <Link href={val.x_url} target="_blank"><Image src={"/teams/x.svg"} alt={"x"} width={24} height={24} /></Link>}
                                                        {val.linkedin_url && <Link href={val.linkedin_url} target="_blank"><Image src={"/teams/linkdin.svg"} alt={"linkdin"} width={24} height={24} /></Link>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                            </>}
                        </div>
                    )
                })
            }

        </RootLayout>
    )
}

export async function getStaticProps() {
    // page_content
    const param = {
        // "application_type": "mobile",
        "route": "our-team",
        page_no: 1,
        page_size: 1
    }
    const resp = await HomePage(param);
    const data = await resp.message;

    // const res = await HomePageAds();
    // let ads = res.message

    return {
        props: { data }, revalidate: 10
    }

}