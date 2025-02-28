'use client'
import { useState, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { logIn, checkMobile, checkMember, social_login } from '@/libs/api';
import { useRouter } from 'next/router';
import OTP from './OTP';
import SignUp from './SignUp';
import Forget from './Forget'
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

import { useDispatch } from 'react-redux';
import setUser from 'redux/actions/userAction';
import FbBtn from './FbBtn';
import { GoogleLogin } from '@react-oauth/google';

export default function LogIn({ isModal, hide, auth }) {

    const [show, setShow] = useState(false)
    const [wrong, setWrong] = useState(false)
    const [otp, setOtp] = useState(false)
    const [modal, setModal] = useState('')
    const router = useRouter();
    const dispatch = useDispatch();

    // const cookieStore = cookies();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isMobile, setIsMobile] = useState()
    useEffect(() => {
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

    async function login(data) {

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
                dispatch(setUser(val));
                (isModal || !isMobile) ? hide() : router.push('/')
            } else {
                setWrong(!wrong);
                toast.error(val.message.message)
            }
        }
    }

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

            if (resp._server_messages) {
                let val = await getMessageFromResponse(resp)
                if (val && val == "Error: Value missing for Customers: Phone") {
                    // console.log(val, "val")
                    setShowMob(true)
                    // socialLogin(parseJwt(response.credential))
                } else {
                    toast.error(resp.message.message)
                }
            } else {
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

    return (
        <>
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
                            <div className='flex h-[50px] w-[75px] rounded-[10px] relative border cursor-pointer googleBtn items-center justify-center '>
                                <div className='absolute h-[90%] w-full flex items-center justify-center'>
                                    <Image height={20} className='h-[25px] w-[25px] object-contain' width={20} alt='google' src={'/google-login.svg'} />
                                </div>
                                
                                <GoogleLogin shape='square'
                                    text=' '
                                    size='large'
                                    width={'50px'}
                                    style={{ border: 'none !important',opacity:0 }}
                                    onSuccess={handleSuccess}
                                    onFailure={handleFailure} />
                                {/* <button onClick={() => signIn("google")}>Login with Google</button> */}
                            </div>

                           
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
