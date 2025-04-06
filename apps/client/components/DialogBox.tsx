// "use client"
import { BACKEND_DEV_URL } from '@/config';
import { showToast } from '@/helper';
import React from 'react'
import axios from 'axios';
// import { useRouter } from 'next/navigation';

export default function DialogBox({id, setEditMode, setDialogBox, setDeleted, index, triggerId}: {
    id: string;
    setEditMode: React.Dispatch<React.SetStateAction<boolean[]>>;
    setDialogBox: React.Dispatch<React.SetStateAction<boolean[]>>;
    setDeleted: React.Dispatch<React.SetStateAction<boolean>>;
    index: number;
    triggerId: string;
}) { 
    // console.log("clicked");
    // const router = useRouter();

    const handleDelete = async () => {
        try {
            await axios.delete(`${BACKEND_DEV_URL}/api/v1/whizz/delete/whizzId/${id}/triggerId/${triggerId}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
    
            // console.log(res);
            setDeleted(true);
            showToast("success", "Delete successful")
            
        } catch (error) {
            // console.log(error);
            showToast("error", "Something went wrong. Please try again!")
        }
        
        setDialogBox((prevDialogBox) => prevDialogBox.map((ele, i) => i===index ? false : ele));
        setEditMode((prevEditMode) => prevEditMode.map((ele, i) => i===index ? false : ele));
    }


    const handleCancel = () => {
        setEditMode((prev) => prev.map((ele, i) => i===index ? false : ele))
        setDialogBox((prev) => prev.map((ele, i) => i===index ? false : ele))
    }

    
  return (
    <div className='overflow-y-auto bg-amber-50 bg-opacity-70 flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full'>
        <div className="relative p-4 w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow bg-opacity-100">
                <div className="flex items-end justify-end px-4 md:px-4 pt-4 rounded-t">
                    <button 
                        className='font-bold'
                        onClick={handleCancel}>X</button>
                </div>

                <div className='p-4 flex flex-col justify-start gap-5 items-start w-full'>
                    <div>
                        <p className='font-semibold'>Are you sure you want to delete this Whizz? </p>
                        <p className='font-light tracking-wide'>All the data and information regarding this Whizz will be permanantly deleted and cannot be recovered.</p>
                    </div>

                    <div className='flex flex-row justify-around w-full gap-5'>
                        <button 
                            className="px-4 py-2 w-[50%] text-gray-800 bg-gray-100 hover:bg-gray-200"
                            onClick={handleCancel}>Cancel</button>
                        <button 
                            className="px-4 py-2 w-[50%] text-white bg-red-500 hover:bg-red-600"
                            onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
