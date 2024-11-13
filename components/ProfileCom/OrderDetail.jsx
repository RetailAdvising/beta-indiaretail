import React, { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common';
import Image from 'next/image'
import { get_order_info, getColor, get_razorpay_settings, update_order_status } from '@/libs/api';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import AlertUi from '@/components/common/AlertUi';

export default function OrderDetail({ hide, visible, order_id, loadPage }) {

  return (
    <div className='order_detail'>
      {loadPage ?
        <OrderDetailScreen loadPage={loadPage} order_id={order_id} /> :
        <Rodal visible={visible} onClose={() => { hide(undefined) }}>
          <OrderDetailScreen order_id={order_id} />
        </Rodal>
      }
    </div>

  )
}


const OrderDetailScreen = ({ order_id, loadPage }) => {

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const [razorpay_settings, setRazorpay_settings] = useState({});
  const [alertMsg, setAlertMsg] = useState({});
  const [enableModal, setEnableModal] = useState(false);
  const [index, setIndex] = useState(-1);

  const [orderInfo, setOrderInfo] = useState([]);
  let [Skeleton, setSkeleton] = useState(true);

  useEffect(() => {
    order_info(order_id);
    get_razor_pay_values();
  }, [])

  async function order_info(order_id) {
    let data = { order_id: order_id };
    const resp = await get_order_info(data);
    if (resp && resp.message && resp.message.info) {
      setOrderInfo(resp.message.info);
      setSkeleton(false)
    } else {
      setSkeleton(false)
    }
  }

  async function get_razor_pay_values() {
    let razorpay = await get_razorpay_settings();
    setRazorpay_settings(razorpay);
  }



  function payment_error_callback(error) {
    setAlertMsg({ message: 'Payment failed' });
    setEnableModal(true);
  }

  async function payment_Success_callback(response, amount, order_id) {
    setSkeleton(true);
    let params = {
      "transaction_id": response.razorpay_payment_id,
      "order_id": order_id,
    }
    const resp = await update_order_status(params);
    if (resp && resp.message && resp.message.status && resp.message.status == true) {
      setAlertMsg({ message: 'Payment received successfully', navigate: true });
      setEnableModal(true);
      orderInfo.payment_status = 'Paid'
      setIndex(index + 1);
      setSkeleton(false);
    } else {
      setSkeleton(false);

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

  function closeModal(value) {
    setEnableModal(false)
    if ('Yes') {

    }

  }

  return (
    <>
      {enableModal &&
        <AlertUi isOpen={enableModal} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />
      }
      {Skeleton ? <SkeletonLoader /> :
        <div className='flex flex-col h-[100%]'>
          {!loadPage && <div className='header h-[55px] border-b-[1px] border-b-slate-100 flex items-center px-[10px]'>
            <h6 className='text-[16px] font-semibold'>Order Detail({orderInfo.name})</h6>
          </div>
          }

          {loadPage && <Notify orderInfo={orderInfo} load_razorpay={(amount, description, order_id) => { load_razorpay(amount, description, order_id) }} />}

          <div className='body_sec h-[100%] overflow-auto scrollbar-hide'>

            <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
              <div className='flex items-center justify-between'>
                <h6 className='text-[14px] font-semibold'>{orderInfo.name}</h6>
                <div className='flex items-center gap-[5px]'><div style={{ background: orderInfo.status ? getColor(orderInfo.status) : '#ddd' }} className={`h-[10px] w-[10px] rounded-[50%]`}></div><h6 className='text-[14px]'>{orderInfo.status}</h6></div>
              </div>

              <h6 className='text-[15px]  gray_color'>{formatDate(orderInfo.order_date)}</h6>

              <div className='flex items-center justify-between'>
                <p class="flex items-center gap-[10px] text-[13px]">
                  <span class="flex items-center gap-[10px] text-[13px]"><Image height={10} width={15} src={'/order/' + (orderInfo.payment_method_name == 'Razor Pay' ? 'razorpay' : 'cash') + '.svg'}></Image> {orderInfo.payment_method_name}</span>
                  <span className='flex items-center gap-[5px]'><span style={{ background: orderInfo.payment_status ? getColor(orderInfo.payment_status) : '#ddd' }} className={`h-[10px] w-[10px] rounded-[50%]`}></span><h6 className='text-[14px]'>{orderInfo.payment_status}</h6></span>
                </p>
                {orderInfo.payment_status != 'Paid' && orderInfo.status && orderInfo.status != 'Cancelled' && <div className=''><button onClick={() => { load_razorpay(orderInfo.outstanding_amount, 'Place Order', orderInfo.name) }} className={`primary_btn text-white p-[2px_20px] text-[12px] h-[30px] w-full rounded-[5px]`}>Pay Now</button> </div>}
              </div>

            </div>

            {orderInfo.shipping_shipping_address && <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
              <h6 className='text-[14px] font-semibold'>Shipping Address</h6>

              <h6 className='text-[14px] font-semibold'>{orderInfo.first_name + orderInfo.last_name}</h6>

              <h6 class="m-0 text-[13px]">
                {orderInfo.shipping_shipping_address}<br></br>
                {orderInfo.shipping_city} - {orderInfo.shipping_zipcode}<br></br>
                {orderInfo.shipping_phone}
              </h6>
            </div>
            }

            {orderInfo.order_item && orderInfo.order_item.length != 0 &&
              <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
                <h6 className='text-[14px] font-semibold'>Order Items</h6>
                {orderInfo.order_item.map((d, index) => {
                  return (
                    <div className={'flex items-center gap-[10px] py-[10px] border-b-[1px] border-b-slate-100 last:border-b-[0px]'} key={index}>
                      <div className="flex items-center flex-[0_0_calc(80%_-_10px)]">
                        <span className="qty">{d.quantity}</span>
                        <span className="qty mx-[10px]">*</span>
                        <span>
                          <h6 className="m-0 text-[13px] font-semibold">{d.item_name}</h6>
                          {/* {d.variant_text && <h6 className="m-0 text-[12px] gray_color">{d.variant_text}</h6>} */}
                          {d.attribute_description && <div className="m-0 text-[12px] gray_color attributeDesc" dangerouslySetInnerHTML={{ __html: d.attribute_description }} />}
                          <h6 className="text-[12px] gray_color">{formatter.format(d.price)}</h6>
                        </span>
                      </div>
                      <h6 className="m-0 text-[13px] font-semibold text-end flex-[0_0_calc(20%_-_0px)]">{formatter.format(d.quantity * d.price)}</h6>
                    </div>
                  )
                })
                }
              </div>
            }

            <div className='border-b-[1px] border-b-slate-100 p-[10px_15px]'>
              <h6 className='text-[14px] font-semibold'>Payment Details</h6>

              <div className='flex flex-wrap  py-[10px] justify-between items-center'>
                <h6 className='w-3/6 text-[14px] pb-[5px]'>Subtotal</h6>
                <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(orderInfo.order_subtotal)}</h6>
                <h6 className='w-3/6 text-[14px] pb-[5px]'>Shipping</h6>
                <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>Free</h6>
                <h6 className='w-3/6 text-[14px] pb-[5px]'>GST</h6>
                <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(orderInfo.total_tax_amount)}</h6>
                <h6 className='border-t-[1px] border-t-slate-100 w-3/6 text-[14px] mt-[8px] py-[8px]'>Total</h6>
                <h6 className='border-t-[1px] border-t-slate-100 w-3/6 text-[14px] text-end mt-[8px] py-[8px] text-medium'>{formatter.format(orderInfo.total_amount)}</h6>
                {/* <h6 className='w-3/6 text-[14px] font-semibold'>Outstanding Amount</h6>
                   <h6 className='w-3/6 text-[14px] text-end font-semibold'>{formatter.format(orderInfo.outstanding_amount)}</h6> */}
              </div>
            </div>




          </div>
        </div>
      }
    </>
  )
}


const Notify = ({ orderInfo, load_razorpay }) => {

  const router = useRouter();

  return (
    <div className={`md:flex-col md:gap-[10px] md:items-end flex items-center justify-between border ${orderInfo.payment_status == 'Paid' ? 'border-[#046306] bg-[url("/thankyou/Success-bg.jpg")]' : 'border-[#c90905] bg-[url("/thankyou/Failure-bg.jpg")]'}   bg-cover bg-bottom bg-no-repeat m-[10px] p-[10px] rounded-[5px] min-h-[82px]`}>

      <div className='flex lg:w-[80%] items-center'>
        <div className='md:h-[60px] md:w-[60px] lg:h-[50px] lg:w-[50px] rounded-[50%] mr-[8px] bg-[#fff] flex items-center justify-center'><Image className='h-[28px] w-[30px]' src={orderInfo.payment_status == 'Paid' ? "/thankyou/Success.svg" : "/thankyou/Failure.svg"} alt="Tick" width={18} height={18} /></div>
        <div className='w-full'>
          <h6 className={`text-[15px] font-semibold ${orderInfo.payment_status == 'Paid' ? 'text-[#046306]' : 'text-[#c90905]'}`}>{orderInfo.payment_status == 'Paid' ? 'Your order placed successfully' : 'Your Payment Failed'}</h6>
          <p className={`text-[14px] ${orderInfo.payment_status == 'Paid' ? 'text-[#046306]' : 'text-[#c90905]'}`}>{orderInfo.payment_status == 'Paid' ? "Thank you for your purchase. Your order number is " + orderInfo.name : "Sorry, We're not able to process your payment. Please try again"}</p>
        </div>
      </div>
      {orderInfo.payment_status == 'Paid' ?
        <div className='pb-[15px] '><button onClick={() => { router.push('/bookstore') }} className={`bg-[#046306] text-white p-[5px_25px] text-[13.5px] h-[35px] rounded-[5px] relative`}>Continue Shopping <Image className='h-[11px] w-[6px] absolute right-[7px] top-[12px]' src={"/arrow_w.svg"} alt="Tick" width={12} height={20} /></button> </div> :
        <div className='pb-[15px]'><button onClick={() => { load_razorpay(orderInfo.outstanding_amount, 'Place Order', orderInfo.name) }} className={`bg-[#c90905] text-white p-[5px_25px] text-[13.5px] h-[35px] rounded-[5px]`}>Try Again<Image className='h-[11px] w-[6px] absolute right-[7px] top-[12px]' src={"/arrow_w.svg"} alt="Tick" width={12} height={20} /></button> </div>
      }
    </div>
  )
}


const SkeletonLoader = () => {
  return (
    <div className="h-[100%] flex flex-col gap-[10px] items-center  justify-center">
      <div class="animate-spin rounded-full h-[40px] w-[40px] border-l-2 border-t-2 border-black"></div>
      <span className='text-[15px] gray_color'>Loading...</span>
    </div>
  )
}