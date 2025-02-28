// 'use client'
import '@/styles/globals.scss'
import store from '../redux/store'
import { Faustina } from 'next/font/google'
import { Provider } from 'react-redux'
import { useEffect, useState } from 'react'
// import Head from 'next/head'
import { websiteSettings } from '@/libs/api'
import dynamic from 'next/dynamic'
const ErrorBoundary = dynamic(() => import('@/components/Exception/ErrorBoundary'))
const BottomTabs = dynamic(() => import('@/components/common/BottomTabs'))
import MobileHead from '@/components/Headers/MobileHead'
import nProgress from "nprogress";
import { ChakraProvider } from '@chakra-ui/react'
import { useRouter } from "next/router";
import "nprogress/nprogress.css"

import { GoogleOAuthProvider } from '@react-oauth/google';
const ScrollToTopButton = dynamic(() => import('@/components/common/ScrollToTopButton'))

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
const inter = Faustina({
  weight: ["300", "400", "500", "600", '700'],
  display: "block",
  preload: true,
  style: 'normal',
  subsets: ["latin"],
  variable: '--font-faustina'
})



export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [activeTab, setActiveTab] = useState(0)

  const router = useRouter()

  useEffect(() => {
    // let tabs = document.getElementById('tabs')
    get_website_settings()

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
      // if (typeof window !== 'undefined')
      //   window.scrollTo({
      //     top: 0,
      //     behavior: 'smooth' // Smooth scroll
      //   });
    };

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

  const appendScript = (src) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'text/javascript';
    script.async = true;  // Optional: makes sure the script is loaded asynchronously
    document.head.appendChild(script);
  };

  useEffect(() => {
    setTimeout(() => {
      appendScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');
    }, 2000);
    // Call the function to append the script after the page has loaded
  }, []);
  // useEffect(()=>{
  //   if(typeof window != "undefined"){

  //     screen.orientation.addEventListener("change", () => {


  //       if(screen.orientation.type == "landscape-primary"){
  //         document.documentElement.requestFullscreen().then(()=>screen.orientation.lock("portrait-primary"))
  //       }
  //       // alert(`${screen.orientation} screen.orientation`)
  //       // console.log(`The orientation of the screen is: ${screen.orientation}`);

  //       // lockOrientation()
  //     });
  //   }

  // },[])

  useEffect(() => {
    const lockOrientation = async () => {
      if (screen.orientation && screen.orientation.lock) {
        // debugger
        try {
          // alert(screen.orientation.type)
          await screen.orientation.lock("portrait-primary");
          console.log("Screen locked to portrait-primary");
        } catch (error) {
          // alert(screen.orientation.type,error)
          console.error("Failed to lock screen orientation:", error);
        }
      } else {
        console.warn("Screen orientation locking is not supported in this browser.");
      }
    };

    lockOrientation(); // Lock on component mount

    const handleOrientationChange = () => {
      // alert(screen.orientation.type)
      if (screen.orientation.type.startsWith("landscape")) {
        lockOrientation(); // Re-lock if user rotates
      }
    };

    window.addEventListener("orientationchange", handleOrientationChange);

    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []);


  useEffect(() => {
    const handleRouteChangeStart = () => {
      // Save scroll position for the current route
      const currentRoute = router.asPath;
      sessionStorage.setItem(`${currentRoute}_scrollPosition`, window.scrollY);
    };

    // Add event listener to detect route changes
    router.events.on("routeChangeStart", handleRouteChangeStart);

    const handleRouteChangeComplete = (e) => {
      // Get the saved scroll position for the current route
      const savedPosition = sessionStorage.getItem(`${e}_scrollPosition`);

      if (savedPosition !== null) {
        // Restore the scroll position if it exists
        // window.scrollTo(0, parseInt(savedPosition, 10));

        // Get the viewport height
        const viewportHeight = window.innerHeight;

        // Calculate the position to scroll to (centering the saved position)
        const centeredPosition = parseInt(savedPosition, 10) - viewportHeight / 2;

        // Use window.scrollTo to scroll to the calculated position
        window.scrollTo({
          top: centeredPosition,
          behavior: 'smooth', // Smooth scroll
        });
      }
    };

    // Add event listener to restore the scroll position after a route change
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup on component unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router]);


  return (
    <>

      {/* <Head>
        <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
      </Head> */}
      <GPTScript />
      <ErrorBoundary >
        <Provider store={store} >
          <ChakraProvider>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
              <main className={` ${inter.className} md:max-h-[100vh] md:overflow-auto`} id='scroll_div' >
                {router.pathname != "/p/[...route]" && <div className='lg:hidden'><MobileHead getActiveTab={getActiveTab} activeTab={activeTab} /></div>}
                <ToastContainer position={'bottom-right'} autoClose={2000} />
                <Component {...pageProps} />
                <ScrollToTopButton />
                {router.pathname != "/p/[...route]" && <div className='lg:hidden'>
                  <BottomTabs getActiveTab={getActiveTab} activeTab={activeTab} />
                </div>}
              </main>
            </GoogleOAuthProvider>
          </ChakraProvider>
        </Provider>
      </ErrorBoundary>
    </>
  )
}
const GPTScript = () => {
  useEffect(() => {

    setTimeout(() => {
      const script = document.createElement("script");
      script.src = "https://securepubads.g.doubleclick.net/tag/js/gpt.js";
      script.async = true;
      document.head.appendChild(script);
    }, 2000);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
};