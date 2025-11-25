'use client'

import { useModalContext } from '@/context/modalContext';
import React from 'react'

function SignUpBtn() {
    const { setModalIsActive, setModalFormType } = useModalContext();

    function handleBtnClick() {
        setModalIsActive(true);
        setModalFormType("signUp");
    }
    return (
        <button className='cursor-pointer' onClick={() => handleBtnClick()}>SignUp</button>
    )
}

export default SignUpBtn