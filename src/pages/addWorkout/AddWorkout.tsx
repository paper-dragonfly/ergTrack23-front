
import React, {useState} from 'react'

import LengthOptions from './LengthOptions'
import UploadAndDisplayImage from './UploadAndDisplayImage'
import { WorkoutInfoType } from './interfaces'
import { API_URL } from '../../config'

import NavHeader from '../../components/NavHeader'

export default function AddWorkout(){
    const [workoutInfo, setWorkoutInfo] = useState<WorkoutInfoType>(
        {
            entryMethod: "manual",
            workoutType:"singleDist",
            workoutLength:"2000m",
            customLength:"",
            subWorkouts:"",
            ergImg: null, 
        }
    )
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        const {name, type, value,files} = e.target
        setWorkoutInfo(oldWorkoutInfo => {
            if(type === 'file' && files){
                return{
                    ...oldWorkoutInfo,
                    [name]:files[0]
                }
            }else if(name === 'entryMethod' && value ===  'manual'){
                return {
                    ...oldWorkoutInfo,
                    entryMethod: 'manual',
                    ergImg: null
                }
            }
            return{
                ...oldWorkoutInfo,
                [name]:value
            }
        })
    }
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault() //prevent immediate submittion 
        console.log(workoutInfo)

        // define a new form
        const formData = new FormData()
        
        // add data to form
        formData.append("entryMethod", workoutInfo.entryMethod )
        formData.append("workoutType", workoutInfo.workoutType )
        formData.append("workoutLength", workoutInfo.workoutLength )
        formData.append("customLength", workoutInfo.customLength )
        formData.append("subWorkouts", workoutInfo.subWorkouts )
        if(workoutInfo.ergImg){
            formData.append('ergImg', workoutInfo.ergImg)
        }
        // post data to API
        const url = API_URL+"/workout"

        const postInfo = {
            method: "POST",
            body: formData
            }
        
        fetch(url, postInfo)
            .then((response) => response.json()) 
            .then((data) => console.log(data))
        }
    
    return(
        <div className='add-workout-div'>
            < NavHeader />
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <legend>Entry Method</legend>
                    <label>
                        Manual
                        <input 
                            type='radio'
                            id='manual'
                            name= 'entryMethod'
                            value ='manual'
                            checked={workoutInfo.entryMethod === 'manual'}
                            onChange={handleChange}
                        />
                    </label>
                    <label>
                        From Image
                        <input 
                            type='radio'
                            id='fmImg'
                            name= 'entryMethod'
                            value ='fmImg'
                            checked={workoutInfo.entryMethod === 'fmImg'}
                            onChange={handleChange}
                        />
                    </label> 
                </fieldset>
                <fieldset >
                    <legend>Workout Type</legend>
                    <label>
                        Single Distance
                        <input 
                            type='radio'
                            id='singleDist'
                            name='workoutType'
                            value = 'singleDist'
                            checked = {workoutInfo.workoutType === 'singleDist'}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>
                        Single Time
                        <input 
                            type='radio'
                            id='singleTime'
                            name='workoutType'
                            value = 'singleTime'
                            checked = {workoutInfo.workoutType === 'singleTime'}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>
                        Interval Distance
                        <input 
                            type='radio'
                            id='intervalDist'
                            name='workoutType'
                            value = 'intervalDist'
                            checked = {workoutInfo.workoutType === 'intervalDist'}
                            onChange = {handleChange}
                        />
                    </label>
                    <label>
                        Interval Time
                        <input 
                            type='radio'
                            id='intervalTime'
                            name='workoutType'
                            value = 'intervalTime'
                            checked = {workoutInfo.workoutType === 'intervalTime'}
                            onChange = {handleChange}
                        />
                    </label>
                </fieldset>
                {
                    workoutInfo.entryMethod === "manual"?
                    <div className='visible-on-manual'>
                    <LengthOptions className="visible-on-manual" workoutInfo={workoutInfo} handleChange={handleChange}/> 
                    <fieldset className="visible-on-manual">
                        <label>
                            Number of Sub-Workouts
                            <input
                                type='text'
                                name='subWorkouts'
                                value={workoutInfo.subWorkouts}
                                onChange= {handleChange}
                            />
                        </label>
                    </fieldset>
                    <br /> 
                    </div>
                    :
                    <UploadAndDisplayImage workoutInfo={workoutInfo} handleChange={handleChange}/>
               }
               <br />
               <button>Submit</button>
            </form>
        </div>
    )
}