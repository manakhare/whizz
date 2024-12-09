"use client";
import React, { useState } from 'react'
import Input from './Input'
import PrimaryButton from './button/PrimaryButton'
import Link from 'next/link'
// import axios from 'axios';
import { BACKEND_DEV_URL } from '@/config';
import { useRouter } from 'next/navigation';
import { SignUp } from '@/types';

// interface Response {
//     data: {
//         token: string;
//         userId: number;
//     }
// }

export default function SignupForm() {
    const router = useRouter();
    const [userDetails, setUserDetails] = useState<SignUp>({
        username: "",
        email: "",
        password: ""
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    
    // const onSubmit = async () => {
    //     const res: Response = await axios.post(`${BACKEND_DEV_URL}/api/v1/user/signup`, userDetails);
    //     localStorage.setItem("token", res.data.token);
    //     console.log(res.data);
    //     setUserId(res.data.userId);       
    //     router.push("/dashboard");
    // }

    const onSubmit = async () => {
        try {
            const res = await fetch(`${BACKEND_DEV_URL}/api/v1/user/signup`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                }, 
                body: JSON.stringify(userDetails)
            })
    
            const data = await res.json();
    
            const user = {
                username: data.data.username,
                userId: data.data.userId,
                email: data.data.email
            }
    
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(user));

            router.push("/dashboard")
        }
        catch (error) {
            console.log("Something went wrong while sign up!");
        }
    }

    // useEffect(() => {
    //     const user = {
    //         userId: userId,
    //         username: userDetails.username,
    //         email: userDetails.email
    //     }

    //     localStorage.setItem("user", JSON.stringify(user));

    //     return () => localStorage.removeItem("user");
    // }, [userId]);

    return (
        <div className='px-5 w-full md:w-[80%]  py-5 flex flex-col gap-5 items-center justify-center md:border'>
            <Input label="*Email" type="email" onChange={(e) => { 
                setUserDetails({
                    ...userDetails,
                    email: e.target.value
                })
            }} />
            <Input label="*Username" type="text" onChange={(e) => {
                setUserDetails({
                    ...userDetails,
                    username: e.target.value
                })
            }} />
            <Input label="*Password" type="password" onChange={(e) => {
                setUserDetails({
                    ...userDetails,
                    password: e.target.value
                })
            }} />

            <p className='px-5 text-gray-700 font-thin'>By signing up, you agree to Whizz&apos; <span className='text-blue-600 underline underline-offset-2'>terms of services</span> and <span className='text-blue-600 underline underline-offset-2'>privacy policy.</span></p>

            <div className='w-[90%] mt-3'>
                <PrimaryButton onClick={onSubmit} classFeatures='flex items-center justify-center py-2 text-lg'>
                    Get started
                </PrimaryButton>
            </div>

            <p>Already have an account? <Link className='text-blue-700 underline underline-offset-2' href="/login">Log in</Link></p>
        </div>
    )
}
