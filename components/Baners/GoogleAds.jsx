import { checkMobile } from "@/libs/api";
import { useEffect, useState } from "react";

const GoogleAds = (props) => {

    let [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        // console.log(adId, "adId")
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [])


    const checkIsMobile = async () => {
        let is_mobile = await checkMobile();
        isMobile = is_mobile
        setIsMobile(isMobile);
    }

    useEffect(() => {
        // console.log(props.adId,"props.adId")
        if (typeof window !== 'undefined') {
            try {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
            } catch (err) {
                // console.log(err,"err");
            }

            // Load ads individually
            // loadAd(props.adId);
            if (props.adId && props.position) {
                setAdHeight(props.adId, props.position);
            }
        }
    }, [props.adId, props.position])

    function setAdHeight(adElement, position) {
        // function setAdHeight(adElement, position) {
        // Determine dynamic height based on the position or other logic
        let el = document.getElementById(adElement)
        let parent = document.getElementById(adElement + 'scripts');
        // console.log(parent, "parent parent")
        // let el = document.querySelector('.scripts');

        let dynamicHeight;
        let dynamicWidth;
        if (position === 'high') {
            dynamicHeight = '90px';  // Example height for high position
            dynamicWidth = isMobile ? '100%' : '728px'
        } else {
            dynamicHeight = '250px';  // Default height
            dynamicWidth = isMobile ? '100%' : '300px'
        }

        if (parent) {
            parent.style.height = position == 'high' ? '90px !important' : '250px !important';  // Example: Set background color
            parent.style.width = (position == 'high' && isMobile) ? '100% !important' : '728px !important';  // Example: Set background color
            parent.classList.add(position == 'high' ? 'height-90' : 'height-250')
        }

        // setTimeout(() => {
        //     if (parent && parent.style && parent.style.height) {
        //     // if (parent && parent.style && parent.style.height && parent.style.height === "auto") {
        //         parent.style.height = ""; // Removes the inline height style
        //     }
        // }, 3000);

        // Set the custom property --adheight dynamically
        el?.style?.setProperty('--adheight', dynamicHeight);
        el?.style?.setProperty('--adwidth', dynamicWidth);
    }


    // function checkAdStatus(adId) {
    //     var adElement = document.getElementById(adId);
    //     var adStatus = adElement.getAttribute('data-ad-status');
    //     if (adStatus === 'unfilled') {
    //         // console.log("Ad unfilled for:", adId);
    //         setAdHeight(adElement, props.position)
    //         // adElement.style.minHeight = '90px';  // Set a minimum height to prevent collapsing
    //         // Optionally display a fallback message or alternative content
    //         // adElement.innerHTML = "<p>Ad not available</p>";
    //     }
    // }

    // function loadAd(adId) {
    //     var adElement = document.getElementById(adId);
    //     if (adElement) {
    //         setTimeout(function () {
    //             checkAdStatus(adId);
    //         }, 1000);
    //     } else {
    //         console.log("Ad element not found for:", adId);
    //     }
    // }



    // useEffect(() => {
    //     const gptInit = () => {
    //         const mapping = googletag.sizeMapping()
    //             .addSize([0, 0], [320, 50])
    //             .addSize([768, 0], [728, 90])
    //             .addSize([1024, 0], [970, 250])
    //             .build();

    //         googletag.cmd.push(function () {
    //             const slot1 = googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0')
    //                 .setTargeting("test", "refresh")
    //                 .defineSizeMapping(mapping)
    //                 .addService(googletag.pubads());

    //             googletag.pubads().enableSingleRequest();
    //             googletag.enableServices();
    //             googletag.display('div-gpt-ad-1617096742911-0');
    //         });
    //     };

    //     if (window.googletag) {
    //         gptInit();
    //     } else {
    //         window.googletag = window.googletag || { cmd: [] };
    //         window.googletag.cmd.push(gptInit);
    //     }
    // }, []);

    // useEffect(() => {
    //     // Initialize GPT ad slots after the script is loaded
    //     // const initializeAds = () => {
    //     //   if (window.googletag) {
    //     //     let googletag = window.googletag
    //     //     const mapping = googletag.sizeMapping()
    //     //       .addSize([0, 0], [320, 50])
    //     //       .addSize([768, 0], [728, 90])
    //     //       .addSize([1024, 0], [970, 250])
    //     //       .build();

    //     //     googletag.cmd.push(() => {
    //     //       googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0')
    //     //         .setTargeting("test", "refresh")
    //     //         .defineSizeMapping(mapping)
    //     //         .addService(googletag.pubads());

    //     //       googletag.pubads().enableSingleRequest();
    //     //       googletag.enableServices();
    //     //       googletag.display('div-gpt-ad-1617096742911-0');
    //     //     });
    //     //   } else {
    //     //     console.error('googletag is not defined');
    //     //   }
    //     // };

    //     // Wait for the GPT script to load and then initialize ads
    //     if(typeof window !== 'undefined'){
    //         if (window.googletag) {
    //           initializeAds();
    //         } else {
    //           window.googletag = window.googletag || { cmd: [] };
    //           window.googletag.cmd.push(initializeAds);
    //         }
    //     }
    //   }, []);

    // useEffect(() => {
    //     // Ensure googletag is available only after the script has loaded
    //     const handleAdScriptLoad = () => {
    //         console.log("GPT script loaded"); // Check if script loads
    //         window.googletag = window.googletag || { cmd: [] };

    //         window.googletag.cmd.push(function () {
    //             console.log("Ad slot being defined"); // Debug log for ad slot definition

    //             googletag.defineSlot('/21631575671/New-IndiaRetailing-Home-Top-728x90', [728, 90], 'div-gpt-ad-1726054796921-0')
    //                 .addService(googletag.pubads());
    //             googletag.pubads().enableSingleRequest();
    //             googletag.enableServices();

    //             // Display the ad slot after services are enabled
    //             googletag.display('div-gpt-ad-1726054796921-0');
    //         });
    //     };

    //     const scriptTag = document.querySelector('script[src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"]');
    //     if (scriptTag && scriptTag.readyState === 'complete') {
    //         handleAdScriptLoad();
    //     } else {
    //         scriptTag?.addEventListener('load', handleAdScriptLoad);
    //     }
    // }, []);


    // Rerender
    // useEffect(() => {
    //     // Check if the Google Ads script is already loaded
    //     if (!window.googletag) {
    //         const script = document.createElement('script');
    //         script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    //         script.async = true;
    //         document.body.appendChild(script);

    //         script.onload = () => {
    //             window.googletag = window.googletag || { cmd: [] };
    //             console.log(window.googletag,"window.googletag")
    //             window.googletag.cmd.push(() => {
    //                 // Define ad slot
    //                 window.googletag.defineSlot(props.adId, [300, 250], props.adId).addService(window.googletag.pubads());
    //                 window.googletag.enableServices();
    //                 window.googletag.display(props.adId);
    //             });
    //         };
    //     } else {
    //         // If googletag is already loaded, display the ad immediately
    //         window.googletag.cmd.push(() => {
    //             window.googletag.defineSlot(props.adId, [300, 250], props.adId).addService(window.googletag.pubads());
    //             window.googletag.enableServices();
    //             window.googletag.display(props.adId);
    //         });
    //     }

    //     return () => {
    //         // Cleanup script if needed
    //         const script = document.querySelector(`script[src="https://www.googletagservices.com/tag/js/gpt.js"]`);
    //         if (script) {
    //             script.remove();
    //         }
    //     };
    // }, [props.adId]);

    useEffect(() => {
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
        }
    }, [])

    const onPageLoad = () => {
        const elements = document.querySelectorAll('.scripts');
        // const elements = document.querySelectorAll('[class$="scripts"]');
        // console.log(elements,"elements")
        elements.forEach((element) => {
            // element.style.height = "";
            element.style.height = "unset";
        });
    }

    return (
        <>
            {/* <Script
                id="gpt-script"
                src="https://www.googletagservices.com/tag/js/gpt.js"
                strategy="beforeInteractive"
            /> */}

            {/* <script
                async
                src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
            ></script> */}
            {/* <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async ></script> */}

            {(props.script && !props.page) && <div id={props.adId + "scripts"} className={`${props.style} scripts`} dangerouslySetInnerHTML={{ __html: props.script }} />}



            {/* && props.data-ad-slot */}
            {(!props.script && !props.page) && <div className="ad">
                <ins
                    data-ad-slot={props.adSlot}
                    // data-ad-format={"responsive"}
                    data-full-width-responsive={true}
                    data-ad-client={props.adClient}
                    {...props}
                />
            </div>}

            {props.page && <div>

                {props.position == 'high' ? <div id={props.adId + "scripts"} className={`${props.style} scripts`} dangerouslySetInnerHTML={{
                    __html:
                        `
                    <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async ></script>
                    <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
                    <ins
                        data-ad-slot="/21631575671/New-IndiaRetailing-Home-Top-728x90"
                        data-ad-client="ca-pub-9354161551837950"
                        style="${props.style}"
                        class="adsbygoogle"
                    />
                    <script>
                        function loadAd(adId) {
                            var adElement = document.getElementById(adId);
                            if (adElement) {
                                (adsbygoogle = window.adsbygoogle || []).push({});
                                // setTimeout(function() {
                                //     checkAdStatus(adId);
                                // }, 1000);
                            }else {
                                console.log("Ad element not found for:", adId);
                            }
                        }

                        // Load ads individually
                        loadAd(${props.adId});

                    
                    </script>
                    
                    `
                }} />
                    :
                    <div id={props.adId + "scripts"} className={`${props.style} scripts`} dangerouslySetInnerHTML={{
                        __html:
                            `
                    <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async ></script>
                    <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
                    <ins
                        data-ad-slot="/21631575671/New-IndiaRetailing-Home-300x250"
                        data-ad-client="ca-pub-9354161551837950"
                        style="${props.style}"
                        class="adsbygoogle"
                    />
                    <script>
                        function loadAd(adId) {
                            var adElement = document.getElementById(adId);
                            if (adElement) {
                                (adsbygoogle = window.adsbygoogle || []).push({});
                                // setTimeout(function() {
                                //     checkAdStatus(adId);
                                // }, 1000);
                            }else {
                                console.log("Ad element not found for:", adId);
                            }
                        }

                        // Load ads individually
                        loadAd(${props.adId});

                    
                    </script>
                    
                    `
                    }} />}


                {/* Ad container */}
                {/* <div id="div-gpt-ad-1726054796921-0" style={{ minWidth: '728px', minHeight: '90px' }}></div>
                <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
                <ins
                    data-ad-slot={"/21631575671/New-IndiaRetailing-Home-Top-728x90"}
                    data-ad-client={"ca-pub-9354161551837950"}
                    style={props.style}
                /> */}

            </div>}


        </>
    )
}

export default GoogleAds;