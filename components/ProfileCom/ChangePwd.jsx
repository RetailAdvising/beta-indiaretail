import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import { update_password } from '@/libs/api';
import dynamic from 'next/dynamic';
const AlertUi = dynamic(()=> import('@/components/common/AlertUi'))
import CryptoJS from 'crypto-js';

export default function ChangePwd({ customerInfo }) {


  const { register, handleSubmit, formState: { errors } } = useForm();
  const [wrong, setWrong] = useState(false);
  const [show, setShow] = useState({ show_1: false, show_2: false, show_3: false })
  const [alertUi, setAlertUi] = useState(false)
  const [alertMsg, setAlertMsg] = useState({})

  async function signup(data) {
    if (data) {
      get_check(data);
    } else {
      setWrong(!wrong);
    }
  }

  function get_check(values) {

    const storedEncryptedPassword = localStorage.getItem('CustomerPwd');
    const bytes = CryptoJS.AES.decrypt(storedEncryptedPassword, 'encryption-key');
    const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (values.old_password != decryptedPassword) {
      setAlertUi(true);
      setAlertMsg({ message: 'Wrong Old Password' });
    } else if (values.old_password == (values.new_password || values.confirm_password)) {
      setAlertUi(true);
      setAlertMsg({ message: 'Old password and new password must be unique..!' });
    } else if (values.confirm_password != values.new_password) {
      setAlertUi(true);
      setAlertMsg({ message: 'New password and confirm password are not matching..!' });
    }
    // else if(values.password == localStorage['CustomerPwd']){
    //   setAlertMsg({message:'Old password and new password must not be same..!'});
    // } 
    else {
      updating(values);
    }

  }

  async function updating(values) {
    let data = { key: "", old_password: values.old_password, user: localStorage['userid'], new_password: values.new_password }
    const res = await update_password(data)
     //console.log(res)
    if (res.message.status === 'Success') {
      setAlertUi(true);
      setAlertMsg({ message: "Password updated successfully" });
    } else {
      setAlertUi(true);
      setAlertMsg({ message: res.message.message });
    }
  }

  function closeModal(value) {
    setAlertUi(false);
    if (value == 'Yes') {

    }
  }

  const updateShow = (value) => {
    let updatedObject;
    if (value == 1) {
      updatedObject = { ...show, show_1: !show.show_1 };
    } else if (value == 2) {
      updatedObject = { ...show, show_2: !show.show_2 };
    } else if (value == 3) {
      updatedObject = { ...show, show_3: !show.show_3 };
    }
    setShow(updatedObject);

  }

  return (
    <>
      {alertUi &&
        <AlertUi isOpen={alertUi} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />
      }

      <div className={`flex-col flex justify-center lg:w-[50%]`}>
        <form onSubmit={handleSubmit((data) => signup(data))} autoComplete='off'>

          <div className={`flex flex-col py-[10px] relative`}>
            <label className={`text-[14px] font-semibold`} htmlFor='password'>Old Password</label>
            <input placeholder='Old Password' type={`${show.show_1 ? 'text' : 'password'}`} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('old_password', { required: { value: true, message: 'Old Password is required' } })} />
            <Image onClick={() => updateShow(1)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.old_password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show.show_1 ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
            {errors.old_password && <p className={`${styles.danger}`}>{errors.old_password.message}</p>}
          </div>

          <div className={`flex flex-col py-[10px] relative`}>
            <label className={`text-[14px] font-semibold`} htmlFor='new_password'>New Password</label>
            <input placeholder='New Password' type={`${show.show_2 ? 'text' : 'password'}`} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('new_password', { required: { value: true, message: 'New Password is required' } })} />
            <Image onClick={() => updateShow(2)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.new_password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show.show_2 ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
            {errors.new_password && <p className={`${styles.danger}`}>{errors.new_password.message}</p>}
          </div>

          <div className={`flex flex-col py-[10px] relative`}>
            <label className={`text-[14px] font-semibold`} htmlFor='confirm_password'>Confirm Password</label>
            <input placeholder='Confirm Password' type={`${show.show_3 ? 'text' : 'password'}`} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('confirm_password', { required: { value: true, message: 'Confirm Password is required' } })} />
            <Image onClick={() => updateShow(3)} className={`absolute  right-[10px] h-[23px] w-[20px] ${errors.confirm_password?.message ? 'bottom-[45px]' : 'bottom-[20px]'}`} src={show.show_3 ? '/login/showPass.svg' : '/login/hidePass.svg'} height={15} width={15} alt={"pass"} />
            {errors.confirm_password && <p className={`${styles.danger}`}>{errors.confirm_password.message}</p>}
          </div>

          <div className='w-[60%] m-[0px_auto] mt-[10px]'>
            <button type="submit" className={`${styles.loginBtn}`}>Update</button>
          </div>

          {wrong && <p className={`${styles.danger}`}>Please check your email or password</p>}

        </form>
      </div>
    </>
  )
}


