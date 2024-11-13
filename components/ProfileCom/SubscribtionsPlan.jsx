import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'
import {  get_customer_plan_based_subscritpions, getColor } from '@/libs/api';
import NoProductFound from '@/components/common/NoProductFound';

export default function SubscribtionsPlan({ index, payNow, type }) {
  
  const router = useRouter();
  const [planList,setPlanList] = useState([])
  let [Skeleton,setSkeleton] = useState(true);

  useEffect(() => {
    setPlanList([]);
    get_sub_plans()
  },[index])  

async function get_sub_plans(){
    let data = { customer_id:localStorage['customer_id'],subscription_type:type };
    const resp = await get_customer_plan_based_subscritpions(data);
    // console.log(resp);
      if (resp && resp.message && resp.message.length != 0) {
        resp.message = type == 'member' ? [resp.message[0]] : resp.message
        setPlanList((d)=> d = [...d,...resp.message]);
        setSkeleton(false);
      }else{
        setSkeleton(false);
        // no_product = true;
        // setPlanList([]) : null
      }
}

const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

 // Replace this with your date object
 const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
 };

 function getDaysCount(end){

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(today.getDate()).padStart(2, '0');
  let start = `${year}-${month}-${day}`;
  let date1 = new Date(start);  
  let date2 = new Date(end);  

  var time_difference = date2.getTime() - date1.getTime();  
  var days_difference = time_difference / (1000 * 60 * 60 * 24);  
  return days_difference;
 }

  return(
    <>
      <div className='md:hidden px-[10px] flex items-center h-[45px] border-b-[1px] border-b-slate-100'>
        <h6 className='flex-[0_0_30%] text-[13px]'>Plan</h6>
        {type == 'member' && <h6 className='flex-[0_0_calc(15%_-_5px)] ml-[5px] text-[13px]'>Duration</h6>}
        <h6 className='flex-[0_0_calc(20%_-_5px)] ml-[5px] text-[13px]'>Expiry Date</h6>
        <h6 className='flex-[0_0_calc(15%_-_5px)] ml-[5px] text-[13px]'>Amount</h6>
        {type == 'items' && <h6 className='flex-[0_0_calc(15%_-_5px)] ml-[5px] text-[13px]'>Plan Features</h6>}
        <h6 className='flex-[0_0_calc(10%_-_5px)] ml-[5px] text-[13px]'>Status</h6>
        <h6 className='flex-[0_0_calc(10%_-_0px)] text-[13px]'>Payment</h6>
      </div>

      {!Skeleton  &&
       <>
       {planList && planList.length == 0 ? 
      //  h-[calc(100vh_-_220px)]
         <NoProductFound cssClass={'flex-col '} empty_icon={'/empty_states/no-subscriptions.svg'} heading={type == 'member'  ? 'No Membership Found' : 'No Subscription Found'} button={type == 'member' ? true : false} btnName={'Go to membership'} route={'/membership'}/>
        :
         planList.map((res,index)=>{
            return(
              <div className='border-b-[1px] py-[10px] border-b-slate-100 last:border-b-[0px]'>
                <div className='md:hidden px-[10px] flex items-center h-[50px]'>
                    <h6 className='flex-[0_0_30%] '>
                      <h6 className='text-[13.5px] font-semibold'>{res.subscription_plan}</h6>
                      {res.items && res.items.length != 0 && <span className='text-[12px] gray_color'>{res.items[0].item_name}  <span className='text-[12px] font-semibold'>{res.items[0].type ? (' - ' + res.items[0].type) : ''}</span></span>}
                    </h6>
                    {type == 'member' && <h6 className='flex-[0_0_calc(15%_-_5px)] ml-[5px] text-[14px] font-semibold'>{res.sub_plans[0].plan_info.billing_interval_count + ' ' + res.sub_plans[0].plan_info.billing_interval}</h6>}
                    <h6 className='flex-[0_0_calc(20%_-_5px)] ml-[5px]text-[14px]'>
                      <h6 className='text-[13.5px] font-semibold'>{formatDate(res.current_end_date)}</h6>
                      <span className='text-[12px] gray_color'>Activated on {' ' + formatDate(res.current_start_date)}</span>
                      </h6>
                    <h6 className='flex-[0_0_calc(15%_-_5px)] ml-[5px] text-[13.5px] font-semibold'>{formatter.format(type == 'items' ? res.sub_plans[0].order_info.total_amount : res.sub_plans[0].plan_info.price)}</h6>
                    {type == 'items' && <h6 className='flex-[0_0_calc(15%_-_5px)] ml-[5px] text-[13.5px] font-semibold'>{(res.sub_plans && res.sub_plans[0].plan_features && res.sub_plans[0].plan_features[0] && res.sub_plans[0].plan_features[0].features) ? res.sub_plans[0].plan_features[0].features : '-'}</h6>}
                    <h6 style={{color:res.status ? getColor(res.status)  : '#ddd'}} className='flex-[0_0_calc(10%_-_5px)] ml-[5px] text-[14px] font-semibold'>{res.status}</h6>
                    <div className='flex-[0_0_calc(10%_-_0px)]'><button onClick={()=>{res.status == 'Unpaid' ? payNow(res) : null}} className={`${res.status == 'Unpaid' ? 'primary_btn text-white' : 'bg-[#3b8b42] text-white'}  w-max p-[5px_25px] text-[13.5px] rounded-[5px]`}>{res.status == 'Unpaid' ? 'Pay' : 'Paid'}</button> </div>
               </div>

               {type != 'member' && 

                <div className='lg:hidden flex flex-wrap p-[10px] cursor-pointer items-center '>
                   <div className={'flex-[0_0_calc(75%_-_5px)]'}>
                     <h6 className='text-[14px] font-semibold'>{res.subscription_plan}</h6>
                     {res.items && res.items.length != 0 && <span className='text-[12px] gray_color'>{res.items[0].item_name}  <span className='text-[12px] font-semibold'>{res.items[0].type ? (' - ' + res.items[0].type) : ''}</span></span>}
                     <h6 className='text-[12px] gray_color'>Expiry on {' ' + formatDate(res.current_end_date)}</h6>
                     <div className='flex items-center gap-[5px]'><div style={{background:res.status ? getColor(res.status)  : '#ddd'}} className={`h-[6px] w-[6px] rounded-[50%]`}></div><h6 style={{color:res.status ? getColor(res.status)  : '#ddd'}} className='text-[12px]'>{res.status}</h6></div>
                   </div>
                   <div className={'flex-[0_0_calc(25%_-_5px)]'}>
                     <h6 className='text-[14px] font-semibold mb-[7px]'>{formatter.format(type == 'items' ? res.sub_plans[0].order_info.total_amount : res.sub_plans[0].plan_info.price)}</h6>
                     {res.status == 'Unpaid' && <div className='flex items-center justify-end'><button onClick={()=>{payNow(res)}} className='primary_btn w-max p-[5px_25px] text-[13px] rounded-[5px]'>Pay</button> </div>}
                   </div>
                </div>
                // <div className='lg:hidden flex flex-wrap p-[10px] cursor-pointer items-center '>
                //     <h6 className='md:flex-[0_0_calc(70%_-_0px)] text-[14px] font-semibold'>{res.subscription_plan}</h6>
                //     <div className='md:flex-[0_0_calc(30%_-_0px)] justify-end flex items-center gap-[5px]'><div style={{background:res.status ? getColor(res.status)  : '#ddd'}} className={`h-[6px] w-[6px] rounded-[50%]`}></div><h6 className='text-[12px]'>{res.status}</h6></div>
                //     <h6 className='md:flex-[0_0_calc(50%_-_0px)] py-[2px] text-[12px] gray_color'>{res.sub_plans[0].plan_info.billing_interval_count + ' ' + res.sub_plans[0].plan_info.billing_interval}</h6>
                //     <h6 className='md:flex-[0_0_calc(50%_-_0px)] text-end text-[12px] gray_color'>{formatDate(res.current_end_date)}</h6>
                //     <h6 className='text-[12px] md:flex-[0_0_calc(50%_-_0px)]'>{formatter.format(res.sub_plans[0].plan_info.price)}</h6>
                //     {res.status == 'Unpaid' && <div className='md:flex-[0_0_calc(50%_-_0px)] flex items-center justify-end'><button onClick={()=>{payNow(res)}} className='primary_btn w-max p-[5px_25px] text-[13px] rounded-[5px]'>Pay</button> </div>}
                // </div>
              }

             {type == 'member' && 
                <div className='lg:hidden flex flex-wrap p-[10px] cursor-pointer items-center justify-center'>
                  <div className='h-[110px] w-full flex items-center justify-center'>
                    <Image className={`h-[110px] object-contain`} src={'/membership/trophy.svg'} height={150} width={150} alt={''} />
                  </div>
                  <h6 className='text-[15px] font-semibold'>{getDaysCount(res.current_end_date)} Days Left</h6>
                  <p className='text-center text-[14px] gray_color'>{'Your ' + res.subscription_plan + ' plan will expire on ' + formatDate(res.current_end_date)}</p>
                  <h6 className='text-[15px] font-semibold border rounded-[5px] mt-[5px] p-[8px_10px]'>Plan Features</h6>
           
                  <ul className='py-[20px]'>
                        {res.sub_plans[0].plan_features.map((items, index) => {
                          return (
                            <li key={index} className='text-xs leading-6 d__flex gap-0.5'>
                              <Image src="/tick1.svg" alt="Tick" width={18} height={18} className='m-2 w-4 h-4' />{items.features}</li>
                          )
                        })}
                      </ul>

                  {res.status == 'Unpaid' && <div className='w-full'><button onClick={()=>{res.status == 'Unpaid' ? payNow(res) : null}} className={`${res.status == 'Unpaid' ? 'primary_btn text-white' : 'bg-[#F6F6F6] text-black'}  p-[5px_25px] text-[13.5px] h-[38px] w-full rounded-[5px]`}>Pay Now</button> </div>}
                  <div className='w-full'><button onClick={()=>{router.push('/membership')}} className={`mt-[10px] text-[#e21b22] border border-[#e21b22] p-[5px_25px] text-[13.5px] h-[38px] w-full rounded-[5px]`}>Choose Plan</button> </div>

                </div>
              }  

              </div> 
            )
         })

       }
       </>
      }

     {Skeleton &&
               [1,2,3,4,5].map((res,index)=>{
                  return(
                    <>
                    <div className='animate-pulse md:hidden px-[10px] my-[15px] h-[35px] gap-[10px] items-center flex'>
                      <div className='flex-[0_0_30%] h-[20px] w-[80%] bg-slate-200 rounded'></div>
                      <div className='flex-[0_0_calc(20%_-_15px)] h-[20px] w-[75%] bg-slate-200 rounded'></div>
                      <div className='flex-[0_0_calc(15%_-_15px)] h-[20px] w-[50%] bg-slate-200 rounded'></div>
                      <div className='flex-[0_0_calc(15%_-_15px)] h-[20px] w-[30%] bg-slate-200 rounded'></div>
                      <div className='flex-[0_0_calc(10%_-_10px)] h-[20px] w-[40%] bg-slate-200 rounded'></div>
                      <div className='flex-[0_0_calc(10%_-_5px)] h-[20px] w-[35%] bg-slate-200 rounded'></div>
                    </div>
                    <div className='animate-pulse lg:hidden gap-[10px] flex flex-wrap p-[10px] cursor-pointer items-center border-b-[1px] border-b-slate-100 last-child:border-b[0px]'>
                        <h6 className='md:flex-[0_0_calc(50%_-_5px)] h-[20px] w-[80%] bg-slate-200 rounded'></h6>
                        <h6 className='md:flex-[0_0_calc(50%_-_5px)] h-[20px] w-[80%] bg-slate-200 rounded'></h6>
                        <h6 className='md:flex-[0_0_calc(50%_-_5px)] py-[2px] h-[20px] w-[80%] bg-slate-200 rounded'> </h6>
                        <h6 className='md:flex-[0_0_calc(50%_-_5px)] py-[2px] text-end h-[20px] w-[80%] bg-slate-200 rounded'></h6>
                        <div className='h-[20px] w-[80%] bg-slate-200 rounded'></div>
                      </div>
                      </>
                  )
                })
      }   
    </>
  )
} 