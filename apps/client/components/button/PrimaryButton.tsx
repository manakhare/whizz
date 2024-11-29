"use client";
import React, { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  classFeatures?: string | "";
}

export default function PrimaryButton({ children, onClick, classFeatures }: ButtonProps) {
  
  
  return (
    <div 
      className={`${classFeatures} hover:shadow-md bg-orange-600 rounded-2xl font-semibold text-slate-50 cursor-pointer hover:bg-orange-700`}
      onClick={onClick}>
        {children}
    </div>
  )
}
