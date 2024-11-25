import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { like, dislike, getList, addComment } from '@/libs/api';
import Modal from '../common/Modal';
import AlertUi from '../common/AlertUi';
import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import CommentModal from './CommentModal'
// import { Nunito } from 'next/font/google'
import format from 'date-fns/format'

// const nunito = Nunito({
//     weight: ["300", "400", "500", "600", "700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
// })
export default function Comments({ data, isLast, load, comments, route, updatedCmt, cur, isModal, hide, noScroll, no_data, showSidebar }) {
    const [input, setInput] = useState({ index: -1, show: false })
    const [comment, setComment] = useState()
    const [reportComment, setReporComment] = useState()
    const [selecedComment, setSelecedComment] = useState()
    const [isSuccessPopup, setIsSuccessPopup] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")
    function showInputs(index) {
        setInput({ index: index, show: true });
    }

    const cardref = useRef(null)
    useEffect(() => {
        // setComment(data)
        // setTimeout(() => {
        //     scrollElement()
        // }, 1000);
        if (!cardref?.current) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (isLast && entry.isIntersecting) {
                load()
                observer.unobserve(entry.target);
            }
        });

        observer.observe(cardref.current);
    }, [isLast, reportComment])

    const likeCmt = async (e,comm, index) => {
        // console.log(route)
        e.stopPropagation()
        noScroll(true);
        if ((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']) {
            setAlertMessage({ message: 'Do you want to like this comment ? you need to login.' })
            setIsSuccessPopup(true)

        } else {
            let param = {
                name: comm.name,
                like: comm.is_liked == 1 ? 'No' : 'Yes'
            }
            comm['is_liked'] == 1 ? 0 : 1
            const resp = await like(param);
            if (resp.status == 'Success') {
                // console.log(comm)
                updatedCmt(comm, route, index)
                // setComment(resp.message);
                // if (comments) {
                //     let index = comments.comments.findIndex(res => { return res.name == resp.message.name })
                //     if (index >= 0) {
                //         comments['comments'][index] = resp.message
                //         // store_comments(comments); john
                //     }
                // }
            }
            // setComment({...comm,likes:(comm.is_liked && comm.is_liked == 1) ? comm.likes - 1:comm.likes + 1
            //     ,is_liked:(comm.is_liked && comm.is_liked == 1) ? 0 : 1})  ;
            //     if(comm.is_disliked ==1 && comm.is_liked == 0) dislikeCmt(comm);
        }
    }
    const dislikeCmt = async (e,comm, index) => {
        // console.log(comment);
        // console.log(route)
        e.stopPropagation()
        noScroll(true);
        if ((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']) {
            setAlertMessage({ message: 'Do you want to dislike this comment ? you need to login.' })
            setIsSuccessPopup(true)

        } else {
            let param = {
                name: comm.name,
                dislike: comm.is_disliked == 1 ? 'No' : 'Yes'
            }
            comm['is_disliked'] == 1 ? 0 : 1
            const resp = await dislike(param);
            if (resp.status == 'success') {
                // setComment(resp.message);
                // console.log(comm)
                updatedCmt(comm, route, index)
                // if (comments.comments) {
                //     let index = comments.comments.findIndex(res => { return res.name == resp.message.name })
                //     if (index >= 0) {
                //         comments['comments'][index] = resp.message
                //         store_comments(comments);
                //     }
                // }


            }
            // setComment({...comm,dislikes:(comm.is_disliked && comm.is_disliked == 1) ? comm.dislikes - 1:comm.dislikes + 1,
            //     is_disliked:(comm.is_disliked && comm.is_disliked == 1) ? 0 : 1});
            //     console.log(comment);
        }
    }
    const closeModal = () => {
        setIsSuccessPopup(false)
    }
    const report = async (cur_command) => {
        // noScroll(false);
        noScroll(true);
        if ((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']) {
            setAlertMessage({ message: 'Do you want to report this comment ? you need to login.' })
            setIsSuccessPopup(true)
            return
        }
        let param = {
            doctype: "Report Type",
            fields: ["name", "title"]
        }
        let resp = await getList(param)
        if (resp.message) setReporComment(resp.message)
        //  console.log(reportComment);

        setSelecedComment(cur_command)
        show()
    }

    // Modal Popup
    const [modal, setModal] = useState('')
    const [visible, setVisible] = useState(false)

    function show() {
        setVisible(true);
        setModal('report')
    }

    const hideReport = (resp_message) => {
        // console.log(resp_message);
        setVisible(false)

        if (resp_message && resp_message.message) {
            toast.success(resp_message.message);
            // setAlertMessage(resp_message)
            // setIsSuccessPopup(true)
        }
    }

    let [mod, setMod] = useState(false)
    function hides() {
        mod = true
        setMod(mod)
        // setVisible(false)
        // if (localStorage['roles']) {
        //     const data = JSON.parse(localStorage['roles']);

        //     if (data && data.length != 0) {
        //         data.map(res => {
        //             if (res.role == 'Member') {
        //                 setValidator(true);
        //             }
        //         })
        //     }
        // }
    }

    let [showPopup, setShowPopup] = useState(false)
    let [cmtVal, setCmtVal] = useState('')
    async function sendMsg(id) {
        if ((localStorage || !localStorage) && !localStorage['apikey'] && !localStorage['secret']) {
            setAlertMessage({ message: 'Do you want to comment this article ? you need to login.' })
            setIsSuccessPopup(true)
            return
        }
        let element = document.getElementById(id + cur.name);
        // console.log(element, 'element')
        if (element?.value && element?.value != '') {
            cmtVal = element.value;
            setCmtVal(cmtVal)
            showPopup = true
            setShowPopup(showPopup)

        } else {
            cmtVal = '';
            setCmtVal(cmtVal)
            showPopup = true
            setShowPopup(showPopup)
        }
    }

    const hides1 = (type, data) => {
        showPopup = false;
        setShowPopup(showPopup)
        if (type == 'save') {
            submitMsg(data)
        }
    }

    let [showBtn, setShowBtn] = useState(false)
    const msgChange = (val) => {
        if (val.target.value && val.target.value != '') {
            showBtn = true;
            setShowBtn(showBtn)
        } else {
            showBtn = false;
            setShowBtn(showBtn)
        }

        // let element = document.getElementById('cmt' + cur.name).value = val;
    }

    const submitMsg = async () => {
        // let param = { article: cur.name, comment: element.value };
        let element = document.getElementById('cmt' + cur.name);
        // if (element) element.value = data
        if (element && element.value) {
            let param = { article: cur.name, comment: element.value };
            let resp = await addComment(param);
            // console.log(resp,"resp")
            if (resp.message) {
                // console.log(resp, "resp")
                toast.success("The comment will appear once it's been approved by IndiaRetailing");
                if (hide) {
                    hide()
                }
                // setAlertMessage({ message: "The comment will appear once it's been approved by IndiaRetailing" })
                setIsSuccessPopup(true)
                setTimeout(() => {
                    if (element) element.value = '';
                }, 200);
                // console.log(resp.message);
                // resp.message["is_liked"] = 0
                // resp.message["likes"] = 0
                // resp.message["is_disliked"] = 0
                // resp.message["dislikes"] = 0
                // setComments(c => [...c, resp.message])

                // let array  = []
                // array.push(resp['message']);
                // cur.comments = [...comments, ...array];
                // store_comments(cur);
            }
        }
        else {
            setAlertMessage({ message: "Please enter a comment." })
            setIsSuccessPopup(true)
        }
    }

    const scrollElement = () => {
        const el = document.getElementById('scroll');
        // const el1 = document.getElementById('scrollTag');
        el?.addEventListener('scroll', ($event) => {
            console.log($event)
            if ($event.target.scrollTop + $event.target.offsetHeight >= $event.target.scrollHeight) {
                // console.log('pagination.....')
                // if (!no_product) {
                //     // console.log('scroll')
                //     page_no > 1 ? get_list() : null
                //     page_no = page_no + 1
                // }
                // page_no = page_no + 1
                // get_list()
            }
        })
    }

    const dateFormat = (data) => {
        // console.log(data)
        if (data && data != null) {
            const formattedDate = format(new Date(data), "d LLL yyyy");
            // setDate(formattedDate)
            // console.log(formattedDate)
            return formattedDate
        } else {
            return data
        }
    }


    // console.log(comment)
    return (
        <>
            {/* <ToastContainer position={'bottom-right'} autoClose={2000} /> */}
            {data && false &&
                data.map((comment, index) => {
                    return (
                        // < div ref={cardref} className={`transition-all ease-in delay-500 duration-500 last:border-0 ${cmt ? 'p-[10px]' : ''}  ${!isLast ? 'border_bottom' : ''}`}>
                        <div key={index} className={`flex gap-3 p10`}>
                            <div>
                                <Image className='rounded-full object-contain' src={'/profit.svg'} height={48} width={48} alt={comment.name} />
                            </div>
                            <div className='max-w-full w-full comment'>
                                {/* | <span>{comment.duration}</span> */}
                                <p className='flex gap-3 '><h6 className='font14_bold'>{comment.comment_by}</h6> </p>
                                <div className='py-2 sub_title' dangerouslySetInnerHTML={{ __html: comment.content }} />
                                <div className='flex justify-between items-center py-[5px]'>
                                    <div className='flex gap-3'>
                                        {/* || (comment.likes && comment.likes == 1) */}
                                        <p className='flex gap-2 items-center sub_title'><span>{comment.likes}</span>
                                            <div className='cursor-pointer' onClick={() => likeCmt(comment, index)}>
                                                <Image className='h-[20px] w-[20px]  ' src={(comment.is_liked && comment.is_liked == 1) ? '/like-active.svg' : '/like.svg'} height={20} width={20} alt={""} />
                                            </div>

                                        </p>
                                        {/* || (comment.dislikes && comment.dislikes == 1) */}
                                        <p className='flex gap-2 items-center sub_title'><span>{comment.dislikes}</span>
                                            <div className='cursor-pointer' onClick={() => dislikeCmt(comment, index)}>
                                                <Image className='h-[20px] w-[20px]  cursor-pointer' src={(comment.is_disliked && comment.is_disliked == 1) ? '/dislike-active.svg' : '/dislike.svg'} height={20} width={20} alt={""} />
                                            </div>

                                        </p>
                                        {/* <p className='sub_title'>Share</p>
                                                <p className='sub_title' onClick={() => showInputs(index)}>Reply</p> */}
                                    </div>
                                    {localStorage.apikey && <div>
                                        <Image src={'/flag.svg'} height={16} width={16} alt={"image"} className='cursor-pointer' onClick={() => report(comment)} />
                                    </div>}
                                </div>
                                {reportComment && <Modal modal={modal} show={show} visible={visible} hide={(resp_message) => hideReport(resp_message)} data={reportComment} cur={selecedComment.name} />}
                                {isSuccessPopup && <AlertUi alertMsg={alertMessage && alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"} />}
                                {/* {(input.index == index && input.show) &&
                                            <div>
                                                <input type='text' />
                                            </div>
                                  } */}
                            </div>
                        </div>
                        // </div >
                    )
                })
            }

            {/* {mod && <ModPopup />} */}

            {/* {isModal && <div className={`flex justify-between p-[20px_15px] `}>
                <h6 className={`text-[18px] font-[700] nunito`}>All Comments</h6>
                <div>
                    <Image src={'/categories/close.svg'} onClick={hide} className='cursor-pointer ' height={22} width={22} alt='close' />
                </div>
            </div>} */}

            {isModal && <div className={`p-[20px_20px_0_20px]`}>
                <h1 className={`lg:text-[24px] md:text-[16px] md:leading-[29.23px] font-semibold leading-[1.3] m-[8px_0] md:my-1 md:mb-[5px]`}>{cur.title}</h1>

                <div className={`flex items-center gap-[8px] flex-wrap`}>
                    <p className={`text-[13px] nunito font-[700]`}>By : </p>
                    {cur.publisher && cur.publisher.length != 0 &&
                        cur.publisher.slice(0, 2).map((r, index) => {
                            return (
                                <h6 key={index} className={`font-[700] nunito text-[13px]`}> {r.full_name}</h6>
                            )
                        })
                    }
                </div>

                <div className='flex my-[15px]  items-center gap-[10px] md:justify-between md:hidden'>
                    <h6 className={`text-gray text-[11px] gray-text nunito`}>{dateFormat(cur.published_on ? cur.published_on : cur.modified)}</h6>
                    <div className='flex md:block items-center gap-2'><Image height={11} width={11} alt={"image"} src={'/views.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{cur.views ? cur.views : cur.no_of_views ? cur.no_of_views : 1} Views</span></div>
                    <div className='flex items-center gap-2'><Image height={11} width={13} alt={"image"} className='md:h-[13px] md:w-[11px] md:m-auto' src={'/shares.svg'} /><span className='md:text-[10px] text-[12px] gray-text'>{cur.no_of_shares + ' shares'}</span></div>
                    <div className='flex md:block items-center gap-2'><Image height={12} width={12} alt={"image"} src={'/time.svg'} className='md:m-auto' /><span className='text-[12px] md:text-[10px] gray-text'>{cur.read_time} </span></div>
                </div>
            </div>}
            {!isModal && <div onClick={() => showSidebar()} className={`relative cursor-pointer bg-[#EEEEEE] mt-[10px] rounded-full flex justify-between border p-[5px]`}>
                {/* <div className='flex gap-5 items-center'> */}
                {/* <Image src={'/categories/send-01.svg'} className='cursor-pointer ' height={22} width={22} alt='send' /> */}
                <p className={`nunito p-[5px_10px]`}>Be the first to comment</p>
                {/* </div> */}

                {/* <button onClick={() => sendMsg('cmt')} className={`primary_button h-[35px] w-[120px] !rounded-full text-[13px]`}>Comment Now</button> */}
                <button className={`primary_button h-[35px] w-[120px] !rounded-full text-[13px]`}>Comment Now</button>
            </div>}
            {showPopup && <CommentModal type={''} hides1={(type, data) => hides1(type, data)} element={cmtVal} msgChange={(val) => msgChange(val)} />}

            {/* rounded-[30px_30px_0_0] border*/}
            {data && data.length != 0 &&
                <>
                    {isModal && <div>
                        <p className={`nunito text-[16px] md:text-[15px] md:pt-[5px] px-[20px] font-[700]`}>{data.length + ' Comments'}</p>
                    </div>}
                    {/* id='scroll' */}
                    <div  className={`${isModal ? ' h-[calc(100vh_-_440px)] border !border-b-0 rounded-[30px_30px_0_0] overflow-auto customScroll p-[15px]' : ' rounded-[5px] p-[10px]'}  my-[10px]`}>
                        {/* {isModal && <p className={`nunito text-[20px] mb-5 font-[700]`}>{data.length + ' Comments'}</p>} */}
                        {data.map((res, i) => {
                            return (
                                <div key={res.comment_by + i} className={`flex gap-[10px] mb-[10px] ${i != data.length - 1 ? 'border_bottom pb-[10px]' : ''}`}>
                                    <div className={` ${isModal ? 'flex-[0_0_calc(9%_-_10px)]' : 'flex-[0_0_calc(6%_-_10px)] md:flex-[0_0_calc(13%_-_10px)]'}`}>
                                        <Image height={45} width={45} className='rounded-full object-contain' alt={res.name} src={'/profit.svg'} />
                                    </div>
                                    <div className={`${isModal ? 'flex-[0_0_calc(91%_-_10px)]' : 'flex-[0_0_calc(94%_-_10px)] md:flex-[0_0_calc(87%_-_10px)]'}`}>
                                        <h6 className={`text-[15px] capitalize nunito font-[700]`}>{res.comment_by}</h6>
                                        <div className='pb-[5px] sub_title !text-[14px]' dangerouslySetInnerHTML={{ __html: res.content }} />
                                        <div className='flex justify-between items-center py-[5px]'>
                                            <div className='flex gap-3' >
                                                <p className='flex gap-[5px] items-center sub_title'><span className='text-[13px]'>{res.likes}</span>
                                                    <div className='cursor-pointer' onClick={(e) => likeCmt(e,res, i)}>
                                                        <Image className='h-[25px] w-[25px]  cursor-pointer object-contain' src={(res.is_liked && res.is_liked == 1) ? '/categories/like-fill.svg' : '/categories/like-1.svg'} height={20} width={20} alt={""} />
                                                    </div>
                                                </p>
                                                <p className='flex gap-[5px] items-center sub_title'><span className='text-[13px]'>{res.dislikes}</span>
                                                    <div className='cursor-pointer' onClick={(e) => dislikeCmt(e,res, i)}>
                                                        <Image className='h-[25px] w-[25px]  cursor-pointer object-contain' src={(res.is_disliked && res.is_disliked == 1) ? '/categories/dislike-fill.svg' : '/categories/dislike-1.svg'} height={20} width={20} alt={""} />
                                                    </div>
                                                </p>
                                            </div>
                                            <div>
                                                <Image src={'/categories/flag.svg'} height={16} width={16} alt={"image"} className='h-[25px] w-[25px]  cursor-pointer object-contain' onClick={() => report(res)} />
                                            </div>
                                        </div>
                                        {/* {reportComment && <Modal modal={modal} show={show} visible={visible} hide={(resp_message) => hideReport(resp_message)} data={reportComment} cur={selecedComment.name} />}
                                        {isSuccessPopup && <AlertUi alertMsg={alertMessage && alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"} />} */}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                    {reportComment && <Modal modal={modal} show={show} visible={visible} hide={(resp_message) => hideReport(resp_message)} data={reportComment} cur={selecedComment.name} />}
                    {isSuccessPopup && <AlertUi alertMsg={alertMessage} isOpen={isSuccessPopup} closeModal={closeModal} button_2={"ok"} />}
                </>
            }

            {isModal && <div className={`flex items-center border mx-[10px] h-[40px] bg-[#EEEEEE] rounded-full justify-between`}>
                {/* <div> */}
                <input id={'cmt' + cur.name} type='text' placeholder="What's on your mind" autoComplete='off' className={`h-full w-full flex-[0_0_calc(83%_-_10px)] md:flex-[0_0_calc(75%_-_10px)] nunito text-[13px] !border-0 bg-[#EEEEEE] px-[10px] rounded-full`} />
                {/* </div> */}
                <div className={`p-[5px] w-full h-full`}><button onClick={submitMsg} className={`primary_button cursor-pointer w-full h-full  text-[13px] md:text-[12px] nunito !rounded-full`}>Post comment</button></div>
            </div>}
        </>
    )
}


// const Alert = () => {
//     const { isOpen, onOpen, onClose } = useDisclosure()
//     const finalRef = useRef(null)

//     return (
//         <>
//             <Box ref={finalRef} tabIndex={-1} aria-label='Focus moved to this box'>
//                 Some other content that'll receive focus on close.
//             </Box>

//             <Button mt={4} onClick={onOpen}>
//                 Open Modal
//             </Button>
//             <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
//                 <ModalOverlay />
//                 <ModalContent>
//                     <ModalHeader>Modal Title</ModalHeader>
//                     <ModalCloseButton />
//                     <ModalBody>
//                        <h6>sknskmslcm</h6>
//                     </ModalBody>

//                     <ModalFooter>
//                         <Button colorScheme='blue' mr={3} onClick={onClose}>
//                             Close
//                         </Button>
//                         <Button variant='ghost'>Secondary Action</Button>
//                     </ModalFooter>
//                 </ModalContent>
//             </Modal>
//         </>
//     )
// }