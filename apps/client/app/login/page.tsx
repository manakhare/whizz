import CheckFeature from '@/components/CheckFeature'
import LoginForm from '@/components/LoginForm'
import Navbar from '@/components/Navbar'
import React from 'react'

export default function Login() {
  return (
    <div className='min-h-screen max-w-screen overflow-hidden flex flex-col justify-start pt-3 h-full items-center'>

      <Navbar />

      <div className='px-6 py-10 h-full overflow-hidden md:w-[70%] flex flex-row justify-between md:gap-10'>
        
        {/* left side */}
        <div className='w-[40%] pl-2'>
          <div className='text-3xl font-semibold pb-5 pt-12 w-[70%] md:text-5xl md:w-full md:pb-10'>
            Join millions worldwide who automate their work using Whizz.
          </div>

          <div className='flex flex-col gap-3'>
            <CheckFeature label="Easy setup, no coding required"/>
            <CheckFeature label="Free forever for core features"/>
            <CheckFeature label="14-day free trial of premium features & apps"/>
          </div>
        </div>

        {/* right side */}
        <LoginForm />

      </div>

      
    </div>
  )
}
