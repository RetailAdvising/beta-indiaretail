import ImageLoader from '../ImageLoader'
import { useEffect, useState } from 'react';
import { checkMobile, get_ip, insert_banner_ad_log } from '@/libs/api'
import dynamic from 'next/dynamic';
// import GoogleAds from './GoogleAds';
const GoogleAds = dynamic(() => import('./GoogleAds'))
export default function Advertisement({ data, imgClass, divClass, insStyle, position, adId, ad_payload = {}, adPos }) {

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


    const scripts = {
        "300": `<script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
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
        "middle": `<!--Images Retail Awards-->
                    <script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>
                    <script>
                    var googletag = googletag || {};
                    googletag.cmd = googletag.cmd || [];
                    </script>
                    <script>
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
                    
                    slot1=googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0').setTargeting("test", "refresh").
                    defineSizeMapping(mapping). 
                    addService(googletag.pubads());
                    googletag.pubads().enableSingleRequest();
                    googletag.enableServices();
                    });
                    </script>  


                    <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>        
                    <script>        
                    window.googletag = window.googletag || {cmd: []};        
                    googletag.cmd.push(function() {        
                    googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[970, 250], [728, 90], [320, 50]], 'div-gpt-ad-1617096742911-0').addService(googletag.pubads()); 
                    googletag.pubads().enableSingleRequest(); 
                    googletag.enableServices();        
                    });        
                    </script>

                    <!-- /21631575671/IR-728x90-Leaderboard -->
                    <div id='div-gpt-ad-1617096742911-0'>
                    <script>
                        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1617096742911-0'); });
                    setInterval(function(){googletag.pubads().refresh([slot1]);}, 5000); 
                    </script>
                    </div>`,
        "header": `// Top Header Add Home Page
                    <script async src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
                    <script>
                    window.googletag = window.googletag || {cmd: []};
                    googletag.cmd.push(function() {
                        googletag.defineSlot('/21631575671/IR-NEW-TOP-728x90-Leaderboard', [[320, 50], [728, 90]], 'div-gpt-ad-1738918272133-0').addService(googletag.pubads());
                        googletag.pubads().enableSingleRequest();
                        googletag.enableServices();
                    });
                    </script>
                    <!-- /21631575671/IR-NEW-TOP-728x90-Leaderboard -->
                    <div id='div-gpt-ad-1738918272133-0' style='min-width: 320px; min-height: 50px;'>
                    <script>
                        googletag.cmd.push(function() { googletag.display('div-gpt-ad-1738918272133-0'); });
                    </script>
                    </div>`,
        "footer": `
                    <script>
                    var googletag = googletag || {};
                    googletag.cmd = googletag.cmd || [];
                    </script>
                    <script>
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


                    <script>        
                    window.googletag = window.googletag || {cmd: []};        
                    googletag.cmd.push(function() {        
                    googletag.defineSlot('/21631575671/IR-home-middle_3-728x90', [[970, 250], [728, 90], [320, 50]], 'div-gpt-ad-1707461460584-0').addService(googletag.pubads()); 
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


    return (
        <>
            {
                data && Object.keys(data).length != 0 &&
                <div onClick={() => click_report()} className={`${divClass ? divClass : ''} cursor-pointer md:h-full ${data.position == 'Header' || data.position == 'Footer' ? 'h-[90px] w-[728px]' : ''}`}>
                    <ImageLoader style={`${imgClass ? imgClass : ''} md:object-contain h-full w-full`} src={isMobile ? data.mobile_image : data.web_image} title={data.title ? data.title : 's'} />
                </div>
            }

            {/* data-ad-format="auto"
                        data-full-width-responsive="true" */}
            {/* style="display:inline-block;width:728px;height:90px;" */}
            {/* data-full-width-responsive="${isMobile}" */}
            {adPos && ((data && Object.keys(data).length == 0) || !(data)) && <GoogleAds isMobile={isMobile} adId={adId} position={position} style={divClass} script={scripts[adPos]} />}


        </>
    )
}

{/* <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
                    <ins id="${adId}" class="adsbygoogle ${divClass} ${position}"
                        style="${insStyle}"
                        data-ad-client="ca-pub-9354161551837950"
                        data-ad-slot="${position == 'high' ? '8257587929' : '6101971529'}"
                        >
                        <img class="default_ban_img" src="/no-image.jpg" alt="Default Banner" style="${insStyle}" />

                    </ins>

                    <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});
                    </script> */}
