import React, { useState } from 'react'
import { useForm } from 'react-hook-form';

export default function ChangePwd({ isModal, hide }) {
    const { changepwd, handleSubmit, formState: { errors } } = useForm();
    return(
        <></>
        // <>
        //     {
        //          <form onSubmit={handleSubmit((data) => login(data))} autoComplete='off'>
        //          <div className={`flex flex-col pt-[10px] pb-4 relative`}>
        //              <label className={`text-[#808D9E]`} htmlFor='password'>Old Password</label>
        //              <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...changepwd('old_password', { required: { value: true, message: 'Password is required' } })} />
        //              <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
        //              {errors.password && <p className={`${styles.danger}`}>{errors.password.message}</p>}
        //          </div>
        //          <div className={`flex flex-col pt-[10px] pb-4 relative`}>
        //              <label className={`text-[#808D9E]`} htmlFor='password'>New Password</label>
        //              <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...changepwd('new_password', { required: { value: true, message: 'Password is required' } })} />
        //              <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
        //              {errors.password && <p className={`${styles.danger}`}>{errors.password.message}</p>}
        //          </div>
        //          <div className={`flex flex-col pt-[10px] pb-4 relative`}>
        //              <label className={`text-[#808D9E]`} htmlFor='password'>Password</label>
        //              <input type={`${show ? 'text' : 'password'}`} className={`${styles.input} `} {...changepwd('c_password', { required: { value: true, message: 'Password is required' } })} />
        //              <Image onClick={() => setShow(!show)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
        //              {errors.password && <p className={`${styles.danger}`}>{errors.password.message}</p>}
        //          </div>

        //          <div className={`flex items-center justify-between gap-[50px] pb-5`}>
        //              <div className='flex cursor-pointer items-center gap-[10px]'>
        //                  <input type='checkbox' className={`${styles.checkBox} indeterminate:bg-gray-300`} {...changepwd('remember')} />
        //                  {/* <span className={`${styles.checkmark}`}></span> */}
        //                  <span >Remember Me</span>
        //              </div>
        //              <p className='text-blue-500 font-semibold text-[13px] cursor-pointer' onClick={() => router.push('/forget   ')}>Forget Password</p>
        //          </div>
        //          <button type="submit" className={`${styles.loginBtn}`}>Log In</button>
        //          {wrong && <p className='text-center pt-[5px] text-[#ff1010] font-semibold'>Please check your email or password</p>}
        //      </form>
        //     }
        // </>
    )
}