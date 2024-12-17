"use client"
import React, { useEffect, useState } from 'react'
import DialogBox from './DialogBox'
import { formatDate, showToast } from '@/helper'
import { BACKEND_DEV_URL } from '@/config'
import { useRouter } from 'next/navigation'
import { WhizzList } from '@/types'
import Edit from './icons/Edit'
import axios from 'axios'
import Delete from './icons/Delete'

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

export default function Table() {
    const [whizzList, setWhizzList] = useState<WhizzList[]>([]);
    const [editMode, setEditMode] = useState<boolean[]>([]);
    const [dialogBox, setDialogBox] = useState<boolean[]>([]);
    const [deleted, setDeleted] = useState(false);
    const [activeEditState, setActiveEditState] = useState(false)
    const [editedDetails, setEditedDetails] = useState({
        id: "",
        whizz_name: "Untitled",
        status: "INACTIVE"
    })
    const router = useRouter()

    const handleSave = async (index: number) => {
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

            // console.log("AFTER UPDATE----", whizzList);

        } catch (error) {
            console.log(error);
            showToast("error", "Something went wrong while editing the Whizz. Please try again!")
        }

        setActiveEditState(false);
        router.refresh();
        setEditMode((prevEditMode) => prevEditMode.map((ele, i) => i===index ? false : ele));
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
            setEditMode(new Array(whizzList.length).fill(false))
            setDialogBox(new Array(whizzList.length).fill(false))
        }

        fetchData();

        return () => setEditedDetails({
            id: "",
            whizz_name: "Untitled",
            status: "INACTIVE"
        })
    }, [deleted])

    const handleEditClick = (index: number) => {
        setEditMode((prevEditMode) => prevEditMode.map((ele, i) => i===index ? true : ele));
        setActiveEditState(true);
    }


    return (
        <div className='w-full py-5'>
            <table className='table-auto w-full'>
                <thead>
                    <tr>
                        <th className='p-2'>Whizz</th>
                        <th className='p-2'>Name</th>
                        <th className='p-2'>Webhook URL</th>
                        <th className='p-2'>Last Modified</th>
                        <th className='p-2'>Status</th>
                    </tr>
                </thead>

                <tbody className=''>
                    {whizzList.map((whizz: WhizzList, index) => (
                        <tr className='hover:bg-gray-100 border border-transparent border-t-slate-200' key={whizz.id}>
                            <td className='p-2'>  
                                <div className='flex flex-wrap flex-row items-center justify-start gap-2'><img src={whizz.trigger.type.image} width={30} height={30}/> {' '} {whizz.actions.map((x) => <img key={x.id} src={x.type.image} width={30} height={30}/>)}</div>
                            </td>
                            {editMode[index] ?
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
                                <span className='flex justify-center items-center'>
                                    {whizz.status === "INACTIVE" ?
                                        (<label className="inline-flex items-center me-5 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                disabled={editMode ? false : true}
                                                checked={editedDetails.status === "ACTIVE" ? true : false}
                                                className="sr-only peer"
                                                onChange={() => setEditedDetails({
                                                    ...editedDetails,
                                                    id: whizz.id,
                                                    status: editedDetails.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
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
                                                    checked={editedDetails.status === "ACTIVE" ? true : false}
                                                    className="sr-only peer"
                                                    onChange={() => setEditedDetails({
                                                        ...editedDetails,
                                                        id: whizz.id,
                                                        status: editedDetails.status === "ACTIVE" ? "INACTIVE" : "ACTIVE"
                                                    })} />
                                                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                                            </label>
                                        )}
                                </span>

                                {editMode[index] ?
                                    (<span className='top-2 -right-40 absolute flex flex-row gap-3 items-center'>
                                        <button
                                            className='bg-green-600 hover:bg-green-500 px-3 py-1 rounded-md text-white'
                                            onClick={() => handleSave(index)}>
                                            Save
                                        </button>

                                        <button 
                                            className='bg-gray-50 border-2 border-gray-500 hover:bg-gray-100 px-3 py-1 rounded-md text-gray-800'
                                            onClick={() => {setEditMode((prevEditMode) => prevEditMode.map((ele, i) => i===index ? false: ele)); setActiveEditState(false)}}
                                        >
                                            Cancel
                                        </button>
                                    </span>
                                    )
                                    :
                                    (
                                        <span className='flex flex-row justify-start gap-3 absolute top-5 -right-20'>
                                            <span
                                                // className={activeEditState ? `cursor-not-allowed` : 'cursor-pointer'}
                                                >
                                                    <button
                                                        className={activeEditState ? `cursor-not-allowed` : 'cursor-pointer'}
                                                        onClick={() => handleEditClick(index)}
                                                        disabled={activeEditState}>
                                                        <Edit size={"size-6"} />
                                                    </button>
                                            </span>

                                            <span
                                                className='cursor-pointer'
                                                
                                                onClick={() => {
                                                    setDialogBox((prevDialogBox) => prevDialogBox.map((ele, i) => i===index ? true : ele))
                                                    setEditMode((prevEditMode) => prevEditMode.map((ele, i) => i===index ? false : ele))
                                                }}>
                                                <Delete />
                                            </span>

                                        </span>
                                    )
                                }

                                {
                                    dialogBox[index] &&
                                    <DialogBox id={whizz.id} setEditMode={setEditMode} setDialogBox={setDialogBox} setDeleted={setDeleted} index={index} triggerId={whizz.triggerId} />
                                }
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
