import RootLayout from '@/layouts/RootLayout';
import Values from '@/components/Aboutus/values';
import Publications from '@/components/Aboutus/publications';
import Exhibitions from '@/components/Aboutus/exhibitions';
import Events from '@/components/Aboutus/events';
import About from '@/components/Aboutus/about';
import Books from '@/components/Aboutus/books';
import SEO from '@/components/common/SEO';

export default function Aboutus() {
    return (
      <RootLayout adIdH={'about-head'} adIdF={'about-foot'}>
         <SEO title={'India Retailing About'} siteName={'India Retailing'} description={'This is IndiaRetailing and its about news and articles based on the popular site.'} />
        <About></About>
        <div className='container md:p-[15px]'>
            <Values></Values>
        </div>
        <div className='container md:p-[15px]'>
            <Publications></Publications>
        </div>
        <div className='container md:p-[15px]'>
            <Books></Books>
        </div>
        <div className='container md:p-[15px]'>
            <Events></Events>
        </div>
        <div className='container md:p-[15px]'>
            <Exhibitions></Exhibitions>
        </div>
      </RootLayout>
    )
  }


