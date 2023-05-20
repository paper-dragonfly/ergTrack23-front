import React from 'react'
import { UADIProps } from  '../../utils/interfaces'



export default function UploadAndDisplayImage(props: UADIProps){
    if (props.workoutInfo.ergImg){ 
        console.log(URL.createObjectURL(props.workoutInfo.ergImg))
        }
    return(
        <div className= 'visible-on-from-img'>
            <input
                type="file"
                name = 'ergImg'
                onChange = {props.handleChange}
            />
            {props.workoutInfo.ergImg && (
                <div>
                    <img 
                        className='uploaded-img w-11/12 mt-6 md:w-1/3'
                        alt='erg photo' 
                        src={URL.createObjectURL(props.workoutInfo.ergImg)}
                    />
                </div> 
            )}
        </div>  
    )
}