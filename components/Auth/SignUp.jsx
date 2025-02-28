import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { signUp, logIn, checkMobile, getList, send_otp, verify_otp } from '@/libs/api';
import { useRouter } from 'next/router';
import LogIn from './LogIn';
import { useDispatch } from 'react-redux';
import setUser from 'redux/actions/userAction';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';


export default function SignUp({ isModal, hide, auth }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter()
    const [show, setShow] = useState(false);
    const [wrong, setWrong] = useState(false);
    const [modal, setModal] = useState('');
    const [show_pass, setShowPass] = useState(false)
    let [signupData, setSignUpData] = useState()

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

    const dispatch = useDispatch();

    async function signup(data) {
        if (data) {
            if (data.new_password === data.confirm_password) {
                delete data.confirm_password
                signupData = data
                setSignUpData(signupData)
                checkExistingMobile(data.phone)
            } else {
                toast.error('Password and Confirm Password not matched');
            }

        }
    }

    let [showOtp, setShowOtp] = useState(false)
    const checkExistingMobile = async (number) => {
        let params = {
            doctype: 'Customers',
            fields: ["name", "phone", "first_name"],
            filters: { 'phone': number }
        }
        let resp = await getList(params);
        if (resp.message && resp.message.length != 0) {
            toast.error('Mobile number already exist')
        } else {
            let datas = {
                mobile_no: number
            }
            let val = await send_otp(datas);
            if (val.message.status == 'Success') {
                toast.success("Otp Sent Successfully");
                showOtp = true
                setShowOtp(showOtp)

            } else {
                toast.error("Otp Sent Failed");
            }

        }

    }


    const verifyOtp = async () => {
        let element = document.getElementById('otp_inputs').value
        if (element && element != '') {
            // console.log(signupData,'signupData')
            let params = {
                mobile_no: signupData.phone,
                otp: element,
                verify_number: true
            }

            let resp = await verify_otp(params);
            if (resp.message.status == 'Success') {
                signUpuser(signupData)
            }

        } else {
            toast.warn("Please enter OTP")
        }

    }

    const signUpuser = async (data) => {
        const resp = await signUp(data)
        if (resp.message.status == 'Success') {
            let datas = {
                usr: data.email,
                pwd: data.new_password
            }
            const val = await logIn(datas);
            if (val.message.status == 'Success') {
                localStorage['apikey'] = val.message.api_key
                localStorage['secret'] = val.message.api_secret
                localStorage['userid'] = val.message.user_id;
                localStorage['customer_id'] = val.message.customer_id;
                localStorage['full_name'] = val.full_name;
                localStorage['company'] = "true"

                // Encrypted Password
                const encryptedPassword = CryptoJS.AES.encrypt(data.new_password, 'encryption-key').toString();
                localStorage['CustomerPwd'] = encryptedPassword;
                // checkMember(val.message.roles)
                localStorage['roles'] = JSON.stringify(val.message.roles)
                dispatch(setUser(val))
                isModal || !isMobile ? hide() : router.push('/')
            } else {
                setWrong(!wrong);
                toast.error(val.message.message)
            }

            // isModal ? hide() : router.push('/')
        } else {
            // console.log(resp.message["message:"])
            toast.error(resp.message["message"]);
            // alert(resp.message.message)
            // setWrong(!wrong);
        }
    }


    const hide_and_show = (data) => {
        if (data == 'new') {
            setShowPass(!show_pass);
            // setShow(1)
        } else {
            // setShowPass(data);
            setShow(!show)
        }
    }

    const backToSignup = () => {
        showOtp = false
        setShowOtp(showOtp)
       
    }

    return (
        <>
        
            {(auth && modal != 'login') || isMobile ? <div className='lg:flex container !m-0  gap-5 justify-between h-full '>
                {!isModal && <div className='flex-[0_0_calc(60%_-_10px)] md:hidden cursor-pointer bg-[#E9ECF2] border rounded-[5px] '>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={` w-full h-full object-contain p-[20px]`} />
                </div>}



                {/* md:mt-[40px] */}
                {!showOtp && <div className={` ${isModal ? 'flex-[0_0_calc(100%_-_10px)] h-[calc(87vh_-_10px)] overflow-auto' : 'flex-[0_0_calc(40%_-_10px)] lg:p-[20px_20px_20px_0] md:flex-[0_0_calc(100%_-_10px)] '} flex-col gap-5 md:gap-[10px] flex justify-center`}>
                    {isMobile && <div className=' cursor-pointer'>
                        <Image className='w-full h-[70%] object-contain' onClick={() => router.push('/')} src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>}
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Sign Up</h6>
                    <form onSubmit={handleSubmit((data) => signup(data))} autoComplete='off'>
                        <div className='flex items-center justify-between pb-[10px] gap-[10px]'>
                            <div className={`flex flex-col relative flex-[0_0_calc(50%_-_10px)]`}>
                                <label className={`${styles.label} text-[#808D9E]`} htmlFor='first_name' >First Name</label>
                                <input className={`${styles.input} ${styles.input1}`} {...register('first_name', { required: { value: true, message: 'First Name is required' } },)} />
                                {/* <Image className={`absolute  right-[10px] h-[20px] w-[24px] ${errors.first_name?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/profile-01.svg'} height={15} width={15} alt={"pass"} /> */}
                                {errors?.first_name && <p className={`${styles.danger}`}>{errors.first_name.message}</p>}
                            </div>
                            <div className={`flex flex-col relative flex-[0_0_calc(50%_-_10px)]`}>
                                <label className={`${styles.label} text-[#808D9E]`} htmlFor='last_name' >Last Name</label>
                                <input className={`${styles.input} ${styles.input1}`} {...register('last_name', { required: { value: true, message: 'Last Name is required' } })} />
                                {/* <Image className={`absolute  right-[10px] h-[20px] w-[24px] bottom-[25px]`} src={'/login/profile-01.svg'} height={15} width={15} alt={"pass"} /> */}
                                {errors?.last_name && <p className={`${styles.danger}`}>{errors.last_name.message}</p>}
                            </div>
                        </div>
                        {/* {errors?.first_name && <p className={`${styles.danger}`}>{errors.first_name.message}</p>} */}
                        <div className={`flex flex-col pb-[10px] relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='mobile' >Mobile Number</label>
                            <input type='number' className={`${styles.input} ${styles.input1}`} {...register('phone', { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } },)} />
                            {/* <Image className={`absolute  right-[10px] h-[27px] w-[22px] ${errors.phone?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/mobile.svg'} height={15} width={15} alt={"pass"} /> */}
                            {errors?.phone && <p className={`${styles.danger}`}>{errors.phone.message}</p>}
                        </div>
                        <div className={`flex flex-col pb-[10px] relative`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='email' >Email</label>
                            <input className={`${styles.input} ${styles.input1}`} {...register('email', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                            {/* <Image className={`absolute  right-[10px] h-[20px] w-[25px] ${errors.email?.message ? 'bottom-[50px]' : 'bottom-[25px]'}`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} /> */}
                            {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>}
                        </div>
                        <div className='flex items-center pb-[20px] justify-between gap-[10px]'>
                            <div className={`flex flex-col  relative flex-[0_0_calc(50%_-_10px)]`}>
                                <label className={`text-[#808D9E] ${styles.label}`} htmlFor='password'>Password</label>
                                <input type={`${(show_pass) ? 'text' : 'password'}`} className={`${styles.input} ${styles.input1}`} {...register('new_password', { required: { value: true, message: 'Password is required' } })} />
                                <Image onClick={() => hide_and_show('new')} className={`absolute cursor-pointer object-contain right-[10px] h-[23px] w-[20px] ${errors.new_password?.message ? 'bottom-[30px]' : 'bottom-[10px]'}`} src={(show_pass) ? '/login/eye_open.svg' : '/login/eye_close.svg'} height={15} width={15} alt={"pass"} />
                                {/* <button onClick={()=> setShow(!show)}>show</button> */}
                                {errors.new_password && <p className={`${styles.danger}`}>{errors.new_password.message}</p>}
                            </div>
                            <div className={`flex flex-col  flex-[0_0_calc(50%_-_10px)] relative`}>
                                <label className={`text-[#808D9E] ${styles.label}`} htmlFor='password'>Confirm Password</label>
                                <input type={`${(show) ? 'text' : 'password'}`} className={`${styles.input} ${styles.input1}`} {...register('confirm_password', { required: { value: true, message: 'Confirm Password is required' } })} />
                                <Image onClick={() => hide_and_show('confirm')} className={`absolute object-contain cursor-pointer right-[10px] h-[23px] w-[20px] ${errors.new_password?.message ? 'bottom-[30px]' : 'bottom-[10px]'}`} src={(show) ? '/login/eye_open.svg' : '/login/eye_close.svg'} height={15} width={15} alt={"pass"} />
                                {/* <button onClick={()=> setShow(!show)}>show</button> */}
                                {errors.confirm_password && <p className={`${styles.danger}`}>{errors.confirm_password.message}</p>}
                            </div>
                        </div>

                        <button type="submit" className={`${styles.loginBtn}`}>Signup</button>
                        {/* {wrong && <p className={`${styles.danger}`}>Please check your email or password</p>} */}
                    </form>
                    <p className='pt-[10px] text-[14px]'>already have an account? <span onClick={() => auth ? setModal('login') : router.push('/login')} className='text-[#e21b22] text-[13px] font-semibold cursor-pointer'>login</span></p>
                </div>}

                {showOtp && <div className={`${isModal ? 'flex-[0_0_calc(100%_-_10px)] h-[calc(87vh_-_10px)] overflow-auto' : 'flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] '} relative flex-col gap-5 md:gap-[10px] flex justify-center`}>
                    <div className='absolute top-0 flex items-center cursor-pointer gap-[5px] ' onClick={backToSignup}>
                        <div><Image className='h-[15px] w-[15px] object-contain' src={'/login/back.svg'} height={40} width={60} alt='back button' /></div>
                        <p className={`text-[#959595]`}>Back to signup</p>
                    </div>
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Verify OTP</h6>
                    <div className={`flex flex-col pt-[10px] pb-4 relative`}>
                        <label className={`text-[#808D9E]`} htmlFor='password'>OTP</label>
                        <input id='otp_inputs' type={`number`} className={`${styles.input} ${styles.input1}`} />
                    </div>
                    <button onClick={() => verifyOtp()} className={`${styles.loginBtn}`}>Submit OTP</button>
                </div>}

            </div> : <><LogIn auth={auth} hide={hide} /></>}
        </>
    )
}


