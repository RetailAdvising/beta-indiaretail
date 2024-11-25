import ImageLoader from '../ImageLoader'
import { useEffect, useState } from 'react';
import { checkMobile, get_ip, insert_banner_ad_log } from '@/libs/api'
import GoogleAds from './GoogleAds';
export default function Advertisement({ data, imgClass, divClass, insStyle, position, adId,ad_payload={} }) {

    let [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        // console.log(adId, "adId")
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
            page: window.location.href,
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

    
    return (
        <>
            {
                data && Object.keys(data).length != 0 &&
                <div onClick={() => click_report()} className={`${divClass ? divClass : ''} cursor-pointer ${data.position == 'Header' || data.position == 'Footer' ? 'h-[90px] w-[728px]' : ''}`}>
                    <ImageLoader style={`${imgClass ? imgClass : ''} h-full w-full`} src={isMobile ? data.mobile_image : data.web_image} title={data.title ? data.title : 's'} />
                </div>
            }

            {/* data-ad-format="auto"
                        data-full-width-responsive="true" */}
            {/* style="display:inline-block;width:728px;height:90px;" */}
            {/* data-full-width-responsive="${isMobile}" */}
            {((data && Object.keys(data).length == 0) || !(data)) && <GoogleAds adId={adId} position={position} style={divClass} script={`
                    
                    <script async src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js'></script>
                    <ins id="${adId}" class="adsbygoogle ${divClass} ${position}"
                        style="${insStyle}"
                        data-ad-client="ca-pub-9354161551837950"
                        data-ad-slot="${position == 'high' ? '8257587929' : '6101971529'}"
                        > 
                        <img class="default_ban_img" src="/no-image.jpg" alt="Default Banner" style="${insStyle}" />
                        
                    </ins>

                    <script>
                     (adsbygoogle = window.adsbygoogle || []).push({});                    
                    </script>
 
            `} />}

            {/* function loadAd(adId) {
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
                        loadAd(${adId}); */}

            {/* function refreshAd(adId) {
                            var adElement = document.getElementById(adId);
                            adElement.innerHTML = ''; // Remove current ad
                            adElement.className = 'adsbygoogle'; // Reset class for new ad
                            (adsbygoogle = window.adsbygoogle || []).push({});
                        }

                        refreshAd(${adId}) */}

            {/* (adsbygoogle = window.adsbygoogle || []).push({}); */}
            {/* <script>
                (adsbygoogle = window.adsbygoogle || []).push({ });
            </script> */}





            {/* <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" crossorigin="anonymous" async></script> */}
            {/* <script>
                // GPT slots
                var gptAdSlots = []; // Created the Array To Get BrowserSize,Ad Size
                googletag.cmd.push(function()
                {
                var mapping = googletag.sizeMapping().
                //addSize is the browser size and each subsequent dimension is an ad size addSize([Browser Width,Browser Height],[Ad Width,Ad Height]).
                build();

                slot1=googletag.defineSlot('/21631575671/IR-728x90-Leaderboard', [[320, 50], [728, 90], [970, 250]], 'div-gpt-ad-1617096742911-0').setTargeting("test", "refresh").
                defineSizeMapping(mapping).
                addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.enableServices();
                });
            </script> */}

        </>
    )
}