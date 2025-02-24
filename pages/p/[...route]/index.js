import SEO from "@/components/common/SEO";
import Title from "@/components/common/Title";
import ImageLoader from "@/components/ImageLoader";
import RootLayout from "@/layouts/RootLayout";
import {
  check_Image,
  checkMobile,
  get_web_special_detail,
  getCurrentUrl,
  seo_Image,
} from "@/libs/api";
// import { Nunito } from 'next/font/google';
import Image from "next/image";
import styles from "@/styles/Cards.module.scss";
import { domain } from "@/libs/config/siteConfig";
import { useRouter } from "next/router";
import format from "date-fns/format";
import { useEffect, useState } from "react";
// import SpeakerCard from "@/components/Webinar/SpeakerCard";
// import Agenda from "@/components/Webinar/Agenda";
import { Inter } from "next/font/google";
// import Banner from "@/components/Webinar/Banner";
// import Form from "@/components/Webinar/Form";
// import Dropdowns from "@/components/common/Dropdowns";
// import BrandDetails from "@/components/Webinar/BrandDetails";
// import KeyDiscussion from "@/components/Webinar/KeyDiscussion";
// import WhitePaper from "@/components/Webinar/WhitePaper";
// import Reports from "@/components/Webinar/Reports";
// import Video from "@/components/Webinar/Video";
// import SocialMedia from "@/components/Webinar/SocialMedia";
// import YouTubeVideo from "@/components/Webinar/YouTubeVideo";
// import FeaturedContent from "@/components/WebSpecials/FeaturedContent";
// import SideMenu from "@/components/WebSpecials/SideMenu";
// import RegistrationForm from "@/components/WebSpecials/RegistrationForm";
import {
  WhatsappShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  FacebookShareButton,
} from "react-share";
import { websiteUrl } from "@/libs/config/siteConfig";
import Head from "next/head";

import dynamic from "next/dynamic";
const RegistrationForm = dynamic(()=> import('@/components/WebSpecials/RegistrationForm'))
const SideMenu = dynamic(()=> import('@/components/WebSpecials/SideMenu'))
const FeaturedContent = dynamic(()=> import('@/components/WebSpecials/FeaturedContent'))
const YouTubeVideo = dynamic(()=> import('@/components/Webinar/YouTubeVideo'))
const SocialMedia = dynamic(()=> import('@/components/Webinar/SocialMedia'))
const Video = dynamic(()=> import('@/components/Webinar/Video'))
const Reports = dynamic(()=> import('@/components/Webinar/Reports'))
const WhitePaper = dynamic(()=> import('@/components/Webinar/WhitePaper'))
const KeyDiscussion = dynamic(()=> import('@/components/Webinar/KeyDiscussion'))
const BrandDetails = dynamic(()=> import('@/components/Webinar/BrandDetails'))
const Dropdowns = dynamic(()=> import('@/components/common/Dropdowns'))
const Form = dynamic(()=> import('@/components/Webinar/Form'))
const Banner = dynamic(()=> import('@/components/Webinar/Banner'))
const Agenda = dynamic(()=> import('@/components/Webinar/Agenda'))
const SpeakerCard = dynamic(()=> import('@/components/Webinar/SpeakerCard'))
const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  display: "block",
  preload: true,
  style: "normal",
  subsets: ["latin"],
  variable: "--font-inter",
});

const index = ({ page_route, ads, webinar_data, category_route }) => {
  // const index = ({ data, page_route, ads }) => {
  // console.log(page_route, "page_route");
  // console.log(category_route, "category_route");
  // console.log(webinar_data, "webinar_data");

  const [webinarLimit, setWebinarLimit] = useState(false);
  const [leadLimit, setLeadLimit] = useState(false);
  const [brandProfileLimit, setBrandProfileLimit] = useState(false);
  const [caseStudiesLimit, setCaseStudiesLimit] = useState(false);
  const [featuredContentLimit, setFeaturedContentLimit] = useState(false);
  const [bottomBackgroundImage, setBottomBackgroundImage] = useState("/no-image.jpg");
  let [isMobile, setIsMobile] = useState(false)

  // useEffect(()=>{
  //     if(!webinar_data){
  //       router.push("/404")
  //     }
  // },[webinar_data])


  useEffect(() => {

    const element = document.getElementById('scroll_div')
    element.classList.add('md:!mt-0');
    checkIsMobile();

    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
      element.classList.remove('md:!mt-0');
    };
  }, [])


  useEffect(() => {
    if (isMobile && webinar_data?.bottom_mobile_banner) {
      setBottomBackgroundImage(`https://${domain}${webinar_data.bottom_mobile_banner.replace(/ /g, "%20")}`);
    } else if (!isMobile && webinar_data?.bottom_banner_image) {
      setBottomBackgroundImage(`https://${domain}${webinar_data.bottom_banner_image.replace(/ /g, "%20")}`);
    } else {
      setBottomBackgroundImage("/no-image.jpg");
    }
  }, [isMobile, webinar_data]);


  const checkIsMobile = async () => {
    let is_mobile = await checkMobile();
    isMobile = is_mobile
    setIsMobile(isMobile);
  }


  // const bottomBackgroundImage = isMobile && webinar_data
  //   ? webinar_data.bottom_mobile_banner
  //     ? `https://${domain}${webinar_data.bottom_mobile_banner.replace(/ /g, "%20")}`
  //     : "/no-image.jpg"
  //   : webinar_data && webinar_data.bottom_banner_image
  //     ? `https://${domain}${webinar_data.bottom_banner_image.replace(/ /g, "%20")}`
  //     : "/no-image.jpg";

  const icons = [
    { icon: "/bookstore/linkedin.svg", name: "Linkedin" },
    { icon: "/bookstore/FB.svg", name: "Facebook" },
    { icon: "/bookstore/twitter.svg", name: "Twitter" },
    { icon: "/bookstore/whatsapp.svg", name: "Whatsapp" },
  ];

  const socials = [
    {
      icon: "/fb.svg",
      name: "fb",
    },
    {
      icon: "/twitter.svg",
      name: "twitter",
    },
    {
      icon: "/linkedin.svg",
      name: "linkedin",
    },
    {
      icon: "/ws.svg",
      name: "ws",
    },
  ];

  const [showMore, setShowMore] = useState(false);
  const router = useRouter();

  const [side_menu, setSideMenu] = useState([
    { title: "Webinars", url: "Webinars" },
    { title: "Lead Generation", url: "Lead Generation" },
    { title: "Brand Profile", url: "Brand Profile" },
    { title: "Case Studies", url: "Case Studies" },
    { title: "Featured Content", url: "Featured Content" },
  ]);

  useEffect(() => {
    if (category_route == "case-studies") {
      let data = [...webinar_data.content_1, ...webinar_data.content_2];
      let menus = [];
      if (data && data.length > 0) {
        for (let index = 0; index < data.length; index++) {
          if (data[index]["title"]) {
            let obj = {
              title: data[index]["title"],
              url: data[index]["title"],
            };
            menus.push(obj);
          }
        }
      }

      setSideMenu(menus);
    }
  }, [router]);

  const click_data = (data, type) => {
    // console.log(data, "data");

    // if (type == "register") {
    //   showRegister();
    // } else if (type === "white-paper") {
    //   if (!webinar_data.is_registration_required) {
    //     const newTab = window.open(
    //       `https://${domain}${data.route}`,
    //       "_blank"
    //     );
    //     newTab.focus();
    //   } else {
    //     showRegister();
    //   }
    // } else if (type === "video") {
    //   if (!webinar_data.is_registration_required) {
    //     const newTab = window.open(
    //       `https://www.youtube.com/watch?v=${data}`,
    //       "_blank"
    //     );
    //     newTab.focus();
    //   } else {
    //     showRegister();
    //   }
    // } else {
    //   if (data.route) {
    //     let route = type == "article" ? "/" + data.route : "/p/" + data.route;
    //     if (
    //       category_route == "featured-content" ||
    //       category_route == "web-special-list"
    //     ) {
    //       router.push(route);
    //     } else {
    //       if (!webinar_data.is_registration_required) {
    //         if(data.route.indexOf('https') == -1){
    //           router.push(route);
    //         }else{
    //           // router.push(data.route);
    //           const newTab = window.open(
    //             data.route,
    //             "_blank"
    //           );
    //           newTab.focus();
    //         }
    //       } else {
    //         showRegister();
    //       }
    //     }
    //   }
    // }


    if (type == "register") {
      if (data.is_link_required && data.registration_url) {
        router.push(data.registration_url);
      } else {
        showRegister();
      }
    } else {
      if (!webinar_data.is_registration_required) {
        if (data.route) {
          let route = type === "white-paper" ? `https://${domain}${data.route}` : type == "article" ? "/" + data.route : "/p/" + data.route
          if (category_route == "featured-content" || category_route == "web-special-list") {
            router.push(route);
          } else {
            if (data.route.indexOf('https') == -1) {
              router.push(route);
            } else {
              const newTab = window.open(
                data.route,
                "_blank"
              );
              newTab.focus();
            }
          }
        } else if (type === "video") {
          const newTab = window.open(
            `https://www.youtube.com/watch?v=${data}`,
            "_blank"
          );
          newTab.focus();
        }
      } else {
        showRegister();
      }

    }
  };
  const [activeIndex, setActiveIndex] = useState(0);

  const activateSection = async (data, i, type) => {
    // console.log(data,"data")
    setActiveIndex(data);
    if (type == "click") {
      let el = document.getElementById(data);
      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start",
      });
    }
  };

  const [visible, setVisible] = useState(false);
  const showRegister = () => {
    setVisible(true);
    document.body.style.overflow = "hidden";
  };

  const hide = (data) => {
    setVisible(false);
    document.body.style.overflow = "auto";
    if (data) {
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[data-section]");
      let activeSection = "";
      // console.log(sections,"sections")
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 100) {
          activeSection = section.id;
        }
      });

      if (activeSection) {
        activateSection(activeSection, "", "scroll");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const updateShare = (data) => { };

  // console.log("wd", webinar_data.banner_image);

  return (
    <>
      {visible && <RegistrationForm webinar_data={webinar_data} visible={visible} hide={hide} />}
      <RootLayout
        data={webinar_data}
        isLanding={true}
        head={""}
        adIdH={category_route + "head"}
        adIdF={category_route + "foot"}
        homeAd={ads && ads.header ? ads : null}
      >
        {category_route == "web-special-list" ? (
          <SEO
            title={"India Retailing"}
            siteName={"India Retailing"}
            description={
              "This is IndiaRetailing and its about news and articles based on the popular site."
            }
          />
        ) : (
           <>
             {
              webinar_data && (
                <Head>
                <title key="title">
                  {category_route == "featured-content" &&
                    webinar_data.message &&
                    webinar_data.message.article_detail
                    ? webinar_data.message.article_detail[0]["title"]
                    : webinar_data?.meta_title}
                </title>
                <meta
                  name="description"
                  content={
                    category_route == "featured-content" &&
                      webinar_data.message &&
                      webinar_data.message.article_detail
                      ? webinar_data.message.article_detail[0]["blog_intro"]
                      : webinar_data?.meta_description
                  }
                />
                <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
                />
                <meta name="theme-color" content="#e21b22" />
                <meta property="og:type" content={"Article"} />
                <meta
                  property="og:title"
                  content={
                    category_route == "featured-content" &&
                      webinar_data.message &&
                      webinar_data.message.article_detail
                      ? webinar_data.message.article_detail[0]["title"]
                      : webinar_data?.meta_title
                  }
                />
                <meta
                  property="og:description"
                  content={
                    category_route == "featured-content" &&
                      webinar_data.message &&
                      webinar_data.message.article_detail
                      ? webinar_data.message.article_detail[0]["blog_intro"]
                      : webinar_data?.meta_description
                  }
                />
                <meta
                  property="og:url"
                  content={getCurrentUrl(router.asPath)}
                ></meta>
                <meta property="og:locale" content="en_IE" />
                <meta
                  property="og:image"
                  itemprop="image"
                  content={seo_Image(
                    category_route == "featured-content" &&
                      webinar_data.message &&
                      webinar_data.message.article_detail
                      ? webinar_data.message.article_detail[0]["thumbnail_imagee"]
                      : webinar_data.meta_image
                        ? webinar_data.meta_image
                        : webinar_data.thumbnail_imagee
                  )}
                />
                <meta
                  property="og:image:alt"
                  content={`${category_route == "featured-content" &&
                    webinar_data.message &&
                    webinar_data.message.article_detail
                    ? webinar_data.message.article_detail[0]["title"]
                    : webinar_data?.title
                    } | ${"IndiaRetailing"}`}
                />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
    
                <meta name="robots" content="index,follow" />
    
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content={"@d__indiaRetail"} />
                <meta name="twitter:creator" content={"@d__indiaRetail"} />
                <meta
                  property="twitter:image"
                  content={seo_Image(
                    category_route == "featured-content" &&
                      webinar_data.message &&
                      webinar_data.message.article_detail
                      ? webinar_data.message.article_detail[0]["thumbnail_imagee"]
                      : webinar_data?.meta_image
                  )}
                />
                <meta
                  property="twitter:title"
                  content={
                    category_route == "featured-content" &&
                      webinar_data.message &&
                      webinar_data.message.article_detail
                      ? webinar_data.message.article_detail[0]["title"]
                      : webinar_data?.title
                  }
                />
                <meta
                  property="twitter:description"
                  content={
                    category_route == "featured-content" &&
                      webinar_data.message &&
                      webinar_data.message.article_detail
                      ? webinar_data.message.article_detail[0]["blog_intro"]
                      : webinar_data?.meta_description
                  }
                />
    
                <link rel="shortcut icon" href="/ir_2023.png" />
              </Head>
              )
             }
           </>
        )}

        {category_route == "web-special-list" &&
          webinar_data &&
          webinar_data.message && (
            <>
              <div className={`py-[20px] container md:p-[15px] md:py-[10px] `}>
                <div className={`flex items-center gap-[10px]`}>
                  <div className={`flex-[0_0_auto]`}>
                    <Image
                      className="h-[23px] w-[23px] object-contain"
                      height={100}
                      width={100}
                      alt={
                        "Watch the experts reveal their recipes for business success, packed with real life examples to help you make better business decisions & achieve your business goals anywhere you are!"
                      }
                      src={"/web_special/video_retail.png"}
                    ></Image>
                  </div>

                  <h6 className="flex flex-wrap items-center gap-2 nunito font-extrabold uppercase text-[16px] md:text-[14px] lg:text-[18px]">
                    <span className="text-inherit">India</span>

                    <span className="text-[#E21B22]">Retailing</span>

                    <span className="text-inherit md:whitespace-normal md:flex-1 lg:flex-auto">
                      Web Specials
                    </span>
                  </h6>
                </div>

                <p className={`p-[15px] sub_title lg:w-[50%]`}>
                  Watch the experts reveal their recipes for business success,
                  packed with real life examples to help you make better
                  business decisions & achieve your business goals anywhere you
                  are!
                </p>

                <div className="lg:flex gap-5 md:pt-[10px] lg:pt-[20px]">
                  {/* <div className="flex-[0_0_calc(20%_-_15px)] lg:sticky lg:h-full lg:top-[15px]">
                    {side_menu && side_menu.length > 0 && (
                      <>
                        <div className="w-fit bg-[#ddd] p-[3px_5px] rounded-[5px_5px_0_0]">
                          <h6 className="text-[12px] font-semibold uppercase">
                            CATEGORIES
                          </h6>
                        </div>

                        <div className="border border-[#D9D9D9] rounded-[0_10px_10px_10px]">
                          {side_menu.map((resp, index) => {
                            return (
                              <div
                                key={resp.title}
                                className={`${index == side_menu.length - 1
                                  ? ""
                                  : "border-b border-b-[#D9D9D9]"
                                  } p-[10px] cursor-pointer`}
                                onClick={() => activateSection(resp, index)}
                              >
                                <h6
                                  className={`text-[14px] ${activeIndex == index
                                    ? "text-[#E21B22] font-[700]"
                                    : "text-[#737373]"
                                    } `}
                                >
                                  {resp.title}
                                </h6>
                              </div>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div> */}
                  <SideMenu
                    side_menu={side_menu}
                    activateSection={activateSection}
                    activeIndex={activeIndex}
                  />

                  <div className={`md:py-[15px] flex-[0_0_calc(80%_-_15px)]`}>
                    {webinar_data.message.webinars_data &&
                      webinar_data.message.webinars_data.length > 0 && (
                        <div id={"Webinars"} data-section>
                          <div className="flex justify-between ">
                            <Title
                              data={{
                                title: "Webinars",
                                count: webinar_data.message.webinar_count,
                              }}
                              counter={true}
                              isIcon={true}
                              see={`uppercase !font-semibold !text-[#e21b22]`}
                            />

                            {webinar_data.message.webinars_data.length > 3 && (
                              <button
                                className="mb-4 flex items-center text-[20px] font-bold gap-[5px] cursor-pointer"
                                onClick={() => setWebinarLimit(!webinarLimit)}
                              >
                                <p className={`nunito font-medium`}>
                                  View {webinarLimit ? "Less" : "More"}
                                </p>
                                <Image
                                  className="h-[11px] w-[5px] object-contain"
                                  src="/forwardIcon.svg"
                                  height={5}
                                  width={5}
                                  alt="View All"
                                />
                              </button>
                            )}
                          </div>

                          {webinar_data.message.webinars_data
                            .slice(
                              0,
                              webinarLimit
                                ? webinar_data.message.webinars_data.length
                                : 3
                            )
                            .map((res) => {
                              return (
                                <div
                                  className="py-[15px] border-b border-b-[#e9e9e9]"
                                  key={res.name}
                                >
                                  {/* <p
                                    className={`text-[#999999] uppercase text-[12px] py-[10px] md:py-[5px] nunito`}
                                  >
                                    webinar
                                  </p> */}
                                  <div
                                    className="flex gap-3 justify-between md:pb-4 lg:pb-0 cursor-pointer md:items-end"
                                    onClick={() =>
                                      router.push("/p/" + res.route)
                                    }
                                  >
                                    <div>
                                      <p className="text-[18px] md:text-[16px] font-semibold pb-[10px]">
                                        {res.title}
                                      </p>
                                      <span
                                        className={`text-[14px] font-[700]  nunito`}
                                      >
                                        {format(
                                          new Date(res.start_time),
                                          "EEEE , dd MMM YYY"
                                        )}
                                      </span>
                                    </div>

                                    <div className="flex-[0_0_auto] flex items-center gap-[15px]">
                                      {/* <Image className='md:h-[15px] md:w-[15px]' src={'/share.svg'} height={20} width={20} alt='share'></Image> */}

                                      <div className="border flex items-center gap-[5px] border-[#000000] px-[15px] md:px-[10px] md:h-[35px] h-[40px] rounded-[25px] cursor-pointer">
                                        <h6 className="text-[15px] md:text-[13px] font-semibold text-[#292930]">
                                          {"watch on demand"}
                                        </h6>
                                        <Image
                                          className="md:h-[15px] md:w-[15px]"
                                          src={"/ytplay.svg"}
                                          height={20}
                                          width={20}
                                          alt="ytplay"
                                        ></Image>
                                      </div>
                                    </div>
                                  </div>

                                  {res.speakers && res.speakers.length > 0 && (
                                    <div className="lg:py-[15px] no_scroll scrollbar-hide overflow-y-hidden md:flex items-center md:gap-[15px] lg:gap-[20px] lg:grid lg:grid-cols-4">
                                      {res.speakers.map((resp, index) => {
                                        return (
                                          <div
                                            key={resp.name}
                                            className="flex gap-[10px] w-fit md:flex-[0_0_calc(70%_-_10px)]"
                                            onClick={() =>
                                              click_data(resp, "speakers")
                                            }
                                          >
                                            <div className="flex-[0_0_auto]">
                                              <ImageLoader
                                                style={`rounded-[5px] h-[65px] w-full`}
                                                src={resp.profile_image}
                                                title={resp.name1}
                                              />
                                            </div>

                                            <div className="flex-[0_0_calc(73%_-_5px)] ">
                                              <h6
                                                className={`text-[13px] leading-[14px] line-clamp-1 nunito font-[700]`}
                                              >
                                                {resp.name1}
                                              </h6>
                                              <p
                                                className={`text-[#666666] text-[12px] leading-[16px] line-clamp-2 pb-[5px]`}
                                              >
                                                {resp.designation}
                                              </p>
                                              <p
                                                className={`text-[12px] text-[#C93742] nunito`}
                                              >
                                                {resp.company_name}
                                              </p>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                        </div>
                      )}

                    {webinar_data.message.lead_data &&
                      webinar_data.message.lead_data.length > 0 && (
                        <>
                          <div
                            className="py-[20px]"
                            id={"Lead Generation"}
                            data-section
                          >
                            <div className="flex justify-between">
                              <Title
                                data={{ title: "Lead Generation" }}
                                isIcon={true}
                                see={`uppercase !font-semibold !text-[#e21b22]`}
                              // seeMore={true}
                              />

                              {webinar_data.message.lead_data.length > 3 && (
                                <button
                                  className="mb-4 flex items-center text-[20px] font-bold gap-[5px] cursor-pointer"
                                  onClick={() => setLeadLimit(!leadLimit)}
                                >
                                  <p className={`nunito font-medium`}>
                                    View {leadLimit ? "Less" : "More"}
                                  </p>
                                  <Image
                                    className="h-[11px] w-[5px] object-contain"
                                    src="/forwardIcon.svg"
                                    height={5}
                                    width={5}
                                    alt="View All"
                                  />
                                </button>
                              )}
                            </div>

                            <div className="pb-[20px] ">
                              {webinar_data.message.lead_data
                                .slice(
                                  0,
                                  leadLimit
                                    ? webinar_data.message.lead_data.length
                                    : 3
                                )
                                .map((resp, index) => {
                                  return (
                                    <div
                                      className={`border-b border-b-[#e9e9e9] ${index == 0 ? "pb-[10px]" : "py-[10px]"
                                        } cursor-pointer`}
                                      onClick={() =>
                                        click_data(resp, "lead_data")
                                      }
                                      key={resp.title}
                                    >
                                      {/* <p
                                        className={`text-[#999999] text-[14px] md:text-[12px] font-semibold nunito`}
                                      >
                                        LEAD GENERATION
                                      </p> */}
                                      <div className="flex gap-[15px] justify-between pt-[5px]">
                                        <div className="flex-[0_0_calc(90%_-_15px)] flex gap-[10px] items-center">
                                          <div className="flex-[0_0_calc(9%_-_10px)] md:flex-[0_0_calc(27%_-_10px)]">
                                            <ImageLoader
                                              style={`rounded-[5px] h-[65px] md:h-[65px] w-full`}
                                              src={resp.image ? resp.image : resp.meta_image}
                                              title={resp.title}
                                            />
                                          </div>

                                          <div className="flex-[0_0_calc(50%_-_10px)] md:flex-[0_0_calc(70%_-_10px)]">
                                            <h6 className="text-[16px] md:text-[13px] font-semibold line-clamp-2 ">
                                              {resp.title}
                                            </h6>
                                          </div>
                                        </div>

                                        {/* <div className="flex-[0_0_auto]"> */}
                                        {/* <Image
                                            className="md:h-[15px] md:w-[15px]"
                                            src={"/share.svg"}
                                            height={20}
                                            width={20}
                                            alt="share"
                                          ></Image> */}
                                        {/* </div> */}
                                      </div>

                                      <div className="flex items-center gap-[10px]">
                                        <p
                                          className={`text-[13px] md:text-[12px] text-[#202121B2] border-r border-r-[#000000] pr-[10px]`}
                                        >
                                          {resp.video_count} Video Sessions
                                        </p>
                                        <p
                                          className={`text-[13px] md:text-[12px] text-[#202121B2] border-r border-r-[#000000] px-[10px]`}
                                        >
                                          {resp.reports_count} Research Reports
                                        </p>
                                        <p
                                          className={`text-[13px] md:text-[12px] text-[#202121B2] px-[10px]`}
                                        >
                                          {resp.whitepaper_count} Whitepapers
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </>
                      )}

                    {webinar_data.message.brand_profile_data &&
                      webinar_data.message.brand_profile_data.length > 0 && (
                        <>
                          <div
                            className="py-[20px]"
                            id={"Brand Profile"}
                            data-section
                          >
                            <div className="flex justify-between">
                              <Title
                                data={{ title: "Brand Profile" }}
                                isIcon={true}
                                see={`uppercase !font-semibold !text-[#e21b22]`}
                              />

                              {webinar_data.message.brand_profile_data.length > 4 && (
                                <button
                                  className="mb-4 flex items-center text-[20px] font-bold gap-[5px] cursor-pointer"
                                  onClick={() => setBrandProfileLimit(!brandProfileLimit)}
                                >
                                  <p className={`nunito font-medium`}>
                                    View {brandProfileLimit ? "Less" : "More"}
                                  </p>
                                  <Image
                                    className="h-[11px] w-[5px] object-contain"
                                    src="/forwardIcon.svg"
                                    height={5}
                                    width={5}
                                    alt="View All"
                                  />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-4 md:grid-cols-2 md:gap-[15px] lg:gap-[20px]">
                              {webinar_data.message.brand_profile_data
                                .slice(
                                  0,
                                  brandProfileLimit
                                    ? webinar_data.message.brand_profile_data
                                      .length
                                    : 4
                                )
                                .map((resp) => {
                                  return (
                                    <div
                                      key={resp.title}
                                      className="cursor-pointer"
                                      onClick={() =>
                                        click_data(resp, "brand_profile_data")
                                      }
                                    >
                                      <div className={`${styles.img_div}`}>
                                        <ImageLoader
                                          style={`rounded-[5px] h-[215px] md:h-[140px] w-full ${styles.card_img}`}
                                          src={resp.meta_image}
                                          title={resp.title}
                                        />
                                      </div>
                                      <h6
                                        className={`text-[11px] font-[700] py-[2px] line-clamp-1 text-[#E21B22] uppercase nunito`}
                                      >
                                        {resp.company}
                                      </h6>
                                      <p
                                        className={`text-[15px] md:text-[13px] font-semibold line-clamp-2 nunito`}
                                      >
                                        {resp.title}
                                      </p>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </>
                      )}

                    {webinar_data.message.case_studies_data &&
                      webinar_data.message.case_studies_data.length > 0 && (
                        <>
                          <div
                            className="py-[20px]"
                            id={"Case Studies"}
                            data-section
                          >
                            <div className="flex justify-between">
                              <Title
                                data={{ title: "Case Studies" }}
                                isIcon={true}
                                see={`uppercase !font-semibold !text-[#e21b22]`}
                              // seeMore={true}
                              />

                              {webinar_data.message.case_studies_data.length > 3 && (
                                <button
                                  className="mb-4 flex items-center text-[20px] font-bold gap-[5px] cursor-pointer"
                                  onClick={() => setCaseStudiesLimit(!caseStudiesLimit)}
                                >
                                  <p className={`nunito font-medium`}>
                                    View {caseStudiesLimit ? "Less" : "More"}
                                  </p>
                                  <Image
                                    className="h-[11px] w-[5px] object-contain"
                                    src="/forwardIcon.svg"
                                    height={5}
                                    width={5}
                                    alt="View All"
                                  />
                                </button>
                              )}
                            </div>

                            <div className="grid grid-cols-3 md:grid-cols-1 gap-[15px]">
                              {webinar_data.message.case_studies_data
                                .slice(
                                  0,
                                  caseStudiesLimit
                                    ? webinar_data.message.case_studies_data
                                      .length
                                    : 3
                                )
                                .map((resp) => {
                                  return (
                                    <div
                                      className="border border-[#e9e9e9] rounded-[10px] p-[10px] cursor-pointer"
                                      onClick={() =>
                                        click_data(resp, "case_studies_data")
                                      }
                                      key={resp.title}
                                    >
                                      <div className="relative pb-[5px]">
                                        <ImageLoader
                                          style={`rounded-[10px] h-[215px] md:h-[185px] w-full`}
                                          src={resp.image ? resp.image : resp.meta_image}
                                          title={resp.title}
                                        />
                                        {/* <div className="absolute bottom-[10px] left-0 p-[5px] rounded-[0_10px_0_10px] bg-[#FFE7E7]">
                                          <Image
                                            src={"/pdf_file.svg"}
                                            height={20}
                                            width={20}
                                            alt="pdf"
                                          ></Image>
                                        </div> */}
                                      </div>
                                      <h6
                                        className={`text-[14px] font-semibold  nunito`}
                                      >
                                        {resp.title}
                                      </h6>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        </>
                      )}

                    {webinar_data.message.featured_content_data &&
                      webinar_data.message.featured_content_data.length > 0 && (
                        <>
                          <div
                            className="py-[20px]"
                            id={"Featured Content"}
                            data-section
                          >
                            <div className="flex justify-between">
                              <Title
                                data={{ title: "Featured Content" }}
                                isIcon={true}
                                see={`uppercase !font-semibold !text-[#e21b22]`}
                              // seeMore={true}
                              />

                              {webinar_data.message.featured_content_data.length > 4 && (
                                <button
                                  className="mb-4 flex items-center text-[20px] font-bold gap-[5px] cursor-pointer"
                                  onClick={() => setFeaturedContentLimit(!featuredContentLimit)}
                                >
                                  <p className={`nunito font-medium`}>
                                    View {featuredContentLimit ? "Less" : "More"}
                                  </p>
                                  <Image
                                    className="h-[11px] w-[5px] object-contain"
                                    src="/forwardIcon.svg"
                                    height={5}
                                    width={5}
                                    alt="View All"
                                  />
                                </button>
                              )}
                            </div>

                            <FeaturedContent
                              click_data={click_data}
                              cols={"grid-cols-4 md:grid-cols-2"}
                              webinar_data={webinar_data.message.featured_content_data.slice(
                                0,
                                featuredContentLimit
                                  ? webinar_data.message.featured_content_data
                                    .length
                                  : 4
                              )}
                            />
                          </div>
                        </>
                      )}
                  </div>
                </div>
              </div>
            </>
          )}

        {
          webinar_data  &&
            <>
              {/* Webinar */}
              {category_route == "webinars" && webinar_data && (
                <>
                  <div>
                    {/*Tob Banner */}
                    <Banner data={webinar_data} click_data={click_data} isMobile={isMobile} />

                    {/*Webinar Details */}
                    <div className="py-[20px] container md:p-[15px] md:py-[10px]">
                      {/*Brand Details */}
                      <BrandDetails
                        webinar_data={webinar_data}
                        updateShare={updateShare}
                        dateShow
                        icons={icons}
                      />

                      {/*Overview */}
                      <div className="py-[20px]">
                        {webinar_data.overview && (
                          <>
                            <div>
                              <Title data={{ title: "Overview" }} />
                              <p className="md:text-[16px] lg:text-[18px] font-normal contents text-[#202121B2] text-justify pt-3">
                                {webinar_data.overview}
                              </p>
                            </div>
                          </>
                        )}
                      </div>

                      <div>
                        {webinar_data.video_id && (
                          <>
                            <div>
                              <YouTubeVideo
                                id={webinar_data.video_id}
                                click_data={click_data}
                              />
                            </div>
                          </>
                        )}
                      </div>

                      {/*Key discussion */}
                      <div>
                        {webinar_data.key_points &&
                          webinar_data.key_points.length !== 0 && (
                            <KeyDiscussion
                              setShowMore={setShowMore}
                              webinar_data={webinar_data}
                              showMore={showMore}
                            />
                          )}
                      </div>

                      {/* speakers details */}
                      {webinar_data.speakers &&
                        webinar_data.speakers.length !== 0 && (
                          <>
                            <div className="my-5">
                              <Title data={{ title: "SPEAKERS" }} />
                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
                                {webinar_data.speakers.map((res, i) => (
                                  <div key={i}>
                                    <SpeakerCard data={res} />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}

                      {/* Agenda */}

                      {webinar_data.agenda && webinar_data.agenda.length !== 0 && (
                        <>
                          <div className="py-5">
                            <Title data={{ title: "AGENDA" }} />

                            <div className="">
                              <Agenda data={webinar_data.agenda} />
                            </div>
                          </div>
                        </>
                      )}

                      {/*Who Should Attend */}
                      {webinar_data.who_should_attend && (
                        <>
                          <div className="py-5">
                            <Title data={{ title: "WHO SHOULD ATTEND" }} />

                            <div
                              className={`mt-3 text-[20px] font-medium text-[#202121] tinos bg-[#F2F2F2] rounded-md py-3 px-2 w-fit ${inter.className}`}
                            >
                              <p>{webinar_data.who_should_attend}</p>
                            </div>
                          </div>
                        </>
                      )}

                      {/* contact */}

                      {webinar_data.contact_name &&
                        webinar_data.contact_number &&
                        webinar_data.contact_email && (
                          <>
                            <div className="py-5">
                              <Title data={{ title: "CONTACT US" }} />
                              <div className={`pt-3 ${inter.className}`}>
                                <p className="md:text-base lg:text-lg font-normal break-words tinos">
                                  {`For Delegation | ${webinar_data.contact_name} | ${webinar_data.contact_email} | ${webinar_data.contact_number}`}
                                </p>
                              </div>
                            </div>
                          </>
                        )}

                      {/* bottom banner */}
                      {
                        <div
                          style={{
                            // backgroundImage: `url(${webinar_data.bottom_banner_image
                            //   ? `https://${domain}${webinar_data.bottom_banner_image.replace(
                            //     / /g,
                            //     "%20"
                            //   )}`
                            //   : "/no-image.jpg"
                            //   })`,
                            backgroundImage: `url(${bottomBackgroundImage})`,
                          }}
                          className="p-5 md:p-8 lg:p-10 flex flex-col gap-3 my-5 bg-cover bg-center"
                        >
                          {webinar_data.bottom_banner_title && (
                            <h3 className="text-[24px] md:text-[28px] lg:text-[30px] nunito font-bold">
                              {webinar_data.bottom_banner_title}
                            </h3>
                          )}
                          {webinar_data.bottom_banner_description && (
                            <p className="text-[18px] md:text-[20px] lg:text-[22px] text-[#8D9D9D]">
                              {webinar_data.bottom_banner_description}
                            </p>
                          )}
                          {webinar_data.date && webinar_data.is_buttom_banner_date_required === 1 && (
                            <span className="text-[16px] md:text-[18px] lg:text-[20px] font-medium contents text-[#202121]">
                              {webinar_data.date}
                            </span>
                          )}
                          <button
                            onClick={() => click_data(webinar_data, "register")}
                            className="px-4 py-2 text-sm md:text-base font-bold w-fit mt-2 webinar-btn rounded-md text-white"
                          >
                            Register
                          </button>
                        </div>
                      }

                      {webinar_data.social_media &&
                        webinar_data.social_media.length !== 0 && (
                          <>
                            <SocialMedia data={webinar_data.social_media} />
                          </>
                        )}
                    </div>
                  </div>
                </>
              )}

              {/* Lead Generation */}
              {category_route == "lead-generation" && webinar_data && (
                <>
                  <Banner data={webinar_data} click_data={click_data} isMobile={isMobile} />
                  <div className="py-[20px] container md:p-[15px] md:py-[10px]">
                    <div className="py-[20px]">
                      <BrandDetails
                        webinar_data={webinar_data}
                        updateShare={updateShare}
                        icons={icons}
                      />
                    </div>

                    {webinar_data.overview && (
                      <div className="py-[20px]">
                        <Title data={{ title: "Overview" }} />
                        <p className="md:text-[16px] lg:text-[18px] contents font-normal text-[#202121B2] text-justify mt-3">
                          {webinar_data.overview}
                        </p>
                      </div>
                    )}

                    <div>
                      {webinar_data.key_points &&
                        webinar_data.key_points.length !== 0 && (
                          <KeyDiscussion
                            setShowMore={setShowMore}
                            webinar_data={webinar_data}
                            showMore={showMore}
                          />
                        )}
                    </div>

                    <div>
                      {webinar_data.white_papers && webinar_data.white_papers.length !== 0 && (
                        <div className="mt-5">
                          <Title data={{ title: "WHITE PAPERS" }} />
                          <WhitePaper
                            data={webinar_data.white_papers}
                            click_data={click_data}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      {webinar_data.reports_detail &&
                        webinar_data.reports_detail.length !== 0 && (
                          <div className="mt-5">
                            <Title data={{ title: "REPORTS" }} />
                            <Reports
                              data={webinar_data.reports_detail}
                              click_data={click_data}
                            />
                          </div>
                        )}
                    </div>

                    <div>
                      {webinar_data.video_detail && webinar_data.video_detail.length !== 0 && (
                        <div className="mt-5">
                          <Title data={{ title: "VIDEOS" }} />
                          <Video
                            data={webinar_data.video_detail}
                            click_data={click_data}
                          />
                        </div>
                      )}
                    </div>

                    {webinar_data.articles_detail &&
                      webinar_data.articles_detail.length > 0 && (
                        <>
                          <div className="py-[20px]">
                            <Title data={{ title: "ARTICLES" }} />

                            <FeaturedContent
                              click_data={click_data}
                              article={true}
                              cols={"grid-cols-5 md:grid-cols-2"}
                              webinar_data={webinar_data.articles_detail.slice(
                                0,
                                5
                              )}
                            />
                          </div>
                        </>
                      )}

                    {webinar_data.is_connect_now_required === 1 && (
                      <div>
                        <Form webinar_data={webinar_data} />
                      </div>
                    )}

                    {webinar_data.social_media &&
                      webinar_data.social_media.length !== 0 && (
                        <>
                          <SocialMedia data={webinar_data.social_media} />
                        </>
                      )}
                  </div>
                </>
              )}

              {/* brand Profile */}
              {category_route == "brand-profile" && webinar_data && (
                <>
                  <Banner data={webinar_data} click_data={click_data} isMobile={isMobile} />

                  <div className="py-[20px] container md:p-[15px] md:py-[10px]">
                    <div className="py-[20px]">
                      <BrandDetails
                        webinar_data={webinar_data}
                        updateShare={updateShare}
                        icons={icons}
                      />
                    </div>

                    {webinar_data.overview && (
                      <div className="py-[20px]">
                        <Title data={{ title: "Overview" }} />
                        <p className="md:text-[16px] lg:text-[18px] contents font-normal text-[#202121B2] text-justify mt-3">
                          {webinar_data.overview}
                        </p>
                      </div>
                    )}

                    <div className="">
                      {webinar_data.key_points &&
                        webinar_data.key_points.length !== 0 && (
                          <KeyDiscussion
                            setShowMore={setShowMore}
                            webinar_data={webinar_data}
                            showMore={showMore}
                          />
                        )}
                    </div>

                    <div>
                      {webinar_data.white_papers && webinar_data.white_papers.length !== 0 && (
                        <div className="mt-5">
                          <Title data={{ title: "WHITE PAPERS" }} />
                          <WhitePaper
                            data={webinar_data.white_papers}
                            click_data={click_data}
                          />
                        </div>
                      )}
                    </div>

                    <div>
                      {webinar_data.reports_detail &&
                        webinar_data.reports_detail.length !== 0 && (
                          <div className="mt-5">
                            <Title data={{ title: "REPORTS" }} />
                            <Reports
                              data={webinar_data.reports_detail}
                              click_data={click_data}
                            />
                          </div>
                        )}
                    </div>

                    <div>
                      {webinar_data.video_detail && webinar_data.video_detail.length !== 0 && (
                        <div className="mt-5">
                          <Title data={{ title: "VIDEOS" }} />
                          <Video
                            data={webinar_data.video_detail}
                            click_data={click_data}
                          />
                        </div>
                      )}
                    </div>

                    {webinar_data.articles_detail && webinar_data.articles_detail.length !== 0 && (
                      <div className="py-[20px]">
                        <Title data={{ title: "ARTICLES" }} />

                        <FeaturedContent
                          click_data={click_data}
                          article={true}
                          cols={"grid-cols-5 md:grid-cols-2"}
                          webinar_data={webinar_data.articles_detail}
                        />
                      </div>
                    )}


                    {webinar_data.social_media &&
                      webinar_data.social_media.length !== 0 && (
                        <>
                          <SocialMedia data={webinar_data.social_media} />
                        </>
                      )}
                  </div>
                </>
              )}

              {/* Case Study */}
              {category_route == "case-studies" && webinar_data && (
                <>
                  <Banner data={webinar_data} click_data={click_data} isMobile={isMobile} />

                  <div className="py-[20px] container md:p-[15px] md:py-[10px]">
                    <div className="py-[20px]">
                      <BrandDetails
                        updateShare={updateShare}
                        icons={icons}
                        webinar_data={webinar_data}
                      />
                    </div>

                    <div className="lg:flex gap-5 md:pt-[10px] lg:pt-[20px]">
                      <SideMenu
                        side_menu={side_menu}
                        activateSection={activateSection}
                        activeIndex={activeIndex}
                      />

                      <div className={`md:py-[15px] flex-[0_0_calc(80%_-_15px)]`}>
                        {webinar_data.content_1 &&
                          webinar_data.content_1.length > 0 &&
                          webinar_data.content_1.map((res) => {
                            return (
                              <div id={res.title} data-section className="py-[20px]">
                                <Title data={{ title: res.title }} />
                                <p className="text-[18px] contents font-normal text-[#202121B2] text-justify mt-3">
                                  {res.description}
                                </p>
                              </div>
                            );
                          })}

                        {webinar_data.video_id && (
                          <div>{<YouTubeVideo id={webinar_data.video_id} click_data={click_data} />}</div>
                        )}

                        {webinar_data.content_2 &&
                          webinar_data.content_2.length > 0 &&
                          webinar_data.content_2.map((res) => {
                            return (
                              <div id={res.title} data-section className="py-[20px]">
                                <Title data={{ title: res.title }} />
                                <p className="text-[18px] contents font-normal text-[#202121B2] text-justify mt-3">
                                  {res.description}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                    </div>

                    {webinar_data.articles_detail && webinar_data.articles_detail.length !== 0 && (
                      <div className="py-[20px]">
                        <Title data={{ title: "ARTICLES" }} />

                        <FeaturedContent
                          click_data={click_data}
                          article={true}
                          cols={"grid-cols-5 md:grid-cols-2"}
                          webinar_data={webinar_data.articles_detail}
                        />
                      </div>
                    )}

                    {webinar_data.social_media &&
                      webinar_data.social_media.length !== 0 && (
                        <>
                          <SocialMedia data={webinar_data.social_media} />
                        </>
                      )}
                  </div>
                </>
              )}

              {/* Featured Contente */}
              {category_route == "featured-content" &&
                webinar_data &&
                webinar_data.message && (
                  <>
                    {webinar_data.message.article_detail &&
                      webinar_data.message.article_detail.length > 0 && (
                        <div>
                          <div className={`w-full lg:h-[375px] md:h-[200px]`}>
                            <ImageLoader
                              style={`lg:h-full md:object-contain w-full md:h-[200px]`}
                              src={
                                webinar_data.message.article_detail[0].image
                                  ? webinar_data.message.article_detail[0].image
                                  : webinar_data.message.article_detail[0]
                                    .thumbnail_image
                              }
                              title={webinar_data.message.article_detail[0]["title"]}
                            />
                          </div>

                          <div className="container md:p-[15px] md:py-[10px]">
                            <div className="py-[20px]">
                              <h1 className="text-[22px] md:text-[16px] font-semibold">
                                {webinar_data.message.article_detail[0]["title"]}
                              </h1>

                              <div
                                className={`flex items-center justify-between py-[20px] md:py-[10px]`}
                              >
                                <div
                                  className={`flex items-center gap-[8px] flex-wrap`}
                                >
                                  {webinar_data.message.article_detail[0].publisher &&
                                    webinar_data.message.article_detail[0].publisher
                                      .length != 0 &&
                                    webinar_data.message.article_detail[0].publisher
                                      .slice(0, 1)
                                      .map((r, index) => {
                                        return (
                                          <div
                                            key={index}
                                            className="flex gap-[8px] items-center inner_line"
                                          >
                                            <Image
                                              className="rounded-full object-contain w-[40px] h-[40px]"
                                              priority={true}
                                              src={
                                                r.avatar &&
                                                  r.avatar != "" &&
                                                  r.avatar != ""
                                                  ? check_Image(r.avatar)
                                                  : "/profit.svg"
                                              }
                                              height={43.12}
                                              width={43.12}
                                              alt={"image"}
                                            />
                                            <div className="block">
                                              <h6
                                                className={`font-[700] nunito text-[12px]`}
                                              >
                                                {r.full_name}
                                              </h6>

                                              <div className="flex lg:gap-4 items-center md:gap-[10px] md:justify-between md:hidden">
                                                <div className="flex md:block items-center gap-2">
                                                  <Image
                                                    height={11}
                                                    width={11}
                                                    alt={"image"}
                                                    src={"/views.svg"}
                                                    className="md:m-auto"
                                                  />
                                                  <span className="text-[12px] md:text-[10px] gray-text">
                                                    {webinar_data.message
                                                      .article_detail[0].views
                                                      ? webinar_data.message
                                                        .article_detail[0].views
                                                      : webinar_data.message
                                                        .article_detail[0]
                                                        .no_of_views
                                                        ? webinar_data.message
                                                          .article_detail[0]
                                                          .no_of_views
                                                        : 1}{" "}
                                                    Views
                                                  </span>
                                                </div>
                                                <div className="flex  items-center gap-2">
                                                  <Image
                                                    height={11}
                                                    width={13}
                                                    alt={"image"}
                                                    className="md:h-[13px] md:w-[11px] md:m-auto"
                                                    src={"/shares.svg"}
                                                  />
                                                  <span className="md:text-[10px] text-[12px] gray-text">
                                                    {webinar_data.message
                                                      .article_detail[0]
                                                      .no_of_shares + " shares"}
                                                  </span>
                                                </div>
                                                <div className="flex md:block items-center gap-2">
                                                  <Image
                                                    height={12}
                                                    width={12}
                                                    alt={"image"}
                                                    src={"/time.svg"}
                                                    className="md:m-auto"
                                                  />
                                                  <span className="text-[12px] md:text-[10px] gray-text">
                                                    {
                                                      webinar_data.message
                                                        .article_detail[0].read_time
                                                    }{" "}
                                                  </span>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                </div>

                                {typeof window !== "undefined" && (
                                  <div className="flex items-center gap-[15px] pr-[10px]">
                                    {icons && (
                                      <Dropdowns
                                        noBg={true}
                                        updateShare={(data) => updateShare(data)}
                                        share={true}
                                        copy_link={true}
                                        link={webinar_data.message.article_detail[0]}
                                        type={"articles"}
                                        width={"w-[170px]"}
                                        data={icons}
                                      />
                                    )}
                                  </div>
                                )}
                              </div>

                              <div className="flex md:gap-5 items-center lg:hidden md:p-[5px_0_15px_0]">
                                <div className="flex items-center gap-2">
                                  <Image
                                    height={11}
                                    width={11}
                                    alt={"image"}
                                    src={"/views.svg"}
                                    className="md:m-auto"
                                  />
                                  <span className="text-[12px] md:text-[10px] gray-text">
                                    {webinar_data.message.article_detail[0].views
                                      ? webinar_data.message.article_detail[0].views
                                      : webinar_data.message.article_detail[0]
                                        .no_of_views
                                        ? webinar_data.message.article_detail[0]
                                          .no_of_views
                                        : 1}{" "}
                                    Views
                                  </span>
                                </div>
                                <div className="flex  items-center gap-2">
                                  <Image
                                    height={11}
                                    width={13}
                                    alt={"image"}
                                    className="md:h-[13px] md:w-[11px] md:m-auto"
                                    src={"/shares.svg"}
                                  />
                                  <span className="md:text-[10px] text-[12px] gray-text">
                                    {webinar_data.message.article_detail[0]
                                      .no_of_shares + " shares"}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Image
                                    height={12}
                                    width={12}
                                    alt={"image"}
                                    src={"/time.svg"}
                                    className="md:m-auto"
                                  />
                                  <span className="text-[12px] md:text-[10px] gray-text">
                                    {webinar_data.message.article_detail[0].read_time}{" "}
                                  </span>
                                </div>
                              </div>

                              <h6 className="text-[20px] pb-[15px] md:pb-[10px] md:text-[16px] font-semibold nunito">
                                {webinar_data.message.article_detail[0]["blog_intro"]}
                              </h6>

                              <div
                                dangerouslySetInnerHTML={{
                                  __html:
                                    webinar_data.message.article_detail[0].content,
                                }}
                                id={`innerHtml`}
                                className={`contents  ${"innerHtml"} `}
                              />

                              <div className="flex flex-row gap-3 items-center justify-center py-5">
                                {socials.map((res, index) => {
                                  return (
                                    <div
                                      key={index}
                                      onClick={() =>
                                        updateShare(
                                          webinar_data.message.article_detail[0]
                                        )
                                      }
                                    >
                                      {res.name == "fb" ? (
                                        <FacebookShareButton
                                          url={`${websiteUrl +
                                            webinar_data.message.article_detail[0]
                                              .route
                                            }`}
                                        >
                                          <div
                                            key={index}
                                            className={`rounded-full bg-light-gray p-[10px]`}
                                          >
                                            <Image
                                              src={res.icon}
                                              alt={res.name}
                                              height={25}
                                              width={20}
                                            />
                                          </div>
                                        </FacebookShareButton>
                                      ) : res.name == "ws" ? (
                                        <WhatsappShareButton
                                          url={`${websiteUrl +
                                            webinar_data.message.article_detail[0]
                                              .route
                                            }`}
                                        >
                                          <div
                                            key={index}
                                            className={`rounded-full bg-light-gray p-[10px]`}
                                          >
                                            <Image
                                              src={res.icon}
                                              alt={res.name}
                                              height={25}
                                              width={20}
                                            />
                                          </div>
                                        </WhatsappShareButton>
                                      ) : res.name == "linkedin" ? (
                                        <LinkedinShareButton
                                          url={`${websiteUrl +
                                            webinar_data.message.article_detail[0]
                                              .route
                                            }`}
                                        >
                                          <div
                                            key={index}
                                            className={`rounded-full bg-light-gray p-[10px]`}
                                          >
                                            <Image
                                              src={res.icon}
                                              alt={res.name}
                                              height={25}
                                              width={20}
                                            />
                                          </div>
                                        </LinkedinShareButton>
                                      ) : res.name == "twitter" ? (
                                        <TwitterShareButton
                                          url={`${websiteUrl +
                                            webinar_data.message.article_detail[0]
                                              .route
                                            }`}
                                        >
                                          <div
                                            key={index}
                                            className={`rounded-full bg-light-gray p-[10px]`}
                                          >
                                            <Image
                                              src={res.icon}
                                              alt={res.name}
                                              height={25}
                                              width={20}
                                            />
                                          </div>
                                        </TwitterShareButton>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>

                            {webinar_data.message.featured_content_data &&
                              webinar_data.message.featured_content_data.length >
                              0 && (
                                <>
                                  <div className="py-[20px]">
                                    <Title data={{ title: "Featured Content" }} />

                                    <FeaturedContent
                                      click_data={click_data}
                                      cols={"grid-cols-5 md:grid-cols-2"}
                                      webinar_data={webinar_data.message.featured_content_data.slice(
                                        0,
                                        5
                                      )}
                                    />
                                  </div>
                                </>
                              )}

                            {webinar_data.message.other_articles_data &&
                              webinar_data.message.other_articles_data.length > 0 && (
                                <>
                                  <div className="py-[20px]">
                                    <Title data={{ title: "ARTICLES" }} />

                                    <FeaturedContent
                                      click_data={click_data}
                                      article={true}
                                      cols={"grid-cols-5 md:grid-cols-2"}
                                      webinar_data={webinar_data.message.other_articles_data.slice(
                                        0,
                                        5
                                      )}
                                    />
                                  </div>
                                </>
                              )}


                            {webinar_data.is_connect_now_required === 1 && (
                              <div className="py-5">
                                <Form webinar_data={webinar_data} />
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                  </>
                )}
            </>
        }
      </RootLayout>
    </>
  );
};

export default index;

export async function getServerSideProps({ params }) {
  let page_route = await params.route;
  // // let Id = 'beauty-wellness';
  // const param = {
  //     // "application_type": "mobile",
  //     "route": page_route,
  //     page_no: 1,
  //     page_size: 4
  // }
  // const resp = await HomePage(param);
  // const data = await resp.message;

  // return {
  //     props: { data, page_route }
  // }

  let webinar_data={};

  let category_route = page_route && page_route.length > 0 ? page_route[0] : null;
  if (page_route && Array.isArray(page_route) && page_route.length > 2) {
    page_route = page_route.join("/") + "/"
  } else if(page_route && Array.isArray(page_route) && page_route.length > 1){
    page_route = page_route.join("/")
  } else {
    page_route = page_route.join(" ")
  }


  if (page_route && page_route.length > 1) {
    const param = {
      route: page_route,
      // route: `${page_route[0]}/${page_route[1]}`,
      category: category_route,
      // route: "webinars/reimagine-next--the-future-of-retail",
    };

    const res = await get_web_special_detail(param);
    webinar_data = res.message || null;
  } else {
    webinar_data = null;
  }

  if(webinar_data === null){
    return {
      notFound : true
    }
  }

  return {
    props: { page_route, webinar_data, category_route },
  };
}
