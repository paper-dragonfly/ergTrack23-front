import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {useForm} from 'react-hook-form'

import { TypesWoMetaData, TypesWorkoutTableMetrics, TypesWorkoutMetrics, ERProps } from '../../utils/interfaces';
import { reformat_date } from './helperFunctions';
import { nanoid } from 'nanoid'
import { API_URL } from '../../config';

export default function EditableResults(props: ERProps) {

  const metrics = props.workoutMetrics
  const userToken = props.userToken
  const photoHash = props.photoHash

  const {handleSubmit, formState} = useForm() 
  const { isSubmitting } = formState; 
  
  const [manualShowHR, setManualShowHR] = useState<boolean>(metrics.hr.length ? true : false)

  const [submitSuccessful, setSubmitSuccessful] = useState<boolean>(false)
  const [viewSaveError, setViewSaveError] = useState<boolean>(false)
  const [woMetaData, setWoMetaData] = useState<TypesWoMetaData>({
    workoutName: metrics.workoutName,
    workoutDate: metrics.workoutDate,
    comment: "",
    postToTeam: false
  })

  useEffect(()=>{
    const newMetrics = props.workoutMetrics
    console.log('Running editaleResults useEffect')
    setWoMetaData(oldData => {
      return{
          ...oldData,
      workoutName: newMetrics.workoutName,
      workoutDate: newMetrics.workoutDate}
    })
    setWorkoutTableMetrics(() => {
      const ergTable = []
      for(let i = 0 ; i < newMetrics.time.length; i++ ){
        const rowData = { id: nanoid(), time: newMetrics.time[i], distance: parseInt(newMetrics.meter[i]), split: newMetrics.split[i], strokeRate: parseInt(newMetrics.sr[i]), heartRate: parseInt(newMetrics.hr[i]) }
        ergTable.push(rowData) 
      }
      console.log('view WorkoutTableMetrics', ergTable)
      return ergTable
    })
    
    console.log('useEffect newMetrics', metrics)
    console.log('useEffect woMetaData', woMetaData)
    },[props.workoutMetrics]);


  const [workoutTableMetrics, setWorkoutTableMetrics] = useState<TypesWorkoutTableMetrics[]>(() => {
    const ergTable = []
    console.log('number of cols', metrics.time.length)
    for(let i = 0 ; i < metrics.time.length; i++ ){
      const rowData = { id: nanoid(), time: metrics.time[i], distance: parseInt(metrics.meter[i]), split: metrics.split[i], strokeRate: parseInt(metrics.sr[i]), heartRate: parseInt(metrics.hr[i]) }
      ergTable.push(rowData) 
    }
    return ergTable

    // { id: nanoid(), time: '15:00.0', distance: 3341, split: '2:24.6', strokeRate: 21, heartRate:null },
  });


  const handleWoMetaDataChange = (e: React.ChangeEvent<HTMLInputElement| HTMLTextAreaElement>):void => {
    const {name, value} = e.target 
    if(name === 'postToTeam'){
      setWoMetaData(oldData => {
        return{
          ...oldData,
          [name] : !woMetaData.postToTeam
        }
      })
    }else {
      setWoMetaData(oldData => {
          return{
              ...oldData,
              [name]: value
          }
      })
    }
  }

  const handleMetricsChange = (e: React.ChangeEvent<HTMLInputElement>, id: string, field:string) => {
    const newData = workoutTableMetrics.map((row) => {
      if (row.id === id) {
        return {
          ...row,
          [field]: e.target.type === 'number'? parseInt(e.target.value) : e.target.value,
        };
      }
      return row;
    });
    setWorkoutTableMetrics(newData);
  };

  const submitForm = () => {
    setViewSaveError(false)
    try{
      console.log('RUNNING SUBMIT')
      console.log('Workout Table Metrics Data:', workoutTableMetrics);
      console.log('MetaData', woMetaData)
      
      const dateFormatted = reformat_date(woMetaData.workoutDate)

      //post data to API
      const url =  API_URL+'/workout'
      const postInfo = {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${userToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({woMetaData: {workoutName: woMetaData.workoutName, workoutDate:dateFormatted, comment: woMetaData.comment, postToTeam: woMetaData.postToTeam}, tableMetrics: workoutTableMetrics, photoHash:photoHash})
        }
      return(
        fetch(url, postInfo)
          .then((response) => response.json())
          .then((data)=> {
            console.log(data)
            setSubmitSuccessful(true)
          })
      )
    } catch (error){
      console.log(error)
      setViewSaveError(true)
    }
    };

  return (
    <div className='editable-table text-xl w-11/12 md:w-1/2'> 
      <form onSubmit={handleSubmit(submitForm)}>
          <fieldset className=' editable-fieldset'>
              <legend className='text-2xl text-center font-bold mb-6'>Workout Metrics</legend>
              <label>
                  Workout:
                  <input 
                      type="text"
                      name = 'workoutName'
                      value={woMetaData.workoutName}
                      onChange = {handleWoMetaDataChange}
                      className='editable-input name'
                      />
              </label>
              <br />
              <label>
                  Date:
                  <input 
                      type="text"
                      name = 'workoutDate'
                      value={woMetaData.workoutDate}
                      onChange = {handleWoMetaDataChange}
                      className='editable-input date'
                      />
              </label>
              <br />
              <table>
                  <thead>
                  <tr  className='border-b-tableGrey border-b-2 py-4 '>
                      <th>Time</th>
                      <th>Meter</th>
                      <th>Split</th>
                      <th>S/M</th>
                      {workoutTableMetrics[0].heartRate || manualShowHR? <th>HR</th> : null}
                  </tr>
                  </thead>
                  <tbody>
                  {workoutTableMetrics.map((row) => (
                      <tr key={row.id} className='editable-row border-b-tableGrey border-b-2'
                      >
                      <td>
                      <input
                          type="text"
                          value={row.time}
                          onChange={(e) => handleMetricsChange(e, row.id, 'time')}
                          className='editable-row'
                          />
                      </td>
                      <td>
                          <input
                          type="number"
                          value={row.distance}
                          onChange={(e) => handleMetricsChange(e, row.id, 'distance')}
                          className='editable-row'
                          />
                      </td>
                      <td>
                          <input
                          type="text"
                          value={row.split}
                          onChange={(e) => handleMetricsChange(e, row.id, 'split')}
                          className='editable-row'
                          />
                      </td>
                      <td>
                          <input
                          type="number"
                          value={row.strokeRate}
                          onChange={(e) => handleMetricsChange(e, row.id, 'strokeRate')}
                          className='editable-row'
                          />
                      </td>
                      {row.heartRate || manualShowHR? 
                          <td>
                              <input
                              type="number"
                              value={row.heartRate ? row.heartRate : ""}
                              onChange={(e) => handleMetricsChange(e, row.id, 'heartRate')}
                              className='editable-row'
                              />
                          </td> : 
                          null
                      }
                      </tr>
                  ))}
                  </tbody>
              </table>
              <br />
              <label>
                Comment:
                <br  />
                <textarea 
                  id='comment' 
                  name='comment'
                  onChange={handleWoMetaDataChange}
                  className='editable-input comment'></textarea> 
              </label>
              {sessionStorage.getItem('userTeamId') ?
              <label>
                Post to Team Log {' '}
                <input
                  type='checkbox'
                  name ='postToTeam'
                  checked = {woMetaData.postToTeam}
                  onChange = {handleWoMetaDataChange}
                />
              </label> : null}
          </fieldset>
          {viewSaveError? <><h4>Submission Failed</h4><p>Something went wrong, check the formatting is correct for all feilds and try again</p></>: null}
          {/* Use top button in prod 8/}
          {/* <button disabled={isSubmitting} className='editableTable-form-submit-btn my-6' type="submit">{isSubmitting? "Saving..." :"Save Workout"}</button> */}
          <button className='editableTable-form-submit-btn my-6' type="submit">{isSubmitting? "Saving..." :"Save Workout"}</button>
      </form>
      {submitSuccessful ? <Navigate to='/addworkout/submitted' /> : null}
    </div>
  );
}

