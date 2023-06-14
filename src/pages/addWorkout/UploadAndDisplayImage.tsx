import React from 'react'
import { UADIProps } from  '../../utils/interfaces'



export default function UploadAndDisplayImage(props: UADIProps){
    if (props.workoutInfo.ergImg){ 
        console.log(URL.createObjectURL(props.workoutInfo.ergImg))
        }
    return(
        <div className= 'visible-on-from-img'>
            <input
                id='choose-file'
                type="file"
                name = 'ergImg'
                onChange = {props.handleChange}
            />
            {props.workoutInfo.ergImg && (
                <div>
                    <img
                        className='uploaded-img w-5/6  mt-6'
                        // className='uploaded-img max-w-sm  mt-6'
                        alt='erg photo' 
                        src={URL.createObjectURL(props.workoutInfo.ergImg)}
                    />
                </div> 
            )}
        </div>  
    )
}