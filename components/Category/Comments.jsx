import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { like, dislike, getList, addComment } from '@/libs/api';
import { toast } from 'react-toastify';
import format from 'date-fns/format'
import dynamic from 'next/dynamic';
const AlertUi = dynamic(()=> import('../common/AlertUi'))
const Modal = dynamic(()=> import('../common/Modal'))
const CommentModal = dynamic(()=> import('./CommentModal'))
export default function Comments({ data, isLast, load, comments, route, updatedCmt, cur, isModal, hide, noScroll, no_data, showSidebar }) {
    const [reportComment, setReporComment] = useState()
    const [selecedComment, setSelecedComment] = useState()
    const [isSuccessPopup, setIsSuccessPopup] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const cardref = useRef(null)
    useEffect(() => {
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
               
            }
            
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
            }
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


    let [showPopup, setShowPopup] = useState(false)

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
                
            }
        }
        else {
            setAlertMessage({ message: "Please enter a comment." })
            setIsSuccessPopup(true)
        }
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
                                
                            </div>
                        </div>
                        // </div >
                    )
                })
            }

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
                <p className={`nunito p-[5px_10px]`}>Be the first to comment</p>

                <button className={`primary_button h-[35px] w-[120px] !rounded-full text-[13px]`}>Comment Now</button>
            </div>}
            {showPopup && <CommentModal type={''} hides1={(type, data) => hides1(type, data)} msgChange={(val) => msgChange(val)} />}

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
              
                <input id={'cmt' + cur.name} type='text' placeholder="What's on your mind" autoComplete='off' className={`h-full w-full flex-[0_0_calc(83%_-_10px)] md:flex-[0_0_calc(75%_-_10px)] nunito text-[13px] !border-0 bg-[#EEEEEE] px-[10px] rounded-full`} />
                
                <div className={`p-[5px] w-full h-full`}><button onClick={submitMsg} className={`primary_button cursor-pointer w-full h-full  text-[13px] md:text-[12px] nunito !rounded-full`}>Post comment</button></div>
            </div>}
        </>
    )
}
