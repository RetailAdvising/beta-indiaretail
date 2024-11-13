import React from 'react'
import Rodal from 'rodal';
// include styles
import 'rodal/lib/rodal.css';
import Address from './Address';

export default function AddressModal({hide,visible,edit_address}) {
  // console.log(edit_address,"edit_address")
  return (
    <div className='address-popup'>
      <Rodal visible={visible} animation='slideUp' onClose={()=>{hide(undefined)}}>
         <h6 className='header border-b-[1px] border-slate-200 h-[45px] flex items-center text-[16px] font-semibold px-[10px] mb-[10px]'>{edit_address ? 'Edit Address' : 'Add Address'}</h6>
         <Address modal={true} edit_address={edit_address} hide={(obj)=>{ hide(obj)}}  />     
     </Rodal>
    </div>
  )
}
