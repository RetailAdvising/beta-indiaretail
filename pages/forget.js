// import { forget_password } from '@/libs/api';
// import Image from 'next/image'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form';
// import styles from '@/styles/Components.module.scss'
// import { useRouter } from 'next/router';
import Forget from '@/components/Auth/Forget';
export default function forget() {
    // const { register, handleSubmit, formState: { errors } } = useForm();
    // const router = useRouter();
    // const [wrong,setWrong] = useState(false)
    // async function forgetPass(data) {
    //     if (data) {
    //         // console.log(data);
    //         const resp = await forget_password(data);
    //         console.log(resp);
    //         if(resp.status == "Success"){
    //             alert('Password reset instructions have been sent to your email');
    //             setTimeout(() => {
    //                 router.push('/login')
    //             }, 500);
    //         }else{
    //             setWrong(!wrong)
    //         }
    //     }
    // }
    return (
        <>
        <Forget />
            {/* <div className='flex container md:flex-wrap justify-between p-[30px] '>
                <div className='flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'>
                    <div className=' cursor-pointer '>
                        <Image src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
                    </div>
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div>
                            <h6 className='text-center text-[40px] font-semibold '>Reset Password</h6>
                            <Image src={'/login/reset password.svg'} className='h-[250px] w-full' height={100} width={100} alt='reset' />
                        </div>
                        <form className='w-full' onSubmit={handleSubmit((data) => forgetPass(data))} autoComplete='off'>
                            <div className={`flex flex-col py-5 gap-[10px] relative`}>
                                <label htmlFor='email' className='text-[#808D9E]'>Email</label>
                                <input className='border-none border_bottom p-[5px_10px]' placeholder='Enter your email' {...register('user', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                                <Image className={`absolute  right-[10px] h-[21px] w-[25px] ${errors.user?.message ? 'bottom-[60px]' : 'bottom-[25px]'}`} src={'/login/email.svg'} height={15} width={15} alt={"pass"} />
                                {errors?.user && <p className={`${styles.danger}`}>{errors.user.message}</p>}
                            </div>
                            <button className={`${styles.loginBtn} cursor-pointer`} type='submit'>Send</button>
                            {wrong && <p className={`${styles.danger} text-[14px]`}>Check your E-mail</p>}
                        </form>
                    </div>
                </div>
                <div className='flex-[0_0_calc(60%_-_10px)] md:hidden md:flex-[0_0_calc(100%_-_10px)] bg-[#E9ECF2] border rounded-[5px] p-[20px]'>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={` w-full`} />
                </div>
            </div> */}
        </>
    )
}
