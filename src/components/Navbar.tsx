'use client'

import React, { useEffect, useState } from 'react'
import LogoutBtn from './buttons/LogoutBtn'
import Link from 'next/link'
import LoginBtn from './buttons/LoginBtn';
import SignUpBtn from './buttons/SignUpBtn';
import { ProfileIcon } from '@/components/icons/ProfileIcon'
import { useSessionContext } from '@/context/sessionContext';


function Navbar() {
    const ctx = useSessionContext();
    const [isProfileActive, setProfileActive] = useState<boolean>(false)
    const { sessionIsActive } = ctx;

    useEffect(()=>{
        console.log(isProfileActive);
    },[isProfileActive])

    return (
        <nav className='fixed z-20 flex inset-x-0 justify-between text-accent gap-8 sm:gap-10 p-1 bg-foreground pt-2'>
            <Link href={"/"} className='flex relative z-2 gap-1 items-center'>
                <h4 className='text-[0.9rem] sm:text-[1.6rem] md:text-[2.4rem]'>Postiero</h4>
            </Link>

            <div className='flex relative z-2 gap-4 sm:gap-6 md:gap-10 items-center pr-5'>
                {sessionIsActive &&
                    <>
                        <div className='flex gap-2 md:gap-5 justify-center items-center'>
                            <Link href={"/create"} className=''>Create</Link>
                            <button className='w-10 h-10 rounded-[50%] cursor-pointer p-2 bg-accent-foreground'
                                onClick={() => isProfileActive ? setProfileActive(false) : setProfileActive(true)}>
                                <ProfileIcon className="w-full h-full" />
                            </button>
                        </div>
                    </>
                }
                {!sessionIsActive &&
                    <>
                        <SignUpBtn />
                        <LoginBtn />
                    </>
                }
            </div>
            {isProfileActive && sessionIsActive &&
                <div className='absolute flex flex-col gap-2 bottom-[-80px] right-0 min-w-[200px] min-h-[50px] bg-accent-foreground p-3'>
                    <Link href={"/user"} className='hover:bg-accent-foreground'>View Profile</Link>
                    <LogoutBtn />
                </div>
            }
        </nav>

    )
}

export default Navbar;