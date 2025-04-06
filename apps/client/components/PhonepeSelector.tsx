import React, { useState } from 'react'
import Input from './Input'
import PrimaryButton from './button/PrimaryButton';
import { string } from 'zod';

export default function PhonepeSelector({ setMetadata }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setMetadata: (params: any) => void
}) {
    // const [amount, setAmount] = useState("");
    // const [address, setAddress] = useState("");
    const [from, setFrom] = useState({
        upi: "",
        webhook: false,
        selectedOption: ""
    })
    const [to, setTo] = useState({
        upi: "",
        webhook: false,
        selectedOption: ""
    })
    const [amount, setAmount] = useState({
        quantity: "0",
        webhook: false,
        selectedOption: ""
    })

    return (
        <div className='flex justify-center items-center w-full'>
            <div className='flex flex-col justify-center items-center w-[70%]'>
                <div className='flex flex-col w-full justify-center items-center gap-5'>
                    {/* <Input label={"To"} type={"text"} placeholder={"To"} onChange={(e) => setAddress(e.target.value)} />
                <Input label={"Amount"} type={"text"} placeholder={"Amount"} onChange={(e) => setAmount(e.target.value)} /> */}

                    {/* FROM  */}
                    <div className='flex flex-col w-[90%] gap-1'>
                        <label htmlFor="fromSenderOptions" className="font-md font-semibold">
                            From (UPI ID) <span className='text-red-800'>*</span>
                        </label>
                        <select
                            id="fromSenderOptions"
                            value={from.selectedOption}
                            onChange={(e) => {
                                setFrom((prev) => ({
                                    ...prev,
                                    selectedOption: e.target.value
                                }))
                                if (e.target.value === "webhook") {
                                    setFrom((prev) => ({
                                        ...prev,
                                        webhook: true
                                    }))
                                }
                            }}
                            className="border p-2 rounded-md"
                        >
                            <option value="">Select an option</option>
                            <option value="webhook">Get from webhook data</option>
                            <option value="manual">Enter manually</option>
                        </select>

                        {from.selectedOption === "manual" && (
                            <div>
                                <label htmlFor="manualSenderEmail" className="block font-medium">
                                    Add sender's UPI ID manually
                                </label>
                                <input
                                    id="manualSenderEmail"
                                    type="email"
                                    value={from.upi}
                                    onChange={(e) => {
                                        setFrom((prev) => ({
                                            ...prev,
                                            upi: e.target.value
                                        }))
                                    }}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Enter email"
                                />
                            </div>
                        )}
                    </div>

                    {/* TO  */}
                    <div className='flex flex-col w-[90%] gap-1'>
                        <label htmlFor="toOptions" className="font-md font-semibold">
                            TO (UPI ID) <span className='text-red-800'>*</span>
                        </label>
                        <select
                            id="toOptions"
                            value={to.selectedOption}
                            onChange={(e) => {
                                setTo((prev) => ({
                                    ...prev,
                                    selectedOption: e.target.value
                                }))
                                if (e.target.value === "webhook") {
                                    setTo((prev) => ({
                                        ...prev,
                                        webhook: true
                                    }))
                                }
                            }}
                            className="border p-2 rounded-md"
                        >
                            <option value="">Select an option</option>
                            <option value="webhook">Get from webhook data</option>
                            <option value="manual">Enter manually</option>
                        </select>

                        {to.selectedOption === "manual" && (
                            <div>
                                <label htmlFor="manualReceiverUPI" className="block font-medium">
                                    Add receiver's UPI ID manually
                                </label>
                                <input
                                    id="manualReceiverUPI"
                                    type="email"
                                    value={to.upi}
                                    onChange={(e) => {
                                        setFrom((prev) => ({
                                            ...prev,
                                            upi: e.target.value
                                        }))
                                    }}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="Enter UPI ID"
                                />
                            </div>
                        )}
                    </div>

                    {/* AMOUNT  */}
                    <div className='flex flex-col w-[90%] gap-1'>
                        <label htmlFor="amountOptions" className="font-md font-semibold">
                            Amount <span className='text-red-800'>*</span>
                        </label>
                        <select
                            id="amountOptions"
                            value={amount.selectedOption}
                            onChange={(e) => {
                                setAmount((prev) => ({
                                    ...prev,
                                    selectedOption: e.target.value
                                }))
                                if (e.target.value === "webhook") {
                                    setAmount((prev) => ({
                                        ...prev,
                                        webhook: true
                                    }))
                                }
                            }}
                            className="border p-2 rounded-md"
                        >
                            <option value="">Select an option</option>
                            <option value="webhook">Get from webhook data</option>
                            <option value="manual">Enter manually</option>
                        </select>

                        {amount.selectedOption === "manual" && (
                            <div>
                                <label htmlFor="manualAmount" className="block font-medium">
                                    Add Amount manually
                                </label>
                                <input
                                    id="manualAmount"
                                    type="email"
                                    value={amount.quantity}
                                    onChange={(e) => {
                                        setFrom((prev) => ({
                                            ...prev,
                                            upi: e.target.value
                                        }))
                                    }}
                                    className="border p-2 rounded-md w-full"
                                    placeholder="UPI ID"
                                />
                            </div>
                        )}
                    </div>
                </div>

                <div className='pt-8 w-[90%] flex justify-center py-1'>
                    <PrimaryButton
                        classFeatures='py-2 w-full rounded-md flex justify-center items-center'
                        onClick={() => {
                            setMetadata({
                                fromUPI: from.upi,
                                // fromWebhook: from.webhook,
                                toUpi: to.upi==="" ? "webhook" : to.upi,
                                // toWebhook: to.webhook,
                                amount: amount.quantity==="0" ? "webhook" : amount.quantity,
                                // amountWebhook: amount.webhook
                            })
                        }}>Submit</PrimaryButton>
                </div>
            </div>

        </div>
    )
}
