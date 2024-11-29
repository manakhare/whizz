"use client"
import React, { useState } from 'react'
import Input from './Input'
import PrimaryButton from './button/PrimaryButton'
import Link from 'next/link'
import { BACKEND_DEV_URL } from '@/config'
import { Login } from '@/types'
import { useRouter } from 'next/navigation'

interface Response {
  data: {
    token: string;
  }
}

export default function LoginForm() {
    const [userDetails, setUserDetails] = useState<Login>({
        email: "",
        password: ""
    })
    const router = useRouter();

    const onSumbit = async () => {
      try {
        const res: Response = await axios.post(`${BACKEND_DEV_URL}/api/v1/user/login`, userDetails);        
        localStorage.setItem("token", res.data.token);
        router.push('/dashboard')
      } catch (error) {
        console.log("Something went wrong during login");
      }
    }
  return (
    <div className='w-[60%] md:flex md:flex-col md:flex-start md:items-center'>
          
          <div className='flex justify-center items-center font-semibold text-2xl pb-3 md:justify-center'>Log in to your account</div>

          <div className='px-5 w-full md:w-[80%]  py-5 flex flex-col gap-5 items-center justify-center md:border'>

            <Input label="*Email" type="email" onChange={(e) => {
              setUserDetails({
                ...userDetails,
                email: e.target.value
              })
            }}/>
            <Input label="*Password" type="password" onChange={(e) => {
              setUserDetails({
                ...userDetails,
                password: e.target.value
              })
            }} />

            <p className='px-5 text-gray-700 font-thin'>By signing up, you agree to Whizz&apos; <span className='text-blue-600 underline underline-offset-2'>terms of services</span> and <span className='text-blue-600 underline underline-offset-2'>privacy policy.</span></p>

            <div className='w-[90%] mt-3'>
              <PrimaryButton onClick={onSumbit} classFeatures='flex items-center justify-center py-2 text-lg'>
                Get started
              </PrimaryButton>
            </div>

            <p>Already have an account? <Link className='text-blue-700 underline underline-offset-2' href="/login">Log in</Link></p>
          </div>

        </div>
  )
}
