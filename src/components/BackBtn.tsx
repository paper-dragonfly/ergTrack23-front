import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { BsArrowLeftShort } from "react-icons/bs"


export default function BackBtn(props:{navTo: string, btnText: string}){
    const [goingBack, setGoingBack] = useState<boolean>(false)
    const navigate = useNavigate()
    
    const handleGoBack = () => {
        setGoingBack(true);
    
        if (props.navTo === '-1') {
          // Handle the special case to navigate back
          window.history.back();
        } else {
          navigate(props.navTo);
        }
      };
    return(
        <div className="flex justify-end items-center">
                <button onClick={handleGoBack} className="flex items-center pt-4 text-base">
                    {goingBack ? "Loading..." : 
                    <>
                    <BsArrowLeftShort size={25} className="mr-1" /> {props.btnText}
                    </>
                    }           
                </button>
            </div>
    )
}