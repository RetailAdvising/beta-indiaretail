import { update_user_password } from '@/libs/api';
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import { useRouter } from 'next/router';

export default function changepwd() {
    const { changepassword, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [wrong, setWrong] = useState(false)
    const [show, setShow] = useState(false)
    async function changePass(data) {
        if (data) {
            // console.log(data);
            // const resp = await update_user_password(data);
            // console.log(resp);
            // if(resp.status == "Success"){
            //     alert('Password reset instructions have been sent to your email');
            //     setTimeout(() => {
            //         router.push('/login')
            //     }, 500);
            // }else{
            //     setWrong(!wrong)
            // }
        }
    }
    return (
        <></>
        // <>
        //     <div className='flex container md:flex-wrap justify-between p-[30px] '>
        //         <div className='flex-[0_0_calc(40%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'>
        //             <div className=' cursor-pointer '>
        //                 <Image src={'/login/indiaretail-logo.png'} height={100} width={200} alt='logo' />
        //             </div>
        //             <div className='flex flex-col items-center justify-center h-full'>
        //                 <div>
        //                     <h6 className='text-center text-[40px] font-semibold '>Change Password</h6>
        //                     <Image src={'/login/reset password.svg'} className='h-[250px] w-full' height={100} width={100} alt='reset' />
        //                 </div>
        //                 <form onSubmit={handleSubmit((data) => changePass(data))} autoComplete='off'>
        //                     <div className={`flex flex-col pt-[10px] pb-4 relative`}>
        //                         <label className={`text-[#808D9E]`} htmlFor='password'>Old Password</label>
        //                         <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...changepassword('old_password', { required: { value: true, message: 'Password is required' } })} />
        //                         <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.old_password ?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
        //                         {errors.old_password && <p className={`${styles.danger}`}>{errors.old_password.message}</p>}
        //                     </div>
        //                     <div className={`flex flex-col pt-[10px] pb-4 relative`}>
        //                         <label className={`text-[#808D9E]`} htmlFor='password'>New Password</label>
        //                         <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...changepassword('new_password', { required: { value: true, message: 'Password is required' } })} />
        //                         <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.new_password ?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
        //                         {errors.new_password && <p className={`${styles.danger}`}>{errors.new_password.message}</p>}
        //                     </div>
        //                     <div className={`flex flex-col pt-[10px] pb-4 relative`}>
        //                         <label className={`text-[#808D9E]`} htmlFor='password'>Password</label>
        //                         <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...changepassword('c_password', { required: { value: true, message: 'Password is required' } })} />
        //                         <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.c_password ?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
        //                         {errors.c_password && <p className={`${styles.danger}`}>{errors.c_password.message}</p>}
        //                     </div>

        //                     <button type="submit" className={`${styles.loginBtn}`}>Update Password</button>
        //                     {/* {wrong && <p className='text-center pt-[5px] text-[#ff1010] font-semibold'>Please check your email or password</p>} */}
        //                 </form>
        //             </div>
        //         </div>
        //         <div className='flex-[0_0_calc(60%_-_10px)] md:hidden md:flex-[0_0_calc(100%_-_10px)] bg-[#E9ECF2] border rounded-[5px] p-[20px]'>
        //             <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={` w-full`} />
        //         </div>
        //     </div>
        // </>
    )
}