import { useRouter } from 'next/router'
import { useRef, useEffect, useState } from 'react'
import { search_product, checkMobile, all_category_list } from '@/libs/api';
import RootLayout from '@/layouts/RootLayout';
// import Cards from '@/components/common/Cards';
import Image from 'next/image'
import { check_Image } from '@/libs/common'
import Link from 'next/link';
import dynamic from 'next/dynamic';
const Cards = dynamic(()=> import('@/components/common/Cards'))
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300","400","500","600","700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
//   })
export default function search({ searchTxt, data }) {


  // Search
  let [enableSearch, setEnableSearch] = useState(false)
  const [searchResult, setSearchResult] = useState([])
  let [searchValue, setSearchValue] = useState("");
  let [isMobile, setIsmobile] = useState();
  let [Skeleton, setSkeleton] = useState(false);
  let [allCategory, setAllCategory] = useState([])
  let [breadCrumbs, setBreadCrumbs] = useState([
    { name: 'Home', route: '/' },
    { name: 'Search', route: '/search/searchText=' },
  ])

  // console.log(data,"data")
  const router = useRouter();
  let cardref = useRef();
  let page_no = 1
  let no_product = false;

  useEffect(() => {
    if (searchTxt && searchTxt != "") {
      setSkeleton(true);
      setEnableSearch(false);
      searchValue = searchTxt;
      setSearchValue(searchTxt)
      searchText(searchTxt)

      //  let array_values = breadCrumbs.push({name:searchValue})
      setBreadCrumbs((d) => d = [...d, { name: searchValue }]);

    } else {
      setSearchResult([]);
      setEnableSearch(true)
    }

    if (data && data.length != 0) {
      allCategory = data
      setAllCategory(allCategory)
    }
    // console.log(data)

    const intersectionObserver = new IntersectionObserver(entries => {
      // console.log('12345')
      if (entries[0].intersectionRatio <= 0) return;
      // console.log(entries,'entery')
      if (!no_product && !enableSearch) {
        page_no > 1 ? searchText(searchValue) : null
        page_no = page_no + 1
      }
    });

    intersectionObserver?.observe(cardref?.current);

    return () => {
      cardref?.current && intersectionObserver?.unobserve(cardref?.current)
    }



  }, [router.query])

  async function searchText(eve) {
    let value = eve;
    if (value) {
      let params = { search_txt: value, page_no: page_no, page_length: 10 }
      const resp = await search_product(params);
      // console.log(resp);
      setSkeleton(false);
      if (resp && resp.status == 'success') {
        if (resp.data.length != 0) {
          setSearchResult((d) => d = page_no == 1 ? resp.data : [...d, ...resp.data]);
        } else {
          no_product = true;
          page_no == 1 ? setSearchResult([]) : null;
        }
      } else {
        setSearchResult([]);
      }
    }

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }


  const checkIsMobile = async () => {
    isMobile = await checkMobile();
    setIsmobile(isMobile);
  }

  async function searchText_1(eve) {
    page_no = 1;
    let value = eve.target.value;
    setEnableSearch(true);
    setSearchValue(value);
    if (value != '') {
      setSkeleton(true);
      searchText(value);
    } else {
      setSearchResult([]);
    }
  }

  async function handleKeyDown(event) {
    if (event.key === 'Enter') {
      navigateSearchScreen('search')
      // console.log(event)
    }
  }

  const clearSearch = (data) => {
    let element = document.getElementById(data).value = '';
    setSearchResult([]);
    setSearchValue('');
    router.push('/search?searchText=');
  }

  const navigateSearchScreen = (data) => {
    let element = document.getElementById(data).value;
    if (element && element != '') {
      setSkeleton(true);
      setEnableSearch(false);
      setSearchResult([]);
      page_no = 1;
      no_product = false;
      router.push('/search?searchText=' + element);
    }
  }


  const navigateDetail = (data) => {
    // router.push('/login')
    let route = ''
    if (data.type == 'Articles') {
      // route = data.ir_prime == '1' ? '/IRPrime/' + data.route : '/categories/' + data.route
      route = '/' + data.route
    } else if (data.type == 'Product') {
      route = '/bookstore/' + data.route
    } else if (data.type == 'Community Event') {
      route = '/events/' + data.route
    } else if (data.type == 'Podcast') {
      route = '/podcast/' + data.route
    } else if (data.type == 'Video') {
      route = '/video/' + data.route
    } else if (data.type == 'Newsletter') {
      route = '/newsletters/' + data.route
    }

    if (route) {
      router.push(route);
    }
  }

  return (
    <>
      <RootLayout checkout={isMobile ? false : true}>
        {/* onKeyPress={()=>{navigateSearchScreen('search')}} */}
        
        <div className={`${isMobile ? 'hidden' : 'container flex justify-end pt-[15px]'} md:hidden`}>
          <Image src={'/categories/close.svg'} onClick={() => router.back()}  className='cursor-pointer ' height={22} width={22} alt='close' />
        </div>
        
        <div className={'p-[10px] lg:w-[60%] lg:m-[16px_auto_0px_auto]'}>
          <div className={`flex border  rounded-[10px]`}>
            <input id='search' className={'border-[0px] p-[10px] w-full rounded-[10px]'} onChange={searchText_1} onKeyDown={handleKeyDown} type="text" placeholder='Search here...' spellcheck="false" name="search"></input>
            {searchValue != '' && <div onClick={() => { clearSearch('search') }} className='cursor-pointer flex items-center justify-center px-[10px] h-[45px]'><Image height={20} priority width={20} alt='search' src={'/cart/close.svg'} className="h-[24]"></Image></div>}
            <div onClick={() => { navigateSearchScreen('search') }} className='border-l-[1px] p-[10px] cursor-pointer border-l-slate-100 flex items-center justify-center'><Image style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} className=""></Image></div>
          </div>
          {!Skeleton && enableSearch && <div className='h-[calc(100vh_-_150px)] overflow-auto scrollbar-hide' >
            {searchResult && searchResult.length == 0 ?
              // <EmptySection searchValue={searchValue} />
              <>
                {allCategory && allCategory.length != 0 ? <AllCategory data={allCategory} /> : <EmptySection searchValue={searchValue} />}
              </>
              :
              searchResult.map((res, index) => {
                return (
                  <div key={index} onClick={() => { navigateDetail(res) }} className='flex items-center justify-between cursor-pointer border-b-[1px] border-b-slate-100 last-child:border-b-[0px]  p-[10px]'>
                    <div className='flex items-center gap-[8px]'>
                      <div className='flex items-center justify-center h-[55px]'><Image className='h-[50px]' src={check_Image(res.product_image)} height={50} width={50} alt={res.title} /></div>
                      <h6 className='text-[15px] line-clamp-1 font-semibold'>{res.title}</h6>
                    </div>
                    <div className='flex items-center justify-center'><Image height={8} priority width={8} alt='search' src={'/forwardIcon.svg'} className="opacity-50"></Image></div>
                  </div>
                )
              })}
          </div>
          }

        </div>


        {!Skeleton && !enableSearch &&
          <>
            {searchResult && searchResult.length == 0 ?
              // <EmptySection searchValue={searchValue} />
              <div className={'px-[10px] lg:w-[60%] lg:m-[16px_auto_0px_auto]'}>
                {allCategory && allCategory.length != 0 ? <AllCategory data={allCategory} /> : <EmptySection searchValue={searchValue} />}
              </div>
              :
              <>
                <div className='lg:min-h-[325px] md:min-h-[500px] grid md:grid-cols-2 grid-cols-5 gap-[15px] container py-[20px] md:px-[10px]'>
                  <Cards cardClass={"mb-[10px]"} noPrimaryText={true} borderRadius={"rounded-[10px_10px_0_0]"} height={"lg:h-[180px] m-[0px_auto] object-contain p-[10px] md:h-[150px]"} searchNavigation={true} check={true} isBorder={true} data={searchResult} />
                </div>
              </>
            }
          </>
        }

        <div className='more h-[30px]' ref={cardref}></div>

        {Skeleton && enableSearch &&
          <div className='lg:w-[60%] lg:m-[0px_auto] h-[calc(100vh_-_150px)] overflow-auto scrollbar-hide'>
            {[1, 2, 3, 4, 5, 6, 7].map((res, index) => {
              return (
                <div key={index} className={"animate-pulse flex items-center border-b-[1px] border-b-slate-100 last-child:border-b-[0px]  p-[10px] gap-[8px]"}>
                  <div className='h-[100px] w-[100px] p[-10px] bg-slate-200 rounded'></div>
                  <div className='h-[25px] my-[10px] w-[75%] bg-slate-200 rounded'></div>
                </div>
              )
            })}
          </div>
        }

        {Skeleton && !enableSearch &&
          <div className='lg:min-h-[320px] md:min-h-[500px] grid md:grid-cols-2 grid-cols-5 gap-[15px] container py-[20px] md:px-[10px]'>
            {[1, 2, 3, 4, 5, 6, 7].map((res, index) => {
              return (
                <div key={index} className={"animate-pulse border rounded-[5px] p-[10px]"}>
                  <div className='h-[150px] w-[150px] m-[0_auto] p[-10px] bg-slate-200 rounded'></div>
                  <div className='h-[25px] my-[10px] w-[30%] bg-slate-200 rounded'></div>
                  <div className='h-[28px] mb-[10px] w-[60%] bg-slate-200 rounded'></div>
                </div>
              )
            })}
          </div>
        }


      </RootLayout>
    </>
  )
}

export async function getServerSideProps({ query }) {
  let searchTxt = query.searchText
  let resp = await all_category_list({})
  let data = resp.message;
  return {
    props: { searchTxt, data }
  }
}

const EmptySection = ({ searchValue }) => {
  return (
    <>
      <div className='h-[calc(100vh_-_150px)] flex flex-col items-center justify-center'>
        <div className='h-[150px]'>
          <Image className='h-[150px] object-contain' height={120} priority width={200} alt='' src={searchValue != '' ? '/empty_states/no-news.svg' : '/empty_states/no-comment.svg'}></Image>
        </div>
        <h6 className='text-[15px] font-semibold py-[10px]'>{searchValue != '' ? 'No new found' : 'Enter the text to search a latest news'}</h6>
      </div>
    </>
  )
}


const AllCategory = ({ data }) => {
  // console.log(data,'data')
  return (
   <div>
       <div className='grid grid-cols-3 md:grid-cols-2 gap-5 my-5'>
      {data && data.length != 0 && data.map((res, i) => {
        return (
          <div key={res.title} className=''>
            <Link href={res.base_route} className={`text-[15px] font-[700] mb-[5px] nunito`}>{res.title}</Link>
            {res.data && res.data.length != 0 && res.data.map((resp, index) => {
              return (
                <Link className='block' href={res.base_route + resp.route} key={resp.title ? resp.title : resp.category_name}>{resp.title ? resp.title : resp.category_name}</Link>
              )
            })}
          </div>
        )
      })}
    </div>
   </div>
  )
}
