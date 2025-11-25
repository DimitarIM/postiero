'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { createFrontClient } from '@/utils/supabase/client';

function LogoutBtn() {

  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createFrontClient();

    const { error } = await supabase.auth.signOut();
    if (error) console.log(error);
    console.log("User logged out")
  }

  return (
    <button onClick={()=>{
      handleLogout()
      router.push('/');
      }}
      className='flex items-center gap-2 cursor-pointer [word-spacing:-1px]'>
      Log out
    </button>
  )
}

export default LogoutBtn