import { IWhizzBlock } from '@/types'
import React from 'react'
import LighteningIcon from './icons/LighteningIcon'

export default function WhizzBlock({heading, text, index, onClick}: IWhizzBlock) {
  return (
    <div
     onClick={onClick}
     className='w-[60%] cursor-pointer border border-dashed border-gray-500 rounded-md shadow-lg max-h-fit p-5 bg-white mb-10'>
        <div className='flex flex-row gap-2 border border-gray-400 w-fit px-4 py-2 bg-amber-50 rounded-md'>
            <span className='bg-gray-600 rounded-full flex items-center justify-center py-1 px-1.5'>
                <LighteningIcon size='size-2'/>
            </span>
            <span className='font-semibold text-sm'>{heading}</span>
        </div>

        <div className='pt-1'>
            <span className='font-semibold'>{index}.</span>{" "}
            <span className='font-semibold text-gray-500'>{text}</span>
        </div>
    </div>
  )
}
