'use client'
import '@/styles/globals.scss'
import store from '../redux/store'
import { Faustina } from 'next/font/google'
import { Provider } from 'react-redux'
// import userAction from 'redux/actions/userAction'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { websiteSettings } from '@/libs/api'
import dynamic from 'next/dynamic'
const ErrorBoundary = dynamic(() => import('@/components/Exception/ErrorBoundary'))
// const MobileHead = dynamic(()=> import('@/components/common/BottomTabs'))
const BottomTabs = dynamic(() => import('@/components/common/BottomTabs'))
// const nProgress = dynamic(()=> import('nprogress'))
// import ErrorBoundary from '@/components/Exception/ErrorBoundary'
import MobileHead from '@/components/Headers/MobileHead'
// import BottomTabs from '@/components/common/BottomTabs'
import nProgress from "nprogress";
// import Header from '@/components/Headers/Header'
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from "next/router";
import "nprogress/nprogress.css"
// import { SessionProvider } from "next-auth/react"
// import Loader from '@/components/Loader'
// const inter = Inter({
//   weight: ["200", "300", "400", "500", "600", '700'],
//   display: "block",
//   preload: true,
//   style: 'normal',
//   subsets: ["latin"],
//   variable: '--font-inter'
// })
// import AuthSessionProvider from './auth/auth-session-provider'
import { SessionProvider } from 'next-auth/react'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ScrollToTopButton from '@/components/common/ScrollToTopButton'
import { ToastContainer } from 'react-toastify'
const inter = Faustina({
  weight: ["300", "400", "500", "600", '700'],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable: '--font-faustina'
})

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [tabHeight, setTabHeight] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  const router = useRouter()

  useEffect(() => {
    let tabs = document.getElementById('tabs')
    setTabHeight(tabs && tabs.clientHeight)
    get_website_settings()

    // if (typeof window !== 'undefined') {
    //   const TrackingTwo = require('tracking-two'); // Replace with actual import if needed
    //   const initialPageInstance = {
    //     pageTitle: document.title,
    //     pageUrl: window.location.href,
    //     // Add other properties as required by TrackingTwo
    //   };

    //   const trackingInstance = new TrackingTwo(initialPageInstance);
    //   trackingInstance.initialize();
    // }

    if (typeof window !== 'undefined') {
      // Ensure the script is loaded and initialized properly
      // const script = document.createElement('script');
      // script.src = 'path-to-tracking-two-library.js'; // Replace with actual URL or path
      // script.async = true;
      // script.onload = () => {
      //   // Initialize TrackingTwo after script is loaded
      //   const initialPageInstance = {
      //     pageTitle: document.title,
      //     pageUrl: window.location.href,
      //     // Other properties if needed
      //   };

      //   // Assuming global TrackingTwo is available after script load
      //   if (window.TrackingTwo) {
      //     const trackingInstance = new window.TrackingTwo({
      //       initialPageInstance,
      //       // Other options
      //     });
      //     trackingInstance.initialize();
      //   }
      // };

      // document.body.appendChild(script);

      // // Cleanup script on component unmount
      // return () => {
      //   document.body.removeChild(script);
      // };


      // window.adsbygoogle = window.adsbygoogle || [];
    }

    // const handleBackButton = (event) => {
    //   if (event.type === 'popstate') {
    //     const historyState = event.state;
    //     // console.log(historyS tate,'historyState')
    //     if (historyState && historyState.hrefStack && historyState.hrefStack.length > 0) {
    //       const previousHrefs = historyState.hrefStack;
    //       // Perform any necessary action with the previous hrefs
    //       // console.log(previousHrefs,'previousHrefs');
    //     }
    //   }
    //   // console.log(window.location,'window.location')
    // }

    // window.addEventListener('popstate', handleBackButton);

    // return () => {
    //   window.removeEventListener('popstate', handleBackButton);
    // };
  }, [])



  const get_website_settings = async () => {
    let websiteData = await websiteSettings()
    if (websiteData) {
      pageProps["headerData"] = websiteData.message.header_template
      pageProps["footerData"] = websiteData.message.footer_template
    }
  }

  const getActiveTab = (tab_data) => {
    // console.log(tab_data);
    setActiveTab(tab_data)
  }

  useEffect(() => {
    // NProgress.configure({ showSpinner: false });
    nProgress.configure({ showSpinner: false })
    const handleStart = () => {
      nProgress.start()
    };
    const handleComplete = () => {
      nProgress.done()
      if(typeof window !== 'undefined')
        window.scrollTo({
          top: 0,
          behavior: 'smooth' // Smooth scroll
        });
    };

    // if(typeof window !== 'undefined')
    //   removeAdsbygoogleNoAblateClass()

    if (router.pathname != "/[...detail]") {
      // if (!router.query.detail) {
      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      };
    }
  }, [router])

  // const getRoutes = (route) => {
  //   console.log(route,'actives route')
  //   const val = {redirect_url: router.route}
  //   setActiveTab(val)
  // }

  // let tabsAct = useMemo(()=> getRoutes(router), [router]) 



  // const router = useRouter();
  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const handleStart = () => {
  //     setLoading(true);
  //   };
  //   const handleComplete = () => {
  //     setLoading(false);
  //   };

  //   console.log(router)
  //   if(!router.query.detail){
  //     router.events.on("routeChangeStart", handleStart);
  //     router.events.on("routeChangeComplete", handleComplete);
  //     router.events.on("routeChangeError", handleComplete);

  //     return () => {
  //       router.events.off("routeChangeStart", handleStart);
  //       router.events.off("routeChangeComplete", handleComplete);
  //       router.events.off("routeChangeError", handleComplete);
  //     };
  //   }
  // }, [router]);

  // const isMobile = useSelector(s=> s.isMobile)
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   checkIsMobile();
  //   window.addEventListener('resize', checkIsMobile)
  //   return () => {
  //     window.removeEventListener('resize', checkIsMobile);
  //   };
  // }, [])

  // const checkIsMobile = async () => {
  //   let isMobile = await checkMobile();
  //   // setIsmobile(isMobile);
  //   dispatch(setIsMobile(isMobile))
  //   console.log('isMobile', isMobile)
  // }

  // const removeAdsbygoogleNoAblateClass = () => {
  //   // Find all elements with the class 'adsbygoogle-noablate'
  //   const elements = document.querySelectorAll('.adsbygoogle-noablate');
  //   // console.log(elements,"elements")
  //   // Loop over each element and remove the 'adsbygoogle-noablate' class
  //   if(elements){
  //     elements.forEach(el => {
  //       // el.classList.remove('adsbygoogle-noablate');
  //       el?.remove()
  //     });
  //   }
  // };
  
  return (
    <>
      {/* Load AdSense script */}
      {/* <Script
        strategy="beforeInteractive"
        id="adsense-script"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
      /> */}

      {/* Replace with your AdSense client ID */}
      {/* <Script
        strategy="beforeInteractive"
        id="adsense-setup"
        dangerouslySetInnerHTML={{
          __html: `
            (adsbygoogle = window.adsbygoogle || []).push({
              google_ad_client: "div-gpt-ad-1617096742911-0",
              enable_page_level_ads: true
            });
          `,
        }}
      /> */}
      <Head>
        {/* <link href="https://indiaretailing.go1cms/files/default-theme.css" rel="stylesheet"/> */}

        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/lightgallery/1.6.12/css/lightgallery.min.css"
        /> */}
        {/* <script src="https://apis.google.com/js/api.js"></script> */}
        {/* <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.5.0/jquery.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/lightgallery@1.6.12/dist/js/lightgallery.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lg-thumbnail/1.1.0/lg-thumbnail.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/lg-fullscreen/1.1.0/lg-fullscreen.min.js"></script> */}

        {/* <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        /> */}

        {/* <Script
          // id="adsense-script"
          // data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
          strategy="beforeInteractive"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
        /> */}

        {/* <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=div-gpt-ad-1617096742911-0`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        ></Script> */}

        <script async  src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
      </Head>
      <ErrorBoundary >
        <Provider store={store} >
          {/* { loading ? <p>loading...</p> calc(100vh_-_${tabHeight}px) */}
          <ChakraProvider>
            {/* <GoogleOAuthProvider clientId={"630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com"}> */}

            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
              <SessionProvider session={session}>
                <main className={` ${inter.className} md:max-h-[100vh] md:overflow-auto`} id='scroll_div' >
                  {router.pathname != "/p/[...route]" && <div className='lg:hidden'><MobileHead getActiveTab={getActiveTab} activeTab={activeTab} /></div>}
                  {/* <Header/> */}
                  <ToastContainer position={'bottom-right'} autoClose={2000} />
                  <Component {...pageProps} />
                  <ScrollToTopButton />
                 {router.pathname != "/p/[...route]" && <div className='lg:hidden'>
                    <BottomTabs getActiveTab={getActiveTab} activeTab={activeTab} />
                  </div>}
                </main>
              </SessionProvider>
            </GoogleOAuthProvider>
          </ChakraProvider>
        </Provider>
      </ErrorBoundary>
    </>
  )
}
