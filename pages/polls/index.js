import { getPollsList, get_ip } from '@/libs/api'
import RootLayout from '@/layouts/RootLayout';
import Poll from '@/components/Poll/Poll';
import { useEffect, useState } from 'react';

export default function index() {
    const [ipAddress, setIpAddress] = useState(null);
    const [pollList, setPollList] = useState(null);

    useEffect(() => {
        get_polls()
    }, []);

    const get_polls = async () => {
        let ip_address = await get_ip()
        setIpAddress(ip_address)
        let param = {
            ip_address: ip_address
        }
        const resp = await getPollsList(param);
        setPollList(resp.message)
    }
    return (
        <RootLayout adIdH={'polls-head'} adIdF={'polls-foot'}>
            {pollList && ipAddress && pollList.length != 0 ?
                <div className='w-[85%] m-auto py-[20px] lg:flex gap-[20px] flex-wrap'>
                    <Poll data={pollList} ipAddress={ipAddress} />
                </div>
                : <Skeleton />}
        </RootLayout>
    )
}
const Skeleton = () => {
    return (
        <>
            {[0, 1].map((res, index) => {
                return (
                    <div key={index} className='mb-5'>
                        <div className='lg:grid lg:grid-cols-3 lg:gap-[20px] container pt-[20px] md:w-[80%] m-auto mb-[20px]'>
                            {[0, 1, 2].map(i => {
                                return (
                                    <div key={i} className='border rounded-[10px] lg:h-[380px] md:h-[300px] mb-[20px]'>
                                        <div className='bg-[#E5E4E2] h-[210px] w-full rounded-[5px_5px_0_0]'></div>
                                        <div className='p-[10px]'>
                                            <p className={`bg-[#E5E4E2] h-[10px] w-full my-[10px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[10px] w-full mb-[20px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-full my-[10px] rounded-[5px]`}></p>
                                            <p className={`bg-[#E5E4E2] h-[7px] w-full mb-[10px] rounded-[5px]`}></p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}

        </>
    )
}