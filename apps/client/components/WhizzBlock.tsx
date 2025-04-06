"use client"
import { IWhizzBlock } from '@/types'
import React, {useState} from 'react'
import LighteningIcon from './icons/LighteningIcon'

export default function WhizzBlock({ heading, text, index, type, onClick }: IWhizzBlock) {
  const [hidden, setHidden] = useState("hidden");

  const handleOptionsClick = () => {
    if(hidden==="") {
      setHidden("hidden");
    } else {
      setHidden("");
    }
  }

  // const handleSelectChange = () => {}
  return (
    <div
      
      className='w-[60%] relative cursor-pointer border border-dashed border-gray-500 rounded-md shadow-lg max-h-fit p-5 bg-white mb-10'>
      
      <div onClick={onClick}>
        <div className='flex flex-row gap-2 border border-gray-400 w-fit px-4 py-2 bg-amber-50 rounded-md'>
          <span className='bg-gray-600 rounded-full flex items-center justify-center py-1 px-1.5'>
            <LighteningIcon size='size-2' />
          </span>
          <span className='font-semibold text-sm'>{heading}</span>
        </div>


        <div className='pt-1'>
          <span className='font-semibold'>{index}.</span>{" "}
          <span className='font-semibold text-gray-500'>{text}</span>
        </div>
      </div>

      <div 
        className='absolute top-5 right-5 cursor-default'
        onClick={handleOptionsClick}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>

          <div className={`${hidden} flex absolute top-2 -right-14 flex-col border bg-white border-gray-600 justify-start items-start text-sm text-gray-800`}>
            <div className='py-1 px-3 cursor-pointer border border-b-gray-600 w-full hover:bg-gray-50'>Edit</div>
            {type!=="Trigger" && <div className='py-1 px-3 cursor-pointer w-full hover:bg-gray-50'>Delete</div>}
          </div>
      </div>

      {/* {index===1 && 
        <div className=''>
          <span>Webhook URL</span>
          <span></span>
        </div>} */}
    </div>
  )
}
