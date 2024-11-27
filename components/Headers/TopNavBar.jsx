import { useEffect } from 'react'
import { useRouter } from 'next/router';

export default function TopNavBar({ getActiveTab, activeTab }) {
    const router = useRouter()
    const navData = [
        {
            "menu_label": "Home",
            "redirect_url": "/",
        },
        {
            "menu_label": "Categories",
            "redirect_url": "/categories",
        },
        {
            "menu_label": "IR Prime",
            "redirect_url": "/IRPrime",
        },
        {
            "menu_label": "Events",
            "redirect_url": "/events",

        },
        {
            "menu_label": "Book Store",
            "redirect_url": "/bookstore",
            "icon": "/Navbar/Book-Store.svg",
        },
        {
            "menu_label": "Newsletters",
            "redirect_url": "/newsletters",
            "icon": "/Navbar/newsletter.svg",
        },
        {
            "menu_label": "Videos",
            "redirect_url": "/video",
            "icon": "/Navbar/video.svg",
        },
        {
            "menu_label": "Podcasts",
            "redirect_url": "/podcast",
            "icon": "/Navbar/Podcasts.svg",
        }
    ]
    useEffect(() => {
        // console.log(activeTab)
        if (!activeTab) {
            let route = router.route.split('/')
            let redirect_url = route[1] ? '/' + route[1] : '/'
            navData.map(nd => {
                nd.active = nd.redirect_url == redirect_url ? true : false
                if (nd.redirect_url == redirect_url) nav_to_view(nd.menu_label)
                // SetNavData(navData)
            })
        } else {
            navData.map(nd => {
                nd.active = nd.redirect_url == activeTab.redirect_url ? true : false
                if (nd.redirect_url == activeTab.redirect_url) nav_to_view(nd.menu_label)
                // SetNavData(navData)
            })
        }

    }, [activeTab])

    const nav_to_view = (menu_label) => {
        var active_nav = document.getElementById(menu_label)
        setTimeout(() => {
            active_nav.scrollIntoView({ behavior: 'smooth', block: 'center', inline: "nearest" });
        }, 300)

    }
    
    const changeNav = (nav) => {
        router.push(nav.redirect_url)
        getActiveTab(nav)
    }
    return (
        <>
            <ul id='top_nav_bar' className='flex items-center gap-[15px] overflow-auto px-[15px] no_scroll' style={{ borderBottom: '1px solid #ddd' }}>
                {navData.map((nav, index) => {
                    return (<li key={index} id={nav.menu_label} className={`py-[8px] cursor-pointer text-[14px] font-medium whitespace-pre ${nav.active ? 'active_nav' : 'nav'}`}
                        onClick={() => changeNav(nav)}>
                        {nav.menu_label}
                    </li>)
                })}
            </ul>
        </>
    )
}
