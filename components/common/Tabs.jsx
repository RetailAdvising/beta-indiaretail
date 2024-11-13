import React,{useState} from 'react'

export default function Tabs({ data, type }) {

    // function tabActive(item, index) {
    //     data.map((res, i) => {
    //         if (index == i) {
    //             item['active'] = item['active'] ? false : true;
    //         } else {
    //             res['active'] = false;
    //         }
    //     })
    //     // console.log(data)
    // }
    const [isChecked, setIsChecked] = useState(false)

    const handleCheckboxChange = () => {
      setIsChecked(!isChecked)
    }
    return (
        <>
            {/* {data && data.map((res, index) => {
                return (
                    <div className={`tab ${res.active ? 'tabActive' : ''}`}>
                        <p className={`tablink`} onClick={()=> tabActive(res,index)}>{res.name}</p>
                    </div>
                )
            })} */}

            {type == 'toggle' ? <>
                <label className='themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md bg-white p-1'>
                    <input
                        type='checkbox'
                        className='sr-only'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span
                        className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${!isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                            }`}
                    >
                        List View
                    </span>
                    <span
                        className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${isChecked ? 'text-primary bg-[#f4f7ff]' : 'text-body-color'
                            }`}
                    >
                        Grid View
                    </span>
                </label>


            </> : <>
                <label className='themeSwitcherTwo w-full  border_bottom shadow-card relative inline-flex cursor-pointer select-none'>
                    <input
                        type='checkbox'
                        className='sr-only'
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                    />
                    <span
                        className={`flex capitalize items-center space-x-[6px]  py-2 px-[18px] text-[16px] font-semibold ${!isChecked ? 'tabActive' : ''
                            }`}
                    >
                        Current edition
                    </span>
                    <span
                        className={`flex capitalize items-center space-x-[6px]  py-2 px-[18px] text-[16px] font-semibold ${isChecked ? 'tabActive' : ''
                            }`}
                    >
                        All Newsletter
                    </span>
                </label>
            </>}
        </>
    )
}