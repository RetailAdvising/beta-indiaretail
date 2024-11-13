import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { check_Image, insert_contact_form, insert_doc } from "@/libs/api";
import style from '@/styles/Components.module.scss'
import styles from '@/styles/checkout.module.scss';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactInfo({contactInfo}){


    useEffect(() => {

    },[])
   
    return (
        <div className="md:flex-col flex rounded-[10px] border lg:mt-10 relative overflow-hidden">
          <div  className="flex flex-col items-center justify-center p-[20px] rounded-[5px] m-[15px] flex-[0_0_calc(40%_-_15px)]  bg-[url('/contactUs.jpg')] md:flex-[0_0_calc(100%_-_0px)]" style={{backgroundSize: 'cover',backgroundRepeat: 'no-repeat', backgroundPosition: 'center center'}}>
            <Image src={'/contact_us.svg'} height={900} width={400}/>
             {/* <p className="text-[15px] py-[7px] flex items-center gap-[7px]">
               <span className="m-0"><Image className=""  src={check_Image(contactInfo.icon)} height={18} width={18} alt="image"></Image></span>
               <span className="text-[15px] text-[#fff] m-0">{contactInfo.address_content}</span>
             </p>

             <p className="text-[15px] pt-[7px] flex items-center gap-[7px]">
               <span className="m-0"><Image className=""  src={check_Image(contactInfo.email_icon)} height={18} width={18} alt="image"></Image></span>
               <span className="text-[15px] text-[#fff]  m-0">{contactInfo.email_id}</span>
             </p>

             <p className="text-[15px] pt-[7px] flex items-center gap-[7px]">
               <span className="m-0"><Image className=""  src={check_Image(contactInfo.phone_icon)} height={18} width={18} alt="image"></Image></span>
               <span className="text-[15px] text-[#fff]  m-0">{contactInfo.phone_no}</span>
             </p> */}
          </div>
          <div className="md:flex-[0_0_calc(100%_-_0px)] flex-[0_0_calc(60%_-_15px)] ">
            <JoinOurTeam style={style} styles={styles} />
          </div>

          {/* <Image className='h-[167px] w-[167px] absolute right-[-60px] bottom-[-55px]' src={'/vantage.svg'} height={100}  width={100} alt='vantage'/> */}

        </div>
    )

}

const JoinOurTeam = ({style, styles}) => {
   
    let relocateList = [
        {value: "Yes", label: "Yes"},
        {value: "No", label: "No"},
    ]

    const { register,handleSubmit, control, reset , setValue, formState: { errors } } = useForm({
      defaultValues: {
        username: '',
        mailid : '', 
        phonenumber:'',
        subject:'', 
        message:'',
      }
    });
    
    useEffect(() => {

    },[])
    
    const onSubmit = (data) => {
        console.log(data);
         insert_contact_forms(data);
    };


    async function insert_contact_forms(data) {
      data.doctype = 'Contact Enquiry';
      data.phone_number = data.phonenumber;
      data.full_name = data.username;
      data.email_id = data.mailid;
      const resp = await insert_doc(data);
      if(resp && resp.message && resp.message.name){
        reset();
        toast.success('Detail updated successfully');
      }else if(resp && resp.status == "failed"){
        toast.error(resp.message);
      }
    }
    
    // async function insert_contact_forms(data) {
    //   const resp = await insert_contact_form({val: JSON.stringify(data)});
    //   console.log(resp)
    //   if(resp && resp.message){
    //     reset();
    //   }
    // }


    const validateEmail = (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(value)) {
          return 'Invalid email address';
        }
        return true; // Return true for a valid email.
      };

  
    const validatePhoneNumber = (value) => {
      if (!value) {
        return 'Phone is required';
      }
      
      if (value.length !== 10) {
        return 'Phone number must be 10 digits';
      }
    
      return true; // Validation passed
    };


    function upload_file(img_data){
      console.log(img_data);
    }

  
    return (
      <>
      {/* <ToastContainer position={'bottom-right'} autoClose={2000}  /> */}
      {/* shadow-[0_0_5px_#DAE0EC] rounded-[10px]  */}
      <form className={`lg:p-[50px] md:p-[25px] md:mt-[20px] `} onSubmit={handleSubmit(onSubmit)}>

                 <h6 className="text-[20px] font-semibold capitalize">Send Us a Message</h6>


                <div className={`box_ flex md:flex-wrap gap-[10px]`}>
                    <div className={`flex-[0_0_calc(50%_-_7px)] md:flex-[0_0_calc(100%_-_0px)]`}>
                    <h6 className="text-[14px] m-[10px_0_0_0] font-medium">First Name</h6>
                    <Controller name="username" control={control} rules={{ required: 'First Name is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="First name" id="username" {...field} />)} />
                    {errors.username && <p className={`${style.danger}`}>{errors.username.message}</p>}
                    </div>
                    <div className={`flex-[0_0_calc(50%_-_7px)] md:flex-[0_0_calc(100%_-_0px)]`}>
                    <h6 className="text-[14px] m-[10px_0_0_0] font-medium">E-mail Id</h6>
                    <Controller name="mailid" control={control} rules={{ validate: validateEmail }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="Email Id" id="mailid" {...field} />)} />
                    {errors.mailid && <p className={`${style.danger}`}>{errors.mailid.message}</p>}
                    </div>
                </div>

                <div className={`box_ flex gap-[10px] md:flex-wrap`}>
                    <div className={`flex-[0_0_calc(50%_-_7px)] md:flex-[0_0_calc(100%_-_0px)]`}>
                    <h6 className="text-[14px] m-[10px_0_0_0] font-medium">Phone Number </h6>
                      <Controller name="phonenumber" control={control} rules={{ validate: validatePhoneNumber }} render={({ field }) => ( <input className={`${styles.custom_input} ${style.input1} w-full`} type="number" placeholder="Phone" id="phonenumber" {...field} />)} />
                      {errors.phonenumber && <p className={`${style.danger}`}>{errors.phonenumber.message}</p>}
                    </div>

                    <div className={`flex-[0_0_calc(50%_-_7px)] md:flex-[0_0_calc(100%_-_0px)]`}>
                    <h6 className="text-[14px] m-[10px_0_0_0] font-medium">Subject</h6>
                      <Controller name="subject" control={control} rules={{ required: 'Subject is required' }} render={({ field }) => ( <input className={`${styles.custom_input} w-full`} type="text" placeholder="Subject" id="subject" {...field} />)} />
                      {errors.subject && <p className={`${style.danger}`}>{errors.subject.message}</p>}
                    </div>
                </div>
        
                <div className={`box_ flex gap-[10px] md:flex-wrap`}>
                    <div className={`flex-[0_0_calc(100%_-_0px)]`}>
                    <h6 className="text-[14px] m-[10px_0_0_0] font-medium">Message</h6>
                    <Controller name="message" control={control} rules={{ required: 'Message is required' }} render={({ field }) => ( 
                    <textarea rows="4" className={`${styles.custom_input} w-full`} type="text" placeholder="Message" id="message" {...field} />)} />
                    {errors.message && <p className={`${style.danger}`}>{errors.message.message}</p>}
                    </div>
                </div>
  
                <div class="flex mt-[25px] justify-center items-center">
                  <button className={`primary_btn text-[14px] h-[40px] w-[25%]`} type="submit" >Submit</button>
                </div>
  
            </form>  
          </>
      
  )}
  




