import Advertisement from '@/components/Baners/Advertisement'
import MainFooter from '@/components/Footer/MainFooter'
import Header from '@/components/Headers/Header'
import Navbar from '@/components/Headers/Navbar'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo, memo } from 'react'
import { websiteSettings, get_article_breadcrumb, get_subscription_plans, get_customer_info, checkMobile, check_authorization, checkAds } from '@/libs/api'
import 'rodal/lib/rodal.css';
import Rodal from 'rodal';
import dynamic from 'next/dynamic'
const SubscriptionAlert = dynamic(() => import('@/components/common/SubscriptionAlert'))
const ModPopup = dynamic(() => import('@/components/Category/ModPopup'))
import { useDispatch, useSelector } from 'react-redux';
import AlertUi from '@/components/common/AlertUi'
import setRole from 'redux/actions/roleAction'
import setUser from 'redux/actions/userAction'

function RootLayout({ children, checkout, isLanding, head, homeAd, data, header_data, is_detail, adIdH, adIdF, ad_payload }) {
  // console.log(data.footer_content)
  const [breadCrumbs, setBreadCrumbs] = useState([]);
  let [footerData, setFooterData] = useState([]);
  const user = useSelector(s => s.user);
  const router = useRouter();
  const styles = {
    display: 'flex',
    justifyContent: 'center'
  }

  useEffect(() => {
    if (typeof window != 'undefined' && router) {
      // console.log(router);
      if (router.pathname == "/[...detail]") {
        // if (router.query.detail) {
        let page_route = router.query.detail
        if (page_route && Array.isArray(page_route) && page_route.length > 1) {
          page_route = page_route.join("/") + "/"
        } else {
          page_route = page_route.join(" ")
        }
        article_breadcrumb(page_route)
      } else {
        // setBreadCrumbs(removeSpecialCharacters(router.asPath))
        setBreadCrumbs(router.asPath.split('/'))
      }
      // } else setBreadCrumbs(router.asPath.split('/'))
    }

    get_website_settings()
    if (typeof window !== "undefined" && localStorage['apikey']) {
      checkSession()
    }
    // ads.classList.remove('hidden')
  }, [])


  const article_breadcrumb = async (route) => {
    // console.log(route,"route")
    if (route) {
      if (router.query.vids || router.query.list) {
        setBreadCrumbs(router.asPath.split('/'))
      } else {
        const resp = await get_article_breadcrumb({ article_route: route })
        if (resp && resp.message && resp.message.length != 0) {
          setBreadCrumbs(resp.message)
        }
      }
    }
  }


  const get_website_settings = async () => {
    let websiteData = await websiteSettings()
    if (websiteData) {
      footerData = websiteData.message.footer_template
      setFooterData(footerData)
    }
  }


  let [plans, setPlans] = useState([])
  let [visible, setVisible] = useState(false)
  let [alrtMsg, setAlrtMsg] = useState(false)
  const hide = () => {
    visible = false
    setVisible(visible)
  }

  const getMembershipPlans = async () => {
    if (typeof window != 'undefined' && localStorage && localStorage['roles'] && localStorage['apikey']) {

      let data = { "plan_type": "Month", "res_type": "member" }
      const resp = await get_subscription_plans(data);
      if (resp && resp.message && resp.message.status && resp.message.status == 'success') {

        if (resp.message.message && resp.message.message.length != 0 && resp.message.message[0]) {
          // plans.push(resp.message.message[0].features)
          plans = resp.message.message[0].features;
          setPlans(plans)
          if (!mand) {
            visible = true
            setVisible(visible)
            localStorage.removeItem('new_user')
            localStorage.removeItem('company')
          }
        }
      }
    }
  }

  let [mand, setMand] = useState(false)
  const hides = (val) => {
    if (val == 'yes') {
      mand = false
      setMand(mand)
      let val = checkMemberShip(customerInfo['roles_list'])
      if (val) { getMembershipPlans() }
    } else {
      alrtMsg = true
      setAlrtMsg(alrtMsg)
    }
  }

  let [customerInfo, setCustomerInfo] = useState();
  async function customer_info() {
    let data = { guest_id: '', user: localStorage['customer_id'] };
    const resp = await get_customer_info(data);
    if (resp && resp.message && resp.message[0]) {
      customerInfo = resp.message[0]
      localStorage['userid'] = resp.message[0]['email']
      localStorage['email'] = resp.message[0]['email']
      setCustomerInfo(customerInfo);
      checkInfo(resp.message[0])
    }
  }

  const checkInfo = (data) => {
    if (data['custom_company_name'] && data['custom_job_title'] && data['custom_location'] && data['custom_industry']) {
      if (data['roles_list'] && data['roles_list'].length != 0) {
        let val = checkMemberShip(data['roles_list'])
        if (val) {
          getMembershipPlans()
        }
      }
    } else {
      mand = true
      setMand(mand)
    }
  }

  const checkMemberShip = (data) => {

    for (let j = 0; j < data.length; j++) {
      if (data[j] == 'Member' || data[j] == 'Member User') {
        localStorage['new_user'] ? localStorage.removeItem('new_user') : null;
        return false
      }
    }
    return true
  }

  const checkMandatory = () => {
    if (typeof window != 'undefined' && localStorage && (localStorage['apikey'] || localStorage['api_key']) && localStorage['company']) {
      customer_info()
    }

    // else if (localStorage['new_user'] && localStorage && localStorage['apikey']) {
    //   getMembershipPlans()
    // }
  }



  useMemo(() => {
    if (typeof window != 'undefined') {
      checkMandatory()
      // getMembershipPlans()
    }
  }, [user])

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

  const dispatch = useDispatch()

  const checkSession = async () => {
    let params = {
      api_key: localStorage['apikey']
    };

    const resp = await check_authorization(params);
    const data = resp.message;
    if (data.status && data.status != "Success") {
      logout()
    }
  }

  const logout = () => {
    localStorage.clear();
    dispatch(setRole(null))
    dispatch(setUser(null))
  }


  return (
    <>
      {!checkAds(router.pathname) && (!checkout || is_detail) && <div className="lg:grid md:overflow-hidden lg:justify-center lg:pt-[15px] lg:mt-[10px] md:p-[10px_15px] "><Advertisement adId={adIdH} data={(homeAd && homeAd.header) && homeAd.header} ad_payload={ad_payload} divClass={'h-[90px] lg:w-[728px] md:w-full m-auto'} insStyle={isMobile ? "display:inline-block;width:360px;height:90px;" : "display:inline-block;width:728px;height:90px;"} adPos={'header'} position={"high"} /></div>}
      <>
        {router.pathname != "/p/[...route]" && <Header checkout={checkout} />}
        {/* {!checkout && <Navbar isLanding={isLanding} heading={head} /> } */}
        {router.pathname != "/p/[...route]" && <div className={``}><Navbar isLanding={isLanding} heading={head} checkout={checkout} /></div>}
        {/* {!checkout ? <Navbar isLanding={isLanding} heading={head} /> : <div className='lg:hidden'><MobileHead isLanding={isLanding} Heading={head} /></div> } */}
        {(breadCrumbs && breadCrumbs.length > 1 && breadCrumbs[1] && breadCrumbs[1] != 'p' && breadCrumbs[1] != 'newsletters' && breadCrumbs[1] != 'advertise-with-us' && breadCrumbs[1].split('?')[0] != 'thankyou' && breadCrumbs[1].split('?')[0] != 'profile' && breadCrumbs[1].split('?')[0] != 'search' && breadCrumbs[1].split('?')[0] != 'tag') &&
          <div className='container flex  gap-[7px] md:hidden py-[20px]'>
            {breadCrumbs.map((bc, index) => {
              let url = index == 3 ? '/' + breadCrumbs[1] + '/' + breadCrumbs[2] + '/' + breadCrumbs[3] :
                index == 2 ? '/' + breadCrumbs[1] + '/' + breadCrumbs[2] :
                  index == 1 ? router.query.detail ? '/categories/' + breadCrumbs[1] : '/' + breadCrumbs[1] : '/'
              return (<div key={index}  >
                {index == 0 ? <Link className={`flex gap-[5px] items-center capitalize hover:text-red `} href={url}>
                  <p className={`text-[12px] font-[500] nunito`}> Home</p>
                  <div className='ml-[5px] pt-[4px]'>
                    <Image alt='arrow' src={'/arrow.svg'} width={5} height={5} />
                  </div>
                </Link> : index == breadCrumbs.length - 1 ?
                  <div className={`flex gap-[5px] items-center capitalize hover:text-red `}>
                    <p className={`text-[12px] max-w-[250px] line-clamp-1 ${breadCrumbs.length - 1 == index ? 'font-[700]' : 'font-[500]'} nunito`}>
                      {/* {decodeURIComponent(bc).replaceAll('-', ' ')} */}
                      {(() => {
                        try {
                          return decodeURIComponent(bc).replaceAll('-', ' ');
                        } catch (error) {
                          console.error("Error decoding URI component:", error);
                          return bc.replaceAll('-', ' '); // Fallback to a safe string transformation
                        }
                      })()}

                    </p>
                    {/* <p className={`text-[12px] max-w-[250px] line-clamp-1 ${breadCrumbs.length - 1 == index ? 'font-[700]' : 'font-[500]'} nunito`}> {bc.replaceAll('-', ' ')}</p> */}
                    {(index !== 0 && index != breadCrumbs.length - 1) &&
                      <div className='ml-[5px] pt-[4px]'>
                        <Image alt='arrow' src={'/arrow.svg'} width={5} height={5} />
                      </div>
                    }
                  </div> :
                  <Link className={`flex gap-[5px] items-center capitalize`} href={url}>
                    <p className={`text-[12px] ${breadCrumbs.length - 1 == index ? 'font-[700]' : 'font-[500]'} nunito`}> {bc.replaceAll('-', ' ')}</p>
                    {(index !== 0 && index != breadCrumbs.length - 1) &&
                      <div className='ml-[5px] pt-[4px]'>
                        <Image alt='arrow' src={'/arrow.svg'} width={5} height={5} />
                      </div>
                    }
                  </Link>}
              </div>)
            })}
          </div>}
        <main id='main' className={`${router.asPath == '/' || router.asPath == '' ? 'md:overflow-hidden' : ''}`}>
          {visible && <div className='membAlert'><Rodal visible={visible} animation='slideUp' onClose={hide}>
            <SubscriptionAlert isModal={true} data={plans} />
          </Rodal></div>}

          {(mand && customerInfo) && <div className='mandAlert'>
            {alrtMsg && <AlertUi isOpen={alrtMsg} closeModal={() => setAlrtMsg(false)} headerMsg={'Alert'} alertMsg={{ message: 'The following things are mandatory' }} button_2={'Ok'} />}
            <Rodal onClose={() => hides('no')} visible={mand} animation='slideUp' >
              <ModPopup isModal={true} customerInfo={customerInfo} onClose={(val) => hides(val)} />
            </Rodal></div>}

          {children}
        </main>

        {!checkAds(router.pathname) && (!checkout && !is_detail) && <div className="my-[10px] md:mb-[15px] lg:py-5 lg:grid lg:justify-center md:overflow-hidden md:px-[10px]"><Advertisement ad_payload={ad_payload} adId={adIdF} data={(homeAd && homeAd.footer) && homeAd.footer} position={"high"} adPos={'footer'} divClass={'h-[90px] lg:w-[728px] md:w-full m-auto'} insStyle={isMobile ? "display:inline-block;width:360px;height:90px;" : "display:inline-block;width:728px;height:90px;"} style={styles} height={'h-full'} width={'500px'} /></div>}
        {!checkout && footerData && footerData.length != 0 && <MainFooter footerData={footerData} />}
      </>
    </>
  )
}


export default memo(RootLayout)