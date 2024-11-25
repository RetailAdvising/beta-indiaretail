import RootLayout from '@/layouts/RootLayout'
import { getAdvertisements,video_list } from '@/libs/api'
import Video from '@/components/Video/Video'
import { useRouter } from 'next/router'
export default function Videos({data,ads}) {
    const router = useRouter()
    // console.log(data)
    return (
        <>
            <RootLayout ad_payload={{ page: 'Videos', page_type: 'List'}} isLanding={false} homeAd={ads ? ads : null} adIdH={router.query.vids+'vidslH'} adIdF={router.query.vids+'vidslF'} head={router.query.vids ? router.query.vids : 'List'}>
                {(data && data.length != 0) && <div className='grid grid-cols-4 md:grid-cols-2 container  md:p-[15px] gap-[15px] justify-between'>
                    <Video isList={true} isHome={'/video/'} data={data} imgClass={'h-[180px] md:h-[135px] w-full'} />
                </div>}
            </RootLayout>
        </>
    )
}


export async function getServerSideProps({ params }) {
    let Id = await params?.vids;
    // let Id = 'beauty-wellness';
    let param = {
      route: Id,
      fields:["name", "route", "title", "video_image"]
    }

    let value = await video_list(param);
    let data = value.message || null;

    if(data === null){
        return {
            notFound : true
        }
    }

    let param1 = { page: 'Videos', page_type: 'List'}
    const resp = await getAdvertisements(param1);
    const ads = resp.message;

    return {
        props: { data, ads }
    }
}