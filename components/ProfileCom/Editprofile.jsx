import { useState } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import { insert_doc } from '@/libs/api';
import { toast } from 'react-toastify';

export default function Editprofile({ customerInfo }) {

  const [loader, setLoader] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();

  async function signup(data) {
    if (data) {
      setLoader(true);
      // console.log(data);
      updateProfile(data)
    }
  }

  async function updateProfile(values) {
    let data = {
      "doctype": "Customers", name: customerInfo['name'],
      first_name: values.first_name,
      last_name: values.last_name,
      custom_company_name: values.custom_company_name,
      custom_job_title: values.custom_job_title,
      custom_location: values.custom_location,
      custom_preferred_category: values.custom_preferred_category
    }
    const res = await insert_doc(data);
    if (res && res.message) {
      setLoader(false);
      toast.success('Profile updated successfully.');
    } else {
      setLoader(false);
    }

    // console.log(res)
  }

  return (
    <>
      {/* <ToastContainer position={'bottom-right'} autoClose={2000} /> */}
      {/* <div className={`flex-col flex justify-center`}> */}
      <form onSubmit={handleSubmit((data) => signup(data))} autoComplete='off' >
        <div className={`flex items-center gap-[20px] flex-wrap justify-between`}>
          <div className={`flex flex-col py-[10px] relative flex-[0_0_calc(50%_-_20px)]`}>
            <label className={`text-[14px] font-semibold`} htmlFor='first_name' >First Name</label>
            <input placeholder='First Name' defaultValue={customerInfo.first_name ? customerInfo.first_name : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('first_name', { required: { value: true, message: 'Full Name is required' } },)} />
            {errors?.first_name && <p className={`${styles.danger}`}>{errors.first_name.message}</p>}
          </div>

          <div className={`flex flex-col relative flex-[0_0_calc(50%_-_20px)]`}>
            <label className={`text-[14px] font-semibold`} htmlFor='first_name' >Last Name</label>
            <input placeholder='Last Name' defaultValue={customerInfo.last_name ? customerInfo.last_name : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('last_name')} />
          </div>

          <div className={`flex flex-col relative flex-[0_0_calc(50%_-_20px)]`}>
            <label className={`text-[14px] font-semibold`} htmlFor='mobile' >Mobile Number</label>
            <input readOnly placeholder='Mobile Number' defaultValue={customerInfo.phone ? customerInfo.phone : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('phone')} />
            {/* { required: { value: true, message: 'Mobile Number is required' }, pattern: { value: /^\d{10}$/, message: "Please enter a valid Mobile Number" } } */}
            {/* {errors?.phone && <p className={`${styles.danger}`}>{errors.phone.message}</p>} */}
          </div>

          <div className={`flex flex-col relative flex-[0_0_calc(50%_-_20px)] `}>
            <label className={`text-[14px] font-semibold`} htmlFor='email' >Email</label>
            <input readOnly defaultValue={customerInfo.email ? customerInfo.email : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('email')} />
            {/* , { required: { value: true, message: 'Email is required' }, pattern: { value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/, message: "Please enter a valid email" } }, */}
            {/* {errors?.email && <p className={`${styles.danger}`}>{errors.email.message}</p>} */}
          </div>

          <div className={`flex flex-col relative flex-[0_0_calc(50%_-_20px)] `}>
            <label className={`text-[14px] font-semibold`} htmlFor='company_name' >Company Name</label>
            <input defaultValue={customerInfo.custom_company_name ? customerInfo.custom_company_name : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('custom_company_name')} />
          </div>
          <div className={`flex flex-col relative flex-[0_0_calc(50%_-_20px)] `}>
            <label className={`text-[14px] font-semibold`} htmlFor='job_title' >Job Title</label>
            <input defaultValue={customerInfo.custom_job_title ? customerInfo.custom_job_title : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('custom_job_title')} />
          </div>
          <div className={`flex flex-col relative flex-[0_0_calc(50%_-_20px)] `}>
            <label className={`text-[14px] font-semibold`} htmlFor='location' >Location</label>
            <input defaultValue={customerInfo.custom_location ? customerInfo.custom_location : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('custom_location')} />
          </div>
          <div className={`flex flex-col relative flex-[0_0_calc(50%_-_20px)] `}>
            <label className={`text-[14px] font-semibold`} htmlFor='custom_preferred_category' >Preferred Category</label>
            <input defaultValue={customerInfo.custom_preferred_category ? customerInfo.custom_preferred_category : ''} className={`h-[40px] rounded-[5px] gray_color px-[10px] mt-[5px] text-[14px]`} {...register('custom_preferred_category')} />
          </div>
        </div>
        <div className='flex justify-end'>
          <div className=' mt-[10px]  w-[20%] max-w-[200px] '>
            <button type="submit" className={`${styles.loginBtn} flex items-center justify-center h-[40px] `}>
              {loader ?
                <div class="animate-spin rounded-full h-[15px] w-[15px] border-l-2 border-t-2 border-white"></div> :
                'Save'
              }
            </button>
          </div>
        </div>
      </form>
      {/* </div> */}
    </>
  )
}