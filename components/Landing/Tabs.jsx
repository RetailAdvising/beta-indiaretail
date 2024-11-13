import { useState } from 'react'
import { Tab } from '@headlessui/react'
// import { Nunito } from 'next/font/google'
// const nunito = Nunito({
//     weight: ["300","400","500","600","700"],
//     display: "block",
//     preload: true,
//     style: 'normal',
//     subsets: ["latin"],
//     variable: '--font-inter',
//   })
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Tabs({ categories, setTabs, tab  }) {
// console.log(tab)
    return (
        <>
            {/* <div className="w-full max-w-md px-2 py-16 sm:px-0">
            <Tab.Group>
                <Tab.List className="flex space-x-1 p-1">
                    {Object.keys(categories).map((category) => (
                        <Tab
                            key={category}
                            className={({ selected }) =>
                                classNames(
                                    'w-full py-2.5 text-sm font-medium leading-5 text-[#b5b5b5]',

                                    selected
                                        ? 'bg-white text-red font-semibold border-b-[1px] border-[red]'
                                        : ''
                                )
                            }
                        >
                            {category}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="mt-2">
                    <div className={`border p-[10px] rounded-[5px]`}><List check={true} titleClamp={'line-clamp-2'} isHome={'/news/'} imgFlex={'flex-[0_0_calc(40%_-_10px)]'} data={data.data[c.cid].data} imgWidth={"w-full"} imgHeight={"h-[125px]"} borderRadius={"rounded-[10px]"} /></div>

                    {Object.values(categories).map((posts, idx) => (
                        <Tab.Panel
                            key={idx}
                            className={classNames(
                                'rounded-xl bg-white p-3',
                                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                            )}
                        >
                            <ul>
                                {posts.map((post) => (
                                    <li
                                        key={post.id}
                                        className="relative rounded-md p-3 hover:bg-gray-100"
                                    >
                                        <h3 className="text-sm font-medium leading-5">
                                            {post.title}
                                        </h3>

                                        <ul className="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500">
                                            <li>{post.date}</li>
                                            <li>&middot;</li>
                                            <li>{post.commentCount} comments</li>
                                            <li>&middot;</li>
                                            <li>{post.shareCount} shares</li>
                                        </ul>

                                        <a
                                            href="#"
                                            className={classNames(
                                                'absolute inset-0 rounded-md',
                                                'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                            )}
                                        />
                                    </li>
                                ))}
                            </ul>
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
         */}

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
        </>
    )
}
