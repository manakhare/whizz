"use client"
import Navbar from '@/components/Navbar'
import { WhizzList } from '@/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_DEV_URL } from '@/config';
import { formatDate, showToast } from '@/helper';
import Edit from '@/components/icons/Edit';
import DialogBox from '@/components/DialogBox';
import { useRouter } from 'next/navigation';

interface Response {
    data: {
        allWhizzes: WhizzList[]
    }
}

interface Res {
    data: {
        whizz: WhizzList
    }
}

export default function Dashboard() {
    const [whizzList, setWhizzList] = useState<WhizzList[]>([]);
    // const [hidden, setHidden] = useState("");
    const [editMode, setEditMode] = useState(false);
    const [dialogBox, setDialogBox] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
        id: "",
        whizz_name: "Untitled",
        status: "INACTIVE"
    })
    const router = useRouter()

    console.log("---EDITED DETAILS----", editedDetails);
    

    console.log("----FUNCTION----", whizzList);
    

    const handleSave = async () => {
        try {
            
            const res: Res = await axios.put(`${BACKEND_DEV_URL}/api/v1/whizz/update`,
                {
                    ...editedDetails,
                    lastModified: new Date().toISOString()
                },
                {
                    headers: {
                        authorization: localStorage.getItem("token")
                    }
                }
            )

                        
            showToast("success", "Edited successfully")
            
            setWhizzList((prevList) => {
                
                return prevList.map((whizz) =>
                    (
                        whizz.id === editedDetails.id ? { 
                        ...whizz, 
                        zap_name: editedDetails.whizz_name,
                        status: editedDetails.status,
                        lastModified: formatDate(res.data.whizz.lastModified)  
                    } : whizz
                ))
        });

        console.log("AFTER UPDATE----", whizzList);
        

            
        } catch (error) {
            console.log(error);
            showToast("error", "Something went wrong while editing the Whizz. Please try again!")
        }
        
        router.refresh();
        setEditMode(false);
    }

    useEffect(() => {
        async function fetchData() {
            const res: Response = await axios.get(`${BACKEND_DEV_URL}/api/v1/whizz/`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            const whizzList = res.data.allWhizzes;
            console.log(whizzList);

            setWhizzList(whizzList);
        }

        fetchData();

        return () => setEditedDetails({
            id: "",
            whizz_name: "Untitled",
            status: "INACTIVE"
        })
    }, [])

    const handleEditClick = () => {
        setEditMode(true);
    }



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


                        <input
                            className='px-7 py-1 border w-[40%] rounded-md text-gray-700 focus:ring-0 focus:outline-indigo-400'
                            type='text'
                            placeholder='Search...'
                        >
                            {/* <span className='absolute pt-1.5 pl-1'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </span> */}
                        </input>
                    </div>
                </div>

                {/* TABLE */}
                <div className='w-full py-5'>
                    <table className='table-auto w-full'>
                        <thead>
                            <tr>
                                <th className='p-2'>Name</th>
                                <th className='p-2'>Webhook URL</th>
                                <th className='p-2'>Last Modified</th>
                                <th className='p-2'>Status</th>
                            </tr>
                        </thead>

                        <tbody className=''>
                            {whizzList.map((whizz: WhizzList) => (
                                <tr className='hover:bg-gray-100 border border-transparent border-t-slate-200' key={whizz.id}>
                                    {editMode ?
                                        (<td className='p-2'>
                                            <input
                                                placeholder={whizz.zap_name}
                                                className='border-2 border-gray-600 focus:border-green-400 focus:outline-none focus: ring-0 rounded-md px-2 py-1'
                                                onChange={(e) => setEditedDetails({ ...editedDetails, id: whizz.id, whizz_name: e.target.value })} />
                                        </td>)
                                        : (<td className='p-2'>{whizz.zap_name}</td>)}
                                    <td className='p-2'>{`${BACKEND_DEV_URL}/hooks/${whizz.userId}/${whizz.id}`}</td>
                                    <td className='p-2'>{formatDate(whizz?.lastModified)}</td>
                                    <td className='p-2 relative'>
                                        <span className=' flex justify-center items-center'>
                                            {whizz.status === "INACTIVE" ?
                                                (<label className="inline-flex items-center me-5 cursor-pointer">
                                                    <input 
                                                        type="checkbox" 
                                                        disabled={editMode ? false : true}
                                                        checked={editedDetails.status==="ACTIVE" ? true : false}
                                                        className="sr-only peer" 
                                                        onChange={() => setEditedDetails({ 
                                                            ...editedDetails, 
                                                            id: whizz.id,
                                                            status: editedDetails.status==="ACTIVE" ? "INACTIVE" : "ACTIVE" 
                                                        })} />
                                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                                </label>)
                                                :
                                                (
                                                    <label className="inline-flex items-center me-5 cursor-pointer">
                                                        <input 
                                                            type="checkbox" 
                                                            disabled={editMode ? false : true} 
                                                            checked={editedDetails.status==="ACTIVE" ? true : false}
                                                            className="sr-only peer" 
                                                            onChange={() => setEditedDetails({ 
                                                                ...editedDetails, 
                                                                id: whizz.id, 
                                                                status: editedDetails.status==="ACTIVE" ? "INACTIVE" : "ACTIVE" 
                                                            })} />
                                                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                                    </label>
                                                )}
                                        </span>

                                        {editMode ?
                                            (<span>
                                                <button
                                                    className='bg-green-600 px-3 py-1 rounded-md text-white absolute top-2 -right-16'
                                                    onClick={handleSave}>
                                                    Save
                                                </button>
                                            </span>
                                            )
                                            :
                                            (
                                                <span className='flex flex-row justify-start gap-3 absolute top-2 -right-20'>
                                                    <span
                                                        className='cursor-pointer'
                                                        onClick={handleEditClick}>
                                                        <Edit size={"size-6"} />
                                                    </span>

                                                    <span
                                                        data-modal-target="default-modal" 
                                                        data-modal-toggle="default-modal" 
                                                        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                                                        
                                                        onClick={() => { 
                                                            setDialogBox(true)
                                                            setEditMode(false) 
                                                        }}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="red" className="size-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                        </svg>
                                                    </span>

                                                </span>

                                            )
                                        }

                                        {editMode &&
                                            <span
                                                className='absolute -right-28 top-2 p-1 cursor-pointer'
                                                onClick={() => setDialogBox(true)}>
                                            </span>
                                        }

                                        {
                                            dialogBox &&
                                            <DialogBox id={whizz.id} setEditMode={setEditMode} setDialogBox={setDialogBox} />
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


            </div>
        </div>
    )
}
