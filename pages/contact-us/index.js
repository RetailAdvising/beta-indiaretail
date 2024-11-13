import React from 'react';
import footer from '@/libs/contactus';
import Image from 'next/image';
import RootLayout from '@/layouts/RootLayout';
import ContactInfo from '../../components/ProfileCom/ContactInfo'
import SEO from '@/components/common/SEO';
export default function Contact() { 
 
    return (
      <RootLayout adIdH={'contact-us-head'} adIdF={'contact-us-foot'}>
         <SEO title={'India Retailing Contact Us.'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
             {/* <ContactInfo contactInfo={footer.data}/> */}
             <div className="container lg:py-10 md:py-4">
            <div className="row">
                {footer.data.title &&
                 <div className="m-auto text-center">
                  <h2 className="lg:text-4xl md:text-2xl font-bold">{footer.data.title} </h2>
                 </div>
                }
                {footer.data.content && footer.data.content == 'Contact Us' && <ContactInfo contactInfo={footer.data} />}
              </div>
          </div>
            <div className={`footer`}>
                <div className='container gap-11 py-10 md:p-[15px] max-w-full'>
                    {footer.footer.section_1 && <div className={`flex-[0_0_calc(25%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] flex flex-row gap-1.5 md:flex-col`}>
                    <div className="basis-2/4">
                    <h2 className='font-bold text-3xl md:text-2xl pt-6 md:pt-0 text-left md:text-left mb-2'>Contact Us</h2>
                            <h6 className='font-medium pb-1'>{footer.footer.section_1.addresstitle}</h6>
                            <p className='address font-normal'>{footer.footer.section_1.address}</p>

                            <h6 className='font-medium pb-1 pt-2'>{footer.footer.section_1.addresstitle1}</h6 >
                            <p className='address font-normal'>{footer.footer.section_1.address1}</p>

                           {footer.footer.section_1.addresstitle2 &&<><h6 className='font-medium pb-1 pt-2'>{footer.footer.section_1.addresstitle2}</h6 >
                            <p className='address font-normal'>{footer.footer.section_1.address2}</p></> }

                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.phoneicon} height={18} width={18} alt={"image"} className='mr-3 m-0.5' />
                                <a href={`tel:${footer.footer.section_1.phonenumber}`} className='hover:text-[red]'>{footer.footer.section_1.phonenumber}</a>
                            </span>
                            <span className='flex flex-row mt-2.5 gray-text'>
                                <Image src={footer.footer.section_1.mailicon} height={18} width={18} alt={"image"} className='mr-3 m-0.5' />
                                <a href={`mailto:${footer.footer.section_1.mail}`} className='hover:text-[red]'>{footer.footer.section_1.mail}</a>
                            </span>

                            <h6 className='text-[16px] font-semibold pb-[10px] pt-[20px]'>Our Social Media</h6>
                            <div className='flex items-center gap-[15px] py-[10px]'>
                                {footer.footer.section_1.socials && footer.footer.section_1.socials.map((res, index) => {
                                    return (
                                        <div key={index}><a href={res.link} target='_blank'><Image src={res.icon} height={20} width={25} alt='icon' className='h-[34px] w-[34px] md:pt-[10px]' /></a></div>
                                    )
                                })}
                            </div>
                    </div>
                    <div className="basis-2/4">
                                <Image src="/contact_us_02.svg" alt="About" width={500} height={500} className='m-auto'/>
                    </div>
        

                            {/* <p className='text-[16px] font-semibold py-3'>Download Indiaretailing App</p>
                            <div className='flex gap-[15px] items-center'>
                                <Image src={'/footer/play-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                                <Image src={'/footer/app-store.svg'} className='h-[32px] w-[101px]' height={15} width={20} alt={'app-store'} />
                            </div> */}
                        </div>
                    }
                </div>
            </div>
      </RootLayout>
    )
}


