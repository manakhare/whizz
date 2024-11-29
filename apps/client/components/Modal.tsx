"use client"
// import Image from 'next/image';
import React, { useState } from 'react'
import EmailSelector from './EmailSelector';
import PhonepeSelector from './PhonepeSelector';
// import { IMetadata } from '@/types';

export default function Modal({index, onSelect, availableItems} : {
    index: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onSelect: (props: null | {name: string, id: string, metadata: any}) => void;
    availableItems: {id: string, name: string, image: string}[];
}) {
    
    const [step, setStep] = useState(0);
    const [selectedAction, setSelectedAction] = useState<{
        id: string;
        name: string;
        // metadata: any;
    }>()
    const isTrigger = index === 1;

    console.log(selectedAction);
    

    return (
        <div className="overflow-y-auto bg-amber-50 bg-opacity-70 flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="relative p-4 w-full max-w-2xl max-h-full ">
                <div className="relative bg-white rounded-lg shadow bg-opacity-100">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                        <h3 className="text-xl font-semibold text-gray-900">
                            {index === 1 ? "Triggers" : "Actions"}
                        </h3>
                        <button 
                            onClick={() => onSelect(null)}
                            type="button" 
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className='p-4 flex flex-col justify-start gap-5 items-start w-full'>
                        {step===1 && selectedAction?.id==='email' && <EmailSelector setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />}

                        {step===1 && selectedAction?.id==='send-phonepe' && <PhonepeSelector setMetadata={(metadata) => {
                            onSelect({
                                ...selectedAction,
                                metadata
                            })
                        }} />}

                        {step===0 && availableItems.map((item) => {
                            return <div 
                                key={item.id}
                                onClick={() => {
                                    if(isTrigger) {
                                        console.log(`${item.id}  ${item.name}`);
                                        
                                        onSelect({
                                            // id: item.id,
                                            id: "1",
                                            name: item.name,
                                            metadata: {}
                                        })

                                        
                                        
                                    } else {
                                        setStep(s => s+1);
                                        setSelectedAction({
                                            id: item.id,
                                            name: item.name
                                        })
                                    }
                                }}
                                className="flex flex-row justify-start items-center gap-3 py-1 px-2 bg-amber-50 border rounded-md w-full shadow-sm hover:shadow-md hover:cursor-pointer">
                                    <span className='w-8 h-8 p-1'>
                                        <img className='w-full h-full object-cover' src={item.image} alt='Icon'></img>
                                    </span>
                                    <span>{item.name}</span>
                            </div>
                        })}
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
 