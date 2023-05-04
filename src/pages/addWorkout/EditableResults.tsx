import React, { useEffect, useState } from 'react';
import { TypesWoMetaData, TypesWorkoutTableMetrics, TypesWorkoutMetrics, ERProps } from '../../utils/interfaces';
import { reformat_date } from './helperFunctions';
import { nanoid } from 'nanoid'
import { API_URL } from '../../config';

export default function EditableResults(props: ERProps) {

  //TODO: how do I get the Results Workrout Name to change when workoutMetrics changes?
  // TODO: generate empty table of correct dimensions 

  // const [metrics, setMetrics]  =  useState<TypesWorkoutMetrics>(props.workoutMetrics)
  const metrics = props.workoutMetrics
  const userToken = props.userToken
  const photoHash = props.photoHash
  
  const [woMetaData, setWoMetaData] = useState<TypesWoMetaData>({
    workoutName: metrics.workoutName,
    workoutDate: metrics.workoutDate,
    comment: ""
  });

  useEffect(()=>{
    console.log('hit', woMetaData)
    // setMetrics(props.workoutMetrics)
    setWoMetaData({
      workoutName: metrics.workoutName,
      workoutDate: metrics.workoutDate,
      comment: ""
    })
    console.log('useEffect metrics', metrics)
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
    setWoMetaData(oldData => {
        return{
            ...oldData,
            [name]: value
        }
    })
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      body: JSON.stringify({woMetaData: {workoutName: woMetaData.workoutName, workoutDate:dateFormatted, comment: woMetaData.comment}, tableMetrics: workoutTableMetrics, photoHash:photoHash})
      }
    fetch(url, postInfo)
      .then((response) => response.json())
      .then((data)=> console.log(data))
    };

  return (
    <form onSubmit={handleSubmit}>
        <fieldset>
            <legend>Workout Results - edit as needed</legend>
            <label>
                Workout Name
                <input 
                    type="text"
                    name = 'workoutName'
                    value={woMetaData.workoutName}
                    onChange = {handleWoMetaDataChange}
                    />
            </label>
            <br />
            <label>
                Date
                <input 
                    type="text"
                    name = 'workoutDate'
                    value={woMetaData.workoutDate}
                    onChange = {handleWoMetaDataChange}
                    />
            </label>
            <br />
            <table>
                <thead>
                <tr>
                    <th>time</th>
                    <th>meter</th>
                    <th>/500m</th>
                    <th>s/m</th>
                </tr>
                </thead>
                <tbody>
                {workoutTableMetrics.map((row) => (
                    <tr key={row.id}>
                    <td>
                    <input
                        type="text"
                        value={row.time}
                        onChange={(e) => handleMetricsChange(e, row.id, 'time')}
                        />
                    </td>
                    <td>
                        <input
                        type="number"
                        value={row.distance}
                        onChange={(e) => handleMetricsChange(e, row.id, 'distance')}
                        />
                    </td>
                    <td>
                        <input
                        type="text"
                        value={row.split}
                        onChange={(e) => handleMetricsChange(e, row.id, 'split')}
                        />
                    </td>
                    <td>
                        <input
                        type="number"
                        value={row.strokeRate}
                        onChange={(e) => handleMetricsChange(e, row.id, 'strokeRate')}
                        />
                    </td>
                    {row.heartRate? 
                        <td>
                            <input
                            type="number"
                            value={row.heartRate}
                            onChange={(e) => handleMetricsChange(e, row.id, 'heartRate')}
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
                onChange={handleWoMetaDataChange}></textarea>
            </label>
        </fieldset>
        <button type="submit">Save changes</button>
    </form>
  );
}

