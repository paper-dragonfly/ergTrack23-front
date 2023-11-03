
import React, {useState, useRef} from 'react'
import {nanoid} from 'nanoid'
import { useLoaderData } from 'react-router-dom'
import { useForm } from 'react-hook-form'



import LengthOptions from './LengthOptions'
import UploadAndDisplayImage from './UploadAndDisplayImage'
import { TypesWorkoutInfo, TypesWorkoutMetrics } from '../../utils/interfaces'
import { API_URL } from '../../config'
import { generateWorkoutName, getTodaysDate } from './helperFunctions'

import EditableResults from './EditableResults'

import { BsImage } from "react-icons/bs"
import { SlNote } from "react-icons/sl"
import Loading from '../../components/Loading'

export function loader(){
    const userToken = sessionStorage.getItem('userToken')
    return userToken 
}

export default function AddWorkout(){
    const userToken = useLoaderData()
    const resultsTableRef = useRef<HTMLDivElement | null>(null)

    const [workoutInfo, setWorkoutInfo] = useState<TypesWorkoutInfo>(
        {
            entryMethod: "fmImg",
            workoutType:"singleDist",
            workoutLength:"2000m",
            customLength:"",
            rest:"",
            subWorkouts: "4",
            showHR: false,
            ergImg: [], 
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
    
    const [photoHash, setPhotoHash] = useState<string[]>([])
    const [showEditableResults,  setShowEditableResults] = useState<boolean>(false)
    const [showError, setShowError] = useState<boolean>(false)
    const [fmImgSelected, setFmImgSelected] = useState(true)
    const [numSubs, setNumSubs] = useState<number>(8)

    const [selectedWorkoutType, setSelectedWorkoutType] = useState('singleDist')
    
    const { handleSubmit, formState }  = useForm() 
    const {isSubmitting} = formState

    const selectedStyle = {
        backgroundColor: "#FAF7F7",
        // backgroundColor: '#E6A091',
        boxShadow: '5px 5px 5px #D9D9D9'
    }

    const scrollToTable = () => {
        if (resultsTableRef.current) {
            console.log('Scroll ran')
            resultsTableRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>): void{
        const {name, type, value,files} = e.target
        console.log('handlechange begins', fmImgSelected)
        setShowEditableResults(false)
        setWorkoutInfo(oldWorkoutInfo => {
            if(type === 'file' && files){
                setShowError(false)
                return{
                    ...oldWorkoutInfo,
                    [name]:[files[0]]
                }
            }else if(name === 'entryMethod' && value ===  'manual'){
                setShowError(false)
                setFmImgSelected(false)
                return {
                    ...oldWorkoutInfo,
                    entryMethod: 'manual',
                    ergImg: []
                }
            }else if (name === 'entryMethod' && value === 'fmImg'){
                setFmImgSelected(true) 
            }else if (name === 'workoutType'){
                setSelectedWorkoutType(value)
            }else if (name === 'showHR'){
                return{
                    ...oldWorkoutInfo,
                    showHR: !workoutInfo.showHR
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
        if(workoutInfo.entryMethod === 'fmImg' && workoutInfo.ergImg.length > 0){
            console.log('running submit for fmImg')
            setShowError(false) 
            const formData = new FormData()
            workoutInfo.ergImg.forEach((photo, index) => {
                formData.append(`photo${index + 1}`, photo);
            });
            console.log(workoutInfo.ergImg)
        
            // post data to API
            const endpoint = numSubs === 0 ? '/ergImage' : `/ergImage?numSubs=${numSubs}`
            const url = API_URL+endpoint
            const postInfo = {
                method: "POST",
                headers: {'Authorization': `Bearer ${userToken}`},
                body: formData
                }
            return(
                fetch(url, postInfo)
                    .then((response) => {
                        if(response.status === 200){
                            return response.json()
                        } else {
                            setShowError(true)
                            throw new Error('non-200 response')
                        }
                    })
                    .then((data) => {
                        console.log(data)
                        setPhotoHash(data.photo_hash)
                        console.log(photoHash)
                        setWorkoutMetrics({
                            workoutName: data.workout_meta.wo_name,
                            workoutDate: data.workout_meta.wo_date,
                            time: data.workout_data.time,
                            meter: data.workout_data.meter,
                            split:  data.workout_data.split,
                            sr: data.workout_data.sr,
                            hr: data.workout_data.hr[0] ? data.workout_data.hr: []
                        })
                        setShowEditableResults(true)
                        console.log('before scoll')
                        scrollToTable() 
                        console.log('after scoll') 
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
                    hr: workoutInfo.showHR? emptyCol: [],
                })
                console.log('workoutInfo', workoutInfo)
                console.log('manualInputWorkoutMetrics', workoutMetrics)
                setShowEditableResults(true)
                resolve()
        })}  
    }       
 
    return(
        <div className='add-workout-div flex flex-col items-center overflow-hidden md:flex-row  md:items-start md:p-14 md:place-content-evenly'>
            <form onSubmit={handleSubmit(submitForm)} 
            className=''>
                {/* Radio select: Image or Manual*/}
                <fieldset className='flex flex-wrap gap-10 mb-10'>
                    <legend className='text-2xl font-bold pl-1 mb-6'> Entry Method</legend>
                    <label 
                    style={fmImgSelected ? selectedStyle : {} }
                    className='flex flex-col justify-center items-center text-center text-xl rounded-lg w-24 h-24'>
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
                    <label 
                        style={fmImgSelected ? {}: selectedStyle }
                        className={`flex flex-col justify-center items-center text-center text-xl rounded-lg w-24 h-24`}
                    >
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
                            <label 
                            style={selectedWorkoutType === 'singleDist'? {backgroundColor: "#DDE691"}:{}}
                            className='workout-input-btn'>
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
                            <label 
                            style={selectedWorkoutType === 'singleTime'? {backgroundColor: "#DDE691"}:{}}
                            className='workout-input-btn'>
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
                            <label 
                            style={selectedWorkoutType === 'intervalDist'? {backgroundColor: "#DDE691"}:{}}
                            className='workout-input-btn'>
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
                            <label 
                            style={selectedWorkoutType === 'intervalTime'? {backgroundColor: "#DDE691"}:{}}
                            className='workout-input-btn'>
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
                        <fieldset className="visible-on-manual">
                            <label>
                                Include Heart Rate
                                <input
                                    type='checkbox'
                                    name='showHR'
                                    checked= {workoutInfo.showHR}
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
                    <UploadAndDisplayImage workoutInfo={workoutInfo} setWorkoutInfo={setWorkoutInfo} numSubs={numSubs} setNumSubs={setNumSubs}/>
            }
            {showError && 
            <div> 
                    <h4>Image processing failed</h4> 
                    <p>Please retake the photo and try again</p>
                </div>
                }
            <br />
            {isSubmitting? <Loading />: null}
            <button disabled={isSubmitting}  className='addwo-form-submit-bt mb-6 text-xl' type="submit"
            style={{display: isSubmitting ? 'none': 'block'}}>Submit</button>
            </form>
            <div ref={resultsTableRef} className='flex justify-center'>
                {showEditableResults? <EditableResults workoutMetrics = {workoutMetrics} userToken = {userToken} photoHash = {photoHash} /> : null}
            </div>
        </div>
    )
}