import React, {useState} from 'react'
import {TypesWorkoutInfo, TypesLengthOptions, LOProps } from '../../utils/interfaces' 

export default function LengthOptions(props: LOProps){
    const [selectedOption, setSelectedOption] = useState("lengthOption1");


    const workoutLengthOptions: TypesLengthOptions= {
        singleDist: ['2000m', '5000m', '10000m', 'other'],
        singleTime: ['15:00','30:00','45:00', 'other'],
        intervalDist:['500m','1000m','2000m','other'],
        intervalTime: ['1:00', '15:00','30:00','other']
    }
    
    let displayedType:string[] = new Array
    let legendKey;
    if(props.workoutInfo.workoutType === 'singleDist'){
        displayedType = workoutLengthOptions.singleDist
        legendKey =  'Single Distance'
    }else if(props.workoutInfo.workoutType === 'singleTime'){
        displayedType = workoutLengthOptions.singleTime
        legendKey= 'Single Time'
    }else if(props.workoutInfo.workoutType === 'intervalDist'){
        displayedType = workoutLengthOptions.intervalDist
        legendKey = 'Interval Distance'
    }else if(props.workoutInfo.workoutType === 'intervalTime'){
        displayedType = workoutLengthOptions.intervalTime
        legendKey = 'Interval Time'
    }


    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        props.handleChange(e)
        const radioId = e.target.id
        console.log('radioid', radioId)
        setSelectedOption(radioId)
    }

    return(
        <fieldset>
            <legend>{legendKey}</legend>
            <div className='flex justify-between flex-wrap text-sm'>
            <label className='workout-input-btn' style={selectedOption==='lengthOption1'?{backgroundColor:"#DDE691"}:{}}>
                <input 
                    type='radio'
                    id='lengthOption1'
                    name='workoutLength'
                    value = {displayedType[0]}
                    checked = {props.workoutInfo.workoutLength === displayedType[0]}
                    onChange = {handleChange}
                    />
                {displayedType[0]}
            </label>
            <label className='workout-input-btn' style={selectedOption==='lengthOption2'?{backgroundColor:"#DDE691"}:{}}>
                <input 
                    type='radio'
                    id='lengthOption2'
                    name='workoutLength'
                    value = {displayedType[1]}
                    checked = {props.workoutInfo.workoutLength === displayedType[1]}
                    onChange = {handleChange}
                />
                {displayedType[1]}
            </label>
            <label className='workout-input-btn' style={selectedOption==='lengthOption3'?{backgroundColor:"#DDE691"}:{}}>
                <input 
                    type='radio'
                    id='lengthOption3'
                    name='workoutLength'
                    value = {displayedType[2]}
                    checked = {props.workoutInfo.workoutLength === displayedType[2]}
                    onChange = {handleChange}
                />
                {displayedType[2]}
            </label>
            <label className='workout-input-btn' style={selectedOption==='lengthOption4'?{backgroundColor:"#DDE691"}:{}}>
                <input 
                    type='radio'
                    id='lengthOption4'
                    name='workoutLength'
                    value = 'other'
                    checked = {props.workoutInfo.workoutLength === 'other'}
                    onChange = {handleChange}
                />
                Other
            </label>
            <div className='flex justify-end w-full mt-2'>
            <input 
                type='text' 
                name = 'customLength'
                style={{'display':props.workoutInfo.workoutLength === 'other'? 'block':'none'}}
                onChange={props.handleChange} 
                placeholder = 'Custom'
                className='editable-input custom'
            />
            </div>
            </div>
        </fieldset>
        
    )
}