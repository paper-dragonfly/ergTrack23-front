
import React, {useState} from 'react'

import LengthOptions from './LengthOptions'
import UploadAndDisplayImage from './UploadAndDisplayImage'
import { FormData } from './interfaces'
import { API_URL } from '../../config'

import NavHeader from '../../components/NavHeader'

export default function AddWorkout(){
    const [formData, setFormData] = useState<FormData>(
        {
            entryMethod: "manual",
            workoutType:"singleDist",
            workoutLength:"2000",
            customLength:"",
            subWorkouts:"",
            ergImg: null, 
        }
    )
    
    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        const {name, type, value,files} = e.target
        setFormData(oldFormData => {
            if(type === 'file' && files){
                return{
                    ...oldFormData,
                    [name]:files[0]
                }
            }
            
            return{
                ...oldFormData,
                [name]:value
            }
        })
    }
    
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault() //prevent immediate submittion 
        console.log(formData)
        console.log(typeof(formData))
        // post data to API
        const url = API_URL+"/workout"

        const postInfo = {
            method: "POST",
            body: formData
            }
        console.log(postInfo.body)
        debugger
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
                            checked={formData.entryMethod === 'manual'}
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
                            checked={formData.entryMethod === 'fmImg'}
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
                            checked = {formData.workoutType === 'singleDist'}
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
                            checked = {formData.workoutType === 'singleTime'}
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
                            checked = {formData.workoutType === 'intervalDist'}
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
                            checked = {formData.workoutType === 'intervalTime'}
                            onChange = {handleChange}
                        />
                    </label>
                </fieldset>
                {
                    formData.entryMethod === "manual"?
                    <div className='visible-on-manual'>
                    <LengthOptions className="visible-on-manual" formData={formData} handleChange={handleChange}/> 
                    <fieldset className="visible-on-manual">
                        <label>
                            Number of Sub-Workouts
                            <input
                                type='text'
                                name='subWorkouts'
                                value={formData.subWorkouts}
                                onChange= {handleChange}
                            />
                        </label>
                    </fieldset>
                    <br /> 
                    </div>
                    :
                    <UploadAndDisplayImage formData={formData} handleChange={handleChange}/>
               }
               <br />
               <button>Submit</button>
            </form>
        </div>
    )
}