import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { send_otp, verify_otp, checkMobile,checkMember } from '@/libs/api'
import AlertUi from '../common/AlertUi';
import SignUp from './SignUp';
import { useDispatch, useSelector } from 'react-redux';
import setUser from 'redux/actions/userAction';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

export default function OTP({ setotp, isModal, hide, auth }) {
    const router = useRouter();
    const [show, setShow] = useState(false)
    const [otp, set_otp] = useState(false);
    const [modal, setModal] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isSuccessPopup, setIsSuccessPopup] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    // useEffect(()=>{

    // },[otp])

    async function sent_otp(data) {

        if (data) {
            let datas = {
                mobile_no: data.mobile
            }
            let val = await send_otp(datas);
            // console.log(val)
            if (val.message.status == 'Success') {
                set_otp(true)
                toast.success("Otp Sent Successfully");
                // setAlertMessage({ message: "Otp Sent Successfully" })
                // setIsSuccessPopup(true)
                // OTP sent successfully.

            } else {
                toast.error("Otp Sent Failed");

                // setWrong(!wrong);
                // setAlertMessage({ message: "Otp Sent Failed" })
                // setIsSuccessPopup(true)
            }
        }
    }

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

    const user = useSelector(s => s.user);
    const dispatch = useDispatch();

    async function verifyOtp(data) {
        if (data) {
            // console.log(data)
            let datass = {
                mobile_no: data.mobile,
                otp: data.otp
            }
            let val = await verify_otp(datass);
            // console.log(val);
            if (val.message.status == 'Success') {
                if(val.message.existing_customer == 0){
                    router.push(`${isMobile ? '/profile?my_account=' : '/profile?my_account=edit-profile'}`)
                }
                if (val.message.type == 'Customer') {
                    localStorage['apikey'] = val.message.api_key
                    localStorage['secret'] = val.message.api_secret
                    localStorage['userid'] = val.message.customer_email;
                    localStorage['customer_id'] = val.message.customer_id;
                    localStorage['full_name'] = val.message.customer_name;
                    checkMember(val.message.roles)
                    localStorage['company'] = "true"
                    localStorage['roles'] = JSON.stringify(val.message.roles);
                    
                    dispatch(setUser(val))
                    isMobile ? router.push('/') : hide();
                }
            } else {
                toast.error(val.message.message);
                // setAlertMessage(val.message)
                // setIsSuccessPopup(true)
            }
        }
    }

    async function check(data) {
        // console.log(data)
        data.otp ? verifyOtp(data) : sent_otp(data)
    }

    async function closeModal() {
        setIsSuccessPopup(false)
    }

    function resendOtp() {
        let mobile_no = document.getElementById('mobile_no').value
        sent_otp({ mobile: mobile_no })
    }

    // function verify(data){
    //  let element = document.getElementById(data).value
    // }

    return (
        <>
            {/* {otp && <ToastContainer position={'bottom-right'} autoClose={2000} />} */}
            {(auth && modal != 'signup') || isMobile ? <div className='flex container !m-0 md:justify-center md:p-[15px] h-full gap-[20px] '>
                {!isMobile && <div className={` ${(isModal) ? 'flex-[0_0_calc(100%_-_10px)]' : auth ? 'flex-[0_0_calc(60%_-_10px)]' : 'flex-[0_0_calc(35%_-_10px)] md:flex-[0_0_calc(100%_-_10px)] md:mt-[40px] flex-col justify-center'}  flex `}>
                    {/* {!isModal && <div className=' cursor-pointer '> 
                        <Image src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>} */}
                    {(!isModal && auth) && <div className='flex-[0_0_calc(100%_-_10px)] md:hidden cursor-pointer bg-[#E9ECF2] border rounded-[5px] '>
                        <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={`h-full w-full object-contain p-[20px]`} />
                    </div>}
                </div>}
                <div className='flex-[0_0_calc(40%_-_10px)] lg:p-[20px_20px_20px_0] md:flex-[0_0_calc(100%_-_10px)]'>
                    <h6 className='text-[20px] pb-[10px] font-semibold text-center'>Log In</h6>
                    {isMobile && <div className=' cursor-pointer'>
                        <Image className='w-full h-[70%] object-contain' onClick={() => router.push('/')} src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>}
                    <form onSubmit={handleSubmit((data) => check(data))} autoComplete='off'>
                        {
                            <>
                                <div className={`flex flex-col py-5 relative`}>
                                    <label className={`${styles.label} text-[#808D9E]`} htmlFor='mobile' >Mobile Number</label>
                                    <input id='mobile_no' type='number' className={`${styles.input} ${styles.input1} p-[5px_10px] rounded-[5px] h-[45px] `} style={{ border: '1px solid #EEEE' }} {...register('mobile', { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } })} />
                                    <Image className={`absolute  right-[10px] h-[27px] w-[22px] ${errors.mobile?.message ? 'bottom-[50px]' : 'bottom-[25px]'} object-contain mt-[5px]`} src={'/login/mobile.svg'} height={15} width={15} alt={"pass"} />
                                    {errors?.mobile && <p className={`${styles.danger}`}>{errors.mobile.message}</p>}
                                </div>
                                {otp && <div className={`flex flex-col pt-[10px] pb-4 relative`}>
                                    <label className={`text-[#808D9E]`} htmlFor='password'>OTP</label>
                                    <input id='otp_input' type={`${show ? 'text' : 'number'}`} className={`${styles.input} ${styles.input1}`} {...register('otp', { required: { value: true, message: 'OTP is required' } })} />
                                    {/* <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.otp ?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} /> */}
                                    {errors.otp && <p className={`${styles.danger}`}>{errors.otp.message}</p>}
                                </div>}
                            </>}

                        {/* <div className={`flex items-center justify-between gap-[50px] pb-5`}>
                            <div className='flex cursor-pointer items-center gap-[10px]'>
                                <input type='checkbox' className={`${styles.checkBox} indeterminate:bg-gray-300`} {...register('remember')} />
                                {/* <span className={`${styles.checkmark}`}></span> 
                                <span >Remember Me</span>
                            </div>
                            <p className='text-blue-500 cursor-pointer font-semibold'>Forget Password</p>
                        </div> */}
                        {
                            <>
                                {otp && <p onClick={() => resendOtp()} className='text-[12px] text-end pb-[15px] cursor-pointer hover:underline text-black'>Resend Otp</p>}
                                {
                                    otp ?
                                        <button type="submit" className={`${styles.loginBtn} cursor-pointer`}>Verify OTP</button> : <button type="submit" className={`${styles.loginBtn} cursor-pointer`}>Send OTP</button>
                                }
                            </>
                        }
                        {/* {wrong && <p>Please check you email or password</p>} */}
                    </form>
                    <p className='pt-[10px]'>Not registered yet? <span onClick={() => auth ? setModal('signup') : router.push('/signup')} className='text-[#e21b22] font-semibold cursor-pointer'>Create an account</span></p>
                    <div className='flex items-center pt-[20px] justify-between'><hr style={{ border: '1px dashed #ddd', width: '35%' }} /><span className='text-center  text-[#B5B5BE] w-[30%]'>Instant Login</span><hr style={{ border: '1px dashed #ddd', width: '35%' }} /></div>

                    {/* <p className='text-center pt-[20px] text-[#B5B5BE]'>Instant Login</p> */}
                    <div onClick={() => setotp()} className='flex cursor-pointer gap-[10px] my-[18px] h-[45px] rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/login/Mail.svg'} />
                        <p>Continue With Mail</p>
                    </div>
                    <div className='flex gap-[10px] mb-[18px] cursor-pointer h-[45px] rounded-[5px] border items-center justify-center '>
                        <Image height={20} width={20} alt='google' src={'/google-login.svg'} />
                        <p>Continue with Google</p>
                    </div>
                    <div className='flex gap-[10px] items-center cursor-pointer h-[45px] rounded-[5px] justify-center border'>
                        <Image height={20} width={20} alt='apple' src={'/Apple-login.svg'} />
                        <p>Continue with Apple</p>
                    </div>
                </div>

                {isSuccessPopup && <AlertUi alertMsg={alertMessage && alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"} />}

            </div> : <><SignUp auth={true} /></>}
        </>
    )
}
