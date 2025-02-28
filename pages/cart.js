import Title from '@/components/common/Title'
import RootLayout from '@/layouts/RootLayout'
import { deleteCartItems, getCartItem, updateCartItems } from '@/libs/api'
import { check_Image } from '@/libs/common'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { checkMobile } from '@/libs/api';
import AlertUi from '@/components/common/AlertUi';
import LoaderButton from '@/components/common/LoaderButton';

export default function cart() {
    // const [value, setValue] = useState();
    // const [total, setTotal] = useState(0);

    let [cart_items, setCartItems] = useState({});
    const [load, setload] = useState(false);
    const [skeleton, setSkeleton] = useState(false)
    const router = useRouter();
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
    });

    // const getCarts = async () => {
    //     setSkeleton(!skeleton)
    //     let param = {
    //         customer: localStorage['customer_id'],
    //         user: ""
    //     }
    //     const resp = await getCartItems(param);
    //     if (resp && resp.message) {
    //         setValue(resp.message.cart);
    //         calculateTotal(resp.message.cart);
    //         setTimeout(() => {
    //             setSkeleton(false)
    //         }, 200);
    //     }
    // }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            getCarts('loader');
            checkIsMobile();
            window.addEventListener('resize', checkIsMobile)
            return () => {
                window.removeEventListener('resize', checkIsMobile);
            };
        }

    }, [])

    let [isMobile, setIsmobile] = useState();

    const getCarts = async (type) => {
        type == 'loader' ? setSkeleton(!skeleton) : null
        cart_items = await getCartItem();
        setCartItems(cart_items);
        setSkeleton(false)
    }

    const checkIsMobile = async () => {
        isMobile = await checkMobile();
        setIsmobile(isMobile);
    }

    async function update_cart(dataValue, type) {

        let param = {
            name: dataValue.name,
            //   qty: check_count(dataValue['quantity'],type),
            qty: type == 'inc' ? (dataValue['quantity'] + 1) : (dataValue['quantity'] - 1),
            "business": dataValue.business ? dataValue.business : '',
            qty_type: ""
        }

        const resp = await updateCartItems(param);
        if (resp.message.status == 'success') {
            getCarts('');
            setload(false)
            loadAttr = ''
            setLoadAttr(loadAttr)
        } else {
            setload(false);
            loadAttr = ''
            setLoadAttr(loadAttr)
            setAlertMsg({ message: resp.message.message ? resp.message.message : 'Something went wrong try again later' });
            setEnableModal_1(true);
        }
    }


    let [loadAttr, setLoadAttr] = useState('')
    const updateCart = async (dataValue, type, i) => {

        setload(true);
        // console.log(dataValue, 'dataValue')
        loadAttr = dataValue.name
        setLoadAttr(loadAttr)
        if (type == 'dec' && dataValue['quantity'] == 1) {
            dltCart(dataValue, i)
        } else if (dataValue['quantity'] > 0) {
            update_cart(dataValue, type);
        }

    }

    const [enableModal, setEnableModal] = useState(false)
    const [enableModal_1, setEnableModal_1] = useState(false)

    const [alertMsg, setAlertMsg] = useState({})

    async function dltCart(data, index) {
        setAlertMsg({ message: 'Do you want to delete the item', name: data.name, index: index });
        setEnableModal(true);
    }

    async function closeModal(value) {
        setEnableModal(false);
        setEnableModal_1(false);
        setload(false);
        loadAttr = ''
        setLoadAttr(loadAttr)
        if (value == 'Yes') {
            let param = { name: alertMsg.name }
            const resp = await deleteCartItems(param);
            if (resp.message.status == 'success') {
                getCarts('');
                setAlertMsg({});
            }
        }
    }

    async function closeModal_1(value) {
        setEnableModal_1(false);
        setload(false);
    }

    const [loader, setLoader] = useState(false)

    const buttonClick = () => {
        setLoader(true)
        router.push('/checkout')
    }

    return (
        <>
            <RootLayout>

                {enableModal &&
                    <AlertUi isOpen={enableModal} closeModal={(value) => closeModal(value)} headerMsg={'Alert'} button_1={'No'} button_2={'Yes'} alertMsg={alertMsg} />
                }

                {enableModal_1 && <AlertUi isOpen={enableModal_1} closeModal={(value) => closeModal_1(value)} headerMsg={'Alert'} button_2={'Ok'} alertMsg={alertMsg} />}


                <div className={`${isMobile ? 'p-[15px]' : 'container'} lg:pb-5`}>
                    {!isMobile && <Title data={{ title: 'Shopping Cart' }} />}
                    {/* {load && <div className='overlay'><Image src={'/cart/loading.gif'} className='h-[100px] w-full'  height={40} width={40} alt='loading' /></div>} */}
                    {(!skeleton && cart_items && cart_items.marketplace_items && cart_items.marketplace_items.length != 0) ? <div className={`flex items-baseline justify-between md:flex-wrap gap-[15px]`}>
                        <div className={`lg:border lg:border-slate-100 lg:p-[20px] lg:rounded-[5px] flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_0px)]`}>
                            <div className='flex md:hidden pb-[2px] items-center gap-5 justify-between '>
                                <p className='flex-[0_0_calc(45%_-_0px)]  font-semibold text-center'>Products</p>

                                <div className='flex flex-[0_0_calc(55%_-_10px)] '>
                                    {/* <p className='flex-[0_0_calc(35%_-_0px)] font-semibold text-center'></p> */}
                                    <p className='flex-[0_0_calc(20%_-_0px)] font-semibold text-center'>Price</p>
                                    <p className='flex-[0_0_calc(45%_-_0px)] font-semibold text-center'>Quantity</p>
                                    <p className='flex-[0_0_calc(20%_-_0px)] font-semibold text-center'>Total</p>
                                </div>

                            </div>
                            {cart_items.marketplace_items.map((res, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between ${index != cart_items.marketplace_items.length - 1 ? 'border_bottom' : ''} md:p-[10px] lg:py-[10px]`}>

                                        {isMobile && <div className='flex-[0_0_calc(5%_-_0px)] mr-[10px] lg:hidden'>
                                            <Image className='cursor-pointer h-[30px] w-[30px] object-contain' onClick={() => dltCart(res, index)} src={'/cart/delete.svg'} height={20} width={20} alt={res.name} />
                                        </div>}

                                        <div className='lg:flex-[0_0_calc(15%_-_0px)] md:flex-[0_0_calc(25%_-_0px)]'>
                                            <Image className='md:h-[120px] lg:h-[135px]' src={check_Image(res.image)} height={80} width={100} alt={res.name} />
                                        </div>

                                        <div className='lg:flex-[0_0_calc(80%_-_20px)] md:flex-[0_0_calc(70%_-_20px)] lg:flex mx-[10px]'>

                                            <div className='lg:flex-[0_0_calc(40%_-_0px)]'>
                                                <p className='text-[16px] line-clamp-2 font-semibold'>{res.product_name}</p>
                                                {res.attribute_description && <p className='text-[12px] gray_color'>{res.attribute_description}</p>}
                                            </div>
                                            <p className='lg:flex-[0_0_calc(20%_-_10px)] lg:mx-[5px] md:hidden text-[15px] font-semibold'>{formatter.format(res.price)}</p>

                                            <div className='lg:flex-[0_0_calc(40%_-_0px)] lg:justify-around lg:flex lg:items-center md:flex md:flex-row-reverse py-[6px] w-full md:justify-between'>
                                                <div className='flex items-center justify-between p-[10px] border border-slate-100 rounded-[5px] h-[30px] w-[85px] gap-[10px]'>
                                                    <Image onClick={() => (load && loadAttr == res.name) ? null : updateCart(res, 'dec', index)} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/_.svg'} height={20} width={20} alt='minus' />
                                                    {(load && loadAttr == res.name) ? <div class="animate-spin rounded-full h-[15px] w-[15px] border-l-2 border-t-2 border-black"></div> : <p className='font-semibold'>{res.quantity}</p>}
                                                    {/* {(load && index == indexs) ? <Image src={'/cart/loading.gif'} className='h-[75px] w-[40px]' height={40} width={40} alt='loading' /> : <p className='font-semibold'>{res.quantity}</p>} */}
                                                    <Image onClick={() => (load && loadAttr == res.name) ? null : updateCart(res, 'inc', index)} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/+.svg'} height={20} width={20} alt='plus' />
                                                </div>
                                                <p className='text-center font-semibold text-[15px]'>{isMobile ? formatter.format(res.price) : formatter.format(res.total)}</p>
                                            </div>

                                        </div>

                                        {!isMobile && <div className='flex-[0_0_calc(5%_-_0px)] md:hidden'>
                                            <Image className='cursor-pointer h-[30px] w-[30px] object-contain' onClick={() => dltCart(res, index)} src={'/cart/delete.svg'} height={20} width={20} alt={res.name} />
                                        </div>}




                                        {/* <Image className='flex-[0_0_calc(5%_-_10px)] cursor-pointer' onClick={() => dltCart(res)} src={'/cart/Remove.svg'} height={20} width={20} alt={res.name} />
                                        <Image className='flex-[0_0_calc(15%_-_10px)] h-[150px] w-[100px]' src={check_Image(res.image)} height={80} width={100} alt={res.name} />
                                        
                                        <p className='flex-[0_0_calc(25%_-_10px)] text-[16px] font-semibold'>{res.product_name}</p>
                                        <p className='flex-[0_0_calc(15%_-_10px)] md:hidden text-[16px] font-semibold'>Rs {res.price}</p>
                                        <div className='flex flex-[0_0_calc(15%_-_10px)] items-center justify-between p-[10px] border h-[30px] w-[100px] gap-[10px]'>
                                            <Image onClick={() => updateCart(res, 'dec', index)} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/_.svg'} height={20} width={20} alt='minus' />
                                            {(load && index == indexs) ? <Image src={'/cart/loading.gif'} className='h-[75px] w-[40px]' height={40} width={40} alt='loading' /> : <p className='font-semibold'>{res.quantity}</p>}
                                            <Image onClick={() => updateCart(res, 'inc', index)} className='h-[20px] cursor-pointer w-[10px]' src={'/cart/+.svg'} height={20} width={20} alt='plus' />
                                        </div>
                                        <p className='flex-[0_0_calc(15%_-_10px)] text-center font-semibold text-[16px]'>Rs {res.total}</p> */}
                                    </div>
                                )
                            })}
                        </div>
                        {cart_items && <div className={`border md:flex-[0_0_calc(100%_-_20px)] rounded-[5px] lg:flex-[0_0_calc(30%_-_10px)]  md:m-[10px]`}>
                            <p className='p-[8px] pb-[10px] md:mb-[5px] lg:text-[18px] font-semibold border_bottom'>Payment details</p>
                            <p className='px-[8px] flex justify-between leading-[2.0] text-[15px]'><span className='flex gap-[10px] text-[15px] items-center'>Total Item</span><span>{cart_items.marketplace_items ? cart_items.marketplace_items.length : 0}</span></p>
                            <p className='px-[8px] flex justify-between leading-[2.0] text-[15px]'><span className='flex gap-[10px] text-[15px] items-center'>Subtotal <Image className='rounded-full h-[15px] w-[20px] object-contain' src={'/cart/question.svg'} height={10} width={10} alt='qns' /></span><span>{formatter.format(cart_items.total)}</span></p>
                            <p className='px-[8px] flex justify-between leading-[2.0] text-[15px]'><span className='text-[15px]'>Shipping</span><span className='text-[15px] '>Free</span></p>
                            <p className='px-[8px] flex justify-between leading-[2.0] text-[15px]'><span className='text-[15px]'>GST</span><span className='text-[15px]'>{formatter.format(cart_items.tax)}</span></p>
                            <p style={{ borderTop: '1px solid #EEEEEE' }} className='px-[8px] flex justify-between mt-[10px] leading-[2.0] text-[15px] border_bottom py-[6px]'><span className='text-[15px]'>Total</span><span className='text-[15px]'>{formatter.format(cart_items.total + cart_items.tax)}</span></p>
                            <LoaderButton loader={loader} buttonClick={buttonClick} width={'w-[calc(100%_-_10px)] m-[7px_5px]'} button_name={'Proceed to checkout'} />

                            {/* <button className='capitalize primary_btn text-[14px] h-[40px] md:w-[calc(100%_-_10px)] md:m-[7px_5px]' onClick={() => router.push('/checkout')}>Proceed to checkout</button> */}
                        </div>}
                    </div> : skeleton ? <Skeleton /> :
                        <div className='md:h-[50vh] lg:h-[60vh] grid place-content-center'>
                            <Image src={'/cart/no_cart.svg'} height={100} width={100} alt='no cart' className='md:h-[200px] md:w-[220px] lg:h-[270px] lg:w-[300px]' />
                            <p className='p-[10px] text-center font-semibold text-[18px]'>Your Cart is Empty</p>
                            <button className='primary_button lg:h-[40px] md:h-[35px]' onClick={() => router.push('/bookstore')}>Return shop</button>
                        </div>}
                </div>
            </RootLayout>
        </>
    )
}


const Skeleton = () => {
    return (
        <div className='flex justify-between md:flex-wrap gap-[15px]'>
            <div className='border p-[20px] rounded-[5px] flex-[0_0_calc(70%_-_10px)] md:flex-[0_0_calc(100%_-_10px)]'>
                <div className='flex pb-[20px] items-center gap-5 justify-between '>
                    <p className='flex-[0_0_calc(45%_-_10px)] h-[20px] w-[80px] bg-[#E5E4E2] font-semibold text-center'></p>
                    <p className='flex-[0_0_calc(15%_-_10px)] h-[20px] w-[80px] bg-[#E5E4E2] font-semibold text-center'></p>
                    <p className='flex-[0_0_calc(15%_-_10px)] h-[20px] w-[80px] bg-[#E5E4E2] font-semibold text-center'></p>
                    <p className='flex-[0_0_calc(15%_-_10px)] h-[20px] w-[80px] bg-[#E5E4E2] font-semibold text-center'></p>
                </div>
                {[0, 1, 2].map((res, index) => {
                    return (
                        <div key={index} className={`flex gap-[15px]  items-center justify-between border_bottom pb-[10px] mb-[10px]`}>
                            <p className='flex-[0_0_calc(5%_-_10px)] bg-[#E5E4E2] h-[20px] cursor-pointer' />
                            <p className='flex-[0_0_calc(15%_-_10px)] bg-[#E5E4E2] h-[150px] w-[100px]' />
                            <p className='flex-[0_0_calc(25%_-_10px)] bg-[#E5E4E2] h-[15px] text-[16px] font-semibold'></p>
                            <p className='flex-[0_0_calc(15%_-_10px)] bg-[#E5E4E2] h-[15px] text-[16px] font-semibold'></p>
                            <div className='flex flex-[0_0_calc(15%_-_10px)] items-center justify-between p-[10px] border h-[30px] w-[100px] gap-[10px]'>
                                <p className='h-[20px] cursor-pointer bg-[#E5E4E2]  w-[10px]' />
                                <p className='h-[20px] cursor-pointer bg-[#E5E4E2]  w-[10px]' />
                                <p className='h-[20px] cursor-pointer bg-[#E5E4E2] w-[10px]' />
                            </div>
                            <p className='flex-[0_0_calc(15%_-_10px)] h-[20px] bg-[#E5E4E2] text-center font-semibold text-[16px]'></p>
                        </div>
                    )
                })}
            </div>
            <div className={`border md:flex-[0_0_calc(100%_-_10px)] h-[250px] rounded-[5px] p-[20px] flex-[0_0_calc(30%_-_10px)]`}>
                <p className='pb-[10px] w-[100px] mb-[10px] bg-[#E5E4E2] h-[15px] text-[20px] font-semibold border_bottom'></p>
                <div className='flex justify-between leading-[2.5] text-[16px] my-[10px]'><span className='flex gap-[10px] bg-[#E5E4E2] h-[15px] w-[80px] text-[16px] items-center'></span><span className='bg-[#E5E4E2] h-[15px] w-[50px]'></span></div>
                <p className='flex justify-between leading-[2.5] text-[16px]'><span className='text-[16px] bg-[#E5E4E2] h-[15px] w-[80px]'></span><span className='text-[16px] bg-[#E5E4E2] h-[15px] w-[60px]'></span></p>
                <p className='flex justify-between my-[10px] leading-[2.5] text-[16px]'><span className='text-[16px] bg-[#E5E4E2] h-[15px] w-[80px]'></span><span className='text-[16px] bg-[#E5E4E2] h-[15px] w-[60px]'></span></p>
                <div style={{ borderTop: '1px solid #EEEEEE' }} className='flex justify-between mt-[10px] leading-[2.5] text-[16px] border_bottom py-[10px]'><span className='text-[16px] bg-[#E5E4E2] w-[60px] h-[15px]'></span><span className='text-[16px] bg-[#E5E4E2] h-[15px] w-[60px]'></span></div>
                <button className='capitalize  text-[14px] h-[40px] w-full mt-[25px] bg-[#E5E4E2] ' ></button>
            </div>
        </div>
    )
}
