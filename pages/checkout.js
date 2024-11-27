import RootLayout from '@/layouts/RootLayout'
import { useEffect, useState } from 'react'
import styles from '../styles/checkout.module.scss';
import { get_customer_info, getCartItem, update_order_status, stored_customer_info, get_payment_method, delete_address, get_razorpay_settings, insertOrder } from '@/libs/api';
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { checkMobile } from '@/libs/api';
// import AddressModal from '@/components/Bookstore/AddressModal';
// import Address from '@/components/Bookstore/Address';
// import AlertUi from '@/components/common/AlertUi';
import LoaderButton from '@/components/common/LoaderButton';
import { format } from 'date-fns';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import customerInfoAction from 'redux/actions/customerInfoAction'
import alertAction from 'redux/actions/alertAction'
import { toast } from 'react-toastify';
import dynamic from 'next/dynamic';
const AlertUi = dynamic(()=> import('@/components/common/AlertUi'))
const Address = dynamic(()=> import('@/components/Bookstore/Address'))
const AddressModal = dynamic(()=> import('@/components/Bookstore/AddressModal'))
export default function checkout() {


  const [selectedOption, setSelectedOption] = useState('India');
  const [currentIndex, setIndex] = useState(0);
  const [payment_methods, setPaymentMethods] = useState([]);
  let [cart_items, setCartItems] = useState({});
  let [isMobile, setIsmobile] = useState();
  const [customerInfo, setCustomerInfo] = useState({});
  const [editAddress, setEditAddress] = useState(undefined);
  const router = useRouter();
  const customer = useSelector(s => s.customer);
  // const userInfo = useSelector(s=>s.user);
  const [razorpay_settings, setRazorpay_settings] = useState({});

  const dispatch = useDispatch()

  let [localValue, setLocalValue] = useState(undefined);
  let [loadSpinner, setLoadSpinner] = useState(false);


  let orders_Id;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      CartItem()
      customer_info();
      get_payments();
      let localValue = stored_customer_info()
      setLocalValue(localValue);
      get_razor_pay_values();
      checkIsMobile();
      window.addEventListener('resize', checkIsMobile)
      return () => {
        window.removeEventListener('resize', checkIsMobile);
      };
    }
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

  const CartItem = async () => {
    cart_items = await getCartItem();
    setCartItems(cart_items);
    // console.log('isMobile',isMobile);
  }

  // async function getCartItem(){
  //   const resp = await get_cart_items();
  //     if (resp && resp.message && resp.message.status == 'success') {
  //         let data = resp.message.cart
  //         setCartItems(data)
  //     }
  // }

  async function get_payments() {
    const resp = await get_payment_method();
    if (resp && resp.message && resp.message.length != 0) {
      let data = resp.message
      setPaymentMethods(data)
    }
  }


  // let customer_info_mobile = {};  

  async function customer_info() {
    // console.log('customer', customer);
    if (customer && customer.address && customer.address.length != 0) {
      check_info(customer);
    } else {
      let data = { guest_id: '', user: localStorage['customer_id'] };
      const resp = await get_customer_info(data);
      if (resp && resp.message && resp.message[0]) {
        isMobile ? dispatch(customerInfoAction(resp.message[0])) : null;
        let data = resp.message[0];
        check_info(data)
      }
    }
  }

  function check_info(data) {


    if (isMobile && data.address && data.address.length != 0) {
      let is_default = data.address.filter((res) => { return res.is_default == 1 })
      if (is_default && is_default.length != 0) {
        // data.address = is_default;
      } else {
        data.address[0].is_default = 1;
        // let is_default = data.address.filter((res)=>{return res.is_default == 1})
        // data.address = is_default
      }
    }
    setCustomerInfo(data);
  }

  function goToAddres() {
    router.push('/add-address');
  }

  const [name, setName] = useState('');
  const options = [
    { label: 'India', value: 'India' },
  ];

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const selectMethod = (e, index) => {
    setIndex(index);
  };

  const [loader, setLoader] = useState(false)

  const checkout = (e) => {
    setLoader(true)
    check_checkout_values()
  }

  const alert = useSelector(s => s.alert);
  const alert_dispatch = useDispatch()
  const [alertMsg, setAlertMsg] = useState({})

  function closeModal(value) {
    alert_dispatch(alertAction(false))

    if (alertMsg && alertMsg.navigate) {
      // console.log(alertMsg)
      // setAlertMsg({});
      // router.push('/bookstore');
      router.push('/thankyou?order_id=' + alertMsg.order_id);
    } else if ('Yes') {

    }

  }


  async function check_checkout_values() {
    let check_address = (customerInfo.address && customerInfo.address.length != 0) ? customerInfo.address.find((res) => { return res.is_default == 1 }) : undefined

    if (!check_address) {
      setLoader(false);
      await setAlertMsg({ message: 'Please select Billing address' });
      alert_dispatch(alertAction(true))
      toast.error('Please select Billing address');

      // openModal();
      // dispatch(openDialog('OPEN_DIALOG'))
    } else if (currentIndex < 0) {
      setLoader(false);
      await setAlertMsg({ message: 'Please select Payment Method' });
      alert_dispatch(alertAction(true))
      toast.error('Please select Payment Method');
      // openModal()
    } else {
      pay(check_address)
    }

  }

  async function pay(check_address) {
    var orderdata = {
      "customer_name": localStorage['customer_id'],
      "order_type": "Shopping Cart",
      "bill_addr": check_address.name ? check_address.name : check_address.name,
      "ship_addr": check_address.name,
      "payment_method": payment_methods[currentIndex].name,
      "payment_gateway_charges": "",
      "order_date": format(new Date(), 'yyyy/MM/dd'),
      "slot_time": 0,
      "from_time": null,
      "to_time": null,
      "date": null,
      "coupon_code": '',
    }

    const resp = await insertOrder(orderdata);
    // console.log(resp)
    if (resp && resp.message && resp.message.status == true) {
      let data = resp.message
      setLoader(false);
      orders_Id = data.order.name
      load_razorpay(data.order.outstanding_amount, 'Order', data.order.name);
    }
    else {
      setLoader(false);
      toast.error(resp.message.message);
      // setAlertMsg({ message: resp.message.message });  
      // alert_dispatch(alertAction(true))
    }

  }

  function payment_error_callback(error, order_id) {
    setAlertMsg({ message: 'Payment failed', navigate: true, order_id: order_id });
    alert_dispatch(alertAction(true))
    toast.error('Payment failed');
    router.push('/thankyou?order_id=' + order_id);
    // setEnableModal(true);
  }

  async function payment_Success_callback(response, amount, order_id) {
    let params = {
      "transaction_id": response.razorpay_payment_id,
      "order_id": order_id,
    }
    const resp = await update_order_status(params);
    if (resp && resp.message && resp.message.status && resp.message.status == true) {
      setLoadSpinner(false);
      setAlertMsg({ message: 'Order inserted successfully', navigate: true, order_id: order_id });
      alert_dispatch(alertAction(true));
      // toast.success('Order inserted successfully');
      router.push('/thankyou?order_id=' + order_id);
      // setEnableModal(true);
    } else {
      setLoadSpinner(false);
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
      "modal": { "backdropclose": false, "ondismiss": () => { payment_error_callback(description, order_id) } },
      "handler": async (response, error) => {
        if (response) {
          setLoadSpinner(true);
          payment_Success_callback(response, amount, order_id)
          // response.razorpay_payment_id
        } else if (error) {
          payment_error_callback(error, order_id)
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


  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  });

  const imageChange = (e) => {
    // console.log(e);
    let value = '/visa.svg';
    if (e.payment == 'Visa') {
      value = '/visa.svg'
    } else if (e.payment == 'Paytm') {
      value = '/paypal.svg'
    } else if (e.payment == 'Razor Pay') {
      value = '/Razorpay.svg'
    }
    return value;
  };

  const selectAddress = (array, index) => {
    array.map((res, i) => {
      if (i == index) {
        res.is_default = 1
      } else {
        res.is_default = 0
      }
    })
    setCustomerInfo(
      { ...customerInfo, address: array }
    )
  }

  // Modal
  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true);
  }

  function hide(obj) {
    setVisible(false);
    if (obj) {

      if (customerInfo.address && customerInfo.address.length != 0 && obj.name) {
        let addressIndex = customerInfo.address.findIndex((res) => { return res.name == obj.name });
        if (addressIndex >= 0) {
          customerInfo.address[addressIndex] = obj;
        } else {
          customerInfo.address.push(obj);
        }
      } else {
        isMobile ? obj.is_default = 1 : null;
        customerInfo.address.push(obj);
      }

      setCustomerInfo(
        { ...customerInfo, address: customerInfo.address }
      )
      // setCustomerInfo(customerInfo);
    }
  }

  const [addressDelete, setDeleteAddress] = useState(false)

  function address_closeModal(value) {
    setDeleteAddress(false);
    if (value == 'Yes') {
      deleteAddress(alertMsg.res, alertMsg.index);
    }

  }


  function edit_address(res, type, index) {
    if (type == 'New') {
      setEditAddress(undefined);
      show();
    } else if (type == 'Edit') {
      setEditAddress(res);
      show();
    } else if (type == 'Delete') {
      setAlertMsg({ message: 'Do you want to delete your address', res: res, index: index });
      setDeleteAddress(true);
      // alert_dispatch(alertAction(true))
      // deleteAddress(res,index);
    }

  }

  async function deleteAddress(delete_obj, index) {
    let data = { "id": delete_obj.name, "customer": localStorage['customer_id'] }
    const resp = await delete_address(data);
    if (resp && resp.message && resp.message == 'Success') {
      setAlertMsg({});
      customerInfo.address.splice(index, 1);
      setCustomerInfo(
        { ...customerInfo, address: customerInfo.address }
      )
    }
  }



  return (
    <>
      {loadSpinner && <Backdrop />}
      <RootLayout checkout={isMobile ? false : true}>
        {/* <ToastContainer position={'bottom-right'} autoClose={2000} /> */}

        {/* {alert.isOpen &&
          <AlertUi isOpen={alert.isOpen} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />
        } */}

        {addressDelete &&
          <AlertUi isOpen={addressDelete} closeModal={(value) => address_closeModal(value)} headerMsg={'Alert'} button_1={'No'} button_2={'Yes'} alertMsg={alertMsg} />
        }

        <div className='md:p-[15px]'>
          <div className={`flex ${styles.container_} md:gap-8px lg:gap-[20px] md:flex-col py-[10px] container`}>

            <div className={`${styles.box_1}`}>

              <div className='flex lg:bg-slate-100 md:[22px] lg:md:[22px] lg:h-[43px] px-[10px] rounded-md items-center'>
                <span className='flex items-center justify-center md:hidden mr-[10px] w-[25px]'><Image className='h-[23px] object-contain' src="/checkout/login.svg" height={20} width={20} layout="fixed" alt="Edit" /></span>
                <h6 className='text-[16px] font-semibold' >Login / Register</h6>
              </div>

              <div className={`${styles.address_sec} ${isMobile ? null : 'w-[95%] m-[0px_8px_auto_auto] '} md:border-b-[1px] md:border-slate-200 md:mb-[8px] md:px-[10px] py-[10px] cursor-pointer justify-between  gap-[5px]`}>
                {localValue && localValue['cust_name'] && <p className={`${isMobile ? 'sub_title' : null} m-0 text-[14px] text-medium`}>{localValue['cust_name']}</p>}
                {localValue && localValue['cust_email'] && <p className={`${isMobile ? 'sub_title' : null} m-0 text-[14px] py-[5px] text-medium`}>{localValue['cust_email']}</p>}
                {localValue && localValue['phone'] && <p className={`${isMobile ? 'sub_title' : null}vm-0 text-[14px] text-medium`}>{localValue['phone']}</p>}
              </div>


              <div className='flex justify-between lg:bg-slate-100 md:[22px] lg:h-[43px] px-[10px] rounded-md items-center'>
                <div className='flex'>
                  <span className='flex items-center justify-center md:hidden mr-[10px] w-[25px]'><Image className='h-[23px] object-contain' src="/checkout/Billing.svg" height={20} width={20} layout="fixed" alt="Edit" /></span>
                  <h6 className='text-[16px] font-semibold' >Billing Address</h6>
                </div>
                {customerInfo && customerInfo.address && customerInfo.address.length != 0 &&
                  // isMobile ? 'Edit' : isMobile ? 'text-[14px] font-semibold primary_color' :
                  <button className={`${styles.add_new} ${'border rounded-[5px] py-[2px] px-[7px] text-[14px] text-medium'}`} onClick={() => isMobile ? goToAddres() : edit_address(undefined, 'New', '')} >{'Add New'}</button>
                }
              </div>

              {customerInfo && customerInfo.address && customerInfo.address.length != 0 && customerInfo.address.map((res, index) => (

                //                                                    isMobile ${(isMobile && res.is_default != 1) ? 'hidden' : null}
                <div key={index} className={`${styles.address_sec}   flex cursor-pointer justify-between ${isMobile ? null : 'w-[95%] m-[0px_8px_auto_auto] '} md:border-b-[1px] md:border-slate-200 md:mb-[8px] md:px-[10px] py-[10px] gap-[5px]`}>
                  <div onClick={() => { selectAddress(customerInfo.address, index) }} className={`flex w-full justify-between cursor-pointer gap-[10px]`}>
                    <input className={styles.input_radio} checked={res.is_default} type="radio" />
                    <div className='w-full'>
                      <span className='flex justify-between items-center'>
                        <h6 className={`${isMobile ? 'sub_title' : null} m-0 text-[15px]  capitalize font-semibold`}>{res.first_name + ' ' + res.last_name}</h6>
                      </span>
                      <p className={`${isMobile ? 'sub_title' : null} m-0 text-[14px] text-medium`}>{res.address} , <br></br> {res?.city}, {res?.state}, {res?.country} - {res?.zipcode}</p>
                    </div>
                  </div>


                  <div className='flex items-center'>
                    <div onClick={() => { edit_address(res, 'Edit', index) }} className='flex cursor-pointer mr-[15px] items-center'>
                      <span className={`${styles.edit_text}  text-[12px] mr-[5px]`}>Edit</span>
                      <Image className='h-[14px]' src="/edit.svg" height={14} width={15} layout="fixed" alt="Edit" />
                    </div>
                    <div onClick={() => { edit_address(res, 'Delete', index) }} className='flex cursor-pointer  items-center'>
                      <span className={`${styles.delete_text} text-[12px] mr-[5px]`}>Delete</span>
                      <Image className='h-[14px]' src="/delete.svg" height={14} width={15} layout="fixed" alt="Ddelete" />
                    </div>

                  </div>

                </div>

              ))}

              {customerInfo && customerInfo.address && customerInfo.address.length == 0 &&
                <Address hide={(obj) => hide(obj)} />
              }

              {visible &&
                <AddressModal edit_address={editAddress} visible={visible} hide={(obj) => hide(obj)} />
              }

              <div className='flex lg:bg-slate-100 flex items-center md:[22px] lg:h-[43px] px-[10px] rounded-md'>
                <span className='flex items-center justify-center md:hidden mr-[10px] w-[25px]'><Image className='h-[23px] object-contain' src="/checkout/payment.svg" height={20} width={20} layout="fixed" alt="Edit" /></span>
                <h6 className='text-[16px] font-semibold' >Payment Methods</h6>
              </div>

              <div className={`flex ${styles.card_detail} ${isMobile ? null : 'w-[95%] m-[0px_8px_auto_auto]'} md:border-b-[1px] md:border-slate-200 md:px-[10px] py-[10px] gap-[10px]`}>
                {payment_methods.map((res, index) => (
                  <div key={index} onClick={() => selectMethod(res, index)} className={`flex ${styles.payment_sec} ${isMobile ? 'w-max' : 'w-[15%]'} ${index == currentIndex ? 'active_border' : null} h-[50px] cursor-pointer items-center border rounded-[5px] p-[4px_10px] `}>
                    <input className={styles.input_radio} checked={index == currentIndex} type="radio" />

                    <div className={`flex justify-center items-center ${styles.sec_2}`}>
                      <img className="h-[13px]" src={check_Image(res.logo)} />
                    </div>

                    {/* {!isMobile &&
                      <div  className={`flex ${styles.card_info}`}>
                        <div  className={`${styles.sec_1}`}>
                          <h6 className='text-[14px] font-semibold'>{res.card_number}</h6> 
                          <h6 className={`${styles.sub_title}`}>{res.payment} <span className={`${styles.span_cls}`}>Edit</span></h6>  
                        </div> 
                        <div  className={`flex justify-center items-center ${styles.sec_2}`}>
                          <img  className="h-[13px]" src={imageChange(res)} />
                        </div> 
                      </div>
                      } */}
                  </div>
                ))}

              </div>

            </div>

            <div className={`${styles.box_2}`}>
              {/* lg:h-[calc(100vh_-_450px)] */}
              <div className='lg:border lg:rounded-[10px] md:border-b-[1px] border-slate-200 md:mb-[8px] lg:overflow-auto lg:hide-scrollbar lg:h-[calc(100vh_-_450px)]'>

                <h6 className='text-[16px] lg:sticky lg:z-[9] lg:bg-white lg:top-0 pt-[10px] px-[10px] font-semibold'>Your Orders</h6>
                {cart_items && cart_items.marketplace_items && cart_items.marketplace_items.map((res, index) => (
                  <div key={index} className="flex py-[10px] px-[25px] border-b-[1px] border-slate-200 last:border-b-[0px] gap-[7px] items-center">
                    <div className="relative w-1/4">
                      <Image src={check_Image(res.image)} height={130} width={130} layout="fixed" alt={res.name} />
                      <span className="absolute inline-flex items-center justify-center w-[24px] h-[24px] text-[12px] border border-slate-400 font-bold text-black bg-white rounded-full -top-2 -right-2">{res.quantity}</span>
                    </div>
                    <div className="w-3/4">
                      <h6 style={{ fontWeight: '600' }} className='font-semibold sub_title line-clamp-2 text-[15px]'>{res.item}</h6>
                      {res.attribute_description && <p className='text-[12px] gray_color'>{res.attribute_description}</p>}
                      <h6 className='font-semibold pt-[5px] text-[15px]'>{formatter.format(res.price)}</h6>
                    </div>
                  </div>
                ))}

              </div>

              {cart_items &&
                <div className='lg:border lg:rounded-[10px] md:border-b-[1px] border-slate-200 md:mb-[8px] lg:mt-[10px]'>

                  <h6 className='text-[16px] pt-[10px] px-[10px] font-semibold'>Discount Code</h6>

                  {/* border-sky-600 */}
                  {/* <div className="flex border h-[40px]  rounded-[5px] py-[5px] px-[7px] mt-[10px] mr-[10px] ml-[10px] items-center">
                      <Image className='' src={imageChange('Visa')} height={10} width={30} layout="fixed" />
                      <input className={`border-transparent !important text-[14px] mx-[5px] w-[217px]`} type="text" placeholder="Enter the coupon code" value={name}  onChange={handleNameChange} />
                      <button className='button text-end text-[14px] text-sky-400 font-semibold w-1/4'>Apply</button>
                    </div>  */}

                  <div className='flex flex-wrap  py-[10px] px-[25px] justify-between items-center'>
                    <h6 className='w-3/6 text-[14px] pb-[5px]'>Subtotal</h6>
                    <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(cart_items.total)}</h6>
                    <h6 className='w-3/6 text-[14px] pb-[5px]'>Shipping</h6>
                    <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>Free</h6>
                    <h6 className='w-3/6 text-[14px] pb-[5px]'>GST</h6>
                    <h6 className='w-3/6 text-[14px] text-end pb-[5px] text-medium'>{formatter.format(cart_items.tax)}</h6>

                    <h6 className='w-3/6 text-[14px] border-y-[1px] border-slate-200 my-[8px] py-[8px]'>Total</h6>
                    <h6 className='w-3/6 text-[14px] border-y-[1px] border-slate-200 text-end my-[8px] py-[8px] text-medium'>{formatter.format(cart_items.total + cart_items.tax)}</h6>

                  </div>

                  <div class="flex mb-[15px] justify-center items-center">
                    <LoaderButton loader={loader} buttonClick={checkout} width={'w-[90%]'} button_name={'Checkout Order'} />
                    {/* <button className={`${loader ? 'opacity-[0.9]' : null} primary_btn flex items-center justify-center text-[14px] h-[40px] w-[90%] hover:bg-red-200 focus:outline-none focus-visible:ring-2`} onClick={() => loader ? null : checkout() }>
                        {!loader && 'Checkout Order'}
                        {loader && <div class="animate-spin rounded-full h-[15px] w-[15px] border-l-2 border-t-2 border-white"></div>}
                      </button> */}
                  </div>

                </div>
              }
            </div>

          </div>



        </div>



      </RootLayout>
    </>
  )
}

const Backdrop = () => {
  return (
    <div className='backdrop'>
      <div className="h-[100%] flex flex-col gap-[10px] items-center  justify-center">
        <div class="animate-spin rounded-full h-[40px] w-[40px] border-l-2 border-t-2 border-black"></div>
        <span className='text-[15px]'>Loading...</span>
      </div>
    </div>
  )
}

