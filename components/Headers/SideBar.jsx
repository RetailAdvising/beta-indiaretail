import React, { useEffect, useState, useRef } from 'react'
import header from '@/styles/Header.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useSelector, useDispatch } from 'react-redux';

export default function SideBar({ data, close, navbar,emit_item }) {
    const router = useRouter();
    const [valid, setValid] = useState(false)
    const [member, setMember] = useState(false);
    const ref = useRef(null);

    const user = useSelector(s => s.user);
    const role = useSelector(s => s.role);
    const [validator, setValidator] = useState(false)


    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage['apikey'] ? setValid(true) : null;
            // roleMember()
            checkRole()
            // let val = roleMember();
        }

        if (user) {
            localStorage['apikey'] ? setValid(true) : null;
            // roleMember()
            checkRole()
        }


        const handleClickOutside = (event) => {
            // let el = document.getElementById('side')?.classList;
            // let classs = (el && el != null) && Array.from(el);
            // let out = classs && classs.find(res => res == 'sideActive');
            if (ref.current && !ref.current.contains(event.target) && !navbar) {
                // el.remove('sideActive')
                close()
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [user,role])

    const checkRole = () => {
        if (role && role != '' && role.message && role.message.length != 0) {
          // console.log(role)
          // if(updateCmts == -1){
          for (let index = 0; index < role.message.length; index++) {
            if (role.message[index] == 'Member') {
            //   setValidator(!validator);
              setMember(!member)
            }
          }
          // }
        }
      }


    const route = async (type) => {
        if (type == 'login') {
            router.push('/login');
            close()
        } else if (type == 'subscribe') {
            router.push('/membership');
            close()
        }
    }

    const change_nav=(item)=>{
        // console.log(item);
        emit_item(item)
      router.push(item.redirect_url)
      close()
    }

    const myAccount = () => {
        router.push('/profile?my_account=')
        close()
    }

    const roleMember = () => {
        if (localStorage['roles']) {
            const data = JSON.parse(localStorage['roles']);
            if (data && data.length != 0) {
                data.map(res => {
                    if (res.role == 'Member') {
                        setMember(!member)
                    }
                })
            }
        }
    }

    const logout = () => {
        localStorage.clear();
        setValid(false);
        setMember(false);
        close();
        router.push('/')
    }


    return (
        <>
            {(data && data.header && data.header.items.length != 0 && navbar) && <div id='side' ref={ref} className={`bg-[#fff] w-[75%] h-full relative `}>
                {/* <div className=''> */}
                {valid ? <div className='flex items-center gap-[10px] border_bottom p-[15px]' onClick={myAccount}>
                    <Image className='h-[40px] w-[40px]' src={'/profit.svg'} height={17} width={17} alt={'profile'} />
                    <div>
                        {((user) || (localStorage && localStorage['full_name'])) && <p className='cursor-pointer text-[14px] font-[500]'>{(user.message && user.message.full_name) ? user.message.full_name : localStorage['full_name']}</p>}

                        {/* {localStorage && <p className='text-[15px] font-semibold'>{localStorage['full_name']}</p>} */}
                        {member &&
                            <div className='flex items-center gap-[8px]'>
                                <h6 className='text-[14px]'>Premium</h6>
                                <Image className='h-[15px] w-[15px]' src={'/Navbar/premium.svg'} height={20} width={20} alt='premium' />
                            </div>
                        }

                        {/* {localStorage && <p className='text-[14px] font-semibold'>{localStorage['userid']}</p>} */}
                    </div>
                    {/* <div className={`w-full flex justify-end`}>
                        <Image height={30} width={30} alt='hide' onClick={close} src={'/hide.svg'} />
                    </div> */}

                </div> :
                    <div className='flex gap-[10px] border_bottom p-[15px] items-center' onClick={myAccount}>
                        <div style={{ flex: '0 0 40px' }}>
                            <Image src={'/profit.svg'} height={40} width={40} alt={'profile'} />
                        </div>
                        <div className='w-full'>
                            <p className='text-[18px] font-semibold' style={{ color: '#000' }} >Welcome! to IndiaRetailing</p>
                            {/* <div className='w-[90%]'>
                            <button style={{ height: '30px', width: '150px', textTransform: 'uppercase', fontSize: '13px', padding: '5px 15px' }} className='uppercase primary_button' onClick={() => router.push('/login')}>Sign in</button>
                        </div> */}
                        </div>

                        {/* <div className={`w-full flex justify-end`} style={{flex:'0 0 30px'}}>
                        <Image height={25} width={25} alt='hide' onClick={close} src={'/hide.svg'} />
                    </div> */}

                    </div>}

                {/* </div> */}
                <div className=''>
                    {data.header.items.map(res => {
                        return (
                            <div key={res.section_name}>
                                {res.section_name == 'Header Menu' && res.menus && <ul>
                                    {res.menus.map(item => {
                                        return (
                                            // ${nav1 == item.redirect_url ? header.activeMenu : ''}
                                            <div  onClick={()=>change_nav(item)} key={item.menu_label} className='flex gap-[13px] items-center p-[10px_10px_10px_20px]'>
                                                <Image src={item.icon} className='h-[17px] w-[17px]' style={{ objectFit: 'contain' }} height={40} width={40} alt={item.menu_label} />
                                                <h6 className={`${header.listKey} font-medium text-[14px] navigation_c `} >
                                                    {item.menu_label}
                                                </h6>
                                                {/* <Image src='/rightArrow.svg' className='h-[20px] w-[20px] absolute right-2' style={{objectFit:'contain'}} height={40} width={40} alt='arrow' /> */}
                                            </div>
                                        )
                                    })}
                                    {valid && <div className='flex items-center gap-[13px] p-[10px_10px_10px_20px]' onClick={() => logout()}>
                                        <Image className='h-[17px] w-[16px]' src={'/Navbar/Logout.svg'} height={20} width={20} alt={'logout'}></Image>
                                        <button className=' text-[14px] font-medium cursor-pointer '>Logout</button>
                                    </div>
                                    }
                                </ul>}
                            </div>
                        )
                    })
                    }
                </div>

                {valid ? <div className='absolute bottom-[10px] w-[90%]  left-[15px]'>
                    <div className='justify-between items-center'>
                        {/* <div className='flex items-center gap-[10px] w-[50%] cursor-pointer' onClick={() => logout()}>
                            <Image className='h-[22px] w-[20px]' src={'/Navbar/Logout.svg'} height={20} width={20} alt={'logout'}></Image>
                            <button className=' text-[14px] cursor-pointer '>Logout</button>
                        </div> */}
                        {!member && <div className='flex flex-col gap-[10px] items-center cursor-pointer justify-end'>
                            <div onClick={() => route('subscribe')} className='flex w-max bg-[#e21b22] rounded-[5px] p-[8px_15px] gap-[5px] items-center justify-end '>
                                <Image className='h-[18px] w-[18px]' src={'/Navbar/premium.svg'} height={20} width={20} alt='premium' />
                                <p className='text-[#fff] text-[14px] cursor-pointer '>Subscribe</p>
                            </div>
                            <p className='text-[14px] text-center'>50,000+ articles, <span onClick={() => route('subscribe')} className='text-[14px] font-semibold primary_color'>IR Prime </span>is the only subscription you need </p>
                        </div>}
                    </div>

                </div> : <div className='absolute bottom-[10px] w-[90%]'>
                    <div className='flex justify-between items-center py-[10px]'>
                        {!member && <div className='flex  cursor-pointer justify-center w-full'>
                            <div className='flex bg-[#e21b22] rounded-[5px] p-[8px_15px] gap-[5px] items-center justify-end px-[20px]'>
                                {/* <Image className='h-[18px] w-[18px]' src={'/Navbar/premium.svg'} height={20} width={20} alt='premium' /> */}
                                <p onClick={() => {router.push('/login'),close()}} className='text-[#fff] text-[15px] cursor-pointer font-semibold'>Login</p>
                            </div>
                        </div>}
                    </div>
                    <div className='text-[13px] color-[#595959] text-center'>
                        {/* We have 50,000+ articles,  */}
                        {/* <span className='text-red text-[13px] font-bold'> */}
                        Stay informed and log in to access the latest news and updates.
                    </div>
                </div>}
                {/* //  :
                //     <div className='absolute w-[90%] bottom-[10px]'>
                //         <div className='flex bg-[#e21b22] justify-center w-[35%] rounded-[5px] p-[8px_15px] gap-[5px] items-center '>
                //             <Image className='h-[18px] w-[18px]' src={'/Navbar/premium.svg'} height={20} width={20} alt='premium' />
                //             <p onClick={() => route('subscribe')} className='text-[#fff] text-[14px] cursor-pointer '>Subscribe</p>
                //         </div>                </div>} */}
            </div>}
        </>
    )
}
