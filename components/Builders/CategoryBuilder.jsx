import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Content from '../common/Content'

import { checkMobile, HomePage } from '@/libs/api'
// Social Share
import { WhatsappShareButton, LinkedinShareButton, TwitterShareButton, FacebookShareButton } from 'react-share'
import { useRouter } from 'next/router'
// import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { toast } from 'react-toastify'
import { websiteUrl } from '@/libs/config/siteConfig'
import dynamic from 'next/dynamic'
const SubscriptionAlert = dynamic(()=> import('../common/SubscriptionAlert'))
const Benefits = dynamic(()=> import('@/components/Membership/benefits'))
const AuthModal = dynamic(()=> import('../Auth/AuthModal'))
const Widgets = dynamic(()=> import('../Category/Widgets'))
const CustomSlider = dynamic(()=> import('../Sliders/CustomSlider'))
const Placeholders = dynamic(()=> import('../common/Placeholders'))
const Comments = dynamic(()=> import('../Category/Comments'))
const Modal = dynamic(()=> import('../common/Modal'))
const Title = dynamic(()=> import('../common/Title'))
const Advertisement = dynamic(()=> import('../Baners/Advertisement'))

export default function CategoryBuilder({ data, load, isLast, i, ads, user, productNavigation, comments, updatedCmt, updateShare, noScroll, plans, ads_data, ad_payload }) {
  const styles = {}
  const [showComment, setshowComment] = useState(true);

  const [validator, setValidator] = useState(false)
  const router = useRouter();
  const [updateCmts, setupdateCmts] = useState(false)
  const role = useSelector(s => s.role);

  const socials = [
    {
      "icon": "/fb.svg",
      "name": "fb"
    },
    {
      "icon": "/twitter.svg",
      "name": "twitter"
    },
    {
      "icon": "/linkedin.svg",
      "name": "linkedin"
    },
    {
      "icon": "/ws.svg",
      "name": "ws"
    }
  ]

  useEffect(() => {

    if (document.readyState === 'complete') {
      onPageLoad();
    } else {
      window.addEventListener('load', onPageLoad);
      // Remove the event listener when component unmounts
      return () => window.removeEventListener('load', onPageLoad);
    }

  }, [user, role])

  const checkRole = () => {
    if (role && role != '' && role.message && role.message.length != 0) {
      for (let index = 0; index < role.message.length; index++) {
        if (role.message[index] == 'Member') {
          setValidator(!validator);
        }
      }

    }
  }

  const cardref = useRef(null)

  useEffect(() => {
    if (!cardref?.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        if (!data.is_member && data.ir_prime == 1) {
          getMembershipLanding()
        } else {
          load();
          if (data.ir_prime == 1 && data.is_member) {
            let remain = data.total_free_articles - data.current_free_article_count
            if (remain % 2 == 0) {
              // toast.warn(`Out of ${data.total_free_articles} free articles you consumed ${remain == 0 ? data.total_free_articles : remain}`)
              toast.warn(`Warning: You have used ${data.total_free_articles - remain} out of ${data.total_free_articles} free articles. You have ${remain} articles remaining.`)
            }
          }
        }
        observer.unobserve(entry.target);
      }
    });

    observer.observe(cardref.current);
  }, [isLast])

  const [pageContent, setpageContent] = useState([]);

  async function getMembershipLanding() {
    let data = { "route": "membership", "page_no": 1, "page_size": 10 }
    const resp = await HomePage(data);

    if (resp && resp.message && resp.message.page_content && resp.message.page_content != 0) {
      let datas = resp.message.page_content
      setpageContent(datas);
    }
  }

  // Modal Popup
  const [modal, setModal] = useState('')

  const [visible, setVisible] = useState(false)
  function show() {
    setVisible(true);
  }

  function hide() {
    setVisible(false)
    if (localStorage['roles']) {
      const data = JSON.parse(localStorage['roles']);

      if (data && data.length != 0) {
        data.map(res => {
          if (res.role == 'Member') {
            setValidator(true);
          }
        })
      }
    }
  }



  function onPageLoad() {

    if ((data && data.article_sections && data.article_sections.length != 0)) {
      data.article_sections.map((res, index) => {
        if (res.data && res.data.length != 0) {
          let element = document.getElementById(`${res.placeholder_key}`);

          if (element) {
            // element && ReactDOM.render(<Widgets data={res} productNavigation={productNavigation} routers={router} />, element)
            const root = ReactDOM.createRoot(element)
            root.render(<Widgets data={res} productNavigation={productNavigation} routers={router} />)
          }
        }

      })
    }

  }


  //  FUNCTION TO HANDLE CLOSE ACTION ON SIDEDRAWER/MODAL
  const sideDrawerClosedHandler = () => {
    setshowComment(!showComment)
    // Unsets Background Scrolling to use when SideDrawer/Modal is closed
    // document.body.style.overflow = 'unset';
  }

  const [isLogin, setIsLogin] = useState(false);
  const [loginModal, setLoginModal] = useState(false)
  // FUNCTION TO HANDLE OPEN ACTION ON SIDEDRAWER/MODAL
  const showSidebar = () => {
    if (comments && comments.length != 0) {
      setshowComment(false);
      // Disables Background Scrolling whilst the SideDrawer/Modal is open
      if (typeof window != 'undefined' && window.document) {
        // document.body.style.overflow = 'hidden';
      }
    } else if (comments && comments.length == 0) {
      if (localStorage && !localStorage['apikey']) {
        setIsLogin(true);
        setLoginModal(true)
      } else {
        setshowComment(false);
      }
    }
  }

  const hideModal = () => {
    setLoginModal(false)
    // console.log('close')
    if (localStorage && localStorage['apikey']) {
      setshowComment(true);
      show()
    }
  }

  const [isMobile, setIsMobile] = useState()
  useEffect(() => {
    // checkRole()
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])

  const checkIsMobile = async () => {
    let isMobile = await checkMobile();
    setIsMobile(isMobile);
  }


  const sanitizeHtml = (html) => {
    return html
    // Replace all &nbsp; entities with a space character
    if (html && typeof (html) == 'string') {
      let cleanedHtml = html.replace(/&nbsp;/g, ' ');

      // Remove extra spaces (multiple consecutive spaces) without removing tags and colors
      cleanedHtml = cleanedHtml.replace(/<[^>]*>/g, (match) => {
        // Preserve inline colors (style attributes) within tags
        if (match.includes('style="color:')) {
          return match;
        }
        // Remove spaces from other parts of the tags
        return match.replace(/\s+/g, ' ');
      });

      // Parse the cleaned HTML into a DOM tree
      const parser = new DOMParser();
      let doc = parser.parseFromString(cleanedHtml, 'text/html');

      // Remove all elements that do not have any content (including nested content)
      const emptyElements = doc.querySelectorAll('*:empty:not(br):not(img):not(div):not(iframe)');
      for (const element of emptyElements) {
        element.parentNode.removeChild(element);
      }

      cleanedHtml = new XMLSerializer().serializeToString(doc);
      doc = parser.parseFromString(cleanedHtml, 'text/html');
      const brElements = doc.querySelectorAll('br');
      for (const br of brElements) {
        const prevNode = (br.previousSibling && br.previousSibling.data) ? br.previousSibling.data : undefined;
        const nextNode = (br.nextSibling && br.nextSibling.data) ? br.nextSibling.data : undefined;
        // console.log(prevNode)
        if ((prevNode && prevNode != ' ') || (nextNode && nextNode != ' ')) {

        } else {

          if (!br.closest('strong')) {
            br.parentNode.removeChild(br);
          }

        }
      }
      cleanedHtml = new XMLSerializer().serializeToString(doc);
      return cleanedHtml;
    }

  };

  useEffect(() => {
    checkRole()
    // console.log('load role')
  }, [updateCmts, role, comments])

  const reRender = async () => {
    // console.log('rerender....');
    setTimeout(() => {
      setupdateCmts(!updateCmts)
      checkRole()
    }, 500);
  }

  return (
    <>
      <div ref={cardref}>
        <div className={`flex w-full lg:relative lg:gap-[30px] lg:justify-between md:gap-[20px] md:flex-wrap ${i > 0 ? 'lg:p-[20px_0px]' : ''} md:p-[15px] ${isMobile ? '' : 'container'}`}>
          <div id={'parent' + i} className={` md:w-full ${(!data.is_member && data.ir_prime == 1) ? 'w-[calc(80%_-_20px)] m-auto' : 'w_70'}`}>
            <p>
              <Content i={i} res={data} updateShare={(data) => updateShare(data)} noScroll={(val) => noScroll(val)} />
            </p>
            <div className='relative article_content overflow-hidden'>
              {data.content && <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(data.content) }} id={`innerHtml${i}`} className={`contents-jost   ${'innerHtml' + i} ${(data.ir_prime == 1 && !data.is_member) && 'prime-article'}`} />}
              {(!data.is_member && data.ir_prime == 1) && <div className='prime-article-after'></div>}
            </div>

            {(!data.is_member && data.ir_prime == 1) &&
              <>
                <SubscriptionAlert data={plans} />
                <div className='py-[20px]'>
                  {pageContent && pageContent.length != 0 && pageContent.map((res, i) => {
                    return (
                      <div key={res.section_name + i}>
                        <Benefits data={res}></Benefits>
                      </div>

                    )
                  })
                  }
                </div>
              </>
            }

            <Modal modal={modal} show={show} visible={visible} hide={hide} />


            {/* Comments */}


            {(data.articles_tags && data.articles_tags.length != 0) && ((data.is_member && data.ir_prime == 1) || data.ir_prime == 0) &&
              <div className='flex items-center flex-wrap pt-[15px]'>
                <h6 className='w-max text-[13px] text-[#fff] bg-[#e21b22] border rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>Tags</h6>
                {data.articles_tags.map((res, index) => {
                  return (
                    <h6 key={index} onClick={() => { router.push('/tag/' + res.route) }} className='cursor-pointer w-max capitalize text-[13px] text-[#000] bg-[#f1f1f1]  rounded-[5px] p-[3px_15px] mr-[6px] mb-[12px]'>{res.tag}</h6>
                  )
                })
                }
              </div>
            }

            {((data.is_member && data.ir_prime == 1) || data.ir_prime == 0) && <div className='lg:py-12'>
              {!isMobile && <div className={`flex flex-row justify-between`}>
                {/* <p className="gray-text">Previous Post</p> */}
                <hr></hr>
                <h6 className={`font15_bold !font-[700] nunito`}>Share this Article</h6>
                <hr></hr>
                {/* <p className="gray-text">Next Post</p> */}
              </div>}
              {!isMobile && <div className='flex flex-row gap-3 items-center justify-center py-5'>
                {socials.map((res, index) => {
                  return (
                    <div key={index} onClick={() => updateShare(data)}>
                      {
                        res.name == 'fb' ? <FacebookShareButton url={`${websiteUrl + data.route}`}>
                          <div key={index} className={`rounded-full bg-light-gray p-2`}>
                            <Image src={res.icon} alt={res.name} height={25} width={20} />
                          </div>
                        </FacebookShareButton>
                          : res.name == 'ws' ? <WhatsappShareButton url={`${websiteUrl + data.route}`}>
                            <div key={index} className={`rounded-full bg-light-gray p-2`}>
                              <Image src={res.icon} alt={res.name} height={25} width={20} />
                            </div>
                          </WhatsappShareButton>
                            : res.name == 'linkedin' ? <LinkedinShareButton url={`${websiteUrl + data.route}`}>
                              <div key={index} className={`rounded-full bg-light-gray p-2`}>
                                <Image src={res.icon} alt={res.name} height={25} width={20} />
                              </div>
                            </LinkedinShareButton>
                              : res.name == 'twitter' ? <TwitterShareButton url={`${websiteUrl + data.route}`}>
                                <div key={index} className={`rounded-full bg-light-gray p-2`}>
                                  <Image src={res.icon} alt={res.name} height={25} width={20} />
                                </div>
                              </TwitterShareButton>
                                : null
                      }

                    </div>
                  )
                })}
              </div>}

              {(data.comments && data.disable_comments != 1) && <>
                {(comments && comments.length != 0) &&
                  comments.map((res, i) => {
                    return (
                      <div key={i + "artcile_comments"}>
                        {/* style={{ background: "#efefef" }} */}
                        {(res.route == data.name && res.data && res.data.length > 0) ?
                          <div className={` ${showComment && 'transition-all ease-in delay-500 duration-500 h-[auto] w-[auto]'} relative p-[10px]  border rounded-[5px]`}>
                            {/* w-[120px] md:w-[105px] */}
                            <div className={`py-1.5 flex items-center gap-[10px] relative  ${styles.profile_div}`} id={'cmt' + data.route}>
                              {/* id={`cmt${data.route}`} */}
                              <div><Image src={'/categories/Comments-01.svg'} className='h-[20px] w-[20px] object-contain' height={25} width={25} alt='cmts' /></div>
                              <h6 className={`font-[700] nunito text-[17px] md:text-[15px] `}>Comments</h6>
                              {/* <p className={`absolute top-0 right-0 bg-[#ddd] rounded-[50%] text-center min-w-[25px] min-h-[25px] max-w-max`}><span className='text-[13px]'>{res.data.length ? res.data.length : 0}</span></p> */}
                            </div>
                            <Comments cur={data} showSidebar={showSidebar} noScroll={noScroll} updatedCmt={(cmt, route, index) => { updatedCmt(cmt, route, index), reRender() }} route={res.route} data={res.data.slice(0, 2)} hide_comment={hide} />

                            <div className='w-full flex justify-center'><button onClick={showSidebar} className={`justify-center bg-red text-white p-[10px_20px] md:mt-4 mt-3 rounded-full items-center  ${styles.cmt_btn} text-[13px] flex`}>{(res.data && res.data.length != 0) && 'View Comments'} </button></div>
                          </div> :
                          (res.route == data.name && res.data && res.data.length == 0) && <>
                            <div className={`py-1.5 flex items-center gap-[10px] relative ${styles.profile_div}`} id={'cmt' + data.route}>
                              {/* id={`cmt${data.route}`} */}
                              <div><Image src={'/categories/Comments-01.svg'} className='h-[20px] w-[20px] object-contain' height={25} width={25} alt='cmts' /></div>

                              <h6 className={`font-[700] nunito text-[17px] md:text-[15px] `}>Comments</h6>
                              {/* <p className={`absolute top-0 right-0 bg-[#ddd] rounded-[50%] text-center min-w-[25px] min-h-[25px] max-w-max`}><span className='text-[13px]'>0</span></p> */}
                            </div>

                            <Comments cur={data} noScroll={noScroll} updatedCmt={(cmt, route, index) => { updatedCmt(cmt, route, index), reRender() }} route={res.route} data={[]} showSidebar={showSidebar} hide_comment={hide} />

                          </>
                        }
                      </div>
                    )
                  })
                }
              </>}


              {(!showComment && data) ? <>
                {comments && comments.length != 0 && comments.map((res, i) => {
                  return (
                    <div key={i}>
                      {(res.route == data.name && res.data && (res.data.length != 0 || res.data.length == 0)) && <div className={`${isMobile ? 'popright' : 'popright_1'}`}>
                        <Modal updatedCmt={(cmt, route, index) => { updatedCmt(cmt, route, index), reRender() }} cur={data} visible={true} modal={'comments'} route={res.route} noScroll={noScroll} comments={res.data} hide={sideDrawerClosedHandler} />
                      </div>}
                    </div>
                  )
                })}
              </> : (showComment && data && data.doctype == 'Articles' && isLogin && loginModal) ? <div className='authModal'><AuthModal visible={loginModal} hide={hideModal} /></div> : null}
            </div>}


          </div>

          {((data.is_member && data.ir_prime == 1) || data.ir_prime == 0) && <div className={`w_30 md:hidden finding relative`}>
            {(data.place_holders_ads && data.place_holders_ads.length != 0) ?
              // h-[calc(100vh_-_10px)] scrollbar-hide
              // sticky h-[calc(100vh_-_10px)] scrollbar-hide top-0 z-10 bg-white  overflow-auto
              <div id={'target' + i} className={` sticky h-[calc(100vh_-_10px)] scrollbar-hide top-0 z-10 bg-white  overflow-auto`}><Placeholders placeholder={data.place_holders_ads} ads_data={ads_data ? ads_data : null} tagbasedAd={data.banner_ad && Object.keys(data.banner_ad).length != 0 && data.banner_ad} productNavigation={productNavigation} /></div>
              : <>
                <Advertisement ad_payload={ad_payload} data={(ads_data && ads_data.right_first) && ads_data.right_first} position={"small"} adPos={'300'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
                <Advertisement ad_payload={ad_payload} data={(ads_data && ads_data.right_second) && ads_data.right_second} position={"small"} adPos={'300'} insStyle={"display:inline-block;width:300px;height:250px;"} divClass={`h-[250px] w-[300px]`} />
              </>
            }
          </div>}
        </div>

        {data.latest_news && data.latest_news.length != 0 && <div className={`${isMobile ? '' : 'container'}  ${styles.section_3}`}>
          {/* Slider */}
          <div className={`${styles.slider_parent} latestNews_slider lg:mb-[15px] p-[20px 0] md:p-[10px_15px] ${isLast && 'mb-7'}`}>
            <Title data={{ title: 'Latest News' }} />
            <CustomSlider slider_id={"category_builder" + i} slider_child_id={'category_builder_child' + i} data={data.latest_news} cardClass={'flex-[0_0_calc(20%_-_16px)] md:flex-[0_0_calc(70%_-_10px)]'} route={'/news/'} imgClass={'h-[190px] md:h-[160px] w-full'} />
          </div>
        </div>}

      </div>
    </>
  )
}
