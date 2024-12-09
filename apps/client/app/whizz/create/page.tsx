/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import PrimaryButton from '@/components/button/PrimaryButton';
import Modal from '@/components/Modal';
import Navbar from '@/components/Navbar'
import WhizzBlock from '@/components/WhizzBlock'
import { BACKEND_DEV_URL } from '@/config';
import { ISelectedActions, ISelectedTrigger, IWhizzData } from '@/types';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { showToast } from '@/helper';

function useAvailableActionsAndTriggers() {
  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);
  // let availableActions: [AvailableAction] = [];
  // let availableTriggers: [AvailableTrigger] = [];

  try {
    useEffect(() => {      
      axios.get(`${BACKEND_DEV_URL}/api/v1/whizz/all-triggers`, {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczMjUyMDg5MH0.dQvTqMGNHiskjYaeIXqOohEljI9W9BpVgjOzpBFLOfg"
        }
      }).then((res: any) => {
        setAvailableTriggers(res.data.availableTriggers || [])
        // availableTriggers = res.data.availableTriggers || []
      })
  
      axios.get(`${BACKEND_DEV_URL}/api/v1/whizz/all-actions`, {
        headers: {
          Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTczMjUyMDg5MH0.dQvTqMGNHiskjYaeIXqOohEljI9W9BpVgjOzpBFLOfg"
        }
      }).then((res: any) => {
        setAvailableActions(res.data.availableActions || [])
        // availableActions = res.data.availableActions || []
      })
    }, [])
    
  } catch (error) {
    console.log(error);
  }

  return {
    availableActions,
    availableTriggers
  }
}


export default function Create() {
  const router = useRouter();
  const {availableTriggers, availableActions} = useAvailableActionsAndTriggers();

  const [selectedTrigger, setSelectedTrigger] = useState<ISelectedTrigger>();
  const [selectedActions, setSelectedActions] = useState<ISelectedActions[]>([]);
  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null);

  console.log(selectedTrigger);
  console.log(selectedActions);
  
  

  const onAddClick = () => {
    setSelectedActions((actions) => [
      ...actions,
      {
        index: actions.length + 2,
        availableActionId: "",   
        availableActionName: "",
        metadata: {}
      }
    ])
  }

  const onModalSelect = (props: null | {name: string, id: string, metadata: any}) => {
    if(props == null) {
      setSelectedModalIndex(null);
      return;
    }

    if(Number(props.id) == 1) {
      setSelectedTrigger({
        index: parseInt(props.id),
        name: props.name,
      }) 
    } 

    else { 
      setSelectedActions(a => {
        const newActions = [...a];

        if(selectedModalIndex && selectedModalIndex>=2) {
          newActions[selectedModalIndex - 2] = {
            index: selectedModalIndex,
            availableActionId: props.id.toString(),
            availableActionName: props.name,
            metadata: props.metadata
          }
        }
        return newActions;
      })
    }
    setSelectedModalIndex(null);
  }


  const onPublish = async () => {
    if(!selectedTrigger?.index) return;    

    const data: IWhizzData = {
      availableTriggerId: selectedTrigger.name.toLowerCase(),
      triggerMetadata: selectedTrigger.metadata,
      actions: selectedActions.map(action => ({
        availableActionId: action?.availableActionId,
        actionMetadata: action?.metadata,
        sortingOrder: action?.index
      })) 
    }

    console.log(data);

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res: any = await axios.post(`${BACKEND_DEV_URL}/api/v1/whizz`, data, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      }) 
  
      showToast("success", "Whizz created successfully!")
    } catch (error) {
      showToast("error", "Something went wrong while creating your Whizz. Please try again!")
    }
    
    router.push("/dashboard");
  }

  return (
    <div className='flex z-0 pb-36 flex-col bg-amber-50 justify-start items-center pt-3 absolute inset-0 min-h-screen h-fit w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]'>
        <Navbar />

        <div className='w-full flex justify-end px-10 pt-5'>
          <div className='w-fit'>
            <PrimaryButton 
              classFeatures='py-2 rounded-md px-5'
              onClick={onPublish}>Publish</PrimaryButton>
          </div>
        </div>

        <div className='flex flex-col items-center justify-center w-full md:w-[50%] pt-16'>
            <WhizzBlock 
                heading={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
                text={selectedTrigger?.name || "Select the event that starts your Whizz"} 
                index={1}
                type={"Trigger"}
                onClick={() => {
                  console.log(selectedTrigger);
                  setSelectedModalIndex(1);
                }}
            />
            
        </div>

        <div className='flex flex-col justify-center items-center w-full md:w-[50%]'>
          {selectedActions.map((action) => 
            <WhizzBlock
              key={action.index}
              heading={action.availableActionName ? action.availableActionName : "Action"}
              text={action.availableActionName || "Action"}
              index={action.index}
              onClick={() => {
                console.log(action.index);
                setSelectedModalIndex(action.index);
              }}
            />)}
        </div>

        <div className='flex justify-center w-full md:w-[50%]'>
          <div>
            <button 
              className='text-4xl'
              onClick={onAddClick}>+</button>
          </div>
        </div>

        {selectedModalIndex && 
        <Modal
          onSelect={onModalSelect}
          index={selectedModalIndex}
          availableItems={selectedModalIndex==1 ? availableTriggers : availableActions}
        />}

    </div>
  )
}
