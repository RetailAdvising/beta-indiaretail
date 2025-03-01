import { useEffect, useState } from 'react'
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import Image from 'next/image';
import { stored_customer_info } from '@/libs/api';
import LoaderButton from '@/components/common/LoaderButton';
import { insert_member_subscription } from '@/libs/api'

export default function ConfirmationScreen({ membershipDetails, visible, hide, startPlan, btnState, handleClick }) {

  let [localValue, setLocalValue] = useState(undefined);
  let [shipDetails, setMembershipDetails] = useState(-1);
  let [alertMsg, setAlertMsg] = useState(-1);


  useEffect(() => {
    localValue = stored_customer_info()
    setLocalValue(localValue);
  }, [shipDetails])

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  const [loader, setLoader] = useState(false)
  const [loadAlert, setLoadAlert] = useState(false)


  const getStarted = (e) => {
    setLoader(true)
    let checked_plans = membershipDetails.find((res) => { return (res.selected == true) })
    if (checked_plans) {
      insert_subscription(checked_plans);
    } else {
      setLoader(false)
      setAlertMsg('Please choose any one of membership plan')
      setLoadAlert(true)
      setTimeout(() => { setLoadAlert(false) }, 1200)
    }
  }

  async function insert_subscription(checked_plans) {
    let params = {
      "party": localStorage['customer_id'],
      "subscription_plan": checked_plans.plan_name,
      tax_template: checked_plans.tax_template
    }
    const resp = await insert_member_subscription(params);
    setLoader(false);
    if (resp && resp.message && resp.message.status && resp.message.status == 'success') {
      hide({ status: 'success', message: 'Subscription created successfully', name: resp.message.data[0].document_name, checked_plans: checked_plans });
    } else {
      hide({ status: 'failed', message: resp.message.message });
    }
  }

  return (
    <>
      <div className='confirmMembership relative'>

        <Rodal visible={visible} animation='slideUp' onClose={() => { hide(undefined) }}>

          {loadAlert &&
            <div className='flex ease-in absolute w-[60%] bottom-[5px] p-[8px] rounded-[10px] right-[5px] items-center member-button'>
              <p className='text-[14px] member-button font-semibold'>{alertMsg}</p>
              <span className='h-[20px]'><Image className='cursor-pointer' onClick={() => setLoadAlert(false)} src={'/cart/Remove_red.svg'} height={20} width={20} alt={'Delete'} /></span>
            </div>
          }

          <div className='flex flex-col h-[100%]' >
            <h6 className='header border-b-[1px] border-slate-200 h-[45px] flex items-center text-[16px] font-semibold px-[10px] mb-[10px]'>Confirm & Pay</h6>

            <div className='flex flex-col h-[100%] overflow-auto scrollbar-hide'>

              <div className="flex m-[0px_auto] w-max gap-2 border rounded-[35px] p-[5px]">
                <button className={`bg-blue-500 text-[14px] p-[4px_10px] text-white font-bold rounded-[35px] font-medium bg-[red] member-button1 ${btnState ? 'active' : ''}`} onClick={() => { setMembershipDetails(1), handleClick() }}>Monthly Billing</button>
                <button className={`bg-blue-500 text-[14px] p-[4px_10px] text-white font-bold rounded-[35px] font-medium bg-[red] member-button1 ${!btnState ? 'active' : ''}`} onClick={() => { setMembershipDetails(1), handleClick() }}>Yearly Billing</button>
              </div>

              {membershipDetails && membershipDetails.length != 0 && membershipDetails.map((items, index) => {
                return (

                  <div onClick={() => { setMembershipDetails(index), startPlan(items, index) }} className='flex cursor-pointer px-[20px] py-[5px] gap-[8px]'>

                    <div className='relative'>
                      <div className='h-[20px] w-[20px] rounded-[50%] bg-slate-100'></div>
                      {(items.selected) && <Image src="/tick1.svg" alt="Tick" width={18} height={18} className='absolute h-[25px] top-[-6px] right-[-1px]' />}
                    </div>

                    <div>
                      <h3 className='text-[15px] gray_color'>{items.plan_name}</h3>
                      <h3 className='text-[14px]'>{formatter.format(items.total_amount)}</h3>
                    </div>

                  </div>
                )
              })}

              <h6 className='border-t-[1px] border-slate-200 p-[10px_0_5px_10px]'>Login Details</h6>
              {localValue && localValue['cust_name'] &&
                <div className={`border-b-[1px] px-[10px] border-slate-200 py-[10px] justify-between  gap-[5px]`}>
                  {localValue['cust_name'] && <p className={`m-0 text-[14px] text-medium`}>{localValue['cust_name']}</p>}
                  {localValue['cust_email'] && <p className={`m-0 text-[14px] py-[5px] text-medium`}>{localValue['cust_email']}</p>}
                  {localValue['phone'] && <p className={`m-0 text-[14px] text-medium`}>{localValue['phone']}</p>}
                </div>
              }

              <h6 className='border-t-[1px] border-slate-200 p-[10px_0_5px_10px]'>Payment Details</h6>

              <div className='flex items-center cursor-pointer px-[20px] py-[5px] gap-[10px]'>

                <div className='relative'>
                  <div className='h-[20px] w-[20px] rounded-[50%] bg-slate-100'></div>
                  <Image src="/tick1.svg" alt="Tick" width={18} height={18} className='absolute h-[25px] top-[-6px] right-[-1px]' />
                </div>

                <div className='h-[40px]'>
                  <Image src="/Razorpay_logo.svg" alt="Tick" width={40} height={40} className='h-[30px] w-max' />
                </div>

              </div>

            </div>

            <div class="flex m-[10px] justify-center items-center">
              <LoaderButton loader={loader} buttonClick={getStarted} width={'w-[90%]'} button_name={'Get started'} />
            </div>

          </div>
        </Rodal>
      </div>

    </>
  )

} 