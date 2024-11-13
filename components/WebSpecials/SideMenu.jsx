import React from 'react'

const SideMenu = ({side_menu,activateSection,activeIndex}) => {
    return (
        <>
            <div className="flex-[0_0_calc(20%_-_15px)] lg:sticky lg:h-full lg:top-[15px]">
                {side_menu && side_menu.length > 0 && (
                    <>
                        <div className="w-fit bg-[#ddd] p-[3px_5px] rounded-[5px_5px_0_0]">
                            <h6 className="text-[12px] font-semibold uppercase">
                                CATEGORIES
                            </h6>
                        </div>

                        <div className="border border-[#D9D9D9] rounded-[0_10px_10px_10px]">
                            {side_menu.map((resp, index) => {
                                return (
                                    <div
                                        key={resp.title}
                                        className={`${index == side_menu.length - 1
                                            ? ""
                                            : "border-b border-b-[#D9D9D9]"
                                            } p-[10px] cursor-pointer`}
                                        onClick={() => activateSection(resp.url, index,'click')}
                                    >
                                        <h6
                                            className={`text-[14px] ${activeIndex == resp.url
                                                ? "text-[#E21B22] font-[700]"
                                                : "text-[#737373]"
                                                } `}
                                        >
                                            {resp.title}
                                        </h6>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

export default SideMenu