
import React, {useState} from 'react'
import {nanoid} from 'nanoid'

import LengthOptions from './LengthOptions'
import UploadAndDisplayImage from './UploadAndDisplayImage'
import { TypesWorkoutInfo, TypesWorkoutMetrics } from './interfaces'
import { API_URL } from '../../config'
import { generateWorkoutName } from './helperFunctions'

import NavHeader from '../../components/NavHeader'
import EditableResults from './EditableResults'

export default function AddWorkout(){
    const [workoutInfo, setWorkoutInfo] = useState<TypesWorkoutInfo>(
        {
            entryMethod: "manual",
            workoutType:"singleDist",
            workoutLength:"2000m",
            customLength:"",
            subWorkouts: "4",
            ergImg: null, 
        }
    )

    const [workoutMetrics, setWorkoutMetrics] = useState<TypesWorkoutMetrics>(
        {
            workoutName: "",
            workoutDate: "",
            time: [],
            meter: [],
            split:  [],
            sr: [],
            hr: [], 
        }
    )

    const [showEditableResults,  setShowEditableResults] = useState<boolean>(false)

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
        
        //if entryMethod === 'fmImg' & img selected -> create form, add image file, POST to API -> process resp 
        if(workoutInfo.entryMethod === 'fmImg' && workoutInfo.ergImg){
            console.log('running submit for fmImg')
            const formData = new FormData()
            formData.append('ergImg', workoutInfo.ergImg)
        
            // post data to API
            const url = API_URL+"/ergImage"
            const postInfo = {
                method: "POST",
                body: formData
                }
            
            fetch(url, postInfo)
                .then((response) => response.json()) 
                .then((data) => {
                    console.log(data)
                    if(data.status_code === 200){
                        setWorkoutMetrics({
                            workoutName: data.body.workout_meta.workout_name,
                            workoutDate: data.body.workout_meta.workout_date,
                            time: data.body.workout_data.time,
                            meter: data.body.workout_data.meter,
                            split:  data.body.workout_data.split,
                            sr: data.body.workout_data.sr,
                            hr: [], //hr not considered at this point
                        })
                        setShowEditableResults(true) 
                    } 
                })
            }else if(workoutInfo.entryMethod === 'manual'){
                console.log('running submit for manual')
                // if entryMethod === 'manual' -> use workoutInfo to update workoutMetrics 
                const emptyCol: string[] = [""]
                for(let i=0; i < parseInt(workoutInfo.subWorkouts); i++){
                    emptyCol.push("")
                }
                
                const woName = generateWorkoutName(workoutInfo)
                setWorkoutMetrics({
                    workoutName: woName,
                    workoutDate: "",
                    time: emptyCol,
                    meter: emptyCol,
                    split:  emptyCol,
                    sr: emptyCol,
                    hr: [],
                })
                console.log('workoutInfo', workoutInfo)
                console.log('manualInputWorkoutMetrics', workoutMetrics)
                setShowEditableResults(true)

            }  
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
                                type='number'
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
               <button type="submit">Submit</button>
            </form>
            {showEditableResults? <EditableResults workoutMetrics = {workoutMetrics}/> : null}
        </div>
    )
}