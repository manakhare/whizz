"use client"
import Navbar from '@/components/Navbar'
import { WhizzList } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_DEV_URL } from '@/config';

interface Response {
    data: {
        allWhizzes: [WhizzList]
    }
}

export default function Dashboard() {
    const [whizzList, setWhizzList] = useState<WhizzList[]>([]);

    // const whizzList: Array<WhizzList> = [
    //     {
    //         id: "1",
    //         zap_name: "Whizz 1",
    //         lastModifiedDate: "today",
    //         status: "inactive",
    //         trigger: "trigger"
    //     },
    //     {
    //         id: "2",
    //         zap_name: "Whizz 1",
    //         lastModifiedDate: "today",
    //         status: "inactive",
    //         trigger: "trigger"
    //     },
    // ];

    useEffect(() => {
        async function fetchData() {
            const res: Response = await axios.get(`${BACKEND_DEV_URL}/api/v1/whizz/`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            const whizzList = res.data.allWhizzes;
            setWhizzList(whizzList);
        }

        fetchData();
    }, [])

    return (
        <div className='flex flex-col justify-start min-h-full w-screen items-center pt-3'>
            <Navbar />

            <div className='h-full w-full p-10 md:w-[70%]'>

                <div className='flex flex-row justify-between items-center'>
                    <div className='px-2 text-2xl font-semibold'>Whizzes</div>
                    <div>
                        <Link href='/whizz/create'>
                            <button className='bg-indigo-500 px-3 py-1 rounded-md text-gray-100 flex justify-between items-center gap-1 font-semibold'><span className='text-xl items-center'>+</span> Create</button>
                        </Link>
                    </div>
                </div>

                <div className='w-full'>
                    <div className='pt-5 flex justify-end relative'>

                        {/* <span className='absolute w-[40%] pt-1.5 pl-1'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </span> */}
        
                        <input
                            className='px-7 py-1 border w-[40%] rounded-md text-gray-700 focus:ring-0 focus:outline-indigo-400'
                            type='text'
                            placeholder='Search...'
                        >

                        </input>
                    </div>
                </div>

                {/* TABLE */}
                <div className='w-full py-5'>
                    <table className='table-auto md:table-fixed w-full'>
                        <thead className='w-full'>
                            <tr className='grid grid-cols-3 w-full text-left'>
                                <th className='p-2'>Name</th>
                                <th className='p-2'>Webhook URL</th>
                                <th className='p-2'>Last Modified</th>
                                <th className='p-2'>Status</th>
                            </tr>
                        </thead>

                        <tbody className='w-full'>
                            {whizzList.map((whizz: WhizzList) => (
                                <tr className='grid grid-cols-3 w-full border border-transparent border-t-slate-200' key={whizz.id}>
                                    <td className='p-2'>{whizz.zap_name}</td>
                                    <td className='p-2'>{whizz.lastModifiedDate}</td>
                                    <td className='p-2'>{whizz.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}
