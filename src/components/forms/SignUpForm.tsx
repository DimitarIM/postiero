'use client'

import { useRouter } from 'next/navigation';
import React from 'react'
import { useForm } from 'react-hook-form';
import { SignUpFormSchema } from './formSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Loader2 } from 'lucide-react';
import { useModalContext } from '@/context/modalContext';

function SignUpForm() {
  const router = useRouter();

  const ctx = useModalContext();
  const { loading, signUpSubmit } = ctx;

  const { register, handleSubmit } = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  })

  return (
    <div className='z-2 flex flex-col bg-foreground text-accent rounded-[10px] justify-center items-center p-4'>
      <div className="relative flex flex-col justify-center items-center">
        <h4 className='font-bold pt-3'>Sign Up</h4>
      </div>
      <form className='flex flex-col gap-y-9 w-[300px]' onSubmit={handleSubmit(signUpSubmit)}>

        <div className='flex flex-col gap-2'>
          <label className='pb-2'>Username</label>

          <input {...register("username", { required: true })} type="username" placeholder="Your username" id='username' className='border-b border-accent focus:outline-none' />
        </div>

        <div className='flex flex-col gap-2'>
          <label className='pb-2'>Email</label>

          <input {...register("email", { required: true })} type="email" placeholder="example@test.com" id='email' className='border-b border-accent focus:outline-none' />
        </div>

        <div className='flex flex-col gap-2'>
          <label>Password</label>
          <input {...register("password", { required: true })} type="password" placeholder="Enter your password" id='password' required className='border-b border-background focus:outline-none' />
        </div>

        <div className="relative flex flex-col justify-center items-center">
          <button type='submit' 
          className='flex justify-center items-center bg-detail text-foreground cursor-pointer h-6 min-w-60'>
            {
              loading ? <Loader2 className="size-4 animate-spin" />
                : "Sign Up"
            }
          </button>
        </div>

      </form>
    </div>

  )
}

export default SignUpForm