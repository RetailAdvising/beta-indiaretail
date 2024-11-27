
const KeyPointsCard = ({data, index}) => {

 // console.log('len', len);
  
  return (
    <div className='bg-[#F0F0F0] p-2 h-full'>
       <p className='text-[#797979] pb-[6px] text-[16px] font-semibold'>[{`${index < 9 ? '0' : ''}${index+1}`}]</p>

       <p className={`text-[#202121] text-[18px] contents md:text-[16px] font-normal`}>{data.key_points}</p>
    </div>
  )
}

export default KeyPointsCard