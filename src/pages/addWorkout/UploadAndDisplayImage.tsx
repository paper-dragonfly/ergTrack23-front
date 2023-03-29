import React from 'react'
import { UADIProps } from  './interfaces'
import "../../App.css"


export default function UploadAndDisplayImage(props: UADIProps){
    if (props.formData.ergImg){ 
        console.log(URL.createObjectURL(props.formData.ergImg))
        }
    return(
        <div className= 'visible-on-from-img'>
            <input
                type="file"
                name = 'ergImg'
                onChange = {props.handleChange}
            />
            {props.formData.ergImg && (
                <div>
                    <img 
                        className='uploaded-img'
                        alt='erg photo' 
                        src={URL.createObjectURL(props.formData.ergImg)}
                    />
                </div> 
            )}
        </div>  
    )
}