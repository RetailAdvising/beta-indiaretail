
export default function Tabs({ categories, setTabs, tab }) {
    return (
        <>
            {/* <p onClick={() => setTabs(categories)} className={`${tab == categories ? 'text-red font-semibold border-b-[1px] border-red' : ''}`}>{categories}</p> */}
            {categories && categories.length != 0 && <div className='lg:block md:flex items-center scrollbar-hide gap-5 md:overflow-auto  md:p-[10px]'>
                {categories.map((res, i) => {
                    return (
                        <h6 className={`${tab == res.route ? 'font-[700] bg-[#eca2a221] md:text-red' : ''} nunito md:bg-white md:px-[10px] font-[600] md:flex-[0_0_auto] lg:hover:bg-slate-100 rounded-[10px] cursor-pointer text-[15px] md:text-[14px] p-[10px] md:p-[0px_5px] my-[10px] md:mr-0`}
                            key={i} onClick={() => setTabs(res.route)}>{res.name}</h6>
                    )
                })}
            </div>}
        </>
    )
}
