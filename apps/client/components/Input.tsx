"use client";
import React, { ChangeEvent } from 'react'

export default function Input({
    label, type, placeholder, onChange
}: {
    label: string;
    type: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
) {
  return (
    <div className='flex flex-col w-[90%] gap-1'>
        <label className='font-semibold'>{label}</label>
        <input 
            className='py-2 px-2 rounded-md border border-gray-800 text-gray-800'
            onChange={onChange}
            type={type}
            placeholder={placeholder}
            ></input>
    </div>
  )
}
