import { BACKEND_DEV_URL } from '@/config';
import { showToast } from '@/helper';
import React from 'react'

export default function DialogBox({id, setEditMode, setDialogBox}: {
    id: string;
    setEditMode: React.Dispatch<React.SetStateAction<boolean>>;
    setDialogBox: React.Dispatch<React.SetStateAction<boolean>>;
}) { 
    console.log("clicked");

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`${BACKEND_DEV_URL}/api/v1/whizz/delete/${id}`, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
    
            console.log(res);
            
            setDialogBox(false);
            setEditMode(false);
            showToast("success", "Delete successful")
            
        } catch (error) {
            console.log(error);
            setDialogBox(false);
            setEditMode(false)
            showToast("error", "Something went wrong. Please try again!")
        }
    }


    
  return (
    <div className='z-10 bg-opacity-40 top-0 right-0 left-0 inset-0 h-screen w-screen flex justify-center items-center'>
        <div className='w-fit h-fit p-5 flex flex-col gap-5'>
            <div className='text-xl font-semibold text-gray-900'>Are you sure you want to delete the selected Whizz?</div>
            <div className='flex flex-row gap-10'>
                <button 
                    className='bg-gray-50 text-md text-gray-800' 
                    onClick={()=> {
                        setEditMode(false);
                        setDialogBox(false);
                    }}>Cancel</button>
                <button className='bg-red-500 text-white text-md' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    </div>
  )
}
