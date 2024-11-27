import ImageLoader from '../ImageLoader'

const Reports = ({data, click_data}) => {
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-3 mt-5 gap-[15px]'>
         {
            data.map((res,i)=>(
                <div key={i} className='border rounded-xl p-3 flex gap-4 cursor-pointer' onClick={()=> click_data(res)}>
                   <div className='min-w-[90px]'>
                     <ImageLoader style={`object-cover h-[90px] w-full rounded-lg`} src={res.image} />
                   </div>
                   <div>
                     <h2 className='uppercase text-[#E21B22] md:text-[14px] font-semibold nunito line-clamp-1'>{res.title}</h2>
                     <p className='text-[16px] font-normal md:text-[13px] mt-2 nunito line-clamp-2'>{res.description}</p>
                   </div>
                </div>
            ))
         }
      </div>
    </>
  )
}

export default Reports