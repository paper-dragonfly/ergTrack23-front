import React from 'react'
import {TypesWorkoutInfo, TypesLengthOptions, LOProps } from '../../utils/interfaces' 


export default function LengthOptions(props: LOProps){
    const workoutLengthOptions: TypesLengthOptions= {
        singleDist: ['2000m', '5000m', '10000m', 'other'],
        singleTime: ['15:00','30:00','45:00', 'other'],
        intervalDist:['500m','1000m','2000m','other'],
        intervalTime: ['1:00', '15:00','30:00','other']
    }
    
    let displayedType:string[] = new Array
    if(props.workoutInfo.workoutType === 'singleDist'){
        displayedType = workoutLengthOptions.singleDist
    }else if(props.workoutInfo.workoutType === 'singleTime'){
        displayedType = workoutLengthOptions.singleTime
    }else if(props.workoutInfo.workoutType === 'intervalDist'){
        displayedType = workoutLengthOptions.intervalDist
    }else if(props.workoutInfo.workoutType === 'intervalTime'){
        displayedType = workoutLengthOptions.intervalTime
    }
    
    return(
        <fieldset>
            <legend>{props.workoutInfo.workoutType}</legend>
            <label>
                <input 
                    type='radio'
                    id='lengthOption1'
                    name='workoutLength'
                    value = {displayedType[0]}
                    checked = {props.workoutInfo.workoutLength === displayedType[0]}
                    onChange = {props.handleChange}
                    />
                {displayedType[0]}
            </label>
            <label>
                <input 
                    type='radio'
                    id='lengthOption2'
                    name='workoutLength'
                    value = {displayedType[1]}
                    checked = {props.workoutInfo.workoutLength === displayedType[1]}
                    onChange = {props.handleChange}
                />
                {displayedType[1]}
            </label>
            <label>
                <input 
                    type='radio'
                    id='lengthOption3'
                    name='workoutLength'
                    value = {displayedType[2]}
                    checked = {props.workoutInfo.workoutLength === displayedType[2]}
                    onChange = {props.handleChange}
                />
                {displayedType[2]}
            </label>
            <label>
                <input 
                    type='radio'
                    id='lengthOption4'
                    name='workoutLength'
                    value = 'other'
                    checked = {props.workoutInfo.workoutLength === 'other'}
                    onChange = {props.handleChange}
                />
                Other
            </label>
            <input 
                type='text' 
                name = 'customLength'
                style={{'display':props.workoutInfo.workoutLength === 'other'? 'block':'none'}}
                onChange={props.handleChange} 
                placeholder = 'custom'
            />
        </fieldset>
        
    )
}