import { useEffect, useState } from 'react';

const Adsense = ({ adSlot, adFormat = 'auto', adClient, adStyle }) => {
    // useEffect(() => {
    //     try {
    //         if (typeof window !== "undefined") {
    //             (window.adsbygoogle = window.adsbygoogle || []).push({});
    //             console.log(window.adsbygoogle,"window.adsbygoogle")
    //         }
    //     } catch (e) {
    //         console.error("Adsbygoogle error", e);
    //     }
    // }, []);

    const [adsLoaded, setAdsLoaded] = useState(false);

    useEffect(() => {
      // Check if we are in a browser environment and not during SSR
      if (typeof window !== 'undefined') {
        // Use window.onload or setTimeout to defer ad loading
        window.onload = () => {
          try {
            // Initialize Google Ads when the window is fully loaded
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            setAdsLoaded(true);
          } catch (e) {
            console.error('Adsbygoogle error', e);
          }
        };
  
        // You could also use setTimeout to delay the ad loading if needed
        // setTimeout(() => {
        //   try {
        //     (window.adsbygoogle = window.adsbygoogle || []).push({});
        //     setAdsLoaded(true);
        //   } catch (e) {
        //     console.error('Adsbygoogle error', e);
        //   }
        // }, 2000); // Load ads after 2 seconds
      }
    }, [adSlot]);

    //         data-ad-format={adFormat}
    return (
        <>
            <script async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
                crossorigin="anonymous"></script>
           {adsLoaded && <ins
                className="adsbygoogle"
                style={adStyle}
                //   style={{ display: 'block' }}
                data-ad-client={adClient}
                data-ad-slot={adSlot}
            ></ins>}
            {/* <script>
                (window.adsbygoogle = window.adsbygoogle || []).push({ });
            </script> */}
        </>
    );
};

export default Adsense;
