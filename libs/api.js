import { domain, website, YOUTUBE_API_KEY } from "./config/siteConfig"
// const methodUrl = `http://${domain}/api/method/`;
const methodUrl = `https://${domain}/api/method/`;
const resourceUrl = `https://${domain}/api/resource/`;
const domainUrl = `india_retailing.india_retailing.api.`;
const ecomUrl = `ecommerce_business_store.ecommerce_business_store.api.`;
const ecomUrlV2 = `ecommerce_business_store.ecommerce_business_store.v2.`;
const subscription = `subscription.subscription.api.`;
const app_name = 'India Retail';

// let apikey;
// let secret;
let razorpay_settings;
let r_pay_color = '#e21b22';

// const router = useRouter();


// if (typeof window !== 'undefined') {
//     // Perform localStorage action
//     // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
//     // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
//     apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
//     secret = localStorage['secret'] ? localStorage['secret'] : undefined;
// }

export const checkMobile = () => {
    if (window.innerWidth < 767) {
        return true;
    } else if (window.innerWidth > 767) {
        return false;
    }
}

export const get_ip = async () => {
    let ip_address = ''
    await fetch('https://jsonip.com/')
        .then((response) => response.json())
        .then((data) => {
            ip_address = data.ip
        })
        .catch((error) => {
            console.error('Error fetching IP address:', error);
            return error
        });
    return ip_address
}


export async function getCartItem() {
    const resp = await get_cart_items();
    if (resp && resp.message && resp.message.status == 'success') {
        let data = resp.message.cart
        return data;
        //   setCartItems(data)
    }
}

//   export async function check_count(quantity,type){
//     let count = quantity
//     if (type == 'inc') {
//       count = quantity + 1;
//     } else if (type == 'dec') {
//       count = quantity - 1;
//     }

//     return count;
//   }

export function stored_customer_info() {
    let users = {}
    users.cust_email = localStorage['userid'] ? localStorage['userid'] : undefined;
    users.user_id = localStorage['userid'] ? localStorage['userid'] : undefined;
    users.cust_name = localStorage['full_name'] ? localStorage['full_name'] : undefined;
    users.customer_id = localStorage['customer_id'] ? localStorage['customer_id'] : undefined;
    return users;
}

export const check_Image = (Image) => {
    let baseUrl = `https://${domain}`
    if (Image) {
        // if (Image.indexOf('https') == -1) {
        //     const encodedImageName = encodeURIComponent(Image);
        //     return baseUrl + encodedImageName;
        // } else if (Image.indexOf('https') == 0) {
        //     return Image;
        // }

        if (!Image.startsWith('https')) {
            // Ensure spaces and special characters are encoded
            const encodedImageName = encodeURIComponent(Image.trim());
            return `${baseUrl}/${encodedImageName}`;
        } 
        
        // If the URL starts with 'https', validate it
        try {
            new URL(Image); // This will throw if the URL is invalid
            return Image;
        } catch (error) {
            // console.error('Invalid URL:', Image);
            return '/empty_state.jpg'; // Fallback image
        }

    } else {
        // return '/empty_state.svg'
        return '/empty_state.jpg'
    }
}

export const seo_Image = (Image) => {
    let baseUrl = `https://${domain}`
    if (Image) {
        if (Image.indexOf('https') == -1) {
            return baseUrl + Image;
        } else if (Image.indexOf('https') == 0) {
            return Image;
        }
    } else {
        return website + '/empty-states.jpg'
    }
}

export const getCurrentUrl = (URl) => {
    return website + URl
}


export async function get_razorpay_settings() {
    const resp = await get_razorpaysetting();
    if (resp && resp.message) {
        return razorpay_settings = resp.message;
    }
}


export function getColor(value) {
    if (value == 'Paid' || value == 'success' || value == 'Active') {
        return '#037D00'
    } else if (value == 'Pending' || value == 'Cancelled') {
        return '#ff0000a3'
    } else if (value == 'Unpaid') {
        return '#E1590D'
    } else if (value == 'Shipped' || value == 'Placed') {
        return '#e0d9cec2'
    } else if (value == 'Order Delivered') {
        return '#02b290'
    } else if (value == 'Pending') {
        return '#ff0000a3'
    } else {
        return '#ddd'
    }
}


// export async function load_razorpay(amount,description,type) {
export const load_razorpay = async (amount, description, type, router) => {
    var options = {
        "key": razorpay_settings.api_key,
        "amount": (amount * 100).toString(),
        "currency": "INR",
        "name": app_name,
        "description": "Payment for" + description,
        "image": (razorpay_settings.site_logo ? check_Image(razorpay_settings.site_logo) : null),
        "prefill": {
            "name": localStorage['full_name'],
            "email": localStorage['userid'],
        },
        "theme": {
            "color": r_pay_color
        },
        "modal": {
            "backdropclose": false,
            "ondismiss": () => { payment_error_callback(description, 'error') }
        },
        "handler": async (response, error) => {
            if (response) {
                //   await razorpay_payment_id(response.razorpay_payment_id)
                if (response.razorpay_payment_id) {
                    return response
                }
                //   let data = { response : { amount : amount,description : description,razorpay_payment_id : response.razorpay_payment_id }}
                //   payment_Success_callback(data,description,type,router);
            } else if (error) {
                payment_error_callback(description, error)
            }

        }
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    document.body.appendChild(script);

    // return () => {
    //   document.body.removeChild(script);
    // };
}


async function razorpay_payment_id(razorpay_payment_id) {
    return razorpay_payment_id
}

function payment_Success_callback(data, order_id, type, router) {

    if (type == 'Subscription') {
        createSubscription(order_id)
    } else if (type == 'Order') {
        order_payment_capture(data['response']['razorpay_payment_id'], data['response']['description'], router);
    }

}




function payment_error_callback(description, error) {
    order_payment_capture(undefined, description);
}

export async function order_payment_capture(id, order_id, router) {
    var updatedate = { 'order_id': order_id, 'transaction_id': id }
    const resp = await update_order_status(updatedate);
    if (resp) {
        router.push('/bookstore')
        // router.push('/thankyou?order_id=' + order_id)
    }
}

export async function createSubscription(order_id) {
    let param = {
        party: localStorage['customer_id'],
        party_name: localStorage['userid'],
        subscription_plan: order_id
    };
    const resp = await insertSubscription(param);
    console.log(resp);
}

export async function trending(event, tag, router) {
    event.stopPropagation();
    router.push("/tag/" + tag.route)
}

export async function postMethod(api, payload) {
    let apikey;
    let secret;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
        // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
        apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
        secret = localStorage['secret'] ? localStorage['secret'] : undefined;
    }
    const myHead = new Headers((apikey && secret) ? { "Authorization": 'token ' + apikey + ':' + secret, "Content-Type": "application/json" } : { "Content-Type": "application/json" })
    // const myHead = new Headers()
    // myHead.append('Content-Type', 'application/json');
    const response = await fetch(methodUrl + api,
        // cache: 'force-cache'
        { method: 'POST', headers: myHead, body: JSON.stringify(payload), }).catch(error => {
            // console.error("Fetch failed:", error);
            console.error("Fetch error object:", error);

            // Check if it's a TypeError, which often happens with network issues
            if (error instanceof TypeError) {
                console.log("Network error or CORS issue:", error.message);
            } else {
                // For other types of errors, log more details
                console.log("Unexpected error:", error.name, error.message);
            }
        });
    // console.error("Unauthorized: ", response);

    if (response && response.status === 401) {
        console.error("Unauthorized: ", response);
        localStorage.clear();
    }
    const data = await response?.json();
    return data;
}
// export async function postMethod(api, payload) {
//     let apikey;
//     let secret;

//     if (typeof window !== 'undefined') {
//         // Retrieve apikey and secret from localStorage
//         apikey = localStorage.getItem('apikey');
//         secret = localStorage.getItem('secret');
//     }

//     // Build headers dynamically based on available apikey/secret
//     let myHead = new Headers(apikey && secret 
//         ? { "Authorization": `token ${apikey}:${secret}`, "Content-Type": "application/json" } 
//         : { "Content-Type": "application/json" }
//     );

//     let response;

//     try {
//         // Attempt the request
//         response = await fetch(methodUrl + api, {
//             method: 'POST',
//             headers: myHead,
//             body: JSON.stringify(payload)
//         });

//         // Check for 401 Unauthorized status
//         if (response.status === 401) {
//             console.error("Unauthorized access. Clearing local storage.");

//             // Clear localStorage
//             localStorage.removeItem('apikey');
//             localStorage.removeItem('secret');

//             // Optionally, return an error message or re-prompt login
//             return { error: "Unauthorized: API key or secret may be invalid." };
//         }

//         // If the response is not okay, log an error
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         // Parse the JSON response
//         const data = await response.json();
//         return data;

//     } catch (error) {
//         // Handle fetch errors (network errors, CORS issues, etc.)
//         console.error("Fetch failed:", error);
//         console.log("Fetch failed:", error);

//         return null;
//         // return { error: "Failed to fetch data. Please check your network or server." };
//     }
// }


export async function GET(api) {
    let apikey;
    let secret;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
        // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
        apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
        secret = localStorage['secret'] ? localStorage['secret'] : undefined;
    }
    // console.log(apikey,"apikey")
    // console.log(secret,"secret")
    const myHead = new Headers((apikey && secret) ? { "Authorization": 'token ' + apikey + ':' + secret, "Content-Type": "application/json" } : { "Content-Type": "application/json" })
    // const myHead = new Headers()
    // myHead.append('Content-Type', 'application/json');
    const response = await fetch(methodUrl + api,
        // cache: 'force-cache'
        { method: 'GET', headers: myHead, })
    const data = await response.json();
    return data;
}

export async function GET_Resource(api) {
    let apikey;
    let secret;
    if (typeof window !== 'undefined') {
        // Perform localStorage action
        // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
        // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
        apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
        secret = localStorage['secret'] ? localStorage['secret'] : undefined;
    }
    const myHead = new Headers((apikey && secret) ? { "Authorization": 'token ' + apikey + ':' + secret, "Content-Type": "application/json" } : { "Content-Type": "application/json" })
    // const myHead = new Headers()
    // myHead.append('Content-Type', 'application/json');
    const response = await fetch(api,
        // cache: 'force-cache'
        { method: 'GET', headers: myHead, })
    const data = await response.json();
    return data;
}

export async function HomePage(data) {
    let api = 'go1_cms.go1_cms.api.get_page_content_with_pagination';
    return await postMethod(api, data)
}

export async function HomePageAds() {
    let api = domainUrl + 'home_page_ads';
    return await GET(api)
}

export async function getAdvertisements(data) {
    let api = domainUrl + 'advertisement';
    return await postMethod(api, data)
}

export async function websiteSettings(data) {
    let api = 'go1_cms.go1_cms.api.get_all_website_settings';
    return await postMethod(api, data)
}

export async function updatePollOptionValue(data) {
    let api = domainUrl + 'update_poll_option';
    return await postMethod(api, data);
}

export async function getPollsList(data) {
    let api = domainUrl + 'get_polls_list';
    return await postMethod(api, data);
}

export async function getTagsList(data) {
    const api = domainUrl + 'get_article_news_by_tag';
    return await postMethod(api, data)
}

export async function get_subscription_plans(data) {
    let api = 'subscription.subscription.api.get_subscription_plans';
    return await postMethod(api, data)
}

export async function getList(data) {
    let api = domainUrl + 'get_list';
    return await postMethod(api, data);
}

export async function get_article_breadcrumb(data) {
    let api = domainUrl + 'get_article_breadcrumb';
    return await postMethod(api, data);
}

export async function articlesList(data) {
    let api = domainUrl + (data.category_route == 'case-studies' ? 'get_case_study_list' : 'article_list');
    return await postMethod(api, data);
}
export async function getDetails(data) {
    let api = domainUrl + "doc_detail";
    return await postMethod(api, data)
}

// Category Landing 
export async function getCategoryList(data) {
    let api = domainUrl + 'list_with_categories';
    return await postMethod(api, data)
}

// Articles Detail
export async function articlesDetail(data) {
    let api = domainUrl + 'article_details';
    return await postMethod(api, data)
}

export async function all_category_list(data) {
    let api = domainUrl + 'all_category_list';
    return await postMethod(api, data)
}


export async function articleNewsDetail(data) {
    let api = domainUrl + 'news_details';
    return await postMethod(api, data)
}


export async function like(data) {
    let api = domainUrl + 'like_dislike';
    return await postMethod(api, data)
}

export async function dislike(data) {
    let api = domainUrl + '_toggle_dislike';
    return await postMethod(api, data)
}

export async function report(data) {
    let api = domainUrl + 'report_update_the_comment';
    return await postMethod(api, data)
}

// Prime Landing
export async function primeLanding(data) {
    let api = domainUrl + 'ir_prime_content';
    return await postMethod(api, data);
}
// Login

export async function logIn(data) {
    let api = domainUrl + 'login';
    return await postMethod(api, data)
}

export async function social_login(data) {
    let api = "ecommerce_business_store.ecommerce_business_store.mobileapi.social_login_customer"
    return await postMethod(api, data)
}

export async function signUp(data) {
    let api = domainUrl + 'user_registration';
    return await postMethod(api, data)
}

export async function forget_password(data) {
    let api = domainUrl + 'forget_password';
    return await postMethod(api, data)
}


export async function insert_doc(data) {
    let datas = { data: data }
    let api = domainUrl + 'insert_doc';
    return await postMethod(api, datas)
}

// Event List
export async function eventList(data) {
    let api = domainUrl + 'event_list';
    return await postMethod(api, data)
}

export async function get_expired_event(data) {
    let api = domainUrl + 'get_expired_event';
    return await postMethod(api, data)
}

export async function commentList(data) {
    let api = domainUrl + 'comment_list';
    return await postMethod(api, data)
}

export async function addComment(data) {
    let api = domainUrl + 'add_comments';
    return await postMethod(api, data)
}


// E-com (Bookstore)
export async function booksLanding() {
    let api = domainUrl + 'magazine_list_with_categories';
    return await GET(api)
}

export async function getCategories() {
    let api = ecomUrl + 'get_parent_categories';
    let data = { domain: domain, show_count: 1 }
    return await postMethod(api, data);
}

export async function getCategoryProduct(data) {
    let api = domainUrl + `magazines`;
    return await postMethod(api, data)
}

export async function getProductDetail(data) {
    let api = ecomUrlV2 + `product.get_product_details`;
    return await postMethod(api, data)
}

export async function getAds(data) {
    let api = domainUrl + 'ad_list';
    return await postMethod(api, data)
}

export async function update_no_of_shares(data) {
    let api = domainUrl + 'update_no_of_shares';
    return await postMethod(api, data)
}

export async function user_roles() {
    let api = domainUrl + 'user_roles';
    return await GET(api)
}

// export async function get_cart_items(data) {
//     let api = domainUrl + 'ecommerce_business_store.ecommerce_business_store.v2.cart.get_cart_items';
//     return await postMethod(api, data)
// }

export async function get_cart_items() {
    let api = ecomUrlV2 + 'cart.get_cart_items';
    return await GET(api)
}

export async function subscriptionPlans() {
    let api = subscription + `list_subscription_plans`;
    return await GET(api)
}

export async function insertSubscription(data) {
    let api = subscription + 'insert_subscription';
    return await postMethod(api, data)
}

export async function insert_member_subscription(data) {
    // let api = subscription + 'insert_member_subscription';
    let api = subscription + 'create_subscription';
    return await postMethod(api, data)
}

export async function make_payment_entry(data) {
    let api = subscription + 'make_payment_entry';
    return await postMethod(api, data)
}

export async function sliders(data) {
    let api = 'go1_cms.go1_cms.api.sliders';
    return await postMethod(api, data)
}

export async function getCartItems(data) {
    let api = ecomUrl + 'get_cartItems';
    return await postMethod(api, data)
}

export async function insertCartItems(data) {
    // let param = {
    //     item_code: data.item,
    //     qty: data.count,
    //     qty_type: "",
    //     rate: data.price,
    //     cartType: "Shopping Cart",
    //     // "customer": "GC-00294"
    // }
    const api = ecomUrlV2 + 'cart.insert_cartItems';
    return await postMethod(api, data)
}

export async function insert_cart_items(data) {
    const api = ecomUrlV2 + 'cart.insert_cart_items';
    return await postMethod(api, data)
}

export async function updateCartItems(data) {
    const api = ecomUrlV2 + 'cart.update_cartitem';
    return await postMethod(api, data)
}

export async function deleteCartItems(data) {
    const api = ecomUrlV2 + 'cart.delete_cart_items';
    return await postMethod(api, data)
}

export async function news_list(data) {
    let api = domainUrl + 'news_list'
    return await postMethod(api, data)
}

//podcast
export async function podcastLanding(data) {
    let api = domainUrl + 'podcast_list_with_categoies';
    return await postMethod(api, data)
}

export async function podcast_list(data) {
    let api = domainUrl + 'podcast_list';
    return await postMethod(api, data)
}

export async function podcast_details(data) {
    let api = domainUrl + 'podcast_details';
    return await postMethod(api, data)
}

// Newsletter
export async function newsLanding() {

    let data = {
        fields: ['custom_day', 'name', 'custom_category', 'custom_description', 'custom_image_', 'custom_title', 'route']
    }

    let value = stored_customer_info()

    if (value && value.user_id) {
        data.email = value.user_id
    }

    let api = domainUrl + 'newsletter_list_with_categories';
    return await postMethod(api, data)
}


export async function newsLetterLanding() {
    let data = {};
    let value = await stored_customer_info()

    if (value && value.user_id) {
        data['email'] = value.user_id
    }

    data['limit'] = 15

    let api = domainUrl + 'get_newsletter_list_by_categories';
    return await postMethod(api, data)
}


export async function newsDetail(data) {
    let api = domainUrl + 'newsletter_details';
    return await postMethod(api, data)
}

export async function get_all_newsletter(data) {
    let api = domainUrl + 'get_all_newsletter';
    return await postMethod(api, data)
}

export async function get_all_newsletter_by_category(data) {
    let api = domainUrl + 'get_all_newsletter_by_category';
    return await postMethod(api, data)
}

export async function get_newsletter_by_id(data) {
    let api = domainUrl + 'get_newsletter_by_id';
    return await postMethod(api, data)
}

export async function insert_banner_ad_log(data) {
    let api = domainUrl + 'insert_banner_ad_log';
    return await postMethod(api, data)
}

export async function newsSubscribe(data) {
    let api = domainUrl + 'subscribe_newsletter';
    return await postMethod(api, data)
}

export async function getTagList(data) {
    let api = domainUrl + 'get_tag_list';
    return await postMethod(api, data)
}

export async function get_country_list() {
    let api = 'ecommerce_business_store.ecommerce_business_store.mobileapi.get_country_list';
    return await GET(api)
}

export async function get_country_states(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.api.get_country_states?country=' + data;
    return await GET(api)
}

export async function get_customer_info(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.api.get_customer_info';
    return await postMethod(api, data)
}

export async function get_payment_method() {
    let data = { domain: domainUrl }
    let api = 'ecommerce_business_store.ecommerce_business_store.api.get_payment_method';
    return await postMethod(api, data)
}

export async function insert_address(data) {
    let datas = { data: JSON.stringify(data) }
    let api = 'ecommerce_business_store.ecommerce_business_store.api.insert_address'
    return await postMethod(api, datas)
}

export async function update_address(data) {
    let datas = { data: JSON.stringify(data) }
    let api = 'ecommerce_business_store.ecommerce_business_store.api.update_address'
    return await postMethod(api, datas)
}

export async function insertOrder(data) {
    let datas = { data: JSON.stringify(data) }
    // let api = 'ecommerce_business_store.ecommerce_business_store.api.insert_order'
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.orders.insert_order'
    return await postMethod(api, datas)
}

export async function delete_address(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.api.delete_address'
    return await postMethod(api, data)
}

export async function update_order_status(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.mobileapi.update_order_status'
    return await postMethod(api, data)
}

export async function get_razorpaysetting(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.api.razor_pay_settings'
    return await GET(api)
}

export async function send_otp(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.send_otp'
    return await postMethod(api, data)
}

export async function verify_otp(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.verify_otp'
    return await postMethod(api, data)
}

export async function update_user_password(data) {
    let api = 'india_retailing.india_retailing.api.update_user_password'
    return await postMethod(api, data)
}


// Videos
export async function video_list_with_categoies(data) {
    let api = domainUrl + 'video_list_with_categoies'
    return await postMethod(api, data)
}

export async function video_list(data) {
    let api = domainUrl + 'video_list'
    return await postMethod(api, data)
}

export async function video_details(data) {
    let api = domainUrl + 'video_details'
    return await postMethod(api, data)
}

export async function search_product(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.whoosh.search_product'
    return await postMethod(api, data)
}

export async function get_customer_order_list(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.get_customer_order_list'
    return await postMethod(api, data)
}

export async function get_order_info(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.v2.customer.get_order_info'
    return await postMethod(api, data)
}

export async function update_password(data) {
    let api = 'ecommerce_business_store.ecommerce_business_store.api.update_password'
    return await postMethod(api, data)
}

export async function get_customer_plan_based_subscritpions(data) {
    let api = 'subscription.subscription.api.get_customer_plan_based_subscritpions'
    return await postMethod(api, data)
}

export async function newsletter_category() {
    // let api = resourceUrl + 'Newsletter Category?fields=["title","route","name"]'
    // return await GET_Resource(api)
}

export async function newsletter_category_list(data) {
    let api = resourceUrl + `Newsletter?fields=["*"]&filters=[["custom_day","=",${JSON.stringify(data)}]]`
    return await GET_Resource(api)
}

export async function get_web_special_detail(data) {
    let api = domainUrl + 'get_web_special_detail';
    return await postMethod(api, data);
}

export async function insert_web_special_registration(data) {
    let api = domainUrl + 'insert_web_special_registration';
    return await postMethod(api, data);
}

export async function check_authorization(data) {

    const post_method = async (api, payload) => {
        const myHead = new Headers({ "Content-Type": "application/json" })
        // const myHead = new Headers()
        // myHead.append('Content-Type', 'application/json');
        const response = await fetch(methodUrl + api,
            // cache: 'force-cache'
            { method: 'POST', headers: myHead, body: JSON.stringify(payload), }).catch(error => {
                // console.error("Fetch failed:", error);
                console.error("Fetch error object:", error);

                // Check if it's a TypeError, which often happens with network issues
                if (error instanceof TypeError) {
                    console.log("Network error or CORS issue:", error.message);
                } else {
                    // For other types of errors, log more details
                    console.log("Unexpected error:", error.name, error.message);
                }
            });
        // console.error("Unauthorized: ", response);

        if (response && response.status === 401) {
            console.error("Unauthorized: ", response);
            localStorage.clear();
        }
        const data = await response?.json();
        return data;
    }


    let api = domainUrl + 'check_authorization';
    return await post_method(api, data);
}

export const checkMember = (data) => {
    if (data && data.length != 0) {
        for (let j = 0; j < data.length; j++) {
            if (data[j]['role'] == 'Member' || data[j]['role'] == 'Member User') {
                localStorage['new_user'] ? localStorage.removeItem('new_user') : null;
                return
            }
        }
        localStorage['new_user'] = localStorage['full_name'] ? localStorage['full_name'] : 'true';
    }
}



// export const getLinkedinPost = async (YOUR_POST_ID) => {
//     let api = `https://api.linkedin.com/v2/shares?q=owners&owners=urn:li:share:${YOUR_POST_ID}`;
//     let apikey;
//     let secret;
//     if (typeof window !== 'undefined') {
//         // Perform localStorage action
//         // apikey = localStorage['apikey'] ? localStorage['apikey'] : "955e1e58eaa8a8e";
//         // secret = localStorage['secret'] ? localStorage['secret'] : "6b5ba30c64e937e";
//         apikey = localStorage['apikey'] ? localStorage['apikey'] : undefined;
//         secret = localStorage['secret'] ? localStorage['secret'] : undefined;
//     }
//     const myHead = new Headers((apikey && secret) ? { "Authorization": 'token ' + apikey + ':' + secret, "Content-Type": "application/json" } : { "Content-Type": "application/json" })
//     // const myHead = new Headers()
//     // myHead.append('Content-Type', 'application/json');
//     const response = await fetch(api,
//         // cache: 'force-cache'
//         { method: 'GET', headers: myHead, })
//     const data = await response.json();
//     return data
// }

export const parseISO8601Duration = (duration) => {
    let match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    let hours = parseInt(match[1]) || 0;
    let minutes = parseInt(match[2]) || 0;
    let seconds = parseInt(match[3]) || 0;

    // If minutes exceed 60, convert them to hours
    if (minutes >= 60) {
        hours += Math.floor(minutes / 60);
        minutes = minutes % 60; // Remaining minutes after converting to hours
    }

    // Convert to a readable format: HH:MM:SS
    return `${hours ? hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};


export const parseDuration = (isoDuration) => {
    if (isoDuration) {
        const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        const hours = parseInt(match[1], 10) || 0;
        const minutes = parseInt(match[2], 10) || 0;
        const seconds = parseInt(match[3], 10) || 0;

        const formattedMinutes =
            hours > 0
                ? `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
                    2,
                    "0"
                )}`
                : String(minutes).padStart(2, "0");
        const formattedSeconds = String(seconds).padStart(2, "0");

        return hours > 0
            ? `${formattedMinutes}:${formattedSeconds}`
            : `${formattedMinutes}:${formattedSeconds}`;
    }
    return '00:00'
};


export const getVideoDuration = async (id) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${YOUTUBE_API_KEY}&part=snippet,contentDetails`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.items) {
        const videoData = data.items[0];

        let details = {
            title: videoData?.snippet?.title,
            description: videoData?.snippet?.description,
            duration: parseDuration(videoData?.contentDetails?.duration),
            thumbnail: videoData?.snippet?.thumbnails?.high.url,
            channelTitle: videoData?.snippet?.channelTitle,
        };

        return await details
    }
}

export const checkAds = (path) => {
    let paths = ["/p/[...route]", "/cart", "/checkout", "/thankyou", "/profile", "/teams", "/aboutus", "/advertise-with-us", "/contact-us","/pr/[detail]","/tag","/tag/[id]","/search"]
    for (let i = 0; i < paths.length; i++) {
        if (paths[i] == path) {
            return true
        }
    }

    return false
}