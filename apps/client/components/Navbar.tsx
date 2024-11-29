"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import PrimaryButton from './button/PrimaryButton'
import LinkButton from './button/LinkButton'

export default function Navbar() {
    const router = useRouter();
    
  return (
    <div className='pb-3 z-10 px-6 md:px-10 flex justify-between text-center items-center border border-t-transparent w-full'>
        <div className='text-3xl font-extrabold tracking-wider'>💨 Whizz...</div>
        <div className='flex justify-between items-center'>
            <div>
                <LinkButton onClick={() => {router.push('/login')}}>Login</LinkButton>
            </div>
            <div className='ml-5 text-md'>
                <PrimaryButton onClick={() => {router.push('/signup')}} classFeatures='w-fit px-4 py-1 text-md'>Sign up</PrimaryButton>
            </div>
        </div> 
    </div>
  )
}
