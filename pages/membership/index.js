import React, { useEffect, useState } from 'react'
import RootLayout from '@/layouts/RootLayout';
import data from '@/libs/membership';
import Image from 'next/image';
import Faq from '@/components/Membership/faq';
import Benefits from '@/components/Membership/benefits';
import ConfirmationScreen from '@/components/Membership/ConfirmationScreen';
import Modal from '@/components/common/Modal';
import { checkMobile, HomePage, get_subscription_plans, get_razorpay_settings, make_payment_entry } from '@/libs/api'
import AlertUi from '@/components/common/AlertUi';
import AuthModal from '@/components/Auth/AuthModal';
import { useRouter } from 'next/router';

export default function Membership() {

  let [btnState, setbtnState] = useState(true);
  const [pageContent, setpageContent] = useState([]);
  let [memberShipDetails, setMemberShipDetails] = useState([]);
  const [modal, setModal] = useState('login')
  const [razorpay_settings, setRazorpay_settings] = useState({});
  let [isMobile, setIsmobile] = useState();
  let [subscribed_plans_length, setSubscribed_plans_length] = useState(0);
  let [isActive, setIsActive] = useState(-1)

  useEffect(() => {
    getMembershipLanding()
    getMembershipData()
    checkIsMobile();
    get_razor_pay_values()
    // setTimeout(()=>{},700)
    window.addEventListener('resize', checkIsMobile)
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, [])


  async function get_razor_pay_values() {
    let razorpay = await get_razorpay_settings();
    setRazorpay_settings(razorpay);
  }

  const checkIsMobile = async () => {
    isMobile = await checkMobile();
    setIsmobile(isMobile);
    // console.log('isMobile',isMobile)
  }

  async function getMembershipLanding() {
    let data = { "route": "membership", "page_no": 1, "page_size": 10 }
    const resp = await HomePage(data);
    // console.log(resp);
    if (resp && resp.message && resp.message.page_content && resp.message.page_content != 0) {
      let datas = resp.message.page_content
      setpageContent(datas);
    }
  }

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });


  async function getMembershipData() {
    // let data = { "plan_type": btnState ? "Day" : "Year", "res_type": "member" }
    let data = { "plan_type": btnState ? "Month" : "Year", "res_type": "member" }
    const resp = await get_subscription_plans(data);
    // console.log(resp);
    if (resp && resp.message && resp.message.status && resp.message.status == 'success') {

      let datas = resp.message.message;

      let subscribed_plans = resp.message.subscribed_plans ? resp.message.subscribed_plans : []


      if (subscribed_plans.length != 0) {
        datas.map((res, i) => {
          // let check_plan = subscribed_plans.find(r => { return r.subscription_plan == res.plan_name })

          if (subscribed_plans[0].subscription_plan == res.plan_name && subscribed_plans[0].status == "Active") {
            // res.isActive = true;
            setIsActive(i);
            setSubscribed_plans_length(subscribed_plans.length);
          }
        })

      }

      // if (btnState && subscribed_plans.length != 0) {
      //   let monthly_plans = resp.message.subscribed_plans.filter(res => { return res.billing_interval == 'Month' && res.status == 'Active' })
      //   if (monthly_plans.length == 0) {
      //     btnState = btnState = !btnState
      //     setbtnState(btnState);
      //     getMembershipData()
      //   }
      // }


      // if(btnState && resp.message.subscribed_plans && resp.message.subscribed_plans[0] && resp.message.subscribed_plans[0].billing_interval && resp.message.subscribed_plans[0].billing_interval != 'Month'){
      //   btnState = btnState =! btnState
      //   setbtnState(btnState);
      //   getMembershipData()
      // }

      setMemberShipDetails(datas);

      if (datas.length > 3) {
        setTimeout(() => { check_arrow('initial') }, 700);
      }

    }
  }

  function handleClick() {
    btnState = btnState = !btnState
    setbtnState(btnState);
    getMembershipData()
  }

  const moveLeft = () => {
    let element = document.querySelector(`#scroll_div`);
    element.scrollBy({ top: 0, left: 250, behavior: 'smooth' });
    check_arrow('right')
  }

  const moveRight = () => {
    let element = document.querySelector(`#scroll_div`);
    element.scrollBy({ top: 0, left: -250, behavior: 'smooth' });
    check_arrow('left')
  }

  function check_arrow(type) {

    let element = document.querySelector(`#scroll_div`);
    let left_arrow = document.querySelector(`#left_arrow`);
    let right_arrow = document.querySelector(`#right_arrow`);

    if (type == 'right' || type == 'left') {
      if (element.scrollLeft == 0) {
        left_arrow.classList.add('hiding');
        right_arrow.classList.remove('hiding');
      } else if (element.offsetWidth + element.scrollLeft == element.scrollWidth) {
        left_arrow.classList.remove('hiding');
        right_arrow.classList.add('hiding');
      } else if (element.scrollLeft > 0) {
        left_arrow.classList.remove('hiding');
        right_arrow.classList.remove('hiding');
      }
    }

    if (type == 'initial') {
      left_arrow.classList.add('hiding');
    }

  }

  const [visible_, setVisible_] = useState(false)


  function startPlan(obj, index) {
    if (localStorage['apikey']) {
      obj.selected = true;
      isActive = index;
      memberShipDetails.map((res, i) => {
        if (i != index) {
          res.selected = false;
        }
      })

      setMemberShipDetails(memberShipDetails);
      show();
      // console.log(memberShipDetails);
    } else {
      setVisible_(!visible_);
      setModal('login')
    }


  }

  const [visible, setVisible] = useState(false)
  const [alertMsg, setAlertMsg] = useState({})
  const [enableModal, setEnableModal] = useState(false)

  function show() {
    setVisible(true);
  }

  function hide(obj) {
    setVisible(false);
    setVisible_(false);
    if (obj && obj.status && obj.status == "success") {
      load_razorpay(obj.checked_plans.total_amount, obj.checked_plans.name, obj.name)
      setAlertMsg(obj);
      // setEnableModal(true);
    } else if (obj && obj.status && obj.status == "failed") {
      setAlertMsg(obj)
      setEnableModal(true);
    } else {
      // setAlertMsg(obj);
      // setEnableModal(true);
    }
  }

  const hide_1 = () => {
    setVisible_(false);
  }


  function payment_error_callback(error) {
    setAlertMsg({ message: 'Payment failed' });
    setEnableModal(true);
  }

  async function payment_Success_callback(response, amount, order_id) {
    let params = {
      "customer_id": localStorage['customer_id'],
      "payment_method": "PAY-M00001",
      "amount": amount,
      "remarks": "paid",
      "transaction_id": response.razorpay_payment_id,
      "order_id": order_id,
      "payment_method_name": "Razor Pay",
      'subscription_type': 'member'
    }
    const resp = await make_payment_entry(params);
    if (resp && resp.message && resp.message.status && resp.message.status == 'success') {
      //  setAlertMsg({message:'Subscription created successfully'});

      if (localStorage['roles']) {
        let get_values = JSON.parse(localStorage['roles']);
        get_values.push({ role: 'Member' })
        localStorage['roles'] = JSON.stringify(get_values)
      }
      setIsActive(isActive);
      setSubscribed_plans_length(1);

      setEnableModal(true);
    }
  }

  const load_razorpay = async (amount, description, order_id) => {
    // console.log(razorpay_settings.api_key)
    let r_pay_color = '#e21b22';
    const app_name = 'India Retail';
    var options = {
      "key": razorpay_settings.api_key,
      "amount": (amount * 100).toString(),
      "currency": "INR",
      "name": app_name,
      "description": "Payment for" + description,
      "image": (razorpay_settings.site_logo ? check_Image(razorpay_settings.site_logo) : null),
      "prefill": { "name": localStorage['full_name'], "email": localStorage['userid'] },
      "theme": { "color": r_pay_color },
      "modal": { "backdropclose": false, "ondismiss": () => { payment_error_callback(description) } },
      "handler": async (response, error) => {
        if (response) {
          payment_Success_callback(response, amount, order_id)
          // response.razorpay_payment_id
        } else if (error) {
          payment_error_callback(error)
        }

      }
    };

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => { const rzp = new window.Razorpay(options); rzp.open(); };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };

  }


  const router = useRouter()

  async function closeModal(value) {
    setEnableModal(false);
    // console.log(alertMsg)
    if ((alertMsg && alertMsg.message) && alertMsg.message.includes('Payment is pending')) {
      router.push('/profile?my_account=membership')
    }
  }

  async function selected_plan() {
    if (subscribed_plans_length > 0) {
      setAlertMsg({ message: "Already you have one membership plan.So, you can't pick an other plans" });
      setEnableModal(true);
    }
  }


  return (
    <RootLayout>

      {enableModal && <AlertUi isOpen={enableModal} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />}

      {visible &&
        <ConfirmationScreen membershipDetails={memberShipDetails} visible={visible} hide={(obj) => hide(obj)} startPlan={(membership, index) => startPlan(membership, index)} btnState={btnState} handleClick={handleClick} />
      }

      {/* <Modal modal={modal} show={show} visible={visible_} hide={hide_1} member={"membership_login"} membership={"membership"}/> */}
      <div className='authModal'><AuthModal modal={modal} isModal={false} show={show} visible={visible_} hide={hide_1} /></div>

      <div className="pt-[30px] bg-[url('/membership/bg_membership.svg')] bg-no-repeat bg-contain">
        <div className="max-w-[1300px] m-[0px_auto]">
          <h2 className="font-bold text-4xl md:text-2xl text-center">{data.title}</h2>
          <p className="sub_title text-center lg:pb-10 lg:pt-3 md:py-3">{data.subtitle}</p>
          <div className="flex flex-row m-auto justify-center gap-2 mb-3 border rounded-[35px] w-max p-[5px]">
            <div className='inline-block'>
              <button className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-[35px] font-medium bg-[red] member-button1 ${btnState ? 'active' : ''}`} onClick={handleClick}>Monthly Billing</button>
            </div>
            <div className='inline-block'>
              <button className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-[35px] font-medium bg-[red] member-button1 ${!btnState ? 'active' : ''}`} onClick={handleClick}>Yearly Billing</button>
            </div>
          </div>


          {memberShipDetails && memberShipDetails.length != 0 ?
            <div className='relative'>
              {memberShipDetails.length > 3 && <p id={'left_arrow'} className='z-[99] absolute left-[-10px] top-[45%] shadow-[0_0_5px_#ddd] bg-white cursor-pointer h-[35px] w-[35px] border rounded-[50%] p-[6px]' onClick={moveRight}><Image className={`h-[20px] w-[20px]`} src={'/leftArrow.svg'} height={28} width={28} alt={'left'}></Image></p>}
              {memberShipDetails.length > 3 && <p id={'right_arrow'} className='z-[99] absolute right-[-10px] top-[45%] shadow-[0_0_5px_#ddd] bg-white cursor-pointer h-[35px] w-[35px] border rounded-[50%] p-[6px]' onClick={moveLeft}><Image className={`h-[20px] w-[20px]`} src={'/rightArrow.svg'} height={28} width={28} alt={'right'}></Image></p>}

              <div id={'scroll_div'} className="lg:flex lg:p-[10px] gap-6 md:p-[15px] overflow-auto scrollbar-hide ">
                {memberShipDetails.map((membership, index) => {
                  return (
                    // ${subscribed_plans_length > 0 ? 'active_member_ship' : ''} 
                    <div onClick={() => selected_plan()} key={index} className={`${isActive == index ? 'cur_member_ship' : ''} ${subscribed_plans_length == 0 ? 'active_member_ship' : ''} md:mb-[20px] flex-[0_0_calc(33.333%_-_16px)] member-card lg:p-8 md:p-[15px] bg-white rounded-2xl relative`}>
                      <h3 className='text-2xl font-bold'>{membership.plan_name}</h3>

                      {/* <div className='flex items-center gap-[3px] my-[2px] rounded-[35px] w-max p-[5px_8px] member-button'>
                        <span className='h-[20px] flex items-center'><Image className='h-[18px]' src="/percentage.svg" height={18} width={18} alt={''} /></span> 
                        <p className='text-[12px] member-button leading-[0px]'> Save {membership.offer} % </p>
                      </div> */}

                      <h5 className='font-medium text-3xl'>{formatter.format(membership.total_amount)}</h5>
                      <p className='text-xs'>Per {btnState ? 'month' : 'year'} .</p>

                      <p className='py-[6px] text-black text-xs font-bold'>Starter plan for optimal business intelligence</p>

                      {/* <p className='py-[6px] text-black text-xs font-bold'>{membership.descrption}</p> */}

                      <ul className='pb-[48px]'>
                        {membership.features.map((items, index) => {
                          return (
                            <li key={index} className='text-xs leading-6 d__flex gap-0.5'>
                              <Image src="/tick1.svg" alt="Tick" width={18} height={18} className='m-2 w-4 h-4' />{items.features}</li>
                          )
                        })}
                      </ul>
                      <button disabled={subscribed_plans_length == 0 ? false : true} onClick={() => startPlan(membership, index)} className="absolute bottom-[30px] md:bottom-[15px] w-[calc(100%_-_60px)] bg-blue-500 text-white font-bold py-2 px-4 rounded-2xl font-medium member-button member-button_"> {isActive == index ? 'Subscribed Plan' : 'Start your free Pro trial'} </button>
                    </div>
                  )
                })}
              </div>

            </div>
            : <Skeleton />
          }

        </div>
      </div>

      <div className='py-[20px]'>
        {pageContent && pageContent.length != 0 && pageContent.map((res) => {
          return (
            <div key={res.section_name}>
              {/* {res.section_name == 'IR Member Ship' && res.section_type == 'Static Section' &&
                <div className='py-[20px] '>
                  <Benefits data={res}></Benefits>
                </div>
              } */}

              <Benefits data={res}></Benefits>

              {res.section_name == 'FAQ Style 4' && res.section_type == 'Custom Section' &&
                <div className='py-[30px] md:p-[15px]'>
                  <Faq data={res}></Faq>
                </div>
              }
            </div>
          )
        })
        }
      </div>

    </RootLayout>
  )
}

const Skeleton = () => {
  return (
    <>
      <div class="max-w-[1200px] p-[10px] lg:flex gap-6 lg:gap-6 animate-pulse">

        {[0, 1, 2].map((res, index) => {
          return (
            <div key={index} class="lg:p-8 md:mb-[20px] lg:flex-[0_0_calc(33.333%_-_16px)] relative border h-[445px] md:p-[15px] bg-white rounded">
              <div className='h-[35px] my-[10px] w-[60%] bg-slate-200 rounded'></div>
              <div className='h-[35px] mb-[10px] w-[30%] bg-slate-200 rounded'></div>
              <div className='h-[20px] mb-[10px] w-[75%] bg-slate-200 rounded'></div>

              <div className='h-[16px] mt-[25px] mb-[8px] w-full bg-slate-200 rounded'></div>
              <div className='h-[16px] mb-[8px] w-full bg-slate-200 rounded'></div>
              <div className='h-[16px] mb-[8px] w-full bg-slate-200 rounded'></div>
              <div className='h-[16px] mb-[8px] w-full bg-slate-200 rounded'></div>
              <div className='h-[16px] mb-[8px] w-full bg-slate-200 rounded'></div>
              <div className='h-[16px] mb-[8px] w-[75%] bg-slate-200 rounded'></div>

              <div className='h-[45px] absolute bottom-[20px] m-[10px] w-[75%] bg-slate-200 rounded-[35px]'></div>

            </div>
          )
        })}

      </div>
    </>
  )
}




