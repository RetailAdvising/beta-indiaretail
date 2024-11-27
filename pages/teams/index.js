import RootLayout from '@/layouts/RootLayout';
import Image from 'next/image';
import data from '@/libs/teams'
import SEO from '@/components/common/SEO';

export default function Teams() {
    return (
        <RootLayout>
            <SEO title={'India Retailing Team'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
            <div className='bg-[#F8F8F8]'>
                <div className='container py-24 md:p-[15px]'>
                    <div className="grid-cols-2 md:grid-cols-1 gap-4 md:gap-2 grid">
                        <div className="col-span-1">
                            <h2 className='font-bold text-3xl md:text-2xl pt-6 text-left'>{data.title}</h2>
                            <p className='sub_title text-left pt-3'>{data.subtitle}</p>
                        </div>
                        <div className="col-span-1 text-center m-auto">
                            <Image src={data.teamimages} alt="Teams" width={300} height={300} />
                        </div>
                    </div>
                </div>
            </div>
            {data && data.teammembers.map((teams, teamindex) => (
                <div className={teamindex % 2 === 0 ? 'oddteam' : 'eventeam'}>
                    <div className='container md:p-[15px]'>
                        <div className="flex md:flex-col-reverse flex-row gap-4 md:gap-2 py-16  md:pt-4 md:pb-4" data-index={teamindex}>
                            <div className="col-span-1 text-center m-auto basis-2/4 md:basis-full">
                                <Image src={teams.image} alt="Teams" width={500} height={500} className='m-auto' />
                                <div className='d__flex gap-4 pt-6 justify-center'>
                                    {teams.social.map((item, itemIndex) => (
                                        <a href={item.url} target="_blank" key={item.id}><Image src={item.iconlink} alt={item.name} width={24} height={24} /></a>
                                    ))}

                                    {/* <a href={teams.social.x} target="_blank"><Image src="/teams/x.svg" alt="x" width={24} height={24} /></a>
                        <a href={teams.social.linkedin} target="_blank"><Image src="/teams/instagram.svg" alt="instagram" width={24} height={24} /></a> */}
                                </div>
                            </div>
                            <div className="col-span-1 m-auto basis-2/4 md:basis-full">
                                <h2 className='font-bold text-3xl md:text-2xl pt-6 text-left'>{teams.title}</h2>
                                <h6 className='font-medium text-left pt-1 text-[16px] text-[gray-dark1]'>{teams.designation}</h6>
                                <p className='sub_title  text-left pt-3'>{teams.content}</p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </RootLayout>
    )
}

