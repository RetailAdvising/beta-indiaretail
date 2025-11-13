# Function List - India Retailing Beta Project

This document provides a comprehensive list of all functions used in the India Retailing Next.js project.

## API Functions (libs/api.js)

### Authentication & User Management
| Function | Description | Location |
|----------|-------------|----------|
| `getCartItem()` | Get cart items for user | libs/api.js:50 |
| `stored_customer_info()` | Get stored customer information | libs/api.js:70 |
| `logIn(data)` | User login | libs/api.js:517 |
| `social_login(data)` | Social media login | libs/api.js:522 |
| `signUp(data)` | User registration | libs/api.js:527 |
| `forget_password(data)` | Password recovery | libs/api.js:532 |
| `send_otp(data)` | Send OTP for verification | libs/api.js:816 |
| `verify_otp(data)` | Verify OTP | libs/api.js:821 |
| `update_user_password(data)` | Update user password | libs/api.js:826 |
| `update_password(data)` | Update password | libs/api.js:863 |
| `user_roles()` | Get user roles | libs/api.js:598 |

### Articles & Content Management
| Function | Description | Location |
|----------|-------------|----------|
| `articlesList(data)` | Get articles list | libs/api.js:452 |
| `articlesDetail(data)` | Get article details | libs/api.js:478 |
| `articleNewsDetail(data)` | Get article news details | libs/api.js:489 |
| `get_author_based_article_list(data)` | Get articles by author | libs/api.js:457 |
| `get_article_breadcrumb(data)` | Get article breadcrumb | libs/api.js:447 |
| `commentList(data)` | Get comments | libs/api.js:555 |
| `addComment(data)` | Add comment | libs/api.js:560 |
| `like(data)` | Like article | libs/api.js:495 |
| `dislike(data)` | Dislike article | libs/api.js:500 |
| `report(data)` | Report content | libs/api.js:505 |
| `getCategoryList(data)` | Get category list | libs/api.js:467 |
| `all_category_list(data)` | Get all categories | libs/api.js:483 |
| `getTagsList(data)` | Get tags list | libs/api.js:432 |
| `getTagList(data)` | Get tag list | libs/api.js:756 |
| `update_no_of_shares(data)` | Update share count | libs/api.js:593 |

### E-commerce & Shopping Cart
| Function | Description | Location |
|----------|-------------|----------|
| `get_cart_items()` | Get cart items | libs/api.js:608 |
| `getCartItems(data)` | Get cart items with data | libs/api.js:639 |
| `insertCartItems(data)` | Insert cart items | libs/api.js:644 |
| `insert_cart_items(data)` | Insert cart items (v2) | libs/api.js:657 |
| `updateCartItems(data)` | Update cart items | libs/api.js:662 |
| `deleteCartItems(data)` | Delete cart items | libs/api.js:667 |
| `getProductDetail(data)` | Get product details | libs/api.js:583 |
| `getCategoryProduct(data)` | Get category products | libs/api.js:578 |
| `search_product(data)` | Search products | libs/api.js:848 |
| `getCategories()` | Get categories | libs/api.js:572 |
| `booksLanding()` | Books landing page data | libs/api.js:567 |

### Payment & Orders
| Function | Description | Location |
|----------|-------------|----------|
| `get_razorpay_settings()` | Get Razorpay settings | libs/api.js:128 |
| `get_razorpaysetting(data)` | Get Razorpay setting with data | libs/api.js:811 |
| `order_payment_capture(id, order_id, router)` | Capture payment | libs/api.js:227 |
| `load_razorpay(amount, description, type, router)` | Load Razorpay payment | libs/api.js:156 |
| `insertOrder(data)` | Insert order | libs/api.js:794 |
| `update_order_status(data)` | Update order status | libs/api.js:806 |
| `get_customer_order_list(data)` | Get customer orders | libs/api.js:853 |
| `get_order_info(data)` | Get order information | libs/api.js:858 |
| `make_payment_entry(data)` | Make payment entry | libs/api.js:629 |
| `get_payment_method()` | Get payment methods | libs/api.js:776 |

### Subscription Management
| Function | Description | Location |
|----------|-------------|----------|
| `get_subscription_plans(data)` | Get subscription plans | libs/api.js:437 |
| `subscriptionPlans()` | Get subscription plans | libs/api.js:613 |
| `insertSubscription(data)` | Insert subscription | libs/api.js:618 |
| `insert_member_subscription(data)` | Insert member subscription | libs/api.js:623 |
| `createSubscription(order_id)` | Create subscription | libs/api.js:236 |
| `get_customer_plan_based_subscritpions(data)` | Get customer subscriptions | libs/api.js:868 |

### Content & Media
| Function | Description | Location |
|----------|-------------|----------|
| `HomePage(data)` | Get homepage data | libs/api.js:387 |
| `HomePageAds()` | Get homepage ads | libs/api.js:392 |
| `getAdvertisements(data)` | Get advertisements | libs/api.js:412 |
| `getAds(data)` | Get ads | libs/api.js:588 |
| `sliders(data)` | Get sliders | libs/api.js:634 |
| `websiteSettings(data)` | Get website settings | libs/api.js:417 |
| `primeLanding(data)` | Get prime landing data | libs/api.js:511 |
| `insert_banner_ad_log(data)` | Insert banner ad log | libs/api.js:746 |

### News & Newsletter
| Function | Description | Location |
|----------|-------------|----------|
| `news_list(data)` | Get news list | libs/api.js:672 |
| `newsLanding()` | Get news landing data | libs/api.js:694 |
| `newsDetail(data)` | Get news details | libs/api.js:726 |
| `newsLetterLanding()` | Get newsletter landing | libs/api.js:711 |
| `get_all_newsletter(data)` | Get all newsletters | libs/api.js:731 |
| `get_all_newsletter_by_category(data)` | Get newsletters by category | libs/api.js:736 |
| `get_newsletter_by_id(data)` | Get newsletter by ID | libs/api.js:741 |
| `newsSubscribe(data)` | Subscribe to news | libs/api.js:751 |
| `newsletter_category()` | Get newsletter categories | libs/api.js:873 |
| `newsletter_category_list(data)` | Get newsletter category list | libs/api.js:878 |

### Video & Podcast
| Function | Description | Location |
|----------|-------------|----------|
| `video_list_with_categoies(data)` | Get video list with categories | libs/api.js:833 |
| `video_list(data)` | Get video list | libs/api.js:838 |
| `video_details(data)` | Get video details | libs/api.js:843 |
| `podcastLanding(data)` | Get podcast landing | libs/api.js:678 |
| `podcast_list(data)` | Get podcast list | libs/api.js:683 |
| `podcast_details(data)` | Get podcast details | libs/api.js:688 |

### Events & Special Content
| Function | Description | Location |
|----------|-------------|----------|
| `eventList(data)` | Get event list | libs/api.js:545 |
| `get_expired_event(data)` | Get expired events | libs/api.js:550 |
| `get_web_special_detail(data)` | Get web special details | libs/api.js:883 |
| `insert_web_special_registration(data)` | Insert web special registration | libs/api.js:888 |

### Digital Icons & Polls
| Function | Description | Location |
|----------|-------------|----------|
| `GetDigitalIconList()` | Get digital icon list | libs/api.js:397 |
| `GetDigitalIcon(data)` | Get digital icon | libs/api.js:402 |
| `GetDigitalIconCandidate(data)` | Get digital icon candidate | libs/api.js:407 |
| `getPollsList(data)` | Get polls list | libs/api.js:427 |
| `updatePollOptionValue(data)` | Update poll option value | libs/api.js:422 |

### Location & Address
| Function | Description | Location |
|----------|-------------|----------|
| `get_country_list()` | Get country list | libs/api.js:761 |
| `get_country_states(data)` | Get country states | libs/api.js:766 |
| `get_customer_info(data)` | Get customer info | libs/api.js:771 |
| `insert_address(data)` | Insert address | libs/api.js:782 |
| `update_address(data)` | Update address | libs/api.js:788 |
| `delete_address(data)` | Delete address | libs/api.js:801 |

### Core API Functions
| Function | Description | Location |
|----------|-------------|----------|
| `postMethod(api, payload)` | POST method | libs/api.js:251 |
| `GET(api)` | GET method | libs/api.js:345 |
| `GET_Resource(api)` | GET resource method | libs/api.js:367 |
| `getList(data)` | Get generic list | libs/api.js:442 |
| `getDetails(data)` | Get generic details | libs/api.js:461 |
| `getIrstudioList()` | Get IR studio list | libs/api.js:472 |
| `insert_doc(data)` | Insert document | libs/api.js:538 |
| `trending(event, tag, router)` | Handle trending | libs/api.js:246 |

## Utility Functions

### Common Utilities (libs/common.js & libs/api.js)
| Function | Description | Location |
|----------|-------------|----------|
| `checkMobile()` | Check if device is mobile | libs/api.js:27 |
| `get_ip()` | Get IP address | libs/api.js:35 |
| `check_Image(Image)` | Check image URL | libs/api.js:79 |
| `seo_Image(Image)` | SEO image processing | libs/api.js:110 |
| `getCurrentUrl(URl)` | Get current URL | libs/api.js:123 |
| `getColor(value)` | Get color based on value | libs/api.js:136 |

### Payment Processing
| Function | Description | Location |
|----------|-------------|----------|
| `razorpay_payment_id(razorpay_payment_id)` | Process Razorpay payment ID | libs/api.js:206 |
| `payment_Success_callback(data, order_id, type, router)` | Payment success callback | libs/api.js:210 |
| `payment_error_callback(description, error)` | Payment error callback | libs/api.js:223 |

## Component Functions

### Layout Components
| Function | Description | Location |
|----------|-------------|----------|
| `RootLayout({ children, checkout, isLanding, head, homeAd, data, header_data, is_detail, adIdH, adIdF, ad_payload })` | Root layout | layouts/RootLayout.js:20 |
| `MainFooter({ footerData, isMobile })` | Main footer component | components/Footer/MainFooter.jsx:8 |
| `setFooter1(data)` | Set footer data | components/Footer/MainFooter.jsx:23 |

### Authentication Components
| Function | Description | Location |
|----------|-------------|----------|
| `SignUp({ isModal, hide, auth })` | Signup component | components/Auth/SignUp.jsx:14 |
| `signup(data)` | Signup function | components/Auth/SignUp.jsx:39 |
| `checkExistingMobile(number)` | Check existing mobile | components/Auth/SignUp.jsx:54 |
| `verifyOtp()` | Verify OTP | components/Auth/SignUp.jsx:82 |
| `signUpuser(data)` | Sign up user | components/Auth/SignUp.jsx:103 |
| `hide_and_show(data)` | Hide and show function | components/Auth/SignUp.jsx:141 |
| `backToSignup()` | Back to signup | components/Auth/SignUp.jsx:151 |
| `checkIsMobile()` | Check if mobile | components/Auth/SignUp.jsx:32 |

### About Us Components
| Function | Description | Location |
|----------|-------------|----------|
| `About({item})` | About component | components/Aboutus/about.jsx:4 |
| `Values({data})` | Values component | components/Aboutus/values.jsx:5 |
| `Publications({data})` | Publications component | components/Aboutus/publications.jsx:6 |
| `Exhibitions({data})` | Exhibitions component | components/Aboutus/exhibitions.jsx:6 |
| `Events({data})` | Events component | components/Aboutus/events.jsx:6 |
| `Books({data})` | Books component | components/Aboutus/books.jsx:11 |

### Advertise Components
| Function | Description | Location |
|----------|-------------|----------|
| `Enquiry({ data })` | Enquiry component | components/Advertise/Enquiry.jsx:2 |
| `Partners({ data })` | Partners component | components/Advertise/Partners.jsx:4 |
| `Contact({ data })` | Contact component | components/Advertise/Contact.jsx:2 |
| `MultipleRoutes({ data })` | Multiple routes component | components/Advertise/MultipleRoutes.jsx:3 |
| `BrandsGrowth({ data })` | Brands growth component | components/Advertise/BrandsGrowth.jsx:3 |
| `Foster({ data })` | Foster component | components/Advertise/Foster.jsx:3 |

## Page Components

### Main Pages
| Function | Description | Location |
|----------|-------------|----------|
| `Error()` | 404 error page | pages/404.js:5 |
| `Errors()` | 500 error page | pages/500.js:4 |
| `addAddress()` | Add address page | pages/add-address.js:4 |
| `Aboutus({data})` | About us page | pages/aboutus/index.js:13 |
| `Advertise({ data })` | Advertise page | pages/advertise-with-us/index.js:12 |
| `Details({ data, page_route })` | Articles page | pages/articles/index.js:11 |

### Page Utility Functions
| Function | Description | Location |
|----------|-------------|----------|
| `generateMetaData(data)` | Generate meta data | pages/articles/index.js:23 |
| `articleDetail(route)` | Get article detail | pages/articles/index.js:34 |
| `ads()` | Get ads | pages/articles/index.js:91 |

### Next.js Static Generation
| Function | Description | Location |
|----------|-------------|----------|
| `getStaticProps()` | Static props for about us | pages/aboutus/index.js:75 |
| `getStaticProps()` | Static props for advertise | pages/advertise-with-us/index.js:63 |

## Redux State Management

### Actions & Reducers
- User actions and reducers (redux/actions/userAction.js, redux/reducers/)
- Route management (redux/actions/routesAction.js)
- Pagination (redux/actions/paginationAction.js)
- Mobile detection (redux/actions/isMobileAction.js)
- Customer info (redux/actions/customerInfoAction.js)
- Comments (redux/actions/commentsReducer.js)
- Alert management (redux/actions/alertAction.js)
- Role management (redux/actions/roleAction.js)

## Configuration

### Site Configuration (libs/config/siteConfig.js)
- `domain` - API domain
- `website` - Website URL
- `websiteUrl` - Website URL
- `YOUTUBE_API_KEY` - YouTube API key

---

**Total Functions: 100+ functions**

This project is a comprehensive e-commerce and content management system for India Retailing with features including:
- User authentication and management
- Article and content management
- E-commerce functionality
- Payment processing
- Subscription management
- News and newsletters
- Video and podcast content
- Event management
- Digital icons and polls
- Location services

*Generated on: 2025-09-29*