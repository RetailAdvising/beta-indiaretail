import Image from 'next/image'
import { useRouter } from 'next/router'
import AuthModal from '../Auth/AuthModal';
import { useState } from 'react'

// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300","400","500","600","700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
//   })
export default function SubscriptionAlert({ data,isModal }) {
    const router = useRouter();
    // console.log(data)
    // Modal Popup
    const [modal, setModal] = useState('')

    const [visible, setVisible] = useState(false)
    function show() {
        setVisible(true);
    }

    function hide() {
        setVisible(false)
    }
    return (
        <>
            <div className={`${isModal ? '' : 'lg:h-[550px] p-[40px] md:p-[20px] shadow-[rgba(0,0,0,0.04)_0px_4px_12px]'} lg:flex items-center gap-5  rounded-[10px]  my-5  `}>
                <div className={`${isModal ? 'flex-[0_0_calc(35%_-_10px)]' : 'flex-[0_0_calc(30%_-_10px)]'}`}>
                    <Image className='img h-full w-full object-contain' src={'/irprime/news.svg'} height={15} width={15} alt='news' />

                </div>
                <div className={`${isModal ? 'flex-[0_0_calc(65%_-_10px)]' : 'flex-[0_0_calc(70%_-_10px)]'}`}>
                    {!(localStorage && localStorage['apikey']) && <div className="rounded-full justify-center flex gap-[10px] p-[10px] mb-[10px] items-center bg-[#ddd] w-[60%] md:w-[90%] md:p-[8px]">
                        <p className={`text-[16px] md:text-[14px] nunito`}>Already subscribed to Prime </p>
                        <div onClick={show} className='flex cursor-pointer items-center gap-[5px]'>
                            <span className={`text-red text-[16px] md:text-[14px] nunito`}>Login</span>
                            <div><Image className='img h-[15px] w-[15px] object-contain' src={'/arrowrightprimary.svg'} height={15} width={15} alt='signup' /></div>
                        </div>
                    </div>}

                    <div className={`m-[10px] ${isModal ? 'md:h-[250px] md:overflow-auto scrollbar-hide' : ''}`}>
                        <h1 className='font-semibold text-[28px] md:text-[17px]'>Unblock this article by subscribing to Prime</h1>
                        <h4 className={`font-semibold text-[20px] md:text-[16px] my-[10px] nunito`}>With this subscription you also get:</h4>
                        {(data && data.length != 0) && data.slice(0,4).map((res, i) => {
                            return (
                                <div key={i} className='flex items-center py-[10px] gap-[10px]'>
                                    <Image src={'/irprime/list-check-ir.svg'} height={20} width={20} alt='' />
                                    <p className={`md:text-[14px] nunito`}>{res.features}</p>
                                </div>
                            )
                        })}
                        {/* <div className='flex items-center py-[10px] gap-[10px]'>
                            <Image src={'/irprime/list-check-ir.svg'} height={20} width={20} alt='' />
                            <p className='md:text-[14px]'>Access to 5000+ paywall stories written by experts</p>
                        </div>
                        <div className='flex items-center py-[10px] gap-[10px]'>
                            <Image src={'/irprime/list-check-ir.svg'} height={20} width={20} alt='' />
                            <p className='md:text-[14px]'>Access to Times Assist: your team of AI assistants**</p>
                        </div>
                        <div className='flex items-center py-[10px] gap-[10px]'>
                            <Image src={'/irprime/list-check-ir.svg'} height={20} width={20} alt='' />
                            <p className='md:text-[14px]'>Access to 6 weekly Newsletters including Gender+, Health+ Wealth+</p>
                        </div> */}
                    </div>
                    {/* onClick={() => router.push('/membership')} */}
                    <button className='primary_btn w-full lg:my-5 rounded-[10px] text-[16px] h-[60px] md:h-[40px] md:text-[15px] ' onClick={() => router.push('/membership')}>View all plans</button>
                </div>
            </div>
            {visible && <div className='authModal'><AuthModal modal={modal} show={show} visible={visible} hide={hide} /></div>}
        </>

    )
}