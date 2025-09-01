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

//                     
//                     </script>
//                     
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

//                     
//                     </script>
//                     
//                     `
//                     }} />}

//             </div>}


//         </>
//     )
// }

// export default memo(GoogleAds);



// New
import { memo, useEffect, useState, useRef } from 'react';
const GoogleAds = (props) => {
    const { lazy = false, delayMs = 300, resetKey } = props;

    const [isAdLoaded, setIsAdLoaded] = useState(false);
    const [retryCount, setRetryCount] = useState(0);
    const [sectionLoaded, setSectionLoaded] = useState(false);
    const maxRetries = 5;
    const retryTimeoutRef = useRef(null);
    const observerRef = useRef(null);
    const ioRef = useRef(null);
    const isVisibleRef = useRef(!lazy); // if not lazy, assume visible
    const initializedRef = useRef(false);

    // Safe identifiers to avoid 'undefined' ids
    const safeAdId = props.adId || 'divsad';
    const safePosition = props.position || 'pos';

    // Generate an instance id only for lazy mode to avoid collisions on long pages
    const instanceIdRef = useRef(null);
    if (lazy && !instanceIdRef.current) {
        const base = `${safeAdId}-${safePosition}`;
        const globalCounter = (typeof window !== 'undefined') ? (window.__gptAdInstanceCounter = (window.__gptAdInstanceCounter || 0) + 1) : Math.floor(Math.random() * 1e6);
        instanceIdRef.current = `${base}-${globalCounter}`;
    }

    // Wrapper id: in lazy mode use unique instance id; otherwise use stable adId-position so home stays unchanged
    const wrapperId = lazy ? `div-gpt-ad-${instanceIdRef.current}` : `div-gpt-ad-${safeAdId}-${safePosition}`;

    const getTargetId = () => wrapperId;

    const getExistingSlotByElementId = (elementId) => {
        try {
            if (!window.googletag || !window.googletag.pubads) return null;
            const slots = window.googletag.pubads().getSlots();
            for (let i = 0; i < slots.length; i++) {
                const s = slots[i];
                if (typeof s.getSlotElementId === 'function' && s.getSlotElementId() === elementId) {
                    return s;
                }
            }
        } catch (_) { }
        return null;
    }

    const destroySlotByElementId = (elementId) => {
        try {
            const slot = getExistingSlotByElementId(elementId);
            if (slot && window.googletag && window.googletag.destroySlots) {
                window.googletag.destroySlots([slot]);
            }
        } catch (_) { }
    }

    const initializeAd = () => {
        if (initializedRef.current) return;
        if (!isVisibleRef.current) return; // only init when visible (or non-lazy)

        if (typeof window !== 'undefined') {
            window.googletag = window.googletag || { cmd: [] };
            const adSlotId = getTargetId();
            const elementExists = document.getElementById(adSlotId);
            if (!elementExists && retryCount < maxRetries) {
                retryTimeoutRef.current = setTimeout(() => {
                    setRetryCount(prev => prev + 1);
                }, 300);
                return;
            }
            if (!elementExists) {
                return;
            }

            window.googletag.cmd.push(function() {
                if (adSlotId && props.slotId && props.adSizes) {
                    try {
                        // Avoid duplicate defineSlot on same element id
                        const existing = getExistingSlotByElementId(adSlotId);
                        if (existing) {
                            window.googletag.display(adSlotId);
                            initializedRef.current = true;
                            return;
                        }

                        const slot = googletag.defineSlot(props.slotId, props.adSizes, adSlotId);
                        if (slot) {
                            slot.addService(googletag.pubads());
                            googletag.pubads().enableSingleRequest();
                            googletag.enableServices();

                            googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                                if (event && event.slot && typeof event.slot.getSlotElementId === 'function') {
                                    const renderedId = event.slot.getSlotElementId();
                                    if (renderedId === adSlotId) {
                                        setIsAdLoaded(!event.isEmpty);
                                    }
                                }
                            });

                            googletag.display(adSlotId);
                            initializedRef.current = true;
                        }
                    } catch (error) {
                        // swallow errors
                    }
                }
            });
        }
    };

    const waitForSectionLoad = () => {
        const sectionLoadDelay = delayMs; 
        setTimeout(() => {
            setSectionLoaded(true);
            initializeAd();
        }, sectionLoadDelay);
    };

    // Reset on route or key change
    useEffect(() => {
        if (resetKey === undefined) return;
        const adSlotId = getTargetId();
        destroySlotByElementId(adSlotId);
        const el = document.getElementById(adSlotId);
        if (el) el.innerHTML = '';
        initializedRef.current = false;
        setIsAdLoaded(false);
        setRetryCount(0);
        if (!lazy) {
            isVisibleRef.current = true;
            initializeAd();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resetKey]);

    // Observe visibility only in lazy mode
    useEffect(() => {
        if (!lazy) return;
        const el = document.getElementById(getTargetId());
        if ('IntersectionObserver' in window) {
            ioRef.current = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        isVisibleRef.current = true;
                        initializeAd();
                    }
                });
            }, { root: null, rootMargin: '200px 0px', threshold: 0 });
            if (el) ioRef.current.observe(el);
        } else {
            isVisibleRef.current = true;
            initializeAd();
        }
        return () => {
            if (ioRef.current && el) ioRef.current.unobserve(el);
            if (ioRef.current) ioRef.current.disconnect();
        };
    }, [lazy]);

    useEffect(() => {
        // If an inline script is provided, use it, but still delay in lazy mode
        if (props.script) {
            if (lazy) {
                waitForSectionLoad();
            } else {
                setSectionLoaded(true);
                isVisibleRef.current = true;
                initializeAd();
            }
            return;
        }
        if (lazy) {
            waitForSectionLoad();
        } else {
            setSectionLoaded(true);
            isVisibleRef.current = true;
            initializeAd();
        }

        if (typeof window !== 'undefined' && window.MutationObserver) {
            const adSlotId = getTargetId();
            observerRef.current = new MutationObserver(() => {
                if (!document.getElementById(adSlotId)) {
                    initializedRef.current = false;
                    setRetryCount(0);
                    initializeAd();
                }
            });
            observerRef.current.observe(document.body, { childList: true, subtree: true });
        }

        return () => {
            if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [props.script, safeAdId, safePosition, props.slotId, props.adSizes, lazy, delayMs]);

    const adStyle = props.script ? {} : (isAdLoaded ? {} : { height: '0', width: '0', display: 'none' });

    // For inline scripts, replace placeholders. Use instance id in lazy mode; otherwise use adId-position
    const idToken = lazy ? (instanceIdRef.current || `${safeAdId}-${safePosition}`) : `${safeAdId}-${safePosition}`;
    const processedScript = props.script ? props.script
        .replace(/\{\{AD_ID\}\}/g, idToken)
        .replace(/\{\{POSITION\}\}/g, '') : '';
        // console.log(processedScript,"processedScript")
        

    return (
        <div
            id={wrapperId}
            className={`${props.style} scripts`}
            dangerouslySetInnerHTML={{ __html: processedScript }}
            style={adStyle}
        />
    );
};

export default memo(GoogleAds);











