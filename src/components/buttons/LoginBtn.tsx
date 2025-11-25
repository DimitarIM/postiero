'use client'

import React from 'react'
import { useModalContext } from '@/context/modalContext'

function LoginBtn() {
  
  const { setModalIsActive, setModalFormType } = useModalContext();

  function handleBtnClick(){
    setModalIsActive(true);
    setModalFormType("login");
  }

  return (
    <button className='cursor-pointer' onClick={() => handleBtnClick()}>Login</button>
  )
}

export default LoginBtn