import { forget_password,checkMobile } from '@/libs/api';
import Image from 'next/image'
import { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import { useRouter } from 'next/router';
import LogIn from './LogIn'
const Forget = ({ auth,hide }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [wrong, setWrong] = useState(false);
    // const [modal,setModal] = useState('');
    const [isMobile, setIsMobile] = useState();
    const [modal,setModal] = useState('')
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
    async function forgetPass(data) {
        if (data) {
            // console.log(data);
            const resp = await forget_password(data);
            // console.log(resp);
            if (resp.status == "Success") {
                alert('Password reset instructions have been sent to your email');
                setTimeout(() => {
                    isMobile ?  router.push('/login') : setModal('login')
                }, 500);
            } else {
                setWrong(!wrong)
            }
        }
    }
    return (
        <>
            {(modal != 'login' && auth) || isMobile ? <div className='flex h-full !m-0 container md:flex-wrap justify-between p-[30px] '>
                <div className='flex-[0_0_calc(60%_-_10px)] md:hidden md:flex-[0_0_calc(100%_-_10px)] bg-[#E9ECF2] border rounded-[5px] '>
                    <Image src={'/image.png'} height={200} width={400} alt={'image retail'} className={`p-[20px] w-full`} />
                </div>
                <div className='flex-[0_0_calc(40%_-_10px)] lg:p-[20px_20px_20px_0] md:flex-[0_0_calc(100%_-_10px)]'>
                    
                    <div className='flex flex-col items-center justify-center h-full'>
                        <div>
                            <h6 className='text-center text-[20px] font-semibold '>Reset Password</h6>
                            <Image src={'/login/reset password.svg'} className='h-[250px] w-full' height={100} width={100} alt='reset' />
                        </div>
                        <form className='w-full' onSubmit={handleSubmit((data) => forgetPass(data))} autoComplete='off'>
                            <div className={`flex flex-col py-5 gap-[10px] relative`}>
                                <label htmlFor='email' className='text-[#808D9E]'>Email</label>
                                <input className='border rounded-[5px] h-[45px] p-[5px_10px]' placeholder='Enter your email' {...register('user', { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } },)} />
                                {errors?.user && <p className={`${styles.danger}`}>{errors.user.message}</p>}
                            </div>
                            <button className={`${styles.loginBtn} cursor-pointer`} type='submit'>Send</button>
                            {wrong && <p className={`${styles.danger} text-[14px]`}>Check your E-mail</p>}
                        </form>
                    </div>
                </div>

            </div> : <><LogIn auth={auth} /></>}
        </>
    )
}

export default Forget;