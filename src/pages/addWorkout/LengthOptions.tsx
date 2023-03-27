import React from 'react'
import {FormData, LengthOptionsTypes, LOProps } from './interfaces' 


export default function LengthOptions(props: LOProps){
    const workoutLengthOptions: LengthOptionsTypes= {
        singleDist: ['2000m', '5000m', '10000m', 'other'],
        singleTime: ['15 min','30 min','45 min', 'other'],
        intervalDist:['500m','1000m','2000m','other'],
        intervalTime: ['1 min', '15 min','30 min','other']
    }
    
    let displayedType:string[] = new Array
    if(props.formData.workoutType === 'singleDist'){
        displayedType = workoutLengthOptions.singleDist
    }else if(props.formData.workoutType === 'singleTime'){
        displayedType = workoutLengthOptions.singleTime
    }else if(props.formData.workoutType === 'intervalDist'){
        displayedType = workoutLengthOptions.intervalDist
    }else if(props.formData.workoutType === 'intervalTime'){
        displayedType = workoutLengthOptions.intervalTime
    }
    
    return(
        <fieldset>
            <legend>{props.formData.workoutType}</legend>
            <label>
                {displayedType[0]}
                <input 
                    type='radio'
                    id='lengthOption1'
                    name='workoutLength'
                    value = {displayedType[0]}
                    checked = {props.formData.workoutLength === displayedType[0]}
                    onChange = {props.handleChange}
                />
            </label>
            <label>
                {displayedType[1]}
                <input 
                    type='radio'
                    id='lengthOption2'
                    name='workoutLength'
                    value = {displayedType[1]}
                    checked = {props.formData.workoutLength === displayedType[1]}
                    onChange = {props.handleChange}
                />
            </label>
            <label>
                {displayedType[2]}
                <input 
                    type='radio'
                    id='lengthOption3'
                    name='workoutLength'
                    value = {displayedType[2]}
                    checked = {props.formData.workoutLength === displayedType[2]}
                    onChange = {props.handleChange}
                />
            </label>
            <label>
                Other
                <input 
                    type='radio'
                    id='lengthOption4'
                    name='workoutLength'
                    value = 'other'
                    checked = {props.formData.workoutLength === 'other'}
                    onChange = {props.handleChange}
                />
            </label>
            <input 
                type='text' 
                name = 'customLength'
                style={{'display':props.formData.workoutLength === 'other'? 'block':'none'}}
                onChange={props.handleChange} 
                placeholder = 'custom'
            />
        </fieldset>
        
    )
}