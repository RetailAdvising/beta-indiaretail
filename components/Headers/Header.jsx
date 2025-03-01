import { useEffect, useState } from 'react'
import Image from 'next/image'
import styles from '@/styles/Header.module.scss'
import { useRouter } from 'next/router'
import { check_Image } from '@/libs/common'
import { search_product, checkMobile, user_roles } from '@/libs/api';
import { useSelector, useDispatch } from 'react-redux';
import setUser from 'redux/actions/userAction';
import setRole from 'redux/actions/roleAction';
import dynamic from 'next/dynamic'
const AuthModal = dynamic(() => import('../Auth/AuthModal'))
export default function Header({ checkout }) {
    const router = useRouter();
    const head = {
        btn1: 'Subscribe',
        btn2: 'Sign in',
    }

    const user = useSelector(s => s.user);
    const role = useSelector(s => s.role);
    const dispatch = useDispatch()

    const profile = [{ name: 'Logout', icon: '/Navbar/Logout.svg' }, { name: 'Profile', icon: '/login/profile-01.svg', route: '/profile?my_account=edit-profile', mob_route: '/profile?my_account=' }]
    const [valid, setValid] = useState(false);
    const [loader, setLoader] = useState(false);

    // Search
    const [enableSearch, setEnableSearch] = useState(false)
    const [searchResult, setSearchResult] = useState([])
    const [searchValue, setSearchValue] = useState(undefined)

    useEffect(() => {
        // console.log(user)
        if (typeof window !== 'undefined' && localStorage['apikey']) {
            roles()
            // console.log(data)
            // dispatch(setUser(s => s['message']['user_id'] = data.user_id))
            localStorage['apikey'] ? setValid(false) : null;
            // roleMember();
        } else {
            dispatch(setUser(null))
            dispatch(setRole(null))
            localStorage.clear();
        }

        getWithExpiry('api')

        setLoader(true);

    }, [user])

    const roles = async () => {
        if (localStorage && localStorage['apikey']) {
            const resp = await user_roles();
            if (resp.status == 'Success') {
                dispatch(setRole(resp))
                // console.log(resp)
            }

        }
    }

    const [isMobile, setIsMobile] = useState()
    useEffect(() => {

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile)
        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [valid, role])

    const checkIsMobile = async () => {
        let isMobile = await checkMobile();
        setIsMobile(isMobile);
    }

    const myAccounts = () => {
        router.push(isMobile ? '/profile?my_account=' : '/profile?my_account=edit-profile')
        // if (data.name == 'Logout') {
        //     localStorage.clear();
        //     router.push('/login')
        // } else if (data.name == 'Profile') {
        //     router.push(isMobile ? data.mob_route : data.route)
        // }
    }

    async function searchText(eve) {
        let value = eve.target.value;
        if (value) {
            let params = {
                search_txt: value
            }
            const resp = await search_product(params);
            // console.log(resp);
            if (resp && resp.status == 'success') {
                setSearchResult(resp.data)
                setSearchValue(value)
            }
        } else {
            setSearchResult([]);
            setSearchValue(undefined)
        }
    }

    async function handleKeyDown(event) {
        // console.log(event)
        if (event.key === 'Enter') {
            navigateSearchScreen('search')
            // console.log(event)
        }
    }

    function getWithExpiry(key) {
        const itemStr = localStorage.getItem(key)
        // Set the session timeout to 90 days from today.
        // var today = new Date();
        // var ninetyDaysFromToday = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000);
        // document.cookie = "sessionTimeout=" + ninetyDaysFromToday.toUTCString() + "; path=/";
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null
        }

        const item = JSON.parse(itemStr)
        const now = new Date()

        // compare the expiry time of the item with the current time
        if (now > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            // localStorage.removeItem(key)
            dispatch(setUser(null))
            dispatch(setRole(null))
            localStorage.clear();
            setValid(true);
            // setLoader(true);
            return null
        }
    }

    function searchFn() {
        router.push('/search?searchText=');
        // const inputElement = document.getElementById('myInput');

        // if (inputElement) {
        //     inputElement.blur();
        //     setEnableSearch(true);


        //     let element = document.getElementById('search');
        //     if (element) {
        //         element.focus();
        //     }

        // }
    }

    const clearSearch = (data) => {
        setSearchValue(undefined)
        let element = document.getElementById(data).value = '';
    }

    const navigateSearchScreen = (data) => {
        let element = document.getElementById(data).value;
        if (element && element != '') {
            setSearchResult([]);
            setEnableSearch(false);
            router.push('/search?searchText=' + element);
        }

    }

    const navigateDetail = (data) => {
        // router.push('/login')
        let route = ''
        if (data.type == 'Articles') {
            route = data.ir_prime == '1' ? '/IRPrime/' + data.route : '/categories/' + data.route
        } else if (data.type == 'Product') {
            route = '/bookstore/' + data.route
        } else if (data.type == 'News') {
            route = '/news/' + data.route
        } else if (data.type == 'Podcast') {
            route = '/podcast/' + data.route
        } else if (data.type == 'Video') {
            route = '/ir/' + data.route
        } else if (data.type == 'Newsletter') {
            route = '/newsletters/' + data.route
        }

        if (route) {
            router.push(route);
            setEnableSearch(false);
            setSearchResult([]);
        }
    }


    // Modal Popup
    const [modal, setModal] = useState('')

    const [visible, setVisible] = useState(false)
    function show() {
        setVisible(true);
    }

    function hide() {
        setVisible(false)
    }

    const navigateMembership = () => {
        localStorage['prev_route'] = '/IRPrime'
        router.push('/membership')
    }

    return (
        <>
            {head &&
                <div className={`border_bottom`}>
                    <div className='container relative p-[0px] md:hidden grid grid-cols-3 items-center justify-between lg:my-[20px]'>
                        {/* <div> */}

                        <div onClick={searchFn} className={`flex w-max items-center cursor-pointer gap-[2px] search_hover px-[10px] py-[5px] rounded-lg`}>
                            <Image style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} className="h-[18px]"></Image>
                            <p className={`text-[14px] nunito`}>Search</p>
                            {/* <input id="myInput" className={styles.input1} type="text" placeholder='Search here...' name="search"></input> */}
                        </div>

                        {enableSearch &&

                            < >
                                {/* onMouseLeave={setEnableSearch(false)} onKeyPress={()=>{navigateSearchScreen('search')}}*/}
                                <div className='absolute top-[15px] z-[99] w-full bg-white h-[150px] opacity-70'></div>
                                <div className='w-full absolute z-[99] top-[25px]'>
                                    <div className='w-[60%] m-[0_auto] relative bg-white '>
                                        <div onClick={() => { setEnableSearch(false) }} className='cursor-pointer absolute right-[-60px] px-[10px] h-[45px]'><Image height={20} priority width={20} alt='search' src={'/cart/close.svg'} className="h-[30px]"></Image></div>
                                        <div className={`flex border rounded-[10px]`}>
                                            <input id='search' className={'border-[0px] p-[10px] w-full rounded-[10px]'} onChange={searchText} onKeyDown={handleKeyDown} type="text" placeholder='Search here...' name="search"></input>
                                            {searchValue && <div onClick={() => { setSearchResult([]), clearSearch('search') }} className='cursor-pointer flex items-center justify-center px-[10px] h-[45px]'><Image height={20} priority width={20} alt='search' src={'/cart/close.svg'} className="h-[24]"></Image></div>}
                                            <div onClick={() => { navigateSearchScreen('search') }} className='border-l-[1px] p-[10px] cursor-pointer border-l-slate-100 flex items-center justify-center'><Image style={{ objectFit: 'contain' }} height={60} priority width={24} alt='search' src={'/search.svg'} className=""></Image></div>
                                        </div>
                                        <div className={`${searchResult && searchResult.length == 0 ? 'min-h-[275px] flex items-center justify-center' : null} bg-white border overflow-auto scrollbar-hide max-h-[275px] mt-[2px] rounded-[10px]`}>
                                            {searchResult && searchResult.length == 0 ? <EmptySection searchValue={searchValue} /> :
                                                searchResult.map((res, index) => {
                                                    return (
                                                        <div onClick={() => { navigateDetail(res) }} className='flex items-center justify-between cursor-pointer border-b-[1px] border-b-slate-100 last-child:border-b-[0px]  p-[10px]'>
                                                            <div className='flex items-center gap-[8px]'>
                                                                <div className='flex items-center justify-center h-[55px]'><Image className='h-[50px]' src={check_Image(res.product_image)} height={50} width={50} alt={res.title} /></div>
                                                                <h6 className='text-[15px] line-clamp-1 font-semibold'>{res.title}</h6>
                                                            </div>
                                                            <div className='flex items-center justify-center'><Image height={8} priority width={8} alt='search' src={'/forwardIcon.svg'} className="opacity-50"></Image></div>

                                                        </div>
                                                    )
                                                })}
                                        </div>
                                    </div>
                                </div>
                            </>
                        }


                        <div className=''>
                            <Image style={{ objectFit: 'cover' }} className='m-auto cursor-pointer' height={66} priority width={200} alt='' onClick={() => router.push('/')} src={'/indiaretail.png'}></Image>
                        </div>
                        {loader &&
                            <>
                                {/* !valid && (!user || user != '') */}
                                {/* <p>user: {JSON.stringify(user)}</p>
                            <p>role: {JSON.stringify(role)}</p> */}
                                {!role ?
                                    <div className={`flex items-center justify-end gap-3 `}>

                                        <button type='button' onClick={() => navigateMembership()} className={`${styles.btn_sub} nunito`}>{head.btn1}</button>
                                        <button type='button' id='sign-in' onClick={show} className={`${styles.btn_sig} nunito`}>{head.btn2}</button>
                                    </div>
                                    :
                                    <div className={`flex justify-end ${valid ? 'hidden' : ''}`}>
                                        {/* ((user) || (localStorage && localStorage['userid'])) */}
                                        {((user) || role) && <div onClick={myAccounts} className='flex cursor-pointer items-center gap-[10px]'>
                                            <Image src={'/Navbar/profile.svg'} className={`cursor-pointer  h-[30px] w-[30px] `} height={30} width={30} alt='profile' />
                                            <div>
                                                {/* (user != '' && user.message && user.message.user_id) ? user.message.user_id : localStorage['userid'] */}
                                                <p className={`cursor-pointer text-[14px] font-[700] nunito`}>{role.user ? role.user : (user != '' && user.message && user.message.user_id) ? user.message.user_id : ''}</p>
                                            </div>
                                        </div>}
                                        {/* <div>
                                            <Image className='cursor-pointer h-[8px] w-[13px]' src={'/Navbar/down.svg'} height={20} width={20} alt='down' />
                                        </div> */}

                                    </div>
                                }
                            </>
                        }
                    </div>
                </div>
            }

            {visible && <div className='authModal'><AuthModal modal={modal} show={show} visible={visible} hide={hide} /></div>}


        </>
    )
}


const EmptySection = (searchValue) => {
    return (
        <>
            <div className='flex flex-col items-center justify-center'>
                <div className='h-[140px]'>
                    <Image className='h-full w-full' height={66} priority width={200} alt='' src={searchValue ? '/empty_states/no-news.svg' : '/empty_states/no-comment.svg'}></Image>
                </div>
                <h6 className='text-[15px] font-semibold py-[10px]'>{searchValue ? 'No article found' : 'Enter the text to search a latest news'}</h6>
            </div>
        </>
    )
}      