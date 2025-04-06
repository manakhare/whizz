// import React, { useState } from 'react'
// import Input from './Input'
// import PrimaryButton from './button/PrimaryButton';

// export default function GithubSelector({setMetadata}: {
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// setMetadata: (params: any) => void}) {
    
//     // const [githubid, setgithubId] = useState<string>("");
//     const [githubName, setGithubName] = useState<string>("");

//   return (
//     <div className='flex justify-center items-center w-full'>
//             <div className='flex flex-col justify-center items-center w-[70%]'>
//                 <div className='flex flex-col w-full justify-center items-center gap-5'>
//                     {/* <Input label={"To"} type={"text"} placeholder={"To"} onChange={(e) => setGithubName(e.target.value)} />
//                     <Input label={"Amount"} type={"text"} placeholder={"Amount"} onChange={(e) => setgithubId(e.target.value)} /> */}
//                     <div className='flex flex-col w-[90%] gap-1'>
//                         <label htmlFor="fromSenderOptions" className="font-md font-semibold">
//                             From (UPI ID) <span className='text-red-800'>*</span>
//                         </label>
//                         <select
//                             id="fromSenderOptions"
//                             value={from.selectedOption}
//                             onChange={(e) => {
//                                 setFrom((prev) => ({
//                                     ...prev,
//                                     selectedOption: e.target.value
//                                 }))
//                                 if (e.target.value === "webhook") {
//                                     setFrom((prev) => ({
//                                         ...prev,
//                                         webhook: true
//                                     }))
//                                 }
//                             }}
//                             className="border p-2 rounded-md"
//                         >
//                             <option value="">Select an option</option>
//                             <option value="webhook">Get from webhook data</option>
//                             <option value="manual">Enter manually</option>
//                         </select>

//                         {from.selectedOption === "manual" && (
//                             <div>
//                                 <label htmlFor="manualSenderEmail" className="block font-medium">
//                                     Add sender's UPI ID manually
//                                 </label>
//                                 <input
//                                     id="manualSenderEmail"
//                                     type="email"
//                                     value={from.upi}
//                                     onChange={(e) => {
//                                         setFrom((prev) => ({
//                                             ...prev,
//                                             upi: e.target.value
//                                         }))
//                                     }}
//                                     className="border p-2 rounded-md w-full"
//                                     placeholder="Enter email"
//                                 />
//                             </div>
//                         )}
//                     </div>
//                 </div>
    
//                 <div className='pt-8 w-[90%] flex justify-center py-1'>
//                     <PrimaryButton 
//                         classFeatures='py-2 w-full rounded-md flex justify-center items-center'
//                         onClick={() => {
//                             setMetadata({
//                                 githubid,
//                                 githubName
//                             })
//                     }}>Submit</PrimaryButton>
//                 </div>
//             </div>
    
//         </div>
//   )
// }
