// import { checkMobile } from "@/libs/api";
// import { useEffect, useState,memo } from "react";

// const GoogleAds = (props) => {

//     let [isMobile, setIsMobile] = useState(false)
//     useEffect(() => {
//         // console.log(adId, "adId")
//         checkIsMobile();
//         window.addEventListener('resize', checkIsMobile)
//         return () => {
//             window.removeEventListener('resize', checkIsMobile);
//         };
//     }, [])


//     const checkIsMobile = async () => {
//         let is_mobile = await checkMobile();
//         isMobile = is_mobile
//         setIsMobile(isMobile);
//     }

//     useEffect(() => {
//         // console.log(props.adId,"props.adId")
//         if (typeof window !== 'undefined') {
//             try {
//                 (window.adsbygoogle = window.adsbygoogle || []).push({});
//             } catch (err) {
//                 // console.log(err,"err");
//             }

//             // Load ads individually
//             // loadAd(props.adId);
//             if (props.adId && props.position) {
//                 setAdHeight(props.adId, props.position);
//             }
//         }
//     }, [props.adId, props.position])

//     function setAdHeight(adElement, position) {
//         // function setAdHeight(adElement, position) {
//         // Determine dynamic height based on the position or other logic
//         let el = document.getElementById(adElement)
//         let parent = document.getElementById(adElement + 'scripts');
//         // console.log(parent, "parent parent")
//         // let el = document.querySelector('.scripts');

//         let dynamicHeight;
//         let dynamicWidth;
//         if (position === 'high') {
//             dynamicHeight = '90px';  // Example height for high position
//             dynamicWidth = isMobile ? '100%' : '728px'
//         } else {
//             dynamicHeight = '250px';  // Default height
//             dynamicWidth = isMobile ? '100%' : '300px'
//         }

//         if (parent) {
//             parent.style.height = position == 'high' ? '90px !important' : '250px !important';  // Example: Set background color
//             parent.style.width = (position == 'high' && isMobile) ? '100% !important' : '728px !important';  // Example: Set background color
//             parent.classList.add(position == 'high' ? 'height-90' : 'height-250')
//         }

//         // setTimeout(() => {
//         //     if (parent && parent.style && parent.style.height) {
//         //     // if (parent && parent.style && parent.style.height && parent.style.height === "auto") {
//         //         parent.style.height = ""; // Removes the inline height style
//         //     }
//         // }, 3000);

//         // Set the custom property --adheight dynamically
//         el?.style?.setProperty('--adheight', dynamicHeight);
//         el?.style?.setProperty('--adwidth', dynamicWidth);
//     }



//     useEffect(() => {
//         if (document.readyState === 'complete') {
//             onPageLoad();
//         } else {
//             window.addEventListener('load', onPageLoad);
//             // Remove the event listener when component unmounts
//             return () => window.removeEventListener('load', onPageLoad);
//         }
//     }, [])

//     const onPageLoad = () => {
//         const elements = document.querySelectorAll('.scripts');
//         // const elements = document.querySelectorAll('[class$="scripts"]');
//         // console.log(elements,"elements")
//         elements.forEach((element) => {
//             // element.style.height = "";
//             element.style.height = "unset";
//         });
//     }

//     return (
//         <>
//             {/* <Script
//                 id="gpt-script"
//                 src="https://www.googletagservices.com/tag/js/gpt.js"
//                 strategy="beforeInteractive"
//             /> */}

//             {/* <script
//                 async
//                 src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js`}
//             ></script> */}
//             {/* <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async ></script> */}

//             {(props.script && !props.page) && <div id={props.adId + "scripts"} className={`${props.style} scripts`} dangerouslySetInnerHTML={{ __html: props.script }} />}



//             {/* && props.data-ad-slot */}
//             {(!props.script && !props.page) && <div className="ad">
//                 <ins
//                     data-ad-slot={props.adSlot}
//                     // data-ad-format={"responsive"}
//                     data-full-width-responsive={true}
//                     data-ad-client={props.adClient}
//                     {...props}
//                 />
//             </div>}

//             {props.page && <div>

//                 {props.position == 'high' ? <div id={props.adId + "scripts"} className={`${props.style} scripts`} dangerouslySetInnerHTML={{
//                     __html:
//                         `
//                     <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async ></script>
//                     <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
//                     <ins
//                         data-ad-slot="/21631575671/New-IndiaRetailing-Home-Top-728x90"
//                         data-ad-client="ca-pub-9354161551837950"
//                         style="${props.style}"
//                         class="adsbygoogle"
//                     />
//                     <script>
//                         function loadAd(adId) {
//                             var adElement = document.getElementById(adId);
//                             if (adElement) {
//                                 (adsbygoogle = window.adsbygoogle || []).push({});
//                                 // setTimeout(function() {
//                                 //     checkAdStatus(adId);
//                                 // }, 1000);
//                             }else {
//                                 console.log("Ad element not found for:", adId);
//                             }
//                         }

//                         // Load ads individually
//                         loadAd(${props.adId});

                    
//                     </script>
                    
//                     `
//                 }} />
//                     :
//                     <div id={props.adId + "scripts"} className={`${props.style} scripts`} dangerouslySetInnerHTML={{
//                         __html:
//                             `
//                     <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async ></script>
//                     <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
//                     <ins
//                         data-ad-slot="/21631575671/New-IndiaRetailing-Home-300x250"
//                         data-ad-client="ca-pub-9354161551837950"
//                         style="${props.style}"
//                         class="adsbygoogle"
//                     />
//                     <script>
//                         function loadAd(adId) {
//                             var adElement = document.getElementById(adId);
//                             if (adElement) {
//                                 (adsbygoogle = window.adsbygoogle || []).push({});
//                                 // setTimeout(function() {
//                                 //     checkAdStatus(adId);
//                                 // }, 1000);
//                             }else {
//                                 console.log("Ad element not found for:", adId);
//                             }
//                         }

//                         // Load ads individually
//                         loadAd(${props.adId});

                    
//                     </script>
                    
//                     `
//                     }} />}

//             </div>}


//         </>
//     )
// }

// export default memo(GoogleAds);



// New
import { memo, useEffect, useState } from 'react';
const GoogleAds = (props) => {
    // const [isMobile, setIsMobile] = useState(false);
    const [isAdLoaded, setIsAdLoaded] = useState(false);
    // useEffect(() => {
    //     checkIsMobile();
    //     window.addEventListener('resize', checkIsMobile);
    //     return () => {
    //         window.removeEventListener('resize', checkIsMobile);
    //     };
    // }, []);

    // const checkIsMobile = async () => {
    //     let is_mobile = await checkMobile();
    //     setIsMobile(is_mobile);
    // };

    // useEffect(() => {
    //     if (typeof window !== 'undefined' && props.adId && props.position) {
    //         try {
    //             // Initialize adsbygoogle
    //             (window.adsbygoogle = window.adsbygoogle || []).push({});
                
    //             // Render GPT slot if ad position and id are set
    //             if (props.adId && props.position) {
    //                 setAdHeight(props.adId, props.position);
    //             }
    //         } catch (err) {
    //             console.log(err, "error initializing ads");
    //         }
    //     }
    // }, [props.adId, props.position]);

    // const setAdHeight = (adElement, position) => {
    //     let el = document.getElementById(adElement);
    //     let dynamicHeight;
    //     let dynamicWidth;
        
    //     if (position === 'high') {
    //         dynamicHeight = '90px';
    //         dynamicWidth = isMobile ? '100%' : '728px';
    //     } else {
    //         dynamicHeight = '250px';
    //         dynamicWidth = isMobile ? '100%' : '300px';
    //     }

    //     el?.style?.setProperty('--adheight', dynamicHeight);
    //     el?.style?.setProperty('--adwidth', dynamicWidth);
    // };

    useEffect(() => {
        // Ensure googletag is loaded and ready
        if (window.googletag && window.googletag.cmd) {
            window.googletag.cmd.push(function() {
                const adSlotElement = document.getElementById(`${props.adSlotEle}`);
                // const adSlotElement = document.getElementById(`div-gpt-ad-${props.adId}-${props.position}`);
                // console.log(adSlotElement,"adSlotElement")
                if (adSlotElement) {
                    googletag.defineSlot(props.slotId, props.adSizes, adSlotElement)
                        .addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();

                    // Listen for the ad rendering event
                    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                        if (event.slot === adSlotElement && event.isEmpty) {
                            setIsAdLoaded(false);  // Set to false if the ad did not load
                        } else {
                            setIsAdLoaded(true);  // Set to true if the ad loaded successfully
                        }
                    });
                }
            });
        }
        // console.log(window,"window")
        // console.log(window.googletag,"window googletag")
    }, [props.adId, props.position, props.slotId, props.adSizes]);

     // Conditionally remove or hide the ad based on its loading state
     const adStyle = isAdLoaded ? {} : { height: '0', width: '0', display: 'none' };

    return (
        <div
            id={`div-gpt-ad-${props.adId}-${props.position}`}
            className={`${props.style} scripts`}
            dangerouslySetInnerHTML={{ __html: props.script }}
            style={adStyle}
        />
    );
};

export default memo(GoogleAds);











