"use client"
import React, { useState } from 'react'
import Input from './Input';
import PrimaryButton from './button/PrimaryButton';

export default function EmailSelector({ setMetadata }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMetadata: (params: any) => void
}) {
    // const [selectedOption, setSelectedOption] = useState<string[]>(['']);
    // const [manualEmail, setManualEmail] = useState<string>("");
    const [senderEmail, setSenderEmail] = useState("");
    const [senderSelectedOption, setSenderSelectedOption] = useState("");
    const [receiverEmail, setReceiverEmail] = useState("");
    const [receiverSelectedOption, setReceiverSelectedOption] = useState("");
    const [body, setBody] = useState("");

    // const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     const value = event.target.value;
    //     setSelectedOption(value);
    //     if (value !== "manual") {
    //         setManualEmail(""); // Reset manual email when switching back
    //     }
    // };

    // const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setManualEmail(event.target.value);
    // };

    return (
        <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col justify-center items-center w-[70%]'>
                <div className='flex flex-col w-full justify-center items-center gap-5'>
                    {/* <Input label={"To"} placeholder={"Email"} type={"text"} onChange={(e) => setSenderEmail(e.target.value)}/>
                <Input label={"To"} placeholder={"Email"} type={"text"} onChange={(e) => setSenderEmail(e.target.value)}/> */}

                    <div className='flex flex-col w-[90%] gap-1'>
                        <label htmlFor="emailOptions" className="font-md font-semibold">
                            Sender's email <span className='text-red-800'>*</span>
                        </label>
                        <select
                            id="emailOptions"
                            value={senderSelectedOption}
                            onChange={(e) => {
                                setSenderSelectedOption(e.target.value)
                                if (e.target.value === "") {
                                    setSenderEmail(""); // Reset manual email when switching back
                                } else if(e.target.value === "webhook") {
                                    setSenderEmail(e.target.value);
                                }
                            }}
                            className="border p-2 rounded-md"
                        >
                            <option value="">Select an option</option>
                            <option value="webhook">Get from webhook data</option>
                            <option value="manual">Enter manually</option>
                        </select>

                        {senderSelectedOption === "manual" && (
                            <div>
                                <label htmlFor="manualEmail" className="block font-medium">
                                    Add sender's email manually
                                </label>
                                <input
                                    id="manualEmail"
                                    type="email"
                                    value={senderEmail}
                                    onChange={(e) => {
                                        setSenderEmail(e.target.value)
                                    }}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Enter email"
                                />
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col w-[90%] gap-1'>
                        <label htmlFor="emailOptions" className="font-md font-semibold">
                            Receiver's email <span className='text-red-800'>*</span>
                        </label>
                        <select
                            id="emailOptions"
                            value={receiverSelectedOption}
                            onChange={(e) => {
                                setReceiverSelectedOption(e.target.value);
                                if(e.target.value !== "manual") {
                                    setReceiverEmail(e.target.value);
                                }
                            }}
                            className="border p-2 rounded-md"
                        >
                            <option value="">Select an option</option>
                            <option value="webhook">Get from webhook data</option>
                            <option value="manual">Enter manually</option>
                        </select>

                        {receiverSelectedOption === "manual" && (
                            <div>
                                <label htmlFor="manualEmail" className="block font-medium">
                                    Add receiver's email manually
                                </label>
                                <input
                                    id="manualEmail"
                                    type="email"
                                    value={receiverEmail}
                                    onChange={(e) => setReceiverEmail(e.target.value)}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Enter email"
                                />
                            </div>
                        )}
                    </div>
                    <div className='flex flex-col w-[90%] gap-1'>
                        <label htmlFor='emailBody' className='font-md font-semibold'>Email Body <span className='text-red-800'>*</span></label>
                        <textarea id='emailBody' className='w-full py-2 px-2 rounded-md border text-gray-800' value={body}  placeholder={"Body"} onChange={(e) => setBody(e.target.value)} />
                    </div>
                </div>

                <div className='pt-8 w-[90%] flex justify-center py-1'>
                    <PrimaryButton
                        classFeatures='py-2 w-full rounded-md flex justify-center items-center'
                        onClick={() => {
                            setMetadata({
                                senderEmail,
                                receiverEmail,
                                body
                            })
                        }}>
                        Submit</PrimaryButton>
                </div>
            </div>
        </div>
    )
}
