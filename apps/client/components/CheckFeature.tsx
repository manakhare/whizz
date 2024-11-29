import React from 'react'
import Check from './icons/Check'

export default function CheckFeature(
    { label } : { label: string }
) {
  return (
    <div className='flex items-center gap-2 text-lg text-gray-700'>
        <span>
        <Check />
        </span>
            {label}
    </div>
  )
}
