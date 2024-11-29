"use client"
import React, { useState } from 'react'
import Input from './Input';
import PrimaryButton from './button/PrimaryButton';

export default function EmailSelector({setMetadata} : {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMetadata: (params: any) => void
}) {
    const [email, setEmail] = useState("");
    const [body, setBody] = useState("");

  return (
    <div className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[70%]'>
            <div className='flex flex-col w-full justify-center items-center gap-5'>
                <Input label={"To"} placeholder={"Email"} type={"text"} onChange={(e) => setEmail(e.target.value)}/>
                <Input label={"Body"} placeholder={"Body"} type={"text"} onChange={(e) => setBody(e.target.value)}/>
            </div>

            <div className='pt-8 w-[90%] flex justify-center py-1'>
                <PrimaryButton 
                    classFeatures='py-2 w-full rounded-md flex justify-center items-center'
                    onClick={() => {
                        setMetadata({
                            email, 
                            body
                        })
                    }}>
                    Submit</PrimaryButton>
            </div>
        </div>
    </div>
  )
}
