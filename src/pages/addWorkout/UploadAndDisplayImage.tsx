import React from 'react'
import { UADIProps } from  './interfaces'
import "../../App.css"


export default function UploadAndDisplayImage(props: UADIProps){
    if (props.formData.selectedImage){ 
        console.log(URL.createObjectURL(props.formData.selectedImage))
        }
    return(
        <div className= 'visible-on-from-img'>
            <input
                type="file"
                name = 'selectedImage'
                onChange = {props.handleChange}
            />
            {props.formData.selectedImage && (
                <div>
                    <img 
                        className='uploaded-img'
                        alt='erg photo' 
                        src={URL.createObjectURL(props.formData.selectedImage)}
                    />
                </div> 
            )}
        </div>  
    )
}