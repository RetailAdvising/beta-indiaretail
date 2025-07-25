import { useState, useEffect } from 'react';
import footer from '@/libs/footer';
import Image from 'next/image';
import { check_Image } from '@/libs/api';
import { useRouter } from 'next/router';
import Accordion from './Accordion';

export default function MainFooter({ footerData,isMobile }) {
    const router = useRouter();
    let [subsBox, setSubsBox] = useState()

    useEffect(() => {
        if (footerData && footerData.items && footerData.items.length != 0) {
            let val = setFooter1(footerData.items)
            subsBox = val ? val : undefined;
            setSubsBox(subsBox)
            // console.log(val)
        }


    }, [isMobile])

    const setFooter1 = (data) => {
        if (data && data && data.length != 0) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].items.length; j++) {
                    if (data[i]['items'][j]['section_name'] == 'Footer 1') {
                        return data[i]['items'][j]
                    }
                }
            }
        }
    }

    return (
        <>
            
            <div className='footer overflow-hidden lg:mt-[30px]'>
                {subsBox && Object.keys(subsBox).length != 0 && <div className='lg:hidden md:p-[15px] conatiner'>
                    <div className={`h-[230px] md:h-[170px] border p-[10px] rounded-[5px] flex gap-[10px] items-center`}>
                        <div className={`flex-[0_0_40%]`}>
                            <Image src={check_Image(subsBox.image)} className={`object-contain w-full`} height={100} width={100} alt={subsBox.primary_text} />
                        </div>
                        <div>
                            <p className={``}><span className={`font-[700] text-[#e21b22] text-[14px] nunito`}>{subsBox.primary_text}</span>  <span className={`text-[#666666] font-[700] text-[14px] nunito`}>{subsBox.secondary_text}</span></p>
                            <p className={`text-[13px] leading-[1.3] my-[10px] nunito`}>{subsBox.description}</p>
                            <button className={`primary_button h-[35px] p-[0_10px] text-[14px] cursor-pointer w-full`} onClick={() => router.push('/membership')}>{subsBox.button}</button>
                        </div>
                    </div>
                </div>}

                {footerData && <div className={` container flex md:block gap-[20px] py-[20px] md:px-[15px] `}>
                    {footerData.items && footerData.items.map((footer_item, index) => {
                        return (
                            // flex-[0_0_calc(${100 / footerData.items.length}%_-_16px)]
                            <div key={index} className={`${index == 0 ? 'flex-[0_0_calc(20%_-_15px)] md:gap-[10px]' : 'flex-[0_0_calc(16%_-_15px)] lg:min-h-[520px]'} md:grid`}>
                                {footer_item.items && footer_item.items.map((item, i) => {
                                    return (
                                        <div key={i} className={`${item.section_name == 'Footer 1' ? 'relative md:hidden' : ''}`}>
                                            
                                            {item.section_name == 'Footer Contact' &&
                                                <div className={` flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]`}>
                                                    <Image src={check_Image(item.logo)} onClick={() => router.push("/")} height={66} width={200} alt={"image"} className='mb-[20px] cursor-pointer' />
                                                    <h6 className='font-medium pb-1  text-[13px]'>{item.title}</h6>
                                                    {/* <p className='address font-normal text-[13px]'>{item.address_content}</p> */}
                                                    <div className='address font-normal text-[13px]' dangerouslySetInnerHTML={{ __html: item.address_content }} />
                                                    <span className='flex flex-row mt-2.5 gray-text'>
                                                        <Image src={check_Image(item.phone_icon)} height={18} width={18} alt={"image"} className='mr-2 m-0.5 object-contain' />
                                                        <a href={`tel:${item.phonenumber}`} className='hover:text-[red] text-[12px]'>{item.phone_no}</a>
                                                    </span>
                                                    <span className='flex flex-row mt-2.5 gray-text'>
                                                        <Image src={check_Image(item.email_icon)} height={18} width={18} alt={"image"} className='mr-2 m-0.5 object-contain' />
                                                        <a href={`mailto:${item.email_id}`} className='hover:text-[red] text-[12px]'>{item.email_id}</a>
                                                    </span>
                                                </div>}

                                            {item.section_name == 'Social Links' &&
                                                <>
                                                    
                                                    <div className='md:flex-[0_0_calc(100%_-_10px)]' >
                                                        <h6 className={`text-[16px] font-[700] lg:pb-[10px] lg:pt-[20px] nunito`}>Our Social Media</h6>
                                                        <div className='flex items-center gap-[13px] py-[10px]'>
                                                            {item.social_links && item.social_links.map((res, index) => {
                                                                return (
                                                                    <div key={index}><a href={res.link_url} target='_blank'><Image src={check_Image(res.icon)} height={20} width={25} alt='icon' className='h-[34px] w-[34px] md:h-[30px] md:w-[30px] object-contain' /></a></div>
                                                                )
                                                            })}
                                                        </div>
                                                    </div>
                                                    {/* <div className='md:flex-[0_0_calc(100%_-_10px)]' >
                                                        <h6 className={`text-[16px] md:text-[14px] font-[700] py-3 nunito`}>Download Indiaretailing App</h6>
                                                        <div className='flex gap-[15px] md:gap-[10px] items-center'>
                                                            <Image src={'/footer/play-store.svg'} className='h-[32px] w-[101px] md:w-[90px] md:object-contain' height={15} width={20} alt={'app-store'} />
                                                            <Image src={'/footer/app-store.svg'} className='h-[32px] w-[101px] md:w-[90px] md:object-contain' height={15} width={20} alt={'app-store'} />
                                                        </div>
                                                    </div> */}
                                                </>

                                            }

                                            {item.section_name == "Menu" && <>
                                                {/* <div className={`list_div leading-[2.5] ${(i % 2 == 0) ? 'min-h-[290px]' : ''} md:flex-[0_0_calc(50%_-_20px)] md:min-h-[20px]  md:mr-[20px]`} >
                                                    <h6 className={`text-[15px] font-[700] mb-3 nunito`}>{item.title}</h6>
                                                    {(item.menus && item.menus.length != 0) && item.menus.map((item, index) => {
                                                        return (
                                                            <Link target={item.title == 'Events' ? '_blank' : '_self'} href={item.redirect_url} key={index}><p className={`sub_title  text-[15px] font-semibold mb-2  hover:text-[red] nunito`}>{item.menu_label}</p></Link>
                                                        )
                                                    })}
                                                </div> */}
                                                <Accordion isMobile={isMobile} item={item} i={i} />
                                            </>}

                                            {item.section_name == 'Footer 1' && <div className={`absolute footer_add top-0 left-0 right-[-390px] h-[230px] border p-[10px] rounded-[5px] flex gap-[10px] items-center`}>
                                                <div className={`flex-[0_0_40%]`}>
                                                    <Image src={check_Image(item.image)} className={`object-contain w-full`} height={100} width={100} alt={item.primary_text} />
                                                </div>
                                                <div>
                                                    <p className={``}><span className={`font-[700] text-[#e21b22] text-[14px] nunito`}>{item.primary_text}</span>  <span className={`text-[#666666] font-[700] text-[14px] nunito`}>{item.secondary_text}</span></p>
                                                    <p className={`text-[13px] leading-[1.3] my-[10px] nunito`}>{item.description}</p>
                                                    <button className={`primary_button h-[35px] p-[0_10px] text-[14px] cursor-pointer w-full`} onClick={() => router.push('/membership')}>{item.button}</button>
                                                </div>
                                            </div>}
                                        </div>
                                        
                                    )
                                })}
                            </div>

                        )
                    })}
                </div>}
            </div>
            <p className='copy_write md:p-[15px_25px] my-[10px]'>{footer.footer.copy_write}<a href={`${footer.footer.copy_link}`} className='hover:text-[red]'> {footer.footer.copy_link_text}</a>. All Rights Reserved</p>
        </>
    )
}
