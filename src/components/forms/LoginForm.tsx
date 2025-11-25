'use client'

import React from 'react'
import { useForm } from 'react-hook-form';
import { LoginFormSchema } from './formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Loader2 } from 'lucide-react';
import { useModalContext } from '@/context/modalContext';

function LoginForm() {

  const ctx = useModalContext();
  const { loading, loginSubmit } = ctx;

  const { register, handleSubmit } = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })


  
  return (
    <div className='z-2 flex flex-col bg-foreground text-accent rounded-[10px] justify-center items-center p-4'>
      <div className="relative flex flex-col justify-center items-center">
        <h4 className='font-bold pt-3'>Login</h4>
      </div>
      <form className='flex flex-col gap-y-9 w-[300px]' onSubmit={handleSubmit(loginSubmit)}>
        <div className='flex flex-col gap-2'>
          <label className='pb-2'>Email</label>

          <input {...register("email", { required: true })} type="email" placeholder="example@test.com" id='email' className='border-b border-accent focus:outline-none' />
        </div>

        <div className='flex flex-col gap-2'>
          <label>Password</label>
          <input {...register("password", { required: true })} type="password" placeholder="Enter your password" id='password' required className='border-b border-accent focus:outline-none' />
        </div>

        <div className="relative flex flex-col justify-center items-center">
          <button type='submit' 
          className='flex justify-center items-center bg-detail text-accent cursor-pointer h-6 min-w-60'>
            {
              loading ? <Loader2 className="size-4 animate-spin" />
                : "Login"
            }
          </button>
        </div>

      </form>
      {/* <div className='flex justify-center items-center gap-2 pb-5'>
        <h5 className="text-[1.2rem]">Not signed in yet? </h5> <button onClick={handleToSignUpBtn} className='text-detail cursor-pointer text-[1.3rem]'>Sign Up</button>

      </div> */}
    </div>

  )
}

export default LoginForm