import React from 'react';
import RootLayout from '@/layouts/RootLayout';
import Image from 'next/image';
import { Value } from 'sass';
import data from '@/libs/privacypolicy'
import SEO from '@/components/common/SEO';



export default function PrivacyPolicy() {
    return (
      <RootLayout>
         <SEO title={'India Retailing Privacy and Policy'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        <div className='container p-[30px] md:p-[15px]'>
            <h1 className='text-3xl md:text-2xl font-bold text-center'>{data.title}</h1>
            <p className='sub_title text-left pb-2 pt-3'>{data.content}</p>
            <p className='sub_title text-left pb-2'>{data.content1}</p>
            <p className='sub_title text-left pb-2'>{data.content2}</p>
        </div>
      </RootLayout>
    )
  }


