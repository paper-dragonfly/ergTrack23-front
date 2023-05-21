
import React, {useState} from 'react'
import {nanoid} from 'nanoid'
import { useLoaderData, useOutletContext } from 'react-router-dom'
import { useForm } from 'react-hook-form'


import LengthOptions from './LengthOptions'
import UploadAndDisplayImage from './UploadAndDisplayImage'
import { TypesWorkoutInfo, TypesWorkoutMetrics } from '../../utils/interfaces'
import { API_URL } from '../../config'
import { generateWorkoutName, getTodaysDate } from './helperFunctions'

import EditableResults from './EditableResults'

import { BsImage } from "react-icons/bs"
import { SlNote } from "react-icons/sl"

export function loader(){
    const userToken = sessionStorage.getItem('userToken')
    return userToken 
}

export default function AddWorkout(){
    const userToken = useLoaderData()

    const [workoutInfo, setWorkoutInfo] = useState<TypesWorkoutInfo>(
        {
            entryMethod: "fmImg",
            workoutType:"singleDist",
            workoutLength:"2000m",
            customLength:"",
            rest:"",
            subWorkouts: "4",
            ergImg: null, 
        }
    )

    // Info extracted from erg OR generated from workoutInfo
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
    
    const [photoHash, setPhotoHash] = useState("")
    const [showEditableResults,  setShowEditableResults] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    
    const { handleSubmit, formState }  = useForm() 
    const {isSubmitting} = formState



    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        const {name, type, value,files} = e.target
        setWorkoutInfo(oldWorkoutInfo => {
            if(type === 'file' && files){
                setShowError(false)
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
    
    function submitForm(){
        // e: React.FormEvent<HTMLFormElement>
        // e.preventDefault() //prevent immediate submittion 
        
        //if entryMethod === 'fmImg' & img selected -> create form, add image file, POST to API -> process resp 
        if(workoutInfo.entryMethod === 'fmImg' && workoutInfo.ergImg){
            console.log('running submit for fmImg')
            const formData = new FormData()
            formData.append('ergImg', workoutInfo.ergImg)
        
            // post data to API
            const url = API_URL+"/ergImage"
            const postInfo = {
                method: "POST",
                headers: {'Authorization': `Bearer ${userToken}`},
                body: formData
                }
            
            return(
                fetch(url, postInfo)
                    .then((response) => response.json()) 
                    .then((data) => {
                        console.log(data)
                        if(data.status_code === 200){ 
                            setPhotoHash(data.body.photo_hash)
                            console.log(photoHash)
                            setWorkoutMetrics({
                                workoutName: data.body.workout_meta.wo_name,
                                workoutDate: data.body.workout_meta.wo_date,
                                time: data.body.workout_data.time,
                                meter: data.body.workout_data.meter,
                                split:  data.body.workout_data.split,
                                sr: data.body.workout_data.sr,
                                hr: [], //hr not considered at this point
                            })
                            setShowEditableResults(true) 
                        }else{
                            setShowError(true) 
                        } 
                })
            )
            // if entryMethod = 'manual'
        }else if(workoutInfo.entryMethod === 'manual'){
            console.log('running submit for manual')
            // if entryMethod === 'manual' -> use workoutInfo to update workoutMetrics 
            return new Promise<void>(resolve => {
                const emptyCol: string[] = [""]
                for(let i=0; i < parseInt(workoutInfo.subWorkouts); i++){
                    emptyCol.push("")
                }
                
                const woName = generateWorkoutName(workoutInfo)
                const woDate = getTodaysDate()
                setWorkoutMetrics({
                    workoutName: woName,
                    workoutDate: woDate,
                    time: emptyCol,
                    meter: emptyCol,
                    split:  emptyCol,
                    sr: emptyCol,
                    hr: [],
                })
                console.log('workoutInfo', workoutInfo)
                console.log('manualInputWorkoutMetrics', workoutMetrics)
                setShowEditableResults(true)
                resolve()
        })}  
    }       
 
    return(
        <div className='add-workout-div flex flex-col items-center px-4 overflow-hidden md:flex-row md:justify-evenly md:items-end md:gap-6 md:p-10'>
            <form onSubmit={handleSubmit(submitForm)}  >
                <fieldset className='flex gap-10 my-10'>
                    <legend className='text-2xl font-bold pl-1 my-10'> Entry Method</legend>
                    <label className='flex flex-col justify-center items-center text-center text-xl bg-bgGrey shadow-2xl rounded-lg w-24 h-24'>
                        <BsImage size={30} />
                        <input 
                            type='radio'
                            id='fmImg'
                            name= 'entryMethod'
                            value ='fmImg'
                            checked={workoutInfo.entryMethod === 'fmImg'}
                            onChange={handleChange}
                        />
                        
                        Image
                    </label> 
                    <label className={`flex flex-col justify-center items-center text-center text-xl bg-bgGrey shadow-2xl rounded-lg w-24 h-24`}>
                        <SlNote size={30}/>
                        <input 
                            type='radio'
                            id='manual'
                            name= 'entryMethod'
                            value ='manual'
                            checked={workoutInfo.entryMethod === 'manual'}
                            onChange={handleChange}
                        />
                        Manual
                    </label>
                </fieldset>
                {
                    workoutInfo.entryMethod === "manual"?
                    <div className='visible-on-manual text-lg md:flex md:flex-col'>
                        <fieldset >
                            <legend className='text-xl pb-4'>Workout Type</legend>
                            <div className='flex justify-between text-sm pb-4 gap-3'>
                            <label className='workout-input-btn'>
                                <input 
                                    type='radio'
                                    id='singleDist'
                                    name='workoutType'
                                    value = 'singleDist'
                                    checked = {workoutInfo.workoutType === 'singleDist'}
                                    onChange = {handleChange}
                                    
                                />
                                Single<br />Distance
                            </label>
                            <label className='workout-input-btn'>
                                <input 
                                    type='radio'
                                    id='singleTime'
                                    name='workoutType'
                                    value = 'singleTime'
                                    checked = {workoutInfo.workoutType === 'singleTime'}
                                    onChange = {handleChange}
                                />
                                Single<br />Time
                            </label>
                            <label className='workout-input-btn'>
                                <input 
                                    type='radio'
                                    id='intervalDist'
                                    name='workoutType'
                                    value = 'intervalDist'
                                    checked = {workoutInfo.workoutType === 'intervalDist'}
                                    onChange = {handleChange}
                                />
                                Interval<br />Distance
                            </label>
                            <label className='workout-input-btn'>
                                <input 
                                    type='radio'
                                    id='intervalTime'
                                    name='workoutType'
                                    value = 'intervalTime'
                                    checked = {workoutInfo.workoutType === 'intervalTime'}
                                    onChange = {handleChange}
                                />
                                Interval<br />Time
                            </label>
                            </div>
                        </fieldset>
                        <LengthOptions className="visible-on-manual" workoutInfo={workoutInfo} handleChange={handleChange}/> 
                        <fieldset className="visible-on-manual">
                            <label>
                                Number of Sub-Workouts
                                <input
                                    type='number'
                                    name='subWorkouts'
                                    value={workoutInfo.subWorkouts}
                                    onChange= {handleChange}
                                    className='editable-input sub'
                                />
                            </label>
                        </fieldset>
                        {workoutInfo.workoutType === 'intervalTime'  || workoutInfo.workoutType ==='intervalDist'? 
                            <fieldset className="visible-on-manual">
                                <label>
                                    Rest 
                                    <input
                                        type='text'
                                        name='rest'
                                        value={workoutInfo.rest}
                                        onChange= {handleChange}
                                        placeholder='mm:ss'
                                        className='editable-input rest'
                                    />
                                </label>
                            </fieldset>: null
                        }
                        <br /> 
                    </div>
                    : // From Image
                    <UploadAndDisplayImage workoutInfo={workoutInfo} handleChange={handleChange}/>
               }
               {showError && 
               <div> 
                    <h4>Image processing failed</h4> 
                    <p>Please retake the photo and try again</p>
                </div>
                }
               <br />
               <button disabled={isSubmitting} className='addwo-form-submit-bt mb-6 text-xl' type="submit">Submit</button>
            </form>
            {showEditableResults? <EditableResults workoutMetrics = {workoutMetrics} userToken = {userToken} photoHash = {photoHash} />: null}
        </div>
    )
}