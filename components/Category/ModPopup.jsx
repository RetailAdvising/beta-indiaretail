import { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import styles from '@/styles/Components.module.scss'
import { insert_doc } from '@/libs/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function ModPopup({ onClose, customerInfo }) {
    const { register, handleSubmit, formState: { errors },setValue } = useForm();

    const mandatoryData = async (data) => {
        // console.log(data);
        if (data) {
            updateProfile(data)
        }
    }

    useEffect(()=>{
        if(customerInfo && Object.keys(customerInfo).length != 0){
            customerInfo['custom_company_name'] && customerInfo['custom_company_name'] != null && setValue('company_name',customerInfo['custom_company_name'])
            customerInfo['custom_job_title'] && customerInfo['custom_job_title'] != null && setValue('job_title',customerInfo['custom_job_title'])
            customerInfo['custom_location'] && customerInfo['custom_location'] != null && setValue('location',customerInfo['custom_location'])
            customerInfo['custom_industry'] && customerInfo['custom_industry'] != null && setValue('industry',customerInfo['custom_industry'])
        }
    },[])

    async function updateProfile(values) {
        let data = {
            "doctype": "Customers", name: customerInfo['name'],
            custom_company_name: values.company_name,
            custom_job_title: values.job_title,
            custom_location: values.location,
            custom_industry: values.industry,
        }
        const res = await insert_doc(data);
        // console.log(res,'res')
        if (res && res.message) {
            toast.success('Profile updated successfully.');
            localStorage.removeItem('company')
            onClose('yes')
        }

        // console.log(res)
    }
    return (
        <>
            <ToastContainer position={'top-right'} autoClose={2000} />

            <div className={`grid place-content-center h-full`}>
                <form onSubmit={handleSubmit((data) => mandatoryData(data))} autoComplete='off'>
                    <div className='flex items-center justify-between pb-[10px] gap-[10px]'>
                        <div className={`flex flex-col relative flex-[0_0_calc(50%_-_10px)]`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='company_name' >Company Name</label>
                            <input className={`${styles.input} ${styles.input1}`} {...register('company_name', { required: { value: true, message: 'Company Name is required' } },)} />
                            {errors?.company_name && <p className={`${styles.danger}`}>{errors.company_name.message}</p>}
                        </div>
                        <div className={`flex flex-col relative flex-[0_0_calc(50%_-_10px)]`}>
                            <label className={`${styles.label} text-[#808D9E]`} htmlFor='industry' >Industry</label>
                            <input className={`${styles.input} ${styles.input1}`} {...register('industry', { required: { value: true, message: 'Industry is required' } })} />
                            {errors?.industry && <p className={`${styles.danger}`}>{errors.industry.message}</p>}
                        </div>
                    </div>
                    <div className={`flex flex-col pb-[10px] relative`}>
                        <label className={`${styles.label} text-[#808D9E]`} htmlFor='job_title' >Job Title</label>
                        <input className={`${styles.input} ${styles.input1}`} {...register('job_title', { required: { value: true, message: 'Job Title is required' } },)} />
                        {errors?.job_title && <p className={`${styles.danger}`}>{errors.job_title.message}</p>}
                    </div>

                    <div className={`flex flex-col pb-[20px] relative`}>
                        <label className={`${styles.label} text-[#808D9E]`} htmlFor='location' >Location</label>
                        <input className={`${styles.input} ${styles.input1}`} {...register('location', { required: { value: true, message: 'Location is required' } },)} />
                        {errors?.location && <p className={`${styles.danger}`}>{errors.location.message}</p>}
                    </div>

                    <button type="submit" className={`${styles.loginBtn}`}>Submit</button>
                    {/* {wrong && <p className={`${styles.danger}`}>Please check your email or password</p>} */}
                </form>
            </div>
        </>
    )
}
