import ImageLoader from '../ImageLoader'
import { memo, useEffect, useState } from 'react';
import { checkMobile, get_ip, insert_banner_ad_log } from '@/libs/api'
import dynamic from 'next/dynamic';
// import GoogleAds from './GoogleAds';
const GoogleAds = dynamic(() => import('./GoogleAds'))
function Advertisement({ data, imgClass, divClass, insStyle, position, adId, ad_payload = {}, adPos, resetKey }) {
    // console.log(data, imgClass, divClass, insStyle, position, adId, ad_payload , adPos)
    let [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        // console.log(adId, "adId")
        // console.log(position,"position")
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [insStyle, adId, position])


    const checkIsMobile = async () => {
        let is_mobile = await checkMobile();
        isMobile = is_mobile
        setIsMobile(isMobile);
    }

    const click_report = async () => {

        let ip_address = await get_ip()

        let params = {
            page_url: window.location.href,
            browser: await detectBrowser(),
            ip_address: ip_address,
            banner_id: data.title,
            position: data.section ? data.section : data.position,
            ...ad_payload
        }

        const resp = await insert_banner_ad_log(params)
        // if(resp.message && resp.message.status && resp.message.status == "Success"){
        //     // console.log(resp,"resp")
        // }

        // console.log(params,"params")

        window.open(data.ad_link, '_blank')
    }


    function detectBrowser() {
        var userAgent = navigator.userAgent;
        if (userAgent.indexOf("Edg") > -1) {
            return "Microsoft Edge";
        } else if (userAgent.indexOf("Chrome") > -1) {
            return "Chrome";
        } else if (userAgent.indexOf("Firefox") > -1) {
            return "Firefox";
        } else if (userAgent.indexOf("Safari") > -1) {
            return "Safari";
        } else if (userAgent.indexOf("Opera") > -1) {
            return "Opera";
        } else if (userAgent.indexOf("Trident") > -1 || userAgent.indexOf("MSIE") > -1) {
            return "Internet Explorer";
        }

        return "Unknown";
    }

    // (window.adsbygoogle = window.adsbygoogle || []).push({});

    const scripts = {
        "300": `
                <script>
                window.googletag = window.googletag || {cmd: []};
                googletag.cmd.push(function() {
                    googletag.defineSlot('/21631575671/Indiaretailing_mid_center_300x250', [300, 250], 'div-gpt-ad-1711950996868-0').addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                });
                </script>

                <!-- /21631575671/Indiaretailing_mid_center_300x250 -->
                <div id='div-gpt-ad-1711950996868-0' style='min-width: 300px; min-height: 250px;'>
                <script>
                    googletag.cmd.push(function() { googletag.display('div-gpt-ad-1711950996868-0'); });
                </script>
                </div>`,

        "middle": `
                    <script>
                    window.googletag = window.googletag || {cmd: []};
                    googletag.cmd.push(function() {
                        googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0').addService(googletag.pubads());
                        googletag.pubads().enableSingleRequest();
                        googletag.enableServices();
                    });
                    </script>
                    <!-- /21631575671/IR-728x90-Leaderboard -->
                    <script>
                        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1617096742911-0'); });
                        setInterval(function(){googletag.pubads().refresh([slot1]);}, 5000); 
                    </script>`,
        "header": `
                    <script>
                    (window.requestIdleCallback || window.setTimeout)(function() {
                        window.googletag = window.googletag || {cmd: []};
                        googletag.cmd.push(function() {
                            googletag.defineSlot('/21631575671/IR-NEW-TOP-728x90-Leaderboard', [[320, 50], [728, 90]], 'div-gpt-ad-1738918272133-0').addService(googletag.pubads());
                            googletag.pubads().enableSingleRequest();
                            googletag.enableServices();
                        });
                    }, 300);
                    </script>
                    <!-- /21631575671/IR-NEW-TOP-728x90-Leaderboard -->
                    <div id='div-gpt-ad-1738918272133-0' style='min-width: 320px; min-height: 50px;'>
                    <script>
                        (window.requestIdleCallback || window.setTimeout)(function() {
                            googletag.cmd.push(function() { googletag.display('div-gpt-ad-1738918272133-0'); });
                        }, 350);
                    </script>
                    </div>`,
        "footer": `
                    <script>
                    window.googletag = window.googletag || {cmd: []};
                    // GPT slots
                    var gptAdSlots = []; // Created the Array To Get BrowserSize,Ad Size
                    googletag.cmd.push(function()
                    {
                    var mapping = googletag.sizeMapping().
                    //addSize is the browser size and each subsequent dimension is an ad size addSize([Browser Width,Browser Height],[Ad Width,Ad Height]).

                    addSize([1050, 200], [728, 90]). // Viewport size for desktop
                    // Screens of any size smaller than infinite but bigger than 1024 x 768
                    addSize([1024, 768], [728, 90]).
                    // Screens of any size smaller than 1024x 768 but bigger than 980 x 690
                    addSize([980, 690], [[728, 90],[728,90]]).
                    // Screens of any size smaller than 980 x 690 but bigger than 320 x 480
                    addSize([320, 480], [320, 50]).
                    // Fits browsers of any size smaller than 320 x 480
                    addSize([0, 0], [88, 31]).
                    build();
                    
                    slot2=googletag.defineSlot('/21631575671/IR-home-middle_3-728x90', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1707461460584-0').setTargeting("test", "refresh").
                    defineSizeMapping(mapping). 
                    addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                    });
                    </script>  

                    <!-- /21631575671/IR-home-middle_3-728x90 -->
                    <div id='div-gpt-ad-1707461460584-0'>
                    <script>
                        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1707461460584-0'); });
                    setInterval(function(){googletag.pubads().refresh([slot2]);}, 3000); 
                    </script>
                    </div>`
    }

    const slotIds = {
        "300": "/21631575671/Indiaretailing_mid_center_300x250",
        "300_size": [300, 250],
        "300_id": "div-gpt-ad-1711950996868-0",

        "middle": "/21631575671/IR-728x90-Leaderboard",
        "middle_size": [[970, 250], [728, 90], [320, 50]],
        "middle_id": "div-gpt-ad-1617096742911-0",

        "header": "/21631575671/IR-NEW-TOP-728x90-Leaderboard",
        "header_size": [[320, 50], [728, 90]],
        "header_id":"div-gpt-ad-1738918272133-0",

        "footer": "/21631575671/IR-home-middle_3-728x90",
        "footer_size": [[970, 250], [728, 90], [320, 50]],
        "footer_id": "div-gpt-ad-1707461460584-0"
    }

    const scriptFor = (key) => scripts[key]

    // Defensive check for required ad data fields
    const hasAdData = data && typeof data === 'object' && Object.keys(data).length !== 0 && (data.web_image || data.mobile_image);

    return (
        <>
            {hasAdData &&
                <div onClick={() => click_report()} className={`${divClass ? divClass : ''} cursor-pointer md:h-full ${data.position == 'Header' || data.position == 'Footer' ? 'h-[90px] w-[728px]' : ''}`}>
                    
                    <ImageLoader isQuick={adPos == 'header'} style={`${imgClass ? imgClass : ''} md:object-contain h-full w-full ${adPos == 'header' || adPos == 'footer' ? '!h-[90px] ' : ''}`} src={isMobile ? data.mobile_image : data.web_image} title={data.title ? data.title : 's'} />
                </div>
            }

            {adPos && <>
                <GoogleAds isMobile={isMobile} slotId={slotIds[adPos]} adSizes={slotIds[adPos+"_size"]} adId={adId} position={position} style={divClass} script={scriptFor(adPos)} resetKey={resetKey} />
            </>
            }
        </>
    )
}


export default memo(Advertisement)