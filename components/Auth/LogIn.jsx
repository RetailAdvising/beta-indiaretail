'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { logIn, checkMobile, checkMember, get_customer_info, social_login } from '@/libs/api';
import { useRouter } from 'next/router';
import OTP from './OTP';
import SignUp from './SignUp';
import Forget from './Forget'
// import { signIn, signOut, useSession } from 'next-auth/react'
// import FacebookLogin from 'react-facebook-login';
import {  toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import CryptoJS from 'crypto-js';

// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
import GoogleSignInButton from './GoogleSignInButton';

import { useDispatch } from 'react-redux';
import setUser from 'redux/actions/userAction';
import FbBtn from './FbBtn';
import { GoogleLogin } from '@react-oauth/google';

// const REDIRECT_URI =
//     'https://plenty-planets-beam-42-118-51-2.loca.lt/account/login';


export default function LogIn({ isModal, hide, auth }) {
    // const config = {
    // providers: [
    //     Google({
    //       clientId: "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com",
    //       clientSecret: "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",
    //     }),
    // ]}
    const [show, setShow] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [otp, setOtp] = useState(false)
    const [modal, setModal] = useState('')
    const router = useRouter();
    const dispatch = useDispatch();

    // const cookieStore = cookies();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    // const [ islogin, setislogin] = useState(false)
    // const GoogleLoginButton = ({ onSuccess, onError }) => {
    //     const responseGoogle = (response) => {
    //         if (response && response.profileObj) {
    //         onSuccess(response.profileObj);
    //         } else {
    //         onError("Google authentication failed.");
    //         }
    //     };

    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
        checkIsMobile();
        // const usr = getCookie('usr')
        // const pwd = getCookie('pwd')
        // setValue('email', usr)
        // setValue('password', pwd)
        // console.log(usr, pwd)
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };

        // const script = document.createElement('script');
        // script.src = 'https://accounts.google.com/gsi/client';
        google.accounts.id.initialize({
            client_id: "630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })

        google.accounts.id.renderButton(
            document.getElementById('apple')
            // {theme: "outline", size="large"}
        )



        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '341622788230249',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v11.0',
            });
        };

        // Load the Facebook SDK asynchronously
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');

    }, [])

    function handleCallbackResponse(response) {
        // console.log(response)
    }

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }

    // useEffect(() => {
    //   gapi.load('auth2', function () {
    //     gapi.auth2.init({
    //       client_id: '189689673866-irqdceaurkp36epq803g6gdbcsj0rum7.apps.googleusercontent.com',
    //     });
    //   });
    // }, []);

    async function login(data) {
        // console.log(data)
        // cookieStore.set('usr', data.email, { secure: true, maxAge: 1 })
        // cookieStore.set('pwd', data.password, { secure: true, maxAge: 1 });

        // console.log(cookieStore.getAll())
        if (data) {
            let datas = {
                usr: data.email,
                pwd: data.password
            }
            let val = await logIn(datas);
            if (val.message.status == 'Success') {
                localStorage['apikey'] = val.message.api_key
                localStorage['secret'] = val.message.api_secret
                localStorage['userid'] = val.message.user_id;
                localStorage['customer_id'] = val.message.customer_id;
                localStorage['full_name'] = val.full_name;
                // getCustomerInfo()
                localStorage['company'] = "true"

                // Encrypted Password
                const encryptedPassword = CryptoJS.AES.encrypt(data.password, 'encryption-key').toString();
                localStorage['CustomerPwd'] = encryptedPassword
                checkMember(val.message.roles)
                localStorage['roles'] = JSON.stringify(val.message.roles);
                setWithExpiry('api', val.message.api_key, 90)

                // const day = new Date();
                // document.cookie = `apikey=${val.message.api_key};expires=${day.getTime() + 10};`;
                // document.cookie = `secret=${val.message.api_secret};expires=${day.getTime() + 10};`;
                // document.cookie = `userid=${val.message.user_id};expires=${day.getTime() + 10};`;
                // document.cookie = `customer_id=${val.message.customer_id};expires=${day.getTime() + 10};`;
                // document.cookie = `full_name=${val.full_name};expires=${day.getTime() + 10};`;
                // // document.cookie = `roles=${val.roles};expires=${day.getTime() + 10};`;
                // if (data.remember) {
                //     const day = new Date();
                //     document.cookie = `usr=${data.email};expires=${day.Day() + 90};`;
                //     document.cookie = `pwd=${data.password};expires=${day.Day() + 90};`;
                // }

                // const cook = document.cookie;
                // console.log(cook)
                // console.log(day.getTime() + 10)
                // cookieStore.set('usr', data.email, { secure: true, maxAge: 1 })
                // cookieStore.set('pwd', data.password, { secure: true, maxAge: 1 });
                dispatch(setUser(val));
                (isModal || !isMobile) ? hide() : router.push('/')
            } else {
                setWrong(!wrong);
                toast.error(val.message.message)
            }
        }
    }

    // const getCustomerInfo = async () => {
    //     let data = { guest_id: '', user: localStorage['customer_id'] };
    //     const resp = await get_customer_info(data);
    //     // console.log(resp.message)
    //     if(resp.message && resp.message.length != 0 && resp.message[0]){
    //         // console.log(resp.message)
    //         localStorage['company_name'] = resp.message[0].custom_company_name ? resp.message[0].custom_company_name : undefined
    //         localStorage['industry'] = resp.message[0].custom_industry ? resp.message[0].custom_industry : undefined
    //         localStorage['job_title'] = resp.message[0].custom_job_title ? resp.message[0].custom_job_title : undefined
    //         localStorage['location'] = resp.message[0].custom_location ?  resp.message[0].custom_location : undefined
    //         localStorage['company'] = "true"
    //     }
    // }

    function setWithExpiry(key, value, ttl) {
        const now = new Date()

        // `item` is an object which contains the original value
        // as well as the time when it's supposed to expire
        // var ninetyDaysFromToday = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
        var ninetyDaysFromToday = new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000);
        const item = {
            value: value,
            expiry: ninetyDaysFromToday.toUTCString(),
        }
        // var today = new Date();
        // document.cookie = "sessionTimeout=" + ninetyDaysFromToday.toUTCString() + "; path=/";
        localStorage.setItem(key, JSON.stringify(item))
    }





    // function getCookie(cname) {
    //     let name = cname + "=";
    //     let ca = document.cookie.split(';');
    //     for (let i = 0; i < ca.length; i++) {
    //         let c = ca[i];
    //         while (c.charAt(0) == ' ') {
    //             c = c.substring(1);
    //         }
    //         if (c.indexOf(name) == 0) {
    //             return c.substring(name.length, c.length);
    //         }
    //     }
    //     return "";
    // }



    // async function loginGoogle(){

    // }

    // const handleSuccess = (response) => {
    //     console.log("Google authentication success:", response);
    //     // Handle successful authentication here
    //   };

    //   const handleFailure = (error) => {
    //     console.error("Google authentication error:", error);
    //     // Handle authentication failure here
    //   };

    const responseGoogle = (response) => {
        console.log(response)
        if (response.error === 'popup_closed_by_user') {
            // Handle the error (e.g., display a message to the user)
            console.error('Google login popup closed by the user.');
        } else {
            // Handle successful login
            // console.log('Google login successful:', response);
        }
    };


    //   const FacebookLoginButton = () => {
    const responseFacebook = (response) => {
        console.log(response, "response")
        if (response.status === 'connected') {
            // The user is logged in and authorized your app
            console.log('Logged in and authorized:', response);
        } else {
            // The user is not logged in or did not authorize your app
            console.log('Not logged in or not authorized:', response);
        }
    };
    // };

    // const responseGoogle = (response) => {
    //     if (response && response.profileObj) {
    //     onSuccess(response.profileObj);
    //     } else {
    //     onError("Google authentication failed.");
    //     }
    // };

    const [show_mob, setShowMob] = useState(false)
    const [credential, setCredential] = useState()
    // Google Login
    const handleSuccess = (response) => {
        // console.log(parseJwt(response.credential))
        let val = parseJwt(response.credential)
        setCredential(val)
        socialLogin(parseJwt(response.credential))
        // if (val.phone) {
        //     socialLogin(parseJwt(response.credential))
        // } else {
        //     setShowMob(true)
        // }
    };
    const [mob, setMob] = useState()

    const mobileChange = ($event) => {
        // console.log($event, "event")
        const pattern = /^\d{10}$/;
        setMob($event.target.value)
        // Validate phone number and update message
        const isValid = pattern.test($event.target.value);
        if (isValid) {
            setThrow_err(false)
        } else {
            setThrow_err(true)
        }
    }

    const [submitted, setSubmitted] = useState(false)
    const [throw_err, setThrow_err] = useState(false)
    const submitMobile = () => {
        setSubmitted(true)
        const pattern = /^\d{10}$/;
        // Validate phone number and update message
        const isValid = pattern.test(mob);
        if (isValid) {
            let val = { phone: mob }
            val = { ...credential, ...val }
            setCredential({ ...credential, ...val })
            setTimeout(() => {
                socialLogin(val)
            }, 400);
        } else {
            setThrow_err(true)
        }
    }
    const handleFailure = (error) => {
        console.error('Google Sign-In error:', error);
    };

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));


        return JSON.parse(jsonPayload);
    }

    const socialLogin = async (data) => {
        let payload = {
            data: JSON.stringify({
                email: data.email,
                user_name: data.given_name,
                uid: data.linkedin ? data.sub : data.jti,
                phone: data.phone ? data.phone : '',
                provider: data.linkedin ? 'linkedin-login-oauth2' : "oauth-google"
            }),
            get_user_token: 1
        }

        const resp = await social_login(payload)
        // console.log(resp, "resp")
        if (resp.message && resp.message.message && resp.message.message == 'Logged In') {
            localStorage['apikey'] = resp.message.api_key
            localStorage['api_secret'] = resp.message.api_secret
            localStorage['secret'] = resp.message.api_secret

            // getCustomerInfo({ email: data.email, guest_id: localStorage['customerRefId'] }, datas)
            // let mail = {
            //     email: data.email,
            //     guest_id: localStorage['customerRefId']
            // }
            // const res = await get_customer_info(mail);
            // if (res.message && res.message.length != 0) {
            //     storeCustomerInfo(res);
            //     dispatch(setCustomerInfo(res.message[0]));
            //     dispatch(setDetail(res.message[0]))
            //     localStorage['roles'] = JSON.stringify(res.message[0].roles_list);
            // }
            localStorage['customerUser_id'] = resp.message.user_id;
            localStorage['customer_id'] = resp.message.customer_id ? resp.message.customer_id : resp.message.name;
            localStorage['full_name'] = resp.full_name;
            // hide()

            // getCustomerInfo()
            localStorage['company'] = "true"
            checkMember(resp.message.roles)
            localStorage['roles'] = JSON.stringify(resp.message.roles);
            setWithExpiry('api', resp.message.api_key, 90)
            dispatch(setUser(resp.message));
            (isModal || !isMobile) ? hide() : router.push('/')
        } else {
            // msg = { message: (val.message && val.message.message) ? val.message.message : 'Something wen wrong try again later' }
            // setMsg(msg)
            // headerMsg = 'Alert'
            // setHeaderMsg(headerMsg)
            // setShowAlert(true)
            if (resp._server_messages) {
                let val = await getMessageFromResponse(resp)
                if (val && val == "Error: Value missing for Customers: Phone") {
                    // console.log(val, "val")
                    setShowMob(true)
                    // socialLogin(parseJwt(response.credential))
                }else{
                    toast.error(resp.message.message)
                }
            }else{
                toast.error(resp.message.message)
            }
        }



    }

    function getMessageFromResponse(resp) {
        // Check if _server_messages exists
        try {
            // Try parsing the string as JSON
            let val = JSON.parse(resp._server_messages);

            // Check if the parsed result is an array and contains a string
            if (Array.isArray(val) && val.length > 0) {
                let parsedMessage = JSON.parse(val[0]); // Parse the inner string
                return parsedMessage.message; // Return the message field
            }
        } catch (error) {
            console.error('Error parsing response:', error);
            // Return some default error or message if parsing fails
            return undefined;
        }

    }

    // const responseGoogle = (response) => {
    //     console.log(response);
    //     // Handle the response from Google here (e.g., send it to your server for authentication).
    //   };

    function go_to_home() {
        isModal ? hide() : router.push('/')
    }

    // const [provider, setProvider] = useState('');
    // const [profile, setProfile] = useState();
    // const onLoginStart = useCallback(() => {
    //     alert('login start');
    // }, []);


    // const { linkedInLogin } = useLinkedIn({
    //     clientId: '8676pxylpkogss',
    //     redirectUri: `${window.location.origin}/linkedin`, // for Next.js, you can use `${typeof window === 'object' && window.location.origin}/linkedin`
    //     onSuccess: (code) => {
    //         console.log(code);
    //     },
    //     onError: (error) => {
    //         console.log(error);
    //     },
    // });

    const iframeRef = useRef(null)

    useEffect(() => {
        if (document.readyState === 'complete') {
            onPageLoad();
        } else {
            window.addEventListener('load', onPageLoad);
            // Remove the event listener when component unmounts
            return () => window.removeEventListener('load', onPageLoad);
        }

        setTimeout(() => {
            onPageLoad();
        }, 10000);
    }, [iframeRef])

    function onPageLoad() {
        let iframe = document.querySelector('iframe')
        if (iframe && (iframe.contentDocument || iframe.contentWindow)) {
            // if (iframe.contentDocument) {
            //     // console.log(iframe.contentDocument, "iframe.contentDocument")
            //     let val = iframe.contentDocument ? iframe.contentDocument : document

            //     const divElement = val.querySelector('div[role=button]');
            //     // const divElement = val?.querySelector('div[role=button]');

            //     if (divElement) {
            //         divElement.style.border = 'none';
            //         divElement.querySelector('.nsm7Bb-HzV7m-LgbsSe-BPrWId').style.display = 'none';
            //         divElement.querySelector('span').style.display = 'none';
            //     }
            // }
            const doc = iframe.contentDocument || iframe.contentWindow;

            // if (iframe.contentWindow && iframe.contentWindow.document) {
            // console.log(iframe.contentWindow, "document")
            // const divElement = iframe?.contentWindow?.document?.querySelector('div[role=button]');

            // if (divElement) {
            //     divElement.style.border = 'none';
            //     const buttonClassElement = divElement.querySelector('.nsm7Bb-HzV7m-LgbsSe-BPrWId');
            //     const spanElement = divElement.querySelector('span');

            //     if (buttonClassElement) {
            //         buttonClassElement.style.display = 'none';
            //     }
            //     if (spanElement) {
            //         spanElement.style.display = 'none';
            //     }
            // }

            // } else {
            iframe.addEventListener('load', () => {
                const divElement = doc.querySelector('div[role=button]');

                if (divElement) {
                    divElement.style.border = 'none';
                    const buttonClassElement = divElement.querySelector('.nsm7Bb-HzV7m-LgbsSe-BPrWId');
                    const spanElement = divElement.querySelector('span');

                    if (buttonClassElement) {
                        buttonClassElement.style.display = 'none';
                    }
                    if (spanElement) {
                        spanElement.style.display = 'none';
                    }
                }
            });
            // }
        }
    }


    return (
        <>
            {/* <ToastContainer position={'bottom-right'} autoClose={2000} /> */}
            {/* <div> */}
            {/* <Script src="https://apis.google.com/js/platform.js" async defer />
            <Script src="https://apis.google.com/js/api.js" async defer /> */}
            {/* <Script src="https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=" */}
            {/* <Script src="https://accounts.google.com/gsi/client" async defer strategy="beforeInteractive" /> */}
            {/* </div> */}
            {(!otp && (modal != 'signup' && modal != 'forget')) ? <div className='lg:flex container h-full md:h-[calc(100vh_-_50px)] !m-0 overflow-auto md:p-[0_15px] lg:justify-center gap-[20px] '>
                {(!isModal || auth) && <div className='flex-[0_0_calc(60%_-_10px)] md:hidden bg-[#E9ECF2] cursor-pointer border h-full rounded-[5px] '>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={`w-full p-[20px] ${auth ? 'h-full object-contain' : ''}`} />
                </div>}


                {show_mob ?

                    <>
                        <div className='flex-[0_0_calc(40%_-_10px)] p-[20px_20px_20px_0] flex flex-col justify-center'>
                            <h5 className='text-[20px] font-semibold text-center '>Please enter mobile number to continue</h5>
                            <Image src={'/login/login.svg'} className='h-[250px] w-full my-[15px] object-contain' height={100} width={100} alt='reset' />
                            <div className={`flex flex-col py-5 relative`}>
                                <label className={`${styles.label} text-[#808D9E]`} htmlFor='mobile' >Mobile Number</label>
                                <input id='mobile_no' onChange={mobileChange} type='number' className={`${styles.input} ${styles.input1} p-[5px_10px] rounded-[5px] h-[45px] `} style={{ border: '1px solid #EEEE' }} />
                                <Image className={`absolute  right-[10px] h-[27px] w-[22px] bottom-[25px] object-contain mt-[5px]`} src={'/login/mobile.svg'} height={15} width={15} alt={"pass"} />
                                {(submitted && throw_err) && <p className={`${styles.danger}`}>{'Enter valid mobile no'}</p>}
                            </div>
                            <button type="button" onClick={submitMobile} className={`${styles.loginBtn} `}>Submit</button>
                        </div>

                    </>

                    : <div className={`${isModal ? 'flex-[0_0_calc(100%_-_10px)] relative h-[calc(87vh_-_10px)] overflow-auto' : 'flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] lg:p-[20px_20px_20px_0]'} flex-col flex justify-center`}>
                        {/* {!isModal && <div className=' top-0 left-[10px] cursor-pointer'>
                        <Image onClick={() => go_to_home()} src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>} */}
                        {isMobile && <div className=' cursor-pointer grid justify-center'>
                            <Image className='w-full h-full object-contain' onClick={() => router.push('/')} src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                        </div>}
                        <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Log In</h6>
                        <form onSubmit={handleSubmit((data) => login(data))} autoComplete='off'>
                            <div className={`flex flex-col py-5 relative`}>
                                <label className={`${styles.label} text-[#808D9E]`} htmlFor='email' >Email or Username</label>
                                <div className='border rounded-[5px] flex gap-[10px] mt-[5px] p-[0_10px] h-[40px] items-center'>
                                    {/* absolute  left-[10px] ${errors.email?.message ? 'bottom-[50px]' : 'bottom-[30px]'} */}
                                    {/* <Image className={` h-[20px] w-[25px] object-contain`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} /> */}
                                    <input className={`${styles.input}`} {...register('email', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                                </div>
                                {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>}
                            </div>
                            <div className={`flex flex-col  pb-4 relative`}>
                                <label className={`text-[#808D9E] ${styles.label}`} htmlFor='password'>Password</label>
                                <div className='border rounded-[5px] flex gap-[10px] mt-[5px] p-[0_10px] h-[40px] items-center'>
                                    {/* absolute  left-[10px] ${errors.password?.message ? 'bottom-[45px]' : 'bottom-[25px]'} */}
                                    <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...register('password', { required: { value: true, message: 'Password is required' } })} />
                                    <Image onClick={() => setShow(!show)} className={` h-[23px] w-[20px] cursor-pointer object-contain`} src={show ? '/login/eye_open.svg' : '/login/eye_close.svg'} height={15} width={15} alt={"pass"} />
                                    {/* <button onClick={()=> setShow(!show)}>show</button> */}
                                </div>
                                {errors.password && <p className={`${styles.danger}`}>{errors.password.message}</p>}
                            </div>

                            <div className={`flex items-center justify-between gap-[50px] pb-5`}>
                                <div className='flex cursor-pointer items-center gap-[10px]'>
                                    <input type='checkbox' className={`${styles.checkBox} indeterminate:bg-gray-300 cursor-pointer`} {...register('remember')} />
                                    {/* <span className={`${styles.checkmark}`}></span> */}
                                    <span className='text-[13px]'>Remember Me</span>
                                </div>
                                <p className='text-blue-500 font-semibold text-[13px] cursor-pointer' onClick={() => auth ? setModal('forget') : router.push('/forget')}>Forget Password</p>
                            </div>
                            <button type="submit" className={`${styles.loginBtn} `}>Log In</button>
                            {/* {wrong && <p className='text-center pt-[5px] text-[#ff1010] font-semibold'>Please check your email or password</p>} */}
                        </form>
                        <p className='pt-[10px] text-[13px]'>Not registered yet? <span onClick={() => auth ? setModal('signup') : router.push('/signup')} className='text-[#e21b22] font-semibold cursor-pointer text-[13px]'>Create an account</span></p>
                        <div className='flex items-center pt-[20px] justify-between'><hr style={{ border: '1px dashed #ddd', width: '35%' }} /><span className='text-center  text-[#B5B5BE] w-[30%]'>Instant Login</span><hr style={{ border: '1px dashed #ddd', width: '35%' }} /></div>

                        {/* <p className='text-center pt-[20px] text-[#B5B5BE]'>Instant Login</p> */}

                        <div className='flex gap-[15px] m-[18px_auto] lg:w-[75%] items-center justify-center'>
                            <div className='flex h-[50px] w-[75px] rounded-[10px] border cursor-pointer googleBtn items-center justify-center '>
                                {/* <Image height={20} className='h-[25px] w-[25px] object-contain' width={20} alt='google' src={'/google-login.svg'} /> */}
                                {/* <p>Continue with Google</p> onClick={() => signIn('google')} */}
                                {/* {<GoogleLogin buttonText="" clientId="189689673866-irqdceaurkp36epq803g6gdbcsj0rum7.apps.googleusercontent.com" onSuccess={responseGoogle} onFailure={responseGoogle} cookiePolicy={'single_host_origin'}/>} */}
                                {/* <GoogleOAuthProvider clientId="189689673866-irqdceaurkp36epq803g6gdbcsj0rum7.apps.googleusercontent.com"></GoogleOAuthProvider>; */}
                                {/* <GoogleSignInButton onSuccess={handleSuccess} onFailure={handleFailure} /> */}
                                <GoogleLogin shape='square' ref={iframeRef}
                                    text=' '
                                    size='large'
                                    width={'50px'}
                                    style={{ border: 'none !important' }}
                                    onSuccess={handleSuccess}
                                    onFailure={handleFailure} />
                                {/* <button onClick={() => signIn("google")}>Login with Google</button> */}
                            </div>

                            {/* {false && <div id="apple" className='flex items-center h-[50px] w-[75px] rounded-[10px] cursor-pointer justify-center border'>
                                <Image height={20} onClick={async () => {
                                    await signIn('apple', {
                                        callbackUrl: `${window.location.origin}`,
                                        redirect: true,
                                    })
                                }} className='h-[25px] w-[25px] object-contain cursor-pointer' width={20} alt='apple' src={'/Apple-login.svg'} />
                                
                            </div>} */}

                            {false && <div className='flex  items-center h-[50px] w-[75px] rounded-[10px] cursor-pointer justify-center border'>
                                {/* <Image height={20} className='h-[25px] w-[25px] object-contain' width={20} alt='apple' src={'/login/fb-01.svg'} /> */}
                                <FbBtn />
                                {/* <p>Continue with Facebook</p> */}
                                {
                                    // <FacebookLogin
                                    //     // Login with Facebook
                                    //     textButton=""
                                    //     // p-[8px_40px] flex items-center gap-[10px] text-[13px] border rounded-[3px]
                                    //     cssClass="my-facebook-button-class  "
                                    //     icon="fa-facebook"
                                    //     appId="341622788230249"
                                    //     autoLoad={false} // Set to true if you want auto-login on page load
                                    //     fields="name,email,picture"
                                    //     callback={responseFacebook}
                                    // />
                                }
                            </div>}

                            <div className='flex  items-center h-[50px] w-[75px] rounded-[10px] cursor-pointer justify-center border'>
                                <FbBtn socialLogin={socialLogin} setCredential={setCredential} setShowMob={setShowMob} />
                            </div>

                            {/* <button onClick={() => signIn("google")}>Sign in</button> */}
                        </div>

                        <div onClick={() => setOtp(!otp)} className='flex gap-[10px]  w-[75%] md:w-full m-[0_auto] h-[45px] cursor-pointer rounded-[5px] border items-center justify-center '>
                            <Image height={20} width={20} alt='google' src={'/login/Login-OTP.svg'} />
                            <p className='text-[#808D9E] font-[500]'>Login With OTP</p>
                        </div>
                    </div>}

            </div> : (modal == 'signup' && !otp) ? <><SignUp auth={auth} hide={hide} /></> : (modal == 'forget' && !otp) ? <><Forget auth={auth} hide={hide} /></> : <OTP hide={hide} auth={auth} isModal={isModal} setotp={() => setOtp(!otp)} />
            }

        </>
    )
}

// import GoogleProvider from "next-auth/providers/google" 
// import NextAuth from "next-auth"

// const handler = NextAuth({
//     providers: [
//         GoogleProvider({
//           clientId: process.env.GOOGLE_CLIENT_ID,
//           clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         }),
//         // ...add more providers here
//       ],
// })

// export { handler as GET, handler as POST }


// Login Social

{/* <LoginSocialGoogle
                        client_id={'630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com'}
                        onLoginStart={onLoginStart}
                        redirect_uri={REDIRECT_URI}
                        scope="openid profile email"
                        discoveryDocs="claims_supported"
                        access_type="offline"
                        onResolve={({ provider, data }) => {
                            // setProvider(provider);
                            // setProfile(data);
                            console.log(provider)
                            console.log(data)
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                    >
                        <GoogleLoginButton />
                    </LoginSocialGoogle> */}




{/* <LoginSocialApple
                        client_id={process.env.REACT_APP_APPLE_ID || ''}
                        scope={'name email'}
                        redirect_uri={REDIRECT_URI}
                        onLoginStart={onLoginStart}
                        onResolve={({ provider, data }) => {
                            // setProvider(provider);
                            // setProfile(data);
                            console.log(provider)
                            console.log(data)
                        }}
                        onReject={err => {
                            console.log(err);
                        }}
                    >
                        <AppleLoginButton />
                    </LoginSocialApple> */}
{/* <>{
                        <GoogleLogin
                            clientId="630423705748-pg41popq5up1nsvs08i7n0ia47fkpt01.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                        }
                    </> */}
