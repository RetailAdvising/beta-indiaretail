import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { newsSubscribe } from '@/libs/api';


export default function AlertPopup({ message, show, data, news, hide, email = undefined }) {

    const [valid, setInvalid] = useState(true);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
        let element = document.getElementById('email');
        if (element && localStorage['userid']) {
            element.value = localStorage['userid'] ? localStorage['userid'] : '';
            setDisable(true);
        }
    }, [])


    async function checkEmail(type) {

        let get_group = [];
        let value = news.filter(res => { return res.selected == 1 })


        let element = document.getElementById('email');
    
        if(type && type =='button'){
            element = {}
            element.value =  localStorage['userid'] ? localStorage['userid'] : '';
        }

        if (element && element.value != null || element.value != '') {
            if (validateEmail(element.value)) {
                if (value && value.length != 0) {
                    value.map(res => {
                        get_group.push(res.title)
                    })
                    setInvalid(true)
                    let param = {
                        email: email ? email : element.value,
                        group: get_group
                        // group: data.custom_category
                    }
                    const res = await newsSubscribe(param);
                    if (res.status == 'Success') {
                        hide(res);
                        // show();
                    } else {
                        // show();
                    }
                } else {

                }
            } else {
                setInvalid(false);
            }
        }
    }

    const emailCheck = (e) => {
        let data = validateEmail(e.target.value);
        setInvalid(data)
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    return (
        <>
          {!disable && <div style={{ boxShadow: '0 -6px 5px ##dddddd1f' }} className="p-[15px_10px]">
                <div className='flex w-[100%] h-[45px] border rounded-[5px_20px_20px_5px] bg-white mb-[10px]'>
                    <div className='pl-[10px] flex items-center justify-center h-[45px]'><Image className={`h-[20px]`} src={'/email.svg'} height={30} width={30} alt='email' /></div>
                    <input value={email && email} disabled={disable ? true : false} id='email' onChange={emailCheck} placeholder="What's your email?" type='email' className={`text-[13.5px] border-0 w-full px-[10px]`} />
                    <button onClick={()=>checkEmail('email')} className='h-[43px] rounded-[0px_20px_20px_0px] p-[0_15px] text-[14px] primary_btn'>Subscribe</button>
                </div>
                {!valid && <p className='text-red text-[12px] m-[0_0_10px_5px]'>Enter a valid E-mail</p>}
            </div>
          }
          {disable &&
            <div className='flex items-center justify-center w-full'>
              <button onClick={()=>checkEmail('button')} className='w-[30%] h-[43px] rounded-[5px] p-[0_15px] text-[14px] primary_btn'>Save</button>
            </div> 
          }

            {/* <div className='absolute bottom-5 right-5 w-[75%] h-[45px] bg-[#eca2a273] rounded-[10px] flex items-center justify-between p-[10px] z-99'>
              <p className='text-[14px]'>Please select any one of the newsletter</p>
           </div> */}

        </>
    )
}
