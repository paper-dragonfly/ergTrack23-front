import React, { useEffect, useState } from 'react';
import { TypesNameAndDate, TypesWorkoutTableMetrics, TypesWorkoutMetrics, ERProps } from './interfaces';
import { nanoid } from 'nanoid'

export default function EditableResults(props: ERProps) {

  //TODO: how do I get the Results Workrout Name to change when workoutMetrics changes?
  // TODO: generate empty table of correct dimensions 

  const [metrics, setMetrics]  =  useState<TypesWorkoutMetrics>(props.workoutMetrics)
  // const metrics = props.workoutMetrics
  
  const [nameAndDate, setNameAndDate] = useState<TypesNameAndDate>({
    workoutName: metrics.workoutName,
    workoutDate: metrics.workoutDate,
  });

  useEffect(()=>{
    console.log('hit', nameAndDate)
    setMetrics(props.workoutMetrics)
    setNameAndDate({
      workoutName: metrics.workoutName,
      workoutDate: metrics.workoutDate
    })
    },[props.workoutMetrics]);
  
  // useEffect(() => {
  //   setNameAndDate({
  //     workoutName: metrics.workoutName,
  //     workoutDate: metrics.workoutDate
  //   })
  // },[metrics])

  const [workoutTableMetrics, setWorkoutMetrics] = useState<TypesWorkoutTableMetrics[]>(() => {
    const ergTable = []
    console.log('number of cols', metrics.time.length)
    for(let i = 0 ; i < metrics.time.length; i++ ){
      const rowData = { id: nanoid(), time: metrics.time[i], distance: parseInt(metrics.meter[i]), split: metrics.split[i], strokeRate: parseInt(metrics.sr[i]), heartRate: parseInt(metrics.hr[i]) }
      ergTable.push(rowData) 
    }
    return ergTable

    // { id: nanoid(), time: '15:00.0', distance: 3341, split: '2:24.6', strokeRate: 21, heartRate:null },
  });


  const handleNDTChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
    const {name, value} = e.target 
    setNameAndDate(oldData => {
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
    setWorkoutMetrics(newData);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Data:', workoutTableMetrics);
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
                    value={nameAndDate.workoutName}
                    onChange = {handleNDTChange}
                    />
            </label>
            <br />
            <label>
                Date
                <input 
                    type="text"
                    name = 'workoutDate'
                    value={nameAndDate.workoutDate}
                    onChange = {handleNDTChange}
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
        </fieldset>
        <button type="submit">Save changes</button>
    </form>
  );
}

