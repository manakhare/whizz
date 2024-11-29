"use client";

import React, { ReactNode } from 'react'

export default function LinkButton({children, onClick} : {children: ReactNode, onClick: () => void}) {
  return (
    <div 
        className='hover:underline-offset-2 hover:underline text-gray-700 cursor-pointer'
        onClick={onClick}>
            {children}
    </div>
  )
}
