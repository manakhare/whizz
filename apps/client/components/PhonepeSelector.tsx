import React, { useState } from 'react'
import Input from './Input'
import PrimaryButton from './button/PrimaryButton';

export default function PhonepeSelector({setMetadata} : {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMetadata: (params: any) => void
}) {
    const [amount, setAmount] = useState("");
    const [address, setAddress] = useState("");

  return (
    <div className='flex justify-center items-center w-full'>
        <div className='flex flex-col justify-center items-center w-[70%]'>
            <div className='flex flex-col w-full justify-center items-center gap-5'>
                <Input label={"To"} type={"text"} placeholder={"To"} onChange={(e) => setAddress(e.target.value)} />
                <Input label={"Amount"} type={"text"} placeholder={"Amount"} onChange={(e) => setAmount(e.target.value)} />
            </div>

            <div className='pt-8 w-[90%] flex justify-center py-1'>
                <PrimaryButton 
                    classFeatures='py-2 w-full rounded-md flex justify-center items-center'
                    onClick={() => {
                        setMetadata({
                            amount,
                            address
                        })
                }}>Submit</PrimaryButton>
            </div>
        </div>

    </div>
  )
}
