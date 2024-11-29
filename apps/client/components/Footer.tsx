import React from 'react'

export default function Footer() {
  return (
    <div className='w-full mt-5 py-8 px-6 flex flex-row justify-between items-center border'>
        <div className='font-bold text-3xl tracking-wider'>💨Whizz...</div>

        <div className='w-fit flex flex-row justify-between gap-3 text-gray-700 font-light'>
            <div>©️2024 Whizz Inc.</div>
            <div>Legal</div>
            <div>Privacy</div>
        </div>
    </div>
  )
}
