import { useState } from "react";
import Link from "next/link";

const Accordion = ({ item, i, isMobile }) => {
    // State to control the visibility of the accordion
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div
            className={`list_div leading-[2.5] ${i % 2 === 0 ? "min-h-[290px]" : ""
                } md:flex-[0_0_calc(50%_-_20px)] md:min-h-[20px] md:mr-[20px]`}
        >
            <div>
                {/* Accordion Header */}
                <h6
                    className="text-[15px] font-[700] lg:mb-3 nunito cursor-pointer flex items-center md:justify-between"
                    onClick={toggleAccordion} // Toggle the accordion on click
                >
                    {item.title}
                    {/* Chevron Icon - shows Down or Up based on isOpen state */}
                    {isMobile && <span
                        className={`ml-2 transform transition-all duration-300 ${isOpen ? "rotate-180" : "rotate-0"
                            }`}
                    >
                        <svg
                            className="w-4 h-4 text-gray-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </span>}
                </h6>

                {/* Collapsible Content */}
                <div
                    className={`transition-all duration-500 ease-in-out overflow-hidden ${(isOpen || !isMobile) ? "max-h-[1000px]" : "max-h-0"
                        }`} // Apply smooth transition for expansion/collapse
                >
                    {item.menus && item.menus.length !== 0 && (
                        <div>
                            {item.menus.map((menuItem, index) => (
                                <a
                                    target={menuItem.title === "Events" ? "_blank" : "_self"}
                                    href={menuItem.redirect_url}
                                    key={index}
                                >
                                    <p className="sub_title text-[15px] font-semibold mb-2 hover:text-[red] nunito">
                                        {menuItem.menu_label}
                                    </p>
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
