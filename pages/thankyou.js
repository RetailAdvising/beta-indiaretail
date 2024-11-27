import RootLayout from '@/layouts/RootLayout'
import OrderDetail from '@/components/ProfileCom/OrderDetail';

export default function thankyou({ order_id }) {

   return (
      <>
         <RootLayout>
            <div className='container lg:shadow-[0_0_5px_#f1f1f1] lg:p-[10px] rounded-[5px]'>
               {order_id && <OrderDetail loadPage={true} order_id={order_id} />}
            </div>

            {/* <div className='h-[calc(100vh_-_280px)] flex items-center'>
        <div className='shadow-[0_0_5px_#ddd] flex items-center justify-center flex-col gap-[10px] rounded-[5px] w-[400px] m-[0_auto] ' >

           <div className='w-full'><Image className={`h-[100px]`} src={'/thankyou/celebration.svg'} height={110} width={120} alt={''}></Image></div>

           <div className='h-[110px] w-full flex items-center justify-center'>
            <Image className={`h-[110px] object-contain`} src={'/membership/trophy.svg'} height={150} width={150} alt={''} />
           </div>
           <h6 className='text-[15px] font-semibold'>Your order has been submitted successfully</h6>
           <p className='text-center text-[14px] gray_color'>Thank you for shopping with us. ...</p>
           <div className='pb-[15px]'><button onClick={()=>{router.push('/bookstore')}} className={`primary_btn text-white p-[5px_25px] text-[13.5px] h-[35px] rounded-[5px]`}>Continue Shopping</button> </div>
        </div>
       </div> */}
         </RootLayout>

      </>
   )
}

export async function getServerSideProps({ query }) {
   let order_id = query.order_id
   return {
      props: { order_id }
   }
}