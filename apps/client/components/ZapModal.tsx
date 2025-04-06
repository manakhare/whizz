import { BACKEND_HOOKS_URL } from '@/config';
import { WhizzList } from '@/types';
import React from 'react'

interface IZapModalProps {
    // index: number;
    setZapModal: React.Dispatch<React.SetStateAction<number>>;
    zapModal: number;
    whizz: WhizzList;
}

export default function ZapModal({ zapModal, setZapModal, whizz }: IZapModalProps) {

    const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        e.preventDefault();
        
        setZapModal((prev) => {
            return - 1
        });
    }
    
    return (
        <div className='overflow-y-auto z-50 bg-amber-50 bg-opacity-70 flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
            <div className="relative p-4 w-full max-w-2xl max-h-full ">
                <div className="w-[100%] relative bg-white rounded-lg shadow bg-opacity-100 p-4 overflow-scroll">
                    <div className='flex flex-row justify-between items-center px-6 md:px-4 py-4 border-b border-b-amber-100'>
                        <div className='font-bold text-xl tracking-wider'>Whizz</div>
                        <div 
                            className='font-semibold text-2xl cursor-pointer'
                            onClick = {handleClose}
                            >x</div>
                    </div>

                    <div className='flex flex-col justify-start gap-5 items-start w-full p-4 overflow-y-scroll text-wrap'>
                        {/* Name  */}
                        <div className='flex flex-row gap-5'>
                            <div className='font-semibold text-lg'>Whizz name:</div>
                            <div className='font-normal text-lg'>{whizz.zap_name}</div>
                        </div>

                        {/* Webhook URL:  */}
                        <div className='flex flex-row gap-5 h-fit text-wrap'>
                            <div className='font-semibold text-lg'>Webhook URL:</div>
                            <div className='font-normal text-lg text-wrap'>{`${BACKEND_HOOKS_URL}/hooks/${whizz.userId}/${whizz.id}`}</div>
                        </div>

                        {/* Trigger:  */}
                        <div className='flex flex-row gap-5'>
                            <div className='font-semibold text-lg'>Trigger:</div>
                            <div className='font-normal text-lg'>{whizz.trigger.type.id}</div>
                        </div>

                        {/* Action:  */}
                        <div className='flex flex-row gap-5'>
                            <div className='font-semibold text-lg'>Action:</div>
                            <div className='font-normal text-lg'>{whizz.actions.map((action) => action.type.id).join(' -> ')}</div>
                        </div>
                        
                        <div className='flex flex-row justify-end items-center w-full'>
                            <div 
                                className='w-[30%] text-center cursor-pointer font-semibold px-4 py-2 w-full text-slate-50 bg-red-600 hover:bg-red-500'
                                onClick={handleClose}>
                                    Close
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
