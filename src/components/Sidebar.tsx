'use client'

import { HomeIcon } from 'lucide-react'
import Menu from '@/assets/icons/menu.svg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSidebarContext } from '@/context/sidebarContext'

function Sidebar() {
    const [activeBtn, setActiveBtn] = useState<string | null>()
    const ctx = useSidebarContext()
    const { isExpanded, setIsExpanded } = ctx;
    const pathname = usePathname();

    useEffect(() => {
        const match = pathname.match(/^\/[^\/]+/);

        console.log(match);

        setActiveBtn(match ? match[0] : "");
    }, [pathname])

    return (
        <div className={`fixed top-0 bottom-0 ${isExpanded ? "left-0 " : "left-[-205px]"} w-[240px] bg-accent-foreground pt-[70px] border-r-2 border-r-foreground`}>
            <button className='absolute right-[-20px] mt-[14px] z-20 rounded-[50%] w-[40px] h-[40px] bg-foreground p-[10px] cursor-pointer border-1 border-accent'
                onClick={() => isExpanded ? setIsExpanded(false) : setIsExpanded(true)}>
                <Menu className='w-full h-full' />
            </button>
            {isExpanded &&
                <nav className='flex flex-col w-full text-accent p-3 pt-[13px] gap-1'>
                    <Link href={"/"} className={`flex relative z-2 gap-1 items-center space-x-4 hover:bg-sidebar-ring p-2 rounded-[8px] ${activeBtn === "" ? 'active: bg-sidebar-ring/20' : ''}`}>
                        <HomeIcon />
                        <p>Home</p>
                    </Link>
                    <Link href={"/popular"} className={`flex relative z-2 gap-1 items-center space-x-4 hover:bg-sidebar-ring p-2 rounded-[8px] ${activeBtn === "/popular" ? 'active: bg-sidebar-ring/20' : ''}`}>
                        <HomeIcon />
                        <p>Popular</p>
                    </Link>
                    <Link href={"/explore"} className={`flex relative z-2 gap-1 items-center space-x-4 hover:bg-sidebar-ring p-2 rounded-[8px] ${activeBtn === "/explore" ? 'active: bg-sidebar-ring/20' : ''}`}>
                        <HomeIcon />
                        <p>Explore</p>
                    </Link>
                    <Link href={"/all"} className={`flex relative z-2 gap-1 items-center space-x-4 hover:bg-sidebar-ring p-2 rounded-[8px] ${activeBtn === "/all" ? 'active: bg-sidebar-ring/20' : ''}`}>
                        <HomeIcon />
                        <p>All</p>
                    </Link>
                </nav>
            }

        </div>
    )
}

export default Sidebar