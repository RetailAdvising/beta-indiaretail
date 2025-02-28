import RootLayout from '@/layouts/RootLayout'
import OrderDetail from '@/components/ProfileCom/OrderDetail';

export default function thankyou({ order_id }) {

   return (
      <>
         <RootLayout>
            <div className='container lg:shadow-[0_0_5px_#f1f1f1] lg:p-[10px] rounded-[5px]'>
               {order_id && <OrderDetail loadPage={true} order_id={order_id} />}
            </div>
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