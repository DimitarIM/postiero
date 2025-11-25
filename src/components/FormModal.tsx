'use client'

import React, { useEffect } from 'react'
import LoginForm from './forms/LoginForm'
import SignUpForm from './forms/SignUpForm'
import { useModalContext } from '@/context/modalContext';

function FormModal() {
      const ctx = useModalContext();
      const { modalIsActive, setModalIsActive, modalFormType } = ctx;
    return (
        <div className={`${!modalIsActive ? "hidden" : ""} z-21 fixed flex justify-center items-center w-full h-full bg-black/40`}>
            {
                modalFormType === "login"
                    ? <LoginForm />
                    : <SignUpForm />
            }
            <button type="button" className="absolute w-full h-full" onClick={() => setModalIsActive(false)}></button>
        </div>

    )
}

export default FormModal